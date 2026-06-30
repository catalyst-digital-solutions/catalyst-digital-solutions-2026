"use client";

import Image from "next/image";
import IcebergPanel from "@/components/IcebergPanel";

const DEMOS = [
  {
    name: "Apex Construction",
    company: "Apex Design-Build",
    accentColor: "#E0A02B",
    screenshot: "/assets/catalystdemosite1-2026-06-25-construction-demo-homepage-hero-section-cropped.jpg",
    liveUrl: "https://construction1.catalyst-demos.com",
    urlLabel: "construction1.catalyst-demos.com",
  },
  {
    name: "Holloway General Contractors",
    company: "Holloway Construction Group",
    accentColor: "#C8102E",
    screenshot: "/assets/screencapture-construction2-catalyst-demos-holloway-demo-website-page-thumbnail-for-catalyst-homepage.png",
    liveUrl: "https://construction2.catalyst-demos.com",
    urlLabel: "construction2.catalyst-demos.com",
  },
];

function BrowserFrame({
  demo,
  style,
}: {
  demo: (typeof DEMOS)[number];
  style?: React.CSSProperties;
}) {
  return (
    <a
      href={demo.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "block",
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        textDecoration: "none",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        ...style,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 30px 80px rgba(0,0,0,0.6)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.5)";
      }}
      aria-label={`Visit ${demo.company} demo site`}
    >
      {/* Browser chrome */}
      <div
        style={{
          background: "#1a1d23",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: "5px", flexShrink: 0 }}>
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f57" }} />
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#febc2e" }} />
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28c840" }} />
        </div>
        {/* URL bar */}
        <div
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.05)",
            borderRadius: "5px",
            padding: "3px 10px",
            fontSize: "10px",
            color: "var(--cds-muted)",
            fontFamily: "var(--font-mono)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {demo.urlLabel}
        </div>
      </div>

      {/* Screenshot */}
      <div style={{ position: "relative", aspectRatio: "16/10", background: "#111" }}>
        <Image
          src={demo.screenshot}
          alt={`${demo.company} website screenshot`}
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          sizes="(max-width: 768px) 100vw, 45vw"
        />
      </div>
    </a>
  );
}

export default function ProofSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="two-col-40-60" style={{ alignItems: "flex-start", gap: "64px" }}>
          {/* Left — Copy */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <p className="eyebrow">Proof We Can</p>

            <h2
              className="display"
              style={{ fontSize: "clamp(42px, 5vw, 76px)", lineHeight: 0.92 }}
            >
              We&apos;d rather prove it than promise it.
            </h2>

            <p style={{ fontSize: "15px", color: "var(--cds-body)", lineHeight: 1.8, fontFamily: "var(--font-inter)" }}>
              We&apos;re not going to show you a wall of five-star reviews. We&apos;d rather show
              you what we can do for your company. Right now.
            </p>

            <p style={{ fontSize: "15px", color: "var(--cds-body)", lineHeight: 1.8, fontFamily: "var(--font-inter)" }}>
              Want proof we can build sites that win work? Here are two. Real, live websites built
              for contractors. Fast, professional, built to bring in jobs. That&apos;s our mission.
            </p>

            <p
              style={{
                fontSize: "11px",
                color: "var(--cds-muted)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              See ones we built
            </p>

            {/* Demo buttons — each in the demo's own accent color */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-start" }}>
              {DEMOS.map((demo) => (
                <a
                  key={demo.name}
                  href={demo.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 22px",
                    borderRadius: "9px",
                    background: demo.accentColor,
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 700,
                    fontFamily: "var(--font-inter)",
                    textDecoration: "none",
                    transition: "opacity 0.2s, transform 0.15s",
                    boxShadow: `0 8px 24px ${demo.accentColor}55`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.opacity = "0.88";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "";
                  }}
                >
                  {demo.name} →
                </a>
              ))}
            </div>

            <IcebergPanel triggerLabel="Why show instead of tell?" variant="text">
              Anyone can write a testimonial. We&apos;d rather build you something and let you
              judge for yourself. If we can build a site this good for a fictitious company in our
              spare time, imagine what we do for paying clients who give us their brand, their
              story, and their goals. That&apos;s the standard we hold ourselves to.
            </IcebergPanel>
          </div>

          {/* Right — Overlapping browser frames */}
          <div style={{ position: "relative", paddingTop: "40px" }}>
            {/* Holloway — behind, top-right offset */}
            <BrowserFrame
              demo={DEMOS[1]}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "85%",
                zIndex: 1,
                transform: "translateX(10px) rotate(1deg)",
              }}
            />

            {/* Apex — front, slightly larger */}
            <BrowserFrame
              demo={DEMOS[0]}
              style={{
                position: "relative",
                zIndex: 2,
                width: "88%",
                marginTop: "80px",
                transform: "rotate(-1.5deg)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
