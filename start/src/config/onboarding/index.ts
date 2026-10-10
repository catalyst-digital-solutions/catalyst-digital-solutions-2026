import { ataraOnboarding } from "./atara";
import type { FieldDef, OnboardingConfig, PublicOnboardingConfig } from "./types";

const CONFIGS: Record<string, OnboardingConfig> = {
  [ataraOnboarding.slug]: ataraOnboarding,
};

export function getOnboardingConfig(slug: string): OnboardingConfig | null {
  return Object.prototype.hasOwnProperty.call(CONFIGS, slug) ? CONFIGS[slug] : null;
}

export function listOnboardingSlugs(): string[] {
  return Object.keys(CONFIGS);
}

/** Removes Catalyst-only keys so they never reach the browser. */
export function toPublicConfig(config: OnboardingConfig): PublicOnboardingConfig {
  return {
    ...config,
    sections: config.sections.map((s) => ({
      ...s,
      fields: s.fields.map((f) => {
        const copy: FieldDef = { ...f };
        delete copy.internalNote;
        delete copy.confidence;
        delete copy.requiresClientConfirmation;
        return copy;
      }),
    })),
  };
}

export function findField(config: OnboardingConfig, fieldId: string) {
  for (const section of config.sections) {
    const field = section.fields.find((f) => f.id === fieldId);
    if (field) return { section, field };
  }
  return null;
}

export type { FieldDef, OnboardingConfig, PublicOnboardingConfig, SectionDef } from "./types";
