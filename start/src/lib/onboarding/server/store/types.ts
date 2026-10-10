/**
 * Data-layer interface. Two implementations:
 *  - SupabaseStore (production; service-role, server-only)
 *  - LocalStore    (development/QA; JSON file under start/.data)
 * Swapping is env-only (see ./index.ts).
 */

export type InstanceStatus = "ready" | "in_progress" | "submitted" | "complete" | "archived";

export interface InstanceRow {
  id: string;
  client_slug: string;
  config_version: string;
  client_name: string;
  contact_name: string | null;
  contact_email: string;
  status: InstanceStatus;
  current_view: string;
  current_step: number;
  visited: Record<string, boolean>;
  opened_at: string | null;
  started_at: string | null;
  last_saved_at: string | null;
  submitted_at: string | null;
  completed_at: string | null;
  submission: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface TokenRow {
  id: string;
  instance_id: string;
  token_hash: string;
  email: string;
  expires_at: string;
  created_at: string;
  last_used_at: string | null;
  use_count: number;
  revoked_at: string | null;
}

export interface FieldResponseRow {
  instance_id: string;
  section_id: string;
  field_id: string;
  field_type: string;
  source_value: unknown;
  client_value: Record<string, unknown> | null;
  status: string;
  review_status: string;
  confirmed_at: string | null;
  created_at?: string;
  updated_at: string;
}

export type FileStatus = "pending" | "uploaded" | "removed" | "failed";

export interface FileRow {
  id: string;
  instance_id: string;
  field_id: string;
  category: string | null;
  original_name: string;
  size_bytes: number;
  mime_type: string;
  storage_bucket: string;
  storage_path: string;
  status: FileStatus;
  created_at: string;
  uploaded_at: string | null;
  removed_at: string | null;
}

export interface EventRow {
  id?: number;
  instance_id: string | null;
  type: string;
  section_id: string | null;
  meta: Record<string, unknown>;
  created_at?: string;
}

export interface OnboardingStore {
  readonly kind: "supabase" | "local";
  createInstance(input: Pick<InstanceRow, "client_slug" | "config_version" | "client_name" | "contact_name" | "contact_email">): Promise<InstanceRow>;
  getInstance(id: string): Promise<InstanceRow | null>;
  listInstances(clientSlug?: string): Promise<InstanceRow[]>;
  findActiveInstanceByEmail(clientSlug: string, email: string): Promise<InstanceRow | null>;
  updateInstance(id: string, patch: Partial<InstanceRow>): Promise<InstanceRow>;

  createToken(row: Omit<TokenRow, "id" | "created_at" | "last_used_at" | "use_count" | "revoked_at">): Promise<TokenRow>;
  findTokenByHash(hash: string): Promise<TokenRow | null>;
  getToken(id: string): Promise<TokenRow | null>;
  touchToken(id: string): Promise<void>;
  revokeTokens(instanceId: string): Promise<void>;

  getResponses(instanceId: string): Promise<FieldResponseRow[]>;
  upsertResponses(rows: FieldResponseRow[]): Promise<void>;

  createFile(row: Omit<FileRow, "created_at" | "uploaded_at" | "removed_at">): Promise<FileRow>;
  getFile(id: string): Promise<FileRow | null>;
  updateFile(id: string, patch: Partial<FileRow>): Promise<FileRow>;
  listFiles(instanceId: string, statuses?: FileStatus[]): Promise<FileRow[]>;

  addEvent(e: EventRow): Promise<void>;
  hasEvent(instanceId: string, type: string, sectionId?: string | null): Promise<boolean>;
  countEvents(filter: { instanceId?: string; type: string; since: string; metaKey?: string; metaValue?: string }): Promise<number>;
  listEvents(instanceId: string): Promise<EventRow[]>;
}
