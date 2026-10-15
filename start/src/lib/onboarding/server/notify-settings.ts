import "server-only";
import type { OnboardingConfig } from "@/config/onboarding/types";
import { mergePolicy, type NotifyPolicy, type NotifyPolicyOverride } from "@/config/onboarding/notifications";
import type { Backend } from "./backend";
import type { InstanceRow } from "./store/types";

/**
 * Per-instance notification overrides live in onboarding_events as
 * type "notify.settings" (latest row wins), so no schema change is needed.
 */
export type InstanceNotifyOverride = Pick<NotifyPolicyOverride, "clientEmails" | "internal" | "timezone">;

export async function instanceOverride(backend: Backend, instanceId: string): Promise<InstanceNotifyOverride> {
  const events = await backend.store.listEvents(instanceId);
  const out: InstanceNotifyOverride = {};
  for (const e of events) {
    if (e.type !== "notify.settings") continue;
    const m = e.meta || {};
    if (typeof m.clientEmails === "boolean") out.clientEmails = m.clientEmails;
    if (typeof m.internal === "boolean") out.internal = m.internal;
    if (typeof m.timezone === "string") out.timezone = m.timezone;
  }
  return out;
}

export async function policyFor(backend: Backend, config: OnboardingConfig, instance: InstanceRow): Promise<NotifyPolicy> {
  return mergePolicy(config.notifications, await instanceOverride(backend, instance.id));
}

/** Global legacy switch (ONBOARDING_CLIENT_EMAILS=on) OR the instance/client policy. */
export async function clientEmailsAllowed(backend: Backend, config: OnboardingConfig, instance: InstanceRow): Promise<boolean> {
  if ((process.env.ONBOARDING_CLIENT_EMAILS || "").toLowerCase() === "on") return true;
  return (await policyFor(backend, config, instance)).clientEmails === true;
}

export async function setInstanceOverride(backend: Backend, instanceId: string, patch: InstanceNotifyOverride, by = "cli") {
  await backend.store.addEvent({ instance_id: instanceId, type: "notify.settings", section_id: null, meta: { ...patch, by } });
}
