"use client";

import Link from "next/link";
import { useState } from "react";

export default function FinalCTASection() {
  const [open, setOpen] = useState(false);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "60vh",
        background: "#080b0f",
        fontFamily: "'Inter',sans-serif",
        color: "#c8c8c8",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "clamp(96px,12vw,180px) clamp(20px,5vw,64px)",
      }}
    >
      {/* Ambient cyan grid, radial-faded */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(0,212,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,.06) 1px,transparent 1px)",
          backgroundSize: "54px 54px",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 45%,#000 22%,transparent 75%)",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 45%,#000 22%,transparent 75%)",
          pointerEvents: "none",
        }}
      />
      {/* Ambient purple blob — glowPulse 9s */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "680px",
          height: "680px",
          maxWidth: "120%",
          background: "radial-gradient(circle at center,rgba(128,0,255,.34),transparent 62%)",
          filter: "blur(26px)",
          animation: "glowPulse 9s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "760px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Eyebrow — revealUp */}
        <div
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#00d4ff",
            marginBottom: "22px",
            animation: "revealUp .8s ease both",
          }}
        >
          Ready when you are
        </div>

        {/* Headline — revealUp */}
        <h1
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontWeight: 400,
            textTransform: "uppercase",
            fontSize: "clamp(52px,7vw,112px)",
            lineHeight: .9,
            letterSpacing: "1px",
            color: "#fafafa",
            margin: 0,
            animation: "revealUp .8s ease both",
            animationDelay: ".1s",
          }}
        >
          Let&apos;s get your phone ringing.
        </h1>

        {/* Body — revealUp */}
        <p
          style={{
            fontSize: "clamp(16px,1.3vw,19px)",
            color: "#c8c8c8",
            lineHeight: 1.7,
            margin: "28px 0 0",
            maxWidth: "600px",
            animation: "revealUp .8s ease both",
            animationDelay: ".2s",
          }}
        >
          Tell us about your business. We&apos;ll show you exactly what&apos;s costing you jobs and how to fix it. No pressure, no jargon. Just a plain look at where you&apos;re missing opportunities.
        </p>

        {/* CTA — ctaPulse animation */}
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
            width: "100%",
            animation: "revealUp .8s ease both",
            animationDelay: ".3s",
          }}
        >
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              minHeight: "48px",
              fontFamily: "'Inter',sans-serif",
              fontSize: "17px",
              fontWeight: 600,
              color: "#fff",
              background: "linear-gradient(135deg,#8000ff,#5600ab)",
              border: "none",
              padding: "17px 34px",
              borderRadius: "11px",
              // ctaPulse 3.4s — pulsing glow
              animation: "ctaPulse 3.4s ease-in-out infinite",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Get a Free Audit <span style={{ fontSize: "19px" }}>→</span>
          </Link>
          <div style={{ fontSize: "13.5px", color: "#7f8896" }}>
            Or call us:{" "}
            <a href="tel:+16615359927" style={{ color: "#9aa3b0", textDecoration: "none", fontWeight: 600 }}>
              (661) 535-9927
            </a>{" "}
            — a real person answers.
          </div>
        </div>

        {/* Iceberg */}
        <button
          onClick={() => setOpen((v) => !v)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "9px",
            marginTop: "38px",
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
          <span style={{ fontSize: "17px", lineHeight: 1 }}>⊕</span> What happens on a free audit?
        </button>

        {open && (
          <div
            style={{
              marginTop: "22px",
              maxWidth: "580px",
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
              We look at how you show up online — your site, your Google listing, your reviews — and where your competitors are beating you to the job. You get a straight read on the gaps. You decide what to do with it. No cost, no catch.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
