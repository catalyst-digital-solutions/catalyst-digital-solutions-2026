import "server-only";
import { transcribe } from "ai";

/**
 * Speech-to-text behind a provider interface. Default: Vercel AI Gateway
 * (auth via the deployment's OIDC token on Vercel, or AI_GATEWAY_API_KEY
 * locally). Swap providers here without touching the UI.
 */
export interface TranscriptionProvider {
  readonly name: string;
  available(): boolean;
  transcribe(audio: Uint8Array, mediaType: string): Promise<string>;
}

class GatewayTranscription implements TranscriptionProvider {
  readonly name = "ai-gateway";
  constructor(private model: string) {}
  available() {
    return !!(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN || process.env.VERCEL);
  }
  async transcribe(audio: Uint8Array) {
    const res = await transcribe({
      model: this.model,
      audio,
      maxRetries: 1,
      abortSignal: AbortSignal.timeout(45_000),
    });
    return (res.text || "").trim();
  }
}

export function transcriptionProvider(): TranscriptionProvider | null {
  if ((process.env.ONBOARDING_TRANSCRIBE || "").toLowerCase() === "off") return null;
  const p = new GatewayTranscription(process.env.ONBOARDING_TRANSCRIBE_MODEL || "openai/gpt-4o-mini-transcribe");
  return p.available() ? p : null;
}
