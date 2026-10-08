import { ATARA_MARIO_MAILTO } from "@/lib/atara-links";
import type { OnboardingConfig } from "./types";

/**
 * Atara Mechanical — website-build onboarding (client #1).
 *
 * Ported from the approved Claude Design `onboarding-schema.js`, adjusted to the
 * WEBSITE-ONLY handoff:
 *  - Accounts & Access is GoDaddy (domain / DNS / current site) only.
 *  - Housecall Pro booking + financing links are pre-filled from Atara's public
 *    website instead of asked for (we already know them).
 *  - Mailing address removed (not needed to build the website).
 *  - No logo / wordmark / typography decisions (separate brand review).
 *
 * `internalNote` and `confidence` are Catalyst-only; they are stripped before
 * the config reaches the browser (see ./index.ts).
 */

const RES_YES = [
  "AC repair",
  "Heating / furnace repair",
  "HVAC repair",
  "AC / HVAC replacement",
  "HVAC installation",
  "Heat pumps",
  "Preventive maintenance / tune-ups",
  "Duct cleaning",
];
const RES_DISCUSS = [
  "Ductwork repair / replacement",
  "Ductless mini-splits",
  "Indoor air quality / filtration services",
  "Thermostat installation / controls",
  "Whole-house fans",
  "Attic insulation",
];
const COM_YES = [
  "Commercial HVAC repair",
  "Commercial HVAC installation / replacement",
  "Rooftop package units / RTUs",
  "Commercial preventive maintenance agreements",
  "Property manager / landlord HVAC work",
];
const COM_DISCUSS = [
  "Exhaust fans",
  "Commercial refrigeration",
  "Walk-in coolers / reach-ins",
  "Ice machines",
  "Chillers / large central systems",
  "New construction HVAC",
];

const PHOTO_ACCEPT = ".jpg,.jpeg,.png,.heic,.webp,.zip";

export const ataraOnboarding: OnboardingConfig = {
  slug: "atara",
  version: "2026-10-08.website-only.1",
  client: {
    shortName: "Atara",
    name: "Atara Mechanical",
    legalName: "Atara Mechanical, Inc.",
    contactFirstName: "Brittany",
    possessive: "Atara’s",
  },
  brand: {
    clientLogo: "/atara/atara-logo.webp",
    clientLogoAlt: "Atara Mechanical",
    agencyLogo: "/atara/catalyst-banner-white.svg",
    agencyLogoAlt: "Catalyst Digital Solutions",
    eyebrow: "Atara Mechanical × Catalyst Digital Solutions",
    pageTitle: "Onboarding · Atara Mechanical × Catalyst Digital Solutions",
  },
  intro: {
    headline: "Let’s get the details right.",
    body: "We’ve already filled in what we know about Atara from our meetings and research. Just confirm what’s correct, make any changes, and fill in the few things we still need.",
    reassurance: "You don’t need to finish everything at once. Your progress saves automatically.",
    smallNote: "Most of this should be confirmation, not homework.",
  },
  review: {
    confirmationText:
      "I confirm that the business information above is accurate to the best of my knowledge and Catalyst may use it when developing Atara’s website.",
  },
  support: {
    name: "Mario",
    email: ATARA_MARIO_MAILTO.replace(/^mailto:/, ""),
    label: "Questions? Contact Mario",
  },
  defaultAccept:
    ".pdf,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx,.txt,.rtf,.jpg,.jpeg,.png,.heic,.webp,.gif,.zip",
  sections: [
    {
      id: "company",
      short: "Company",
      title: "Company details",
      intro: "The basics customers and search engines will see.",
      fields: [
        { id: "business_name", type: "known", label: "Business name", value: "Atara Mechanical", source: "From your current website", confidence: "high", requiresClientConfirmation: true },
        { id: "legal_name", type: "known", label: "Legal business name", value: "Atara Mechanical, Inc.", source: "From your signed agreement", confidence: "high", requiresClientConfirmation: true },
        { id: "website", type: "known", label: "Public website", value: "ataramechanical.com", source: "From your current website", confidence: "high", requiresClientConfirmation: true },
        { id: "phone", type: "known", label: "Main phone", value: "(909) 471-1962", source: "From your website and Google listing", confidence: "high", requiresClientConfirmation: true },
        {
          id: "address",
          type: "known",
          label: "Business address",
          help: "Is this the address customers and search engines should treat as Atara’s current business location?",
          value: ["10722 Arrow Route, Suite 704", "Rancho Cucamonga, CA 91730"],
          source: "From your Google listing",
          confidence: "medium",
          requiresClientConfirmation: true,
        },
        {
          id: "other_locations",
          type: "textarea",
          optional: true,
          label: "Other current or historical business locations we should understand",
          help: "We’ve found a few other address references. Anything you list here stays internal — we never publish a private address.",
          rows: 3,
        },
        {
          id: "booking",
          type: "known",
          label: "Online booking & customer portal",
          intro: "Your current website sends customers to Housecall Pro to book and to manage their account. We plan to link the new website to the same pages.",
          value: [
            "Book online: book.housecallpro.com/book/Atara-Mechanical",
            "Customer portal: client.housecallpro.com/customer_portal",
          ],
          source: "From the Book Online and Customer Portal links on your website",
          question: "Should the new website keep using these Housecall Pro pages?",
          confirmLabel: "Yes, keep them",
          editLabel: "Update",
          confidence: "high",
          requiresClientConfirmation: true,
          internalNote:
            "Public URLs from ataramechanical.com (2026-10-08): https://book.housecallpro.com/book/Atara-Mechanical/270be2cb6ec24a028e0bc96aea918dcc?v2=true and https://client.housecallpro.com/customer_portal/request-link?token=4c8958ba11c94c8396d25c90bb87666e. No HCP admin/API access requested for V1.",
        },
      ],
    },
    {
      id: "story",
      short: "Story & Brand",
      title: "People, story & brand",
      intro: "Here’s what we’ve gathered about who you are and what Atara stands for. Confirm it, or add anything we missed.",
      fields: [
        { id: "owners", type: "known", label: "Owners", value: ["Brittany Lopez — President", "Omar Lopez — CFO"], source: "From the Contact Us page on your website", confidence: "high", requiresClientConfirmation: true },
        { id: "founded", type: "conflict", label: "What year should we publicly say Atara was founded?", note: "We have references to both 2018 and 2019 and want to use the version you consider accurate.", options: ["2018", "2019"], otherLabel: "A different year" },
        {
          id: "name_meaning",
          type: "known",
          prose: true,
          label: "The meaning behind “Atara”",
          panelLabel: "We have the story as",
          value: [
            "Atara comes from the Hebrew word “atarah,” literally meaning crown or wreath. Your current website also describes the name as “blessed or crown” and connects it to the reason Atara was opened — for His glory.",
            "Biblically, the imagery of a crown is also associated with honor, splendor, and glory.",
          ],
          source: "From your current website and our research",
          question: "Is this still how you want us to tell the meaning behind the name?",
          editLabel: "Edit / Add Context",
          confidence: "medium",
          requiresClientConfirmation: true,
        },
        {
          id: "origin",
          type: "known",
          prose: true,
          label: "How Atara started",
          panelLabel: "We have the story as",
          value: [
            "After years in HVAC, Omar became frustrated watching customers get taken advantage of or sold things they did not need. His upbringing made him particularly sensitive to protecting customers — including women and elderly homeowners — who may not know enough about HVAC to challenge a recommendation.",
            "After talking and praying together, Omar and Brittany felt called to build an HVAC company centered on honesty, trust and genuinely helping their community. Omar brought the HVAC experience; Brittany brought her customer-service and management background.",
          ],
          source: "From our meetings",
          question: "Is that still accurate? Anything important you want us to add?",
          editLabel: "Edit / Add Context",
          optional: true,
          confidence: "medium",
          requiresClientConfirmation: true,
        },
        { id: "h_faith", type: "heading", label: "Faith & the Atara lamb" },
        {
          id: "lamb_meaning",
          type: "known",
          prose: true,
          editMode: "append",
          label: "The Atara lamb",
          panelLabel: "We understand",
          value: ["The Atara lamb represents Jesus Christ — the Lamb of God — and His sacrifice so that mankind might be saved."],
          source: "From our meetings",
          question: "Is there anything else about why you and Omar chose the lamb, or what you hope it communicates about Atara?",
          questionHelp: "A sentence or two is plenty. Mario can build the website copy from the principles you give us, and he’ll ask directly if anything needs clarification.",
          editLabel: "Add Something",
          appendPlaceholder: "Why you chose the lamb, or what you hope it communicates…",
          confidence: "high",
          requiresClientConfirmation: true,
        },
        {
          id: "matthew",
          type: "known",
          prose: true,
          editMode: "append",
          label: "Matthew 6:33",
          quote: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
          quoteCite: "Matthew 6:33",
          panelLabel: "We understand the principle",
          value: ["Put God’s Kingdom and His righteousness first, and trust Him with the rest."],
          question: "What does Matthew 6:33 mean specifically to you and Omar in the way you operate Atara?",
          questionHelp: "A few words is enough — values, principles, or examples are perfect.",
          confirmLabel: "Looks Correct / Nothing to Add",
          editLabel: "Add Context",
          appendPlaceholder: "Values, principles, or examples…",
          confidence: "high",
          requiresClientConfirmation: true,
        },
        { id: "faith", type: "choice", label: "Is the Christian meaning / Lamb of God connection something you want stated directly on the website?", options: ["Yes — openly and directly", "Yes — but subtly", "Keep it mostly implicit", "Let’s discuss it"] },
        { id: "lamb_name", type: "choice", label: "Does the lamb have an official name?", options: [{ label: "Yes", followup: "The lamb’s name" }, "No", "Not yet"] },
        { id: "h_brand", type: "heading", label: "Brand personality" },
        { id: "brand_personality", type: "textarea", optional: true, label: "How would you describe Atara’s personality?", help: "A few words is plenty — how you want Atara to come across to customers.", rows: 3 },
        { id: "brand_nonneg", type: "textarea", optional: true, label: "Are there any brand elements you consider non-negotiable?", help: "Anything about the name, the lamb, colors, or how Atara presents itself that should never change.", rows: 3 },
        { id: "n_assets", type: "note", tone: "info", label: "We already have Atara’s current brand assets", body: "We’ll use them as reference while developing the next round of branding concepts. Logo and wordmark options will be reviewed separately so we can walk you through the different directions and the thinking behind them." },
      ],
    },
    {
      id: "services",
      short: "Services",
      title: "Services",
      intro: "We’ll only promote the services you confirm. Every selection stays editable — choose Explain to add a note to any service.",
      prefillNote: "We’ve already marked the 13 services we know Atara provides. Everything else is set to Discuss.",
      fields: [
        { id: "svc_res", type: "triage", label: "Residential / general HVAC", items: [...RES_YES, ...RES_DISCUSS], preset: { Yes: RES_YES, Discuss: RES_DISCUSS } },
        {
          id: "svc_com",
          type: "triage",
          label: "Commercial",
          items: [...COM_YES, ...COM_DISCUSS],
          preset: { Yes: COM_YES, Discuss: COM_DISCUSS },
          otherLabel: "Anything we missed?",
          otherPlaceholder: "Any service we haven’t listed, or anything Mario should understand…",
        },
        { id: "svc_hidden", type: "textarea", optional: true, label: "Are there any services you offer but do NOT want us promoting?", help: "Leave blank if there aren’t any.", rows: 3 },
      ],
    },
    {
      id: "maintenance",
      short: "Maintenance",
      title: "Maintenance programs",
      intro: "Here’s what we understood from our meeting. Confirm it, and upload the plan documents if you have them.",
      fields: [
        { id: "plan_res", type: "known", label: "Residential maintenance plan", intro: "We understand that Atara currently offers a residential maintenance plan.", value: ["Monthly option: $22.50 per unit", "Two maintenance visits per year", "Repair discount", "Reduced service fee", "Priority / faster turnaround"], source: "From our kickoff meeting", confidence: "medium", requiresClientConfirmation: true },
        { id: "plan_res_annual", type: "text", optional: true, label: "Annual price of the residential plan", help: "We only have the monthly price. Skip this if it’s in the document you upload.", placeholder: "Annual price" },
        { id: "plan_res_doc", type: "upload", optional: true, label: "Current residential maintenance-plan document", help: "Please upload it if you have it." },
        { id: "plan_com", type: "known", label: "Commercial maintenance", intro: "We understand Atara also offers commercial maintenance with quarterly service visits and multiple payment options.", value: ["Quarterly service visits", "Multiple payment options"], source: "From our kickoff meeting", confidence: "medium", requiresClientConfirmation: true },
        { id: "plan_com_doc", type: "upload", optional: true, label: "Current commercial maintenance agreement / pricing document" },
      ],
    },
    {
      id: "policies",
      short: "Policies",
      title: "Warranties, financing & offers",
      intro: "We won’t publish any terms or prices you haven’t confirmed here.",
      fields: [
        { id: "warranty", type: "known", prose: true, label: "Workmanship warranty", panelLabel: "Your current website says", value: ["Atara provides a 10-year workmanship warranty on new full-system installations."], source: "From your current website", question: "Is that still correct?", confirmLabel: "Yes", editLabel: "No / Update", confidence: "high", requiresClientConfirmation: true },
        { id: "mfr_warranty", type: "choice", label: "Do different equipment brands or manufacturers have different warranty terms?", options: [{ label: "Yes", followup: "Briefly, how do they differ?", followType: "textarea" }, "No", "Not sure"] },
        {
          id: "financing",
          type: "known",
          label: "Financing options",
          panelLabel: "Your current website offers",
          value: [
            "Wisetack — $500 to $25,000 · wisetack.us/#/de25bh0/prequalify",
            "Synchrony Bank — $500 to $100,000 · synchrony.com/mmc/hq214266900",
          ],
          source: "From the Apply for Financing page on your website",
          question: "Should the new website keep offering these two financing options, using the same application links?",
          confirmLabel: "Yes, keep both",
          editLabel: "Update",
          confidence: "high",
          requiresClientConfirmation: true,
          internalNote:
            "Public links from ataramechanical.com/apply-for-financing (2026-10-08): https://wisetack.us/#/de25bh0/prequalify and https://www.synchrony.com/mmc/hq214266900?sitecode=ac0lpi0e1&awqr=1s01daonf414f. Site also lists APR/term ranges — do not republish rates/terms unless Brittany confirms. No financing-account access requested.",
        },
        { id: "fin_docs", type: "upload", optional: true, label: "Customer-facing financing terms or documentation" },
        { id: "promos", type: "textarea", optional: true, label: "Are there any promotions or standing offers we should know about?", rows: 3 },
        { id: "second_opinion", type: "choice", label: "Do you want to formally launch the proposed Atara Second Opinion offer on the website?", options: [{ label: "Yes", followup: "What should customers pay for the Second Opinion / diagnostic?", placeholder: "Amount" }, "Not yet", "Let’s discuss it"] },
      ],
    },
    {
      id: "area",
      short: "Service Area",
      title: "Hours, service area & operations",
      intro: "When you’re open, and where you want calls coming from.",
      fields: [
        { id: "hours", type: "known", label: "Normal business hours", value: ["Monday–Friday: 8:00 AM–6:00 PM", "Saturday: 8:00 AM–4:00 PM"], source: "From your current website", question: "Are these the hours customers should see? We’ll show Sunday as closed unless you tell us otherwise.", confidence: "high", requiresClientConfirmation: true },
        { id: "availability", type: "triage", label: "Do you provide:", options: ["Yes", "No"], items: ["Same-day service when available", "After-hours service", "Emergency service", "24/7 service"], help: "We won’t mention after-hours, emergency, or 24/7 service unless you confirm it here." },
        { id: "h_area", type: "heading", label: "Service area" },
        { id: "primary_market", type: "known", label: "Primary market", value: "Rancho Cucamonga", source: "From our meetings", confidence: "high", requiresClientConfirmation: true },
        { id: "expansion_market", type: "known", label: "Confirmed expansion market", help: "A dedicated Newport Beach website presence to support the traffic your estimator and marketing campaigns are generating.", value: "Newport Beach / coastal Orange County", source: "From our conversation with Brittany", confidence: "high", requiresClientConfirmation: true },
        { id: "call_today", type: "multi", label: "Which locations do you actively want customers calling from today?", options: ["Rancho Cucamonga", "Newport Beach", "Newport Coast", "Laguna", "Elsewhere in Orange County"], defaults: ["Rancho Cucamonga", "Newport Beach"], detailLabel: "Other areas", detailPlaceholder: "Cities or neighborhoods" },
        { id: "serve_quiet", type: "textarea", optional: true, label: "Which areas will you serve but do not want actively marketed?", rows: 2 },
        { id: "avoid", type: "textarea", optional: true, label: "Which areas should we avoid generating leads from?", rows: 2 },
        { id: "oc_rules", type: "multi", label: "Are there special rules for Orange County jobs?", help: "Select any that apply.", options: ["Replacement / install only", "Minimum job size", "Selected days only", "No restrictions", "Other"], detailLabel: "Details", detailPlaceholder: "Minimum job size, which days, or anything else we should know" },
      ],
    },
    {
      id: "commercial",
      short: "Commercial",
      title: "Commercial HVAC",
      intro: "Help us aim the commercial pages at the work you actually want.",
      fields: [
        { id: "com_fit", type: "multi", label: "Which types of commercial customers are your best fit?", options: ["Property managers", "Landlords", "Retail", "Office", "Medical / dental", "Restaurants", "Churches", "Warehouses / light industrial", "HOAs / multifamily"], detailLabel: "Other", detailPlaceholder: "Other customer types" },
        { id: "com_avoid", type: "textarea", optional: true, label: "Are there types of commercial work you do NOT want?", rows: 3 },
        { id: "com_names", type: "choice", label: "Can Catalyst publicly identify any existing commercial customers?", options: ["Yes", "No", "Ask individually"] },
        { id: "com_terms", type: "triage", label: "Do commercial customers have standard:", options: ["Yes", "No", "Varies"], items: ["Payment terms", "Response expectations", "Maintenance agreement terms"], otherLabel: "If yes, a short summary helps" },
        { id: "com_media", type: "upload", optional: true, label: "Commercial photos & documents", help: "Commercial job photos, RTU photos, maintenance examples, condition reports, case studies." },
      ],
    },
    {
      id: "credentials",
      short: "Credentials",
      title: "Trust, licenses & credentials",
      intro: "We only publish credentials you confirm here.",
      fields: [
        {
          id: "cslb",
          type: "known",
          label: "Contractor license",
          value: ["Atara Mechanical Inc.", "California CSLB #1126598", "Status: Active"],
          source: "From the CSLB license lookup",
          question: "We have #1126598 as the active license that should appear on the new website and public profiles.",
          confirmLabel: "Correct",
          editLabel: "Update",
          details: { label: "Additional details", body: "We also found license #1054087, issued under Atara’s former sole-ownership structure. It’s expired, so we won’t use it on the new website or any public profile." },
          internalNote: "Catalyst verified former sole-ownership license #1054087 as expired via CSLB. Never publish it; replace any public references with #1126598.",
          confidence: "high",
          requiresClientConfirmation: true,
        },
        { id: "creds", type: "triage", label: "Please confirm:", options: ["Yes", "No", "Not sure"], items: ["BBB accreditation", "Insurance", "Bonding", "EPA certifications", "Manufacturer certifications", "Dealer status"], otherLabel: "Other credentials" },
        { id: "commission", type: "known", prose: true, label: "No-commission policy", value: ["Atara technicians do not earn commission for diagnosing or servicing customer equipment. This is part of Atara’s low-pressure / repair-first philosophy."], source: "From your current website and our meetings", question: "Is this still accurate?", confirmLabel: "Yes — still accurate", editLabel: "Update this", confidence: "high", requiresClientConfirmation: true },
        { id: "cred_docs", type: "upload", optional: true, label: "Certificates or credential documents" },
      ],
    },
    {
      id: "media",
      short: "Media",
      title: "Reviews, photos & permissions",
      intro: "Permissions for reviews and customer stories, plus the photos that will make the site feel like Atara.",
      fields: [
        { id: "quote_reviews", type: "choice", label: "May we quote existing public reviews on the website using first name + last initial?", options: ["Yes", "No", "Ask case-by-case"] },
        { id: "contact_customers", type: "choice", label: "May Catalyst contact selected customers for permission to feature their story?", options: ["Yes", "No", "Ask me first"] },
        { id: "n_photos", type: "note", tone: "info", label: "We strongly prefer real Atara photos for the production website." },
        { id: "photos_people", type: "upload", optional: true, label: "Omar, Brittany & the team", accept: PHOTO_ACCEPT },
        { id: "photos_fleet", type: "upload", optional: true, label: "Service vans & the office / shop", accept: PHOTO_ACCEPT },
        { id: "photos_jobs", type: "upload", optional: true, label: "Residential & commercial jobs", help: "Installations, maintenance work, RTUs, and any other useful field photography.", accept: ".jpg,.jpeg,.png,.heic,.webp,.mov,.mp4,.zip" },
      ],
    },
    {
      id: "access",
      short: "Domain Access",
      title: "Website & domain access",
      intro: "For the website build, the only account we need is the one that controls ataramechanical.com.",
      fields: [
        {
          id: "accounts",
          type: "access",
          label: "Website & domain account",
          help: "Tell us where it stands. If it needs an invitation, we’ll send simple step-by-step instructions.",
          accessItems: [
            {
              id: "godaddy",
              name: "GoDaddy",
              desc: "Domain (ataramechanical.com), DNS, and your current website",
              note: "Used for launch: pointing the domain to the new site, redirects from old pages, and domain verification.",
            },
          ],
        },
        {
          id: "n_secure",
          type: "note",
          tone: "secure",
          label: "No passwords in this form",
          body: "GoDaddy lets you invite Catalyst as a delegate, so you won’t need to share a password. If anything else turns out to be needed for the website, we’ll ask you directly.",
        },
      ],
    },
    {
      id: "files",
      short: "Files",
      title: "Files we would love to have",
      intro: "If you’re not sure whether we need something, send it. We’ll sort it out.",
      fields: [
        {
          id: "files_all",
          type: "upload",
          optional: true,
          label: "Upload anything useful",
          categories: ["Maintenance-plan documents", "Financing documents", "Warranty documentation", "Service / pricing sheets", "Commercial agreements", "Job photos", "Team / fleet photos", "Company story / history", "Other useful documents"],
        },
      ],
    },
  ],
};
