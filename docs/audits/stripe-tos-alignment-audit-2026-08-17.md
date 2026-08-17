# Stripe ↔ ToS v1.0 Alignment Audit — 2026-08-17

**Status: PARTIAL — Stripe API sections blocked on credentials.** No `STRIPE_SECRET_KEY` exists in `.env.local` or Vercel env. Everything not requiring the key is complete below.

---

## P0 findings

### P0-1 — `getbranded.../terms` served the sales page, not the Terms (FIXED in code, pending deploy)

`https://getbranded.catalyst-digital-solutions.com/terms` returned **200 with the trades sales landing page**, because `src/proxy.ts` rewrote every unknown path on that host to `/trades`. The PRD §1.3 check (status code only) would have passed falsely. Every checkout consent link would have pointed a buyer at the sales pitch.

**Fix (this commit, not yet deployed):**
- Built `/trades/terms` — full ToS v1.0 + Schedule A (Brand Build Program), ported verbatim from the approved design export (`branding-and-website-landing-page/Terms & Conditions Page/Terms of Service.dc.html`). Component: `src/components/trades/BrandBuildTerms.tsx`.
- `src/proxy.ts`: `getbranded/terms` → rewrites to `/trades/terms`; `getbranded/privacy` → redirects to main-site privacy.
- Trades footer "Terms" link now points to `/trades/terms` (was main-site generic terms).

**Until this is pushed and Vercel deploys, the ToS URL is still wrong in production.** Do not set the Stripe consent/ToS URL or verify links before deploy.

### P0-2 — Stored-card check (§1.2): BLOCKED on API key

Cannot yet confirm whether any Customer already has an off-session payment method stored. Mario reports zero completed purchases/sessions on all Brand Build links, which if accurate means no exposure — must still be verified by API before Phase 3.

---

## §1.1 Payment Link inventory — BLOCKED on API key

## §1.2 Stored cards / customers / sessions — BLOCKED on API key

## §1.3 ToS URL resolution

- `getbranded.catalyst-digital-solutions.com` DNS resolves (CNAME → `cname.vercel-dns.com`) — the previously missing Namecheap record has been added.
- `/terms` on that host: **200 but wrong content** (see P0-1). Check must verify content, not status code. After deploy, verify the page contains "Schedule A" and "Brand Build Program".

## §1.4 Account settings — BLOCKED on API key

## §1.5 Codebase audit

**`buy.stripe.com` URLs (3 hits, all one file):** `src/app/proposals/martin-refrigeration-mep/page.tsx` lines 296, 332, 356 (+ repeats at 529–531) — Foundation/Framework/Landmark **monthly program** links, not Brand Build. Must be cross-referenced against the §1.1 inventory once the key is available; if they carry the same defective config they're in scope too (they're subscription-style monthly offers, so `setup_future_usage` semantics differ — flag for review, do not assume).

**Brand Build links in code: none.** The trades page CTA is Cal.com only. Phase 4 is greenfield: create `src/config/payment-links.ts` when links are final (decision: do this in BOTH branches, not just Branch B — the tier-1 → tier-2 URL switch happens mid-campaign regardless of branch).

**Contradictory copy:** one hit needing Mario's approval (Phase 5 rule — do not self-rewrite):
- `src/components/trades/TradesOfferLanding.tsx:1448` — "After launch: $149/mo web & AI hosting, security, maintenance, backups, etc."
  - Risk: read in isolation it could imply the $149/mo is automatic/mandatory after launch.
  - **Proposed replacement (awaiting Mario):** "After launch: optional Care Plan — $149/mo for web & AI hosting, security, maintenance, backups. Separate checkout; you enroll only if you want it. No card saved today."
- `save`+`card`, `card on file`, `saved card`, `auto-renew`, `auto-enroll`: no public-facing hits (only CSS `scroll-snap-type: x mandatory`, benign).

**Stale identifiers:**
- `src/config/slots.ts:20` — `hello@catalyst-digital.solutions` → **replaced** with `info@catalyst-digital-solutions.com` (PRD Phase 5 direct-replacement authority; note CLAUDE.md previously documented hello@ as intentional — Mario can veto).
- `mario@catalyst-digital-solutions.com` in `src/app/(site)/privacy/page.tsx` (3×), `src/app/(site)/terms/page.tsx` (2×), `src/app/(site)/legal/service-agreement/page.tsx` (2×), `src/app/proposals/martin-refrigeration-mep/page.tsx` (1×) — all public-facing → replace with `info@` per PRD. **Not yet changed** (batched for next commit on Mario's OK, since main-site legal pages are outside the trades funnel).
- `535-9927`: zero hits in `src/`. ✓

## §1.6 Research (Perplexity MCP errored; used direct web research against docs.stripe.com)

**Hypothesis for Phase 2** (from Stripe changelog `dahlia/2026-07-29/payment-links-update-endpoint-new-parameters` and the update-endpoint API reference):

- `payment_intent_data.setup_future_usage` **was added to the update endpoint on 2026-07-29** ("Previously, API requests that included this parameter returned a 400 error"). `consent_collection` and `shipping_options` were added in the same change.
- `customer_creation` is **NOT** in the changelog's added-parameter list → expected create-only → **hybrid branch likely**: `setup_future_usage` patchable, `customer_creation` not.
- The changelog documents setting `on_session`/`off_session`; it does **not** document clearing the value (empty string). Unresolved — Phase 2 must test clearing specifically.
- **The update call must pin `Stripe-Version: 2026-07-29.dahlia` (or later)** or the parameter may still 400 under the account's older default API version. Phase 2 must test with and without the version header and record both.

Per PRD: hypothesis only. Phase 2 decides.

## Proposed remediation plan (pending Phase 2)

1. Deploy the terms page (this commit). Verify content at `getbranded.../terms`.
2. Mario: Stripe Dashboard → Settings → Business → Public details → set ToS URL to `https://getbranded.catalyst-digital-solutions.com/terms` + privacy URL, support email `info@`, phone `(661) 888-4837`, business name (remove `.solutions`). **Prerequisite for consent-checkbox verification** — the checkbox's default link uses the account-level ToS URL.
3. Phase 2 empirical test (mode decision pending Mario — test mode recommended).
4. Phase 3: likely hybrid — patch `setup_future_usage` + `consent_collection` + `custom_text` in place if updatable; if `customer_creation` is create-only, full Branch B replacement per PRD ordering (create → verify → deactivate). Mario confirms zero completed sessions, so replacement links can carry identical `restrictions.completed_sessions.limit` (verify `.count == 0` via API first).
5. Product renames per PRD §3.2.
6. Phase 4 (both branches): `src/config/payment-links.ts`.
7. Phase 5 copy: one item awaiting Mario (above) + `mario@` sweep.

## Execution log

- 2026-08-17: Built `/trades/terms`, fixed proxy, footer terms link, `slots.ts` email. Build verified. Awaiting: push approval, Stripe key, Phase 2 mode decision.
