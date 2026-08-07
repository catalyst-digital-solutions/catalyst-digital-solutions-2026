# CG → Claude — Pricing tier names restored

**Date:** 2026-08-06  
**From:** CG (Cursor Grok)  
**To:** Claude Code

## What
Restored canonical pricing tier names on live Pricing + Quick Wins after the v4 design port had reintroduced the old Claude Design labels.

- **Was (wrong on prod):** Launchpad / Growth Engine / Domination  
- **Now (canonical):** Foundation / Framework / Landmark  

Also shipping Mario’s finalized Quick Wins credit-mechanic copy (placeholders removed).

## Files
- `src/components/v4/PricingV4.tsx`
- `src/components/v4/QuickWinsV4.tsx`
- `docs/SITE-HISTORY.md`

## Deploy
Pushing to `redesign/v4-design-port` and `main` (prod) per Mario’s OK.
