"use client";

import { createContext, useContext } from "react";
import type { PublicOnboardingConfig } from "@/config/onboarding/types";
import type { Answers, FieldAnswer, UploadedFileRef } from "@/lib/onboarding/types";

export type AnswerPatch = Partial<FieldAnswer> | ((prev: FieldAnswer) => Partial<FieldAnswer>);

export interface OnboardingCtx {
  slug: string;
  preview: boolean;
  config: PublicOnboardingConfig;
  answers: Answers;
  setAnswer: (fieldId: string, patch: AnswerPatch) => void;
  setFiles: (fieldId: string, fn: (files: UploadedFileRef[]) => UploadedFileRef[]) => void;
  /** Only one dictation input listens at a time. */
  activeDictation: { key: string | null; claim: (key: string, stop: () => void) => void; release: (key: string) => void };
  onSessionExpired: () => void;
}

export const OnboardingContext = createContext<OnboardingCtx | null>(null);

export function useOnboarding() {
  const c = useContext(OnboardingContext);
  if (!c) throw new Error("useOnboarding outside provider");
  return c;
}

export const ON = { background: "#0F2E57", color: "#FFFFFF", borderColor: "#0F2E57" };
export const OFF = { background: "#FFFFFF", color: "#0B1B2E", borderColor: "#C5CFDA" };
export const pill = (on: boolean) => (on ? ON : OFF);
