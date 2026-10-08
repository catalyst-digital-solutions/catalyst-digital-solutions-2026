import type { PublicOnboardingConfig } from "@/config/onboarding/types";
import type { SectionStats } from "@/lib/onboarding/status";
import { ArrowRight, Check, CircleCheck } from "./icons";

const pad2 = (n: number) => String(n).padStart(2, "0");

export function IntroView({
  config,
  stats,
  hasProgress,
  resumeLabel,
  onStart,
}: {
  config: PublicOnboardingConfig;
  stats: SectionStats[];
  hasProgress: boolean;
  resumeLabel: string;
  onStart: () => void;
}) {
  const prefilledTotal = stats.reduce((t, s) => t + s.prefilled, 0);
  return (
    <main className="mx-auto grid w-full max-w-[1240px] flex-1 grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-start gap-[clamp(36px,5vw,80px)] px-[clamp(16px,4vw,40px)] pb-[clamp(56px,8vw,112px)] pt-[clamp(40px,7vw,96px)]">
      <div className="flex max-w-[580px] flex-col gap-[22px]">
        <div className="font-mono text-[12px] font-medium uppercase leading-[1.6] tracking-[0.18em] text-blue-link">{config.brand.eyebrow}</div>
        <h1 className="m-0 text-[clamp(40px,5.6vw,68px)] font-extrabold leading-none tracking-[-0.025em] text-navy text-balance" style={{ fontStretch: "110%" }}>
          {config.intro.headline}
        </h1>
        <p className="m-0 text-[clamp(18px,1.9vw,20px)] leading-[1.55] text-body text-pretty">{config.intro.body}</p>
        <div className="grid grid-cols-[22px_1fr] items-start gap-3 text-[16px] font-semibold leading-[1.5] text-navy-deep">
          <CircleCheck className="mt-px" />
          <span>{config.intro.reassurance}</span>
        </div>
        <p className="m-0 text-[16px] leading-[1.5] text-secondary">{config.intro.smallNote}</p>
        <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-4">
          <button
            type="button"
            onClick={onStart}
            className="inline-flex min-h-14 cursor-pointer items-center gap-3 rounded-md border border-navy-deep bg-navy-deep px-7 text-[17px] font-bold text-white shadow-[0_10px_24px_-14px_rgba(11,27,46,0.6)] transition-colors duration-200 hover:border-blue-link hover:bg-blue-link"
          >
            <span>{hasProgress ? "Continue where you left off" : "Start Onboarding"}</span>
            <ArrowRight w={16} h={14} />
          </button>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[12px] uppercase tracking-[0.12em] text-secondary">
            <span>{config.sections.length} sections</span>
            <span>Save and return anytime</span>
          </div>
        </div>
        {hasProgress && <p className="m-0 text-[14px] text-secondary">You left off at {resumeLabel}.</p>}
      </div>

      <div className="flex flex-col gap-4 rounded-[14px] border border-line bg-white p-[clamp(22px,3vw,32px)] shadow-[0_1px_2px_rgba(11,27,46,0.04),0_18px_40px_-28px_rgba(11,27,46,0.25)]">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="m-0 text-[18px] font-bold text-navy">What we’ll cover</h2>
          <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-caption">{prefilledTotal} items pre-filled</span>
        </div>
        <ol className="m-0 flex list-none flex-col border-t border-line-row p-0">
          {config.sections.map((s, i) => (
            <li key={s.id} className="grid grid-cols-[32px_1fr_auto] items-center gap-3 border-b border-line-row py-[11px]">
              <span className="font-mono text-[12px] text-caption">{pad2(i + 1)}</span>
              <span className="text-[15px] font-semibold text-navy">{s.title}</span>
              {stats[i].complete ? (
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-blue-link">
                  <Check size={14} stroke={2.4} />
                  Done
                </span>
              ) : stats[i].prefilled > 0 ? (
                <span className="rounded-full bg-[#EEF3F8] px-2.5 py-[3px] text-[13px] text-secondary">{stats[i].prefilled} pre-filled</span>
              ) : (
                <span />
              )}
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
