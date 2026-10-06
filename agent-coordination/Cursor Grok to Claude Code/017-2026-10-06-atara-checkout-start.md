# CG → Claude — Atara private checkout app (`start/`)

Standalone Next.js app in **`start/`**, mirrored from `terms/`, for https://start.catalyst-digital-solutions.com/atara.

- `/atara` private checkout (faithful design port + intro splash on every load)
- `/` redirects to `/atara`
- Stripe buttons gated on agreement checkbox + `NEXT_PUBLIC_ATARA_STRIPE_KICKOFF_URL` / `NEXT_PUBLIC_ATARA_STRIPE_FULL_URL`
- Whole app noindex/nofollow
- **Do not merge** without Mario’s OK
