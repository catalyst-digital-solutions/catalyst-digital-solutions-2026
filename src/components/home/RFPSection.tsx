"use client";

import Link from "next/link";
import { useState } from "react";

/* Animated connector — horizontal (desktop) / vertical down-arrow (mobile) */
function Connector({ delay = "0s" }: { delay?: string }) {
  return (
    <>
      {/* Horizontal — desktop only */}
      <div className="rfp-connector-h" style={{ flex: "0 0 64px", display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "center", height: "40px" }}>
        <div style={{ position: "relative", width: "60px", height: "2px", background: "linear-gradient(90deg,rgba(128,0,255,.2),rgba(128,0,255,.85))" }}>
          <div style={{ position: "absolute", top: "50%", left: 0, width: "7px", height: "7px", borderRadius: "50%", background: "#b56bff", boxShadow: "0 0 10px #8000ff", transform: "translate(0,-50%)", animation: "dotRun 2.8s ease-in-out infinite", animationDelay: delay }} />
          <div style={{ position: "absolute", right: "-3px", top: "50%", width: "7px", height: "7px", borderRight: "2px solid #8000ff", borderTop: "2px solid #8000ff", transform: "translate(0,-50%) rotate(45deg)" }} />
        </div>
      </div>
      {/* Vertical — mobile only */}
      <div className="rfp-connector-v" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "4px 0", width: "100%" }}>
        <svg width="24" height="32" viewBox="0 0 24 32" fill="none" aria-hidden="true">
          <line x1="12" y1="0" x2="12" y2="24" stroke="#8000ff" strokeOpacity=".7" strokeWidth="2" strokeDasharray="4 3" style={{ animation: `flow 2s linear infinite`, animationDelay: delay }} />
          <path d="M6 20 L12 28 L18 20" stroke="#8000ff" strokeOpacity=".85" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
    </>
  );
}

export default function RFPSection() {
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
        gap: "clamp(40px,5vw,68px)",
        padding: "clamp(72px,9vw,128px) clamp(20px,5vw,64px)",
      }}
    >
      {/* Text block */}
      <div style={{ textAlign: "center", maxWidth: "840px" }}>
        <div style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "#00d4ff", marginBottom: "18px" }}>
          Stop hunting for bids
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
          Your estimator should be bidding. Not hunting.
        </h2>
        <p style={{ fontSize: "clamp(15.5px,1.1vw,17px)", color: "#c8c8c8", lineHeight: 1.7, margin: "24px auto 0", maxWidth: "700px" }}>
          Right now, somebody on your team burns hours digging through government websites looking for jobs to bid on — and still misses half of them. Our system does it for you, around the clock, and drops the right jobs straight in your inbox.
        </p>
        <p style={{ fontSize: "clamp(21px,1.7vw,26px)", fontWeight: 600, color: "#fafafa", lineHeight: 1.3, margin: "26px 0 0" }}>
          More bids submitted. Way less time finding them.
        </p>
      </div>

      {/* 3-step flow — horizontal on desktop, vertical on mobile */}
      <div
        className="rfp-steps"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "stretch",
          justifyContent: "center",
          gap: "16px",
          width: "100%",
          maxWidth: "1080px",
        }}
      >
        {/* STEP 1 */}
        <div className="rfp-step-card" style={{ flex: "1 1 290px", minWidth: "258px", maxWidth: "340px", background: "linear-gradient(180deg,#0c1016,#090c11)", border: "1px solid rgba(0,212,255,.28)", borderRadius: "18px", padding: "22px", display: "flex", flexDirection: "column", boxShadow: "0 24px 60px rgba(0,0,0,.4)" }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "2px", color: "#00d4ff", marginBottom: "6px" }}>STEP 1</div>
          <div style={{ fontSize: "18px", fontWeight: 600, color: "#fafafa", marginBottom: "16px" }}>Thousands of public bids</div>
          <div style={{ position: "relative", flex: 1, minHeight: "152px" }}>
            {/* Scattered document cards */}
            {[
              { left: "4px",   top: "8px",  rotate: "-8deg",  bc: "rgba(0,212,255,.32)",  bg: "rgba(0,212,255,.04)",  w1: "70%", anim: "" },
              { left: "70px",  top: "2px",  rotate: "6deg",   bc: "rgba(128,0,255,.4)",   bg: "rgba(128,0,255,.05)",  w1: "60%", anim: "" },
              { left: "134px", top: "12px", rotate: "-4deg",  bc: "rgba(0,212,255,.3)",   bg: "rgba(0,212,255,.04)",  w1: "72%", anim: "dotPulse 3s ease-in-out infinite" },
              { left: "196px", top: "6px",  rotate: "11deg",  bc: "rgba(0,212,255,.28)",  bg: "rgba(0,212,255,.04)",  w1: "64%", anim: "" },
              { left: "28px",  top: "52px", rotate: "7deg",   bc: "rgba(0,212,255,.3)",   bg: "rgba(0,212,255,.04)",  w1: "58%", anim: "" },
              { left: "96px",  top: "48px", rotate: "-6deg",  bc: "rgba(128,0,255,.38)",  bg: "rgba(128,0,255,.05)",  w1: "66%", anim: "dotPulse 3.6s ease-in-out infinite", animDelay: ".6s" },
              { left: "162px", top: "54px", rotate: "4deg",   bc: "rgba(0,212,255,.3)",   bg: "rgba(0,212,255,.04)",  w1: "70%", anim: "" },
              { left: "0px",   top: "96px", rotate: "-5deg",  bc: "rgba(0,212,255,.28)",  bg: "rgba(0,212,255,.04)",  w1: "62%", anim: "" },
              { left: "66px",  top: "92px", rotate: "9deg",   bc: "rgba(0,212,255,.3)",   bg: "rgba(0,212,255,.04)",  w1: "68%", anim: "" },
              { left: "132px", top: "98px", rotate: "-7deg",  bc: "rgba(128,0,255,.36)",  bg: "rgba(128,0,255,.05)",  w1: "60%", anim: "" },
              { left: "194px", top: "94px", rotate: "6deg",   bc: "rgba(0,212,255,.28)",  bg: "rgba(0,212,255,.04)",  w1: "66%", anim: "dotPulse 3.3s ease-in-out infinite", animDelay: "1s" },
            ].map((d, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: d.left,
                  top: d.top,
                  width: "54px",
                  height: "30px",
                  border: `1px solid ${d.bc}`,
                  borderRadius: "5px",
                  background: d.bg,
                  transform: `rotate(${d.rotate})`,
                  padding: "5px",
                  animation: d.anim || undefined,
                  animationDelay: (d as { animDelay?: string }).animDelay,
                }}
              >
                <div style={{ height: "3px", width: d.w1, background: d.bc.includes("128,0,255") ? "rgba(181,107,255,.45)" : "rgba(0,212,255,.35)", borderRadius: "2px", marginBottom: "4px" }} />
                <div style={{ height: "3px", width: "45%", background: "rgba(255,255,255,.16)", borderRadius: "2px" }} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "14px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11.5px", color: "#7f8896" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#00d4ff", boxShadow: "0 0 8px #00d4ff" }} />
            scanned 24/7
          </div>
        </div>

        <Connector delay="0s" />

        {/* STEP 2 */}
        <div className="rfp-step-card" style={{ flex: "1 1 290px", minWidth: "258px", maxWidth: "340px", background: "linear-gradient(180deg,#0c1016,#090c11)", border: "1px solid rgba(0,212,255,.28)", borderRadius: "18px", padding: "22px", display: "flex", flexDirection: "column", boxShadow: "0 24px 60px rgba(0,0,0,.4)" }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "2px", color: "#00d4ff", marginBottom: "6px" }}>STEP 2</div>
          <div style={{ fontSize: "18px", fontWeight: 600, color: "#fafafa", marginBottom: "16px" }}>Filtered for you</div>
          <div style={{ flex: 1, minHeight: "152px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 240 172" style={{ width: "100%", maxWidth: "240px", height: "auto" }} fill="none" aria-hidden="true">
              <circle cx="56" cy="12" r="3" fill="#00d4ff" opacity=".7" />
              <circle cx="92" cy="8" r="3" fill="#b56bff" opacity=".7" style={{ animation: "dotPulse 3s ease-in-out infinite" }} />
              <circle cx="128" cy="13" r="3" fill="#00d4ff" opacity=".7" />
              <circle cx="160" cy="9" r="3" fill="#b56bff" opacity=".7" />
              <circle cx="190" cy="14" r="3" fill="#00d4ff" opacity=".7" style={{ animation: "dotPulse 3.4s ease-in-out infinite", animationDelay: ".5s" }} />
              <circle cx="74" cy="20" r="2.5" fill="#00d4ff" opacity=".5" />
              <circle cx="146" cy="20" r="2.5" fill="#00d4ff" opacity=".5" />
              <path d="M40 28 L200 28 L138 100 L138 132 L102 132 L102 100 Z" stroke="#00d4ff" strokeOpacity=".55" strokeWidth="1.6" />
              <circle cx="120" cy="64" r="2.5" fill="#b56bff" opacity=".8" style={{ animation: "dotPulse 2.6s ease-in-out infinite" }} />
              <circle cx="120" cy="150" r="3.5" fill="#80ff80" style={{ animation: "dotPulse 3s ease-in-out infinite" }} />
              <circle cx="120" cy="150" r="7" fill="#80ff80" opacity=".22" />
            </svg>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "14px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#7f8896", lineHeight: 1.4 }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#8000ff", boxShadow: "0 0 8px #8000ff", flexShrink: 0 }} />
            matched to your trade, license &amp; area
          </div>
        </div>

        <Connector delay=".9s" />

        {/* STEP 3 */}
        <div className="rfp-step-card" style={{ flex: "1 1 290px", minWidth: "258px", maxWidth: "340px", background: "linear-gradient(180deg,#0c1016,#090c11)", border: "1px solid rgba(0,212,255,.28)", borderRadius: "18px", padding: "22px", display: "flex", flexDirection: "column", boxShadow: "0 24px 60px rgba(0,0,0,.4)" }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "2px", color: "#00d4ff", marginBottom: "6px" }}>STEP 3</div>
          <div style={{ fontSize: "18px", fontWeight: 600, color: "#fafafa", marginBottom: "16px" }}>In your inbox</div>
          <div style={{ flex: 1, minHeight: "152px", display: "flex", flexDirection: "column", gap: "9px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2">
                <path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
              </svg>
              <span style={{ fontSize: "12.5px", color: "#9aa3b0" }}>New jobs · 3</span>
            </div>
            {[
              { name: "School District Reroof", date: "Public bid · due Aug 12" },
              { name: "City Parking Structure", date: "Public bid · due Aug 20" },
              { name: "Community Center HVAC", date: "Public bid · due Sep 03" },
            ].map((job) => (
              <div
                key={job.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "rgba(255,255,255,.03)",
                  border: "1px solid rgba(255,255,255,.07)",
                  borderRadius: "10px",
                  padding: "10px 12px",
                }}
              >
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#80ff80", boxShadow: "0 0 8px #80ff80", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#fafafa" }}>{job.name}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "10.5px", color: "#7f8896", marginTop: "2px" }}>{job.date}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "14px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11.5px", color: "#7f8896" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#80ff80", boxShadow: "0 0 8px #80ff80" }} />
            ready to bid
          </div>
        </div>
      </div>

      {/* Stat chip */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(128,255,128,.08)", border: "1px solid rgba(128,255,128,.32)", borderRadius: "100px", padding: "13px 24px" }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#80ff80" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
        <span style={{ fontSize: "clamp(15px,1.3vw,18px)", fontWeight: 600, color: "#80ff80" }}>15+ hours saved every week.</span>
      </div>

      {/* Iceberg */}
      <div style={{ display: "flex", justifyContent: "center" }}>
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
          <span style={{ fontSize: "17px", lineHeight: 1 }}>⊕</span> What is Construction RFP AI?
        </button>
      </div>

      {open && (
        <div
          style={{
            margin: "-24px auto 0",
            maxWidth: "620px",
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
            It watches thousands of public bid portals 24/7, filters every opportunity by your trade, license, and area, and sends you only the ones that fit. It can even track what your competitors are bidding. Tools that do a fraction of this run $20,000+ a year. Ours is $497/mo on its own — or free inside our top tier.
          </p>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link
          href="/contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: "'Inter',sans-serif",
            fontSize: "16px",
            fontWeight: 600,
            color: "#fff",
            background: "linear-gradient(135deg,#8000ff,#5600ab)",
            border: "none",
            padding: "16px 30px",
            borderRadius: "11px",
            boxShadow: "0 10px 34px rgba(128,0,255,.4)",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          Show me the bids I&apos;m missing <span style={{ fontSize: "18px" }}>→</span>
        </Link>
      </div>
    </section>
  );
}
