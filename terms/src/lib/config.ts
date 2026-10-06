const CHECKOUT_URLS: Record<string, string | undefined> = {
  NEXT_PUBLIC_ATARA_CHECKOUT_URL: process.env.NEXT_PUBLIC_ATARA_CHECKOUT_URL,
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
