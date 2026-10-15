/**
 * Shared onboarding notification policy — applies to every client.
 * A client config may override any of it via `notifications`, and each
 * instance can override `clientEmails`, `timezone` and `internal` at runtime
 * (CLI: npm run onboarding -- notify --instance <id> …).
 *
 * Client emails are OFF by default everywhere.
 */
export interface NotifyPolicy {
  /** Client-facing emails (nudges + transactional). Default false. */
  clientEmails: boolean;
  /** Internal alerts to ONBOARDING_NOTIFY_EMAIL. Default true. */
  internal: boolean;
  /** Client local time zone, used for quiet hours. */
  timezone: string;
  /** Client emails only go out between these local hours [start, end). */
  quietHours: { start: number; end: number };
  /** At most one client email per this many days; none after submit. */
  clientMinGapDays: number;
  internalRules: {
    notOpenedHours: number;
    stalledDays: number;
    halfwayPct: number;
    linkExpiringDays: number;
    /** Weekly digest: day (0=Sun … 1=Mon) and local hour, in America/Los_Angeles. */
    digest: { weekday: number; hour: number } | false;
  };
  clientRules: {
    notOpenedDays: number;
    stalledDays: number;
    lastMilePct: number;
    lastMileDays: number;
  };
}

export const DEFAULT_NOTIFY_POLICY: NotifyPolicy = {
  clientEmails: false,
  internal: true,
  timezone: "America/Los_Angeles",
  quietHours: { start: 8, end: 19 },
  clientMinGapDays: 3,
  internalRules: { notOpenedHours: 48, stalledDays: 3, halfwayPct: 50, linkExpiringDays: 5, digest: { weekday: 1, hour: 8 } },
  clientRules: { notOpenedDays: 3, stalledDays: 4, lastMilePct: 90, lastMileDays: 2 },
};

export type NotifyPolicyOverride = Partial<Omit<NotifyPolicy, "internalRules" | "clientRules">> & {
  internalRules?: Partial<NotifyPolicy["internalRules"]>;
  clientRules?: Partial<NotifyPolicy["clientRules"]>;
};

export function mergePolicy(...layers: (NotifyPolicyOverride | undefined | null)[]): NotifyPolicy {
  let p: NotifyPolicy = { ...DEFAULT_NOTIFY_POLICY, internalRules: { ...DEFAULT_NOTIFY_POLICY.internalRules }, clientRules: { ...DEFAULT_NOTIFY_POLICY.clientRules } };
  for (const l of layers) {
    if (!l) continue;
    const { internalRules, clientRules, ...rest } = l;
    p = { ...p, ...Object.fromEntries(Object.entries(rest).filter(([, v]) => v !== undefined)), internalRules: { ...p.internalRules, ...internalRules }, clientRules: { ...p.clientRules, ...clientRules } } as NotifyPolicy;
  }
  return p;
}
