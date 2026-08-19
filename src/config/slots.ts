/**
 * Single source of truth for the /trades (getbranded) offer.
 *
 * Scarcity: edit SLOTS_REMAINING only (0–5 at the current price).
 * When the first five at $4,000 sell out, set AT_STANDARD_PRICE = true
 * and reset SLOTS_REMAINING to 5 for the $6,000 rung.
 */
export const SLOTS_REMAINING = 5; // 0–5 at the current price — one-line scarcity edit
export const AT_STANDARD_PRICE = false; // false = $4,000 first 5; true = $6,000 next 5
export const RUNG_1_TOTAL = 5; // $4,000
export const RUNG_2_TOTAL = 5; // $6,000

/** Derived: total packages sold across both rungs (0–10). */
export const SLOTS_SOLD = AT_STANDARD_PRICE
  ? RUNG_1_TOTAL + (RUNG_2_TOTAL - Math.max(0, Math.min(RUNG_2_TOTAL, SLOTS_REMAINING)))
  : RUNG_1_TOTAL - Math.max(0, Math.min(RUNG_1_TOTAL, SLOTS_REMAINING));

/** Swappable audience eyebrow. Widen to "For Plumbing & HVAC Owners" here only. */
export const AUDIENCE_LINE = "For Plumbing Company Owners";

/** Set true when https://superjrefrigeration.com is publicly live. */
export const SUPER_J_IS_LIVE = true;
export const SUPER_J_URL = "https://superjrefrigeration.com";

export const CAL_URL = "https://cal.com/catalystdigitalsolutions/20min";
export const PHONE_DISPLAY = "(661) 888-4837";
export const PHONE_TEL = "+16618884837";

/** Canonical main site — use for logo / privacy / terms from the getbranded subdomain. */
export const MAIN_SITE_URL = "https://catalyst-digital-solutions.com";
export const GETBRANDED_HOST = "getbranded.catalyst-digital-solutions.com";
export const EMAIL = "info@catalyst-digital-solutions.com";

export type SlotState = {
  sold: number;
  booked: boolean;
  rung2: boolean;
  remaining: number;
  priceShown: string;
  priceNumber: string;
  counterText: string;
  urgencyLine: string | null;
  showUrgency: boolean;
  nextRungLine: string;
  dots: { available: boolean }[];
};

export function getSlotState(
  remainingInput = SLOTS_REMAINING,
  atStandard = AT_STANDARD_PRICE,
): SlotState {
  const remaining = Math.max(0, Math.min(5, remainingInput));
  const rung2 = atStandard;
  const booked = remaining === 0;
  const sold = rung2 ? 5 + (5 - remaining) : 5 - remaining;
  const priceNumber = booked ? "" : rung2 ? "$6,000" : "$4,000";
  const priceShown = booked ? "—" : priceNumber;
  const counterText = booked ? "Booked out" : `${remaining} of 5 available`;

  let urgencyLine: string | null = null;
  if (booked) urgencyLine = "Next openings TBD — book a call to get on the list.";
  else if (remaining === 1) urgencyLine = `Last one at ${priceNumber}.`;
  else if (remaining <= 3) urgencyLine = `Only ${remaining} left at ${priceNumber}.`;

  const nextRungLine = booked
    ? "All ten slots are taken."
    : rung2
      ? "The first 5 at $4,000 are gone."
      : "After these 5, the price is $6,000.";

  const dots = Array.from({ length: 5 }, (_, i) => ({ available: i < remaining }));

  return {
    sold,
    booked,
    rung2,
    remaining,
    priceShown,
    priceNumber,
    counterText,
    urgencyLine,
    showUrgency: !!urgencyLine,
    nextRungLine,
    dots,
  };
}
