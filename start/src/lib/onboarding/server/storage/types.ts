export interface UploadTarget {
  method: "PUT";
  url: string;
  headers: Record<string, string>;
}

/** Private file storage. Every read is a short-lived signed URL. */
export interface FileStorage {
  readonly kind: "supabase" | "local";
  createSignedUpload(path: string, contentType: string): Promise<UploadTarget>;
  exists(path: string): Promise<{ exists: boolean; size?: number }>;
  remove(path: string): Promise<void>;
  signedDownloadUrl(path: string, expiresInSeconds: number, downloadName?: string): Promise<string>;
}
