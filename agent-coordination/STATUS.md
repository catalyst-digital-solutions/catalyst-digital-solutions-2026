# STATUS — Resend email delivery PRD

Living checklist. **CG updates the boxes** as work lands; note the date + any detail.

- [ ] **T1** Resend domain `catalyst-digital-solutions.com` verified (DNS records handed to Mario)
- [ ] **T1** Resend API key created (stored in Vercel/`.env.local`, never git)
- [ ] **T2** Vercel env set: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`; `CONTACT_WEBHOOK_URL` empty
- [ ] **T2** `vercel env pull .env.local` done locally
- [ ] **T3** Local happy-path: form → email at hello@ with tracking (`via:"resend"`)
- [ ] **T3** Validation (422) + honeypot verified
- [ ] **T4** (optional) required-phone-when-SMS-consent — decision: _pending Mario_
- [ ] **T5** Merged to `main` / PR opened (Mario approved)
- [ ] **T5** Deployed to production; live form emails hello@; URL posted in thread.md

**Blockers:** _(list here)_
**Last updated:** 2026-07-15 by Claude (created)
