import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { FileStorage, UploadTarget } from "./types";

export class SupabaseFileStorage implements FileStorage {
  readonly kind = "supabase" as const;
  constructor(private db: SupabaseClient, private bucket: string) {}

  async createSignedUpload(path: string, contentType: string): Promise<UploadTarget> {
    const { data, error } = await this.db.storage.from(this.bucket).createSignedUploadUrl(path);
    if (error || !data) throw new Error("[onboarding/storage] signed upload: " + (error?.message || "no data"));
    return {
      method: "PUT",
      url: data.signedUrl,
      headers: { "content-type": contentType, "x-upsert": "false", "cache-control": "max-age=3600" },
    };
  }

  async exists(path: string) {
    const { data, error } = await this.db.storage.from(this.bucket).info(path);
    if (error || !data) return { exists: false };
    const size = (data as { size?: number }).size;
    return { exists: true, size: typeof size === "number" ? size : undefined };
  }

  async remove(path: string) {
    const { error } = await this.db.storage.from(this.bucket).remove([path]);
    if (error) throw new Error("[onboarding/storage] remove: " + error.message);
  }

  async signedDownloadUrl(path: string, expiresInSeconds: number, downloadName?: string) {
    const { data, error } = await this.db.storage
      .from(this.bucket)
      .createSignedUrl(path, expiresInSeconds, downloadName ? { download: downloadName } : undefined);
    if (error || !data) throw new Error("[onboarding/storage] signed url: " + (error?.message || "no data"));
    return data.signedUrl;
  }
}
