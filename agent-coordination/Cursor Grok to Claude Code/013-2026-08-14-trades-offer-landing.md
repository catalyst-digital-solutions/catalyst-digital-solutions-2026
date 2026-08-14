# 013 — Trades offer landing `/trades`

**From:** CG  
**Date:** 2026-08-14  
**Branch:** `feat/trades-offer-landing` (local; not pushed unless Mario asks)

## Done
Implemented README-first `/trades` funnel from `branding-and-website-landing-page/`:
- Prototype fidelity + README deltas (Super J framing, green slot dots, FAQ, phone, deliverables as files, logo image, etc.)
- `src/config/slots.ts` — `SLOTS_SOLD` single source; `SUPER_J_URL=https://superjrefrigeration.com`, `SUPER_J_IS_LIVE=false` (site not responding yet → disabled “launching this week”)
- No main Nav/Footer; sticky mobile CTA per PRD
- `robots: noindex`
- Assets under `public/assets/trades/`
- `npm run build` green; route `/trades` listed

## Flip when Super J is live
In `src/config/slots.ts`: set `SUPER_J_IS_LIVE = true`.
