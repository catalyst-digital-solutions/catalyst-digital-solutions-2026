"use client";

import type { FieldDef } from "@/config/onboarding/types";
import { useOnboarding } from "../context";
import { Info } from "../icons";

export function ConflictCard({ f }: { f: FieldDef }) {
  const { answers, setAnswer } = useOnboarding();
  const a = answers[f.id] || {};
  const opts = [...(f.options || []).map((o) => (typeof o === "string" ? o : o.label)).map((l) => ({ label: l, key: l })), { label: f.otherLabel || "Something else", key: "__other" }];
  return (
    <>
      <div className="grid grid-cols-[20px_1fr] items-start gap-2.5 rounded-[10px] border border-[#F3D9BF] bg-[#FFF6EC] px-4 py-3.5 text-[15px] leading-[1.5] text-[#5A3311]">
        <Info />
        <span>{f.note}</span>
      </div>
      <div role="radiogroup" aria-label={f.label} className="flex flex-col gap-2">
        {opts.map((o) => {
          const s = a.pick === o.key;
          return (
            <button
              key={o.key}
              type="button"
              role="radio"
              aria-checked={s}
              onClick={() => setAnswer(f.id, { pick: o.key })}
              className="grid min-h-[52px] w-full cursor-pointer grid-cols-[20px_1fr] items-center gap-3 rounded-lg px-4 py-3 text-left text-[16px] font-semibold text-navy transition-[border-color,background] duration-150"
              style={{ border: `1px solid ${s ? "#1E6FE6" : "#C5CFDA"}`, background: s ? "#F3F8FE" : "#FFFFFF" }}
            >
              <span className="flex size-5 items-center justify-center rounded-full" style={{ border: `2px solid ${s ? "#1E6FE6" : "#8A96A6"}` }}>
                <span className="size-2.5 rounded-full bg-blue" style={{ opacity: s ? 1 : 0 }} />
              </span>
              <span>{o.label}</span>
            </button>
          );
        })}
        {a.pick === "__other" && (
          <input type="text" aria-label={f.label} value={a.other || ""} onChange={(e) => setAnswer(f.id, { other: e.target.value })} placeholder="Tell us more" className="onb-input min-h-[52px] w-full px-4 py-3.5" autoFocus />
        )}
      </div>
    </>
  );
}
