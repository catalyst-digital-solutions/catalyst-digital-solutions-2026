import "server-only";

/** Server-only configuration. Never import from client components. */
export function supabaseEnv(): { url: string; key: string } | null {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim().replace(/\/$/, "");
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || "").trim();
  return url && key ? { url, key } : null;
}

export const isProductionDeploy = () => process.env.VERCEL_ENV === "production";

/**
 * The local JSON store is for development/QA only. It is never allowed on a
 * Vercel deployment (read-only, non-shared filesystem).
 */
export function localStoreAllowed() {
  return !process.env.VERCEL && process.env.ONBOARDING_ALLOW_LOCAL_STORE !== "0";
}

export const UPLOAD_BUCKET = process.env.ONBOARDING_UPLOAD_BUCKET || "onboarding-uploads";
export const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;

export function baseUrl() {
  return (process.env.ONBOARDING_BASE_URL || "https://start.catalyst-digital-solutions.com").replace(/\/$/, "");
}

export function sessionDays() {
  const n = Number(process.env.ONBOARDING_LINK_DAYS || 30);
  return Number.isFinite(n) && n > 0 && n <= 90 ? n : 30;
}
