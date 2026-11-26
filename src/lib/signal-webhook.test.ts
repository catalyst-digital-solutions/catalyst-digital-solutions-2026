import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { describe, test } from "node:test";
import { buildSignalPayload, notifySignal, signSignalBody } from "./signal-webhook.ts";

test("signs unix-seconds.raw-body as hex HMAC-SHA256", () => {
  const secret = "test-secret";
  const timestamp = "1700000000";
  const raw = '{"name":"Ada"}';
  const expected = createHmac("sha256", secret).update(`${timestamp}.${raw}`).digest("hex");
  assert.equal(signSignalBody(secret, timestamp, raw), expected);
  assert.match(expected, /^[0-9a-f]{64}$/);
});

test("payload carries contact fields, interest, and the form name", () => {
  const payload = buildSignalPayload(
    {
      name: "Jessica Ramirez",
      email: "jessica@ramirezpropertygroup.com",
      phone: "(661) 555-0148",
      company: "Ramirez Property Group",
      service: "HVAC",
      message: "We need a new site.",
      formName: "Contact — Let's talk about your pipeline",
      page: "/contact",
    },
    new Date("2026-11-24T12:00:00.000Z"),
    "form-1001",
  );

  assert.equal(payload.eventId, "form-1001");
  assert.equal(payload.sourceId, "website-form");
  assert.equal(payload.timestamp, "2026-11-24T12:00:00.000Z");
  assert.equal(payload.name, "Jessica Ramirez");
  assert.equal(payload.email, "jessica@ramirezpropertygroup.com");
  assert.equal(payload.phone, "(661) 555-0148");
  assert.equal(payload.company, "Ramirez Property Group");
  assert.equal(payload.service, "HVAC");
  assert.match(payload.message ?? "", /We need a new site\./);
  assert.match(payload.message ?? "", /Form: Contact — Let's talk about your pipeline · \/contact/);
});

test("drops an email that Signal would reject", () => {
  const payload = buildSignalPayload(
    { name: "Ada", email: "not-an-email", formName: "Contact" },
    new Date("2026-11-24T12:00:00.000Z"),
    "form-1002",
  );
  assert.equal(payload.email, undefined);
  assert.equal(payload.name, "Ada");
  assert.equal(payload.service, "Contact");
});

describe("notifySignal", { concurrency: false }, () => {
test("skips the webhook when either env var is unset", async () => {
  const prevUrl = process.env.SIGNAL_WEBHOOK_URL;
  const prevSecret = process.env.SIGNAL_WEBHOOK_SECRET;
  delete process.env.SIGNAL_WEBHOOK_URL;
  process.env.SIGNAL_WEBHOOK_SECRET = "secret";
  let called = false;
  const original = globalThis.fetch;
  globalThis.fetch = (async () => {
    called = true;
    return new Response(null, { status: 201 });
  }) as typeof fetch;
  try {
    await notifySignal({ name: "Ada", email: "ada@example.com" });
    assert.equal(called, false);
  } finally {
    globalThis.fetch = original;
    restoreEnv("SIGNAL_WEBHOOK_URL", prevUrl);
    restoreEnv("SIGNAL_WEBHOOK_SECRET", prevSecret);
  }
});

test("posts the signed body and still resolves when Signal errors", async () => {
  const prevUrl = process.env.SIGNAL_WEBHOOK_URL;
  const prevSecret = process.env.SIGNAL_WEBHOOK_SECRET;
  process.env.SIGNAL_WEBHOOK_URL = "https://signal.example/api/hooks/form";
  process.env.SIGNAL_WEBHOOK_SECRET = "secret";
  const original = globalThis.fetch;
  let seenSignature = "";
  let seenTimestamp = "";
  let seenBody = "";
  globalThis.fetch = (async (_url, init) => {
    const headers = new Headers(init?.headers);
    seenTimestamp = headers.get("X-Catalyst-Timestamp") ?? "";
    seenSignature = headers.get("X-Catalyst-Signature") ?? "";
    seenBody = String(init?.body ?? "");
    return new Response("nope", { status: 503 });
  }) as typeof fetch;
  try {
    await notifySignal({
      name: "Ada",
      email: "ada@example.com",
      message: "Hello",
      formName: "Contact",
      page: "/contact",
    });
    const expected = createHmac("sha256", "secret").update(`${seenTimestamp}.${seenBody}`).digest("hex");
    assert.equal(seenSignature, expected);
    assert.match(seenTimestamp, /^\d+$/);
    const parsed = JSON.parse(seenBody) as { sourceId?: string; email?: string };
    assert.equal(parsed.sourceId, "website-form");
    assert.equal(parsed.email, "ada@example.com");
  } finally {
    globalThis.fetch = original;
    restoreEnv("SIGNAL_WEBHOOK_URL", prevUrl);
    restoreEnv("SIGNAL_WEBHOOK_SECRET", prevSecret);
  }
});

test("resolves when the webhook times out", async () => {
  const prevUrl = process.env.SIGNAL_WEBHOOK_URL;
  const prevSecret = process.env.SIGNAL_WEBHOOK_SECRET;
  process.env.SIGNAL_WEBHOOK_URL = "https://signal.example/api/hooks/form";
  process.env.SIGNAL_WEBHOOK_SECRET = "secret";
  const original = globalThis.fetch;
  globalThis.fetch = (async () => {
    throw new DOMException("The operation was aborted due to timeout", "TimeoutError");
  }) as typeof fetch;
  try {
    await notifySignal({ name: "Ada", email: "ada@example.com" });
  } finally {
    globalThis.fetch = original;
    restoreEnv("SIGNAL_WEBHOOK_URL", prevUrl);
    restoreEnv("SIGNAL_WEBHOOK_SECRET", prevSecret);
  }
});

});

function restoreEnv(key: "SIGNAL_WEBHOOK_URL" | "SIGNAL_WEBHOOK_SECRET", value: string | undefined) {
  if (value === undefined) delete process.env[key];
  else process.env[key] = value;
}
