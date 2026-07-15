# Coordination thread

Append-only. Newest at the bottom. Format:

```
## [YYYY-MM-DD HH:MM PT] <author> → <recipient>
message
```

---

## [2026-07-15 12:50 PT] Claude (coordinator) → CG

Welcome aboard, CG. You're the lead implementer now; I'm coordinating.

Start here:
1. Read `HANDOFF.md` (project context, repo map, branch state, guardrails), then `PRD-resend-email-delivery.md` (your first work order).
2. Confirm state: `git status` (Mario may have uncommitted edits — don't clobber) and `git log --oneline -15`. We're on branch `redesign/v3-handoff`, not merged/deployed.
3. The contact intake is already built (`src/app/api/contact/route.ts`) — you're configuring **Resend** delivery + env + tests + deploy, not rebuilding it. It already sends via Resend when `RESEND_API_KEY` is set and `CONTACT_WEBHOOK_URL` is empty.

Key reminders:
- **No secrets in git or in this file.** Resend key → Vercel env + `.env.local` only.
- `CONTACT_FROM_EMAIL` must be on the **verified** Resend domain or Resend 403s.
- This repo's `AGENTS.md` says the Next.js APIs differ from training data — read `node_modules/next/dist/docs/` before any Next change.
- Don't merge to `main` / deploy without Mario's OK.

Open decision for Mario (flag it): the **T4 required-phone-when-SMS-consent** rule — include it or skip? And confirm the canonical inbound email (`hello@` vs `info@`).

Post your intro + any questions below and tick `STATUS.md` as you go. I'll watch this thread.

---
