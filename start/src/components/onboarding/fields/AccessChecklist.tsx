"use client";

import type { FieldDef } from "@/config/onboarding/types";
import { ACCESS_OPTIONS, accessValue } from "@/lib/onboarding/status";
import { pill, useOnboarding } from "../context";

const STATE: Record<string, [string, string, string]> = {
  "Already Connected": ["Connected", "#EAF3FA", "#0F2E57"],
  "Invite Needed": ["We’ll send instructions", "#FFF6EC", "#5A3311"],
  "Not Set Up": ["Not set up yet", "#EEF1F4", "#3A4452"],
  "Not Applicable": ["Not needed", "#EEF1F4", "#3A4452"],
};

/** Website-scope access only. No credential inputs, ever. */
export function AccessChecklist({ f }: { f: FieldDef }) {
  const { answers, setAnswer } = useOnboarding();
  const a = answers[f.id] || {};
  return (
    <div className="flex flex-col border-t border-line-row">
      {(f.accessItems || []).map((it) => {
        const cur = accessValue(f, a, it.id);
        const st = cur ? STATE[cur] : null;
        return (
          <div key={it.id} className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 border-b border-line-row py-4">
            <div className="flex min-w-0 flex-[1_1_220px] flex-col gap-1">
              <span className="text-[16px] font-bold text-navy">{it.name}</span>
              <span className="text-[14px] leading-[1.45] text-secondary">{it.desc}</span>
              {it.note && <span className="text-[13px] leading-[1.45] text-blue-link">{it.note}</span>}
              {st && (
                <span className="mt-1 self-start rounded-full px-2.5 py-[3px] text-[12px] font-bold" style={{ background: st[1], color: st[2] }}>
                  Status: {st[0]}
                </span>
              )}
            </div>
            <div role="group" aria-label={it.name} className="flex flex-wrap gap-1.5">
              {ACCESS_OPTIONS.map((o) => {
                const s = cur === o;
                return (
                  <button
                    key={o}
                    type="button"
                    aria-pressed={s}
                    onClick={() => setAnswer(f.id, (prev) => ({ items: { ...(prev.items || {}), [it.id]: s ? null : o } }))}
                    className="min-h-11 cursor-pointer rounded-full border px-3.5 text-[14px] font-semibold transition-colors duration-150"
                    style={pill(s)}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
