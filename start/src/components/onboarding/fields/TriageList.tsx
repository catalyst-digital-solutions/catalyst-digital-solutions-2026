"use client";

import type { FieldDef } from "@/config/onboarding/types";
import { TRIAGE_OPTIONS, optionLabel, triageValue } from "@/lib/onboarding/status";
import { pill, useOnboarding } from "../context";
import { DictationInput } from "../DictationInput";

const EXPLAIN_PH = "Add a quick explanation, limitation, preference, or anything Mario should understand...";

export function TriageList({ f }: { f: FieldDef }) {
  const { answers, setAnswer } = useOnboarding();
  const a = answers[f.id] || {};
  const opts = f.options?.map(optionLabel) || TRIAGE_OPTIONS;
  const items = f.items || [];
  const n = items.filter((it) => triageValue(f, a, it)).length;
  return (
    <>
      <div className="flex flex-col border-t border-line-row">
        {items.map((it) => {
          const cur = triageValue(f, a, it);
          return (
            <div key={it} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line-row py-2.5">
              <span className="flex-[1_1_200px] text-[16px] leading-[1.4] text-navy">{it}</span>
              <div role="group" aria-label={it} className="flex flex-wrap gap-1.5">
                {opts.map((o) => {
                  const s = cur === o;
                  return (
                    <button
                      key={o}
                      type="button"
                      aria-pressed={s}
                      onClick={() => setAnswer(f.id, (prev) => ({ items: { ...(prev.items || {}), [it]: s ? null : o } }))}
                      className="min-h-11 cursor-pointer rounded-full border px-[13px] text-[14px] font-semibold transition-colors duration-150"
                      style={pill(s)}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
              {cur === "Explain" && (
                <div className="flex flex-[1_1_100%] flex-col gap-2 pb-1.5 pt-1">
                  <span className="text-[15px] font-semibold text-navy">Anything we should know?</span>
                  <DictationInput
                    dictKey={`${f.id}::${it}`}
                    label={`Anything we should know about ${it}?`}
                    value={(a.notes || {})[it] || ""}
                    placeholder={EXPLAIN_PH}
                    onChange={(fn) => setAnswer(f.id, (prev) => ({ notes: { ...(prev.notes || {}), [it]: fn((prev.notes || {})[it] || "") } }))}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-caption">
        {n} of {items.length} answered
      </span>
      {f.otherLabel && (
        <div className="flex flex-col gap-2">
          <span className="text-[15px] font-semibold text-navy">{f.otherLabel}</span>
          <DictationInput
            dictKey={`${f.id}::other`}
            label={f.otherLabel}
            value={a.other || ""}
            placeholder={f.otherPlaceholder || ""}
            onChange={(fn) => setAnswer(f.id, (prev) => ({ other: fn(prev.other || "") }))}
          />
        </div>
      )}
    </>
  );
}
