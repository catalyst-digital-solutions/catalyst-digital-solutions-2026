# Claude Code Handoff — Catalyst Digital Solutions Website (Results Version)

**Run this in a fresh Claude Code session (Sonnet).** You have autonomy (`--dangerously-skip-permissions`). Work through the phases in order. **Phase goal for today: a clean, on-brand homepage LIVE on the domain.** Everything after that is bonus.

---

## 0. Mission & the one rule

Build and deploy Catalyst Digital Solutions' new "results-oriented" marketing site. **Today's win = homepage live at catalyst-digital-solutions.com, on-brand, responsive, credible.** Do not gold-plate. Ship the homepage and deploy *before* polishing subpages. If you're running long, deploy what works and stub the rest — a live credible homepage beats a perfect unfinished one.

**Positioning (non-negotiable):** Catalyst is a *revenue-growth company* for construction firms, not "a marketing agency." Every headline sells the **destination** (more jobs, revenue, profit, time off the tools), never the vehicle (websites, SEO, "AI"). Niche: construction GCs / design-build firms, ~$5M+ revenue.

---

## 1. Context

- This is the canonical, **results-oriented** version of the site. An older `catalyst-website-2026-rive-version` repo exists but drifted feature-heavy — ignore it for this build (it's a parts-bin to harvest from later, not the source of truth).
- This is a **greenfield build in a new repo.** Nothing to migrate.
- The visual design lives in Claude Design. **Mario will give you screenshots/export of the designed homepage as your layout reference** (see §4). Match that layout; this prompt supplies the canonical copy, brand tokens, and architecture.

---

## 2. Repo & stack setup (Phase 1)

Create a new repo named **`catalyst-digital-solutions-2026`**.

```bash
npx create-next-app@latest catalyst-digital-solutions-2026 \
  --typescript --tailwind --app --eslint --src-dir --import-alias "@/*"
cd catalyst-digital-solutions-2026
npm i gsap @studio-freight/lenis framer-motion
```

- **Next.js (App Router), TypeScript strict, Tailwind CSS v4, Vercel target.** (Match the stack Mario already uses.)
- GSAP + ScrollTrigger for scroll reveals/counters; Lenis for smooth scroll (wrap in a `LenisProvider` client component in the root layout); Framer Motion optional.
- Add a `README.md` stating this repo is the **canonical Catalyst site (results version)**, to end version confusion.
- Initialize git, push to a new GitHub repo, connect to Vercel early (deploy a hello-world first so the pipeline is proven before content lands).

---

## 3. Brand system — apply exactly (dark "Iceberg" theme)

Put these in `globals.css` as CSS custom properties. **No hardcoded hex in components — reference tokens only.**

```css
:root {
  /* Purples */
  --cds-purple:        #8000ff;  /* primary: CTAs, depth triggers, brand moments, gradient start */
  --cds-purple-2:      #5600ab;  /* gradient end, hovers, borders */
  --cds-purple-light:  #b56bff;  /* accent headline words, trigger hover */
  /* Accents */
  --cds-cyan:          #00d4ff;  /* eyebrows, tech/wireframe visuals, data highlights, grid lines */
  --cds-green:         #80ff80;  /* sparingly: positive badges, small confirmations */
  /* Neutrals (dark is default) */
  --cds-bg-dark:       #080b0f;  /* primary background */
  --cds-bg-light:      #f8f8f8;  /* rare light sections only */
  --cds-heading:       #fafafa;  /* headings on dark */
  --cds-body:          #c8c8c8;  /* body text on dark */
  --cds-muted:         #7f8896;  /* secondary/fine print, eyebrow gray */
}
```

- **Signature gradient:** `linear-gradient(135deg, #8000ff, #5600ab)` for primary buttons, brand accents.
- **Glow:** primary buttons `box-shadow: 0 10px 34px rgba(128,0,255,.4)`; ambient blurred purple blobs `radial-gradient(circle, rgba(128,0,255,.22), transparent 64%)`; faint cyan grid `rgba(0,212,255,.05–.07)` at 54px, radial-fade masked.
- **Type:** `--font-display: 'Bebas Neue'` (H1/H2 hero ONLY — uppercase, letter-spacing ~1–2px, line-height .88–.92, scale `clamp(54px,6.6vw,118px)` for H1); `--font-body: 'Inter'` (everything else, 400–700); `--font-mono: 'JetBrains Mono'` (eyebrows/labels — ~13px, letter-spacing 3px, uppercase, usually cyan).
- **Buttons:** primary = gradient fill, white text, `padding:16px 30px`, `border-radius:11px`, glow. Secondary = `rgba(255,255,255,.04)` bg, `1px solid rgba(255,255,255,.18)`, radius 11px.
- **Cards:** `background:rgba(255,255,255,.025)`, `1px solid rgba(255,255,255,.09)`, `border-radius:16px`, `padding:30px 28px`. Featured card = purple-tinted bg + `1px solid rgba(128,0,255,.45)` + `0 0 40px rgba(128,0,255,.12)` glow.
- **Iceberg model:** plain, outcome-led surface copy that stands alone, with optional purple **`⊕ What's this?`** triggers that expand an inline panel (2px left border `#8000ff`, ~0.42s max-height transition). Never gate surface meaning behind a trigger.
- **Motion:** tasteful scroll reveals, animated counters, subtle parallax. Always respect `prefers-reduced-motion`.

---

## 4. What Mario provides to this session

1. **Claude Design homepage screenshots (and/or export)** — your *visual layout reference*. Build to match these layouts. Use this prompt for copy/tokens/architecture, the screenshots for spatial layout. Do **not** import Claude Design's raw HTML/CSS — rebuild as clean React components on the tokens above.
2. **AI-generated image assets** (hero visuals, dashboard mockup, demo browser-frame screenshots of Apex & Holloway). Place in `/public/assets/`. All AI-generated — no licensing concerns.
3. **`website-copy-text-only.md`** — drop into repo root. Use its **Pricing Page, Contact Page, FAQ, and Footer** sections **verbatim**. (NOTE: that file's *homepage hero* is outdated — use the hero in §6 below, not the one in that file.)

If an asset or screenshot is missing for a section, build the structure on-brand with a labeled placeholder and keep moving — do not block.

---

## 5. Build order (strict priority)

1. Repo + stack + Vercel pipeline (Phase 1).
2. Nav + Footer + global styles/tokens.
3. **Homepage, top to bottom (§6–§7).**
4. **Deploy + point the domain (§10). ← today's finish line.**
5. Pricing page (§8, from copy file).
6. Contact page (§9, from copy file).
7. About / Services / How-It-Works: light stub pages so nav doesn't 404 (a hero + one section + CTA each is fine for now; "How It Works" can reuse the 90-Day Roadmap content).

---

## 6. Homepage sections (canonical copy)

Single page, sections in this order. CTAs appear **after Section 3, after Section 5, and in the Final CTA only** (don't pepper CTAs everywhere). Eyebrows are JetBrains Mono, uppercase, cyan.

**Header (sticky, glassmorphic ~0.61 opacity):** CATALYST wordmark (PNG, ~150px). Nav: Home · About · Services ▾ · Pricing · Contact. Click-to-call **(661) 535-9927**. Primary CTA button: **"Get a Free Audit."**

**S1 — Hero.**
- Eyebrow: `CONSTRUCTION-FOCUSED DIGITAL AGENCY`
- H1 (Bebas), with the last word rotating/animated: **"We don't do 'marketing.' We do more _jobs / revenue / profit_."**
- Subhead: "That's what you hire Catalyst for: a fatter bottom line. We handle the digital side so you stay focused on building."
- CTAs: **Get a Free Audit** (primary) · **See How It Works** (secondary)
- Trust row: `No long-term contracts` · `Construction-only niche` · `Results in 90 days`
- Visual (right side, per Claude Design layout): a "Live Dashboard Preview" card — *Leads Generated This Month: 247 · Avg. Response Time: <4 min · Bids Won Rate: +34%.*

**S2 — The Reality Right Now.**
- H2: "While You're Managing Crews, Your Competitors Are Taking Your Work"
- Body: "Construction owners are the last people who should have to worry about marketing. But the jobsite doesn't stop — and neither does the internet. Every day you're not showing up online is a day a competitor is winning the bid you never knew existed."
- Three stat points: `3 in 5 contractors lose qualified leads to competitors with a stronger online presence.` · `$147,000+ average annual revenue lost by contractors missing after-hours inquiries.` · `68% of RFPs are won by the first contractor to respond — not the most qualified one.`
- Kicker: "What if your marketing worked as hard as you do?"

**S3 — 90 Days From Now.** (This is the dark/purple 3-card section already designed.)
- Eyebrow: `90 DAYS FROM NOW`
- H2: "Here's What Changes When Catalyst Goes to Work"
- Card 1 — **Your Phone Doesn't Stop:** "Qualified leads call you directly — pre-warmed by your content, your reviews, and your AI voice agent that never misses a call. You show up before competitors even know the job exists." Badge: *3x more inbound calls — avg. across Tier 2 clients.*
- Card 2 — **Your Estimator Bids, Not Hunts:** "Our Construction RFP AI monitors thousands of public bid sources 24/7 and delivers every relevant opportunity to your inbox. No more hours lost searching government portals." Badge: *15+ hours saved per week on RFP discovery.*
- Card 3 — **Your Name Is Everywhere They Look:** "AI-generated content published daily across YouTube, Instagram, TikTok, and LinkedIn. Programmatic SEO ranking you for hundreds of location + service keyword combinations. You become the obvious choice." Badge: *200+ pieces of content published monthly.*
- → CTA after this section.

**S4 — The 90-Day Roadmap.**
- H2: "From Invisible to Inevitable" — subhead: "Your time commitment: about 12 hours over the first 3 months. We handle the rest."
- 4 phases (numbered/timeline): **Foundation (Wk 1–2)** "We Build Your Digital Infrastructure" — *your time: 3 hrs.* · **Ignition (Wk 3–6)** "Content Engine Goes Live" — *2 hrs.* · **Momentum (Wk 7–10)** "Rankings Climb. Leads Arrive." — *1 monthly call, 30 min.* · **Domination (Wk 12+)** "You Are the Market Leader" — *review monthly report.* (Full body text for each is in `website-copy-text-only.md` → "The 90-Day Roadmap".)

**S5 — Tiers teaser.**
- H2: "Choose How Fast You Want to Dominate" — sub: "Every tier includes a custom-built website, foundational SEO, and monthly reporting. The question is how aggressively you want to grow."
- Three cards, **Growth Engine is the featured/decoy-anchored card** ("Most Popular"): **Launchpad $1,497/mo** — "Get found. Look professional." · **Growth Engine $2,997/mo ⭐** — "Become the contractor they call first." · **Domination $7,997/mo** — "The obvious choice in every market you enter." (Card details from copy file; link each to the Pricing page.)
- → CTA after this section.

**S6 — Proof section.** See §7 (this is the new Apex + Holloway section).

**S7 — Client Results.**
- H2: "What Happens When Construction Companies Stop Guessing"
- Two testimonial cards (real clients — use verbatim from `website-copy-text-only.md` → "Client Results"): **Scott Baxter, Freedom Engineering Inc.** (badges: +40% bids submitted Q1 · 3 projects won from RFP AI · ROI in first 90 days) and **Evert Calderon, Mesa Group Consulting** (badges: Full website + SEO · AI content pipeline live · Digital Operations Hub deployed).
- Industry stat strip: `55% of construction tech investment in 2025 went to AI` · `67% higher enterprise valuations for digitally transformed firms` · `35–42% productivity improvement from automation` · `$1.14M revenue uplift per tech tool per $100M GC`.

**S8 — Final CTA.**
- H2: "Stop Losing Bids to Contractors with Better Marketing"
- Body: "Book a free 15-minute call. We'll run a live AI audit of your current digital presence, show you exactly where you're leaving money on the table, and recommend the tier that fits your revenue and growth goals. No pressure. No pitch deck. Just the numbers."
- CTAs: **Get My Free AI Audit** · **View Pricing.** Fine print: "Response within 1 business day. No spam. Cancel anytime."

**Footer:** from `website-copy-text-only.md` → Footer (phone, email hello@catalyst-digital-solutions.com, Bakersfield CA, Services + Company columns, © 2026).

---

## 7. The Proof section — build DATA-DRIVEN (§6 / S6)

This section showcases live demo sites and **must scale by adding array entries, not by redesigning.** Drive it from a `demos` array.

**Copy (left column):**
- Eyebrow (cyan): `PROOF WE CAN`
- H1 (Bebas, white): **"WE'D RATHER PROVE IT THAN PROMISE IT."**
- Body: "We're not going to show you a wall of five-star reviews. We'd rather show you what we can do for your company. Right now." / "Want proof we can build sites that win work? Here are two. Real, live websites built for contractors. Fast, professional, built to bring in jobs. That's our mission."
- Label above buttons: "See ones we built"
- One button per demo (label + arrow), styled in **that demo's own accent color** (data-driven, NOT a Catalyst brand color).
- Iceberg trigger: **`⊕ Why show instead of tell?`** → inline panel explaining the demonstration-over-endorsement philosophy.

**Visual (right column):** the demos' browser-frame screenshots, overlapping/stacked, each **clickable → opens the live demo in a new tab.**

**Data model:**
```ts
type Demo = {
  name: string;          // button label
  company: string;       // full name shown on frame
  niche: string;
  accentColor: string;   // the DEMO's brand color, used for its button
  screenshot: string;    // /public/assets/...
  liveUrl: string;
};

const demos: Demo[] = [
  { name: "Apex Construction", company: "Apex Design-Build",
    niche: "Commercial Design-Build / GC", accentColor: "#E0A02B", /* gold */
    screenshot: "/assets/demo-apex.png", liveUrl: "https://construction1.catalyst-demos.com" },
  { name: "Holloway General Contractors", company: "Holloway Construction Group",
    niche: "Employee-Owned Commercial GC", accentColor: "#C8102E", /* red */
    screenshot: "/assets/demo-holloway.png", liveUrl: "https://construction2.catalyst-demos.com" },
];
```
Adding demo #3 (Ironbridge, flooring, etc.) = one array entry. No layout edits.

---

## 8. Pricing page (`/pricing`)

Build from `website-copy-text-only.md` → "Pricing Page" **verbatim**: hero ("Transparent Pricing. Measurable Results."), the full 3-tier comparison table (all feature categories), the "Why Most Clients Choose Growth Engine" decoy block, the **Construction RFP AI $497/mo** standalone block, and the FAQ accordion. Growth Engine is the visually featured tier. On-brand tokens throughout.

---

## 9. Contact page (`/contact`)

Build from `website-copy-text-only.md` → "Contact Page": heading "Let's Talk About Your Pipeline", the full form (Full Name, Company, Trade/Specialty dropdown, Current Monthly Revenue dropdown, Website URL, Biggest Digital Challenge, How did you hear about us), success message, contact info block, and the "after you submit" 3-step. **Stub the form submit for now** (validate + show success state; no backend wiring today).

---

## 10. Deploy + domain — TODAY'S FINISH LINE

1. Push to GitHub, deploy to **Vercel** (production).
2. In Vercel → Project → Domains, add **`catalyst-digital-solutions.com`** (and `www`).
3. At **Namecheap** DNS for the domain, add the records Vercel shows (typically an `A` record `@ → 76.76.21.21` and `CNAME` `www → cname.vercel-dns.com` — use whatever Vercel's dashboard specifies). Mario manages Namecheap DNS and has done this before for email; he can add these.
4. Verify HTTPS resolves and the homepage loads on the live domain. **That's the win.**

*Safety net if the build runs long:* deploy the static Claude Design homepage export to Vercel on the domain to hold the spot, and swap in the Next.js build when ready.

---

## 11. Guardrails

- **No invented stats or claims.** Use only the copy provided. The numbers in §6/§7 are Mario's chosen claims — render as written, don't embellish.
- **Outcome-first, plain language** (a busy contractor reads on a phone in 10 seconds). No agency jargon.
- **Accessibility:** semantic landmarks, alt text on all images, visible focus states, AA contrast (add scrims behind text over photos), keyboard-accessible nav/carousels.
- **Responsive, mobile-first:** 375 / 768 / 1280 / 1920. Bebas headlines scale down cleanly; cards stack.
- `prefers-reduced-motion` respected everywhere.
- Reference brand tokens only — zero hardcoded hex outside `globals.css`.

---

## 12. "Live today" acceptance check

- [ ] New `catalyst-digital-solutions-2026` repo on GitHub, connected to Vercel.
- [ ] Homepage built S1–S8 on the dark Iceberg brand, matching the Claude Design layout.
- [ ] Proof section is data-driven (Apex + Holloway from a `demos` array; clickable frames; per-demo accent buttons).
- [ ] Nav + footer present; nav links don't 404 (real or stub pages).
- [ ] **catalyst-digital-solutions.com resolves over HTTPS to the live homepage.**
- [ ] Mobile + desktop both clean; reduced-motion respected.
- [ ] (Bonus) Pricing + Contact pages built from the copy file.
