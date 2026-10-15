import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { getBackend } from "@/lib/onboarding/server/backend";
import { runNotifications } from "@/lib/onboarding/server/notify";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

function authorized(req: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return false;
  const got = Buffer.from(req.headers.get("authorization") || "");
  const want = Buffer.from(`Bearer ${secret}`);
  return got.length === want.length && timingSafeEqual(got, want);
}

/** Hourly (vercel.json). Vercel Cron sends `Authorization: Bearer $CRON_SECRET`. `?dry=1` reports without sending. */
export async function GET(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const backend = getBackend();
  if (!backend) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  const dryRun = new URL(req.url).searchParams.get("dry") === "1";
  const actions = await runNotifications(backend, { dryRun });
  console.info(`[onboarding/notify] ${dryRun ? "dry " : ""}actions=${actions.length}`, JSON.stringify(actions));
  return NextResponse.json({ ok: true, dryRun, actions }, { headers: { "Cache-Control": "no-store" } });
}
