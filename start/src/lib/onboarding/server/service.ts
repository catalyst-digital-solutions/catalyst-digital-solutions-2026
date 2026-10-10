import "server-only";
import { randomUUID } from "node:crypto";
import { findField } from "@/config/onboarding";
import type { FieldDef, OnboardingConfig, SectionDef } from "@/config/onboarding/types";
import {
  fieldStatus,
  isCard,
  knownOriginal,
  multiPicks,
  resolved,
  sectionStats,
  triageDefaults,
  accessValue,
  ACCESS_STATE_KEYS,
} from "../status";
import type { Answers, ClientState, FieldAnswer, View } from "../types";
import type { Backend } from "./backend";
import { sendOnboardingEmail } from "./email";
import { MAX_UPLOAD_BYTES, UPLOAD_BUCKET } from "./env";
import type { FieldResponseRow, FileRow, InstanceRow } from "./store/types";
import { ValidationError, cleanText, validateAnswer } from "./validate";

export class ConflictError extends Error {}

const iso = (ms?: number | null) => (ms ? new Date(ms).toISOString() : null);
const ms = (s?: string | null) => (s ? new Date(s).getTime() : null);

function sourceValue(f: FieldDef): unknown {
  switch (f.type) {
    case "known":
      return knownOriginal(f);
    case "triage":
      return f.preset ? triageDefaults(f) : null;
    case "multi":
      return f.defaults || null;
    case "access":
      return Object.fromEntries((f.accessItems || []).map((i) => [i.id, i.alreadyConnected ? "already_connected" : null]));
    default:
      return null;
  }
}

function rowStatus(f: FieldDef, a: FieldAnswer): string {
  if (f.type === "known") return a.status === "confirmed" ? "client_confirmed" : a.status === "modified" ? "client_modified" : "pending";
  return resolved(f, a) ? "answered" : "pending";
}

export function buildRow(instanceId: string, section: SectionDef, f: FieldDef, a: FieldAnswer): FieldResponseRow {
  const clientValue: Record<string, unknown> = { ...a };
  if (f.type === "access") {
    clientValue.states = Object.fromEntries(
      (f.accessItems || []).map((i) => {
        const v = accessValue(f, a, i.id);
        return [i.id, v ? ACCESS_STATE_KEYS[v] : null];
      }),
    );
  }
  if (f.type === "triage") clientValue.effective = Object.fromEntries((f.items || []).map((it) => [it, (a.items && it in a.items ? a.items[it] : triageDefaults(f)[it]) ?? null]));
  if (f.type === "multi") clientValue.effective = multiPicks(f, a);
  return {
    instance_id: instanceId,
    section_id: section.id,
    field_id: f.id,
    field_type: f.type,
    source_value: sourceValue(f),
    client_value: clientValue,
    status: rowStatus(f, a),
    review_status: fieldStatus(f, a),
    confirmed_at: f.type === "known" ? iso(a.confirmedAt ?? null) : null,
    updated_at: new Date().toISOString(),
  };
}

const fileRef = (r: FileRow) => ({ id: r.id, name: r.original_name, size: r.size_bytes, type: r.mime_type, category: r.category || "" });

export async function loadAnswers(backend: Backend, instance: InstanceRow, config: OnboardingConfig): Promise<Answers> {
  const [rows, files] = await Promise.all([
    backend.store.getResponses(instance.id),
    backend.store.listFiles(instance.id, ["uploaded"]),
  ]);
  const answers: Answers = {};
  for (const r of rows) {
    if (!findField(config, r.field_id)) continue;
    const v = { ...(r.client_value || {}) } as FieldAnswer & { states?: unknown; effective?: unknown };
    delete v.states;
    delete v.effective;
    delete v.files;
    answers[r.field_id] = v;
  }
  for (const f of files) {
    const a = (answers[f.field_id] ||= {});
    (a.files ||= []).push(fileRef(f));
    a.at = Math.max(a.at || 0, ms(f.uploaded_at) || 0);
  }
  return answers;
}

export async function loadClientState(backend: Backend, instance: InstanceRow, config: OnboardingConfig): Promise<ClientState> {
  const answers = await loadAnswers(backend, instance, config);
  const submitted = instance.status === "submitted" || instance.status === "complete";
  const view = (submitted ? "submitted" : ["intro", "wizard", "review"].includes(instance.current_view) ? instance.current_view : "intro") as View;
  return {
    instanceId: instance.id,
    view,
    step: Math.min(Math.max(instance.current_step || 0, 0), config.sections.length - 1),
    visited: instance.visited || {},
    answers,
    savedAt: ms(instance.last_saved_at),
    submittedAt: ms(instance.submitted_at),
  };
}

async function recordOnce(backend: Backend, instanceId: string, type: string, sectionId: string | null = null, meta: Record<string, unknown> = {}) {
  if (await backend.store.hasEvent(instanceId, type, sectionId)) return false;
  await backend.store.addEvent({ instance_id: instanceId, type, section_id: sectionId, meta });
  return true;
}

export async function recordOpened(backend: Backend, instance: InstanceRow, via: "link" | "page") {
  await backend.store.addEvent({ instance_id: instance.id, type: "onboarding.opened", section_id: null, meta: { via } });
  if (!instance.opened_at) await backend.store.updateInstance(instance.id, { opened_at: new Date().toISOString() });
}

async function markStarted(backend: Backend, instance: InstanceRow) {
  if (instance.started_at && instance.status !== "ready") return instance;
  const now = new Date().toISOString();
  const next = await backend.store.updateInstance(instance.id, {
    status: instance.status === "ready" ? "in_progress" : instance.status,
    started_at: instance.started_at || now,
  });
  await recordOnce(backend, instance.id, "onboarding.started");
  return next;
}

async function recordSectionCompletions(backend: Backend, instance: InstanceRow, config: OnboardingConfig, answers: Answers, visited: Record<string, boolean>) {
  for (const s of config.sections) {
    if (sectionStats(s, answers, visited).complete) await recordOnce(backend, instance.id, "onboarding.section_completed", s.id);
  }
}

function assertEditable(instance: InstanceRow) {
  if (instance.status === "submitted" || instance.status === "complete" || instance.status === "archived")
    throw new ConflictError("This onboarding has already been submitted.");
}

export interface SavePayload {
  fields?: Record<string, unknown>;
  position?: { view?: unknown; step?: unknown; visited?: unknown };
}

export async function saveProgress(backend: Backend, config: OnboardingConfig, instance: InstanceRow, payload: SavePayload) {
  assertEditable(instance);
  const fieldEntries = Object.entries(payload.fields || {});
  if (fieldEntries.length > 60) throw new ValidationError("too many fields in one save");

  const rows: FieldResponseRow[] = [];
  for (const [fieldId, raw] of fieldEntries) {
    const hit = findField(config, fieldId);
    if (!hit || !isCard(hit.field)) throw new ValidationError("unknown field " + fieldId.slice(0, 40));
    if (hit.field.type === "upload") continue; // server-owned
    rows.push(buildRow(instance.id, hit.section, hit.field, validateAnswer(hit.field, raw)));
  }
  if (rows.length) await backend.store.upsertResponses(rows);

  const patch: Partial<InstanceRow> = { last_saved_at: new Date().toISOString() };
  const pos = payload.position;
  if (pos) {
    if (pos.view === "intro" || pos.view === "wizard" || pos.view === "review") patch.current_view = pos.view;
    if (typeof pos.step === "number" && Number.isInteger(pos.step)) patch.current_step = Math.min(Math.max(pos.step, 0), config.sections.length - 1);
    if (pos.visited && typeof pos.visited === "object") {
      const ids = new Set(config.sections.map((s) => s.id));
      patch.visited = { ...(instance.visited || {}) };
      for (const [k, v] of Object.entries(pos.visited as Record<string, unknown>)) if (ids.has(k) && v === true) patch.visited[k] = true;
    }
  }
  let inst = await backend.store.updateInstance(instance.id, patch);
  if (rows.length || patch.current_view === "wizard" || patch.current_view === "review") inst = await markStarted(backend, inst);
  if (rows.length || pos?.visited) {
    const answers = await loadAnswers(backend, inst, config);
    await recordSectionCompletions(backend, inst, config, answers, inst.visited || {});
  }
  return { savedAt: ms(inst.last_saved_at) };
}

export function totals(config: OnboardingConfig, answers: Answers, visited: Record<string, boolean>) {
  const t = { confirmed: 0, updated: 0, needed: 0, optional: 0 };
  for (const s of config.sections) {
    const st = sectionStats(s, answers, visited);
    t.confirmed += st.confirmed;
    t.updated += st.updated;
    t.needed += st.needed;
    t.optional += st.optional;
  }
  return t;
}

export async function submitOnboarding(backend: Backend, config: OnboardingConfig, instance: InstanceRow, meta: { userAgent?: string; ipHash?: string }) {
  if (instance.status === "submitted" || instance.status === "complete") return { submittedAt: ms(instance.submitted_at), already: true };
  assertEditable(instance);
  const answers = await loadAnswers(backend, instance, config);
  // Persist a row for every card field so the stored record is complete.
  const rows: FieldResponseRow[] = [];
  for (const s of config.sections) for (const f of s.fields.filter(isCard)) rows.push(buildRow(instance.id, s, f, answers[f.id] || {}));
  await backend.store.upsertResponses(rows);
  const t = totals(config, answers, instance.visited || {});
  const files = (await backend.store.listFiles(instance.id, ["uploaded"])).length;
  const now = new Date().toISOString();
  const inst = await backend.store.updateInstance(instance.id, {
    status: "submitted",
    submitted_at: now,
    current_view: "submitted",
    started_at: instance.started_at || now,
    submission: {
      acknowledged: true,
      acknowledgement_text: config.review.confirmationText,
      acknowledged_at: now,
      config_version: config.version,
      totals: { ...t, files },
      user_agent: (meta.userAgent || "").slice(0, 300),
      ip_hash: meta.ipHash || null,
    },
  });
  await recordOnce(backend, instance.id, "onboarding.started");
  await recordOnce(backend, instance.id, "onboarding.submitted", null, { totals: { ...t, files } });
  await sendOnboardingEmail(backend, "submitted", config, inst);
  await sendOnboardingEmail(backend, "internal_submitted", config, inst, { totals: { ...t, files } });
  return { submittedAt: ms(inst.submitted_at), already: false };
}

// ---------------------------------------------------------------- uploads

const EXT_MIME: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  csv: "text/csv",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  txt: "text/plain",
  rtf: "application/rtf",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  heic: "image/heic",
  webp: "image/webp",
  gif: "image/gif",
  zip: "application/zip",
  mov: "video/quicktime",
  mp4: "video/mp4",
};
export const ALLOWED_MIME_TYPES = Array.from(new Set(Object.values(EXT_MIME)));

const MAX_FILES_PER_INSTANCE = 400;

function safeName(name: string) {
  const base = cleanText(name, 200).replace(/[/\\]/g, "_").trim() || "file";
  return base.replace(/[^A-Za-z0-9._ -]/g, "_").replace(/\s+/g, "-").slice(-120);
}

function uploadField(config: OnboardingConfig, fieldId: string) {
  const hit = findField(config, fieldId);
  if (!hit || hit.field.type !== "upload") throw new ValidationError("not an upload field");
  return hit;
}

async function refreshUploadRow(backend: Backend, config: OnboardingConfig, instance: InstanceRow, fieldId: string) {
  const { section, field } = uploadField(config, fieldId);
  const files = (await backend.store.listFiles(instance.id, ["uploaded"])).filter((f) => f.field_id === fieldId);
  const a: FieldAnswer = { files: files.map(fileRef), at: Date.now() };
  const row = buildRow(instance.id, section, field, a);
  row.client_value = { files: files.map((f) => ({ ...fileRef(f), storage_path: f.storage_path })) };
  await backend.store.upsertResponses([row]);
}

export async function createUpload(
  backend: Backend,
  config: OnboardingConfig,
  instance: InstanceRow,
  input: { fieldId: unknown; name: unknown; size: unknown; category?: unknown },
) {
  assertEditable(instance);
  const { field } = uploadField(config, String(input.fieldId || ""));
  const name = safeName(String(input.name || ""));
  const size = Number(input.size);
  if (!Number.isFinite(size) || size <= 0) throw new ValidationError("That file looks empty.");
  if (size > MAX_UPLOAD_BYTES) throw new ValidationError("That file is larger than 50 MB.");
  const ext = (name.includes(".") ? name.split(".").pop() || "" : "").toLowerCase();
  const accept = (field.accept || config.defaultAccept).split(",").map((s) => s.trim().replace(/^\./, "").toLowerCase());
  if (!ext || !accept.includes(ext) || !EXT_MIME[ext]) throw new ValidationError("That file type isn’t supported here.");
  const category = input.category ? String(input.category) : "";
  if (category && !(field.categories || []).includes(category)) throw new ValidationError("bad category");
  const existing = await backend.store.listFiles(instance.id, ["pending", "uploaded"]);
  if (existing.length >= MAX_FILES_PER_INSTANCE) throw new ValidationError("Upload limit reached — please send a ZIP or contact Mario.");

  const id = randomUUID();
  const storagePath = `${instance.id}/${field.id}/${id}-${name}`;
  const mime = EXT_MIME[ext];
  const target = await backend.files.createSignedUpload(storagePath, mime);
  await backend.store.createFile({
    id,
    instance_id: instance.id,
    field_id: field.id,
    category: category || null,
    original_name: cleanText(String(input.name || name), 200),
    size_bytes: size,
    mime_type: mime,
    storage_bucket: UPLOAD_BUCKET,
    storage_path: storagePath,
    status: "pending",
  });
  if (!instance.started_at) await markStarted(backend, instance);
  return { fileId: id, upload: target };
}

async function ownedFile(backend: Backend, instance: InstanceRow, fileId: string) {
  const f = /^[0-9a-f-]{36}$/i.test(fileId) ? await backend.store.getFile(fileId) : null;
  if (!f || f.instance_id !== instance.id) throw new ValidationError("file not found");
  return f;
}

export async function completeUpload(backend: Backend, config: OnboardingConfig, instance: InstanceRow, fileId: string) {
  assertEditable(instance);
  const f = await ownedFile(backend, instance, fileId);
  if (f.status === "uploaded") return { file: fileRef(f) };
  if (f.status !== "pending") throw new ValidationError("file was removed");
  const st = await backend.files.exists(f.storage_path);
  if (!st.exists) throw new ValidationError("upload not found in storage");
  if (st.size && st.size > MAX_UPLOAD_BYTES) {
    await backend.files.remove(f.storage_path).catch(() => undefined);
    await backend.store.updateFile(f.id, { status: "failed" });
    throw new ValidationError("That file is larger than 50 MB.");
  }
  const row = await backend.store.updateFile(f.id, {
    status: "uploaded",
    uploaded_at: new Date().toISOString(),
    size_bytes: st.size || f.size_bytes,
  });
  await refreshUploadRow(backend, config, instance, f.field_id);
  await backend.store.updateInstance(instance.id, { last_saved_at: new Date().toISOString() });
  const answers = await loadAnswers(backend, instance, config);
  await recordSectionCompletions(backend, instance, config, answers, instance.visited || {});
  return { file: fileRef(row) };
}

export async function removeUpload(backend: Backend, config: OnboardingConfig, instance: InstanceRow, fileId: string) {
  assertEditable(instance);
  const f = await ownedFile(backend, instance, fileId);
  if (f.status === "removed") return;
  await backend.store.updateFile(f.id, { status: "removed", removed_at: new Date().toISOString() });
  await backend.files.remove(f.storage_path).catch((e) => console.error("[onboarding] remove object failed", e?.message));
  await refreshUploadRow(backend, config, instance, f.field_id);
  await backend.store.updateInstance(instance.id, { last_saved_at: new Date().toISOString() });
}

export async function setUploadCategory(backend: Backend, config: OnboardingConfig, instance: InstanceRow, fileId: string, category: unknown) {
  assertEditable(instance);
  const f = await ownedFile(backend, instance, fileId);
  const { field } = uploadField(config, f.field_id);
  const c = String(category || "");
  if (c && !(field.categories || []).includes(c)) throw new ValidationError("bad category");
  await backend.store.updateFile(f.id, { category: c || null });
  if (f.status === "uploaded") await refreshUploadRow(backend, config, instance, f.field_id);
  await backend.store.updateInstance(instance.id, { last_saved_at: new Date().toISOString() });
}

// ---------------------------------------------------------------- export

export async function exportInstance(backend: Backend, config: OnboardingConfig, instance: InstanceRow, opts: { signedUrlSeconds?: number } = {}) {
  const answers = await loadAnswers(backend, instance, config);
  const rows = await backend.store.getResponses(instance.id);
  const byId = new Map(rows.map((r) => [r.field_id, r]));
  const files = await backend.store.listFiles(instance.id, ["uploaded"]);
  const secs = opts.signedUrlSeconds ?? 3600;
  const signed = await Promise.all(
    files.map(async (f) => ({
      id: f.id,
      field_id: f.field_id,
      category: f.category,
      name: f.original_name,
      size_bytes: f.size_bytes,
      mime_type: f.mime_type,
      storage_path: f.storage_path,
      uploaded_at: f.uploaded_at,
      signed_url: await backend.files.signedDownloadUrl(f.storage_path, secs, f.original_name).catch(() => null),
      signed_url_expires_at: new Date(Date.now() + secs * 1000).toISOString(),
    })),
  );
  const visited = instance.visited || {};
  return {
    exported_at: new Date().toISOString(),
    config_version: config.version,
    instance: {
      id: instance.id,
      client: instance.client_name,
      contact: { name: instance.contact_name, email: instance.contact_email },
      status: instance.status,
      opened_at: instance.opened_at,
      started_at: instance.started_at,
      last_saved_at: instance.last_saved_at,
      submitted_at: instance.submitted_at,
      completed_at: instance.completed_at,
      submission: instance.submission,
    },
    totals: { ...totals(config, answers, visited), files: files.length },
    sections: config.sections.map((s) => ({
      id: s.id,
      title: s.title,
      stats: sectionStats(s, answers, visited),
      fields: s.fields.filter(isCard).map((f) => {
        const a = answers[f.id] || {};
        const row = byId.get(f.id);
        return {
          id: f.id,
          type: f.type,
          label: f.label,
          review_status: fieldStatus(f, a),
          status: rowStatus(f, a),
          source: f.source || null,
          source_value: sourceValue(f),
          client_value: row?.client_value ?? null,
          confirmed_at: f.type === "known" ? iso(a.confirmedAt ?? null) : null,
          updated_at: row?.updated_at ?? null,
          internal_note: f.internalNote || null,
          files: f.type === "upload" ? signed.filter((x) => x.field_id === f.id) : undefined,
        };
      }),
    })),
    files: signed,
    events: (await backend.store.listEvents(instance.id)).map((e) => ({ type: e.type, section_id: e.section_id, at: e.created_at, meta: e.meta })),
  };
}

export async function markComplete(backend: Backend, config: OnboardingConfig, instance: InstanceRow, opts: { sendEmail?: boolean } = {}) {
  const inst = await backend.store.updateInstance(instance.id, { status: "complete", completed_at: new Date().toISOString() });
  await recordOnce(backend, instance.id, "onboarding.completed");
  const email = await sendOnboardingEmail(backend, "complete", config, inst, {}, { force: !!opts.sendEmail });
  return { instance: inst, email };
}
