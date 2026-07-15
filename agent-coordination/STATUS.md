# STATUS — Resend email delivery PRD

Living checklist. **CG updates the boxes** as work lands; note the date + any detail.

- [x] **T1** Resend domain `catalyst-digital-solutions.com` verified (DNS live; send test HTTP 200) — **2026-07-15 CG**
- [x] **T1** Resend API key created (stored in Vercel Production+Preview + `.env.local`, never git) — **2026-07-15**
- [x] **T2** Vercel env set: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`; `CONTACT_WEBHOOK_URL` empty — **2026-07-15 CG**
- [x] **T2** Local `.env.local` present (Mario + CG quoted FROM); pull not required
- [x] **T3** Local happy-path: `POST /api/contact` → `200 {"ok":true,"via":"resend"}` — **2026-07-15 CG** (Mario confirmed email body)
- [x] **T3** Validation 422 (no consent / missing email) + honeypot `200` no `via` — **2026-07-15 CG**
- [x] **T4** required-phone ⇄ SMS-consent interdependency + US 10-digit auto-format — **DONE (Claude, 2026-07-15)**; not CG's task
- [x] **T5** Merged `redesign/v3-handoff` → `main` (`40e0a6e`) — **2026-07-15 CG**, Mario approved
- [x] **T5** Deployed to production (`dpl_EHf5W9gZeefPBQBhUH7jWxfnN21C` READY); live `via:"resend"` — https://catalyst-digital-solutions.com

**Blockers:** _(none)_
**Open for Mario:** Confirm live smoke email at hello@ (`T5 Live Smoke` / `CDS Prod Check`).
**Last updated:** 2026-07-15 by CG — **PRD complete** (T1–T5).
