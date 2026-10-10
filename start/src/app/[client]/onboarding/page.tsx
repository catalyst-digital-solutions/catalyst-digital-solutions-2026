import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOnboardingConfig, toPublicConfig } from "@/config/onboarding";
import { AccessGate, Unavailable, type GateReason } from "@/components/onboarding/AccessGate";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { previewState } from "@/lib/onboarding/demo";
import { readSession } from "@/lib/onboarding/server/auth";
import { getBackend } from "@/lib/onboarding/server/backend";
import { isProductionDeploy } from "@/lib/onboarding/server/env";
import { loadClientState } from "@/lib/onboarding/server/service";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ client: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { client } = await params;
  const config = getOnboardingConfig(client);
  if (!config) return {};
  return { title: config.brand.pageTitle };
}

const one = (v: string | string[] | undefined) => (typeof v === "string" ? v : undefined);

export default async function OnboardingPage({ params, searchParams }: Props) {
  const { client } = await params;
  const sp = await searchParams;
  const config = getOnboardingConfig(client);
  if (!config) notFound();
  const pub = toPublicConfig(config);
  const backend = getBackend();
  const session = backend ? await readSession(backend, client) : null;

  // Design preview (?view=intro|section|review|submitted&step=N&demo=1):
  // read-only, never writes. Off on production unless the visitor already
  // holds a valid session.
  const view = one(sp.view);
  if (view && (!isProductionDeploy() || session?.ok)) {
    const initial = previewState(pub, view, Number(one(sp.step) || 1), one(sp.demo) === "1");
    return <OnboardingShell key={`${view}-${sp.step}-${sp.demo}`} slug={client} config={pub} initial={initial} preview />;
  }

  if (!backend || !session) return <Unavailable config={pub} />;

  if (!session.ok) {
    const flag = one(sp.access);
    const reason: GateReason =
      flag === "expired" || flag === "revoked" || session.reason === "expired" ? "expired" : flag === "invalid" || session.reason === "invalid" ? "invalid" : "none";
    return <AccessGate slug={client} config={pub} reason={reason} />;
  }

  const initial = await loadClientState(backend, session.session.instance, config);
  return <OnboardingShell slug={client} config={pub} initial={initial} preview={false} />;
}
