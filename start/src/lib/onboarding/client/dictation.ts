"use client";

/**
 * Dictation providers. The UI (DictationInput) only knows start/stop and the
 * four states; providers can be swapped without touching it.
 *
 *  - ServerDictation: MediaRecorder → POST /api/onboarding/{slug}/transcribe
 *    (AI Gateway STT). Works in current Chrome, Safari/iOS, Firefox, Android.
 *  - BrowserDictation: Web Speech API fallback when recording isn't possible.
 *  - SimulatedDictation: design-preview mode only (never writes anywhere).
 */
export interface DictationSession {
  stop(): void;
  abort(): void;
}

export interface DictationCallbacks {
  onListening(): void;
  onProcessing(): void;
  onText(text: string): void;
  onDone(): void;
  onError(kind: "denied" | "unsupported" | "failed"): void;
}

export interface DictationProvider {
  start(cb: DictationCallbacks): Promise<DictationSession>;
}

const MAX_MS = 3 * 60 * 1000;

function pickMime() {
  const MR = typeof window !== "undefined" ? window.MediaRecorder : undefined;
  if (!MR || typeof MR.isTypeSupported !== "function") return "";
  for (const t of ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"]) if (MR.isTypeSupported(t)) return t;
  return "";
}

export function serverDictation(slug: string): DictationProvider {
  return {
    async start(cb) {
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      } catch (e) {
        cb.onError(e instanceof DOMException && (e.name === "NotAllowedError" || e.name === "SecurityError") ? "denied" : "failed");
        throw e;
      }
      const mime = pickMime();
      const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      const chunks: Blob[] = [];
      let aborted = false;
      const release = () => stream.getTracks().forEach((t) => t.stop());
      const timer = setTimeout(() => rec.state !== "inactive" && rec.stop(), MAX_MS);
      rec.ondataavailable = (e) => e.data && e.data.size && chunks.push(e.data);
      rec.onstop = async () => {
        clearTimeout(timer);
        release();
        if (aborted) return;
        cb.onProcessing();
        const type = (rec.mimeType || mime || "audio/webm").split(";")[0];
        const blob = new Blob(chunks, { type });
        try {
          const res = await fetch(`/api/onboarding/${slug}/transcribe`, {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": type },
            body: blob,
          });
          if (!res.ok) throw new Error(String(res.status));
          const j = (await res.json()) as { text?: string };
          const text = (j.text || "").trim();
          if (!text) return cb.onError("failed"); // silence / nothing recognised
          cb.onText(text);
          cb.onDone();
        } catch {
          cb.onError("failed");
        }
      };
      rec.start(1000);
      cb.onListening();
      return {
        stop: () => rec.state !== "inactive" && rec.stop(),
        abort: () => {
          aborted = true;
          if (rec.state !== "inactive") rec.stop();
          else release();
        },
      };
    },
  };
}

type SR = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: (e: { resultIndex: number; results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }> }) => void;
  onerror: (e: { error?: string }) => void;
  onend: () => void;
  start(): void;
  stop(): void;
  abort(): void;
};

function speechRecognition(): (new () => SR) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: new () => SR; webkitSpeechRecognition?: new () => SR };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export function browserDictation(): DictationProvider {
  return {
    async start(cb) {
      const Ctor = speechRecognition();
      if (!Ctor) {
        cb.onError("unsupported");
        throw new Error("unsupported");
      }
      const r = new Ctor();
      r.lang = "en-US";
      r.continuous = true;
      r.interimResults = false;
      let failed = false;
      let aborted = false;
      let heard = false;
      r.onresult = (e) => {
        let t = "";
        for (let i = e.resultIndex; i < e.results.length; i++) if (e.results[i].isFinal) t += e.results[i][0].transcript;
        t = t.trim();
        if (t) {
          heard = true;
          cb.onText(t);
        }
      };
      r.onerror = (e) => {
        failed = true;
        cb.onError(e.error === "not-allowed" || e.error === "service-not-allowed" ? "denied" : "failed");
      };
      r.onend = () => {
        if (aborted || failed) return;
        cb.onProcessing();
        setTimeout(() => (heard ? cb.onDone() : cb.onError("failed")), 400);
      };
      r.start();
      cb.onListening();
      return { stop: () => r.stop(), abort: () => ((aborted = true), r.abort()) };
    },
  };
}

export function simulatedDictation(): DictationProvider {
  return {
    async start(cb) {
      cb.onListening();
      return {
        stop: () => {
          cb.onProcessing();
          setTimeout(() => cb.onDone(), 800);
        },
        abort: () => undefined,
      };
    },
  };
}

export function pickDictationProvider(slug: string, preview: boolean): DictationProvider {
  if (preview) return speechRecognition() ? browserDictation() : simulatedDictation();
  const canRecord = typeof window !== "undefined" && !!navigator.mediaDevices?.getUserMedia && typeof window.MediaRecorder !== "undefined";
  if (canRecord) return serverDictation(slug);
  return browserDictation();
}
