/**
 * Typed onboarding configuration. The renderer only knows these shapes —
 * all client-specific content lives in a config object (e.g. ./atara.ts).
 */

export type FieldType =
  | "known"
  | "conflict"
  | "choice"
  | "text"
  | "textarea"
  | "triage"
  | "multi"
  | "hours"
  | "upload"
  | "access"
  | "heading"
  | "note";

export type ChoiceOption =
  | string
  | {
      label: string;
      followup?: string;
      followType?: "text" | "textarea";
      placeholder?: string;
    };

export interface AccessItem {
  id: string;
  name: string;
  desc: string;
  note?: string;
  /** Catalyst already has working access — the row starts as Already Connected. */
  alreadyConnected?: boolean;
}

export interface FieldDef {
  id: string;
  type: FieldType;
  label: string;
  help?: string;
  optional?: boolean;
  // known
  value?: string | string[];
  intro?: string;
  source?: string;
  panelLabel?: string;
  prose?: boolean;
  quote?: string;
  quoteCite?: string;
  question?: string;
  questionHelp?: string;
  confirmLabel?: string;
  editLabel?: string;
  editMode?: "replace" | "append";
  appendPlaceholder?: string;
  details?: { label: string; body: string };
  /** Catalyst-only. Never rendered and never sent to the browser. */
  internalNote?: string;
  /** Catalyst-only. Never rendered and never sent to the browser. */
  confidence?: "high" | "medium" | "low";
  requiresClientConfirmation?: boolean;
  // conflict
  note?: string;
  otherLabel?: string;
  // choice / conflict / multi / triage
  options?: ChoiceOption[];
  items?: string[];
  accessItems?: AccessItem[];
  // multi
  detailLabel?: string;
  detailPlaceholder?: string;
  defaults?: string[];
  // text
  placeholder?: string;
  rows?: number;
  /** Format validation only (never required). */
  format?: "url";
  // upload
  accept?: string;
  categories?: string[];
  // note
  tone?: "info" | "conflict" | "secure";
  body?: string;
  // triage
  preset?: Partial<Record<string, string[]>>;
  otherPlaceholder?: string;
}

export interface SectionDef {
  id: string;
  short: string;
  title: string;
  intro: string;
  prefillNote?: string;
  fields: FieldDef[];
}

export interface OnboardingConfig {
  /** URL slug: /{slug}/onboarding */
  slug: string;
  /** Bump when field ids/meaning change so stored answers can be interpreted. */
  version: string;
  client: {
    /** Short name used in email subjects, e.g. "Atara". */
    shortName: string;
    name: string;
    legalName: string;
    contactFirstName: string;
    possessive: string;
  };
  brand: {
    clientLogo: string;
    clientLogoAlt: string;
    agencyLogo: string;
    agencyLogoAlt: string;
    eyebrow: string;
    pageTitle: string;
  };
  intro: {
    headline: string;
    body: string;
    reassurance: string;
    smallNote: string;
  };
  review: {
    confirmationText: string;
  };
  support: {
    name: string;
    email: string;
    label: string;
  };
  defaultAccept: string;
  sections: SectionDef[];
}

/** Config with Catalyst-only keys removed — safe to send to the browser. */
export type PublicOnboardingConfig = OnboardingConfig;
