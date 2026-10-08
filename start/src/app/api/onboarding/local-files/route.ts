import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { getBackend } from "@/lib/onboarding/server/backend";
import { MAX_UPLOAD_BYTES } from "@/lib/onboarding/server/env";
import { localFilePath, verifyLocalSignature } from "@/lib/onboarding/server/storage/local";

export const dynamic = "force-dynamic";

/** Local-dev stand-in for Supabase signed upload/download URLs. 404 everywhere else. */
function guard(req: Request, op: "put" | "get") {
  const b = getBackend();
  if (!b || b.files.kind !== "local") return null;
  const u = new URL(req.url);
  const p = u.searchParams.get("p") || "";
  const ok = verifyLocalSignature(op, p, Number(u.searchParams.get("exp")), u.searchParams.get("sig") || "");
  return ok ? { p, name: u.searchParams.get("name") } : null;
}

export async function PUT(req: Request) {
  const g = guard(req, "put");
  if (!g) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const buf = Buffer.from(await req.arrayBuffer());
  if (buf.byteLength > MAX_UPLOAD_BYTES) return NextResponse.json({ error: "too_large" }, { status: 413 });
  const full = localFilePath(g.p);
  await fs.mkdir(path.dirname(full), { recursive: true });
  await fs.writeFile(full, buf);
  return NextResponse.json({ Key: g.p });
}

export async function GET(req: Request) {
  const g = guard(req, "get");
  if (!g) return NextResponse.json({ error: "not_found" }, { status: 404 });
  try {
    const data = await fs.readFile(localFilePath(g.p));
    return new NextResponse(data, {
      headers: {
        "content-type": "application/octet-stream",
        "content-disposition": `attachment; filename="${(g.name || path.basename(g.p)).replace(/"/g, "")}"`,
        "cache-control": "private, no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
}
