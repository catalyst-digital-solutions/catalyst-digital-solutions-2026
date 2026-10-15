/**
 * Sends a "[Preview]" copy of EVERY onboarding email type to one address,
 * using a fake client + fake instance. Never reads or writes the database.
 *
 *   npm run onboarding:preview -- --to mario@catalyst-digital.solutions [--dry]
 *
 * Needs RESEND_API_KEY + ONBOARDING_FROM_EMAIL (else log-only). --dry writes
 * HTML files to .data/email-previews/ instead of sending.
 */
import fs from "node:fs";
import path from "node:path";

for (const f of [".env.local", ".env"]) {
  const p = path.join(process.cwd(), f);
  if (fs.existsSync(p)) process.loadEnvFile(p);
}

async function main() {
  const argv = process.argv.slice(2);
  const to = argv[argv.indexOf("--to") + 1];
  const dry = argv.includes("--dry");
  if (!dry && (!to || !argv.includes("--to"))) throw new Error("--to <email> is required");

  const { ataraOnboarding } = await import("../src/config/onboarding/atara");
  const { buildEmail, buildDigest, sendRaw } = await import("../src/lib/onboarding/server/email");
  type Kind = Parameters<typeof buildEmail>[0];

  const config = {
    ...ataraOnboarding,
    slug: "sunrise-plumbing",
    client: { shortName: "Sunrise", name: "Sunrise Plumbing Co.", legalName: "Sunrise Plumbing Co., LLC", contactFirstName: "Dana", possessive: "Sunrise’s" },
  };
  const day = 86400_000;
  const now = Date.now();
  const inst: import("../src/lib/onboarding/server/store/types").InstanceRow = {
    id: "00000000-preview-0000-0000-000000000000",
    client_slug: "sunrise-plumbing",
    config_version: config.version,
    client_name: config.client.name,
    contact_name: "Dana Reyes",
    contact_email: "dana@sunriseplumbing.example",
    status: "in_progress",
    current_view: "wizard",
    current_step: 4,
    visited: {},
    opened_at: new Date(now - 6 * day).toISOString(),
    started_at: new Date(now - 6 * day).toISOString(),
    last_saved_at: new Date(now - 4 * day).toISOString(),
    submitted_at: null,
    completed_at: null,
    submission: null,
    created_at: new Date(now - 8 * day).toISOString(),
    updated_at: new Date(now - 4 * day).toISOString(),
  };
  const url = "https://start.catalyst-digital-solutions.com/preview/onboarding/access?t=PREVIEW-LINK-NOT-REAL";
  const expires = new Date(now + 30 * day).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const list: [Kind, Parameters<typeof buildEmail>[3], Partial<import("../src/lib/onboarding/server/store/types").InstanceRow>?][] = [
    ["internal_not_opened", { days: 2 }, { opened_at: null, started_at: null, last_saved_at: null, status: "in_progress" }],
    ["internal_stalled", { days: 3, pct: 38, remaining: 21 }],
    ["internal_halfway", { pct: 52, remaining: 16 }],
    ["internal_link_expiring", { expires: new Date(now + 5 * day).toLocaleDateString("en-US", { month: "long", day: "numeric" }) }],
    ["internal_link_request", {}],
    ["internal_submitted", { totals: { confirmed: 31, updated: 6, needed: 2, files: 4 } }],
    ["ready", { url, expires }],
    ["client_nudge_unopened", { url, expires }, { opened_at: null, last_saved_at: null }],
    ["client_nudge_progress", { url, expires, pct: 61, remaining: 12 }],
    ["client_last_mile", { url, expires, pct: 93, remaining: 3 }],
    ["submitted", {}],
    ["complete", {}],
  ];
  const outDir = path.join(process.cwd(), ".data", "email-previews");
  if (dry) fs.mkdirSync(outDir, { recursive: true });

  const results: { kind: string; subject: string; id?: string }[] = [];
  const send = async (kind: string, m: { subject: string; html: string; text: string }) => {
    const subject = `[Preview] ${m.subject}`;
    if (dry) {
      fs.writeFileSync(path.join(outDir, `${kind}.html`), m.html);
      results.push({ kind, subject });
      return;
    }
    const r = await sendRaw({ to, subject, html: m.html, text: m.text, replyTo: config.support.email });
    results.push({ kind, subject, id: r.id });
    await new Promise((res) => setTimeout(res, 600)); // stay under Resend's rate limit
  };

  for (const [kind, extra, patch] of list) await send(kind, buildEmail(kind, config, { ...inst, ...(patch || {}) }, extra));
  await send(
    "internal_digest",
    buildDigest(
      [
        { client: "Sunrise Plumbing Co.", contact: "Dana Reyes", status: "in_progress", pct: 61, remaining: 12, lastActivity: inst.last_saved_at, instanceId: inst.id },
        { client: "Harbor Dental", contact: "Dr. Kim", status: "ready", pct: 0, remaining: 40, lastActivity: null, instanceId: "preview-2" },
        { client: "Oakline Roofing", contact: "Sam Ortiz", status: "submitted", pct: 100, remaining: 0, lastActivity: new Date(now - day).toISOString(), instanceId: "preview-3" },
      ],
      new Date().toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" }),
    ),
  );
  console.log(JSON.stringify(results, null, 2));
}

main().catch((e) => {
  console.error("error:", e instanceof Error ? e.message : e);
  process.exit(1);
});
