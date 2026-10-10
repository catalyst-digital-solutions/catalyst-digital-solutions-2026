import type { SectionDef } from "@/config/onboarding/types";
import type { SectionStats } from "@/lib/onboarding/status";
import { FieldRenderer } from "./FieldRenderer";
import { ArrowLeft, ArrowRight } from "./icons";

const pad2 = (n: number) => String(n).padStart(2, "0");

export function SectionView({
  section,
  index,
  total,
  stats,
  onPrev,
  onNext,
}: {
  section: SectionDef;
  index: number;
  total: number;
  stats: SectionStats;
  onPrev: () => void;
  onNext: () => void;
}) {
  const nextLabel = index < total - 1 ? "Continue" : "Review & send";
  const prefilledLabel = section.prefillNote || `We’ve pre-filled ${stats.prefilled} item${stats.prefilled > 1 ? "s" : ""} from our meetings and research.`;
  return (
    <>
      <div className="mb-[clamp(24px,3.5vw,36px)] flex flex-col gap-3">
        <span className="hidden font-mono text-[12px] uppercase tracking-[0.16em] text-blue-link nav:inline">
          Section {pad2(index + 1)} of {total}
        </span>
        <h1 tabIndex={-1} id="section-title" className="m-0 text-[clamp(30px,4vw,44px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-navy text-balance outline-none onb-wide">
          {section.title}
        </h1>
        <p className="m-0 max-w-[620px] text-[clamp(17px,1.8vw,19px)] leading-[1.55] text-body text-pretty">{section.intro}</p>
        {stats.prefilled > 0 && (
          <div className="mt-1 flex items-center gap-2.5 text-[15px] font-semibold text-navy-deep">
            <span className="flex size-[22px] flex-none items-center justify-center rounded-full bg-panel-confirmed">
              <svg width="12" height="12" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4.5 10.4l3.6 3.6L15.5 6.6" stroke="#1558B8" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>{prefilledLabel}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {section.fields.map((f) => (
          <FieldRenderer key={f.id} f={f} />
        ))}
      </div>

      <div className="mt-10 hidden flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-6 nav:flex">
        <button type="button" onClick={onPrev} className="inline-flex min-h-[52px] cursor-pointer items-center gap-2.5 rounded-md border border-line-input bg-transparent px-[18px] text-[15px] font-bold text-navy-deep hover:border-navy-deep">
          <ArrowLeft />
          Previous
        </button>
        <span className="flex-1" />
        <span className="text-[14px] text-secondary">{stats.needed ? `${stats.needed} item${stats.needed > 1 ? "s" : ""} still open` : "Everything here is covered"}</span>
        <button type="button" onClick={onNext} className="inline-flex min-h-[52px] cursor-pointer items-center gap-2.5 rounded-md border border-navy-deep bg-navy-deep px-6 text-[16px] font-bold text-white transition-colors duration-200 hover:border-blue-link hover:bg-blue-link">
          {nextLabel}
          <ArrowRight />
        </button>
      </div>
    </>
  );
}

export function MobileActionBar({ nextLabel, onPrev, onNext }: { nextLabel: string; onPrev: () => void; onNext: () => void }) {
  return (
    <div className="sticky bottom-0 z-[15] flex gap-2.5 border-t border-line bg-white/[0.97] px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 nav:hidden">
      <button type="button" aria-label="Previous" onClick={onPrev} className="flex size-[52px] flex-none cursor-pointer items-center justify-center rounded-md border border-line-input bg-white text-navy-deep">
        <ArrowLeft w={16} h={14} />
      </button>
      <button type="button" onClick={onNext} className="flex min-h-[52px] flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-md border border-navy-deep bg-navy-deep text-[16px] font-bold text-white">
        {nextLabel}
        <ArrowRight />
      </button>
    </div>
  );
}
