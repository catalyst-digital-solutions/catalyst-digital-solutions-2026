import type { OnboardingConfig, PublicOnboardingConfig } from "@/config/onboarding/types";
import { optionLabel } from "./status";
import type { Answers, ClientState, View } from "./types";

/** Same demo answers as the prototype's `?demo=1` (first five sections answered). */
export function demoAnswers(config: OnboardingConfig | PublicOnboardingConfig): Answers {
  const out: Answers = {};
  const t = Date.now();
  config.sections.slice(0, 5).forEach((sec) =>
    sec.fields.forEach((f) => {
      if (f.type === "known") out[f.id] = f.id === "website" ? { status: "modified", value: "www.ataramechanical.com", at: t } : { status: "confirmed", at: t };
      if ((f.type === "conflict" || f.type === "choice") && f.options?.length) out[f.id] = { pick: optionLabel(f.options[0]), at: t };
      if (f.id === "svc_res")
        out[f.id] = {
          items: { "Ductless mini-splits": "Explain" },
          notes: { "Ductless mini-splits": "We install these, but mostly as part of larger replacement jobs." },
          at: t,
        };
    }),
  );
  return out;
}

/** Preview state for `?view=intro|section|review|submitted&step=N&demo=1` (never persisted). */
export function previewState(config: PublicOnboardingConfig, view: string, step: number, demo: boolean): ClientState {
  const v: View = view === "section" || view === "wizard" ? "wizard" : view === "review" || view === "submitted" ? view : "intro";
  return {
    instanceId: "preview",
    view: v,
    step: Math.min(Math.max(step - 1, 0), config.sections.length - 1),
    visited: {},
    answers: demo ? demoAnswers(config) : {},
    savedAt: demo ? Date.now() : null,
    submittedAt: v === "submitted" ? Date.now() : null,
  };
}
