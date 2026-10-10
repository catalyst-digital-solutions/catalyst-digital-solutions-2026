import { authorize, handleError, json } from "@/lib/onboarding/server/http";
import { completeUpload } from "@/lib/onboarding/server/service";

export const dynamic = "force-dynamic";

/** Step 2: confirm the object landed in private storage, then mark it uploaded. */
export async function POST(req: Request, { params }: { params: Promise<{ client: string; fileId: string }> }) {
  const { client, fileId } = await params;
  const a = await authorize(req, client, { name: "upload-done", max: 240, windowMs: 600_000 });
  if (a instanceof Response) return a;
  try {
    const res = await completeUpload(a.backend, a.config, a.session.instance, fileId);
    return json({ ok: true, ...res });
  } catch (err) {
    return handleError(err);
  }
}
