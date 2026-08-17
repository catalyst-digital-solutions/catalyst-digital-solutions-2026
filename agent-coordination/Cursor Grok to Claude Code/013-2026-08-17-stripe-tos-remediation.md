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

## Open
- Stripe MCP now available (test + live). Phase 1 API audit next; STOP-AND-REPORT gates per PRD honored (esp. before Phase 3 live writes).
- Phase 5 copy awaiting Mario: `$149/mo` line in `TradesOfferLanding.tsx:1448` (proposed wording in audit doc); `mario@` → `info@` sweep on main-site legal pages.
- Mario manual (Phase 6): Dashboard public details (ToS/privacy URLs, support email/phone, business name) BEFORE Phase 3 verification; Radar rules, store policies off, receipts on, `/terms` PDF snapshot before campaign start.
