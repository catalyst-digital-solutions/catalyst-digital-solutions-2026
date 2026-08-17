/**
 * Canonical registry of live Stripe Payment Links for the Brand Build campaign
 * (trades / getbranded offer). Single source of truth — if a link is ever
 * replaced in Stripe, update it HERE and nowhere else.
 *
 * All links verified 2026-08-17 (see docs/audits/stripe-tos-alignment-audit-2026-08-17.md):
 * - consent_collection.terms_of_service = required (checkbox links to getbranded/terms)
 * - customer_creation = if_required, payment_intent_data.setup_future_usage = null
 *   (no card is stored, nothing bills automatically)
 * - Public links redirect to https://getbranded.catalyst-digital-solutions.com/thank-you
 *
 * These links are NOT rendered on the landing page (all landing CTAs go to Cal.com).
 * They are sent to buyers directly after the call. The PRIVATE final-payment links
 * must never be published.
 */

export const BRAND_BUILD_LINKS = {
  /** Launch rung — $2,000 deposit ($4,000 total). plink_1U4lv0HtCGFFusafQVENuEjj */
  depositLaunch: "https://buy.stripe.com/8x2bJ11VW3NMcPu6ynfEk0i",
  /** Launch rung — $4,000 paid in full. plink_1U4lulHtCGFFusaf324QFjyI */
  fullLaunch: "https://buy.stripe.com/3cI3cvass0BA2aQ2i7fEk0h",
  /** Standard rung — $3,000 deposit ($6,000 total). plink_1U4lvOHtCGFFusaft7z155e1 */
  depositStandard: "https://buy.stripe.com/7sY4gzfMM5VU7va5ujfEk0k",
  /** Standard rung — $6,000 paid in full. plink_1U4lvCHtCGFFusafsdFsBLFY */
  fullStandard: "https://buy.stripe.com/9B66oHdEE6ZY02IcWLfEk0j",
} as const;

/** PRIVATE — send individually at handoff. Never publish or link from the site. */
export const BRAND_BUILD_FINAL_LINKS = {
  /** Launch rung — $2,000 final balance. plink_1U4lvcHtCGFFusafbWsbJpl9 */
  finalLaunch: "https://buy.stripe.com/3cIaEXeIIcki4iYf4TfEk0l",
  /** Standard rung — $3,000 final balance. plink_1U4lvmHtCGFFusafNYcMQB1S */
  finalStandard: "https://buy.stripe.com/3cIdR95884RQaHm09ZfEk0m",
} as const;

/** INTERNAL — $1 live smoke test (plink_1U4n74HtCGFFusafoi9gwJvJ). Deactivate after validation. */
export const SMOKE_TEST_LINK = "https://buy.stripe.com/28E28rbww8428zecWLfEk0n";
