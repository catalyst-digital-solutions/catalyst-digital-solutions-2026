"use client";

import { useEffect } from "react";

export function SaveExitDialog({ resumeLabel, onKeepGoing, onExit }: { resumeLabel: string; onKeepGoing: () => void; onExit: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onKeepGoing();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onKeepGoing]);
  return (
    <div onClick={onKeepGoing} className="fixed inset-0 z-40 flex items-center justify-center bg-navy/55 p-5">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-title"
        onClick={(e) => e.stopPropagation()}
        className="onb-sheet flex w-full max-w-[460px] flex-col gap-3.5 rounded-[14px] bg-white p-[clamp(24px,4vw,32px)] shadow-[0_30px_60px_-20px_rgba(11,27,46,0.45)]"
      >
        <span className="flex size-11 items-center justify-center rounded-full bg-panel-confirmed">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4.5 10.4l3.6 3.6L15.5 6.6" stroke="#1558B8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 id="exit-title" className="m-0 text-[22px] font-bold text-navy">Your progress is saved.</h2>
        <p className="m-0 text-[16px] leading-[1.55] text-body text-pretty">You can close this page anytime. The link in your email will bring you back to {resumeLabel}.</p>
        <div className="mt-1.5 flex flex-wrap gap-2.5">
          <button type="button" autoFocus onClick={onKeepGoing} className="min-h-[52px] flex-[1_1_160px] cursor-pointer rounded-md border border-navy-deep bg-navy-deep text-[15px] font-bold text-white hover:border-blue-link hover:bg-blue-link">
            Keep going
          </button>
          <button type="button" onClick={onExit} className="min-h-[52px] flex-[1_1_160px] cursor-pointer rounded-md border border-line-input bg-white text-[15px] font-bold text-navy-deep hover:border-navy-deep">
            Exit for now
          </button>
        </div>
      </div>
    </div>
  );
}
