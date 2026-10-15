import "server-only";
import type { OnboardingConfig } from "@/config/onboarding/types";
import type { Backend } from "./backend";
import { clientEmailsAllowed } from "./notify-settings";
import type { InstanceRow } from "./store/types";

/**
 * Email hooks behind a tiny provider abstraction.
 *  - Resend when RESEND_API_KEY + ONBOARDING_FROM_EMAIL are set, else log-only.
 *  - Client-facing emails are suppressed (logged only) unless the instance /
 *    client policy turns clientEmails on (see notify-settings.ts) or the legacy
 *    global ONBOARDING_CLIENT_EMAILS=on is set. Default: off.
 *  - Never sent for autosaves, confirmations, or section completion.
 */

export type ClientEmailKind = "ready" | "submitted" | "complete" | "client_nudge_unopened" | "client_nudge_progress" | "client_last_mile";
export type InternalEmailKind =
  | "internal_submitted"
  | "internal_link_request"
  | "internal_not_opened"
  | "internal_stalled"
  | "internal_halfway"
  | "internal_link_expiring";
export type EmailKind = ClientEmailKind | InternalEmailKind;

export interface Message {
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

export const internalTo = () => process.env.ONBOARDING_NOTIFY_EMAIL?.trim() || "";

/** Low-level send (used by the digest and the preview script). */
export async function sendRaw(m: Message): Promise<{ provider: string; id?: string }> {
  const p = provider();
  const r = await p.send(m);
  return { provider: p.name, id: r.id };
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Catalyst brand (matches the start/ app): navy #0B1B2E / #0F2E57, ink #2A2F36, mist #F5F7F9.
const NAVY = "#0B1B2E";
const BLUE = "#0F2E57";

export interface LayoutOpts {
  title: string;
  paragraphs: string[];
  cta?: { label: string; url: string };
  footer?: string;
  /** Simple key/value rows (internal emails). */
  rows?: [string, string][];
  /** Table for the digest. */
  table?: { head: string[]; body: string[][] };
  preheader?: string;
  audience?: "client" | "internal";
}

export function renderLayout(o: LayoutOpts) {
  const pre = o.preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(o.preheader)}</div>` : "";
  const ps = o.paragraphs.map((p) => `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#2A2F36;">${esc(p)}</p>`).join("");
  const rows = o.rows?.length
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 18px;border-collapse:collapse;">${o.rows
        .map(([k, v]) => `<tr><td style="padding:7px 10px 7px 0;font-size:14px;color:#6B7685;white-space:nowrap;vertical-align:top;border-bottom:1px solid #EEF1F4;">${esc(k)}</td><td style="padding:7px 0;font-size:14px;color:#0B1B2E;border-bottom:1px solid #EEF1F4;word-break:break-word;">${esc(v)}</td></tr>`)
        .join("")}</table>`
    : "";
  const table = o.table
    ? `<div style="overflow-x:auto;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 18px;border-collapse:collapse;font-size:13px;"><tr>${o.table.head
        .map((h) => `<th align="left" style="padding:8px 8px 8px 0;color:#6B7685;font-weight:700;border-bottom:2px solid #DDE3EA;">${esc(h)}</th>`)
        .join("")}</tr>${o.table.body
        .map((r) => `<tr>${r.map((c) => `<td style="padding:8px 8px 8px 0;color:#0B1B2E;border-bottom:1px solid #EEF1F4;vertical-align:top;">${esc(c)}</td>`).join("")}</tr>`)
        .join("")}</table></div>`
    : "";
  const btn = o.cta
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;"><tr><td style="background:${BLUE};border-radius:6px;"><a href="${esc(o.cta.url)}" style="display:inline-block;color:#ffffff;text-decoration:none;font-weight:700;font-size:16px;padding:14px 24px;">${esc(o.cta.label)}</a></td></tr></table>`
    : "";
  const foot = o.footer ? `<p style="margin:24px 0 0;font-size:13px;line-height:1.5;color:#6B7685;">${esc(o.footer)}</p>` : "";
  const tag = o.audience === "internal" ? `<span style="float:right;font-size:11px;letter-spacing:1px;color:#9FB3C8;text-transform:uppercase;">Internal</span>` : "";
  const html = `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head><body style="margin:0;background:#F5F7F9;font-family:Arial,Helvetica,sans-serif;">${pre}<div style="max-width:560px;margin:0 auto;padding:28px 16px;"><div style="background:${NAVY};border-radius:12px 12px 0 0;padding:18px 28px;">${tag}<span style="font-size:18px;font-weight:800;letter-spacing:3px;color:#ffffff;">CATALYST</span><span style="font-size:11px;letter-spacing:2px;color:#9FB3C8;margin-left:8px;text-transform:uppercase;">Digital Solutions</span></div><div style="background:#ffffff;border:1px solid #DDE3EA;border-top:0;border-radius:0 0 12px 12px;padding:28px;"><h1 style="margin:0 0 18px;font-size:22px;line-height:1.25;color:${NAVY};">${esc(o.title)}</h1>${ps}${rows}${table}${btn}${foot}</div><p style="margin:16px 0 0;text-align:center;font-size:12px;color:#9AA4B2;">Catalyst Digital Solutions</p></div></body></html>`;
  const text = [
    o.title,
    "",
    ...o.paragraphs,
    ...(o.rows?.length ? ["", ...o.rows.map(([k, v]) => `${k}: ${v}`)] : []),
    ...(o.table ? ["", o.table.head.join(" | "), ...o.table.body.map((r) => r.join(" | "))] : []),
    ...(o.cta ? ["", `${o.cta.label}: ${o.cta.url}`] : []),
    ...(o.footer ? ["", o.footer] : []),
  ].join("\n");
  return { html, text };
}

function layout(title: string, paragraphs: string[], cta?: { label: string; url: string }, footer?: string) {
  return renderLayout({ title, paragraphs, cta, footer, audience: "client", preheader: paragraphs[1] });
}

const fmtDate = (s?: string | null) =>
  s ? new Date(s).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/Los_Angeles", timeZoneName: "short" }) : "—";

export interface EmailExtra {
  url?: string;
  expires?: string;
  totals?: Record<string, number>;
  /** Percent of required questions done (0–100). */
  pct?: number;
  /** Required questions still unanswered. */
  remaining?: number;
  /** Days since the relevant reference time (stall / creation). */
  days?: number;
}

const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? "" : "s"}`;

export function buildEmail(kind: EmailKind, config: OnboardingConfig, instance: InstanceRow, extra: EmailExtra = {}) {
  const first = instance.contact_name?.split(" ")[0] || config.client.contactFirstName;
  const sn = config.client.shortName;
  const sig = `— ${config.support.name}, Catalyst Digital Solutions`;
  const casualSig = `— ${config.support.name}`;
  const linkFoot = `This private link is just for you${extra.expires ? ` and works until ${extra.expires}` : ""}. Please don’t forward it.`;
  const internalRows = (): [string, string][] => [
    ["Client", config.client.name],
    ["Contact", `${instance.contact_name || "—"} <${instance.contact_email}>`],
    ["Status", instance.status],
    ...(extra.pct !== undefined ? ([["Progress", `${extra.pct}% · ${plural(extra.remaining ?? 0, "question")} left`]] as [string, string][]) : []),
    ["Created", fmtDate(instance.created_at)],
    ["First opened", fmtDate(instance.opened_at)],
    ["Last saved", fmtDate(instance.last_saved_at)],
    ["Instance", instance.id],
  ];
  const internal = (subject: string, title: string, paragraphs: string[]) => ({
    subject: `[Onboarding] ${subject}`,
    ...renderLayout({ title, paragraphs, rows: internalRows(), audience: "internal", footer: `Export: npm run onboarding -- export --instance ${instance.id}` }),
  });
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
          linkFoot,
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
    case "client_nudge_unopened":
      return {
        subject: `Quick nudge on your ${sn} onboarding`,
        ...layout(
          `Your ${sn} onboarding is waiting for you`,
          [
            `Hi ${first},`,
            "Just making sure this didn’t get buried in your inbox.",
            `We already filled in most of what we know about ${config.client.name}, so a lot of it is just a quick “yep, that’s right.” Whenever you have a few minutes, it’s all there — and it saves as you go, so you don’t have to do it in one sitting.`,
            "If anything’s confusing, just reply to this email.",
            casualSig,
          ],
          extra.url ? { label: "Open your onboarding", url: extra.url } : undefined,
          linkFoot,
        ),
      };
    case "client_nudge_progress": {
      const n = extra.remaining ?? 0;
      return {
        subject: `You’re about ${plural(n, "question")} from done`,
        ...layout(
          `You’re about ${plural(n, "question")} from done`,
          [
            `Hi ${first},`,
            `Nice work so far — everything you’ve entered is saved. You’re about ${plural(n, "question")} from done — then we start your website.`,
            "Pick up right where you left off whenever it works for you. And if one of the questions is a head-scratcher, skip it or reply here and we’ll sort it out together.",
            casualSig,
          ],
          extra.url ? { label: "Pick up where you left off", url: extra.url } : undefined,
          linkFoot,
        ),
      };
    }
    case "client_last_mile": {
      const n = extra.remaining ?? 0;
      const what = n > 0 ? `just ${plural(n, "question")} and a quick review` : "a quick review and the submit button";
      return {
        subject: `Almost there — ${n > 0 ? plural(n, "question") + " left" : "just the final review"}`,
        ...layout(
          "You’re in the home stretch",
          [
            `Hi ${first},`,
            `You’re ${extra.pct ?? 90}% of the way through — all that’s left is ${what}.`,
            "Once you submit, we’ll take it from there and start on your website. We’ll only come back to you if something needs clarifying.",
            casualSig,
          ],
          extra.url ? { label: "Finish up", url: extra.url } : undefined,
          linkFoot,
        ),
      };
    }
    case "internal_submitted": {
      const t = extra.totals || {};
      return {
        subject: `[Onboarding] ${config.client.name} submitted`,
        ...renderLayout({
          title: `${config.client.name} submitted onboarding`,
          paragraphs: [`Submitted by ${instance.contact_email}.`],
          rows: [
            ["Confirmed", String(t.confirmed ?? 0)],
            ["Updated", String(t.updated ?? 0)],
            ["Still needed", String(t.needed ?? 0)],
            ["Files", String(t.files ?? 0)],
            ["Instance", instance.id],
          ],
          audience: "internal",
          footer: `Export: npm run onboarding -- export --instance ${instance.id}`,
        }),
      };
    }
    case "internal_link_request":
      return {
        subject: `[Onboarding] ${config.client.name} asked for a new link`,
        ...renderLayout({
          title: `${config.client.name} asked for a new onboarding link`,
          paragraphs: [
            `A new-link request matched ${instance.contact_email} (instance ${instance.id}).`,
            extra.url
              ? "A fresh link was emailed to the client."
              : `Client emails are switched off, so nothing was sent. Mint one with: npm run onboarding -- link --instance ${instance.id}`,
          ],
          audience: "internal",
        }),
      };
    case "internal_not_opened":
      return internal(`${config.client.name} hasn’t opened onboarding (${extra.days ?? 2}d)`, `${config.client.name} hasn’t opened their onboarding yet`, [
        `It’s been ${plural(extra.days ?? 2, "day")} since the instance was created and the link hasn’t been opened. Worth a personal text or call.`,
      ]);
    case "internal_stalled":
      return internal(`${config.client.name} stalled (${extra.days ?? 3}d since last activity)`, `${config.client.name}’s onboarding has stalled`, [
        instance.last_saved_at
          ? `No saves for ${plural(extra.days ?? 3, "day")}.`
          : `They opened it ${plural(extra.days ?? 3, "day")} ago but haven’t saved anything yet.`,
      ]);
    case "internal_halfway":
      return internal(`${config.client.name} is halfway (${extra.pct ?? 50}%)`, `${config.client.name} passed the halfway mark`, [
        `${extra.pct ?? 50}% of required questions are done; ${plural(extra.remaining ?? 0, "question")} to go.`,
      ]);
    case "internal_link_expiring":
      return internal(`${config.client.name}’s link expires ${extra.expires || "soon"}`, `${config.client.name}’s onboarding link expires soon`, [
        `Their newest access link expires ${extra.expires || "within a few days"} and they haven’t submitted. Mint a fresh one with: npm run onboarding -- link --instance ${instance.id}`,
      ]);
  }
}

export interface DigestRow {
  client: string;
  contact: string;
  status: string;
  pct: number | null;
  remaining: number | null;
  lastActivity: string | null;
  instanceId: string;
}

export function buildDigest(rows: DigestRow[], weekOf: string) {
  const active = rows.filter((r) => r.status === "ready" || r.status === "in_progress");
  return {
    subject: `[Onboarding] Weekly digest — ${weekOf}`,
    ...renderLayout({
      title: `Onboarding digest — week of ${weekOf}`,
      paragraphs: [`${plural(rows.length, "instance")} total · ${active.length} still in progress.`],
      table: {
        head: ["Client", "Status", "Progress", "Last activity"],
        body: rows.map((r) => [
          `${r.client} (${r.contact})`,
          r.status,
          r.pct === null ? "—" : `${r.pct}% · ${r.remaining} left`,
          r.lastActivity ? fmtDate(r.lastActivity) : "—",
        ]),
      },
      audience: "internal",
    }),
  };
}

export async function sendOnboardingEmail(
  backend: Backend,
  kind: EmailKind,
  config: OnboardingConfig,
  instance: InstanceRow,
  extra: Parameters<typeof buildEmail>[3] = {},
  opts: { force?: boolean } = {},
): Promise<{ delivered: boolean; provider: string; suppressed?: boolean; id?: string }> {
  const internal = kind.startsWith("internal_");
  const to = internal ? internalTo() : instance.contact_email;
  const msg = buildEmail(kind, config, instance, extra);
  let p = provider();
  let suppressed = false;
  if (!to) suppressed = true;
  else if (!internal && !opts.force && !(await clientEmailsAllowed(backend, config, instance).catch(() => false))) {
    suppressed = true;
    p = new LogProvider();
  }
  let delivered = false;
  let id: string | undefined;
  try {
    if (!suppressed || p.name === "log") id = (await p.send({ to: to || "(unset)", subject: msg.subject, html: msg.html, text: msg.text, replyTo: config.support.email })).id;
    delivered = !suppressed && p.name !== "log";
  } catch (err) {
    console.error(`[onboarding/email] ${kind} failed:`, err instanceof Error ? err.message : err);
  }
  await backend.store
    .addEvent({ instance_id: instance.id, type: `email.${kind}`, section_id: null, meta: { provider: p.name, delivered, suppressed, ...(id ? { id } : {}) } })
    .catch(() => undefined);
  return { delivered, provider: p.name, suppressed, id };
}
