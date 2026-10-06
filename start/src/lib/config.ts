function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function readPublicUrl(raw: string | undefined): string | undefined {
  const trimmed = raw?.trim();
  if (!trimmed || !isHttpUrl(trimmed)) return undefined;
  return trimmed;
}

/** Resolves Stripe Payment Links from public env keys. Invalid values are treated as unset. */
export function getAtaraStripeUrls(): {
  kickoffUrl: string | undefined;
  fullUrl: string | undefined;
} {
  return {
    kickoffUrl: readPublicUrl(process.env.NEXT_PUBLIC_ATARA_STRIPE_KICKOFF_URL),
    fullUrl: readPublicUrl(process.env.NEXT_PUBLIC_ATARA_STRIPE_FULL_URL),
  };
}
