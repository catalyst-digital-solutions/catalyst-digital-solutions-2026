/**
 * Brand Starter intake — POST /api/brand-starter (multipart)
 *
 * Always emails Mario via Resend (same pattern as /api/contact).
 * If SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set, stores the row + files.
 * If TWILIO_* is set, texts Mario that a starter just submitted.
 */

export const dynamic = "force-dynamic";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "hello@catalyst-digital-solutions.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Catalyst Website <noreply@catalyst-digital-solutions.com>";
const SMS_TO = process.env.INTAKE_SMS_TO || "+16618884837";
const MAX_FILE_BYTES = 4_000_000;

function esc(s: unknown): string {
  return String(s ?? "").replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] as string));
}

function str(form: FormData, key: string): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function digits10(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.length === 11 && digits[0] === "1" ? digits.slice(1) : digits;
  return normalized.length === 10 ? normalized : null;
}

async function fileMeta(file: FormDataEntryValue | null): Promise<{ name: string; size: number; type: string; bytes: ArrayBuffer } | null> {
  if (!file || typeof file === "string") return null;
  if (file.size === 0) return null;
  if (file.size > MAX_FILE_BYTES) throw new Error(`File ${file.name} is over 4MB.`);
  return { name: file.name, size: file.size, type: file.type || "application/octet-stream", bytes: await file.arrayBuffer() };
}

async function sendEmail(subject: string, text: string, html: string, replyTo: string) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[brand-starter] no RESEND_API_KEY — submission not emailed:\n" + text);
    return "log";
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM_EMAIL, to: [TO_EMAIL], reply_to: replyTo, subject, text, html }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend responded ${res.status} ${detail}`);
  }
  return "resend";
}

async function sendSms(body: string) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  if (!sid || !token || !from) return "skipped";
  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ To: SMS_TO, From: from, Body: body }).toString(),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[brand-starter] Twilio failed:", res.status, detail);
    return "failed";
  }
  return "twilio";
}

async function storeSupabase(row: Record<string, unknown>, files: Record<string, { name: string; type: string; bytes: ArrayBuffer }>) {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { stored: false as const, paths: {} as Record<string, string> };

  const headers = {
    Authorization: `Bearer ${key}`,
    apikey: key,
  };
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const paths: Record<string, string> = {};

  for (const [slot, file] of Object.entries(files)) {
    const path = `${id}/${slot}-${file.name.replace(/[^\w.\-]+/g, "_")}`;
    const put = await fetch(`${url}/storage/v1/object/brand-starter/${path}`, {
      method: "POST",
      headers: { ...headers, "Content-Type": file.type, "x-upsert": "true" },
      body: file.bytes,
    });
    if (!put.ok) {
      const detail = await put.text().catch(() => "");
      throw new Error(`Supabase storage ${put.status} ${detail}`);
    }
    paths[slot] = path;
  }

  const insert = await fetch(`${url}/rest/v1/brand_starter_intakes`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ id, ...row, files: paths }),
  });
  if (!insert.ok) {
    const detail = await insert.text().catch(() => "");
    throw new Error(`Supabase insert ${insert.status} ${detail}`);
  }
  return { stored: true as const, paths };
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ ok: false, error: "Invalid form data" }, { status: 400 });
  }

  if (str(form, "botField")) return Response.json({ ok: true });

  const name = str(form, "name");
  const email = str(form, "email");
  const phone = str(form, "phone");
  const company = str(form, "company");
  const city = str(form, "city");
  const towns = str(form, "towns");
  const services = str(form, "services");
  const mascot = str(form, "mascot");
  const colors = str(form, "colors");
  const competitors = str(form, "competitors");
  const sessionId = str(form, "sessionId");

  if (!name || !email || !company || !services) {
    return Response.json({ ok: false, error: "Name, email, company, and services are required." }, { status: 422 });
  }
  const phone10 = digits10(phone);
  if (!phone10) {
    return Response.json({ ok: false, error: "A valid 10-digit U.S. phone number is required." }, { status: 422 });
  }

  let logo: Awaited<ReturnType<typeof fileMeta>>;
  let shop: Awaited<ReturnType<typeof fileMeta>>;
  let truck: Awaited<ReturnType<typeof fileMeta>>;
  try {
    logo = await fileMeta(form.get("logo"));
    shop = await fileMeta(form.get("shop"));
    truck = await fileMeta(form.get("truck"));
  } catch (err) {
    return Response.json({ ok: false, error: err instanceof Error ? err.message : "File too large" }, { status: 422 });
  }

  const row = {
    name,
    email,
    phone: phone10,
    company,
    city,
    towns,
    services,
    mascot,
    colors,
    competitors,
    session_id: sessionId,
    submitted_at: new Date().toISOString(),
  };

  const files: Record<string, { name: string; type: string; bytes: ArrayBuffer }> = {};
  if (logo) files.logo = logo;
  if (shop) files.shop = shop;
  if (truck) files.truck = truck;

  const fileNote = [
    logo ? `logo: ${logo.name} (${logo.size} bytes)` : "logo: (none)",
    shop ? `shop: ${shop.name} (${shop.size} bytes)` : "shop: (none)",
    truck ? `truck: ${truck.name} (${truck.size} bytes)` : "truck: (none)",
  ].join("\n");

  const text = [
    "New Brand Starter intake",
    `Company: ${company}`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `City: ${city}`,
    `Towns: ${towns}`,
    `Services: ${services}`,
    `Mascot: ${mascot}`,
    `Colors: ${colors}`,
    `Competitors: ${competitors}`,
    `Stripe session: ${sessionId}`,
    fileNote,
  ].join("\n");

  const html =
    `<h2 style="font-family:sans-serif">Brand Starter intake — ${esc(company)}</h2>` +
    `<pre style="font-family:sans-serif;white-space:pre-wrap">${esc(text)}</pre>`;

  try {
    const via = await sendEmail(`Brand Starter intake — ${company} (${name})`, text, html, email);
    let stored = false;
    try {
      const result = await storeSupabase(row, files);
      stored = result.stored;
    } catch (err) {
      console.error("[brand-starter] supabase failed:", err);
    }
    const sms = await sendSms(`Brand Starter in: ${company} / ${name} / ${phone}. Book the reveal.`);
    return Response.json({ ok: true, via, stored, sms });
  } catch (err) {
    console.error("[brand-starter] delivery failed:", err);
    return Response.json({ ok: false, error: "Delivery failed" }, { status: 502 });
  }
}
