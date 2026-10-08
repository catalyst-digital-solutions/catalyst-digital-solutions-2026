import type { PublicOnboardingConfig } from "@/config/onboarding/types";
import type { SectionStats } from "@/lib/onboarding/status";
import { Check, Close, ListIcon } from "./icons";

const pad2 = (n: number) => String(n).padStart(2, "0");

function stepStyle(st: SectionStats, on: boolean) {
  return {
    dotBg: st.complete ? "#1E6FE6" : "#FFFFFF",
    dotBd: st.complete ? "#1E6FE6" : on ? "#0F2E57" : st.touched ? "#1E6FE6" : "#C5CFDA",
    dotFg: on ? "#0F2E57" : "#6B7685",
    bg: on ? "#E4EBF3" : "transparent",
    fg: on || st.complete ? "#0B1B2E" : "#4A5563",
    weight: on ? 700 : 500,
  };
}

function Dot({ st, s, num, mono = true }: { st: SectionStats; s: ReturnType<typeof stepStyle>; num: number; mono?: boolean }) {
  return (
    <span
      className={`flex size-7 items-center justify-center rounded-full font-mono text-[11px] ${mono ? "font-medium" : ""}`}
      style={{ background: s.dotBg, border: `1.5px solid ${s.dotBd}`, color: s.dotFg }}
    >
      {st.complete ? <Check size={13} stroke={2.6} className="text-white" /> : pad2(num)}
    </span>
  );
}

export function ProgressSummary({ done, total }: { done: number; total: number }) {
  return (
    <div className="h-1 overflow-hidden rounded-sm bg-[#E3E8EE]">
      <div className="h-full rounded-sm bg-blue transition-[width] duration-300" style={{ width: `${Math.round((done / total) * 100)}%` }} />
    </div>
  );
}

export function StepNav({
  config,
  stats,
  step,
  view,
  onGo,
  onReview,
}: {
  config: PublicOnboardingConfig;
  stats: SectionStats[];
  step: number;
  view: string;
  onGo: (i: number) => void;
  onReview: () => void;
}) {
  const done = stats.filter((s) => s.complete).length;
  const N = config.sections.length;
  const rv = view === "review";
  return (
    <aside className="sticky top-16 hidden flex-col gap-6 py-10 nav:flex" aria-label="Progress">
      <div className="flex flex-col gap-2.5">
        <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-secondary">Your progress</span>
        <span className="text-[15px] font-semibold text-navy">
          {done} of {N} sections complete
        </span>
        <ProgressSummary done={done} total={N} />
      </div>
      <nav aria-label="Onboarding sections">
        <ol className="m-0 flex list-none flex-col gap-0.5 p-0">
          {config.sections.map((sec, i) => {
            const on = view === "wizard" && i === step;
            const s = stepStyle(stats[i], on);
            return (
              <li key={sec.id}>
                <button
                  type="button"
                  onClick={() => onGo(i)}
                  aria-current={on ? "step" : undefined}
                  className="grid w-full cursor-pointer grid-cols-[28px_1fr] items-center gap-3 rounded-lg border-0 px-2.5 py-[7px] text-left hover:!bg-[#E9EEF4]"
                  style={{ background: s.bg }}
                >
                  <Dot st={stats[i]} s={s} num={i + 1} />
                  <span className="text-[15px] leading-[1.3]" style={{ fontWeight: s.weight, color: s.fg }}>
                    {sec.short}
                    {stats[i].complete && <span className="sr-only"> (complete)</span>}
                  </span>
                </button>
              </li>
            );
          })}
          <li className="mt-2 border-t border-line pt-2">
            <button
              type="button"
              onClick={onReview}
              aria-current={rv ? "step" : undefined}
              className="grid w-full cursor-pointer grid-cols-[28px_1fr] items-center gap-3 rounded-lg border-0 px-2.5 py-[7px] text-left hover:!bg-[#E9EEF4]"
              style={{ background: rv ? "#E4EBF3" : "transparent" }}
            >
              <span className="flex size-7 items-center justify-center rounded-full bg-white text-navy-deep" style={{ border: `1.5px solid ${rv ? "#0F2E57" : "#C5CFDA"}` }}>
                <ListIcon />
              </span>
              <span className="text-[15px] leading-[1.3] text-navy" style={{ fontWeight: rv ? 700 : 500 }}>
                Final Review
              </span>
            </button>
          </li>
        </ol>
      </nav>
      <p className="m-0 text-[13px] leading-[1.55] text-secondary text-pretty">Progress saves automatically. Leave anytime and pick up where you left off.</p>
    </aside>
  );
}

export function MobileStepHeader({ label, done, total, onOpen }: { label: string; done: number; total: number; onOpen: () => void }) {
  return (
    <div className="sticky top-16 z-10 flex flex-col gap-2 border-b border-line bg-white px-4 pb-3 pt-2.5 nav:hidden">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-blue-link">{label}</span>
        <button type="button" onClick={onOpen} aria-haspopup="dialog" className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 border-0 bg-transparent pl-3 pr-1 text-[14px] font-semibold text-navy-deep">
          All sections
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
            <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <ProgressSummary done={done} total={total} />
    </div>
  );
}

export function StepSheet({
  config,
  stats,
  step,
  view,
  onGo,
  onReview,
  onClose,
}: {
  config: PublicOnboardingConfig;
  stats: SectionStats[];
  step: number;
  view: string;
  onGo: (i: number) => void;
  onReview: () => void;
  onClose: () => void;
}) {
  const done = stats.filter((s) => s.complete).length;
  return (
    <div onClick={onClose} className="fixed inset-0 z-40 flex items-end bg-navy/50">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="All sections"
        onClick={(e) => e.stopPropagation()}
        className="onb-sheet flex max-h-[86vh] w-full flex-col gap-1.5 overflow-auto rounded-t-2xl bg-white px-4 pb-[calc(20px+env(safe-area-inset-bottom))] pt-4"
      >
        <div className="flex items-center justify-between px-1 pb-2 pt-1">
          <span className="text-[17px] font-bold text-navy">
            {done} of {config.sections.length} sections complete
          </span>
          <button type="button" aria-label="Close" autoFocus onClick={onClose} className="flex size-11 cursor-pointer items-center justify-center rounded-md border-0 bg-transparent text-navy">
            <Close size={14} />
          </button>
        </div>
        {config.sections.map((sec, i) => {
          const on = view === "wizard" && i === step;
          const s = stepStyle(stats[i], on);
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => onGo(i)}
              aria-current={on ? "step" : undefined}
              className="grid min-h-[52px] w-full cursor-pointer grid-cols-[28px_1fr] items-center gap-3 rounded-lg border-0 px-2.5 py-2 text-left"
              style={{ background: s.bg }}
            >
              <Dot st={stats[i]} s={s} num={i + 1} mono={false} />
              <span className="text-[16px]" style={{ fontWeight: s.weight, color: s.fg }}>
                {sec.short}
              </span>
            </button>
          );
        })}
        <button type="button" onClick={onReview} className="mt-1.5 min-h-[52px] w-full cursor-pointer rounded-md border border-line-input bg-white text-[15px] font-bold text-navy-deep">
          Go to Final Review
        </button>
      </div>
    </div>
  );
}
