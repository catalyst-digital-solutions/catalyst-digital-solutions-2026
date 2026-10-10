/**
 * Catalyst onboarding admin CLI (server-side only; uses the same data layer as the app).
 *
 *   npm run onboarding -- list [--client atara]
 *   npm run onboarding -- create --client atara --email brittany@… --name "Brittany Lopez"
 *   npm run onboarding -- link --instance <id> [--days 30] [--send]
 *   npm run onboarding -- export --instance <id> [--out file.json] [--url-seconds 3600]
 *   npm run onboarding -- complete --instance <id> [--send]
 *   npm run onboarding -- revoke --instance <id>
 *
 * Env: loads .env.local / .env if present. Uses Supabase when SUPABASE_URL +
 * SUPABASE_SERVICE_ROLE_KEY are set, otherwise the local dev store.
 * Emails to the client are only sent with an explicit --send.
 */
import fs from "node:fs";
import path from "node:path";

for (const f of [".env.local", ".env"]) {
  const p = path.join(process.cwd(), f);
  if (fs.existsSync(p)) process.loadEnvFile(p);
}

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const args: Record<string, string | true> = {};
  for (let i = 0; i < rest.length; i++) {
    const k = rest[i];
    if (!k.startsWith("--")) continue;
    const v = rest[i + 1];
    if (v && !v.startsWith("--")) {
      args[k.slice(2)] = v;
      i++;
    } else args[k.slice(2)] = true;
  }
  const str = (k: string) => (typeof args[k] === "string" ? (args[k] as string) : undefined);

  const { getOnboardingConfig } = await import("../src/config/onboarding");
  const { getBackend } = await import("../src/lib/onboarding/server/backend");
  const { mintAccessLink } = await import("../src/lib/onboarding/server/auth");
  const { sendOnboardingEmail } = await import("../src/lib/onboarding/server/email");
  const { exportInstance, markComplete } = await import("../src/lib/onboarding/server/service");

  const backend = getBackend();
  if (!backend) throw new Error("No backend configured (set SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY).");
  console.error(`[onboarding] store: ${backend.store.kind}`);

  const needInstance = async () => {
    const id = str("instance");
    if (!id) throw new Error("--instance <id> is required");
    const inst = await backend.store.getInstance(id);
    if (!inst) throw new Error("instance not found");
    const config = getOnboardingConfig(inst.client_slug);
    if (!config) throw new Error("no config for " + inst.client_slug);
    return { inst, config };
  };

  switch (cmd) {
    case "list": {
      const rows = await backend.store.listInstances(str("client"));
      console.table(rows.map((r) => ({ id: r.id, client: r.client_slug, email: r.contact_email, status: r.status, view: r.current_view, step: r.current_step, saved: r.last_saved_at, submitted: r.submitted_at })));
      break;
    }
    case "create": {
      const slug = str("client") || "atara";
      const config = getOnboardingConfig(slug);
      if (!config) throw new Error("unknown client " + slug);
      const email = str("email");
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("--email is required");
      const inst = await backend.store.createInstance({
        client_slug: slug,
        config_version: config.version,
        client_name: config.client.name,
        contact_name: str("name") || null,
        contact_email: email,
      });
      await backend.store.addEvent({ instance_id: inst.id, type: "onboarding.created", section_id: null, meta: { by: "cli" } });
      console.log(JSON.stringify({ id: inst.id, client: slug, email }, null, 2));
      break;
    }
    case "link": {
      const { inst, config } = await needInstance();
      const days = str("days") ? Number(str("days")) : undefined;
      const { url, token } = await mintAccessLink(backend, inst, { days });
      await backend.store.addEvent({ instance_id: inst.id, type: "access.link_created", section_id: null, meta: { by: "cli", expires_at: token.expires_at } });
      console.log(url);
      console.error(`expires ${token.expires_at}`);
      if (args.send === true) {
        const expires = new Date(token.expires_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "America/Los_Angeles" });
        const r = await sendOnboardingEmail(backend, "ready", config, inst, { url, expires }, { force: true });
        console.error("ready email:", JSON.stringify(r));
      }
      break;
    }
    case "export": {
      const { inst, config } = await needInstance();
      const data = await exportInstance(backend, config, inst, { signedUrlSeconds: Number(str("url-seconds") || 3600) });
      const out = JSON.stringify(data, null, 2);
      if (str("out")) {
        fs.writeFileSync(str("out")!, out, { mode: 0o600 });
        console.error("wrote " + str("out"));
      } else console.log(out);
      break;
    }
    case "complete": {
      const { inst, config } = await needInstance();
      const r = await markComplete(backend, config, inst, { sendEmail: args.send === true });
      console.log(JSON.stringify({ id: r.instance.id, status: r.instance.status, email: r.email }, null, 2));
      break;
    }
    case "revoke": {
      const { inst } = await needInstance();
      await backend.store.revokeTokens(inst.id);
      await backend.store.addEvent({ instance_id: inst.id, type: "access.revoked", section_id: null, meta: { by: "cli" } });
      console.log("revoked all links for " + inst.id);
      break;
    }
    default:
      console.log("usage: npm run onboarding -- list|create|link|export|complete|revoke [--instance id] …");
      process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error("error:", e instanceof Error ? e.message : e);
  process.exit(1);
});
