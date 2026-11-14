import {
  MYERS_AGREEMENT_MARKDOWN,
  MYERS_AGREEMENT_SHA256,
  MYERS_SOURCE_SHA256,
} from "@/content/myers/source.generated";
import { inlineText, parseBlocks, splitSections } from "@/lib/agreementMarkdown";
import type { AgreementNavItem } from "@/content/types";

/**
 * Myers Diesel Repair — Website Development & Independent Services Agreement.
 *
 * The ONLY contractual source is src/content/myers/agreement-v1.4.md
 * (Version 1.4, supplied by Mario Garza on November 13, 2026). It is kept
 * unchanged. The page and the PDF render agreement-v1.4-final.md, which
 * scripts/make-myers-final.mjs builds from the source with only the removals
 * Mario authorized (internal confirmation notes and draft-status words).
 * Do not edit legal wording here; replace the source markdown and re-run
 * `node scripts/make-myers-final.mjs && node scripts/gen-myers-source.mjs`.
 */

const sections = splitSections(parseBlocks(MYERS_AGREEMENT_MARKDOWN));

const shortLabel = (title: string) =>
  inlineText(title).replace(/^Schedule ([A-D]) — /, "Sched. $1 · ");

export const myersAgreement = {
  slug: "myers",
  version: "1.4",
  versionLabel: "Version 1.4",
  versionDate: "November 13, 2026",
  title: "Website Development & Independent Services Agreement",
  clientName: "Myers Diesel Repair",
  sourceSha256: MYERS_SOURCE_SHA256,
  renderedSha256: MYERS_AGREEMENT_SHA256,
  metadata: {
    title:
      "Website Development & Independent Services Agreement — Version 1.4 | Myers Diesel Repair",
    description:
      "Version 1.4 (November 13, 2026) of the Website Development & Independent Services Agreement between Catalyst Digital Solutions, LLC and Myers Diesel Repair, Inc.",
    canonical: "https://terms.catalystdigitalsolutions.com/myers",
  },
  pdf: {
    href: "/myers/Myers-Diesel-Website-Agreement-v1.4.pdf",
    label: "Download PDF (Version 1.4)",
  },
  /**
   * Execution: Mario uploads the PDF to Zoho Sign manually and places the
   * signature, date and Schedule D (choice, initials, date) fields there.
   * No signing integration lives on this site.
   */
  executionNote: "This Agreement will be sent for electronic signature via Zoho Sign.",
  /**
   * Phase 1 kickoff checkout ($8,500, one-time). Not rendered on the page;
   * the link is sent separately after signing. The env key stays unset.
   */
  checkout: {
    enabled: false,
    envKey: "NEXT_PUBLIC_MYERS_CHECKOUT_URL",
  },
  sections,
  nav: [
    ...sections
      .filter((s) => s.title)
      .map<AgreementNavItem>((s) => ({ id: s.id, label: shortLabel(s.title!) })),
    { id: "execution", label: "Execution" },
  ],
};
