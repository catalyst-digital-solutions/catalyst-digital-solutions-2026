"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProofSection() {
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
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(40px,5vw,80px)",
        padding: "clamp(72px,9vw,128px) clamp(20px,5vw,64px)",
      }}
    >
      {/* COPY */}
      <div style={{ flex: "1 1 440px", minWidth: "300px", maxWidth: "560px", order: 1 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "13px", fontWeight: 500, letterSpacing: "3px", textTransform: "uppercase", color: "#00d4ff", marginBottom: "22px" }}>
          PROOF WE CAN
        </div>

        <h1
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontWeight: 400,
            textTransform: "uppercase",
            fontSize: "clamp(46px,5.4vw,86px)",
            lineHeight: .9,
            letterSpacing: "1px",
            color: "#fafafa",
            margin: 0,
          }}
        >
          We&apos;d rather prove it than promise it.
        </h1>

        <p style={{ fontSize: "clamp(16px,1.2vw,18px)", color: "#c8c8c8", lineHeight: 1.7, margin: "28px 0 0", maxWidth: "500px" }}>
          We&apos;re not going to show you a wall of five-star reviews. We&apos;d rather show you what we can do for your company. Right now.
        </p>
        <p style={{ fontSize: "clamp(15.5px,1.1vw,17px)", color: "#c8c8c8", lineHeight: 1.7, margin: "18px 0 0", maxWidth: "500px" }}>
          Want proof we can build sites that win work? Here are two. Real, live websites built for contractors. Fast, professional, built to bring in jobs. That&apos;s our mission.
        </p>

        <div style={{ marginTop: "34px" }}>
          <div style={{ fontSize: "15px", fontWeight: 600, color: "#c8c8c8", marginBottom: "14px" }}>See ones we built</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
            {/* Apex — amber gradient, exact from reference */}
            <a
              href="https://construction1.catalyst-demos.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                minHeight: "48px",
                fontFamily: "'Inter',sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                color: "#fff",
                background: "linear-gradient(135deg,#ffad39,#d17f12)",
                border: "none",
                padding: "15px 28px",
                borderRadius: "11px",
                boxShadow: "0 10px 34px rgba(255,173,57,.34)",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Apex Construction <span style={{ fontSize: "18px" }}>→</span>
            </a>
            {/* Holloway — red gradient, exact from reference */}
            <a
              href="https://construction2.catalyst-demos.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                minHeight: "48px",
                fontFamily: "'Inter',sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                color: "#fff",
                background: "linear-gradient(135deg,#b0202f,#771420)",
                border: "none",
                padding: "15px 28px",
                borderRadius: "11px",
                boxShadow: "0 10px 34px rgba(176,32,47,.38)",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Holloway General Contractors <span style={{ fontSize: "18px" }}>→</span>
            </a>
          </div>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "26px",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "'Inter',sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            color: "#8000ff",
          }}
        >
          <span style={{ fontSize: "15px", lineHeight: 1 }}>⊕</span> Why show instead of tell?
        </button>

        {open && (
          <div
            style={{
              marginTop: "16px",
              maxWidth: "500px",
              borderLeft: "2px solid #8000ff",
              padding: "4px 0 4px 18px",
              animation: "panelIn .42s ease",
            }}
          >
            <p style={{ fontSize: "14px", color: "#c8c8c8", lineHeight: 1.65, margin: 0 }}>
              Reviews tell you other people liked us. A finished site shows you we can do the work. Click through it yourself — then you don&apos;t have to take our word for anything.
            </p>
          </div>
        )}
      </div>

      {/* BROWSER FRAMES — exact layout from reference */}
      <div
        style={{
          flex: "1 1 480px",
          minWidth: "300px",
          maxWidth: "680px",
          position: "relative",
          order: 2,
          padding: "38px 38px 0 0",
        }}
      >
        {/* Glow blob */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "130%",
            height: "130%",
            background: "radial-gradient(circle,rgba(128,0,255,.22),transparent 64%)",
            filter: "blur(20px)",
            pointerEvents: "none",
          }}
        />
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: "-6%",
            backgroundImage: "linear-gradient(rgba(0,212,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,.06) 1px,transparent 1px)",
            backgroundSize: "54px 54px",
            WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 50%,#000 25%,transparent 78%)",
            maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%,#000 25%,transparent 78%)",
            pointerEvents: "none",
          }}
        />

        {/* BACK FRAME: Holloway — absolute, top:0, right:0, width:84%, floatY 11s delay .6s */}
        <a
          href="https://construction2.catalyst-demos.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Holloway demo site"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "84%",
            display: "block",
            textDecoration: "none",
            background: "rgba(255,255,255,.025)",
            border: "1px solid rgba(255,255,255,.09)",
            borderRadius: "14px",
            overflow: "hidden",
            boxShadow: "0 22px 60px rgba(0,0,0,.5)",
            animation: "floatY 11s ease-in-out infinite .6s",
            zIndex: 1,
            willChange: "transform",
          }}
        >
          {/* Chrome */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "11px 14px", background: "rgba(255,255,255,.03)", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
            <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
              <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#ff5f57" }} />
              <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#febc2e" }} />
              <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#28c840" }} />
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", background: "rgba(0,0,0,.35)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "8px", padding: "5px 11px", minWidth: 0 }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#80ff80" strokeWidth="2" style={{ flexShrink: 0 }}>
                <rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11.5px", color: "#d6dae0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                construction2.catalyst-demos.com
              </span>
            </div>
          </div>
          <div style={{ position: "relative", overflow: "hidden" }}>
            <Image
              src="/assets/demo-site-holloway.png"
              alt="Holloway Construction Group demo site"
              width={600}
              height={400}
              style={{ display: "block", width: "100%", height: "auto" }}
            />
          </div>
        </a>

        {/* FRONT FRAME: Apex — relative, margin-top:130px, width:84%, floatY 10s */}
        <a
          href="https://construction1.catalyst-demos.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Apex Construction demo site"
          style={{
            position: "relative",
            top: 0,
            left: 0,
            width: "84%",
            marginTop: "130px",
            display: "block",
            textDecoration: "none",
            background: "rgba(255,255,255,.025)",
            border: "1px solid rgba(255,255,255,.09)",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 30px 80px rgba(0,0,0,.6)",
            animation: "floatY 10s ease-in-out infinite",
            zIndex: 2,
            willChange: "transform",
          }}
        >
          {/* Chrome */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "13px 16px", background: "rgba(255,255,255,.03)", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
            <div style={{ display: "flex", gap: "7px", flexShrink: 0 }}>
              <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#ff5f57" }} />
              <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#febc2e" }} />
              <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#28c840" }} />
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", background: "rgba(0,0,0,.35)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "8px", padding: "6px 12px", minWidth: 0 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#80ff80" strokeWidth="2" style={{ flexShrink: 0 }}>
                <rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12.5px", color: "#d6dae0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                construction1.catalyst-demos.com
              </span>
            </div>
          </div>
          <div style={{ position: "relative", overflow: "hidden" }}>
            <Image
              src="/assets/demo-site.webp"
              alt="Apex Design-Build demo site"
              width={600}
              height={400}
              style={{ display: "block", width: "100%", height: "auto" }}
            />
          </div>
        </a>
      </div>
    </section>
  );
}
