"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import {
  CAL_URL,
  EMAIL,
  getSlotState,
  MAIN_SITE_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  SUPER_J_IS_LIVE,
  SUPER_J_URL,
} from "@/config/slots";

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
          No catch. Fair question. If somebody offered me forty grand of work for four, I&apos;d hang up too. Here&apos;s
          the honest answer.
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
            The tools changed. What took a design team six weeks takes us days. We passed that on instead of pocketing
            it. Same quality, less time, lower price.
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
          After the first five, it&apos;s $6,000. Not a tactic — we just can&apos;t do this many at this price twice.
        </p>
      </div>
    ),
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
    a: "You start with five brand directions. You pick one, and we build the logo and wordmark from it — the color scheme, typography, and everything else grows out of that. Nothing moves forward until you're happy with how it looks.",
  },
  {
    q: "Is the website really custom?",
    a: "Built in Next.js and React from scratch — not WordPress, not Wix, not a template with your logo dropped in. There's a reason the biggest brands on the web use Next.js and React — Nike, Netflix, and Uber all run on it. It's fast, secure, and built to grow. Your site runs on the same technology, sized for your company.",
  },
  {
    q: "What does the AI chatbot actually do?",
    a: "It's trained on your company info. Your services, service area, and pricing. A customer at 11pm asks 'do you work on walk-in coolers in Riverside?' and it answers correctly, then hands you the lead.",
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
];

const ASSET_ITEMS = [
  "Vehicle wrap design file",
  "Social avatars & headers, every platform",
  "Google Business Profile imagery",
];

const SITE_ITEMS = [
  "10-page custom Next.js site (not a template)",
  "On-page SEO built in",
  "AI chatbot trained on your services",
];

const DEMOS = [
  { label: "APEX", src: `${ASSET}/01-apex.jpg`, href: "https://construction1.catalyst-demos.com" },
  { label: "HOLLOWAY", src: `${ASSET}/02-holloway.jpg`, href: "https://construction2.catalyst-demos.com" },
  { label: "MONOLITH", src: `${ASSET}/03-monolith.jpg`, href: "https://construction3.catalyst-demos.com" },
  { label: "VOLTAIC", src: `${ASSET}/04-voltaic.jpeg`, href: "https://construction4.catalyst-demos.com" },
  { label: "MERIDIAN", src: `${ASSET}/05-meridian.jpg`, href: "https://construction5.catalyst-demos.com" },
] as const;

const GALLERY = [
  {
    src: `${ASSET}/super-j-brand-identity-system.png`,
    alt: "Super J brand identity system sheet: primary stacked lockup, compact horizontal lockup, one-color dark, and reversed versions with the full core palette",
    caption: "The Identity System — four lockups, one-color, reversed, full palette",
    bg: "#fdfdfd",
  },
  {
    src: `${ASSET}/j-shield-emblem_transparent-bg.png`,
    alt: "Super J supporting mark: navy shield emblem with a white letter J and red trim",
    caption: "The Mark — works at 32px on a phone or 32 inches on a truck",
    bg: "#fdfdfd",
    imgStyle: { width: "44%", maxWidth: 520, margin: "0 auto" } as const,
  },
  {
    src: `${ASSET}/super-j-social-header-system.png`,
    alt: "Super J coordinated social header system for Facebook, LinkedIn, and X — matching deep blue banners with the mascot and shield lockup",
    caption: "Social Headers — Facebook, LinkedIn, X, all matching",
    bg: "#12161c",
  },
  {
    src: `${ASSET}/super-j-social-avatar-guidelines.png`,
    alt: "Super J avatar guidelines: shield avatar shown on Google Business Profile, Facebook, Instagram, LinkedIn, and X at sizes from 512px down to a 32px favicon",
    caption: "Avatars — every platform, every size, sharp",
    bg: "#12161c",
  },
  {
    src: `${ASSET}/super-j-pointing-pose.png`,
    alt: "Super J mascot character in a presenting pose — caped superhero technician in a navy and white suit with a J chest emblem",
    caption: "The Character — multiple poses for ads, trucks, and print",
    bg: "#fdfdfd",
    imgStyle: { width: "40%", maxWidth: 480, margin: "0 auto" } as const,
  },
  {
    src: `${ASSET}/van-wrap-front.jpeg`,
    alt: "Super J vehicle wrap design shown on a Sprinter van — front driver side with the mascot, lockup, and phone number",
    caption: "Wrap File: one print-ready design file for your wrap shop to install",
    bg: "#12161c",
  },
  {
    src: `${ASSET}/super-j-premium-branding-flatlay.png`,
    alt: "Super J shield mark embroidered on a navy cap and polo, with business cards, a die-cut sticker, and the Instagram profile on a phone",
    caption: "Your files: embroidery- and screen-print-compatible files for any shop",
    bg: "#12161c",
  },
  {
    src: `${ASSET}/super-j-opengraph-image.png`,
    alt: "Super J Open Graph link-preview image: 'Commercial refrigeration first' headline beside the shield badge on a blue burst",
    caption: "Link Previews — looks like a real company when someone shares you",
    bg: "#12161c",
  },
] as const;

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

export default function TradesOfferLanding() {
  const slots = getSlotState();
  const [openFaq, setOpenFaq] = useState(-1);
  const [stickyVisible, setStickyVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

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
            href={`tel:${PHONE_TEL}`}
            style={{ color: "#c8c8c8", fontSize: 15, fontWeight: 600, textDecoration: "none" }}
          >
            <span style={{ color: "#7f8896", fontWeight: 500 }}>Call or text</span> {PHONE_DISPLAY}
          </a>
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="trades-header-cta"
            style={{
              ...primaryCta,
              fontSize: 15,
              padding: "12px 22px",
            }}
          >
            Book a 20-Minute Call
          </a>
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
            For HVAC, Refrigeration &amp; Plumbing Owners
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
            Your biggest competitor didn&apos;t get sharp vans and a slick website by luck — they paid an agency a
            fortune.{" "}
            <span style={gText}>We&apos;ll build you the same thing for $4,000.</span>
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
            <a href={CAL_URL} target="_blank" rel="noopener noreferrer" style={primaryCta}>
              Book a 20-Minute Call →
            </a>
            <a href="#the-package" onClick={scrollToPackage} style={secondaryCta}>
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
            <span>◷ 30 days to launch</span>
            <span>◈ $2,000 down, $2,000 at handoff</span>
            <span>◆ You own everything</span>
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

      {/* SECTION 2 — PRICE LADDER */}
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
        <div
          style={{
            fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
            fontSize: 13,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#00d4ff",
          }}
        >
          Before Anything Else
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
          Here&apos;s the price, and here&apos;s when it goes up.
        </h2>
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
        <p style={{ maxWidth: 640, margin: "0 auto", fontSize: 17, lineHeight: 1.6, color: "#c8c8c8" }}>
          We can build one of these a week. That&apos;s the whole reason for the number — not a sales gimmick. We&apos;re
          telling you now so you&apos;re not surprised later. Come back next month and check the counter. It&apos;ll be
          accurate.
        </p>
        <a href={CAL_URL} target="_blank" rel="noopener noreferrer" style={{ ...secondaryCta, alignSelf: "center", padding: "15px 26px" }}>
          Book a 20-Minute Call →
        </a>
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
          When a customer spends 10 seconds comparing you and a competitor…
        </h2>
        <p
          style={{
            maxWidth: 820,
            fontSize: "clamp(22px,2.4vw,34px)",
            fontWeight: 600,
            lineHeight: 1.35,
            color: "#fafafa",
            margin: 0,
          }}
        >
          Let&apos;s make you the <span style={gText}>obvious choice</span>.
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
          <div style={{ color: "#7f8896", fontSize: 14 }}>
            A full concept built for one of our partners. Every asset below is real, finished work.
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 56 }}>
          {GALLERY.map((item) => (
            <figure key={item.src} style={{ margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
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
                    ...("imgStyle" in item && item.imgStyle
                      ? item.imgStyle
                      : { width: "100%" }),
                  }}
                />
              </div>
              <figcaption
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
              </figcaption>
            </figure>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 12 }}>
          <div
            style={{
              border: "1px solid rgba(255,255,255,.14)",
              borderRadius: 12,
              overflow: "hidden",
              background: "#e8eaed",
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
          </div>
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
            Ten pages. Loads fast. Works on a phone. Built to be found on Google. And an AI assistant trained on their
            own services that answers customers while they&apos;re on a rooftop.
          </p>
          {SUPER_J_IS_LIVE ? (
            <a
              href={SUPER_J_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...secondaryCta, alignSelf: "flex-start", padding: "15px 26px" }}
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
            The Package
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
            Your price: $4,000.
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.65, color: "#c8c8c8", margin: 0, maxWidth: 720 }}>
            A full brand identity, logo, social assets, vehicle wrap file, and a custom 10-page website with an AI
            chatbot that answers customers at 2am. Bundled into one flat price.
          </p>
        </div>

        <div className="trades-package-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
          {[
            { title: "Your Brand", items: BRAND_ITEMS },
            { title: "Your Assets", items: ASSET_ITEMS },
            { title: "Your Website", items: SITE_ITEMS },
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
            $4,000
          </div>
          <div style={{ color: "#7f8896", fontSize: 16, textDecoration: "line-through" }}>
            Typical agency cost: $29,000–$76,500
          </div>
          <div style={{ fontSize: 15, lineHeight: 1.6, color: "#c8c8c8", maxWidth: 480 }}>
            $2,000 down · $2,000 at handoff · After launch: $149/mo hosting, security &amp; AI hosting
          </div>
          <a href={CAL_URL} target="_blank" rel="noopener noreferrer" style={{ ...primaryCta, padding: "17px 34px" }}>
            Book Your 20-Minute Call →
          </a>
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
            Not Your Style? Fine.
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
            Mascot optional. Quality comes standard.
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "#c8c8c8", margin: 0 }}>
            Super J shows the whole package: website homepage, brand, character, assets, social icons, headers, color
            scheme. These five brand concepts show how far the website design can range. Clean and corporate. Bold and
            industrial. Doesn&apos;t need to be a superhero.
          </p>
        </div>
        <div className="trades-demo-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 18 }}>
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
                  aspectRatio: "1600/1139",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Image src={d.src} alt={`${d.label} demo screenshot`} fill sizes="(max-width:768px) 50vw, 20vw" style={{ objectFit: "cover" }} />
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
          Clean and corporate. Bold and industrial. A character on the truck. Your call. The price doesn&apos;t change.
        </div>
      </section>

      {/* SECTION 8 — HOW IT WORKS */}
      <section
        data-screen-label="How It Works"
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
            30 Days
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
            Three steps. You&apos;re busy — we know.
          </h2>
        </div>
        <div className="trades-steps" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0, position: "relative" }}>
          <div
            className="trades-steps-rule"
            style={{
              position: "absolute",
              top: 23,
              left: "8%",
              right: "8%",
              height: 1,
              background: "rgba(255,255,255,.12)",
            }}
          />
          {[
            {
              n: "01",
              t: (
                <>
                  We talk <span style={{ color: "#7f8896", fontWeight: 500 }}>(20 minutes)</span>
                </>
              ),
              b: "Tell us what you do, who you serve, and what you want to look like. That's the only long conversation you'll have with us.",
            },
            {
              n: "02",
              t: (
                <>
                  We build <span style={{ color: "#7f8896", fontWeight: 500 }}>(Days 1–21)</span>
                </>
              ),
              b: "You see the brand first and approve it. Then the site gets built around it. Two check-ins. Ten minutes each.",
            },
            {
              n: "03",
              t: (
                <>
                  You launch <span style={{ color: "#7f8896", fontWeight: 500 }}>(Day 30)</span>
                </>
              ),
              b: "Site goes live. Every file lands in your inbox — logos, vectors, wrap design, embroidery- and print-compatible graphics — ready to hand to any wrap shop, embroiderer, or printer you choose.",
            },
          ].map((s) => (
            <div key={s.n} style={{ display: "flex", flexDirection: "column", gap: 14, padding: "0 22px", position: "relative" }}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: "50%",
                  background: "#080b0f",
                  border: "1px solid rgba(128,0,255,.6)",
                  color: "#b56bff",
                  fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                  fontSize: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {s.n}
              </div>
              <div style={{ fontWeight: 700, fontSize: 18, color: "#fafafa" }}>{s.t}</div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: "#c8c8c8" }}>{s.b}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
          <div className="trades-pay-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, width: "100%", maxWidth: 640 }}>
            <div
              style={{
                border: "1px solid rgba(255,255,255,.09)",
                borderRadius: 16,
                padding: 20,
                textAlign: "center",
                fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                fontSize: 14,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#fafafa",
                background: "rgba(255,255,255,.025)",
              }}
            >
              $2,000 — to start
            </div>
            <div
              style={{
                border: "1px solid rgba(255,255,255,.09)",
                borderRadius: 16,
                padding: 20,
                textAlign: "center",
                fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                fontSize: 14,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#fafafa",
                background: "rgba(255,255,255,.025)",
              }}
            >
              $2,000 — at handoff
            </div>
          </div>
          <div style={{ color: "#7f8896", fontSize: 14 }}>Everything transfers to you on final payment.</div>
        </div>
      </section>

      {/* SECTION 9 — THE PRICE */}
      <section data-screen-label="The Price" style={{ background: "#050709", borderTop: "1px solid rgba(255,255,255,.07)" }}>
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            padding: "clamp(64px,8vw,120px) clamp(20px,5vw,64px)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "rgba(128,0,255,.07)",
              border: "1px solid rgba(128,0,255,.45)",
              boxShadow: "0 0 40px rgba(128,0,255,.12)",
              borderRadius: 16,
              padding: "clamp(32px,5vw,56px)",
              display: "flex",
              flexDirection: "column",
              gap: 22,
              alignItems: "center",
              textAlign: "center",
              width: "100%",
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
                fontSize: "clamp(72px,10vw,140px)",
                lineHeight: 0.9,
                color: "#fafafa",
              }}
            >
              {slots.priceShown}
            </div>
            <div style={{ fontSize: 15, color: "#c8c8c8" }}>
              $2,000 down · $2,000 at handoff · You own everything on final payment
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
                Covers hosting, security, backups, updates, and what the AI assistant costs to run. Starts the day the
                site goes live.
              </div>
            </div>
            <a href={CAL_URL} target="_blank" rel="noopener noreferrer" style={{ ...primaryCta, padding: "17px 34px" }}>
              Book a 20-Minute Call →
            </a>
            <div style={{ color: "#7f8896", fontSize: 14 }}>
              No pitch deck. No pressure. If it&apos;s not a fit we&apos;ll tell you in ten minutes.
            </div>
          </div>
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
          Twenty minutes. Then you decide.
        </h2>
        <p style={{ maxWidth: 640, fontSize: 18, lineHeight: 1.65, color: "#c8c8c8", margin: 0 }}>
          Look at Super J one more time. Then look at your own website. If the difference bothers you, let&apos;s talk.
          If it doesn&apos;t, no hard feelings. We&apos;ll be here when you need us.
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
        <a href={CAL_URL} target="_blank" rel="noopener noreferrer" style={{ ...primaryCta, padding: "17px 34px" }}>
          Book a 20-Minute Call →
        </a>
        <div style={{ color: "#7f8896", fontSize: 15 }}>
          Or call or text{" "}
          <a href={`tel:${PHONE_TEL}`} style={{ color: "#c8c8c8", fontWeight: 600, textDecoration: "none" }}>
            {PHONE_DISPLAY}
          </a>
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
          <a href={`${MAIN_SITE_URL}/terms`} style={{ color: "#7f8896", textDecoration: "none" }}>
            Terms
          </a>
        </div>
      </footer>

      {/* Sticky mobile CTA — PRD § sticky bar */}
      {stickyVisible && (
        <div className="trades-sticky-cta" role="region" aria-label="Book a call">
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
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...primaryCta,
              fontSize: 14,
              padding: "12px 18px",
              flex: 1,
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
