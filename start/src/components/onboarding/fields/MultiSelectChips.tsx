"use client";

import type { FieldDef } from "@/config/onboarding/types";
import { multiPicks, optionLabel } from "@/lib/onboarding/status";
import { pill, useOnboarding } from "../context";
import { Check, Plus } from "../icons";

export function MultiSelectChips({ f }: { f: FieldDef }) {
  const { answers, setAnswer } = useOnboarding();
  const a = answers[f.id] || {};
  const picks = multiPicks(f, a);
  return (
    <>
      <div role="group" aria-label={f.label} className="flex flex-wrap gap-2">
        {(f.options || []).map(optionLabel).map((o) => {
          const s = picks.includes(o);
          return (
            <button
              key={o}
              type="button"
              aria-pressed={s}
              onClick={() =>
                setAnswer(f.id, (prev) => {
                  const p = multiPicks(f, prev);
                  return { picks: p.includes(o) ? p.filter((x) => x !== o) : [...p, o] };
                })
              }
              className="inline-flex min-h-[46px] cursor-pointer items-center gap-2 rounded-full border px-4 text-[15px] font-semibold transition-colors duration-150"
              style={pill(s)}
            >
              {s ? <Check size={13} /> : <Plus />}
              <span>{o}</span>
            </button>
          );
        })}
      </div>
      {f.detailLabel && (
        <div className="flex flex-col gap-2">
          <label htmlFor={`${f.id}-detail`} className="text-[15px] font-semibold text-navy">{f.detailLabel}</label>
          <input id={`${f.id}-detail`} type="text" value={a.detail || ""} onChange={(e) => setAnswer(f.id, { detail: e.target.value })} placeholder={f.detailPlaceholder || ""} className="onb-input min-h-[52px] w-full px-4 py-3.5" />
        </div>
      )}
    </>
  );
}
