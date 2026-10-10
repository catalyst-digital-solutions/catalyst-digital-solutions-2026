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

## Client onboarding — `/atara/onboarding`

Private, data-driven onboarding form (config: `src/config/onboarding/atara.ts`; renderer: `src/components/onboarding/`). Tailwind v4 is imported only by `src/components/onboarding/onboarding.css`, so the checkout pages are unaffected.

**Access.** No passwords. Catalyst mints a private link; opening `/{client}/onboarding/access?t=…` swaps the token for an httpOnly signed cookie and redirects to the clean URL. Only token hashes are stored; links expire (30 days) and can be revoked. Every API call re-derives the onboarding instance from the session — never from the request body.

**Data.** `src/lib/onboarding/server/store/` has one interface with two implementations: Supabase (service role, server-only) and a local JSON store for development. Setting `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` switches to Supabase — no code changes. Uploads go straight to the private `onboarding-uploads` bucket via signed upload URLs; Catalyst gets signed download URLs in the export.

**Setup (once Supabase is connected to this Vercel project):**

```bash
vercel env pull .env.local          # SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, POSTGRES_URL_NON_POOLING …
npm run onboarding:migrate          # applies supabase/migrations/*.sql (tables, RLS, private bucket)
```

**Admin CLI** (runs locally against whichever store the env points to):

```bash
npm run onboarding -- create --client atara --email <client email> --name "<name>"
npm run onboarding -- link --instance <id>            # prints a private link (no email)
npm run onboarding -- link --instance <id> --send     # also emails it (needs RESEND_API_KEY)
npm run onboarding -- list
npm run onboarding -- export --instance <id> --out atara.json   # answers + signed file URLs + events
npm run onboarding -- complete --instance <id> [--send]
npm run onboarding -- revoke --instance <id>
```

**Design preview** (non-production only, never writes): `/atara/onboarding?view=intro|section|review|submitted&step=N&demo=1`.

Client-facing emails are off unless `ONBOARDING_CLIENT_EMAILS=on` (or an explicit `--send`). Internal notifications go to `ONBOARDING_NOTIFY_EMAIL`. See `.env.example` for every variable.
