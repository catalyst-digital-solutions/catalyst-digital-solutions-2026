import { hashIp } from "@/lib/onboarding/server/auth";
import { authorize, handleError, json, readJson } from "@/lib/onboarding/server/http";
import { clientIp } from "@/lib/onboarding/server/rate-limit";
import { submitOnboarding } from "@/lib/onboarding/server/service";

export const dynamic = "force-dynamic";

export async function POST(req: Request, { params }: { params: Promise<{ client: string }> }) {
  const { client } = await params;
  const a = await authorize(req, client, { name: "submit", max: 10, windowMs: 600_000 });
  if (a instanceof Response) return a;
  try {
    const body = await readJson(req, 4096);
    if (body.confirm !== true) return json({ error: "invalid", message: "Please tick the confirmation box." }, 400);
    const res = await submitOnboarding(a.backend, a.config, a.session.instance, {
      userAgent: req.headers.get("user-agent") || "",
      ipHash: hashIp(clientIp(req)),
    });
    return json({ ok: true, ...res });
  } catch (err) {
    return handleError(err);
  }
}
