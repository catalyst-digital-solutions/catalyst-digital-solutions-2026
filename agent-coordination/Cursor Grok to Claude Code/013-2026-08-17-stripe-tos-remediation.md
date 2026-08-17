# 013 — Stripe ToS remediation kicked off (2026-08-17)

**From:** Cursor (Fable 5) **To:** Claude Code **Owner:** Mario

Executing `PRD-stripe-remediation-FINAL.md` (Mario's Downloads). Audit doc: `docs/audits/stripe-tos-alignment-audit-2026-08-17.md`.

## Shipped this session (pushed to main)
- **P0 found & fixed:** `getbranded.../terms` was serving the sales page (proxy rewrote unknown paths → `/trades`). Built `/trades/terms` — full ToS v1.0 + Schedule A ported verbatim from the design export in `branding-and-website-landing-page/Terms & Conditions Page/`. Proxy now rewrites `getbranded/terms` → `/trades/terms`, `getbranded/privacy` → main-site privacy, `getbranded/thank-you` → `/trades/thank-you`.
- `/trades/thank-you` built (post-purchase redirect target). Copy aligned to Schedule A §A.3/§A.5 — Mario may polish.
- Trades footer Terms → `/trades/terms`; `slots.ts` EMAIL → `info@catalyst-digital-solutions.com` (`.solutions` retired per PRD Phase 5).

## Key research finding (Phase 1.6)
Stripe changelog 2026-07-29 (dahlia) added `payment_intent_data.setup_future_usage` + `consent_collection` to the Payment Link **update** endpoint; `customer_creation` NOT added → hybrid branch likely. Update calls must pin `Stripe-Version: 2026-07-29.dahlia`. Phase 2 (test mode, per Mario) settles it.

## Decisions from Mario
- Phase 2 in test mode (no live $1 self-charge).
- Thank-you page: built now, no separate PRD cycle.
- Buy button on getbranded page: yes, wired via `slots.ts` + new `src/config/payment-links.ts` after Phase 3 finalizes URLs (Phase 4 runs in both branches).

## UPDATE (same day, later session) — remediation COMPLETE

- **Phase 1 API audit done:** 20 active live links; 7 campaign + 5 dormant Founding 50 carried the stored-card defect. Zero completed sessions / setup intents / stored cards → no retroactive exposure.
- **Phase 2 → BRANCH A.** Test-mode empirical test: both `customer_creation` AND `setup_future_usage` updatable in place (changelog was incomplete — `customer_creation` works too). Real headless checkout on the updated link verified: `setup_future_usage: null`, `setup_intent: null`, `customer: null`, consent recorded `accepted`. Markdown links in `custom_text` render as hyperlinks.
- **Phase 3 done in live mode:** all 7 campaign links remediated in place (URLs unchanged); finals got consent added; per-link `custom_text.submit` now discloses deposit vs package total ("Today's charge: $2,000 (50% deposit). Package total: $4,000…"). Products renamed (shared across rungs, so amount-agnostic names + per-link submit text instead of PRD's per-slot names). 5 Founding 50 links also cleared (kept active — deactivation is Mario's call). Final sweep: **0 defective active links**.
- **Phase 4 done:** `src/config/payment-links.ts` (registry; no page renders payment links — all landing CTAs are Cal.com).
- **Phase 5:** `$149/mo` consistent everywhere incl. Stripe Care Plan product — no change needed. `mario@` on main-site legal pages left for Mario.
- Account-level ToS/Privacy URLs already set correctly (verified via live checkout consent links) — that Phase 6 item is done.
- Full evidence in the audit doc.

## Remaining for Mario (Phase 6 manual + decisions)
- Dashboard: support email/phone on public details, business name (drop `.solutions` if still present), Radar review, store policies toggle, email receipts on, `/terms` PDF snapshot before campaign start.
- Decide: deactivate the 5 dormant Founding 50 links? (defect removed either way)
- Decide: `mario@` → `info@` on main-site legal pages?
- Optional: the $1 live smoke-test purchase (confirm with Mario before running), then deactivate the smoke-test link.
