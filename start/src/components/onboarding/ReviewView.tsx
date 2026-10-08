import type { PublicOnboardingConfig } from "@/config/onboarding/types";
import { fieldStatus, isCard, summarize, truncate, type SectionStats } from "@/lib/onboarding/status";
import type { Answers } from "@/lib/onboarding/types";
import { ArrowLeft, ArrowRight } from "./icons";

const pad2 = (n: number) => String(n).padStart(2, "0");
const CHIP = { confirmed: ["#D6E7F8", "#0F2E57"], updated: ["#FBE3D3", "#7A3410"], needed: ["#EEF1F4", "#3A4452"] } as const;

export function ReviewView({
  config,
  answers,
  stats,
  agree,
  sending,
  error,
  onToggleAgree,
  onEdit,
  onPrev,
  onSend,
}: {
  config: PublicOnboardingConfig;
  answers: Answers;
  stats: SectionStats[];
  agree: boolean;
  sending: boolean;
  error: string;
  onToggleAgree: () => void;
  onEdit: (i: number) => void;
  onPrev: () => void;
  onSend: () => void;
}) {
  const tot = (k: "confirmed" | "updated" | "needed") => stats.reduce((t, s) => t + s[k], 0);
  const can = agree && !sending;
  return (
    <>
      <div className="mb-7 flex flex-col gap-3">
        <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-blue-link">Final review</span>
        <h1 tabIndex={-1} id="section-title" className="m-0 text-[clamp(30px,4vw,44px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-navy outline-none onb-wide">
          Here’s everything we have.
        </h1>
        <p className="m-0 max-w-[620px] text-[clamp(17px,1.8vw,19px)] leading-[1.55] text-body text-pretty">Look it over, then send it to Catalyst. Anything still needed can come later.</p>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-2.5">
        {(
          [
            ["confirmed", "Confirmed", "#1558B8"],
            ["updated", "Updated", "#9A4615"],
            ["needed", "Still needed", "#4A5563"],
          ] as const
        ).map(([k, label, color]) => (
          <div key={k} className="flex flex-col gap-1.5 rounded-xl border border-line bg-white px-[clamp(12px,2vw,20px)] py-4">
            <span className="text-[clamp(26px,3vw,34px)] font-extrabold leading-none text-navy" style={{ fontStretch: "106%" }}>{tot(k)}</span>
            <span className="text-[14px] font-semibold" style={{ color }}>{label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {config.sections.map((s, i) => {
          const c = stats[i];
          const rows = s.fields.filter(isCard).map((f) => ({ f, a: answers[f.id] || {}, st: fieldStatus(f, answers[f.id] || {}) }));
          const chips: { label: string; k: keyof typeof CHIP }[] = [];
          if (c.confirmed) chips.push({ label: `${c.confirmed} confirmed`, k: "confirmed" });
          if (c.updated) chips.push({ label: `${c.updated} updated`, k: "updated" });
          if (c.needed) chips.push({ label: `${c.needed} still needed`, k: "needed" });
          const items = rows.filter((r) => r.st === "updated" || r.st === "needed");
          const allOptional = rows.every((r) => r.f.optional);
          const noteLine = items.length ? "" : c.confirmed ? "Everything in this section is covered." : allOptional ? "Optional — nothing added yet." : "";
          return (
            <div key={s.id} className="flex flex-col gap-3 rounded-xl border border-line bg-white px-[clamp(18px,3vw,26px)] py-[clamp(16px,2.6vw,22px)]">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="font-mono text-[12px] text-caption">{pad2(i + 1)}</span>
                <span className="text-[17px] font-bold text-navy">{s.title}</span>
                <div className="flex flex-auto flex-wrap gap-1.5">
                  {chips.map((ch) => (
                    <span key={ch.k} className="rounded-full px-2.5 py-[3px] text-[12px] font-bold" style={{ background: CHIP[ch.k][0], color: CHIP[ch.k][1] }}>
                      {ch.label}
                    </span>
                  ))}
                </div>
                <button type="button" onClick={() => onEdit(i)} aria-label={`Edit ${s.title}`} className="-mr-3 min-h-11 cursor-pointer rounded-md border-0 bg-transparent px-3 text-[14px] font-bold text-blue-link hover:bg-hover">
                  Edit
                </button>
              </div>
              {items.length > 0 && (
                <ul className="m-0 flex list-none flex-col border-t border-line-row p-0">
                  {items.map((r) => {
                    const k = r.st === "updated" ? "updated" : "needed";
                    const sum = k === "updated" ? truncate(summarize(r.f, r.a), 110) : "";
                    return (
                      <li key={r.f.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-[#EEF1F4] py-2.5">
                        <div className="flex min-w-0 flex-[1_1_280px] flex-col gap-0.5">
                          <span className="text-[15px] leading-[1.45] text-navy">{r.f.label}</span>
                          {sum && <span className="text-[14px] leading-[1.45] text-secondary [overflow-wrap:anywhere]">{sum}</span>}
                        </div>
                        <span className="flex-none rounded-full px-2.5 py-[3px] text-[12px] font-bold" style={{ background: CHIP[k][0], color: CHIP[k][1] }}>
                          {k === "updated" ? "Updated" : "Still needed"}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
              {noteLine && <span className="text-[14px] text-secondary">{noteLine}</span>}
            </div>
          );
        })}
      </div>

      <div
        className="mt-7 flex flex-col gap-5 rounded-[14px] p-[clamp(20px,3vw,28px)] transition-[background,border-color] duration-[250ms]"
        style={{ background: agree ? "#F6FAFE" : "#FFFFFF", border: `1px solid ${agree ? "#1E6FE6" : "#DDE3EA"}` }}
      >
        <label className="relative grid cursor-pointer grid-cols-[28px_1fr] items-start gap-4">
          <input type="checkbox" checked={agree} onChange={onToggleAgree} className="peer absolute m-0 size-7 cursor-pointer opacity-0" />
          <span
            aria-hidden="true"
            className="pointer-events-none mt-px flex size-7 items-center justify-center rounded-md transition-[background,border-color] duration-200 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue"
            style={{ background: agree ? "#1E6FE6" : "#FFFFFF", border: `2px solid ${agree ? "#1E6FE6" : "#8A96A6"}` }}
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ opacity: agree ? 1 : 0 }}>
              <path d="M4.5 10.4l3.6 3.6L15.5 6.6" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-[16px] leading-[1.6] text-body text-pretty">{config.review.confirmationText}</span>
        </label>
        {error && (
          <p role="alert" className="m-0 rounded-lg border border-[#F3D9BF] bg-[#FFF6EC] px-4 py-3 text-[15px] text-[#5A3311]">
            {error}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <button type="button" onClick={onPrev} className="hidden min-h-[52px] cursor-pointer items-center gap-2.5 rounded-md border border-line-input bg-transparent px-[18px] text-[15px] font-bold text-navy-deep hover:border-navy-deep nav:inline-flex">
            <ArrowLeft />
            Previous
          </button>
          <span className="hidden flex-1 nav:block" />
          <button
            type="button"
            disabled={!can}
            aria-disabled={!can}
            onClick={onSend}
            className="inline-flex min-h-14 w-full flex-[0_1_auto] items-center justify-center gap-2.5 rounded-md border px-7 text-[17px] font-bold transition-colors duration-[250ms] nav:w-auto"
            style={{
              background: can ? "#0F2E57" : "#E9EDF2",
              color: can ? "#FFFFFF" : "#5B6676",
              borderColor: can ? "#0F2E57" : "#D5DCE4",
              cursor: can ? "pointer" : "not-allowed",
            }}
          >
            {sending ? "Sending…" : "Send to Catalyst"}
            <ArrowRight />
          </button>
        </div>
      </div>
    </>
  );
}
