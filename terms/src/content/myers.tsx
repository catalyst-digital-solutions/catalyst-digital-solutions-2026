import { MYERS_AGREEMENT_MARKDOWN, MYERS_AGREEMENT_SHA256 } from "@/content/myers/source.generated";
import { inlineText, parseBlocks, splitSections } from "@/lib/agreementMarkdown";
import type { AgreementNavItem } from "@/content/types";

/**
 * Myers Diesel Repair — Website Development & Independent Services Agreement.
 *
 * The ONLY contractual source is src/content/myers/agreement-v1.4.md
 * (Version 1.4, supplied by Mario Garza on November 13, 2026). The page,
 * the downloadable PDF and the signature copy are all rendered from it.
 * Do not edit legal wording here; replace the markdown and re-run
 * `node scripts/gen-myers-source.mjs` instead.
 */

const sections = splitSections(parseBlocks(MYERS_AGREEMENT_MARKDOWN));

const shortLabel = (title: string) =>
  inlineText(title)
    .replace(/^Schedule ([A-D]) — /, "Sched. $1 · ")
    .replace(/^Items for confirmation before signing$/, "Confirmations before signing");

export const myersAgreement = {
  slug: "myers",
  version: "1.4",
  versionLabel: "Version 1.4",
  versionDate: "November 13, 2026",
  title: "Website Development & Independent Services Agreement",
  clientName: "Myers Diesel Repair",
  sourceSha256: MYERS_AGREEMENT_SHA256,
  /** The document is a draft until Mario explicitly authorizes removal. */
  isDraft: true,
  metadata: {
    title:
      "Website Development & Independent Services Agreement — Version 1.4 (Draft) | Myers Diesel Repair",
    description:
      "Draft Version 1.4 of the Website Development & Independent Services Agreement between Catalyst Digital Solutions, LLC and Myers Diesel Repair, Inc.",
    canonical: "https://terms.catalystdigitalsolutions.com/myers",
  },
  pdf: {
    href: "/myers/Myers-Diesel-Website-Agreement-v1.4-DRAFT.pdf",
    label: "Download PDF (Version 1.4 · Draft)",
  },
  /**
   * E-SIGNATURE INTEGRATION POINT (disabled).
   * Signing must happen in an approved electronic-signature provider
   * (recommended: Dropbox Sign or DocuSign) using a template built from the
   * v1.4 PDF with: Myers authorized signer (Kenneth Wayne Myers, President),
   * Catalyst signer (Mario Garza), agreement version, signing dates, the
   * required Schedule D ACCEPT/DECLINE election + initials, and the
   * provider's completed-document/audit certificate retained by Catalyst.
   * Set `url` to the provider's signing link only after Mario approves.
   * Never implement a homemade signature, checkbox or payment as signature.
   */
  esign: {
    enabled: false,
    url: null as string | null,
  },
  /**
   * Phase 1 kickoff checkout ($8,500, one-time). Stays disabled until the
   * agreement is fully executed AND Mario approves live collection. The env
   * key below is intentionally unset; see stripe-kickoff spec.
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
    { id: "execution", label: "Signing & kickoff payment" },
  ],
};
