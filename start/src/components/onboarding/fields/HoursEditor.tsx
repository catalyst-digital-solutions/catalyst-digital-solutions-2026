"use client";

import type { FieldDef } from "@/config/onboarding/types";
import { DAYS, type Day } from "@/lib/onboarding/types";
import { pill, useOnboarding } from "../context";

export function HoursEditor({ f }: { f: FieldDef }) {
  const { answers, setAnswer } = useOnboarding();
  const days = answers[f.id]?.days || {};
  const setDay = (d: Day, p: { open?: boolean; from?: string; to?: string }) =>
    setAnswer(f.id, (prev) => ({ days: { ...(prev.days || {}), [d]: { ...((prev.days || {})[d] || {}), ...p } } }));
  return (
    <>
      <div className="flex flex-col border-t border-line-row">
        {DAYS.map((d) => {
          const x = days[d] || {};
          return (
            <div key={d} className="flex min-h-[66px] flex-wrap items-center gap-x-3.5 gap-y-2.5 border-b border-line-row py-2.5">
              <span className="w-[108px] text-[16px] font-semibold text-navy">{d}</span>
              <div role="group" aria-label={d} className="flex gap-1.5">
                <button type="button" aria-pressed={x.open === true} onClick={() => setDay(d, { open: true })} className="min-h-11 min-w-[72px] cursor-pointer rounded-full border px-3.5 text-[14px] font-semibold" style={pill(x.open === true)}>Open</button>
                <button type="button" aria-pressed={x.open === false} onClick={() => setDay(d, { open: false })} className="min-h-11 min-w-[72px] cursor-pointer rounded-full border px-3.5 text-[14px] font-semibold" style={pill(x.open === false)}>Closed</button>
              </div>
              {x.open === true && (
                <div className="flex flex-[1_1_240px] items-center gap-2">
                  <input type="time" aria-label={`${d} opening time`} value={x.from || ""} onChange={(e) => setDay(d, { from: e.target.value })} className="onb-input min-h-11 min-w-0 flex-1 px-3 text-[15px]" />
                  <span className="text-[14px] text-secondary">to</span>
                  <input type="time" aria-label={`${d} closing time`} value={x.to || ""} onChange={(e) => setDay(d, { to: e.target.value })} className="onb-input min-h-11 min-w-0 flex-1 px-3 text-[15px]" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {days.Monday && typeof days.Monday.open === "boolean" && (
        <button
          type="button"
          onClick={() =>
            setAnswer(f.id, (prev) => {
              const d = { ...(prev.days || {}) };
              (["Tuesday", "Wednesday", "Thursday", "Friday"] as Day[]).forEach((k) => (d[k] = { ...d.Monday }));
              return { days: d };
            })
          }
          className="-ml-3 min-h-11 cursor-pointer self-start rounded-md border-0 bg-transparent px-3 text-[14px] font-bold text-blue-link hover:bg-hover"
        >
          Copy Monday’s hours to Tuesday–Friday
        </button>
      )}
    </>
  );
}
