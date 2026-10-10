"use client";

import type { FieldDef } from "@/config/onboarding/types";
import { optionLabel } from "@/lib/onboarding/status";
import { pill, useOnboarding } from "../context";
import { Check } from "../icons";

export function ChoiceField({ f }: { f: FieldDef }) {
  const { answers, setAnswer } = useOnboarding();
  const a = answers[f.id] || {};
  const sel = (f.options || []).find((o) => optionLabel(o) === a.pick);
  const fo = sel && typeof sel === "object" && sel.followup ? sel : null;
  return (
    <>
      <div role="group" aria-label={f.label} className="flex flex-wrap gap-2">
        {(f.options || []).map((o) => {
          const l = optionLabel(o);
          const s = a.pick === l;
          return (
            <button
              key={l}
              type="button"
              aria-pressed={s}
              onClick={() => setAnswer(f.id, { pick: s ? null : l })}
              className="inline-flex min-h-[46px] cursor-pointer items-center gap-2 rounded-full border px-[18px] text-[15px] font-semibold transition-colors duration-150"
              style={pill(s)}
            >
              {s && <Check size={13} />}
              <span>{l}</span>
            </button>
          );
        })}
      </div>
      {fo && (
        <div className="flex flex-col gap-2">
          <label htmlFor={`${f.id}-follow`} className="text-[15px] font-semibold text-navy">{fo.followup}</label>
          {fo.followType === "textarea" ? (
            <textarea id={`${f.id}-follow`} value={a.follow || ""} onChange={(e) => setAnswer(f.id, { follow: e.target.value })} rows={3} className="onb-input w-full resize-y px-4 py-3.5 leading-[1.5]" />
          ) : (
            <input id={`${f.id}-follow`} type="text" value={a.follow || ""} onChange={(e) => setAnswer(f.id, { follow: e.target.value })} placeholder={fo.placeholder || ""} className="onb-input min-h-[52px] w-full px-4 py-3.5" />
          )}
        </div>
      )}
    </>
  );
}
