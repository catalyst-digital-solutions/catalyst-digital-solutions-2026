/**
 * Single source of truth for the /trades offer slot counter.
 * Edit SLOTS_SOLD only — every price, counter, and urgency line derives from it.
 */
export const SLOTS_SOLD = 0; // 0–10 total packages sold across both rungs
export const RUNG_1_TOTAL = 5; // $4,000
export const RUNG_2_TOTAL = 5; // $6,000

/** Set true when https://superjrefrigeration.com is publicly live. */
export const SUPER_J_IS_LIVE = true;
export const SUPER_J_URL = "https://superjrefrigeration.com";

export const CAL_URL = "https://cal.com/catalystdigitalsolutions/20min";
export const PHONE_DISPLAY = "(661) 888-4837";
export const PHONE_TEL = "+16618884837";

/** Canonical main site — use for logo / privacy / terms from the getbranded subdomain. */
export const MAIN_SITE_URL = "https://catalyst-digital-solutions.com";
export const GETBRANDED_HOST = "getbranded.catalyst-digital-solutions.com";
export const EMAIL = "hello@catalyst-digital.solutions";

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

export function getSlotState(soldInput = SLOTS_SOLD): SlotState {
  const sold = Math.max(0, Math.min(10, soldInput));
  const rung2 = sold >= 5;
  const booked = sold >= 10;
  const remaining = booked ? 0 : rung2 ? 10 - sold : 5 - sold;
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
