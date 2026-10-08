import { nowMs } from "@/lib/onboarding/client/util";
import type { PublicOnboardingConfig } from "@/config/onboarding/types";

export function SubmittedView({ config, submittedAt }: { config: PublicOnboardingConfig; submittedAt: number | null }) {
  const label =
    "Submitted " +
    new Date(submittedAt || nowMs()).toLocaleString("en-US", { month: "long", day: "numeric", hour: "numeric", minute: "2-digit" });
  return (
    <main className="flex w-full flex-1 justify-center px-[clamp(16px,4vw,40px)] py-[clamp(56px,10vw,128px)]">
      <div className="flex w-full max-w-[640px] flex-col gap-6">
        <span className="flex size-14 items-center justify-center rounded-full bg-navy-deep">
          <svg width="26" height="26" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4.5 10.4l3.6 3.6L15.5 6.6" stroke="#22C4E0" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h1 tabIndex={-1} id="section-title" className="m-0 text-[clamp(38px,5.4vw,60px)] font-extrabold leading-[1.02] tracking-[-0.025em] text-navy text-balance outline-none" style={{ fontStretch: "110%" }}>
          Thank you — we’ve got it.
        </h1>
        <p className="m-0 text-[clamp(18px,1.9vw,20px)] leading-[1.55] text-body text-pretty">We’ll review everything you sent and only come back to you if we need clarification on something specific.</p>
        <p className="m-0 text-[clamp(17px,1.8vw,19px)] font-bold leading-[1.5] text-navy-deep">You don’t need to do anything else right now.</p>
        <div className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] rounded-[14px] border border-line bg-white shadow-[0_1px_2px_rgba(11,27,46,0.04)]">
          <div className="flex flex-col gap-2.5 px-6 py-[22px]">
            <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-secondary">Status</span>
            <span className="flex items-center gap-2.5 text-[18px] font-bold text-navy">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="10" fill="#1E6FE6" />
                <path d="M6 10.2l2.6 2.6L14 7.4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Onboarding submitted
            </span>
          </div>
          <div className="flex flex-col gap-2.5 border-l border-line-row px-6 py-[22px]">
            <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-secondary">Next</span>
            <span className="flex items-center gap-2.5 text-[18px] font-bold text-navy">
              <span className="flex size-5 flex-none items-center justify-center rounded-full border-2 border-navy-deep">
                <span className="size-2 rounded-full bg-navy-deep" />
              </span>
              Catalyst review
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[14px] text-secondary">
          <span suppressHydrationWarning>{label}</span>
          <a href={`mailto:${config.support.email}`} className="inline-flex min-h-11 items-center font-semibold underline-offset-[3px]">
            {config.support.label}
          </a>
        </div>
      </div>
    </main>
  );
}
