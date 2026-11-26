/**
 * Contact form intake — POST /api/contact
 *
 * Accepts a JSON submission from any site form, stamps it with tracking info
 * (which form, when, page, referrer), and delivers it one of three ways,
 * in priority order — whichever is configured via env:
 *
 *   1. CONTACT_WEBHOOK_URL   → POSTs the JSON to a webhook (Zapier/Make/n8n),
 *                              which then emails hello@ (no DNS setup needed).
 *   2. RESEND_API_KEY        → sends the email directly via Resend to
 *                              CONTACT_TO_EMAIL (needs a verified sending domain).
 *   3. (neither set)         → logs to the server console so the flow is
 *                              testable in dev without any credentials.
 *
 * After a valid (non-honeypot) submission, also notifies Catalyst Signal when
 * both SIGNAL_WEBHOOK_URL and SIGNAL_WEBHOOK_SECRET are set. That call is
 * extra: a Signal failure does not change the response from the path above.
 *
 * Add new forms by POSTing here with a different `formId`/`formName`.
 */

import { notifySignal, type SignalLead } from "@/lib/signal-webhook";

export const dynamic = "force-dynamic"; // never cache; always run at request time

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "hello@catalyst-digital-solutions.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Catalyst Website <noreply@catalyst-digital-solutions.com>";

type Payload = Record<string, unknown> & {
  formId?: string;
  formName?: string;
  name?: string;
  email?: string;
  botField?: string;
  consentToContact?: boolean;
  meta?: Record<string, unknown>;
};

function esc(s: unknown): string {
  return String(s ?? "").replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] as string));
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function toSignalLead(p: Payload): SignalLead {
  const extra = p as Record<string, unknown>;
  const meta = (p.meta || {}) as Record<string, unknown>;
  const trade = text(extra.trade);
  const tradeOther = text(extra.tradeOther);
  const interest = trade === "Other" && tradeOther ? tradeOther : trade;
  const heard = text(extra.source);
  const heardOther = text(extra.sourceOther);
  const lines = [
    text(extra.challenge),
    text(extra.revenue) ? `Annual revenue: ${text(extra.revenue)}` : "",
    text(extra.url) ? `Website: ${text(extra.url)}` : "",
    heard ? `Heard about us: ${heard}${heardOther ? ` (${heardOther})` : ""}` : "",
  ].filter(Boolean);
  return {
    name: text(p.name),
    email: text(p.email),
    phone: text(extra.phone),
    company: text(extra.company),
    service: interest,
    message: lines.join("\n"),
    formName: text(p.formName) || text(p.formId) || "Website form",
    page: text(meta.pagePath) || text(meta.pageUrl),
  };
}

function buildEmail(p: Payload) {
  const meta = (p.meta || {}) as Record<string, unknown>;
  const rows = ([
    ["Form", `${p.formName || p.formId || "Website form"} (${p.formId || "unknown"})`],
    ["Name", p.name],
    ["Company", (p as Record<string, unknown>).company],
    ["Email", p.email],
    ["Phone", (p as Record<string, unknown>).phone],
    ["Trade / Specialty", (p as Record<string, unknown>).trade],
    ["Trade (other)", (p as Record<string, unknown>).tradeOther],
    ["Annual Revenue", (p as Record<string, unknown>).revenue],
    ["Website", (p as Record<string, unknown>).url],
    ["Challenge", (p as Record<string, unknown>).challenge],
    ["Heard about us", (p as Record<string, unknown>).source],
    ["Source (other)", (p as Record<string, unknown>).sourceOther],
    ["Consent to contact", p.consentToContact ? "Yes" : "No"],
    ["Consent to SMS", (p as Record<string, unknown>).consentToSms ? "Yes" : "No"],
    ["Submitted at", meta.submittedAt],
    ["Page", meta.pageUrl || meta.pagePath],
    ["Referrer", meta.referrer || "(direct)"],
  ] as [string, unknown][]).filter(([, v]) => v !== undefined && v !== "" && v !== null);

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html =
    `<h2 style="font-family:sans-serif">New submission — ${esc(p.formName || p.formId)}</h2>` +
    `<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">` +
    rows.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top"><b>${esc(k)}</b></td><td style="padding:4px 0">${esc(v)}</td></tr>`).join("") +
    `</table>`;
  const subject = `New ${p.formId || "website"} lead — ${p.name || "no name"}${(p as Record<string, unknown>).company ? " (" + esc((p as Record<string, unknown>).company) + ")" : ""}`;
  return { text, html, subject };
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: real users never fill this. Pretend success, deliver nothing.
  if (typeof body.botField === "string" && body.botField.trim() !== "") {
    return Response.json({ ok: true });
  }

  // Minimal validation.
  if (!body.name || !body.email || body.consentToContact !== true) {
    return Response.json({ ok: false, error: "Name, email, and contact consent are required." }, { status: 422 });
  }

  // Mirror the client's phone <-> SMS-consent interdependency (defense in depth).
  const b = body as Record<string, unknown>;
  const digits = String(b.phone ?? "").replace(/\D/g, "");
  const normalized = digits.length === 11 && digits[0] === "1" ? digits.slice(1) : digits;
  const hasPhone = normalized.length > 0;
  const validPhone = normalized.length === 10;
  const smsConsent = b.consentToSms === true;
  if ((hasPhone || smsConsent) && !validPhone) {
    return Response.json({ ok: false, error: "A valid 10-digit U.S. phone number is required." }, { status: 422 });
  }
  if (hasPhone && !smsConsent) {
    return Response.json({ ok: false, error: "SMS consent is required when a phone number is provided." }, { status: 422 });
  }

  const { text: emailText, html, subject } = buildEmail(body);
  const signalNotice = notifySignal(toSignalLead(body));

  try {
    // 1) Webhook (simplest; no domain verification needed)
    if (process.env.CONTACT_WEBHOOK_URL) {
      const res = await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, _subject: subject, _text: emailText }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      await signalNotice;
      return Response.json({ ok: true, via: "webhook" });
    }

    // 2) Resend (direct email)
    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [TO_EMAIL],
          reply_to: body.email,
          subject,
          text: emailText,
          html,
        }),
      });
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        throw new Error(`Resend responded ${res.status} ${detail}`);
      }
      await signalNotice;
      return Response.json({ ok: true, via: "resend" });
    }

    // 3) Dev fallback — no delivery configured. Log so it's testable.
    console.log("[contact] no CONTACT_WEBHOOK_URL / RESEND_API_KEY set — submission not delivered:\n" + emailText);
    await signalNotice;
    return Response.json({ ok: true, via: "log" });
  } catch (err) {
    console.error("[contact] delivery failed:", err);
    await signalNotice;
    return Response.json({ ok: false, error: "Delivery failed" }, { status: 502 });
  }
}
