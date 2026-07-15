# PRD — Contact form email delivery via Resend (+ deploy)

**Owner:** Mario · **Coordinator:** Claude · **Implementer:** CG (Cursor Grok 4.5)
**Branch:** `redesign/v3-handoff` · **Status:** see `STATUS.md` · **Comms:** `thread.md`

> Prereq: read `HANDOFF.md` first. Post an intro in `thread.md` before starting.

## 1. Objective

Make the **Contact form actually deliver** every submission as an **email to `hello@catalyst-digital-solutions.com`** using **Resend**, including tracking info that identifies **which form** it came from, then get it **live in production**. Mario has a Resend account and will add the domain to Resend + add DNS records.

## 2. What's already built (don't rebuild)

The intake endpoint and the form are done and committed (`1f2788c`). Your job is to configure delivery, verify, and deploy — not to rewrite them.

**`src/app/api/contact/route.ts`** — `POST /api/contact`. It:
- Validates (requires `name`, `email`, `consentToContact === true`; else `422`).
- Drops honeypot spam (`botField` non-empty → `200` no delivery).
- Builds a subject + text/HTML body with tracking rows (form, submittedAt, page URL, referrer, all fields, consent flags).
- **Delivers by env, in priority order:**
  1. `CONTACT_WEBHOOK_URL` set → POST JSON to it (Zapier/Make). 
  2. else `RESEND_API_KEY` set → POST to `https://api.resend.com/emails` (from `CONTACT_FROM_EMAIL` → to `CONTACT_TO_EMAIL`, `reply_to` = submitter email).
  3. else → `console.log` only (dev fallback).
- Returns `{ ok: true, via: "webhook"|"resend"|"log" }` or an error status.

**Payload shape the form sends** (POST body):
```jsonc
{
  "formId": "contact-page",
  "formName": "Contact — Let's talk about your pipeline",
  "name","company","email","phone","trade","tradeOther","revenue","url","challenge","source","sourceOther",
  "consentToContact": true, "consentToSms": false, "botField": "",
  "meta": { "submittedAt": ISO, "pagePath", "pageUrl", "referrer" }
}
```
New forms added later should POST here with a **different `formId`/`formName`** so they self-identify in the email.

## 3. Tasks

### T1 — Resend domain + API key (use Resend MCP)
- Add/verify sending domain **`catalyst-digital-solutions.com`** in Resend. Generate the DNS records (SPF/DKIM/return-path). **Mario adds them on Namecheap** — hand him the exact records via `thread.md`, then poll until verified.
- Create a **Resend API key** (sending scope). Do **not** paste it into git or `thread.md`. Keep it for the env step (Vercel MCP can set it directly).

### T2 — Vercel env vars (use Vercel MCP)
Set on the `catalyst-digital-solutions-2026` project (Production; add Preview if you want preview-deploy testing):
- `RESEND_API_KEY` = (secret)
- `CONTACT_TO_EMAIL` = `hello@catalyst-digital-solutions.com`
- `CONTACT_FROM_EMAIL` = `Catalyst Website <noreply@catalyst-digital-solutions.com>` (the from-domain **must** be the verified Resend domain, or Resend returns 403)
- **Ensure `CONTACT_WEBHOOK_URL` is unset/empty** (otherwise the route uses the webhook path instead of Resend).
- Pull to local for testing: `vercel env pull .env.local` (never commit `.env.local`).

### T3 — Test delivery (must pass before deploy)
Run `npm run dev -- --port 3007` with `.env.local` present, then:
- **Happy path:** submit the Contact form (or `curl` — see §5) → `200 {"ok":true,"via":"resend"}` **and** an email lands at `hello@` with: correct subject (`New contact-page lead — <name> (<company>)`), all fields, and tracking (Form/submittedAt/Page/Referrer). `reply_to` = submitter's email.
- **Validation:** no consent → `422`. Missing email → `422`.
- **Honeypot:** `botField` filled → `200`, no email sent.
- Confirm the SMS-consent flag and the Trade/Source "Other" free-text values come through.

### T4 — ✅ DONE (Claude, 2026-07-15) — do not redo
Bidirectional phone ⇄ SMS-consent interdependency implemented in
`src/components/contact/ContactContent.tsx`: entering a phone requires checking
SMS consent, and checking SMS consent requires a valid phone. US numbers
auto-format to `(XXX) XXX-XXXX` (leading `1` stripped); exactly 10 digits
required when required; submit stays disabled with inline errors until resolved.

### T5 — Deploy
- Only after T3 passes and **Mario approves**: merge `redesign/v3-handoff` → `main` (or open a PR for him), deploy to **production** via Vercel.
- **Live smoke test:** submit the real form on catalyst-digital-solutions.com → confirm the email arrives. Watch for the from-domain/verification 403 and cold-start issues.
- Report results + the production URL in `thread.md`.

## 4. Acceptance criteria

- [ ] Resend domain verified; API key stored only in Vercel/`.env.local`.
- [ ] Local submit emails `hello@` with full data + tracking; `via:"resend"`.
- [ ] Validation (422) + honeypot behavior confirmed.
- [ ] (If chosen) required-phone rule works.
- [ ] Deployed to production; live form emails `hello@`; PR/commit noted in `thread.md`.
- [ ] No secret committed to git.

## 5. Reference — curl test
```bash
curl -s -X POST http://localhost:3007/api/contact -H "Content-Type: application/json" -d '{
  "formId":"contact-page","name":"Test Lead","company":"Acme","email":"you@youremail.com",
  "phone":"6615550123","trade":"Roofing","revenue":"$1M–$5M","challenge":"test",
  "source":"Google","consentToContact":true,"consentToSms":false,
  "meta":{"submittedAt":"2026-07-15T12:00:00Z","pageUrl":"http://localhost:3007/contact","referrer":"(direct)"}
}' -w "\n[%{http_code}]\n"
```

## 6. Guardrails
- Read `AGENTS.md` / `node_modules/next/dist/docs/` before Next changes.
- No secrets in git or `thread.md`. From-address must be on the verified domain.
- Don't merge/deploy without Mario's OK. Don't clobber his uncommitted edits.
- When blocked or done with an item: update `STATUS.md` and post in `thread.md`.
