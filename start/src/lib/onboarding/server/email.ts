import "server-only";
import type { OnboardingConfig } from "@/config/onboarding/types";
import type { Backend } from "./backend";
import type { InstanceRow } from "./store/types";

/**
 * Email hooks behind a tiny provider abstraction.
 *  - Resend when RESEND_API_KEY + ONBOARDING_FROM_EMAIL are set, else log-only.
 *  - Client-facing emails are suppressed (logged only) unless
 *    ONBOARDING_CLIENT_EMAILS=on, so nothing reaches the client by accident.
 *  - Never sent for autosaves, confirmations, or section completion.
 */

export type EmailKind = "ready" | "submitted" | "complete" | "internal_submitted" | "internal_link_request";

interface Message {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

interface EmailProvider {
  readonly name: string;
  send(m: Message): Promise<{ id?: string }>;
}

class ResendProvider implements EmailProvider {
  readonly name = "resend";
  constructor(private key: string, private from: string) {}
  async send(m: Message) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${this.key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: this.from, to: [m.to], subject: m.subject, html: m.html, text: m.text, reply_to: m.replyTo }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}`);
    const j = (await res.json().catch(() => ({}))) as { id?: string };
    return { id: j.id };
  }
}

class LogProvider implements EmailProvider {
  readonly name = "log";
  async send(m: Message) {
    console.info(`[onboarding/email] (log only) to=${m.to} subject="${m.subject}"`);
    return {};
  }
}

function provider(): EmailProvider {
  const key = process.env.RESEND_API_KEY?.trim();
  const from = process.env.ONBOARDING_FROM_EMAIL?.trim();
  return key && from ? new ResendProvider(key, from) : new LogProvider();
}

const clientEmailsEnabled = () => (process.env.ONBOARDING_CLIENT_EMAILS || "").toLowerCase() === "on";
const internalTo = () => process.env.ONBOARDING_NOTIFY_EMAIL?.trim() || "";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function layout(title: string, paragraphs: string[], cta?: { label: string; url: string }, footer?: string) {
  const ps = paragraphs.map((p) => `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#2A2F36;">${esc(p)}</p>`).join("");
  const btn = cta
    ? `<p style="margin:24px 0;"><a href="${esc(cta.url)}" style="display:inline-block;background:#0F2E57;color:#ffffff;text-decoration:none;font-weight:700;font-size:16px;padding:14px 24px;border-radius:6px;">${esc(cta.label)}</a></p>`
    : "";
  const foot = footer ? `<p style="margin:24px 0 0;font-size:13px;line-height:1.5;color:#6B7685;">${esc(footer)}</p>` : "";
  const html = `<!doctype html><html><body style="margin:0;background:#F5F7F9;font-family:Arial,Helvetica,sans-serif;"><div style="max-width:560px;margin:0 auto;padding:32px 20px;"><div style="background:#ffffff;border:1px solid #DDE3EA;border-radius:12px;padding:28px;"><h1 style="margin:0 0 18px;font-size:22px;line-height:1.25;color:#0B1B2E;">${esc(title)}</h1>${ps}${btn}${foot}</div></div></body></html>`;
  const text = [title, "", ...paragraphs, ...(cta ? ["", `${cta.label}: ${cta.url}`] : []), ...(footer ? ["", footer] : [])].join("\n");
  return { html, text };
}

export function buildEmail(kind: EmailKind, config: OnboardingConfig, instance: InstanceRow, extra: { url?: string; expires?: string; totals?: Record<string, number> } = {}) {
  const first = instance.contact_name?.split(" ")[0] || config.client.contactFirstName;
  const sn = config.client.shortName;
  const sig = `— ${config.support.name}, Catalyst Digital Solutions`;
  switch (kind) {
    case "ready":
      return {
        subject: `Your ${sn} onboarding is ready`,
        ...layout(
          `Your ${sn} onboarding is ready`,
          [
            `Hi ${first},`,
            `We’ve already filled in what we know about ${config.client.name} from our meetings and research. Most of it is a quick confirmation — just fix anything that’s off and fill in the few things we still need.`,
            "Your progress saves automatically, so you can stop and come back anytime with this same link.",
            sig,
          ],
          extra.url ? { label: "Open your onboarding", url: extra.url } : undefined,
          `This private link is just for you${extra.expires ? ` and works until ${extra.expires}` : ""}. Please don’t forward it.`,
        ),
      };
    case "submitted":
      return {
        subject: "We received everything — thank you",
        ...layout("We received everything — thank you", [
          `Hi ${first},`,
          "Thank you — we’ve got it. We’ll review everything you sent and only come back to you if we need clarification on something specific.",
          "You don’t need to do anything else right now.",
          sig,
        ]),
      };
    case "complete":
      return {
        subject: "Onboarding complete — your website is moving into production",
        ...layout("Onboarding complete — your website is moving into production", [
          `Hi ${first},`,
          `We’ve reviewed everything from your onboarding. ${config.client.name}’s website is now moving into production, and we’ll keep you posted at each milestone.`,
          sig,
        ]),
      };
    case "internal_submitted": {
      const t = extra.totals || {};
      return {
        subject: `[Onboarding] ${config.client.name} submitted`,
        ...layout(`${config.client.name} submitted onboarding`, [
          `Instance ${instance.id} was submitted by ${instance.contact_email}.`,
          `Confirmed: ${t.confirmed ?? 0} · Updated: ${t.updated ?? 0} · Still needed: ${t.needed ?? 0} · Files: ${t.files ?? 0}.`,
          `Export: npm run onboarding -- export --instance ${instance.id}`,
        ]),
      };
    }
    case "internal_link_request":
      return {
        subject: `[Onboarding] ${config.client.name} asked for a new link`,
        ...layout(`${config.client.name} asked for a new onboarding link`, [
          `A new-link request matched ${instance.contact_email} (instance ${instance.id}).`,
          extra.url
            ? "A fresh link was emailed to the client."
            : `Client emails are switched off, so nothing was sent. Mint one with: npm run onboarding -- link --instance ${instance.id}`,
        ]),
      };
  }
}

export async function sendOnboardingEmail(
  backend: Backend,
  kind: EmailKind,
  config: OnboardingConfig,
  instance: InstanceRow,
  extra: Parameters<typeof buildEmail>[3] = {},
  opts: { force?: boolean } = {},
): Promise<{ delivered: boolean; provider: string; suppressed?: boolean }> {
  const internal = kind.startsWith("internal_");
  const to = internal ? internalTo() : instance.contact_email;
  const msg = buildEmail(kind, config, instance, extra);
  let p = provider();
  let suppressed = false;
  if (!to) suppressed = true;
  else if (!internal && !clientEmailsEnabled() && !opts.force) {
    suppressed = true;
    p = new LogProvider();
  }
  let delivered = false;
  try {
    if (!suppressed || p.name === "log") await p.send({ to: to || "(unset)", subject: msg.subject, html: msg.html, text: msg.text, replyTo: config.support.email });
    delivered = !suppressed && p.name !== "log";
  } catch (err) {
    console.error(`[onboarding/email] ${kind} failed:`, err instanceof Error ? err.message : err);
  }
  await backend.store
    .addEvent({ instance_id: instance.id, type: `email.${kind}`, section_id: null, meta: { provider: p.name, delivered, suppressed } })
    .catch(() => undefined);
  return { delivered, provider: p.name, suppressed };
}
