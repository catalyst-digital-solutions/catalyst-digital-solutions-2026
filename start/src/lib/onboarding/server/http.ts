import "server-only";
import { NextResponse } from "next/server";
import { getOnboardingConfig } from "@/config/onboarding";
import type { OnboardingConfig } from "@/config/onboarding/types";
import { readSession, type Session } from "./auth";
import { getBackend, type Backend } from "./backend";
import { clientIp, rateLimit } from "./rate-limit";
import { ConflictError } from "./service";
import { ValidationError } from "./validate";

export const json = (data: unknown, status = 200) =>
  NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });

export type Authed = { backend: Backend; config: OnboardingConfig; session: Session };

/** Same-origin check for state-changing requests (defence in depth with SameSite=Lax). */
function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/**
 * Resolves the client config + authorised session for an API request.
 * The onboarding instance always comes from the signed session — never from
 * the request body.
 */
export async function authorize(
  req: Request,
  slug: string,
  limit: { name: string; max: number; windowMs: number },
): Promise<Authed | NextResponse> {
  const config = getOnboardingConfig(slug);
  if (!config) return json({ error: "not_found" }, 404);
  if (req.method !== "GET" && !sameOrigin(req)) return json({ error: "forbidden" }, 403);
  const backend = getBackend();
  if (!backend) return json({ error: "unavailable" }, 503);
  if (!rateLimit(`${limit.name}:ip:${clientIp(req)}`, limit.max * 2, limit.windowMs)) return json({ error: "rate_limited" }, 429);
  const s = await readSession(backend, slug);
  if (!s.ok) return json({ error: s.reason === "expired" ? "expired" : "unauthorized" }, 401);
  if (!rateLimit(`${limit.name}:inst:${s.session.instance.id}`, limit.max, limit.windowMs)) return json({ error: "rate_limited" }, 429);
  return { backend, config, session: s.session };
}

export function handleError(err: unknown) {
  if (err instanceof ValidationError) return json({ error: "invalid", message: err.message }, 400);
  if (err instanceof ConflictError) return json({ error: "submitted", message: err.message }, 409);
  console.error("[onboarding] error:", err instanceof Error ? err.message : err);
  return json({ error: "server_error" }, 500);
}

export async function readJson(req: Request, maxBytes = 256 * 1024): Promise<Record<string, unknown>> {
  const len = Number(req.headers.get("content-length") || 0);
  if (len > maxBytes) throw new ValidationError("request too large");
  const text = await req.text();
  if (text.length > maxBytes) throw new ValidationError("request too large");
  try {
    const v = JSON.parse(text || "{}");
    if (!v || typeof v !== "object" || Array.isArray(v)) throw new Error();
    return v as Record<string, unknown>;
  } catch {
    throw new ValidationError("invalid JSON");
  }
}
