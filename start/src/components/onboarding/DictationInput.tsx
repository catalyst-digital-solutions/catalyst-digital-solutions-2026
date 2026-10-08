"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { pickDictationProvider, type DictationSession } from "@/lib/onboarding/client/dictation";
import { useOnboarding } from "./context";
import { Check, Dots, Mic, Stop } from "./icons";

type DState = "idle" | "listening" | "processing" | "transcribed" | "denied" | "failed";

const STATUS: Record<DState, string> = {
  idle: "Type or dictate your answer.",
  listening: "Listening… tap the button when you’re done.",
  processing: "Turning your words into text…",
  transcribed: "Transcribed and added to your answer. Edit anything you like.",
  denied: "Microphone access is off for this site. You can type instead.",
  failed: "We couldn’t catch that. Try again, or type your answer.",
};

/**
 * Textarea with a 44px mic pinned bottom-right and a status line.
 * Transcripts are appended (never replace existing text) and never submit anything.
 */
export function DictationInput({
  dictKey,
  label,
  value,
  placeholder,
  onChange,
}: {
  dictKey: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (fn: (prev: string) => string) => void;
}) {
  const { slug, preview, activeDictation } = useOnboarding();
  const [st, setSt] = useState<DState>("idle");
  const session = useRef<DictationSession | null>(null);
  const provider = useMemo(() => pickDictationProvider(slug, preview), [slug, preview]);
  const id = `dict-${dictKey.replace(/[^a-z0-9_-]/gi, "-")}`;

  useEffect(() => () => session.current?.abort(), []);

  const L = st === "listening";
  const P = st === "processing";
  const T = st === "transcribed";

  const toggle = async () => {
    if (P) return;
    if (L) {
      session.current?.stop();
      return;
    }
    try {
      session.current = await provider.start({
        onListening: () => {
          setSt("listening");
          // Another input starting (or leaving the section) stops this one.
          activeDictation.claim(dictKey, () => {
            session.current?.abort();
            session.current = null;
            setSt("idle");
          });
        },
        onProcessing: () => setSt("processing"),
        onText: (t) => onChange((p) => (p ? p.replace(/\s+$/, "") + " " : "") + t),
        onDone: () => {
          setSt("transcribed");
          activeDictation.release(dictKey);
          session.current = null;
        },
        onError: (k) => {
          setSt(k === "denied" ? "denied" : "failed");
          activeDictation.release(dictKey);
          session.current = null;
        },
      });
    } catch {
      /* state already set by onError */
    }
  };

  const statusFg = L ? "#9A4615" : T ? "#1558B8" : "#4A5563";
  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <textarea
          id={id}
          aria-label={label}
          aria-describedby={`${id}-status`}
          value={value}
          onChange={(e) => {
            const x = e.target.value;
            onChange(() => x);
          }}
          rows={3}
          placeholder={placeholder}
          className="onb-input block w-full resize-y py-3.5 pl-4 pr-16 leading-[1.55]"
          style={L ? { borderColor: "#E8692A", boxShadow: "0 0 0 3px rgba(232,105,42,0.15)" } : undefined}
        />
        <button
          type="button"
          aria-label={L ? "Stop dictation" : "Dictate your answer"}
          aria-pressed={L}
          onClick={toggle}
          className="absolute bottom-2 right-2 flex size-11 cursor-pointer items-center justify-center rounded-full border transition-colors duration-150"
          style={{
            background: L ? "#E8692A" : P ? "#EEF3F8" : "#FFFFFF",
            color: L ? "#0B1B2E" : P ? "#1558B8" : "#0F2E57",
            borderColor: L ? "#E8692A" : P ? "#D5DCE4" : "#C5CFDA",
          }}
        >
          {L ? <Stop /> : P ? <Dots /> : <Mic />}
        </button>
      </div>
      <div id={`${id}-status`} role="status" className="flex min-h-5 items-center gap-2 text-[13px] leading-[1.4]" style={{ color: statusFg }}>
        {L && <span className="size-2 flex-none rounded-full bg-orange" style={{ boxShadow: "0 0 0 4px rgba(232,105,42,0.18)" }} />}
        {T && <Check size={12} stroke={2.8} />}
        <span>{STATUS[st]}</span>
      </div>
    </div>
  );
}
