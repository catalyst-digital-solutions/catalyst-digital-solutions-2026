/**
 * Status rules — ported 1:1 from the approved prototype (`resolved()`, `status()`,
 * `stats()`, `summarize()`). Shared by the browser and the server.
 */
import type { ChoiceOption, FieldDef, SectionDef } from "@/config/onboarding/types";
import { DAYS, type Answers, type FieldAnswer, type ReviewStatus } from "./types";

export const TRIAGE_OPTIONS = ["Yes", "No", "Discuss", "Explain"];
export const ACCESS_OPTIONS = ["Already Connected", "Invite Needed", "Not Set Up", "Not Applicable"] as const;
export const ACCESS_STATE_KEYS: Record<string, string> = {
  "Already Connected": "already_connected",
  "Invite Needed": "invite_needed",
  "Not Set Up": "not_set_up",
  "Not Applicable": "not_applicable",
};

export const optionLabel = (o: ChoiceOption) => (typeof o === "string" ? o : o.label);
export const isCard = (f: FieldDef) => f.type !== "heading" && f.type !== "note";

export function triageDefaults(f: FieldDef): Record<string, string> {
  const m: Record<string, string> = {};
  Object.entries(f.preset || {}).forEach(([k, arr]) => (arr || []).forEach((it) => (m[it] = k)));
  return m;
}

export function triageValue(f: FieldDef, a: FieldAnswer, item: string): string | null {
  const items = a.items || {};
  return item in items ? items[item] ?? null : triageDefaults(f)[item] || null;
}

export function multiPicks(f: FieldDef, a: FieldAnswer): string[] {
  return a.picks || f.defaults || [];
}

export function accessValue(f: FieldDef, a: FieldAnswer, itemId: string): string | null {
  const items = a.items || {};
  if (itemId in items) return items[itemId] ?? null;
  const item = (f.accessItems || []).find((i) => i.id === itemId);
  return item?.alreadyConnected ? "Already Connected" : null;
}

export function knownOriginal(f: FieldDef): string[] {
  return ([] as string[]).concat(f.value ?? []);
}

export function resolved(f: FieldDef, a: FieldAnswer): boolean {
  switch (f.type) {
    case "known":
      return a.status === "confirmed" || a.status === "modified";
    case "conflict":
      return !!a.pick && (a.pick !== "__other" || !!(a.other || "").trim());
    case "choice":
      return !!a.pick;
    case "text":
    case "textarea":
      return !!(a.value || "").trim();
    case "triage":
      return (f.items || []).every((it) => triageValue(f, a, it));
    case "multi":
      return multiPicks(f, a).length > 0 || !!(a.detail || "").trim();
    case "hours":
      return DAYS.every((d) => a.days && a.days[d] && typeof a.days[d]!.open === "boolean");
    case "upload":
      return !!(a.files && a.files.length);
    case "access":
      return (f.accessItems || []).every((it) => accessValue(f, a, it.id));
    default:
      return true;
  }
}

export function fieldStatus(f: FieldDef, a: FieldAnswer): ReviewStatus {
  if (f.type === "known" && a.status === "modified") return "updated";
  if (resolved(f, a)) return "confirmed";
  return f.optional ? "optional" : "needed";
}

export interface SectionStats {
  confirmed: number;
  updated: number;
  needed: number;
  optional: number;
  touched: boolean;
  prefilled: number;
  complete: boolean;
}

export function sectionStats(sec: SectionDef, answers: Answers, visited: Record<string, boolean>): SectionStats {
  const c: SectionStats = { confirmed: 0, updated: 0, needed: 0, optional: 0, touched: false, prefilled: 0, complete: false };
  sec.fields.filter(isCard).forEach((f) => {
    const a = answers[f.id] || {};
    c[fieldStatus(f, a)]++;
    if (a.at) c.touched = true;
    if (f.type === "known") c.prefilled++;
    if (f.type === "triage" && f.preset && f.preset.Yes) c.prefilled += f.preset.Yes.length;
    if (f.type === "multi" && f.defaults) c.prefilled++;
  });
  c.complete = c.needed === 0 && (c.touched || !!visited[sec.id]);
  return c;
}

export const truncate = (s: string | undefined | null, n: number) =>
  !s ? "" : s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s;

export function summarize(f: FieldDef, a: FieldAnswer): string {
  switch (f.type) {
    case "known":
      return a.addition
        ? "Added: " + a.addition
        : a.status === "modified" && a.value
          ? String(a.value).split("\n").join(" ")
          : knownOriginal(f).join(" ");
    case "conflict":
      return a.pick === "__other" ? a.other || "" : a.pick || "";
    case "choice":
      return (a.pick || "") + (a.follow ? " — " + a.follow : "");
    case "text":
    case "textarea":
      return a.value || "";
    default:
      return "";
  }
}
