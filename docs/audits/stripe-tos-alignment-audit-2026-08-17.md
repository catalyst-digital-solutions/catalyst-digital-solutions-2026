# Stripe ↔ ToS v1.0 Alignment Audit — 2026-08-17

**Status: COMPLETE — remediation executed same day via Stripe MCP (test + live). Branch A confirmed.** See "Phase 2 result" and "Execution log" at the bottom. Definition of done verified: zero active live Payment Links carry `setup_future_usage` or `customer_creation: always`; all 7 campaign links show a required consent checkbox linking to the live ToS.

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

## Phase 2 result — BRANCH A (all parameters updatable in place)

Empirical test in **test mode** (Stripe MCP, account `acct_1NLscDHtCGFFusaf`):

1. Created throwaway $1 link mirroring the defective config (`customer_creation: always`, `setup_future_usage: off_session`, consent required).
2. Updated it: `customer_creation` → `if_required` ✓ (updatable despite absence from changelog), `payment_intent_data[setup_future_usage]` → `""` ✓ (clears to `null`).
3. Completed a real headless-browser checkout (4242 card) against the **updated** link. Session `cs_test_a1dpCBqE5QFNW3pvkDasRth25rAIkVVtV4i2Idu9KHEYg9PuYNpdrgSVvr`:
   - `payment_intent.setup_future_usage: null` ✓ — no card stored
   - `setup_intent: null` ✓
   - `customer: null` ✓ — no Customer object created at all
   - `consent.terms_of_service: "accepted"` recorded on the session (evidentiary trail works)
4. Confirmed on the hosted page: markdown `[text](url)` in `custom_text.terms_of_service_acceptance` renders as a clickable hyperlink.
5. Account-level ToS/Privacy URLs are already set (checkbox links resolved to `getbranded.../terms` and main-site `/privacy`) — Phase 6 item already done at account level.

No API-version pinning was needed; the MCP's spec version accepted all parameters.

## Phase 3 execution — live links remediated (2026-08-17)

All updates applied via `POST /v1/payment_links/:id` in **live mode**; every response verified field-by-field, then a fresh full-list sweep asserted **0 defective active links (of 20)**.

| Link | Amount | Changes |
|---|---|---|
| `plink_1U4lv0…QVENuEjj` deposit launch | $2,000 | cc→if_required, sfu cleared, consent custom text, submit text (deposit/total disclosure), metadata |
| `plink_1U4lvO…t7z155e1` deposit standard | $3,000 | same, $3,000/$6,000 disclosure |
| `plink_1U4lul…324QFjyI` full launch | $4,000 | same, paid-in-full disclosure |
| `plink_1U4lvC…sdFsBLFY` full standard | $6,000 | same |
| `plink_1U4lvc…bWsbJpl9` final launch (PRIVATE) | $2,000 | same + **consent_collection added** (was none) + §A.7 transfer language |
| `plink_1U4lvm…NYcMQB1S` final standard (PRIVATE) | $3,000 | same |
| `plink_1U4n74…oi9gwJvJ` $1 smoke test | $1 | cc→if_required, sfu cleared, consent custom text, metadata |
| 5× Founding 50 links (`plink_1SKj…`, Nov 2025, dormant) | $15k–$400k | cc→if_required, sfu cleared (defect removed; deactivation = Mario decision) |

**Product renames (§3.2, adapted):** products are *shared across rungs* (one deposit product serves both $2k and $3k prices), so per-slot names were impossible without splitting products/line items. Renamed instead: deposit → "Brand + Website Build — 50% Deposit (remaining balance due at handoff)", full → "… Paid in Full (complete package)", final → "… Final Balance (remaining 50%)". Rung-specific amounts live in each link's `custom_text.submit` disclosure, which achieves the PRD's disambiguation goal per-link.

**Custom consent text (all 7 campaign links):** "By completing this purchase you agree to the [Terms of Service and Schedule A — Brand Build Program](https://getbranded.catalyst-digital-solutions.com/terms)."

**Live visual verification:** loaded the $2,000 deposit checkout headless (no submission): correct amount, product name, consent checkbox with working hyperlink, submit disclosure. `getbranded.../terms` (200, contains Schedule A) and `.../thank-you` (200) verified in production.

**Test-mode cleanup:** throwaway link deactivated, ZZZ test product archived (`active: false`) — kept, not deleted, per PRD.

## Execution log

- 2026-08-17 (early): Built `/trades/terms`, fixed proxy, footer terms link, `slots.ts` email. Build verified. Deployed to main.
- 2026-08-17 (mid): Stripe MCP added by Mario (test+live). Full API audit: 20 active live links, 7 campaign links defective + 5 dormant Founding 50 defective; zero completed sessions, zero setup intents, zero stored cards → no retroactive exposure.
- 2026-08-17: Phase 2 test-mode empirical test → **Branch A**. Phase 3 executed in live mode (table above). Phase 4: `src/config/payment-links.ts` created (registry only; no page renders payment links — all landing CTAs are Cal.com). Phase 5: `$149/mo` copy verified consistent (landing + Schedule A + Stripe Care Plan product all $149/mo); `mario@` on main-site legal pages left as-is pending Mario's call.
