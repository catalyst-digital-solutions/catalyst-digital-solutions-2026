import { createHash, timingSafeEqual } from "node:crypto";
import { getOnboardingConfig } from "@/config/onboarding";
import { getBackend } from "@/lib/onboarding/server/backend";
import { handleError, json } from "@/lib/onboarding/server/http";
import { clientIp, rateLimit } from "@/lib/onboarding/server/rate-limit";
import { exportInstance } from "@/lib/onboarding/server/service";

export const dynamic = "force-dynamic";

/**
 * Catalyst-only structured export (JSON with 1-hour signed file URLs).
 * Disabled unless ONBOARDING_ADMIN_TOKEN is set. Use:
 *   curl -H "Authorization: Bearer $ONBOARDING_ADMIN_TOKEN" \
 *     "https://start.catalyst-digital-solutions.com/api/onboarding/admin/export?instance=<uuid>"
 */
function authorized(req: Request) {
  const want = process.env.ONBOARDING_ADMIN_TOKEN?.trim();
  if (!want || want.length < 24) return false;
  const got = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const a = createHash("sha256").update(want).digest();
  const b = createHash("sha256").update(got).digest();
  return timingSafeEqual(a, b);
}

export async function GET(req: Request) {
  if (!rateLimit(`admin:${clientIp(req)}`, 30, 600_000)) return json({ error: "rate_limited" }, 429);
  if (!authorized(req)) return json({ error: "not_found" }, 404);
  const backend = getBackend();
  if (!backend) return json({ error: "unavailable" }, 503);
  try {
    const u = new URL(req.url);
    const id = u.searchParams.get("instance") || "";
    const inst = /^[0-9a-f-]{36}$/i.test(id) ? await backend.store.getInstance(id) : null;
    const config = inst ? getOnboardingConfig(inst.client_slug) : null;
    if (!inst || !config) return json({ error: "not_found" }, 404);
    return json(await exportInstance(backend, config, inst));
  } catch (err) {
    return handleError(err);
  }
}
