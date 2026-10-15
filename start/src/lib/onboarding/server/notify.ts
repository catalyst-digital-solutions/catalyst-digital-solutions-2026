import "server-only";
import { getOnboardingConfig } from "@/config/onboarding";
import type { OnboardingConfig } from "@/config/onboarding/types";
import { DEFAULT_NOTIFY_POLICY, type NotifyPolicy } from "@/config/onboarding/notifications";
import { mintAccessLink } from "./auth";
import type { Backend } from "./backend";
import { buildDigest, internalTo, sendOnboardingEmail, sendRaw, type DigestRow, type EmailKind } from "./email";
import { policyFor } from "./notify-settings";
import { loadAnswers, totals } from "./service";
import type { InstanceRow } from "./store/types";

/**
 * Hourly onboarding notifier (Vercel cron → /api/cron/onboarding-notify).
 *
 * Idempotency log: onboarding_events rows of type "notify.sent" with the
 * dedupe key in section_id (one row per key per instance), and "notify.digest"
 * (instance_id null) for the weekly digest. A notification whose key is
 * already logged never fires again.
 *
 * Guardrails for client emails: policy.clientEmails must be on (default off),
 * never after submit, at most one per clientMinGapDays, and only inside the
 * client's local quiet-hours window.
 */

const DAY = 86400_000;
const HOUR = 3600_000;
const CLIENT_KINDS = new Set(["ready", "submitted", "complete", "client_nudge_unopened", "client_nudge_progress", "client_last_mile"]);

export interface NotifyAction {
  instanceId: string | null;
  client: string;
  kind: EmailKind | "internal_digest";
  key: string;
  audience: "internal" | "client";
  status: "sent" | "dry_run" | "failed" | "deferred";
  reason?: string;
  id?: string;
}

function localParts(d: Date, tz: string) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", hourCycle: "h23", weekday: "short", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value || "";
  const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { hour: Number(get("hour")) % 24, weekday: wd, date: `${get("year")}-${get("month")}-${get("day")}` };
}

export function progressOf(config: OnboardingConfig, answers: Parameters<typeof totals>[1], visited: Record<string, boolean>) {
  const t = totals(config, answers, visited);
  const done = t.confirmed + t.updated;
  const req = done + t.needed;
  return { pct: req ? Math.floor((done / req) * 100) : 0, remaining: t.needed, totals: t };
}

async function clientLastSentAt(backend: Backend, instanceId: string): Promise<number> {
  const events = await backend.store.listEvents(instanceId);
  let last = 0;
  for (const e of events) {
    const isNudge = e.type === "notify.sent" && e.meta?.audience === "client";
    const isTransactional = e.type.startsWith("email.") && CLIENT_KINDS.has(e.type.slice(6)) && e.meta?.delivered === true;
    if ((isNudge || isTransactional) && e.created_at) last = Math.max(last, new Date(e.created_at).getTime());
  }
  return last;
}

interface Candidate {
  kind: EmailKind;
  key: string;
  audience: "internal" | "client";
  extra: Parameters<typeof sendOnboardingEmail>[4];
}

/** Latest sign of life: last save, first open, or last use of any access link. */
function activityRef(inst: InstanceRow, lastLinkUse: string | null): string | null {
  const c = [inst.last_saved_at, inst.opened_at, lastLinkUse].filter(Boolean) as string[];
  return c.length ? c.reduce((a, b) => (new Date(b).getTime() > new Date(a).getTime() ? b : a)) : null;
}

function internalCandidates(p: NotifyPolicy, inst: InstanceRow, prog: { pct: number; remaining: number }, newestExpiry: { id: string; at: number } | null, now: number, ref: string | null): Candidate[] {
  const r = p.internalRules;
  const out: Candidate[] = [];
  const created = new Date(inst.created_at).getTime();
  if (!inst.opened_at && now - created >= r.notOpenedHours * HOUR)
    out.push({ kind: "internal_not_opened", key: "int.not_opened", audience: "internal", extra: { days: Math.floor((now - created) / DAY) } });
  if (inst.opened_at && ref && now - new Date(ref).getTime() >= r.stalledDays * DAY)
    out.push({ kind: "internal_stalled", key: `int.stalled:${ref}`, audience: "internal", extra: { days: Math.floor((now - new Date(ref).getTime()) / DAY), ...prog } });
  if (inst.last_saved_at && prog.pct >= r.halfwayPct) out.push({ kind: "internal_halfway", key: "int.halfway", audience: "internal", extra: prog });
  if (newestExpiry && newestExpiry.at - now <= r.linkExpiringDays * DAY)
    out.push({
      kind: "internal_link_expiring",
      key: `int.link_expiring:${newestExpiry.id}`,
      audience: "internal",
      extra: { expires: new Date(newestExpiry.at).toLocaleDateString("en-US", { month: "long", day: "numeric", timeZone: "America/Los_Angeles" }) },
    });
  return out;
}

function clientCandidate(p: NotifyPolicy, inst: InstanceRow, prog: { pct: number; remaining: number }, now: number, ref: string | null): Candidate | null {
  const r = p.clientRules;
  const saved = inst.last_saved_at ? new Date(inst.last_saved_at).getTime() : null;
  if (saved && prog.pct >= r.lastMilePct && now - saved >= r.lastMileDays * DAY)
    return { kind: "client_last_mile", key: "cli.last_mile", audience: "client", extra: prog };
  if (inst.opened_at && ref && prog.remaining > 0 && now - new Date(ref).getTime() >= r.stalledDays * DAY)
    return { kind: "client_nudge_progress", key: `cli.stalled:${ref}`, audience: "client", extra: prog };
  if (!inst.opened_at && now - new Date(inst.created_at).getTime() >= r.notOpenedDays * DAY)
    return { kind: "client_nudge_unopened", key: "cli.not_opened", audience: "client", extra: {} };
  return null;
}

export async function runNotifications(backend: Backend, opts: { dryRun?: boolean; now?: Date } = {}): Promise<NotifyAction[]> {
  const nowD = opts.now || new Date();
  const now = nowD.getTime();
  const actions: NotifyAction[] = [];
  const digestRows: DigestRow[] = [];
  const instances = await backend.store.listInstances();

  for (const inst of instances) {
    const config = getOnboardingConfig(inst.client_slug);
    if (!config || inst.status === "archived") continue;
    const answers = await loadAnswers(backend, inst, config);
    const prog = progressOf(config, answers, inst.visited || {});
    digestRows.push({
      client: config.client.name,
      contact: inst.contact_name || inst.contact_email,
      status: inst.status,
      pct: prog.pct,
      remaining: prog.remaining,
      lastActivity: inst.last_saved_at || inst.opened_at,
      instanceId: inst.id,
    });
    if (inst.status === "submitted" || inst.status === "complete") continue; // nothing after submit

    const policy = await policyFor(backend, config, inst);
    const allTokens = await backend.store.listTokens(inst.id);
    const lastUse = allTokens.map((t) => t.last_used_at).filter(Boolean).sort().pop() || null;
    const ref = activityRef(inst, lastUse);
    const tokens = allTokens.filter((t) => !t.revoked_at && new Date(t.expires_at).getTime() > now);
    const newest = tokens.reduce<{ id: string; at: number } | null>((m, t) => {
      const at = new Date(t.expires_at).getTime();
      return !m || at > m.at ? { id: t.id, at } : m;
    }, null);

    const cands: Candidate[] = policy.internal && internalTo() ? internalCandidates(policy, inst, prog, newest, now, ref) : [];
    if (policy.clientEmails) {
      const c = clientCandidate(policy, inst, prog, now, ref);
      if (c) cands.push(c);
    }

    for (const c of cands) {
      if (await backend.store.hasEvent(inst.id, "notify.sent", c.key)) continue;
      const base = { instanceId: inst.id, client: config.client.name, kind: c.kind, key: c.key, audience: c.audience };
      if (c.audience === "client") {
        const lp = localParts(nowD, policy.timezone);
        if (lp.hour < policy.quietHours.start || lp.hour >= policy.quietHours.end) {
          actions.push({ ...base, status: "deferred", reason: `quiet hours (${lp.hour}:00 ${policy.timezone})` });
          continue;
        }
        const last = await clientLastSentAt(backend, inst.id);
        if (last && now - last < policy.clientMinGapDays * DAY) {
          actions.push({ ...base, status: "deferred", reason: "client email sent within gap window" });
          continue;
        }
      }
      if (opts.dryRun) {
        actions.push({ ...base, status: "dry_run" });
        continue;
      }
      const extra = { ...c.extra };
      if (c.audience === "client") {
        const link = await mintAccessLink(backend, inst);
        extra.url = link.url;
        extra.expires = new Date(link.token.expires_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: policy.timezone });
        await backend.store.addEvent({ instance_id: inst.id, type: "access.link_created", section_id: null, meta: { by: "notify", kind: c.kind, expires_at: link.token.expires_at } });
      }
      const r = await sendOnboardingEmail(backend, c.kind, config, inst, extra);
      const ok = r.delivered || (r.provider === "log" && !r.suppressed);
      if (ok) await backend.store.addEvent({ instance_id: inst.id, type: "notify.sent", section_id: c.key, meta: { kind: c.kind, audience: c.audience, provider: r.provider, id: r.id || null } });
      actions.push({ ...base, status: ok ? "sent" : "failed", id: r.id, reason: ok ? undefined : r.suppressed ? "suppressed" : "send failed" });
      if (c.audience === "client") break;
    }
  }

  // Weekly digest (America/Los_Angeles).
  const digest = DEFAULT_DIGEST();
  const lp = localParts(nowD, "America/Los_Angeles");
  if (digest && internalTo() && lp.weekday === digest.weekday && lp.hour >= digest.hour) {
    const since = new Date(now - 6 * DAY).toISOString();
    const already = await backend.store.countEvents({ type: "notify.digest", since });
    if (!already) {
      const key = `digest:${lp.date}`;
      if (opts.dryRun) actions.push({ instanceId: null, client: "all", kind: "internal_digest", key, audience: "internal", status: "dry_run" });
      else {
        const msg = buildDigest(digestRows, lp.date);
        try {
          const r = await sendRaw({ to: internalTo(), ...msg });
          await backend.store.addEvent({ instance_id: null, type: "notify.digest", section_id: key, meta: { provider: r.provider, id: r.id || null, count: digestRows.length } });
          actions.push({ instanceId: null, client: "all", kind: "internal_digest", key, audience: "internal", status: "sent", id: r.id });
        } catch (err) {
          actions.push({ instanceId: null, client: "all", kind: "internal_digest", key, audience: "internal", status: "failed", reason: err instanceof Error ? err.message : "error" });
        }
      }
    }
  }
  return actions;
}


const DEFAULT_DIGEST = () => DEFAULT_NOTIFY_POLICY.internalRules.digest;
