import { authorize, handleError, json, readJson } from "@/lib/onboarding/server/http";
import { removeUpload, setUploadCategory } from "@/lib/onboarding/server/service";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ client: string; fileId: string }> };

export async function PATCH(req: Request, { params }: Ctx) {
  const { client, fileId } = await params;
  const a = await authorize(req, client, { name: "upload-meta", max: 240, windowMs: 600_000 });
  if (a instanceof Response) return a;
  try {
    const body = await readJson(req, 4096);
    await setUploadCategory(a.backend, a.config, a.session.instance, fileId, body.category);
    return json({ ok: true });
  } catch (err) {
    return handleError(err);
  }
}

export async function DELETE(req: Request, { params }: Ctx) {
  const { client, fileId } = await params;
  const a = await authorize(req, client, { name: "upload-meta", max: 240, windowMs: 600_000 });
  if (a instanceof Response) return a;
  try {
    await removeUpload(a.backend, a.config, a.session.instance, fileId);
    return json({ ok: true });
  } catch (err) {
    return handleError(err);
  }
}
