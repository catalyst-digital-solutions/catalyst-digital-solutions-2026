# Catalyst private checkout

Self-contained Next.js app for private per-client checkout pages. Deployed as a **separate Vercel project** so the main Catalyst site (`catalyst-digital-solutions-2026`) is not rebuilt or rerouted.

Production host: `https://start.catalyst-digital-solutions.com`

## Local

```bash
cd start
npm install
npm run dev
```

- `/` — redirects to `/atara`
- `/atara` — Atara Mechanical private project checkout (intro splash on every load)
- `/atara/success` — $4,000 kickoff payment thank-you
- `/atara/success/full` — $8,000 paid-in-full thank-you
- `/atara/success/processing` — payment still confirming (does not imply success)
- `/atara/success/incomplete` — payment not completed / could not confirm

**Stripe after-payment / webhook-driven redirects (production):**

1. Kickoff ($4,000): `https://start.catalyst-digital-solutions.com/atara/success`
2. Paid in full ($8,000): `https://start.catalyst-digital-solutions.com/atara/success/full`
3. Processing: `https://start.catalyst-digital-solutions.com/atara/success/processing`
4. Incomplete: `https://start.catalyst-digital-solutions.com/atara/success/incomplete`

```bash
npm run typecheck
npm run lint
npm run build
```

## Vercel project settings

Create a **new** Vercel project (do not change the main site project):

| Setting | Value |
|---|---|
| Framework Preset | Next.js |
| Root Directory | `start` |
| Build Command | `next build` (default) |
| Output | Next.js default |
| Install Command | `npm install` (default) |
| Node.js | 22.x (or current Vercel default) |

**Environment variables (Production + Preview):**

- `NEXT_PUBLIC_ATARA_STRIPE_KICKOFF_URL` — Stripe Payment Link for the $4,000 kickoff. If unset, that button stays disabled even after the agreement is accepted.
- `NEXT_PUBLIC_ATARA_STRIPE_FULL_URL` — Stripe Payment Link for the $8,000 pay-in-full option. If unset, that button stays disabled even after the agreement is accepted.

**Domain:** attach `start.catalyst-digital-solutions.com` to this project only.

The app sends `X-Robots-Tag: noindex, nofollow` on every route, sets matching robots metadata, and serves `robots.txt` that disallows all crawlers.
