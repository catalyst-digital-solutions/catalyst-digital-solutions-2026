"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const PLATFORMS = [
  {
    label: "Google",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="8" stroke="rgba(0,212,255,0.7)" strokeWidth="1.5" />
        <path d="M14.5 11H11v2.5h2c-.4 1-1.4 1.5-2 1.5-1.7 0-3-1.3-3-3s1.3-3 3-3c.8 0 1.4.3 1.9.7l1.8-1.8C13.8 6.7 12.5 6 11 6c-2.8 0-5 2.2-5 5s2.2 5 5 5c2.5 0 4.7-1.8 4.7-5 0-.3 0-.7-.1-1h-.1z" fill="rgba(0,212,255,0.9)" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="4" stroke="rgba(0,212,255,0.7)" strokeWidth="1.5" />
        <path d="M10 9l5 3-5 3V9z" fill="rgba(0,212,255,0.9)" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="rgba(0,212,255,0.7)" strokeWidth="1.5" />
        <path d="M13 21v-7h2.5l.5-3H13V9c0-.8.4-1.5 1.5-1.5H16V5s-1.1-.2-2.2-.2C11 4.8 10 6.3 10 8.4V11H7.5v3H10v7h3z" fill="rgba(0,212,255,0.9)" />
      </svg>
    ),
  },
  {
    label: "Google Maps",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C8.1 2 5 5.1 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z" fill="rgba(0,212,255,0.9)" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="6" stroke="rgba(0,212,255,0.7)" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" stroke="rgba(0,212,255,0.9)" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="rgba(0,212,255,0.9)" />
      </svg>
    ),
  },
];

/* ── Mobile hub-and-spoke with measured SVG lines ─────── */
interface LineCoords { x1: number; y1: number; x2: number; y2: number; }

function MobileHubSpoke() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef       = useRef<HTMLDivElement>(null);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const [lines, setLines] = useState<LineCoords[]>([]);

  const measure = useCallback(() => {
    if (!containerRef.current || !hubRef.current) return;
    const cRect = containerRef.current.getBoundingClientRect();
    const hRect = hubRef.current.getBoundingClientRect();
    const hx = hRect.left - cRect.left + hRect.width  / 2;
    const hy = hRect.top  - cRect.top  + hRect.height / 2;

    const next: LineCoords[] = cardRefs.current.map((card) => {
      if (!card) return { x1: 0, y1: 0, x2: 0, y2: 0 };
      const r = card.getBoundingClientRect();
      return {
        x1: hx,
        y1: hy,
        // connect to the left edge, vertically centered on the card
        x2: r.left - cRect.left,
        y2: r.top  - cRect.top + r.height / 2,
      };
    });
    setLines(next);
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [measure]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "440px",
        margin: "0 auto",
      }}
    >
      {/* SVG lines — rendered underneath everything */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {lines.map((ln, i) => (
          <line
            key={i}
            x1={ln.x1} y1={ln.y1}
            x2={ln.x2} y2={ln.y2}
            stroke={i % 2 === 0 ? "#00d4ff" : "#8000ff"}
            strokeOpacity=".75"
            strokeWidth="1.6"
            strokeDasharray="5 9"
            style={{
              animation: "flow 4s linear infinite",
              animationDelay: `${i * 0.35}s`,
            }}
          />
        ))}
      </svg>

      {/* Content row: hub | cards */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", position: "relative", zIndex: 1 }}>

        {/* Hub */}
        <div
          ref={hubRef}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            flexShrink: 0,
            width: "90px",
          }}
        >
          <p style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: "9px",
            letterSpacing: "3px",
            color: "#7f8896",
            margin: 0,
            textTransform: "uppercase",
          }}>
            Catalyst
          </p>
          <div style={{ position: "relative", width: "80px", height: "80px" }}>
            <div style={{
              position: "absolute",
              inset: "-10px",
              borderRadius: "50%",
              background: "radial-gradient(circle,rgba(128,0,255,.45),transparent 70%)",
              filter: "blur(10px)",
              animation: "glowPulse 6s ease-in-out infinite",
            }} />
            <Image
              src="/assets/cds-logo-circle.png"
              alt="Catalyst hub"
              width={80}
              height={80}
              style={{ width: "80px", height: "80px", borderRadius: "50%", position: "relative", zIndex: 1 }}
            />
          </div>
        </div>

        {/* Platform cards */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
          {PLATFORMS.map((platform, i) => (
            <div
              key={platform.label}
              ref={(el) => { cardRefs.current[i] = el; }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "#0c1016",
                border: "1px solid rgba(0,212,255,.28)",
                borderRadius: "10px",
                padding: "10px 14px",
              }}
            >
              {platform.icon}
              <span style={{ fontSize: "13px", color: "#c8c8c8", fontFamily: "'Inter',sans-serif" }}>
                {platform.label}
              </span>
              <span style={{
                marginLeft: "auto",
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#80ff80",
                boxShadow: "0 0 6px #80ff80",
                animation: `dotPulse ${3 + i * 0.2}s ease-in-out infinite`,
                animationDelay: `${i * 0.25}s`,
                flexShrink: 0,
              }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main section ──────────────────────────────────────── */
export default function OmnipresenceSection() {
  const [open, setOpen] = useState(false);

  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      background: "#080b0f",
      fontFamily: "'Inter',sans-serif",
      color: "#c8c8c8",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "clamp(48px,6vw,80px)",
      padding: "clamp(72px,9vw,128px) clamp(20px,5vw,64px)",
    }}>

      {/* Text block */}
      <div style={{ textAlign: "center", maxWidth: "840px" }}>
        <div style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "#00d4ff", marginBottom: "18px" }}>
          Show up everywhere
        </div>
        <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "clamp(34px,4vw,58px)", lineHeight: 1.06, letterSpacing: "-.5px", color: "#fafafa", margin: 0 }}>
          Be the name they see everywhere.
        </h2>
        <p style={{ fontSize: "clamp(15.5px,1.1vw,17px)", color: "#c8c8c8", lineHeight: 1.7, margin: "24px auto 0", maxWidth: "680px" }}>
          The contractor who shows up first usually wins the job. We put your business in front of the right people — on Google, on YouTube, on Facebook, wherever they&apos;re looking. Fresh videos and posts go out for you every week. You don&apos;t lift a finger.
        </p>
        <p style={{ fontSize: "clamp(19px,1.7vw,26px)", fontWeight: 600, color: "#fafafa", lineHeight: 1.3, margin: "26px 0 0" }}>
          You just become the obvious choice.
        </p>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
          <button onClick={() => setOpen((v) => !v)} style={{ display: "inline-flex", alignItems: "center", gap: "9px", fontFamily: "'Inter',sans-serif", fontSize: "15px", fontWeight: 600, color: "#b56bff", background: "rgba(128,0,255,.08)", border: "1px solid rgba(128,0,255,.4)", padding: "11px 20px", borderRadius: "100px", cursor: "pointer" }}>
            <span style={{ fontSize: "17px", lineHeight: 1 }}>⊕</span> How does that work?
          </button>
        </div>
        {open && (
          <div style={{ margin: "22px auto 0", maxWidth: "600px", textAlign: "left", background: "linear-gradient(180deg,rgba(20,16,32,.92),rgba(10,8,18,.92))", border: "1px solid rgba(128,0,255,.3)", borderRadius: "16px", padding: "24px 28px", backdropFilter: "blur(8px)", boxShadow: "0 24px 60px rgba(0,0,0,.5)", animation: "panelIn .35s ease" }}>
            <p style={{ fontSize: "14.5px", color: "#d6dae0", lineHeight: 1.65, margin: 0 }}>
              Two things working together. First, we make and post content for you — short videos, helpful tips, project photos — so people keep seeing your name. Second, we build pages that help you show up when someone searches for your trade in your area. Most contractors are invisible online. This makes you the one that&apos;s everywhere.
            </p>
          </div>
        )}
      </div>

      {/* Desktop SVG — hidden on mobile */}
      <div className="omni-desktop" style={{ width: "100%", maxWidth: "1100px" }}>
        <svg viewBox="0 0 1100 360" style={{ width: "100%", height: "auto" }} fill="none" aria-hidden="true">
          <defs>
            <filter id="g4" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <line x1="550" y1="92" x2="150" y2="230" stroke="#00d4ff" strokeOpacity=".75" strokeWidth="1.6" style={{ strokeDasharray: "5 12", animation: "flow 4.5s linear infinite" }} />
          <line x1="550" y1="92" x2="350" y2="230" stroke="#8000ff" strokeOpacity=".8"  strokeWidth="1.6" style={{ strokeDasharray: "5 12", animation: "flow 4s linear infinite", animationDelay: ".6s" }} />
          <line x1="550" y1="92" x2="550" y2="230" stroke="#00d4ff" strokeOpacity=".75" strokeWidth="1.6" style={{ strokeDasharray: "5 12", animation: "flow 5s linear infinite", animationDelay: "1.1s" }} />
          <line x1="550" y1="92" x2="750" y2="230" stroke="#8000ff" strokeOpacity=".8"  strokeWidth="1.6" style={{ strokeDasharray: "5 12", animation: "flow 4.2s linear infinite", animationDelay: ".3s" }} />
          <line x1="550" y1="92" x2="950" y2="230" stroke="#00d4ff" strokeOpacity=".75" strokeWidth="1.6" style={{ strokeDasharray: "5 12", animation: "flow 4.7s linear infinite", animationDelay: ".9s" }} />
          <text x="550" y="26" fontFamily="'JetBrains Mono',monospace" fontSize="11" letterSpacing="3" fill="#7f8896" textAnchor="middle">CATALYST</text>
          <circle cx="550" cy="71" r="40" fill="#8000ff" opacity=".4" filter="url(#g4)" />
          <image href="/assets/cds-logo-circle.png" x="518" y="39" width="64" height="64" />
          {[
            { cx: 150, label: "Google" },
            { cx: 350, label: "YouTube" },
            { cx: 550, label: "Facebook" },
            { cx: 750, label: "Google Maps" },
            { cx: 950, label: "Instagram" },
          ].map(({ cx, label }, i) => (
            <g key={label}>
              <rect x={cx - 85} y="232" width="170" height="96" rx="14" fill="#0c1016" stroke="#00d4ff" strokeOpacity=".32" />
              <text x={cx} y="312" fontFamily="'Inter',sans-serif" fontSize="14" fill="#c8c8c8" textAnchor="middle">{label}</text>
              <circle cx={cx + 72} cy="252" r="7" fill="#80ff80" opacity=".22" />
              <circle cx={cx + 72} cy="252" r="3.5" fill="#80ff80" style={{ animation: `dotPulse ${3 + i * 0.2}s ease-in-out infinite`, animationDelay: `${i * 0.25}s` }} />
            </g>
          ))}
          <g transform="translate(127,246)" stroke="#00d4ff" strokeWidth="2"><circle cx="9" cy="9" r="8" /><line x1="20" y1="20" x2="15" y2="15" /></g>
          <g transform="translate(338,247)"><rect x="0" y="0" width="24" height="18" rx="5" fill="none" stroke="#00d4ff" strokeWidth="2" /><path d="M9 5 L17 9 L9 13 Z" fill="#00d4ff" /></g>
          <text x="550" y="270" fontFamily="'Inter',sans-serif" fontWeight="700" fontSize="30" fill="#00d4ff" textAnchor="middle">f</text>
          <g transform="translate(727,244)" fill="none" stroke="#00d4ff" strokeWidth="2"><path d="M10 23 C10 23 18 14 18 8 A8 8 0 1 0 2 8 C2 14 10 23 10 23 Z" /><circle cx="10" cy="8" r="3" fill="#00d4ff" stroke="none" /></g>
          <g transform="translate(927,246)" fill="none" stroke="#00d4ff" strokeWidth="2"><rect x="0" y="0" width="24" height="24" rx="7" /><circle cx="12" cy="12" r="6" /><circle cx="18.5" cy="5.5" r="1.6" fill="#00d4ff" stroke="none" /></g>
        </svg>
      </div>

      {/* Mobile layout — hub + measured SVG lines + stacked platforms */}
      <div className="omni-mobile">
        <MobileHubSpoke />
      </div>
    </section>
  );
}
