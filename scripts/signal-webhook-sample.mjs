/**
 * Sign a sample Catalyst Signal form payload.
 *
 * Prints the body and the HMAC headers. Does not print the secret.
 * Does not POST unless you pass --send, and then only when
 * SIGNAL_WEBHOOK_URL and SIGNAL_WEBHOOK_SECRET are both set.
 *
 *   node scripts/signal-webhook-sample.mjs
 *   node scripts/signal-webhook-sample.mjs --send
 */

import { buildSignalPayload, signSignalBody } from "../src/lib/signal-webhook.ts";

const payload = buildSignalPayload(
  {
    name: "Sample Lead",
    email: "sample.lead@example.com",
    phone: "(661) 555-0100",
    company: "Example Mechanical",
    service: "Website + Local SEO",
    message: "This is a signed sample from scripts/signal-webhook-sample.mjs.",
    formName: "Contact — Let's talk about your pipeline",
    page: "/contact",
  },
  new Date(),
  `sample-${Date.now()}`,
);

const rawBody = JSON.stringify(payload);
const secret = process.env.SIGNAL_WEBHOOK_SECRET?.trim() || "";
const signingSecret = secret || "sample-secret-not-for-production";
const timestamp = String(Math.floor(Date.now() / 1000));
const signature = signSignalBody(signingSecret, timestamp, rawBody);
const url = process.env.SIGNAL_WEBHOOK_URL?.trim() || "https://signal.catalyst-digital.solutions/api/hooks/form";

function shellSingle(value) {
  return `'${value.replaceAll("'", `'\\''`)}'`;
}

console.log(secret ? "Signed with SIGNAL_WEBHOOK_SECRET (not printed)." : "Signed with a local sample secret. This signature will not be accepted by Signal.");
console.log("");
console.log(`curl -sS -X POST ${url} \\`);
console.log(`  -H 'Content-Type: application/json' \\`);
console.log(`  -H 'X-Catalyst-Timestamp: ${timestamp}' \\`);
console.log(`  -H 'X-Catalyst-Signature: ${signature}' \\`);
console.log(`  --data ${shellSingle(rawBody)}`);

if (!process.argv.includes("--send")) {
  process.exit(0);
}

const sendUrl = process.env.SIGNAL_WEBHOOK_URL?.trim() || "";
let sendHttps = false;
try {
  sendHttps = new URL(sendUrl).protocol === "https:";
} catch {
  sendHttps = false;
}
if (!secret || !sendHttps) {
  console.error("\nRefusing to send. Set SIGNAL_WEBHOOK_SECRET and an https SIGNAL_WEBHOOK_URL.");
  process.exit(1);
}

const response = await fetch(sendUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Catalyst-Timestamp": timestamp,
    "X-Catalyst-Signature": signature,
  },
  body: rawBody,
  signal: AbortSignal.timeout(4_000),
});
const text = await response.text();
console.log(`\nHTTP ${response.status}`);
console.log(text);
if (!response.ok) process.exit(1);
