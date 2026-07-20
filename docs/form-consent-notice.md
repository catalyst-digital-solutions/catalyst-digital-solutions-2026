# Form Consent Notice + Build Handoff

Everything Cursor needs to ship `/privacy`, `/terms`, and the contact-form consent notice.

---

## Part 1 — The form consent notice

**This is what the A2P reviewer actually looks for on your contact page.** Without it, your declared opt-in story ("our web form includes a consent notice") is a claim the reviewer can't verify — and unverifiable claims get campaigns rejected.

### Placement

Directly **below** the submit button on the contact form at `/contact`, or immediately above it. It must be visible on the page without expanding anything — not behind a modal, not in a tooltip, not in the footer.

### Copy — use verbatim (updated 2026-07-20 per dual-consent research)

**Placement:** directly **below** the submit button. Checkboxes above the button remain the affirmative consent act; this notice is the disclosure record only — do **not** use "By submitting… you agree" language here (that creates a parallel consent ask and risks Twilio error 30913).

> **SMS & Contact Disclosure:** By selecting the checkboxes above and submitting this form, you acknowledge that Catalyst Digital Solutions may contact you by phone, text, and/or email using automated means. Consent is not a condition of purchase. Message frequency varies. Message and data rates may apply. Reply STOP to opt out, HELP for help. View our [Privacy Policy](/privacy) and [Terms of Service](/terms).

### Notes on the wording

- **Checkboxes = consent act; notice = disclosure.** Checkbox 1 stays scoped to general/customer-care contact. Checkbox 2 stays scoped to SMS specifically. The notice references both and carries the full CTIA phrase set (STOP, HELP, frequency, data rates, Privacy, Terms).
- **"Consent is not a condition of purchase"** — TCPA language. Cheap to include, expensive to omit.
- **"using automated means"** — covers the Dispatcher (AI voice + SMS). You're planning automated outreach; disclose it.
- **Both links must be real anchors**, not plain text. The reviewer clicks them.
- **Unchecked checkbox + notice (not notice alone):** Twilio's March 2025 A2P guide expects an unchecked checkbox for web opt-in. The standing notice ensures every required disclosure phrase is visible on the rendered page for screenshot review. Keep both; keep their scopes differentiated. See `agent-coordination/PRD-research-dual-consent-notice.md`.

---

## Part 2 — Cursor handoff prompt

Paste this into Cursor with `privacy-policy.md` and `terms-of-service.md` in the repo:

> Follow `AGENTS.md` and `docs/02-brand-system.md`.
>
> **Task:** replace the "Coming Soon" stubs at `src/app/privacy/page.tsx` and `src/app/terms/page.tsx` with real content, and add an SMS consent notice to the contact form.
>
> **1. Create a shared legal page layout** at `src/components/legal/LegalPage.tsx` — a server component taking `title`, `effectiveDate`, `lastUpdated`, and `children`. Both pages use it.
>
> **2. Style it** — dark theme, consistent with the rest of the site:
> - Background `var(--cds-bg-dark)`, content max-width `760px`, centered, `padding: clamp(80px,10vw,120px) clamp(20px,5vw,32px)`
> - H1 via the `.display` class (Bebas Neue, uppercase), `clamp(42px,5vw,72px)`
> - Effective/updated dates in JetBrains Mono, `var(--cds-muted)`, ~12px, uppercase, letter-spacing 2px
> - H2 in Bebas, `clamp(24px,2.4vw,32px)`, `var(--cds-heading)`, generous `margin-top` (~56px)
> - H3 in Inter 600, 18px, `var(--cds-heading)`
> - Body in Inter, `16px`, `line-height: 1.8`, `var(--cds-body)`
> - Links `var(--cds-cyan)`, underlined on hover
> - `<strong>` in `var(--cds-heading)`
> - Bulleted lists with comfortable spacing
> - **Use `var(--cds-*)` tokens only — no hardcoded hex.**
>
> **3. Transcribe the content verbatim** from `privacy-policy.md` and `terms-of-service.md`. Do not summarize, reorder, reword, or "improve" the legal text. Preserve the ALL-CAPS blocks in the Terms exactly as written — they're conventional for warranty disclaimers and limitation of liability.
>
> **4. Add `export const metadata`** to each page:
> - Privacy: title `"Privacy Policy — Catalyst Digital Solutions"`, description `"How Catalyst Digital Solutions collects, uses, and protects your information, including SMS and mobile data."`
> - Terms: title `"Terms of Service — Catalyst Digital Solutions"`, description `"Terms governing use of the Catalyst Digital Solutions website."`
> - Both: `robots: { index: true, follow: true }` — the pages must be crawlable and reachable.
>
> **5. Contact form** (`src/components/contact/ContactContent.tsx`): add the consent notice directly below the submit button. Copy is in `form-consent-notice.md` Part 1 — verbatim. Style: Inter 13px, `var(--cds-muted)`, `line-height: 1.6`, `max-width: 520px`, `margin-top: 16px`. "Privacy Policy" and "Terms of Service" are real `next/link` anchors in `var(--cds-cyan)`.
>
> **6. Footer:** confirm `src/components/Footer.tsx` links to `/privacy` and `/terms`. Add them if missing.
>
> **Out of scope:** everything else. Do not touch the homepage, `/api/contact`, `Nav`, or any other route.
>
> **Done when:** `npm run build` passes, `npm run lint` is clean, both pages render at 390px and 1440px with no horizontal scroll, and every internal link resolves.

---

## Part 3 — Verify before you submit the campaign

Do these **yourself**, in a browser, after Vercel deploys. Not in dev. Not on trust.

- [ ] `https://catalyst-digital-solutions.com/privacy` loads. Real content, not "Coming Soon."
- [ ] `https://catalyst-digital-solutions.com/terms` loads.
- [ ] The **Mobile information sharing** paragraph is visible on `/privacy` without expanding anything. ← *This is the single sentence the carrier is looking for. If it's collapsed behind an accordion, it doesn't count.*
- [ ] `/contact` shows the consent notice near the submit button.
- [ ] Both links in the consent notice work.
- [ ] Footer links to both pages.
- [ ] Pages are not `noindex`. View source and check.
- [ ] Open both on your phone. Readable.

Then, and only then, click **Create campaign**.

---

## Part 4 — Fix these before submitting

**Domain.** Your Twilio Customer Profile and the A2P package both reference `catalyst-digital.solutions`. **That domain does not resolve.** The live one is `catalyst-digital-solutions.com`. A carrier hitting a dead URL is an automatic reject — and this is the highest-probability failure in your whole submission. Fix the Customer Profile first; the campaign form inherits from it.

**Email.** Same problem: `mario@catalyst-digital.solutions` appears in the package. These documents use `mario@catalyst-digital-solutions.com`. **Confirm that mailbox actually receives mail before it goes in a legal document** — a privacy policy with a dead contact address is worse than no address, because now it's a written promise you're not keeping.

**Booking link.** Sample message 2 in the A2P package points at `https://cal.com/catalyst`. Confirm that's live and correct, or swap it for `https://catalyst-digital-solutions.com/contact`.
