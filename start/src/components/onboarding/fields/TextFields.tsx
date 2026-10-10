"use client";

import type { FieldDef } from "@/config/onboarding/types";
import { useOnboarding } from "../context";

function urlProblem(v: string) {
  if (!v.trim()) return "";
  try {
    const u = new URL(/^https?:\/\//i.test(v.trim()) ? v.trim() : "https://" + v.trim());
    return u.hostname.includes(".") ? "" : "That doesn’t look like a web address yet.";
  } catch {
    return "That doesn’t look like a web address yet.";
  }
}

export function TextField({ f }: { f: FieldDef }) {
  const { answers, setAnswer } = useOnboarding();
  const v = answers[f.id]?.value || "";
  const problem = f.format === "url" ? urlProblem(v) : "";
  return (
    <>
      <input
        type={f.format === "url" ? "url" : "text"}
        inputMode={f.format === "url" ? "url" : undefined}
        aria-label={f.label}
        aria-invalid={!!problem || undefined}
        value={v}
        onChange={(e) => setAnswer(f.id, { value: e.target.value })}
        placeholder={f.placeholder || ""}
        className="onb-input min-h-[52px] w-full px-4 py-3.5"
      />
      {problem && <span className="text-[13px] text-[#9A4615]">{problem}</span>}
    </>
  );
}

export function TextAreaField({ f }: { f: FieldDef }) {
  const { answers, setAnswer } = useOnboarding();
  return (
    <textarea
      aria-label={f.label}
      value={answers[f.id]?.value || ""}
      onChange={(e) => setAnswer(f.id, { value: e.target.value })}
      rows={f.rows || 3}
      placeholder={f.placeholder || ""}
      className="onb-input w-full resize-y px-4 py-3.5 leading-[1.55]"
    />
  );
}
