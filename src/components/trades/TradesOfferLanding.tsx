"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type PointerEvent, type ReactNode } from "react";
import {
  AUDIENCE_LINE,
  CAL_URL,
  EMAIL,
  getSlotState,
  MAIN_SITE_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  SUPER_J_IS_LIVE,
  SUPER_J_URL,
} from "@/config/slots";
import { decorateUrlWithUtms } from "@/components/AnalyticsProvider";
import { BRAND_STARTER_LINK, getOfferCheckout } from "@/config/payment-links";

const ASSET = "/assets/trades";

const gText: CSSProperties = {
  background: "linear-gradient(90deg,#b56bff,#00d4ff)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  fontWeight: 700,
};

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "So what's the catch?",
    a: (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <p style={{ margin: 0 }}>
          No catch. Here&apos;s why we can offer all this at such a low price.
        </p>
        <div>
          <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, letterSpacing: 2, color: "#7f8896" }}>
            01
          </div>
          <div style={{ fontWeight: 700, color: "#fafafa", marginTop: 4 }}>There&apos;s no agency between us.</div>
          <p style={{ margin: "6px 0 0" }}>
            No salespeople. No account managers. No huge office lease. Most national agencies charge premium prices and
            outsource overseas. When you call Catalyst, you talk to the guy building it.
          </p>
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, letterSpacing: 2, color: "#7f8896" }}>
            02
          </div>
          <div style={{ fontWeight: 700, color: "#fafafa", marginTop: 4 }}>We build faster than we used to.</div>
          <p style={{ margin: "6px 0 0" }}>
            The tools changed. What took a design team six weeks takes us days. We chose to pass that on, instead of
            pocketing the extra profit on these. Same quality, less time, lower price.
          </p>
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, letterSpacing: 2, color: "#7f8896" }}>
            03
          </div>
          <div style={{ fontWeight: 700, color: "#fafafa", marginTop: 4 }}>We want the work in our portfolio.</div>
          <p style={{ margin: "6px 0 0" }}>
            We&apos;re new to the trades. Ten great brands out there doing well is worth more to us than the extra money.
            That&apos;s why there&apos;s a limit, and that&apos;s why the first five are cheaper.
          </p>
        </div>
        <p style={{ margin: 0 }}>
          After the first five, it&apos;s $6,000. That&apos;s not a sales trick. We just can&apos;t do this many at this
          price twice.
        </p>
      </div>
    ),
  },
  {
    q: "What happens after I pay?",
    a: "You'll get a short form asking for your logo (if you have one), a photo of your shop, a photo of a truck, your services, and the towns you cover. Then you'll book a time to sit down with me. Within 7 business days you'll see your logo, your cards, your mockups, and a live preview of your website — and we go through it together.",
  },
  {
    q: "Who actually does the work?",
    a: "We do. Same people, start to finish. Nothing gets shipped overseas.",
  },
  {
    q: "What if I already have a logo?",
    a: "If it's working, we keep it and build everything around it. If it's not, we'll tell you straight. That conversation is free.",
  },
  {
    q: "Do I own everything?",
    a: "Yes, on final payment. Vector files, source files, all of it. In writing.",
  },
  {
    q: "What if I don't like it?",
    a: "Then we're done, and there's no hard feelings. You keep the logo files and the business card design — they're yours, you paid for them. The website preview comes down. You're out $500 and you own a professional logo, which is less than most shops charge for a logo alone.",
  },
  {
    q: "Is the website really custom?",
    a: "Built in Next.js and React from scratch — not WordPress, not Wix, not a template with your logo dropped in. There's a reason the biggest brands on the web use Next.js and React — Nike, Netflix, and Uber all run on it. It's fast, secure, and built to grow. Your site runs on the same technology, sized for your company.",
  },
  {
    q: "What exactly does the AI chat assistant do?",
    a: "It's the chat window on your website. A customer types a question — do you do water heaters, do you come out to Oildale, how much for a drain — and it answers using your services and your service area. It can also take a booking request and send it straight to you. It does not answer your phone. An AI that picks up your actual phone calls is a separate service in our monthly programs.",
  },
  {
    q: "Is the $500 a deposit?",
    a: "No. It's a purchase. You're buying your logo package and a preview. If you go forward with the full build, the $500 comes off the top — the total is still $4,000, not $4,500. If you don't go forward, you keep what you bought.",
  },
  {
    q: "Do we have to meet in person?",
    a: "If you're in or around Bakersfield, I'd rather come to you — it's easier to look at this stuff on a real screen together. If you're further out, we'll do a video call and I'll share my screen. Either way you're looking at your own brand, not a slideshow.",
  },
  {
    q: "How fast is this?",
    a: "Preview in 7 business days from your start date. Full brand and 10-page website, about 30 days from the day we kick off.",
  },
  {
    q: "Is the counter on this page real?",
    a: "Yes. It's updated every time someone buys. Bookmark the page and keep an eye on it!",
  },
  {
    q: "What happens after they're all gone?",
    a: "We're truly not sure. This is likely to be a one-time promotion. We can't afford to keep offering huge packages like this at such a great price. Get in while you can!",
  },
];

const BRAND_ITEMS = [
  "Logo, lockups, color palette, typography",
  "Optional custom mascot / character",
  "Embroidery + print-ready files, yours to keep",
  "Business card design, up to 5 people",
];

const ASSET_ITEMS = [
  "Vehicle wrap design file, print-ready for your wrap shop",
  "Social avatars & headers, every platform",
  "Google Business Profile imagery",
  "Storefront signage design",
];

const SITE_ITEMS = [
  "10-page custom site, built for you — not a template",
  "On-page SEO built in",
  "Website chat assistant — answers customer questions and takes booking requests on your site, 24/7",
];

const CHATBOT_NOTE =
  "This is the chat assistant on your website — the little chat window a customer types into. It is not a phone answering service. An AI that answers your actual phone is part of our monthly marketing programs and is not included here.";

const STARTER_ITEMS: { title: string; body: ReactNode }[] = [
  {
    title: "Your logo, done properly",
    body: (
      <>
        primary, stacked, horizontal, reversed, and one-color versions. Adobe Illustrator files.{" "}
        <strong style={{ color: "#fafafa" }}>Yours to keep, forever.</strong>
      </>
    ),
  },
  {
    title: "Your business card design",
    body: "up to 5 people on your crew.",
  },
  {
    title: "Your colors and fonts",
    body: "locked in and documented.",
  },
  {
    title: "Mockups so you can see it for real",
    body: (
      <>
        your van, your shirts, your hats, your social media pages, and your storefront sign.{" "}
        <em>Send me a photo of your shop and I&apos;ll put your new sign on it.</em>
      </>
    ),
  },
  {
    title: "Optional mascot concept",
    body: "if you want a character, you'll see one.",
  },
  {
    title: "A live preview of your website homepage.",
    body: "Real. Working. On the internet. With your name on it.",
  },
];

const VALUE_ROWS = [
  { item: "Brand strategy + logo suite", cost: "$6,000 – $15,000" },
  { item: "Custom mascot / character illustration", cost: "$2,500 – $8,000" },
  { item: "Full asset kit (social, embroidery, OG, guidelines)", cost: "$2,000 – $5,000" },
  { item: "Vehicle wrap design", cost: "$1,000 – $2,500" },
  { item: "Custom 10-page website (not a template)", cost: "$12,000 – $30,000" },
  { item: "On-page SEO build-out", cost: "$2,500 – $6,000" },
  { item: "AI chatbot build + training", cost: "$3,000 – $10,000" },
] as const;

const DEMOS = [
  { label: "APEX", src: `${ASSET}/01-apex.jpg`, href: "https://construction1.catalyst-demos.com" },
  { label: "HOLLOWAY", src: `${ASSET}/02-holloway.jpg`, href: "https://construction2.catalyst-demos.com" },
  { label: "MONOLITH", src: `${ASSET}/03-monolith.jpg`, href: "https://construction3.catalyst-demos.com" },
  { label: "VOLTAIC", src: `${ASSET}/04-voltaic.jpeg`, href: "https://construction4.catalyst-demos.com" },
  { label: "MERIDIAN", src: `${ASSET}/05-meridian.jpg`, href: "https://construction5.catalyst-demos.com" },
] as const;

const MARK_SLIDES = [
  {
    src: `${ASSET}/j-shield-emblem-social_transparent-bg.png`,
    alt: "Super J shield mark on a transparent background — navy shield with white J and red trim",
  },
  {
    src: `${ASSET}/j-shield-emblem-social_rounded-rect-app.png`,
    alt: "Super J shield mark as a rounded-rectangle app icon",
  },
  {
    src: `${ASSET}/j-shield-emblem-social_circle.png`,
    alt: "Super J shield mark as a circular social avatar",
  },
  {
    src: `${ASSET}/j-shield-emblem-white-bg.webp`,
    alt: "Super J shield mark on a white background",
  },
  {
    src: `${ASSET}/j-shield-emblem-white-black-bg.webp`,
    alt: "Super J white shield mark on a black square background",
  },
] as const;

type GalleryImage = {
  kind?: "image";
  src: string;
  alt: string;
  caption: string;
  disclaimer?: string;
  bg: string;
  imgStyle?: CSSProperties;
};

type GalleryCarousel = {
  kind: "carousel";
  slides: typeof MARK_SLIDES;
  caption: string;
  bg: string;
};

type GalleryPoses = {
  kind: "poses";
  poses: { src: string; alt: string }[];
  caption: string;
  bg: string;
};

const GALLERY: (GalleryImage | GalleryCarousel | GalleryPoses)[] = [
  {
    src: `${ASSET}/super-j-brand-identity-system-v2.jpg`,
    alt: "Super J brand identity system sheet: primary stacked lockup, compact horizontal lockup, one-color dark, and reversed versions with the full core palette",
    caption: "The Identity System — four lockups, one-color, reversed, full palette",
    bg: "#fdfdfd",
  },
  {
    src: `${ASSET}/super-j-social-header-system.png`,
    alt: "Super J coordinated social header system for Facebook, LinkedIn, and X — matching deep blue banners with the mascot and shield lockup",
    caption: "Social Headers — Facebook, LinkedIn, X, all matching",
    bg: "#12161c",
  },
  {
    src: `${ASSET}/super-j-social-avatar-guidelines-v2.webp`,
    alt: "Super J avatar guidelines: shield avatar shown on Google Business Profile, Facebook, Instagram, LinkedIn, and X at sizes from 512px down to a 32px favicon",
    caption: "Avatars — every platform, every size, sharp",
    bg: "#12161c",
  },
  {
    kind: "poses",
    poses: [
      {
        src: `${ASSET}/mascot-thumbs-up.jpeg`,
        alt: "Super J mascot giving a thumbs up — navy and white suit with caped shoulders",
      },
      {
        src: `${ASSET}/mascot-arms-crossed.jpeg`,
        alt: "Super J mascot standing with arms crossed — confident technician pose",
      },
      {
        src: `${ASSET}/super-j-pointing-pose.png`,
        alt: "Super J mascot in a presenting pose — pointing forward in a navy and white suit with a J chest emblem",
      },
    ],
    caption: "The Character — multiple poses for ads, trucks, and print",
    bg: "#fdfdfd",
  },
  {
    kind: "carousel",
    slides: MARK_SLIDES,
    caption: "The Mark — works at 32px on a phone or 32 inches on a truck",
    bg: "#fdfdfd",
  },
  {
    src: `${ASSET}/van-wrap-front.jpeg`,
    alt: "Super J vehicle wrap design shown on a Sprinter van — front driver side with the mascot, lockup, and phone number",
    caption: "Vehicle Wrap File: one print-ready van/truck/car design file for your wrap shop to install",
    bg: "#12161c",
  },
  {
    src: `${ASSET}/super-j-flatlay-v2.jpg`,
    alt: "Super J brand flatlay: embroidered cap and polo, business cards, sticker, and phone showing the Instagram profile",
    caption: "Your files: embroidery- and screen-print-compatible files for any shop",
    disclaimer: "Files-only — no collaterals provided in package",
    bg: "#12161c",
  },
  {
    src: `${ASSET}/super-j-opengraph-image.png`,
    alt: "Super J Open Graph link-preview image: 'Commercial refrigeration first' headline beside the shield badge on a blue burst",
    caption: "Link Previews — looks professional when someone shares your site via text.",
    bg: "#12161c",
  },
];

function MarkCarousel({
  slides,
  bg,
}: {
  slides: typeof MARK_SLIDES;
  bg: string;
}) {
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const pointerStartX = useRef<number | null>(null);
  const pointerDeltaX = useRef(0);
  const count = slides.length;

  useEffect(() => {
    if (!autoplay) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 3200);
    return () => window.clearInterval(id);
  }, [autoplay, count]);

  const stopAutoplay = () => setAutoplay(false);

  const go = (next: number) => {
    stopAutoplay();
    setIndex((next + count) % count);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    // Only swipe from the image surface — never capture over controls
    pointerStartX.current = e.clientX;
    pointerDeltaX.current = 0;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current == null) return;
    pointerDeltaX.current = e.clientX - pointerStartX.current;
  };

  const onPointerUp = () => {
    if (pointerStartX.current == null) return;
    const dx = pointerDeltaX.current;
    pointerStartX.current = null;
    pointerDeltaX.current = 0;
    if (Math.abs(dx) < 40) return;
    stopAutoplay();
    if (dx < 0) setIndex((i) => (i + 1) % count);
    else setIndex((i) => (i - 1 + count) % count);
  };

  const slide = slides[index];

  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,.14)",
        background: bg,
        borderRadius: 8,
        padding: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          minHeight: "clamp(220px,42vw,420px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "grab",
          touchAction: "pan-y",
          userSelect: "none",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          width={900}
          height={900}
          draggable={false}
          style={{
            display: "block",
            width: "44%",
            maxWidth: 420,
            height: "auto",
            borderRadius: 3,
            pointerEvents: "none",
          }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button
          type="button"
          aria-label="Previous mark"
          onClick={(e) => {
            e.stopPropagation();
            go(index - 1);
          }}
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "1px solid rgba(8,11,15,.18)",
            background: "#fff",
            color: "#080b0f",
            cursor: "pointer",
            fontSize: 18,
            lineHeight: 1,
          }}
        >
          ‹
        </button>
        <div style={{ display: "flex", gap: 8 }}>
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Show mark ${i + 1}`}
              aria-current={i === index}
              onClick={(e) => {
                e.stopPropagation();
                go(i);
              }}
              style={{
                width: i === index ? 22 : 8,
                height: 8,
                borderRadius: 999,
                border: "none",
                padding: 0,
                cursor: "pointer",
                background: i === index ? "#8000ff" : "rgba(8,11,15,.22)",
                transition: "width .2s ease, background .2s ease",
              }}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next mark"
          onClick={(e) => {
            e.stopPropagation();
            go(index + 1);
          }}
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "1px solid rgba(8,11,15,.18)",
            background: "#fff",
            color: "#080b0f",
            cursor: "pointer",
            fontSize: 18,
            lineHeight: 1,
          }}
        >
          ›
        </button>
      </div>
    </div>
  );
}

function SlotDots({
  dots,
  size,
}: {
  dots: { available: boolean }[];
  size: number;
}) {
  return (
    <div style={{ display: "flex", gap: size >= 15 ? 9 : size >= 12 ? 7 : 6 }}>
      {dots.map((d, i) => (
        <span
          key={i}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            display: "inline-block",
            background: d.available ? "#22c55e" : "rgba(128,0,255,.35)",
            boxShadow: d.available ? "0 0 12px rgba(34,197,94,.55)" : "none",
          }}
        />
      ))}
    </div>
  );
}

const primaryCta: CSSProperties = {
  background: "linear-gradient(135deg,#8000ff,#5600ab)",
  boxShadow: "0 10px 34px rgba(128,0,255,.4)",
  borderRadius: 11,
  color: "#fafafa",
  fontWeight: 600,
  fontSize: 17,
  padding: "17px 30px",
  display: "inline-block",
  textDecoration: "none",
};

const secondaryCta: CSSProperties = {
  border: "1px solid rgba(255,255,255,.22)",
  borderRadius: 11,
  color: "#fafafa",
  fontWeight: 600,
  fontSize: 16,
  padding: "16px 26px",
  display: "inline-block",
  textDecoration: "none",
};

function BrandStarterCta({
  compact = false,
  label,
}: {
  compact?: boolean;
  label?: string;
}) {
  const pad = compact ? { fontSize: 14, padding: "12px 18px" } : {};
  return (
    <a href={BRAND_STARTER_LINK} style={{ ...primaryCta, ...pad }}>
      {label ?? (compact ? "Start My Brand — $500" : "Start My Brand — $500 →")}
    </a>
  );
}

export default function TradesOfferLanding() {
  const slots = getSlotState();
  const checkout = getOfferCheckout();
  const [openFaq, setOpenFaq] = useState(-1);
  const [numbersOpen, setNumbersOpen] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Carry first-touch UTMs through to Cal.com and Stripe
  useEffect(() => {
    document
      .querySelectorAll<HTMLAnchorElement>('a[href^="https://cal.com/"], a[href^="https://buy.stripe.com/"]')
      .forEach((a) => {
        a.href = decorateUrlWithUtms(a.href);
      });
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const scrollToPackage = (e: MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("the-package");
    if (!target) return;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 20,
      behavior: "smooth",
    });
  };

  const microCounter = slots.booked
    ? "Booked out"
    : `${slots.remaining} of 5 left`;

  return (
    <div
      className={`trades-page${stickyVisible ? " trades-page--sticky" : ""}`}
      style={{
        fontFamily: "var(--font-body), Inter, sans-serif",
        background: "#080b0f",
        color: "#c8c8c8",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "18px clamp(20px,5vw,64px)",
          borderBottom: "1px solid rgba(255,255,255,.07)",
        }}
      >
        <a href={MAIN_SITE_URL} style={{ display: "inline-block", lineHeight: 0 }}>
          <Image
            src={`${ASSET}/catalyst-logo.png`}
            alt="Catalyst Digital Solutions"
            width={200}
            height={44}
            priority
            style={{ display: "block", height: 44, width: "auto" }}
          />
        </a>
        <div className="trades-header-actions" style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <a
            className="trades-header-phone"
            href={`tel:${PHONE_TEL}`}
            style={{ color: "#c8c8c8", fontSize: 15, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}
          >
            <span style={{ color: "#7f8896", fontWeight: 500 }}>Call or text</span> {PHONE_DISPLAY}
          </a>
          <div className="trades-header-cta" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...primaryCta,
                fontSize: 15,
                padding: "12px 22px",
              }}
            >
              Book a 20-Minute Call
            </a>
          </div>
        </div>
      </header>

      {/* SECTION 1 — HERO */}
      <section
        ref={heroRef}
        data-screen-label="Hero"
        className="trades-hero anim-fadeup"
        style={{
          display: "grid",
          gridTemplateColumns: "55fr 45fr",
          gap: "clamp(32px,4vw,64px)",
          alignItems: "center",
          padding: "clamp(56px,7vw,110px) clamp(20px,5vw,64px)",
          maxWidth: 1360,
          margin: "0 auto",
        }}
      >
        <div className="trades-hero-copy" style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
              fontSize: 13,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#00d4ff",
            }}
          >
            {AUDIENCE_LINE}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display), 'Bebas Neue', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(54px,6.6vw,118px)",
              lineHeight: 0.9,
              letterSpacing: 1,
              color: "#fafafa",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Be the one they call first.
          </h1>
          <p
            style={{
              fontSize: "clamp(18px,1.5vw,21px)",
              lineHeight: 1.55,
              color: "#c8c8c8",
              maxWidth: 560,
              margin: 0,
            }}
          >
            Your biggest competitor didn&apos;t get sharp vans and a slick website by luck. They paid an agency a
            fortune. We&apos;ll build you the same thing for a fraction of what they paid.
          </p>
          <div
            style={{
              border: "1px solid rgba(181,107,255,.45)",
              background: "rgba(128,0,255,.08)",
              borderRadius: 12,
              padding: "16px 20px",
              fontSize: "clamp(18px,1.6vw,22px)",
              lineHeight: 1.45,
              color: "#fafafa",
              maxWidth: 560,
            }}
          >
            <strong>$500 to see your company&apos;s new look</strong> — logo, business card design, and a working
            preview of your website. <strong>Keep the logo and card design either way.</strong>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
            {checkout ? <BrandStarterCta /> : null}
            <a href={CAL_URL} target="_blank" rel="noopener noreferrer" style={secondaryCta}>
              Book a 20-Minute Call →
            </a>
            <a
              href="#the-package"
              onClick={scrollToPackage}
              style={{ color: "#c8c8c8", fontSize: 16, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 4 }}
            >
              See the Whole Package
            </a>
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              border: "1px solid rgba(255,255,255,.12)",
              borderRadius: 999,
              padding: "9px 18px",
              alignSelf: "flex-start",
              background: "rgba(255,255,255,.025)",
            }}
          >
            <SlotDots dots={slots.dots} size={9} />
            <span
              style={{
                fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                fontSize: 13,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#fafafa",
              }}
            >
              {slots.counterText}
            </span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 24px", color: "#7f8896", fontSize: 14 }}>
            <span>◷ Your preview is live in 7 business days</span>
            <span>◈ Logo files are yours to keep</span>
            <span>◆ Only 5 builds at a time</span>
          </div>
        </div>
        <div className="trades-hero-visual">
          <div
            className="trades-hero-frame"
            style={{
              border: "1px solid rgba(255,255,255,.14)",
              background: "#12161c",
              borderRadius: 10,
              padding: 14,
              transform: "rotate(2deg)",
              boxShadow: "0 24px 60px rgba(0,0,0,.5)",
            }}
          >
            <Image
              src={`${ASSET}/super-j-opengraph-image.png`}
              alt="Super J Refrigeration & HVAC brand lockup — superhero mascot shield badge on a deep blue burst"
              width={1200}
              height={630}
              priority
              style={{ display: "block", width: "100%", height: "auto", borderRadius: 4 }}
            />
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#7f8896",
              textAlign: "center",
              marginTop: 14,
            }}
          >
            Delivered work · Super J Refrigeration &amp; HVAC
          </div>
        </div>
      </section>

      {/* SECTION 3 — THE MIRROR */}
      <section
        data-screen-label="The Mirror"
        style={{
          padding: "clamp(72px,10vw,140px) clamp(20px,5vw,64px)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 30,
          alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,.07)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display), 'Bebas Neue', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(42px,5.4vw,86px)",
            lineHeight: 0.9,
            letterSpacing: 1,
            color: "#fafafa",
            margin: 0,
            maxWidth: 900,
            textTransform: "uppercase",
          }}
        >
          Three quotes. One phone. Ten seconds.
        </h2>
        <p
          style={{
            maxWidth: 820,
            fontSize: "clamp(20px,2.2vw,26px)",
            fontWeight: 600,
            lineHeight: 1.4,
            color: "#fafafa",
            margin: 0,
          }}
        >
          A homeowner with water coming through the ceiling doesn&apos;t call the cheapest name on the list. He calls
          the one that looks like a real company.
        </p>
        <p
          style={{
            maxWidth: 720,
            fontSize: "clamp(22px,2.4vw,34px)",
            fontWeight: 700,
            lineHeight: 1.3,
            color: "#fafafa",
            margin: 0,
          }}
        >
          Right now — is that you?
        </p>
        <p style={{ maxWidth: 640, fontSize: 16, lineHeight: 1.6, color: "#7f8896", margin: 0 }}>
          Same license. Same trucks. Same work. The one that <em>looks</em> bigger gets the call, and gets to charge
          more for it.
        </p>
      </section>

      {/* SECTION 4 — THE PROOF */}
      <section
        data-screen-label="The Proof — Super J"
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "clamp(56px,7vw,100px) clamp(20px,5vw,64px)",
          display: "flex",
          flexDirection: "column",
          gap: 36,
          borderTop: "1px solid rgba(255,255,255,.07)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 820 }}>
          <div
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
              fontSize: 13,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#00d4ff",
            }}
          >
            Meet Super J
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display), 'Bebas Neue', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(42px,5.4vw,86px)",
              lineHeight: 0.9,
              letterSpacing: 1,
              color: "#fafafa",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            The kind of package you can expect for your money.
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.65, color: "#c8c8c8", margin: 0 }}>
            Recently, a partner needed a brand that looked like an established name, not the new guy. So we built the
            Super J brand. Character, logo, colors, trucks, shirts, socials, and a website with an AI assistant that
            answers questions at 2am. Everything below came in one package. Yours will look all your own.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.55, color: "#7f8896", margin: 0 }}>
            Super J is a refrigeration company. Yours will be built for plumbing — your services, your colors, your
            name. Nothing here gets reused.
          </p>
          <div style={{ color: "#7f8896", fontSize: 14 }}>
            A full concept built for one of our partners. Every asset below is real, finished work.
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 56 }}>
          {GALLERY.map((item) => {
            const key =
              item.kind === "carousel"
                ? "mark-carousel"
                : item.kind === "poses"
                  ? "character-poses"
                  : item.src;
            return (
              <figure key={key} style={{ margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {item.kind === "carousel" ? (
                  <MarkCarousel slides={item.slides} bg={item.bg} />
                ) : item.kind === "poses" ? (
                  <div
                    className="trades-poses-grid"
                    style={{
                      border: "1px solid rgba(255,255,255,.14)",
                      background: item.bg,
                      borderRadius: 8,
                      padding: 12,
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 12,
                      alignItems: "center",
                    }}
                  >
                    {item.poses.map((pose) => (
                      <div
                        key={pose.src}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minHeight: "clamp(160px,28vw,320px)",
                        }}
                      >
                        <Image
                          src={pose.src}
                          alt={pose.alt}
                          width={800}
                          height={1000}
                          style={{
                            display: "block",
                            width: "100%",
                            height: "auto",
                            maxHeight: 360,
                            objectFit: "contain",
                            borderRadius: 3,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      border: "1px solid rgba(255,255,255,.14)",
                      background: item.bg,
                      borderRadius: 8,
                      padding: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={1600}
                      height={900}
                      style={{
                        display: "block",
                        height: "auto",
                        borderRadius: 3,
                        ...(item.imgStyle ? item.imgStyle : { width: "100%" }),
                      }}
                    />
                  </div>
                )}
                <figcaption style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 15,
                      fontWeight: 600,
                      letterSpacing: 0.2,
                      color: "#fafafa",
                      lineHeight: 1.45,
                    }}
                  >
                    {item.caption}
                  </span>
                  {"disclaimer" in item && item.disclaimer ? (
                    <span
                      style={{
                        fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                        fontSize: 13,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        color: "#7f8896",
                        lineHeight: 1.45,
                      }}
                    >
                      {item.disclaimer}
                    </span>
                  ) : null}
                </figcaption>
              </figure>
            );
          })}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 12 }}>
          <a
            href={SUPER_J_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              border: "1px solid rgba(255,255,255,.14)",
              borderRadius: 12,
              overflow: "hidden",
              background: "#e8eaed",
              display: "block",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "11px 16px",
                background: "#e8eaed",
                borderBottom: "1px solid #d4d4d7",
              }}
            >
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#c4c8cd", display: "inline-block" }} />
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#c4c8cd", display: "inline-block" }} />
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#c4c8cd", display: "inline-block" }} />
              <span
                style={{
                  flex: 1,
                  background: "#fdfdfd",
                  borderRadius: 6,
                  padding: "4px 14px",
                  fontSize: 12,
                  color: "#7f8896",
                  fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                  marginLeft: 10,
                }}
              >
                superjrefrigeration.com
              </span>
            </div>
            <Image
              src={`${ASSET}/super-j-website-homepage-hero-screenshot.png`}
              alt="Super J website homepage: 'When cooling goes down, we get you back up' hero with request-service buttons and 24/7 dispatch stats"
              width={1600}
              height={900}
              style={{ display: "block", width: "100%", height: "auto" }}
            />
          </a>
          <h3
            style={{
              fontFamily: "var(--font-display), 'Bebas Neue', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(30px,3vw,44px)",
              letterSpacing: 1,
              color: "#fafafa",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            And the website.
          </h3>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "#c8c8c8", margin: 0, maxWidth: 720 }}>
            Loads fast. Looks right on a phone, a tablet, or a laptop. Built to get found on Google and in AI answers.
            And a chat assistant on the site that answers customer questions and takes booking requests while you&apos;re
            under a sink at 9pm.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.55, color: "#7f8896", margin: 0, maxWidth: 720 }}>
            This Super J site is a demo version. The client&apos;s site is still in active development — you&apos;re
            seeing it before it goes live.
          </p>
          {SUPER_J_IS_LIVE ? (
            <a
              href={SUPER_J_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...primaryCta, alignSelf: "flex-start", padding: "15px 26px" }}
            >
              Visit the live site →
            </a>
          ) : (
            <span
              style={{
                border: "1px solid rgba(255,255,255,.12)",
                borderRadius: 11,
                color: "#7f8896",
                fontWeight: 600,
                fontSize: 16,
                padding: "15px 26px",
                alignSelf: "flex-start",
                display: "inline-block",
                cursor: "default",
              }}
            >
              Live site — launching this week
            </span>
          )}
        </div>
      </section>

      {/* SECTION — WHAT $500 GETS YOU */}
      <section
        data-screen-label="What $500 Gets You"
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "clamp(56px,7vw,100px) clamp(20px,5vw,64px)",
          display: "flex",
          flexDirection: "column",
          gap: 34,
          borderTop: "1px solid rgba(255,255,255,.07)",
        }}
      >
        <div
          className="trades-starter-grid"
          style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "clamp(28px,4vw,64px)", alignItems: "start" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div
              style={{
                fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                fontSize: 13,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#00d4ff",
              }}
            >
              Start Here
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display), 'Bebas Neue', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(42px,5.4vw,86px)",
                lineHeight: 0.9,
                letterSpacing: 1,
                color: "#fafafa",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              $500. Seven days. Your company, done right.
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: "#c8c8c8", margin: 0 }}>
              You don&apos;t have to imagine it. In seven business days you&apos;ll be looking at your own logo, your own
              business cards, your own van, your own sign, and a real website with your name on it — live on the
              internet. Then you decide.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {STARTER_ITEMS.map((item) => (
                <div key={item.title} style={{ display: "flex", gap: 10, fontSize: 16, lineHeight: 1.55, color: "#c8c8c8" }}>
                  <span style={{ color: "#8000ff", fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span>
                    <strong style={{ color: "#fafafa" }}>{item.title}</strong>
                    {item.title.endsWith(".") ? " " : " — "}
                    {item.body}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                border: "1px solid rgba(181,107,255,.55)",
                background: "rgba(128,0,255,.1)",
                boxShadow: "0 0 40px rgba(128,0,255,.14)",
                borderRadius: 16,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 20, color: "#fafafa", lineHeight: 1.35 }}>
                Walk away and you still keep the logo.
              </div>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "#c8c8c8" }}>
                If you decide not to go forward, that&apos;s fine — no pressure, no hard feelings. The logo files and
                business card design are yours. The website preview comes down.
              </p>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "#c8c8c8", margin: 0 }}>
              Your preview goes live <strong style={{ color: "#fafafa" }}>within 7 business days</strong> of your start
              date.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              {checkout ? <BrandStarterCta /> : null}
              <a href={CAL_URL} target="_blank" rel="noopener noreferrer" style={secondaryCta}>
                Questions first? Book a 20-Minute Call →
              </a>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: "#7f8896", margin: 0 }}>
              No card is saved. Nothing bills automatically. The $500 is credited in full toward your build if you go
              forward.
            </p>
          </div>
          <div>
            <div
              style={{
                border: "1px solid rgba(255,255,255,.14)",
                background: "#fdfdfd",
                borderRadius: 10,
                padding: 12,
              }}
            >
              <Image
                src={`${ASSET}/super-j-flatlay-v2.jpg`}
                alt="Super J brand flatlay — logo, cards, apparel, and assets laid out together"
                width={1600}
                height={1200}
                style={{ display: "block", width: "100%", height: "auto", borderRadius: 4 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — MASCOT OPTIONAL */}
      <section
        data-screen-label="Mascot Optional"
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "clamp(56px,7vw,100px) clamp(20px,5vw,64px)",
          display: "flex",
          flexDirection: "column",
          gap: 34,
          borderTop: "1px solid rgba(255,255,255,.07)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 820 }}>
          <div
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
              fontSize: 13,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#00d4ff",
            }}
          >
            We do more than just mascots.
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display), 'Bebas Neue', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(42px,5.4vw,86px)",
              lineHeight: 0.9,
              letterSpacing: 1,
              color: "#fafafa",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            We can design anything.
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "#c8c8c8", margin: 0 }}>
            Super J shows the whole package: website homepage, brand, character, assets, social icons, headers, color
            scheme. These five brand concepts prove our versatility. Clean and corporate. Bold and industrial.
            Doesn&apos;t need to be a superhero.
          </p>
        </div>
        <div
          className="trades-demo-live-hint"
          style={{
            textAlign: "center",
            fontFamily: "var(--font-body), Inter, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(15px,1.4vw,18px)",
            letterSpacing: 1.5,
            color: "#fafafa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <span className="trades-demo-live-click">CLICK TO SEE THESE LIVE</span>
          <span className="trades-demo-live-tap">TAP TO SEE THESE LIVE</span>
          <span aria-hidden style={{ color: "#8000ff", fontSize: 22, lineHeight: 1 }}>↓</span>
        </div>
        <div className="trades-demo-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18 }}>
          {DEMOS.map((d) => (
            <a
              key={d.label}
              href={d.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", flexDirection: "column", gap: 10, color: "#7f8896", textDecoration: "none" }}
            >
              <div
                style={{
                  border: "1px solid rgba(255,255,255,.14)",
                  background: "#12161c",
                  borderRadius: 8,
                  padding: 8,
                  overflow: "hidden",
                }}
              >
                <Image
                  src={d.src}
                  alt={`${d.label} demo screenshot`}
                  width={1600}
                  height={1139}
                  sizes="(max-width:767px) 100vw, 50vw"
                  quality={92}
                  style={{ display: "block", width: "100%", height: "auto", borderRadius: 3 }}
                />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                  fontSize: 12,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                {d.label} ↗
              </span>
            </a>
          ))}
        </div>
        <div style={{ color: "#7f8896", fontSize: 14 }}>
          Website design concepts from our studio. Built to show our design range.
        </div>
        <div style={{ fontWeight: 600, fontSize: 17, color: "#fafafa" }}>
          Your website will be 100% custom-built. Your branding, messaging, services, colors, and more.
        </div>
      </section>

      {/* SECTION 5 — THE PACKAGE */}
      <section
        id="the-package"
        data-screen-label="The Package"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(56px,7vw,100px) clamp(20px,5vw,64px)",
          display: "flex",
          flexDirection: "column",
          gap: 40,
          borderTop: "1px solid rgba(255,255,255,.07)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
              fontSize: 13,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#00d4ff",
            }}
          >
            The Full Build
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display), 'Bebas Neue', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(42px,5.4vw,86px)",
              lineHeight: 0.9,
              letterSpacing: 1,
              color: "#fafafa",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            $29K – $76K of work.
            <br />
            <span style={gText}>Your price: $4,000.</span>
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.65, color: "#c8c8c8", margin: 0, maxWidth: 720 }}>
            Six months from now, a homeowner Googles a plumber in your town, and you&apos;re the one who looks like the
            established company. That&apos;s what this buys.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 920, width: "100%" }}>
            {numbersOpen && (
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                <div
                  style={{
                    background: "rgba(128,0,255,.07)",
                    border: "1px solid rgba(128,0,255,.45)",
                    boxShadow: "0 0 40px rgba(128,0,255,.12)",
                    borderRadius: 16,
                    padding: 30,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    textAlign: "left",
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 19, color: "#fafafa", lineHeight: 1.45 }}>
                    Worth knowing: Many big agencies don&apos;t sell you a website. They rent you one. If you stop paying,
                    they take it down.
                  </div>
                  <div style={{ fontSize: 16, lineHeight: 1.6, color: "#c8c8c8" }}>
                    When you purchase a website from Catalyst, you own it. Reusable, graphic-designer-friendly vector
                    files, source files, everything — yours on final payment. Hand them to any wrap shop, embroiderer,
                    or designer and they can work with them directly.
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                      fontSize: 13,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      color: "#7f8896",
                      padding: "0 4px 10px",
                    }}
                  >
                    Typical large agency pricing:
                  </div>
                  {VALUE_ROWS.map((row) => (
                    <div
                      key={row.item}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 20,
                        padding: "15px 4px",
                        borderBottom: "1px solid rgba(255,255,255,.09)",
                        fontSize: 15,
                      }}
                    >
                      <span style={{ color: "#c8c8c8" }}>{row.item}</span>
                      <span
                        style={{
                          color: "#7f8896",
                          fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                          fontSize: 13,
                          letterSpacing: 1,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {row.cost}
                      </span>
                    </div>
                  ))}
                  <div
                    className="trades-value-total"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: 20,
                      padding: "22px 4px 6px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span style={{ color: "#7f8896", fontSize: 16, textDecoration: "line-through" }}>
                      TYPICAL TOTAL: $29,000 – $76,500
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-display), 'Bebas Neue', sans-serif",
                        fontSize: "clamp(40px,4vw,60px)",
                        color: "#fafafa",
                        lineHeight: 1,
                        letterSpacing: 1,
                      }}
                    >
                      YOUR PRICE: <span style={{ color: "#b56bff" }}>$4,000</span>
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    borderLeft: "2px solid #8000ff",
                    padding: "4px 0 4px 18px",
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: "#c8c8c8",
                    maxWidth: 760,
                  }}
                >
                  These are standard U.S. agency and senior-freelance rates for each piece bought separately. The ranges
                  are wide because agencies charge differently — a national firm charges the top, a good freelancer the
                  bottom. We&apos;re not comparing ourselves to the cheapest option. We&apos;re showing what this work
                  costs when somebody does it properly.
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setNumbersOpen((v) => !v)}
              aria-expanded={numbersOpen}
              style={{
                background: "none",
                border: "none",
                color: "#00d4ff",
                fontFamily: "var(--font-body), Inter, sans-serif",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                padding: 0,
                textAlign: "left",
                alignSelf: "flex-start",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span aria-hidden>{numbersOpen ? "⊖" : "⊕"}</span>
              <span>Where did we get these numbers?</span>
            </button>
          </div>
        </div>

        <div className="trades-package-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
          {[
            { title: "Your Brand", items: BRAND_ITEMS },
            { title: "Your Assets", items: ASSET_ITEMS },
            { title: "Your Website", items: SITE_ITEMS, note: CHATBOT_NOTE },
          ].map((col) => (
            <div key={col.title} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div
                style={{
                  fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                  fontSize: 13,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: "#00d4ff",
                  borderBottom: "1px solid rgba(255,255,255,.09)",
                  paddingBottom: 10,
                }}
              >
                {col.title}
              </div>
              {col.items.map((it) => (
                <div key={it} style={{ display: "flex", gap: 10, fontSize: 15, lineHeight: 1.5, color: "#c8c8c8" }}>
                  <span style={{ color: "#8000ff", fontWeight: 700 }}>✓</span>
                  <span>{it}</span>
                </div>
              ))}
              {"note" in col && col.note ? (
                <p style={{ margin: "4px 0 0", fontSize: 13, lineHeight: 1.55, color: "#7f8896" }}>{col.note}</p>
              ) : null}
            </div>
          ))}
        </div>

        <div
          style={{
            background: "rgba(128,0,255,.07)",
            border: "1px solid rgba(128,0,255,.45)",
            boxShadow: "0 0 40px rgba(128,0,255,.12)",
            borderRadius: 16,
            padding: "clamp(28px,4vw,48px)",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            alignItems: "center",
            textAlign: "center",
            maxWidth: 640,
            width: "100%",
            alignSelf: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
              fontSize: 13,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#00d4ff",
            }}
          >
            Complete Brand + Website Package
          </div>
          <div
            style={{
              fontFamily: "var(--font-display), 'Bebas Neue', sans-serif",
              fontSize: "clamp(64px,8vw,110px)",
              lineHeight: 0.9,
              color: "#fafafa",
            }}
          >
            {slots.priceShown}
          </div>
          <div style={{ fontSize: 15, lineHeight: 1.6, color: "#c8c8c8", maxWidth: 480 }}>
            {checkout ? (
              <>
                <strong style={{ color: "#fafafa" }}>$500 to start → $3,500 to finish.</strong>
                <br />
                We&apos;ll go over how you&apos;d like to handle the $3,500 when we meet.
                <br />
                You own everything on final payment.
              </>
            ) : (
              "You own everything on final payment"
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
            <SlotDots dots={slots.dots} size={15} />
            <div
              style={{
                fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                fontSize: 13,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#fafafa",
              }}
            >
              {slots.counterText}
            </div>
            {slots.showUrgency && slots.urgencyLine && (
              <div style={{ fontWeight: 600, fontSize: 15, color: "#b56bff" }}>{slots.urgencyLine}</div>
            )}
          </div>
          <div style={{ color: "#7f8896", fontSize: 14 }}>{slots.nextRungLine}</div>
          <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,.12)" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                fontSize: 14,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#fafafa",
              }}
            >
              After launch: $149/mo
            </div>
            <div style={{ fontSize: 15, lineHeight: 1.6, color: "#c8c8c8", maxWidth: 520 }}>
              Keeps your site online, secure, backed up, and updated — and keeps the chat assistant running and
              answering. Starts the day your site goes live. Cancel anytime.
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            {checkout ? <BrandStarterCta /> : null}
            <a href={CAL_URL} target="_blank" rel="noopener noreferrer" style={{ ...secondaryCta, padding: "16px 26px" }}>
              Book a 20-Minute Call →
            </a>
          </div>
          <div style={{ color: "#7f8896", fontSize: 14 }}>
            {checkout
              ? "No card is saved. Nothing bills automatically. Questions first? Book the call."
              : "No pitch deck. No pressure. If it's not a fit we'll tell you in ten minutes."}
          </div>
        </div>
      </section>

      {/* SECTION — PRICE LADDER (after package CTA) */}
      <section
        data-screen-label="Price Ladder"
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "clamp(48px,6vw,88px) clamp(20px,5vw,64px)",
          display: "flex",
          flexDirection: "column",
          gap: 28,
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,.07)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display), 'Bebas Neue', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(42px,5.4vw,86px)",
            lineHeight: 0.9,
            letterSpacing: 1,
            color: "#fafafa",
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          Only 5 at this price.
        </h2>
        <p style={{ maxWidth: 640, margin: "0 auto", fontSize: 18, lineHeight: 1.6, color: "#c8c8c8" }}>
          I do this work myself. I can carry five brand builds at a time and still do them right, so that&apos;s the
          number.
        </p>
        <div className="trades-ladder-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, textAlign: "left" }}>
          <div
            style={{
              background: "rgba(128,0,255,.07)",
              border: "1px solid rgba(128,0,255,.45)",
              boxShadow: "0 0 40px rgba(128,0,255,.12)",
              borderRadius: 16,
              padding: 28,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                fontSize: 13,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#00d4ff",
              }}
            >
              First 5 Companies
            </div>
            <div
              style={{
                fontFamily: "var(--font-display), 'Bebas Neue', sans-serif",
                fontSize: 64,
                color: "#fafafa",
                lineHeight: 1,
              }}
            >
              $4,000
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <SlotDots dots={slots.dots} size={12} />
              <span
                style={{
                  fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                  fontSize: 13,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#fafafa",
                }}
              >
                {slots.counterText}
              </span>
            </div>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,.025)",
              border: "1px solid rgba(255,255,255,.09)",
              borderRadius: 16,
              padding: 28,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                fontSize: 13,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#7f8896",
              }}
            >
              Next 5 Companies
            </div>
            <div
              style={{
                fontFamily: "var(--font-display), 'Bebas Neue', sans-serif",
                fontSize: 64,
                color: "#7f8896",
                lineHeight: 1,
              }}
            >
              $6,000
            </div>
          </div>
        </div>
        <p style={{ maxWidth: 560, margin: "0 auto", fontSize: 17, lineHeight: 1.6, color: "#c8c8c8" }}>
          Ten builds total in this run. The $500 start is the same either way.
        </p>
        <p style={{ maxWidth: 560, margin: "0 auto", fontSize: 17, lineHeight: 1.6, color: "#c8c8c8" }}>
          Only 10 packages available in this promotion. After it ends, it is unlikely to return.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          {checkout ? <BrandStarterCta /> : null}
          <a href={CAL_URL} target="_blank" rel="noopener noreferrer" style={{ ...secondaryCta, padding: "15px 26px" }}>
            Book a 20-Minute Call →
          </a>
        </div>
      </section>

      {/* SECTION 11 — FINAL CTA */}
      <section
        data-screen-label="Final CTA"
        style={{
          padding: "clamp(72px,9vw,130px) clamp(20px,5vw,64px)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 26,
          alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,.07)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display), 'Bebas Neue', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(42px,5.4vw,86px)",
            lineHeight: 0.9,
            letterSpacing: 1,
            color: "#fafafa",
            margin: 0,
            maxWidth: 820,
            textTransform: "uppercase",
          }}
        >
          How does your brand compare?
        </h2>
        <p style={{ maxWidth: 640, fontSize: 18, lineHeight: 1.65, color: "#c8c8c8", margin: 0 }}>
          Look at Super J one more time. Then look at your own website. If the difference bothers you, let&apos;s talk.
        </p>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            border: "1px solid rgba(255,255,255,.12)",
            borderRadius: 999,
            padding: "9px 18px",
            background: "rgba(255,255,255,.025)",
          }}
        >
          <SlotDots dots={slots.dots} size={9} />
          <span
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
              fontSize: 13,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#fafafa",
            }}
          >
            {slots.counterText}
          </span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          {checkout ? <BrandStarterCta /> : null}
          <a href={CAL_URL} target="_blank" rel="noopener noreferrer" style={secondaryCta}>
            Book a 20-Minute Call →
          </a>
        </div>
        <div style={{ color: "#7f8896", fontSize: 15 }}>
          Or call or text{" "}
          <a href={`tel:${PHONE_TEL}`} style={{ color: "#c8c8c8", fontWeight: 600, textDecoration: "none" }}>
            {PHONE_DISPLAY}
          </a>
        </div>
      </section>

      {/* SECTION 10 — FAQ */}
      <section
        data-screen-label="FAQ"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "clamp(56px,7vw,100px) clamp(20px,5vw,64px)",
          display: "flex",
          flexDirection: "column",
          gap: 30,
          borderTop: "1px solid rgba(255,255,255,.07)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display), 'Bebas Neue', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(42px,5.4vw,86px)",
            lineHeight: 0.9,
            letterSpacing: 1,
            color: "#fafafa",
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          FAQs
        </h2>
        <div className="trades-faq-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 40px", alignItems: "start" }}>
          {FAQS.map((faq, i) => {
            const open = openFaq === i;
            return (
              <div key={faq.q} style={{ borderBottom: "1px solid rgba(255,255,255,.09)" }}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? -1 : i)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#fafafa",
                    fontFamily: "var(--font-body), Inter, sans-serif",
                    fontSize: 17,
                    fontWeight: 600,
                    cursor: "pointer",
                    padding: "20px 0",
                    textAlign: "left",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 16,
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ color: "#00d4ff", flexShrink: 0 }}>{open ? "⊖" : "⊕"}</span>
                </button>
                {open && (
                  <div
                    style={{
                      borderLeft: "2px solid #8000ff",
                      padding: "2px 0 20px 18px",
                      fontSize: 15,
                      lineHeight: 1.65,
                      color: "#c8c8c8",
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,.07)",
          padding: "32px clamp(20px,5vw,64px)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          color: "#7f8896",
          fontSize: 13,
        }}
      >
        <a href={MAIN_SITE_URL} style={{ display: "inline-block", lineHeight: 0 }}>
          <Image
            src={`${ASSET}/catalyst-logo.png`}
            alt="Catalyst Digital Solutions, LLC"
            width={160}
            height={34}
            style={{ display: "block", height: 34, width: "auto" }}
          />
        </a>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center" }}>
          <a href={`tel:${PHONE_TEL}`} style={{ color: "#7f8896", textDecoration: "none" }}>
            Call or text {PHONE_DISPLAY}
          </a>
          <a href={`mailto:${EMAIL}`} style={{ color: "#7f8896", textDecoration: "none" }}>
            {EMAIL}
          </a>
          <span>Bakersfield, CA</span>
          <a href={`${MAIN_SITE_URL}/privacy`} style={{ color: "#7f8896", textDecoration: "none" }}>
            Privacy
          </a>
          <a href="/trades/terms" style={{ color: "#7f8896", textDecoration: "none" }}>
            Terms
          </a>
        </div>
      </footer>

      {/* Sticky mobile CTA — PRD § sticky bar */}
      {stickyVisible && (
        <div className="trades-sticky-cta" role="region" aria-label="Start your brand or book a call">
          <span
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: "#fafafa",
              whiteSpace: "nowrap",
            }}
          >
            {microCounter}
          </span>
          {checkout ? <BrandStarterCta compact /> : null}
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...secondaryCta,
              fontSize: 14,
              padding: "12px 16px",
              textAlign: "center",
              minHeight: 44,
            }}
          >
            Book a Call
          </a>
        </div>
      )}
    </div>
  );
}
