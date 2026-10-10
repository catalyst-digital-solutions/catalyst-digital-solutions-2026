import { getOnboardingConfig } from "@/config/onboarding";
import { hashIp, mintAccessLink } from "@/lib/onboarding/server/auth";
import { getBackend } from "@/lib/onboarding/server/backend";
import { sendOnboardingEmail } from "@/lib/onboarding/server/email";
import { handleError, json, readJson } from "@/lib/onboarding/server/http";
import { clientIp, rateLimit } from "@/lib/onboarding/server/rate-limit";

export const dynamic = "force-dynamic";

const GENERIC = { ok: true, message: "If that email matches this onboarding, a new private link is on its way." };

/**
 * "Request a new link". Always answers the same way (no account enumeration).
 * Limited per IP (memory) and per instance (database: max 3 per hour).
 */
export async function POST(req: Request, { params }: { params: Promise<{ client: string }> }) {
  const { client } = await params;
  const config = getOnboardingConfig(client);
  if (!config) return json({ error: "not_found" }, 404);
  const backend = getBackend();
  if (!backend) return json({ error: "unavailable" }, 503);
  const ip = clientIp(req);
  if (!rateLimit(`request-link:${ip}`, 5, 3600_000)) return json({ error: "rate_limited" }, 429);
  try {
    const body = await readJson(req, 2048);
    const email = String(body.email || "").trim().slice(0, 200);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "invalid", message: "Please enter a valid email address." }, 400);
    const instance = await backend.store.findActiveInstanceByEmail(client, email);
    if (!instance) {
      await backend.store.addEvent({ instance_id: null, type: "access.link_request_unmatched", section_id: null, meta: { client, ip: hashIp(ip) } });
      return json(GENERIC);
    }
    const since = new Date(Date.now() - 3600_000).toISOString();
    const recent = await backend.store.countEvents({ instanceId: instance.id, type: "access.link_requested", since });
    if (recent >= 3) return json(GENERIC);
    await backend.store.addEvent({ instance_id: instance.id, type: "access.link_requested", section_id: null, meta: { ip: hashIp(ip) } });

    const clientEmailsOn = (process.env.ONBOARDING_CLIENT_EMAILS || "").toLowerCase() === "on";
    let url: string | undefined;
    if (clientEmailsOn) {
      const link = await mintAccessLink(backend, instance);
      url = link.url;
      await sendOnboardingEmail(backend, "ready", config, instance, {
        url,
        expires: new Date(link.token.expires_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "America/Los_Angeles" }),
      });
    }
    await sendOnboardingEmail(backend, "internal_link_request", config, instance, { url });
    return json(GENERIC);
  } catch (err) {
    return handleError(err);
  }
}
