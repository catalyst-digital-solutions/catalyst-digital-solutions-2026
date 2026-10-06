import type { ComponentType } from "react";

export type AgreementNavItem = {
  id: string;
  label: string;
};

export type AgreementSummaryRow = {
  label: string;
  value: string;
};

export type AgreementDefinition = {
  slug: string;
  partiesLine: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  metadata: {
    title: string;
    description: string;
    canonical: string;
  };
  checkoutEnvKey: string;
  checkoutButtonLabel: string;
  /** Optional highlighted acceptance copy. Omit to skip the extra panel. */
  acceptanceText?: string;
  summary: {
    heading: string;
    rows: AgreementSummaryRow[];
  };
  nav: AgreementNavItem[];
  Body: ComponentType;
};
