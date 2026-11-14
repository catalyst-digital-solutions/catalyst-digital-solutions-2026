const CHECKOUT_URLS: Record<string, string | undefined> = {
  NEXT_PUBLIC_ATARA_CHECKOUT_URL: process.env.NEXT_PUBLIC_ATARA_CHECKOUT_URL,
  // Myers Phase 1 kickoff ($8,500). Leave UNSET until the agreement is fully
  // executed and Mario approves live collection; the page also gates it via
  // myersAgreement.checkout.enabled = false.
  NEXT_PUBLIC_MYERS_CHECKOUT_URL: process.env.NEXT_PUBLIC_MYERS_CHECKOUT_URL,
};

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

/** Resolves a public checkout URL from a named env key. Invalid values are treated as unset. */
export function getCheckoutUrl(envKey: string): string | undefined {
  const raw = CHECKOUT_URLS[envKey]?.trim();
  if (!raw || !isHttpUrl(raw)) return undefined;
  return raw;
}
