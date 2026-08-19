export type CheckoutPrefill = {
  sessionId: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  city: string;
};

function customText(
  fields: Array<{ key?: string; text?: { value?: string | null } | null }> | undefined,
  key: string,
): string {
  const match = fields?.find((f) => f.key === key);
  return match?.text?.value?.trim() ?? "";
}

/**
 * Pull name / email / phone / custom fields off a Stripe Checkout Session
 * so the Brand Starter intake can prefill. Returns empty strings when the
 * secret key is missing or the session can't be loaded.
 */
export async function getCheckoutPrefill(sessionId?: string): Promise<CheckoutPrefill> {
  const empty: CheckoutPrefill = {
    sessionId: sessionId ?? "",
    name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
  };
  if (!sessionId || !/^cs_(test|live)_/.test(sessionId)) return empty;

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return empty;

  try {
    const url = new URL(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`);
    url.searchParams.append("expand[]", "customer_details");
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${secret}` },
      cache: "no-store",
    });
    if (!res.ok) return empty;
    const session = (await res.json()) as {
      customer_details?: { name?: string | null; email?: string | null; phone?: string | null };
      customer_email?: string | null;
      custom_fields?: Array<{ key?: string; text?: { value?: string | null } | null }>;
    };
    const details = session.customer_details ?? {};
    return {
      sessionId,
      name: details.name?.trim() ?? "",
      email: (details.email || session.customer_email || "").trim(),
      phone: details.phone?.trim() ?? "",
      company: customText(session.custom_fields, "company_name"),
      city: customText(session.custom_fields, "city"),
    };
  } catch {
    return empty;
  }
}
