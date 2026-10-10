import { authorize, handleError, json, readJson } from "@/lib/onboarding/server/http";
import { createUpload } from "@/lib/onboarding/server/service";

export const dynamic = "force-dynamic";

/** Step 1 of an upload: validate + return a short-lived signed upload URL to the private bucket. */
export async function POST(req: Request, { params }: { params: Promise<{ client: string }> }) {
  const { client } = await params;
  const a = await authorize(req, client, { name: "upload", max: 120, windowMs: 600_000 });
  if (a instanceof Response) return a;
  try {
    const body = await readJson(req, 8192);
    const res = await createUpload(a.backend, a.config, a.session.instance, {
      fieldId: body.fieldId,
      name: body.name,
      size: body.size,
      category: body.category,
    });
    return json({ ok: true, ...res });
  } catch (err) {
    return handleError(err);
  }
}
