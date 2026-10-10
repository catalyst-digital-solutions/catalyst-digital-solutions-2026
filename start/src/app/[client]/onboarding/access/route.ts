import { NextResponse } from "next/server";
import { getOnboardingConfig } from "@/config/onboarding";
import { checkRawToken, sessionCookie } from "@/lib/onboarding/server/auth";
import { getBackend } from "@/lib/onboarding/server/backend";
import { recordOpened } from "@/lib/onboarding/server/service";
import { clientIp, rateLimit } from "@/lib/onboarding/server/rate-limit";

export const dynamic = "force-dynamic";

/**
 * Exchanges the emailed one-time-looking link (?t=…) for an httpOnly session
 * cookie, then redirects to the clean URL so the token leaves the address bar.
 */
export async function GET(req: Request, { params }: { params: Promise<{ client: string }> }) {
  const { client } = await params;
  const url = new URL(req.url);
  const dest = new URL(`/${client}/onboarding`, url);
  const redirect = (to: URL) => {
    const res = NextResponse.redirect(to, 303);
    res.headers.set("Cache-Control", "no-store");
    res.headers.set("Referrer-Policy", "no-referrer");
    return res;
  };

  if (!getOnboardingConfig(client)) return new NextResponse("Not found", { status: 404 });
  const backend = getBackend();
  if (!backend) return redirect(dest);
  if (!rateLimit(`access:${clientIp(req)}`, 30, 600_000)) return new NextResponse("Too many requests", { status: 429 });

  const check = await checkRawToken(backend, client, url.searchParams.get("t") || "");
  if (!check.ok) {
    await backend.store.addEvent({ instance_id: null, type: "access.link_rejected", section_id: null, meta: { client, reason: check.reason } });
    dest.searchParams.set("access", check.reason === "invalid" ? "invalid" : "expired");
    return redirect(dest);
  }
  await backend.store.touchToken(check.token.id);
  await recordOpened(backend, check.instance, "link");
  const res = redirect(dest);
  const c = sessionCookie(client, check.token);
  res.cookies.set(c.name, c.value, c.options);
  return res;
}
