/**
 * Server-side notice to Catalyst Signal's form webhook.
 *
 * Reads SIGNAL_WEBHOOK_URL and SIGNAL_WEBHOOK_SECRET. If either is unset,
 * the call is skipped. The secret never leaves this process. Failures are
 * logged and never thrown, so a down or slow Signal host cannot change the
 * visitor's response.
 *
 * Signature matches Catalyst Signal docs/WEBHOOKS.md:
 * hex(HMAC_SHA256(secret, "<unix seconds>.<raw body>"))
 * Signal stores source type "Website Form" itself when sourceId is website-form.
 */

import { createHmac, randomUUID } from "node:crypto";

const TIMEOUT_MS = 4_000;

const LIMITS = {
  name: 200,
  email: 320,
  phone: 40,
  company: 200,
  service: 300,
  message: 4_000,
} as const;

export type SignalLead = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  message?: string | null;
  formName?: string | null;
  page?: string | null;
};

export type SignalPayload = {
  eventId: string;
  sourceId: "website-form";
  timestamp: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  message?: string;
};

function clip(value: string | null | undefined, max: number): string {
  if (!value) return "";
  const text = value.trim();
  if (!text) return "";
  return text.length <= max ? text : text.slice(0, max);
}

export function buildSignalPayload(lead: SignalLead, now = new Date(), eventId = randomUUID()): SignalPayload {
  const formName = clip(lead.formName, 200);
  const page = clip(lead.page, 300);
  const where = [formName, page].filter(Boolean).join(" · ");
  const detail = clip(lead.message, 3_600);
  const message = clip([detail, where ? `Form: ${where}` : ""].filter(Boolean).join("\n\n"), LIMITS.message);
  const interest = clip(lead.service, LIMITS.service) || formName || undefined;
  const email = clip(lead.email, LIMITS.email);

  const payload: SignalPayload = {
    eventId,
    sourceId: "website-form",
    timestamp: now.toISOString(),
  };

  const name = clip(lead.name, LIMITS.name);
  const phone = clip(lead.phone, LIMITS.phone);
  const company = clip(lead.company, LIMITS.company);
  if (name) payload.name = name;
  if (email.includes("@")) payload.email = email;
  if (phone) payload.phone = phone;
  if (company) payload.company = company;
  if (interest) payload.service = interest;
  if (message) payload.message = message;
  return payload;
}

export function signSignalBody(secret: string, timestampSeconds: string, rawBody: string): string {
  return createHmac("sha256", secret).update(`${timestampSeconds}.${rawBody}`).digest("hex");
}

function envValue(name: "SIGNAL_WEBHOOK_URL" | "SIGNAL_WEBHOOK_SECRET"): string {
  // Dynamic lookup so Next does not inline the value at build time.
  // Mario sets these on Vercel after this code ships.
  return process.env[name]?.trim() ?? "";
}

export async function notifySignal(lead: SignalLead): Promise<void> {
  const url = envValue("SIGNAL_WEBHOOK_URL");
  const secret = envValue("SIGNAL_WEBHOOK_SECRET");
  if (!url || !secret) return;

  const payload = buildSignalPayload(lead);
  if (!payload.name && !payload.email && !payload.phone && !payload.message) return;

  const rawBody = JSON.stringify(payload);
  const timestamp = String(Math.floor(Date.now() / 1000));
  const signature = signSignalBody(secret, timestamp, rawBody);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Catalyst-Timestamp": timestamp,
        "X-Catalyst-Signature": signature,
      },
      body: rawBody,
      redirect: "manual",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`[signal] webhook responded ${res.status} ${detail.slice(0, 200)}`);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[signal] webhook failed: ${message}`);
  }
}
