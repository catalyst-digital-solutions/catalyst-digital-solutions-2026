# STATUS — Resend email delivery PRD

Living checklist. **CG updates the boxes** as work lands; note the date + any detail.

- [x] **T1** Resend domain `catalyst-digital-solutions.com` verified (DNS live; send test HTTP 200) — **2026-07-15 CG**
- [x] **T1** Resend API key created (stored in Vercel Production+Preview + `.env.local`, never git) — **2026-07-15**
- [x] **T2** Vercel env set: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`; `CONTACT_WEBHOOK_URL` empty — **2026-07-15 CG**
- [x] **T2** Local `.env.local` present (Mario + CG quoted FROM); pull not required
- [x] **T3** Local happy-path: `POST /api/contact` → `200 {"ok":true,"via":"resend"}` — **2026-07-15 CG** (Mario confirm email body)
- [x] **T3** Validation 422 (no consent / missing email) + honeypot `200` no `via` — **2026-07-15 CG**
- [x] **T4** required-phone ⇄ SMS-consent interdependency + US 10-digit auto-format — **DONE (Claude, 2026-07-15)**; not CG's task
- [ ] **T5** Merged to `main` / PR opened (Mario approved)
- [ ] **T5** Deployed to production; live form emails hello@; URL posted in thread.md

**Blockers:** _(none)_ — waiting on Mario OK for T5 (merge/deploy).
**Open for Mario:** T3 email body confirmed complete (2026-07-15). Approve T5 merge/deploy when ready.
**Last updated:** 2026-07-15 by CG — T3 email body verified by Mario; T5 awaits OK.
