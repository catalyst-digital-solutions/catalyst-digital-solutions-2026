# PRD — Research: "Belt-and-Suspenders" Dual Consent (Checkbox + Standing Notice) for SMS/A2P 10DLC

**Type:** Research brief (not an implementation PRD). Output feeds a decision, then a follow-up implementation PRD.
**For:** Perplexity (via `perplexity_search_web` MCP tool, `task-master research`, or pasted directly into Perplexity).
**Owner of the decision:** Mario. This research informs his call; it doesn't make it.

---

## 1. Background — why this research is needed

`docs/form-consent-notice.md` (Twilio A2P 10DLC handoff doc) instructs adding a **verbatim standing consent notice** directly below the contact form's submit button:

> By submitting this form, you agree to be contacted by Catalyst Digital Solutions by phone, text, and email at the information provided, including by automated means. Consent is not a condition of purchase. Message frequency varies. Message and data rates may apply. Reply STOP to opt out, HELP for help. See our [Privacy Policy](/privacy) and [Terms of Service](/terms).

But the contact form (`src/components/contact/ContactContent.tsx`) **already has two consent checkboxes** sitting directly *above* the same submit button:
1. Required: "I agree to be contacted by Catalyst Digital Solutions about my request."
2. Conditionally required (if a phone number is entered): "I also agree to receive text messages (SMS) at the number I provide. Message & data rates may apply; reply STOP to opt out."

`form-consent-notice.md` Part 1 itself says to **pick one mechanism, not both** ("Recommendation: notice, not checkbox... Pick one and keep the story consistent"), but Part 2's build instructions add the notice **unconditionally**, without addressing the existing checkboxes. Implementing Part 2 literally would put both a checkbox-based ask above the button and a plain-text notice below it — i.e., "belt-and-suspenders" dual consent. This research determines whether that's actually fine, actively better, or a mistake to avoid before we build it.

## 2. What's actually at stake

- **A2P 10DLC campaign approval.** Twilio (and the carriers behind it) reviews the declared opt-in flow against what's visible on the live page. Wrong or duplicated consent claims are a rejection risk.
- **TCPA legal defensibility.** Consent language is what protects Catalyst if a lead later disputes receiving texts/calls.
- **Form conversion.** More visible consent asks / stacked checkboxes can suppress form completion; contractors filling out an audit-request form are not a captive audience.
- **Internal consistency.** Whatever ships on the site must match what's declared in the Twilio Customer Profile / A2P campaign registration (see `docs/form-consent-notice.md` Part 4 — those docs already have unrelated domain/email mismatches to fix, so accuracy here matters).

## 3. Research questions (answer all, with sources)

1. **A2P 10DLC campaign vetting:** Does Twilio (or carriers generally) treat a static/passive consent notice near a submit button as functionally different from an explicit unchecked checkbox for opt-in verification purposes? Is using *both* ever flagged as redundant, inconsistent, or confusing during review — or is it a non-issue?
2. **TCPA (47 CFR § 64.1200) and the FCC's 2023 revocation-of-consent rule:** Does combining an explicit checkbox with a passive notice strengthen the evidentiary consent record (defense-in-depth), or does stacking two consent mechanisms with overlapping-but-not-identical language (e.g., "contacted by phone/text/email" in the notice vs. a separate SMS-only checkbox) create ambiguity about what was actually consented to?
3. **CTIA Messaging Principles and Best Practices** (most current version): What do they say about acceptable opt-in language, and about layering multiple consent mechanisms on one form?
4. **Carrier/review-bot behavior:** Do A2P reviewers (human or automated) scan the rendered page for required disclosure phrases (e.g., "message frequency varies," "reply STOP," "data rates may apply") independent of whether those phrases also appear inside a checkbox label? I.e., does the *presence of the phrase on the page* matter more than *which UI element it's attached to*?
5. **UX/conversion impact:** Is there credible data or established best practice on how stacking two consent asks (required checkbox + adjacent notice, both making similar promises) affects form-completion rates, versus a single, clear consent mechanism?
6. **If dual consent is used, how should it be worded to avoid redundancy/contradiction?** E.g., scope the checkbox narrowly to SMS-specific consent and scope the notice to the broader TCPA boilerplate + required Privacy/Terms links (which a checkbox alone typically doesn't include) — is this the recommended pattern, or is there a better-established structure?
7. **Twilio-specific:** For Twilio's A2P 10DLC campaign registration, is an explicit checkbox required/preferred for any particular use-case category (e.g., "Mixed," "Marketing") versus a passive notice being sufficient for "Customer Care" / low-volume conversational use cases like an audit-request form? Does Twilio's own documentation give a concrete example of an accepted opt-in flow that combines both?
8. **Recency check:** Have CTIA, Twilio, or FCC guidance on this topic changed materially in 2025–2026? Messaging compliance rules move fast — prioritize sources from the last 12–18 months over older evergreen blog posts.

## 4. Deliverable / success criteria

Produce a short recommendation memo (not just raw links) that answers:

- **Verdict:** one of — (a) keep both (dual consent) as designed, (b) drop the checkboxes and rely on the notice alone, (c) drop the notice and rely on the checkboxes alone, (d) keep both but reword to eliminate overlap.
- **Why**, with citations (Twilio docs, CTIA guidelines, FCC/TCPA text, and any recent authoritative compliance commentary — e.g., Twilio's compliance blog, TCPAWorld, Bandwidth/Vonage messaging compliance pages).
- **If "keep both" or "reword":** the specific copy/placement adjustment needed so the checkbox and the notice don't read as duplicative or contradictory (this repo's exact current copy is quoted in §1 above — reference it directly).
- **Confidence level** and any caveats (e.g., "this is a legal question; recommend a lawyer confirm before campaign submission" if the research surfaces genuine legal ambiguity).

## 5. Suggested research prompt (copy-paste ready)

> I run a small B2B marketing agency's website with a contact form that requests SMS consent for Twilio A2P 10DLC registration. The form currently has two consent checkboxes right above the submit button: (1) a required "I agree to be contacted by Catalyst Digital Solutions about my request" checkbox, and (2) a conditionally-required "I also agree to receive text messages (SMS)... message & data rates may apply; reply STOP to opt out" checkbox shown when a phone number is entered. I'm considering ALSO adding a separate static consent notice directly below the submit button reading: "By submitting this form, you agree to be contacted by Catalyst Digital Solutions by phone, text, and email at the information provided, including by automated means. Consent is not a condition of purchase. Message frequency varies. Message and data rates may apply. Reply STOP to opt out, HELP for help. See our Privacy Policy and Terms of Service." Is it a good practice, a bad practice, or a neutral practice to have BOTH the checkboxes and this static notice on the same form for Twilio A2P 10DLC campaign approval purposes and TCPA compliance? Does Twilio or CTIA guidance say anything about combining an opt-in checkbox with a passive consent notice on the same form? Would a carrier reviewer treat this as redundant or as stronger evidence of consent? What's the current (2025-2026) best-practice recommendation, and what's the ideal wording/placement if both should be kept?

## 6. How to use this

1. Run the prompt in §5 via Perplexity (directly, or through the `perplexity_search_web` / `task-master research` tools, ideally with `--detail high` if using task-master).
2. Save findings back into this file's "Findings" section below, or into a new `agent-coordination/Claude Code to Cursor Grok/` or `Cursor Grok to Claude Code/` message per the usual thread convention, and log a one-liner in `thread.md`.
3. Bring the verdict to Mario before touching `ContactContent.tsx` — this decision changes the scope of the `docs/form-consent-notice.md` Part 2 implementation PRD.

## 7. Findings

**Populated 2026-07-20 from Perplexity research (Mario).** Full memo lives with Mario; summary below.

### Verdict
**(d) Keep both, but reword to eliminate overlap.** Checkboxes = affirmative consent act. Standing notice = disclosure/reference record (not a second "you agree" consent ask).

### Implemented (CG, 2026-07-20)
- Checkboxes in `ContactContent.tsx` left as-is (Checkbox 1 contact; Checkbox 2 SMS).
- Standing notice added below submit with the reworded disclosure copy (references checkboxes; no parallel "you agree").
- `/privacy` and `/terms` built from `docs/privacy-policy.md` + `docs/terms-of-service.md` so notice links resolve.
- `docs/form-consent-notice.md` Part 1 updated to match the shipped disclosure copy.
- Footer already linked both pages — no change needed.

### Twilio campaign registration language (for Mario)
> Users opt in via the contact form at catalyst-digital-solutions.com/contact. The form includes an unchecked checkbox specifically for SMS consent: "I also agree to receive text messages (SMS) at the number I provide." A disclosure notice below the submit button references this checkbox and lists the program name, STOP/HELP instructions, data rate disclosure, message frequency disclosure, and links to our Privacy Policy and Terms of Service. The SMS checkbox is only shown when a phone number is entered. Consent is not a condition of purchase.

**Note:** As of ship, Checkbox 2 remains always visible (optional until a phone number is entered). Hiding it until phone entry is a follow-up if Mario wants the live form to match the registration description literally.

### Caveats from research
- High confidence on A2P/CTIA pass with this structure.
- Moderate confidence on TCPA edge cases — Mario should have a TCPA-experienced attorney review final copy before campaign submission.
- Watch Twilio error **30913** (marketing vs informational consent must stay separate) — the reworded notice is designed to avoid collapsing those.
