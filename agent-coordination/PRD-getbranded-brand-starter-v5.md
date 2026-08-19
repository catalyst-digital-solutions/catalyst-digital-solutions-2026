# BUILD SPEC — getbranded.catalyst-digital-solutions.com → v5 "Brand Starter"

**Owner:** Mario Garza, Catalyst Digital Solutions, LLC
**Date:** 2026-08-19
**Target:** Existing Next.js landing page at `getbranded.catalyst-digital-solutions.com`
**Executor:** Claude Code / Cursor (implementation) + Stripe MCP (products & links)
**Status:** Approved. Build as written. No open decisions.

---

## 0. WHY THIS REVISION EXISTS (read before touching code)

The page currently asks a cold trades owner to wire **$2,000** to a stranger. Nobody does that. The offer is being restructured around a **$500 Brand Starter** — a small, low-risk, *completed purchase* that delivers real owned assets and a live preview of the prospect's own website. The remaining $3,500 is closed by Mario in person or on a video call, not on this page.

**Two mode changes that affect every decision below:**

1. **This page is no longer a self-serve sales page. It is a pitch deck Mario walks people through.** It must still work unattended, but sequencing is now optimized for a guided scroll: proof first, price last.
2. **The full $4,000 price must not appear above the package section.** Anchor the page on $500. Reveal $4,000 only after the proof and the value table.

**Governing copy principle (non-negotiable):** sell the destination, not the vehicle. Every deliverable list must be preceded by a line about what changes in the owner's business.

---

## 1. SCOPE

### In scope
- Header/nav changes
- Hero rewrite
- Section 2 rewrite ("three quotes")
- New section: "What $500 Gets You"
- Package/pricing section rewrite + repositioning of the $4,000 reveal
- Scarcity section rewrite
- FAQ additions and rewrites
- Chatbot disambiguation copy (site-wide)
- Stripe: new $500 product/link; retire $2,000 and $4,000 links from the page
- New `/start` post-checkout intake page
- Meta/OG copy updates

### Explicitly NOT in scope — do not touch
- **The existing visual design system of this page.** This subdomain uses the Super J / trades palette (deep blue, red, white), *not* the CDS purple brand system. Do **not** repaint it in `#8000ff`. The CDS webpage-builder skill's palette applies to the main site, not here.
- Super J imagery, the identity system sheet, mascot poses, van wrap render, flatlay, OG image — all stay as-is.
- The five demo site cards (Apex, Holloway, Monolith, Voltaic, Meridian) — stay as-is.
- Site performance/architecture. This is a copy + flow revision.

---

## 2. GLOBAL CHANGES

### 2.1 Audience line
Change all instances of `For HVAC, Refrigeration & Plumbing Owners` to:

> **For Plumbing Company Owners**

*(Implementation note: expose this string as a single constant `AUDIENCE_LINE` in one config file so it can be widened to "For Plumbing & HVAC Owners" without a code hunt.)*

### 2.2 Banned words on this page
`deposit` — remove every instance. The $500 is a **purchase**, not a deposit. Replace with "Brand Starter," "to start," or "$500."

Rationale: "deposit" implies refundability and invites Stripe chargebacks. A completed purchase of delivered goods is defensible.

### 2.3 Meta / OG
- `title`: `The $500 Brand Starter — Catalyst Digital Solutions`
- `meta-description`: `See your plumbing company's new logo, business cards, and a working website preview for $500. Keep the logo either way. Bakersfield, CA.`
- `og:title`: `Be the one they call first.`
- `og:description`: `$500 to see your new logo, cards, and a working preview of your website. Keep the logo either way.`
- Keep `noindex, nofollow`. Keep existing OG image.

---

## 3. SECTION-BY-SECTION SPEC

### 3.1 HEADER (revise)

**Remove:** the `Pay $2,000 deposit` button.

**Final header:**
- Left: Catalyst logo (links to main site)
- Right: `Call or text (661) 888-4837` (prominent — trades owners call, don't fill forms) · `[Book a 20-Minute Call]` (primary button style)

Phone must remain visible and tappable on mobile at all breakpoints.

---

### 3.2 HERO (rewrite)

**Purpose:** Establish envy + a reason-why, then present a $500 entry price that is an easy yes. No $4,000 anywhere in this fold.

**Eyebrow:** `For Plumbing Company Owners`

**H1 (unchanged — locked):**
> **Be the one they call first.**

**Subhead:**
> Your biggest competitor didn't get sharp vans and a slick website by luck. They paid an agency a fortune. We'll build you the same thing for a fraction of what they paid.

**Entry-offer line (new — visually distinct, boxed or rule-separated, ~20–22px, this is the most important sentence in the fold):**
> **$500 to see your company's new look** — logo, business card design, and a working preview of your website. **Keep the logo and card design either way.**

**CTAs (in this order):**
1. `Start My Brand — $500 →` → Stripe $500 link (primary)
2. `Book a 20-Minute Call →` → `https://cal.com/catalystdigitalsolutions/20min` (secondary)
3. `See the Whole Package` → anchor `#the-package` (text link)

**Trust strip (replaces current "30 days to launch / $2,000 down / You own everything"):**
> ◷ Your preview is live in 7 business days · ◈ Logo files are yours to keep · ◆ Only 5 builds at a time

**Scarcity badge:** `5 of 5 available` — retained, same placement.

---

### 3.3 SECTION 2 — THE HOOK (rewrite, replaces "When a customer spends 10 seconds comparing you…")

**Purpose:** This is the emotional hinge of the page — the "hole." It is currently the weakest high-value section on the page. Layout shape: large type-led, minimal, high contrast, no imagery competing with it.

**H2:**
> **Three quotes. One phone. Ten seconds.**

**Body (large, ~22–26px, centered):**
> A homeowner with water coming through the ceiling doesn't call the cheapest name on the list. He calls the one that looks like a real company.
>
> **Right now — is that you?**

**Sub-line (muted):**
> Same license. Same trucks. Same work. The one that *looks* bigger gets the call, and gets to charge more for it.

No CTA in this section. Let it land, then roll into proof.

---

### 3.4 SUPER J PROOF BLOCK (retain — one framing addition)

Keep the entire existing block: intro copy, identity system sheet, social headers, avatar guidelines, mascot poses, shield mark, van wrap, flatlay, OG preview, live-site link.

**Add one line** directly under the "Meet Super J" intro paragraph, in muted small text:

> Super J is a refrigeration company. Yours will be built for plumbing — your services, your colors, your name. Nothing here gets reused.

**Revise the existing website sub-block copy** to disambiguate the chatbot (see §3.7):

> ### And the website.
> Loads fast. Looks right on a phone, a tablet, or a laptop. Built to get found on Google and in AI answers. And a chat assistant on the site that answers customer questions and takes booking requests while you're under a sink at 9pm.

---

### 3.5 NEW SECTION — "WHAT $500 GETS YOU"

**Placement:** Immediately after the Super J proof block, before the five demo-site cards.
**Layout shape:** Two-column on desktop — left = the deliverables list, right = a single large visual (use the Super J flatlay or identity sheet as the anchor image). Must contrast structurally with the type-led Section 2 above it and the card grid below it.

**Eyebrow:** `Start Here`

**H2:**
> **$500. Seven days. Your company, done right.**

**Lead-in (this is the destination line — must appear BEFORE the list):**
> You don't have to imagine it. In seven business days you'll be looking at your own logo, your own business cards, your own van, your own sign, and a real website with your name on it — live on the internet. Then you decide.

**Deliverables list (checkmarks, exactly this order and wording):**

- **Your logo, done properly** — primary, stacked, horizontal, reversed, and one-color versions. Adobe Illustrator files. **Yours to keep, forever.**
- **Your business card design** — up to 5 people on your crew.
- **Your colors and fonts**, locked in and documented.
- **Mockups so you can see it for real:** your van, your shirts, your hats, your social media pages, and your storefront sign. *Send me a photo of your shop and I'll put your new sign on it.*
- **Optional mascot concept** — if you want a character, you'll see one.
- **A live preview of your website homepage.** Real. Working. On the internet. With your name on it.

**The guarantee box (visually distinct — bordered card, highest-contrast element in this section):**
> **Walk away and you still keep the logo.**
> If you decide not to go forward, that's fine — no pressure, no hard feelings. The logo files and business card design are yours. The website preview comes down.

**Timing line:**
> Your preview goes live **within 7 business days** of your start date.

**CTA:**
1. `Start My Brand — $500 →` (primary, Stripe link)
2. `Questions first? Book a 20-Minute Call →` (secondary)

**Micro-copy under CTAs:**
> No card is saved. Nothing bills automatically. The $500 is credited in full toward your build if you go forward.

---

### 3.6 DESIGN RANGE / FIVE DEMOS (retain as-is)

No copy changes. Keep the existing "We can design anything" framing and all five demo cards.

---

### 3.7 THE PACKAGE — $4,000 REVEAL (rewrite)

**Placement:** unchanged (`#the-package`), but this is now the **first** appearance of the $4,000 figure anywhere on the page. Verify no earlier instance survives.

**Eyebrow:** `The Full Build`

**H2:**
> **$29K – $76K of work. Your price: $4,000.**

**Lead-in (destination before deliverables):**
> Six months from now, a homeowner Googles a plumber in your town, and you're the one who looks like the established company. That's what this buys.

**Retain** the existing `⊕ Where did we get these numbers?` depth trigger and its contents.

**Three-column deliverable grid — retain structure, revise the Website column:**

**Your Brand**
- ✓ Logo, lockups, color palette, typography
- ✓ Optional custom mascot / character
- ✓ Embroidery + print-ready files, yours to keep
- ✓ Business card design, up to 5 people

**Your Assets**
- ✓ Vehicle wrap design file, print-ready for your wrap shop
- ✓ Social avatars & headers, every platform
- ✓ Google Business Profile imagery
- ✓ Storefront signage design

**Your Website**
- ✓ 10-page custom site, built for you — not a template
- ✓ On-page SEO built in
- ✓ **Website chat assistant** — answers customer questions and takes booking requests on your site, 24/7

**CHATBOT DISAMBIGUATION — mandatory, place directly under the Website column as fine print:**
> This is the **chat assistant on your website** — the little chat window a customer types into. It is not a phone answering service. An AI that answers your actual phone is part of our monthly marketing programs and is not included here.

**Price block:**
> **Complete Brand + Website Package**
> **$4,000**
>
> **$500 to start → $3,500 to finish.**
> We'll go over how you'd like to handle the $3,500 when we meet.
>
> You own everything on final payment.
>
> `5 of 5 available`
> After these 5, the price is $6,000.

**DO NOT** display "$1,750 / $1,750," "at kickoff," or any payment-split language on this page. Those options are disclosed by Mario in the meeting only.

**Care plan block (rewrite — currently reads like a gotcha):**
> **After launch: $149/mo**
> Keeps your site online, secure, backed up, and updated — and keeps the chat assistant running and answering. Starts the day your site goes live. Cancel anytime.

**CTAs for this section:**
1. `Start My Brand — $500 →` (primary)
2. `Book a 20-Minute Call →` (secondary)

**Remove:** `Pay $4,000 in full` button. Remove `Pay $2,000 deposit` button. There is exactly one payment button on this page and it is the $500.

---

### 3.8 SCARCITY SECTION (rewrite)

The current claim ("5 of 5 available") needs a stated *reason why* to survive scrutiny, and the reason is now genuinely true — Mario's fulfillment capacity is the constraint.

**H2:**
> **Only 5 at this price.**

**Body:**
> I do this work myself. I can carry five brand builds at a time and still do them right, so that's the number.

**Ladder (retain existing two-card structure):**
- **First 5 Companies — $4,000** · `5 of 5 available`
- **Next 5 Companies — $6,000`

**Fine print:**
> Ten builds total in this run. The $500 start is the same either way.

**Footer line (retain):**
> Only 10 packages available in this promotion. After it ends, it is unlikely to return.

**⚠️ MAINTENANCE REQUIREMENT — flag to Mario, not a code task:** the counter must decrement when a build is sold. A static "5 of 5" three weeks from now is credibility damage. Implement the count as a single config constant `SLOTS_REMAINING` so it's a one-line edit.

---

### 3.9 CLOSING COMPARISON SECTION (retain, revise CTA)

Keep: *"Look at Super J one more time. Then look at your own website. If the difference bothers you, let's talk."*

CTAs become: `Start My Brand — $500 →` · `Book a 20-Minute Call →` · phone number.

---

### 3.10 FAQ (revise + add)

**Retain and update these existing entries:** "So what's the catch?", "Who actually does the work?", "What if I already have a logo?", "Do I own everything?", "Is the website really custom?", "Is the counter on this page real?", "What happens after they're all gone?"

**Rewrite "What happens after I pay?":**
> You'll get a short form asking for your logo (if you have one), a photo of your shop, a photo of a truck, your services, and the towns you cover. Then you'll book a time to sit down with me. Within 7 business days you'll see your logo, your cards, your mockups, and a live preview of your website — and we go through it together.

**Rewrite "What if I don't like it?":**
> Then we're done, and there's no hard feelings. You keep the logo files and the business card design — they're yours, you paid for them. The website preview comes down. You're out $500 and you own a professional logo, which is less than most shops charge for a logo alone.

**NEW — "What exactly does the AI chat assistant do?":**
> It's the chat window on your website. A customer types a question — *do you do water heaters, do you come out to Oildale, how much for a drain* — and it answers using your services and your service area. It can also take a booking request and send it straight to you. **It does not answer your phone.** An AI that picks up your actual phone calls is a separate service in our monthly programs.

**NEW — "Is the $500 a deposit?":**
> No. It's a purchase. You're buying your logo package and a preview. If you go forward with the full build, the $500 comes off the top — the total is still $4,000, not $4,500. If you don't go forward, you keep what you bought.

**NEW — "Do we have to meet in person?":**
> If you're in or around Bakersfield, I'd rather come to you — it's easier to look at this stuff on a real screen together. If you're further out, we'll do a video call and I'll share my screen. Either way you're looking at your own brand, not a slideshow.

**NEW — "How fast is this?":**
> Preview in 7 business days from your start date. Full brand and 10-page website, about 30 days from the day we kick off.

---

## 4. STRIPE REQUIREMENTS

**Account:** live mode, `acct_1NLscDHtCGFFusaf`

### 4.1 Create
| Product | Price | Purpose | On page? |
|---|---|---|---|
| **Brand Starter** | $500 one-time | Hero + all page CTAs | ✅ Yes — the only payment button |
| **Brand Build — Balance** | $3,500 one-time | Mario texts/emails at close | ❌ No |
| **Brand Build — Half Balance** | $1,750 one-time | Two-payment option, used twice | ❌ No |

All three links must exist and be saved before the first call. Mario must be able to text a payment link across a kitchen table without leaving to "send an invoice."

### 4.2 Brand Starter link configuration
- Product name shown at checkout: **Brand Starter — Logo + Preview**
- Description: `Logo package (all variations, Illustrator files), business card design, brand mockups, and a live website preview. Yours to keep. Credited in full toward the full build.`
- **Collect customer name, email, and phone** (phone is required — Mario calls, he doesn't email)
- **Terms of service consent required** ⚠️ *This checkbox must be enabled manually in Stripe Dashboard → Settings → Checkout and Payment Links. It is not reliably settable via API alone.*
- Custom field (text, required): **Company Name**
- Custom field (text, required): **City**
- Success URL: `https://getbranded.catalyst-digital-solutions.com/start?session_id={CHECKOUT_SESSION_ID}`
- No `setup_future_usage`. No saved card. No subscription. Nothing recurring.

### 4.3 Retire
Remove the existing $2,000 and $4,000 links from all page markup. Do not delete them in Stripe (preserves payment history); just unlink them from the page.

---

## 5. NEW PAGE — `/start` (post-checkout)

**Purpose:** Capture the assets needed to build, and — critically — **book the reveal meeting immediately, before any work is done.** A start that isn't booked goes cold.

**Structure, in this order:**

1. **Confirmation:** `You're in. Let's build your brand.`
   Sub: `Two quick things and I'll get started today.`

2. **Step 1 — Intake form** (single page, all fields visible, no multi-step wizard):
   - Company name *(prefilled from Stripe)*
   - Your name *(prefilled)*
   - Cell number *(prefilled)*
   - Email *(prefilled)*
   - City + towns you cover
   - Services you offer (free text)
   - **Upload:** your current logo, if you have one *(optional)*
   - **Upload:** a photo of your shop or storefront *(optional — "if you send one, I'll put your new sign on it")*
   - **Upload:** a photo of a truck or van *(optional)*
   - Do you want a mascot/character? *(Yes / No / Show me both)*
   - Colors you like or want to avoid *(free text, optional)*
   - Two competitors whose look you'd like to beat *(free text, optional)*

   Store to Supabase. Notify Mario by SMS on submit.

3. **Step 2 — Book your reveal** (embedded Cal.com, `catalystdigitalsolutions/20min`):
   > **Pick a time to see it.** Your preview will be live before we meet.

4. **Fallback line:** `Rather just talk? Call or text me at (661) 888-4837.`

**Design note:** the uploads are doing psychological work, not just operational work. Every photo the owner sends increases his investment in the outcome. Keep them prominent and easy on mobile — camera-roll upload, not drag-and-drop.

---

## 6. TERMS PAGE UPDATE (`/trades/terms`)

Add a Brand Starter schedule. Must state plainly:
- The $500 is a purchase of a completed deliverable set, not a refundable deposit.
- What is delivered: logo package (all listed variations, .ai + .svg + .png), business card design, brand mockups, and a temporary hosted website preview.
- Preview hosting is temporary and is removed if the client does not proceed.
- Client owns the logo files and card design on payment. Mockups are for viewing.
- The $500 is credited in full against the $4,000 (or $6,000) total.
- Delivery target: 7 business days from receipt of a completed intake form.
- Website chat assistant ≠ phone answering AI. Explicit.
- $149/mo care plan begins at site launch, is separate, and is cancelable.

---

## 7. ACCEPTANCE CHECKLIST

- [ ] Zero instances of the word "deposit" on the page
- [ ] Zero instances of "$4,000," "$2,000," or "$6,000" above the package section
- [ ] Exactly one payment button on the page, and it is $500
- [ ] No payment-split language ($1,750 / $3,500 at kickoff) anywhere on the page
- [ ] Header has no pay button; phone number visible on mobile
- [ ] "Three quotes. One phone. Ten seconds." section replaces the old comparison hook
- [ ] "What $500 Gets You" section exists, with the walk-away guarantee box
- [ ] Every deliverable list is preceded by an outcome sentence
- [ ] Chatbot disambiguation appears in both the package section and the FAQ
- [ ] Audience line is a single swappable constant
- [ ] `SLOTS_REMAINING` is a single config constant
- [ ] Stripe: $500, $3,500, and $1,750 links all created; ToS checkbox verified manually in Dashboard
- [ ] `/start` page live, form writes to Supabase, SMS notification fires, Cal.com embedded
- [ ] Terms page includes the Brand Starter schedule
- [ ] Page reads top-to-bottom in under 60 seconds on a phone
- [ ] Existing Super J visual system untouched — no CDS purple introduced

---

## 8. OPERATIONAL PREREQUISITES (Mario — not the coding agent)

These must exist **before** the first $500 clears, or the offer's economics break:

1. **Reusable mockup template file** — one Illustrator/Figma document where dropping in a single logo updates van, shirt, cap, cards, signage, and social grid. Build once. Target: 30 minutes per client afterward.
2. **Website preview = re-skin, not a build.** Use an existing demo (Apex / Holloway / Monolith / Voltaic / Meridian) or the Can-Do Crew reference, swap name/colors/logo/services/city/photos. Target: 90 minutes.
3. **Preview subdomain pattern locked:** `[company].catalyst-demos.com`, deployed on Vercel, with a 14-day teardown reminder if the client doesn't proceed.
4. **Hard cap: 5 open Brand Starters at a time.** This is both the fulfillment limit and the honest basis for the scarcity claim.
5. **Local DIDs** in RingCentral matching target area codes before the next dial session.

**Target per starter after templates: ~4 hours.** If it's running over 6, the templates aren't done — stop taking starters and finish them.

---

*End of spec. Build as written.*
