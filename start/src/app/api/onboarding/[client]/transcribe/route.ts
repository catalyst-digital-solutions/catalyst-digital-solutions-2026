import { authorize, handleError, json } from "@/lib/onboarding/server/http";
import { transcriptionProvider } from "@/lib/onboarding/server/transcribe";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_AUDIO_BYTES = 12 * 1024 * 1024; // ~10 minutes of compressed speech
const AUDIO_TYPES = /^(audio\/(webm|ogg|mp4|mpeg|mp3|wav|x-wav|aac|m4a|x-m4a)|video\/(webm|mp4))(;.*)?$/i;

/** Dictation: audio in, text out. The text is only ever appended client-side; nothing auto-submits. */
export async function POST(req: Request, { params }: { params: Promise<{ client: string }> }) {
  const { client } = await params;
  const a = await authorize(req, client, { name: "transcribe", max: 40, windowMs: 600_000 });
  if (a instanceof Response) return a;
  const provider = transcriptionProvider();
  if (!provider) return json({ error: "unavailable" }, 503);
  try {
    const len = Number(req.headers.get("content-length") || 0);
    if (len > MAX_AUDIO_BYTES) return json({ error: "too_large" }, 413);
    const type = (req.headers.get("content-type") || "").trim();
    if (!AUDIO_TYPES.test(type)) return json({ error: "invalid", message: "unsupported audio type" }, 400);
    const buf = new Uint8Array(await req.arrayBuffer());
    if (buf.byteLength > MAX_AUDIO_BYTES) return json({ error: "too_large" }, 413);
    if (buf.byteLength < 200) return json({ ok: true, text: "" });
    const text = await provider.transcribe(buf, type.split(";")[0]);
    return json({ ok: true, text: text.slice(0, 8000) });
  } catch (err) {
    if (err instanceof Error && /NoTranscript/i.test(err.name)) return json({ ok: true, text: "" });
    return handleError(err);
  }
}
