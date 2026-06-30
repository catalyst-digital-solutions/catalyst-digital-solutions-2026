"use client";

import { useState } from "react";

export default function ProspectSection() {
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
      {/* VISUAL — phone mockup */}
      <div
        style={{
          flex: "1 1 420px",
          minWidth: "300px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Glow blob */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "520px",
            height: "520px",
            maxWidth: "120%",
            background: "radial-gradient(circle at center,rgba(128,0,255,.28),transparent 64%)",
            filter: "blur(24px)",
          }}
        />

        {/* Phone frame */}
        <div
          style={{
            position: "relative",
            width: "332px",
            maxWidth: "100%",
            background: "linear-gradient(180deg,#0c1016,#090c11)",
            border: "1px solid rgba(0,212,255,.25)",
            borderRadius: "28px",
            padding: "18px 18px 26px",
            boxShadow: "0 34px 90px rgba(0,0,0,.6)",
            overflow: "hidden",
            minHeight: "472px",
          }}
        >
          {/* Scanning line — scan 5.5s */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: "42px",
              background: "linear-gradient(180deg,rgba(0,212,255,.22),transparent)",
              borderTop: "1px solid rgba(0,212,255,.7)",
              boxShadow: "0 0 18px rgba(0,212,255,.5)",
              animation: "scan 5.5s cubic-bezier(.4,0,.6,1) infinite",
              pointerEvents: "none",
              zIndex: 3,
            }}
          />

          {/* Notch */}
          <div
            style={{
              width: "88px",
              height: "6px",
              borderRadius: "6px",
              background: "rgba(255,255,255,.1)",
              margin: "2px auto 18px",
            }}
          />

          {/* Search bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: "11px",
              padding: "10px 13px",
              marginBottom: "26px",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5b6470" strokeWidth="2.2">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.5" y2="16.5" />
            </svg>
            <span style={{ fontSize: "13px", color: "#5b6470" }}>john&apos;s custom builders</span>
          </div>

          {/* Profile */}
          <div style={{ display: "flex", alignItems: "center", gap: "13px", marginBottom: "24px" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "rgba(255,255,255,.05)",
                border: "1px dashed rgba(255,255,255,.14)",
                flexShrink: 0,
              }}
            />
            <div>
              <div style={{ fontSize: "15px", fontWeight: 600, color: "#c8c8c8" }}>John&apos;s Custom Builders</div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "3px", fontSize: "12.5px", color: "#7f8896" }}>
                <span style={{ color: "#00d4ff" }}>★</span> 1 review
              </div>
            </div>
          </div>

          {/* Linktree-style links */}
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: ".5px", color: "#5b6470", marginBottom: "10px" }}>
            linktr.ee/jcbuilders
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "26px" }}>
            {["Facebook", "Call us"].map((item) => (
              <div
                key={item}
                style={{
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: "10px",
                  padding: "12px",
                  textAlign: "center",
                  fontSize: "13px",
                  color: "#7f8896",
                }}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Dead socials */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", opacity: .32 }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ width: "30px", height: "30px", borderRadius: "8px", border: "1px solid rgba(255,255,255,.25)" }} />
            ))}
          </div>
          <div style={{ fontSize: "11.5px", color: "#5b6470", marginTop: "12px" }}>No posts since 2021</div>
        </div>
      </div>

      {/* COPY */}
      <div style={{ flex: "1 1 480px", minWidth: "300px", maxWidth: "620px" }}>
        <div style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "#00d4ff", marginBottom: "18px" }}>
          Before they ever call you
        </div>

        <h2
          style={{
            fontFamily: "'Inter',sans-serif",
            fontWeight: 700,
            fontSize: "clamp(32px,3.6vw,52px)",
            lineHeight: 1.08,
            letterSpacing: "-.5px",
            color: "#fafafa",
            margin: 0,
          }}
        >
          If a prospect looks you up, what do they find?
        </h2>

        <p style={{ fontSize: "clamp(15.5px,1.1vw,17px)", color: "#c8c8c8", lineHeight: 1.7, margin: "24px 0 0", maxWidth: "540px" }}>
          Before anyone hires you, they Google you. Your next big client might be doing it right now. So what shows up? A sharp website that makes you look like the pro you are? Real reviews? Completed job photos?
        </p>

        <p style={{ fontSize: "clamp(26px,1.8vw,28px)", fontWeight: 700, color: "#fafafa", lineHeight: 1.3, margin: "26px 0 0" }}>
          Or do they just find a{" "}
          <span
            style={{
              background: "linear-gradient(90deg,#b56bff,#00d4ff)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Linktree
          </span>
          ?
        </p>

        <p style={{ fontSize: "clamp(15.5px,1.1vw,17px)", color: "#c8c8c8", lineHeight: 1.7, margin: "20px 0 0", maxWidth: "540px" }}>
          A dead Facebook page. One old review. Maybe nothing at all.<br /><br />
          The hard reality: if you look small online, you lose to the guy who looks more professional — even if your work is better.
        </p>

        {/* Iceberg trigger */}
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
          <span style={{ fontSize: "17px", lineHeight: 1 }}>⊕</span> What should they find?
        </button>

        {open && (
          <div
            style={{
              marginTop: "22px",
              maxWidth: "560px",
              background: "linear-gradient(180deg,rgba(20,16,32,.92),rgba(10,8,18,.92))",
              border: "1px solid rgba(128,0,255,.3)",
              borderRadius: "16px",
              padding: "26px 28px",
              backdropFilter: "blur(8px)",
              boxShadow: "0 24px 60px rgba(0,0,0,.5)",
              animation: "panelIn .35s ease",
            }}
          >
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11.5px", letterSpacing: "1px", textTransform: "uppercase", color: "#7f8896", marginBottom: "18px" }}>
              Six things a prospect checks in under a minute
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 26px" }}>
              {[
                "A fast, modern website",
                "A Google listing that shows on the map",
                "Reviews — count and stars",
                "Photos of finished work",
                "Signs you're active, not abandoned",
                "Proof other people trust you",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span
                    style={{
                      flexShrink: 0,
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      border: "1px solid rgba(0,212,255,.5)",
                      color: "#00d4ff",
                      fontSize: "12px",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: "14.5px", color: "#d6dae0", lineHeight: 1.45 }}>{item}</span>
                </div>
              ))}
            </div>
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                marginTop: "24px",
                fontFamily: "'Inter',sans-serif",
                fontSize: "15px",
                fontWeight: 600,
                color: "#fff",
                background: "linear-gradient(135deg,#8000ff,#5600ab)",
                border: "none",
                padding: "14px 24px",
                borderRadius: "11px",
                boxShadow: "0 10px 30px rgba(128,0,255,.4)",
                cursor: "pointer",
              }}
            >
              See how you score — Get a Free Audit <span style={{ fontSize: "17px" }}>→</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
