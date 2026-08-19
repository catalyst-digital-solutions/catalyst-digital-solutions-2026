/**
 * Canonical registry of live Stripe Payment Links for the Brand Build campaign
 * (trades / getbranded offer). Single source of truth — if a link is ever
 * replaced in Stripe, update it HERE and nowhere else.
 *
 * Brand Starter ($500) is the only public checkout on the landing page (v5).
 * Older $2,000 / $4,000 / $3,000 / $6,000 links stay in Stripe for history
 * but are unlinked from the page.
 */

import { getSlotState, SLOTS_REMAINING, AT_STANDARD_PRICE } from "@/config/slots";

/** Public — the only payment button on getbranded. plink_1U6ENtHtCGFFusafwg5tvtRL */
export const BRAND_STARTER_LINK = "https://buy.stripe.com/bJe8wP6cc842aHm9KzfEk0o";

/** PRIVATE — Mario texts at close. Never publish. plink_1U6ENvHtCGFFusafigcapiOF */
export const BRAND_BUILD_BALANCE_LINK = "https://buy.stripe.com/28E3cv444dom2aQ6ynfEk0p";

/** PRIVATE — used twice for the $1,750 / $1,750 split. Never publish. plink_1U6ENwHtCGFFusafoe1u3z9w */
export const BRAND_BUILD_HALF_BALANCE_LINK = "https://buy.stripe.com/8x228r8kkcki6r6cWLfEk0q";

/**
 * Retired from the page (v5). Kept for Stripe history — do not delete.
 * Verified 2026-08-17 (see docs/audits/stripe-tos-alignment-audit-2026-08-17.md).
 */
export const BRAND_BUILD_LINKS = {
  /** Launch rung — $2,000 (was deposit). plink_1U4lv0HtCGFFusafQVENuEjj */
  depositLaunch: "https://buy.stripe.com/8x2bJ11VW3NMcPu6ynfEk0i",
  /** Launch rung — $4,000 paid in full. plink_1U4lulHtCGFFusaf324QFjyI */
  fullLaunch: "https://buy.stripe.com/3cI3cvass0BA2aQ2i7fEk0h",
  /** Standard rung — $3,000. plink_1U4lvOHtCGFFusaft7z155e1 */
  depositStandard: "https://buy.stripe.com/7sY4gzfMM5VU7va5ujfEk0k",
  /** Standard rung — $6,000 paid in full. plink_1U4lvCHtCGFFusafsdFsBLFY */
  fullStandard: "https://buy.stripe.com/9B66oHdEE6ZY02IcWLfEk0j",
} as const;

/** PRIVATE — prior-generation finals. Never publish. */
export const BRAND_BUILD_FINAL_LINKS = {
  /** Launch rung — $2,000 final balance. plink_1U4lvcHtCGFFusafbWsbJpl9 */
  finalLaunch: "https://buy.stripe.com/3cIaEXeIIcki4iYf4TfEk0l",
  /** Standard rung — $3,000 final balance. plink_1U4lvmHtCGFFusafNYcMQB1S */
  finalStandard: "https://buy.stripe.com/3cIdR95884RQaHm09ZfEk0m",
} as const;

/** INTERNAL — $1 live smoke test (plink_1U4n74HtCGFFusafoi9gwJvJ). Deactivated after validation. */
export const SMOKE_TEST_LINK = "https://buy.stripe.com/28E28rbww8428zecWLfEk0n";

export type OfferCheckout = {
  starterUrl: string;
  packageTotal: string;
  remainingBalance: string;
};

/** Current-rung totals for copy. Null when all 10 slots are sold. */
export function getOfferCheckout(
  remainingInput = SLOTS_REMAINING,
  atStandard = AT_STANDARD_PRICE,
): OfferCheckout | null {
  const slots = getSlotState(remainingInput, atStandard);
  if (slots.booked) return null;
  if (slots.rung2) {
    return {
      starterUrl: BRAND_STARTER_LINK,
      packageTotal: "$6,000",
      remainingBalance: "$5,500",
    };
  }
  return {
    starterUrl: BRAND_STARTER_LINK,
    packageTotal: "$4,000",
    remainingBalance: "$3,500",
  };
}
