import { authorize, handleError, json, readJson } from "@/lib/onboarding/server/http";
import { saveProgress } from "@/lib/onboarding/server/service";

export const dynamic = "force-dynamic";

/** Debounced autosave: a batch of field answers and/or the resume position. */
export async function POST(req: Request, { params }: { params: Promise<{ client: string }> }) {
  const { client } = await params;
  const a = await authorize(req, client, { name: "save", max: 240, windowMs: 60_000 });
  if (a instanceof Response) return a;
  try {
    const body = await readJson(req);
    const res = await saveProgress(a.backend, a.config, a.session.instance, {
      fields: body.fields && typeof body.fields === "object" ? (body.fields as Record<string, unknown>) : undefined,
      position: body.position && typeof body.position === "object" ? (body.position as Record<string, unknown>) : undefined,
    });
    return json({ ok: true, ...res });
  } catch (err) {
    return handleError(err);
  }
}
