import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import type {
  EventRow,
  FieldResponseRow,
  FileRow,
  InstanceRow,
  OnboardingStore,
  TokenRow,
} from "./types";

/**
 * File-backed store for local development and QA only. Never used in
 * production (see ./index.ts). Data lives in start/.data/ (git-ignored).
 */

interface Db {
  instances: InstanceRow[];
  tokens: TokenRow[];
  responses: FieldResponseRow[];
  files: FileRow[];
  events: EventRow[];
}

const now = () => new Date().toISOString();

export function localDataDir() {
  return process.env.ONBOARDING_LOCAL_DIR || path.join(process.cwd(), ".data");
}

export class LocalStore implements OnboardingStore {
  readonly kind = "local" as const;
  private file = path.join(localDataDir(), "onboarding-local.json");
  private queue: Promise<unknown> = Promise.resolve();

  private async read(): Promise<Db> {
    try {
      return JSON.parse(await fs.readFile(this.file, "utf8")) as Db;
    } catch {
      return { instances: [], tokens: [], responses: [], files: [], events: [] };
    }
  }

  private async write(db: Db) {
    await fs.mkdir(path.dirname(this.file), { recursive: true });
    const tmp = this.file + "." + process.pid + ".tmp";
    await fs.writeFile(tmp, JSON.stringify(db, null, 1));
    await fs.rename(tmp, this.file);
  }

  /** Serialize read-modify-write cycles within this process. */
  private tx<T>(fn: (db: Db) => T | Promise<T>): Promise<T> {
    const run = this.queue.then(async () => {
      const db = await this.read();
      const out = await fn(db);
      await this.write(db);
      return out;
    });
    this.queue = run.catch(() => undefined);
    return run;
  }

  async createInstance(input: Pick<InstanceRow, "client_slug" | "config_version" | "client_name" | "contact_name" | "contact_email">) {
    return this.tx((db) => {
      const row: InstanceRow = {
        id: randomUUID(),
        ...input,
        status: "ready",
        current_view: "intro",
        current_step: 0,
        visited: {},
        opened_at: null,
        started_at: null,
        last_saved_at: null,
        submitted_at: null,
        completed_at: null,
        submission: null,
        created_at: now(),
        updated_at: now(),
      };
      db.instances.push(row);
      return row;
    });
  }
  async getInstance(id: string) {
    return (await this.read()).instances.find((i) => i.id === id) || null;
  }
  async listInstances(clientSlug?: string) {
    return (await this.read()).instances.filter((i) => !clientSlug || i.client_slug === clientSlug);
  }
  async findActiveInstanceByEmail(clientSlug: string, email: string) {
    const e = email.trim().toLowerCase();
    return (
      (await this.read()).instances
        .filter((i) => i.client_slug === clientSlug && i.status !== "archived" && i.contact_email.toLowerCase() === e)
        .sort((a, b) => b.created_at.localeCompare(a.created_at))[0] || null
    );
  }
  async updateInstance(id: string, patch: Partial<InstanceRow>) {
    return this.tx((db) => {
      const row = db.instances.find((i) => i.id === id);
      if (!row) throw new Error("instance not found");
      Object.assign(row, patch, { updated_at: now() });
      return row;
    });
  }

  async createToken(input: Omit<TokenRow, "id" | "created_at" | "last_used_at" | "use_count" | "revoked_at">) {
    return this.tx((db) => {
      const row: TokenRow = { id: randomUUID(), ...input, created_at: now(), last_used_at: null, use_count: 0, revoked_at: null };
      db.tokens.push(row);
      return row;
    });
  }
  async findTokenByHash(hash: string) {
    return (await this.read()).tokens.find((t) => t.token_hash === hash) || null;
  }
  async getToken(id: string) {
    return (await this.read()).tokens.find((t) => t.id === id) || null;
  }
  async touchToken(id: string) {
    await this.tx((db) => {
      const t = db.tokens.find((x) => x.id === id);
      if (t) {
        t.last_used_at = now();
        t.use_count += 1;
      }
    });
  }
  async revokeTokens(instanceId: string) {
    await this.tx((db) => {
      db.tokens.filter((t) => t.instance_id === instanceId && !t.revoked_at).forEach((t) => (t.revoked_at = now()));
    });
  }

  async getResponses(instanceId: string) {
    return (await this.read()).responses.filter((r) => r.instance_id === instanceId);
  }
  async upsertResponses(rows: FieldResponseRow[]) {
    await this.tx((db) => {
      for (const r of rows) {
        const i = db.responses.findIndex((x) => x.instance_id === r.instance_id && x.field_id === r.field_id);
        if (i >= 0) db.responses[i] = { ...db.responses[i], ...r };
        else db.responses.push({ ...r, created_at: now() });
      }
    });
  }

  async createFile(input: Omit<FileRow, "created_at" | "uploaded_at" | "removed_at">) {
    return this.tx((db) => {
      const row: FileRow = { ...input, created_at: now(), uploaded_at: null, removed_at: null };
      db.files.push(row);
      return row;
    });
  }
  async getFile(id: string) {
    return (await this.read()).files.find((f) => f.id === id) || null;
  }
  async updateFile(id: string, patch: Partial<FileRow>) {
    return this.tx((db) => {
      const row = db.files.find((f) => f.id === id);
      if (!row) throw new Error("file not found");
      Object.assign(row, patch);
      return row;
    });
  }
  async listFiles(instanceId: string, statuses?: FileRow["status"][]) {
    return (await this.read()).files
      .filter((f) => f.instance_id === instanceId && (!statuses || statuses.includes(f.status)))
      .sort((a, b) => a.created_at.localeCompare(b.created_at));
  }

  async addEvent(e: EventRow) {
    await this.tx((db) => {
      db.events.push({ ...e, id: db.events.length + 1, created_at: now() });
    });
  }
  async hasEvent(instanceId: string, type: string, sectionId?: string | null) {
    return (await this.read()).events.some(
      (e) => e.instance_id === instanceId && e.type === type && (sectionId === undefined || e.section_id === sectionId),
    );
  }
  async countEvents(f: { instanceId?: string; type: string; since: string; metaKey?: string; metaValue?: string }) {
    return (await this.read()).events.filter(
      (e) =>
        e.type === f.type &&
        (!f.instanceId || e.instance_id === f.instanceId) &&
        (e.created_at || "") >= f.since &&
        (!f.metaKey || String((e.meta || {})[f.metaKey]) === f.metaValue),
    ).length;
  }
  async listEvents(instanceId: string) {
    return (await this.read()).events.filter((e) => e.instance_id === instanceId);
  }
}
