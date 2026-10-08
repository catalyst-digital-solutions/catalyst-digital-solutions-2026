import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { baseUrl } from "../env";
import { localDataDir } from "../store/local";
import type { FileStorage, UploadTarget } from "./types";

/**
 * Local private file storage for development/QA. Mirrors Supabase's signed
 * upload flow: the browser PUTs to a short-lived HMAC-signed URL served by
 * /api/onboarding/local-files. Never enabled on Vercel.
 */
const SECRET = process.env.ONBOARDING_SESSION_SECRET || "local-dev-only-secret";

export function localFilePath(storagePath: string) {
  const root = path.join(localDataDir(), "uploads");
  const full = path.resolve(root, storagePath);
  if (!full.startsWith(path.resolve(root) + path.sep)) throw new Error("bad path");
  return full;
}

function sign(op: string, storagePath: string, exp: number) {
  return createHmac("sha256", SECRET).update(`${op}\n${storagePath}\n${exp}`).digest("base64url");
}

export function verifyLocalSignature(op: string, storagePath: string, exp: number, sig: string) {
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  const want = Buffer.from(sign(op, storagePath, exp));
  const got = Buffer.from(sig || "");
  return want.length === got.length && timingSafeEqual(want, got);
}

function signedUrl(op: string, storagePath: string, seconds: number, extra = "") {
  const exp = Date.now() + seconds * 1000;
  const q = new URLSearchParams({ op, p: storagePath, exp: String(exp), sig: sign(op, storagePath, exp) });
  return `/api/onboarding/local-files?${q.toString()}${extra}`;
}

export class LocalFileStorage implements FileStorage {
  readonly kind = "local" as const;

  async createSignedUpload(storagePath: string, contentType: string): Promise<UploadTarget> {
    return { method: "PUT", url: signedUrl("put", storagePath, 2 * 3600), headers: { "content-type": contentType } };
  }
  async exists(storagePath: string) {
    try {
      const st = await fs.stat(localFilePath(storagePath));
      return { exists: true, size: st.size };
    } catch {
      return { exists: false };
    }
  }
  async remove(storagePath: string) {
    await fs.rm(localFilePath(storagePath), { force: true });
  }
  async signedDownloadUrl(storagePath: string, seconds: number, downloadName?: string) {
    // Absolute, like Supabase signed URLs (used by the export/CLI).
    return baseUrl() + signedUrl("get", storagePath, seconds, downloadName ? `&name=${encodeURIComponent(downloadName)}` : "");
  }
}
