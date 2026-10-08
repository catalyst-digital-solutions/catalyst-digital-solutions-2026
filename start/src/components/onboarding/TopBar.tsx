import type { PublicOnboardingConfig } from "@/config/onboarding/types";

export function TopBar({
  config,
  savedLabel,
  saveState,
  onExit,
}: {
  config: PublicOnboardingConfig;
  savedLabel?: string;
  saveState?: "ok" | "saving" | "offline";
  onExit?: () => void;
}) {
  return (
    <header className="sticky top-0 z-20 bg-navy text-page">
      <div className="mx-auto flex min-h-16 max-w-[1240px] items-center justify-between gap-4 px-[clamp(16px,4vw,40px)] py-2.5">
        <div className="flex min-w-0 items-center gap-3.5">
          <img src={config.brand.clientLogo} alt={config.brand.clientLogoAlt} className="block h-auto w-11" />
          <span className="hidden font-mono text-[14px] text-[#7A8EA3] nav:inline" aria-hidden="true">×</span>
          <img src={config.brand.agencyLogo} alt={config.brand.agencyLogoAlt} className="hidden h-6 w-auto nav:block" />
        </div>
        <div className="flex items-center gap-[clamp(12px,2vw,24px)]">
          {savedLabel && (
            <span role="status" aria-live="polite" className="flex items-center gap-2 text-[14px] text-[#C9D3DE]">
              <span className="size-2 flex-none rounded-full" style={{ background: saveState === "offline" ? "#E8692A" : "#22C4E0" }} />
              <span>{savedLabel}</span>
            </span>
          )}
          {onExit && (
            <button
              type="button"
              onClick={onExit}
              className="min-h-11 cursor-pointer rounded-md border border-white/[0.28] bg-transparent px-4 text-[14px] font-semibold text-page hover:border-white/50 hover:bg-white/[0.08]"
            >
              Save &amp; Exit
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
