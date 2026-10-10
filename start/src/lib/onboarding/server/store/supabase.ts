import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type {
  EventRow,
  FieldResponseRow,
  FileRow,
  InstanceRow,
  OnboardingStore,
  TokenRow,
} from "./types";

/** Service-role Supabase store. Server-only; RLS denies anon/authenticated. */
export class SupabaseStore implements OnboardingStore {
  readonly kind = "supabase" as const;
  readonly db: SupabaseClient;

  constructor(url: string, key: string) {
    this.db = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      global: { headers: { "x-client-info": "catalyst-onboarding" } },
    });
  }

  private ok<T>(res: { data: T | null; error: { message: string } | null }, what: string): T {
    if (res.error) throw new Error(`[onboarding/supabase] ${what}: ${res.error.message}`);
    return res.data as T;
  }

  async createInstance(input: Pick<InstanceRow, "client_slug" | "config_version" | "client_name" | "contact_name" | "contact_email">) {
    return this.ok(await this.db.from("onboarding_instances").insert(input).select().single(), "createInstance") as InstanceRow;
  }
  async getInstance(id: string) {
    return this.ok(await this.db.from("onboarding_instances").select().eq("id", id).maybeSingle(), "getInstance") as InstanceRow | null;
  }
  async listInstances(clientSlug?: string) {
    let q = this.db.from("onboarding_instances").select().order("created_at", { ascending: false });
    if (clientSlug) q = q.eq("client_slug", clientSlug);
    return this.ok(await q, "listInstances") as InstanceRow[];
  }
  async findActiveInstanceByEmail(clientSlug: string, email: string) {
    const rows = this.ok(
      await this.db
        .from("onboarding_instances")
        .select()
        .eq("client_slug", clientSlug)
        .neq("status", "archived")
        .ilike("contact_email", email.trim().replace(/[%_\\]/g, "\\$&"))
        .order("created_at", { ascending: false })
        .limit(1),
      "findActiveInstanceByEmail",
    ) as InstanceRow[];
    return rows[0] || null;
  }
  async updateInstance(id: string, patch: Partial<InstanceRow>) {
    return this.ok(await this.db.from("onboarding_instances").update(patch).eq("id", id).select().single(), "updateInstance") as InstanceRow;
  }

  async createToken(row: Omit<TokenRow, "id" | "created_at" | "last_used_at" | "use_count" | "revoked_at">) {
    return this.ok(await this.db.from("onboarding_access_tokens").insert(row).select().single(), "createToken") as TokenRow;
  }
  async findTokenByHash(hash: string) {
    return this.ok(await this.db.from("onboarding_access_tokens").select().eq("token_hash", hash).maybeSingle(), "findTokenByHash") as TokenRow | null;
  }
  async getToken(id: string) {
    return this.ok(await this.db.from("onboarding_access_tokens").select().eq("id", id).maybeSingle(), "getToken") as TokenRow | null;
  }
  async touchToken(id: string) {
    const t = await this.getToken(id);
    if (!t) return;
    this.ok(
      await this.db
        .from("onboarding_access_tokens")
        .update({ last_used_at: new Date().toISOString(), use_count: (t.use_count || 0) + 1 })
        .eq("id", id),
      "touchToken",
    );
  }
  async revokeTokens(instanceId: string) {
    this.ok(
      await this.db
        .from("onboarding_access_tokens")
        .update({ revoked_at: new Date().toISOString() })
        .eq("instance_id", instanceId)
        .is("revoked_at", null),
      "revokeTokens",
    );
  }

  async getResponses(instanceId: string) {
    return this.ok(await this.db.from("onboarding_field_responses").select().eq("instance_id", instanceId), "getResponses") as FieldResponseRow[];
  }
  async upsertResponses(rows: FieldResponseRow[]) {
    if (!rows.length) return;
    this.ok(await this.db.from("onboarding_field_responses").upsert(rows, { onConflict: "instance_id,field_id" }), "upsertResponses");
  }

  async createFile(row: Omit<FileRow, "created_at" | "uploaded_at" | "removed_at">) {
    return this.ok(await this.db.from("onboarding_files").insert(row).select().single(), "createFile") as FileRow;
  }
  async getFile(id: string) {
    return this.ok(await this.db.from("onboarding_files").select().eq("id", id).maybeSingle(), "getFile") as FileRow | null;
  }
  async updateFile(id: string, patch: Partial<FileRow>) {
    return this.ok(await this.db.from("onboarding_files").update(patch).eq("id", id).select().single(), "updateFile") as FileRow;
  }
  async listFiles(instanceId: string, statuses?: FileRow["status"][]) {
    let q = this.db.from("onboarding_files").select().eq("instance_id", instanceId).order("created_at");
    if (statuses) q = q.in("status", statuses);
    return this.ok(await q, "listFiles") as FileRow[];
  }

  async addEvent(e: EventRow) {
    this.ok(await this.db.from("onboarding_events").insert(e), "addEvent");
  }
  async hasEvent(instanceId: string, type: string, sectionId?: string | null) {
    let q = this.db.from("onboarding_events").select("id").eq("instance_id", instanceId).eq("type", type).limit(1);
    if (sectionId !== undefined) q = sectionId === null ? q.is("section_id", null) : q.eq("section_id", sectionId);
    return (this.ok(await q, "hasEvent") as unknown[]).length > 0;
  }
  async countEvents(f: { instanceId?: string; type: string; since: string; metaKey?: string; metaValue?: string }) {
    let q = this.db.from("onboarding_events").select("id", { count: "exact", head: true }).eq("type", f.type).gte("created_at", f.since);
    if (f.instanceId) q = q.eq("instance_id", f.instanceId);
    if (f.metaKey && f.metaValue !== undefined) q = q.eq(`meta->>${f.metaKey}`, f.metaValue);
    const res = await q;
    if (res.error) throw new Error(`[onboarding/supabase] countEvents: ${res.error.message}`);
    return res.count || 0;
  }
  async listEvents(instanceId: string) {
    return this.ok(await this.db.from("onboarding_events").select().eq("instance_id", instanceId).order("created_at"), "listEvents") as EventRow[];
  }
}
