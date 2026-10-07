# Atara kickoff + paid-in-full + processing pages

CG implementing Stripe post-payment screens in `start/` on `cursor/atara-kickoff-success-b4cb` off `main`. Checkout splash / payment-button logic untouched.

## Routes
- `/atara/success` — $4,000 kickoff (Atara Success - Kickoff.dc.html)
- `/atara/success/full` — $8,000 paid in full (Atara Success - Paid in Full.dc.html)
- `/atara/success/processing` — waiting state; does **not** imply payment succeeded

Shared chrome (header/footer/hero rings). Success variants share `AtaraSuccess`. Processing is a separate page (no checkmarks, no amounts received, no thumbs-up lamb).

## Stripe after-payment / webhook-driven URLs (production)
1. Kickoff: `https://start.catalyst-digital-solutions.com/atara/success`
2. Paid in full: `https://start.catalyst-digital-solutions.com/atara/success/full`
3. Processing: `https://start.catalyst-digital-solutions.com/atara/success/processing`

## Guardrails
- Checkout `/atara` unchanged except splash-lock is skipped on `/success*` so Brittany can scroll.
- No legal copy edits. No Stripe secrets. No merge to main.
