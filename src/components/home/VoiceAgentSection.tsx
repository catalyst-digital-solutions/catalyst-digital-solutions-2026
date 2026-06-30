"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function VoiceAgentSection() {
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
        gap: "clamp(36px,5vw,72px)",
        padding: "clamp(72px,9vw,128px) clamp(20px,5vw,64px)",
      }}
    >
      {/* COPY */}
      <div style={{ flex: "1 1 480px", minWidth: "300px", maxWidth: "620px", order: 1 }}>
        <div style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "#00d4ff", marginBottom: "18px" }}>
          Never miss a job again
        </div>

        <h2
          style={{
            fontFamily: "'Inter',sans-serif",
            fontWeight: 700,
            fontSize: "clamp(38px,4.4vw,64px)",
            lineHeight: 1.04,
            letterSpacing: "-1px",
            color: "#fafafa",
            margin: 0,
          }}
        >
          <div>Your phone rings.</div>
          {/* Gradient text — "We answer." */}
          <div
            style={{
              background: "linear-gradient(90deg,#b56bff,#00d4ff)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            We answer.
          </div>
        </h2>

        <p style={{ fontSize: "clamp(15.5px,1.1vw,17px)", color: "#c8c8c8", lineHeight: 1.7, margin: "26px 0 0", maxWidth: "540px" }}>
          You can&apos;t stop work to grab every call. So you don&apos;t have to. Our AI answers for you — day, night, weekends. It talks like a real person, finds out what the job is, and books the good ones straight onto your calendar. You&apos;re on the roof. It&apos;s working the phones.
        </p>

        <p style={{ fontSize: "clamp(21px,1.7vw,26px)", fontWeight: 600, color: "#fafafa", lineHeight: 1.3, margin: "26px 0 0" }}>
          A missed call is a missed job. Now you miss neither.
        </p>

        <button
          onClick={() => setOpen((v) => !v)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "9px",
            marginTop: "30px",
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
          <span style={{ fontSize: "17px", lineHeight: 1 }}>⊕</span> How can a robot answer my phone?
        </button>

        {open && (
          <div
            style={{
              marginTop: "22px",
              maxWidth: "560px",
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
              It&apos;s not a clunky phone tree. It&apos;s a voice assistant trained on your business — your services, your area, your prices. When a lead calls, it answers in seconds, asks the right questions, weeds out time-wasters, and books real jobs while you keep working. After hours, it still picks up. You get a text with the name, number, and what they need. No more voicemail tag.
            </p>
          </div>
        )}

        <div style={{ marginTop: "32px" }}>
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
            Get a Free Audit <span style={{ fontSize: "18px" }}>→</span>
          </Link>
        </div>
      </div>

      {/* VISUAL — voice agent card, floatY 9s */}
      <div style={{ flex: "1 1 420px", minWidth: "300px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", order: 2 }}>
        {/* Glow blob */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "540px",
            height: "540px",
            maxWidth: "120%",
            background: "radial-gradient(circle at center,rgba(128,0,255,.34),transparent 62%)",
            filter: "blur(22px)",
            animation: "glowPulse 9s ease-in-out infinite",
          }}
        />

        {/* Chat card — floatY 9s */}
        <div
          style={{
            position: "relative",
            width: "340px",
            maxWidth: "100%",
            background: "linear-gradient(180deg,#0c1016,#090c11)",
            border: "1px solid rgba(0,212,255,.25)",
            borderRadius: "28px",
            padding: "18px",
            boxShadow: "0 34px 90px rgba(0,0,0,.6)",
            animation: "floatY 9s ease-in-out infinite",
            willChange: "transform",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "2px 4px 16px",
              borderBottom: "1px solid rgba(255,255,255,.07)",
              marginBottom: "18px",
            }}
          >
            <Image
              src="/assets/cds-logo-circle.png"
              alt="Catalyst"
              width={38}
              height={38}
              style={{ borderRadius: "50%", display: "block", flexShrink: 0, boxShadow: "0 0 16px rgba(128,0,255,.5)" }}
            />
            <div>
              <div style={{ fontSize: "13.5px", fontWeight: 600, color: "#fafafa" }}>Voice Agent</div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11.5px", color: "#80ff80", marginTop: "2px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#80ff80", boxShadow: "0 0 9px #80ff80" }} />
                Active 24/7
              </div>
            </div>
          </div>

          {/* Incoming call — fadeUp delay 0.2s */}
          <div
            className="anim-fadeup"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "11px",
              background: "rgba(0,212,255,.07)",
              border: "1px solid rgba(0,212,255,.22)",
              borderRadius: "12px",
              padding: "11px 13px",
              marginBottom: "18px",
              opacity: 0,
              animation: "fadeUp .55s ease forwards",
              animationDelay: ".2s",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#fafafa" }}>Incoming call — Mike R.</div>
              <div style={{ fontSize: "11.5px", color: "#7f8896" }}>Answered in 2 seconds</div>
            </div>
          </div>

          {/* Chat messages */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "18px" }}>
            {/* Customer — fadeUp delay 0.6s */}
            <div
              className="anim-fadeup"
              style={{
                alignSelf: "flex-start",
                maxWidth: "84%",
                background: "rgba(255,255,255,.06)",
                borderRadius: "14px 14px 14px 4px",
                padding: "11px 14px",
                fontSize: "13px",
                color: "#d6dae0",
                lineHeight: 1.5,
                opacity: 0,
                animation: "fadeUp .55s ease forwards",
                animationDelay: ".6s",
              }}
            >
              &ldquo;Hi, do you do bathroom remodels? Looking to get one done soon.&rdquo;
            </div>

            {/* Agent — fadeUp delay 1.0s */}
            <div
              className="anim-fadeup"
              style={{
                alignSelf: "flex-end",
                maxWidth: "88%",
                background: "linear-gradient(135deg,#8000ff,#5600ab)",
                borderRadius: "14px 14px 4px 14px",
                padding: "11px 14px",
                fontSize: "13px",
                color: "#fff",
                lineHeight: 1.5,
                opacity: 0,
                animation: "fadeUp .55s ease forwards",
                animationDelay: "1s",
              }}
            >
              &ldquo;We do, Mike. I can book your free estimate this Friday at 10 AM — does that work?&rdquo;
            </div>

            {/* Customer — fadeUp delay 1.4s */}
            <div
              className="anim-fadeup"
              style={{
                alignSelf: "flex-start",
                maxWidth: "70%",
                background: "rgba(255,255,255,.06)",
                borderRadius: "14px 14px 14px 4px",
                padding: "11px 14px",
                fontSize: "13px",
                color: "#d6dae0",
                lineHeight: 1.5,
                opacity: 0,
                animation: "fadeUp .55s ease forwards",
                animationDelay: "1.4s",
              }}
            >
              &ldquo;Yeah, Friday works.&rdquo;
            </div>
          </div>

          {/* Job booked — fadeUp delay 1.85s */}
          <div
            className="anim-fadeup"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "rgba(128,255,128,.08)",
              border: "1px solid rgba(128,255,128,.3)",
              borderRadius: "12px",
              padding: "13px 15px",
              opacity: 0,
              animation: "fadeUp .55s ease forwards",
              animationDelay: "1.85s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <span style={{ color: "#80ff80", fontSize: "15px" }}>✓</span>
              <span style={{ fontSize: "13.5px", fontWeight: 600, color: "#80ff80" }}>Job booked</span>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#c8c8c8" }}>
              FRI · 10:00 AM
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
