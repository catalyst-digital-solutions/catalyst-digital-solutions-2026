"use client";

import { useState } from "react";

export default function OmnipresenceSection() {
  const [open, setOpen] = useState(false);

  return (
    <section
      style={{
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
      }}
    >
      {/* Text block */}
      <div style={{ textAlign: "center", maxWidth: "840px" }}>
        <div style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "#00d4ff", marginBottom: "18px" }}>
          Show up everywhere
        </div>

        <h2
          style={{
            fontFamily: "'Inter',sans-serif",
            fontWeight: 700,
            fontSize: "clamp(34px,4vw,58px)",
            lineHeight: 1.06,
            letterSpacing: "-.5px",
            color: "#fafafa",
            margin: 0,
          }}
        >
          Be the name they see everywhere.
        </h2>

        <p style={{ fontSize: "clamp(15.5px,1.1vw,17px)", color: "#c8c8c8", lineHeight: 1.7, margin: "24px auto 0", maxWidth: "680px" }}>
          The contractor who shows up first usually wins the job. We put your business in front of the right people — on Google, on YouTube, on Facebook, wherever they&apos;re looking. Fresh videos and posts go out for you every week. You don&apos;t lift a finger.
        </p>

        <p style={{ fontSize: "clamp(19px,1.7vw,26px)", fontWeight: 600, color: "#fafafa", lineHeight: 1.3, margin: "26px 0 0" }}>
          You just become the obvious choice.
        </p>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
          <button
            onClick={() => setOpen((v) => !v)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              fontFamily: "'Inter',sans-serif",
              fontSize: "15px",
              fontWeight: 600,
              color: "#b56bff",
              background: "rgba(128,0,255,.08)",
              border: "1px solid rgba(128,0,255,.4)",
              padding: "11px 20px",
              borderRadius: "100px",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: "17px", lineHeight: 1 }}>⊕</span> How does that work?
          </button>
        </div>

        {open && (
          <div
            style={{
              margin: "22px auto 0",
              maxWidth: "600px",
              textAlign: "left",
              background: "linear-gradient(180deg,rgba(20,16,32,.92),rgba(10,8,18,.92))",
              border: "1px solid rgba(128,0,255,.3)",
              borderRadius: "16px",
              padding: "24px 28px",
              backdropFilter: "blur(8px)",
              boxShadow: "0 24px 60px rgba(0,0,0,.5)",
              animation: "panelIn .35s ease",
            }}
          >
            <p style={{ fontSize: "14.5px", color: "#d6dae0", lineHeight: 1.65, margin: 0 }}>
              Two things working together. First, we make and post content for you — short videos, helpful tips, project photos — so people keep seeing your name. Second, we build pages that help you show up when someone searches for your trade in your area. Most contractors are invisible online. This makes you the one that&apos;s everywhere.
            </p>
          </div>
        )}
      </div>

      {/* Platform network — exact SVG from reference */}
      <div style={{ width: "100%", maxWidth: "1100px" }}>
        <svg viewBox="0 0 1100 360" style={{ width: "100%", height: "auto" }} fill="none" aria-hidden="true">
          <defs>
            <filter id="g4" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <linearGradient id="hubgrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#8000ff" />
              <stop offset="1" stopColor="#5600ab" />
            </linearGradient>
          </defs>

          {/* Animated dashed trails — flow animation */}
          <line x1="550" y1="92" x2="150" y2="230" stroke="#00d4ff" strokeOpacity=".75" strokeWidth="1.6" style={{ strokeDasharray: "5 12", animation: "flow 4.5s linear infinite" }} />
          <line x1="550" y1="92" x2="350" y2="230" stroke="#8000ff" strokeOpacity=".8" strokeWidth="1.6" style={{ strokeDasharray: "5 12", animation: "flow 4s linear infinite", animationDelay: ".6s" }} />
          <line x1="550" y1="92" x2="550" y2="230" stroke="#00d4ff" strokeOpacity=".75" strokeWidth="1.6" style={{ strokeDasharray: "5 12", animation: "flow 5s linear infinite", animationDelay: "1.1s" }} />
          <line x1="550" y1="92" x2="750" y2="230" stroke="#8000ff" strokeOpacity=".8" strokeWidth="1.6" style={{ strokeDasharray: "5 12", animation: "flow 4.2s linear infinite", animationDelay: ".3s" }} />
          <line x1="550" y1="92" x2="950" y2="230" stroke="#00d4ff" strokeOpacity=".75" strokeWidth="1.6" style={{ strokeDasharray: "5 12", animation: "flow 4.7s linear infinite", animationDelay: ".9s" }} />

          {/* Hub */}
          <text x="550" y="26" fontFamily="'JetBrains Mono',monospace" fontSize="11" letterSpacing="3" fill="#7f8896" textAnchor="middle">CATALYST</text>
          <circle cx="550" cy="71" r="40" fill="#8000ff" opacity=".4" filter="url(#g4)" />
          <image href="/assets/cds-logo-circle.png" x="518" y="39" width="64" height="64" />

          {/* Google tile */}
          <rect x="65" y="232" width="170" height="96" rx="14" fill="#0c1016" stroke="#00d4ff" strokeOpacity=".32" />
          <g transform="translate(138,246)" stroke="#00d4ff" strokeWidth="2"><circle cx="9" cy="9" r="8" /><line x1="20" y1="20" x2="15" y2="15" /></g>
          <text x="150" y="312" fontFamily="'Inter',sans-serif" fontSize="14" fill="#c8c8c8" textAnchor="middle">Google</text>
          <circle cx="212" cy="252" r="7" fill="#80ff80" opacity=".22" />
          <circle cx="212" cy="252" r="3.5" fill="#80ff80" style={{ animation: "dotPulse 3s ease-in-out infinite" }} />

          {/* YouTube tile */}
          <rect x="265" y="232" width="170" height="96" rx="14" fill="#0c1016" stroke="#00d4ff" strokeOpacity=".32" />
          <g transform="translate(338,247)"><rect x="0" y="0" width="24" height="18" rx="5" fill="none" stroke="#00d4ff" strokeWidth="2" /><path d="M9 5 L17 9 L9 13 Z" fill="#00d4ff" /></g>
          <text x="350" y="312" fontFamily="'Inter',sans-serif" fontSize="14" fill="#c8c8c8" textAnchor="middle">YouTube</text>
          <circle cx="412" cy="252" r="7" fill="#80ff80" opacity=".22" />
          <circle cx="412" cy="252" r="3.5" fill="#80ff80" style={{ animation: "dotPulse 3.4s ease-in-out infinite", animationDelay: ".5s" }} />

          {/* Facebook tile */}
          <rect x="465" y="232" width="170" height="96" rx="14" fill="#0c1016" stroke="#00d4ff" strokeOpacity=".32" />
          <text x="550" y="270" fontFamily="'Inter',sans-serif" fontWeight="700" fontSize="30" fill="#00d4ff" textAnchor="middle">f</text>
          <text x="550" y="312" fontFamily="'Inter',sans-serif" fontSize="14" fill="#c8c8c8" textAnchor="middle">Facebook</text>
          <circle cx="612" cy="252" r="7" fill="#80ff80" opacity=".22" />
          <circle cx="612" cy="252" r="3.5" fill="#80ff80" style={{ animation: "dotPulse 3.1s ease-in-out infinite", animationDelay: "1s" }} />

          {/* Google Maps tile */}
          <rect x="665" y="232" width="170" height="96" rx="14" fill="#0c1016" stroke="#00d4ff" strokeOpacity=".32" />
          <g transform="translate(740,244)" fill="none" stroke="#00d4ff" strokeWidth="2">
            <path d="M10 23 C10 23 18 14 18 8 A8 8 0 1 0 2 8 C2 14 10 23 10 23 Z" />
            <circle cx="10" cy="8" r="3" fill="#00d4ff" stroke="none" />
          </g>
          <text x="750" y="312" fontFamily="'Inter',sans-serif" fontSize="14" fill="#c8c8c8" textAnchor="middle">Google Maps</text>
          <circle cx="812" cy="252" r="7" fill="#80ff80" opacity=".22" />
          <circle cx="812" cy="252" r="3.5" fill="#80ff80" style={{ animation: "dotPulse 3.6s ease-in-out infinite", animationDelay: ".3s" }} />

          {/* Instagram tile */}
          <rect x="865" y="232" width="170" height="96" rx="14" fill="#0c1016" stroke="#00d4ff" strokeOpacity=".32" />
          <g transform="translate(938,246)" fill="none" stroke="#00d4ff" strokeWidth="2">
            <rect x="0" y="0" width="24" height="24" rx="7" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="18.5" cy="5.5" r="1.6" fill="#00d4ff" stroke="none" />
          </g>
          <text x="950" y="312" fontFamily="'Inter',sans-serif" fontSize="14" fill="#c8c8c8" textAnchor="middle">Instagram</text>
          <circle cx="1012" cy="252" r="7" fill="#80ff80" opacity=".22" />
          <circle cx="1012" cy="252" r="3.5" fill="#80ff80" style={{ animation: "dotPulse 3.2s ease-in-out infinite", animationDelay: ".8s" }} />
        </svg>
      </div>
    </section>
  );
}
