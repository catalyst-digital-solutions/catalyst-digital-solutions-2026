import "server-only";
import { localStoreAllowed, supabaseEnv, UPLOAD_BUCKET } from "./env";
import { LocalStore } from "./store/local";
import { SupabaseStore } from "./store/supabase";
import type { OnboardingStore } from "./store/types";
import { LocalFileStorage } from "./storage/local";
import { SupabaseFileStorage } from "./storage/supabase";
import type { FileStorage } from "./storage/types";

export interface Backend {
  store: OnboardingStore;
  files: FileStorage;
}

const g = globalThis as unknown as { __onboardingBackend?: Backend | null };

/**
 * Supabase when SUPABASE_URL + service key are set; otherwise the local JSON
 * store in development. Returns null when nothing is configured (the page
 * then shows a calm "temporarily unavailable" state).
 */
export function getBackend(): Backend | null {
  if (g.__onboardingBackend !== undefined) return g.__onboardingBackend;
  const sb = supabaseEnv();
  let backend: Backend | null = null;
  if (sb) {
    const store = new SupabaseStore(sb.url, sb.key);
    backend = { store, files: new SupabaseFileStorage(store.db, UPLOAD_BUCKET) };
  } else if (localStoreAllowed()) {
    backend = { store: new LocalStore(), files: new LocalFileStorage() };
  }
  g.__onboardingBackend = backend;
  return backend;
}

export function requireBackend(): Backend {
  const b = getBackend();
  if (!b) throw new BackendUnavailableError();
  return b;
}

export class BackendUnavailableError extends Error {
  constructor() {
    super("Onboarding storage is not configured");
  }
}
