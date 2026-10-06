"use client";

import { useMemo, useState } from "react";

const AGREEMENT_HREF = "https://terms.catalyst-digital-solutions.com/atara";
const PRIVACY_HREF = "https://catalyst-digital-solutions.com/privacy";
const MARIO_MAILTO = "mailto:mario@catalyst-digital.solutions";

const INCLUDED = [
  "16-page strategic website build",
  "Custom Atara-branded design",
  "SEO + GEO architecture",
  "Residential + commercial HVAC positioning",
  "Housecall Pro scheduling integration",
  "Financing integration",
  "Real review integration",
  "Atara AI Website Assistant",
  "Responsive mobile-first development",
];

type AtaraCheckoutProps = {
  kickoffUrl?: string;
  fullUrl?: string;
  startAccepted?: boolean;
  lambPose?: "Thumbs up" | "Hand on hip";
  lambMotion?: boolean;
  showLamb?: boolean;
};

function CheckIcon({ stroke }: { stroke: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ marginTop: 1 }}>
      <circle cx="10" cy="10" r="9" stroke={stroke} strokeWidth="1.5" />
      <path
        d="M6 10.2l2.6 2.6L14 7.4"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DownArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M7 1.5v10M2.5 7.5L7 12l4.5-4.5"
        stroke="#0F2E57"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AtaraCheckout({
  kickoffUrl,
  fullUrl,
  startAccepted = false,
  lambPose = "Thumbs up",
  lambMotion = true,
  showLamb = true,
}: AtaraCheckoutProps) {
  const [accepted, setAccepted] = useState(!!startAccepted);

  const lambSrc =
    lambPose === "Hand on hip"
      ? "/atara/lamb-one-hand-on-hip.webp"
      : "/atara/lamb-cool-thumbs-up-hires.webp";

  const kickoffReady = accepted && Boolean(kickoffUrl);
  const fullReady = accepted && Boolean(fullUrl);

  const panel = useMemo(
    () => ({
      panelBg: accepted ? "#F6FAFE" : "#FFFFFF",
      panelBorder: accepted ? "#1E6FE6" : "#D5DCE4",
      panelShadow: accepted ? "0 0 0 4px rgba(30,111,230,0.08)" : "0 1px 2px rgba(11,27,46,0.04)",
      dividerColor: accepted ? "#CFE0EE" : "#E3E8EE",
      boxBg: accepted ? "#1E6FE6" : "#FFFFFF",
      boxBorder: accepted ? "#1E6FE6" : "#8A96A6",
      boxRing: accepted ? "0 0 0 4px rgba(30,111,230,0.15)" : "none",
      checkOpacity: accepted ? 1 : 0,
      checkScale: accepted ? 1 : 0.6,
    }),
    [accepted],
  );

  const buttonLook = (ready: boolean) => ({
    background: ready ? "#E8692A" : "#E9EDF2",
    color: ready ? "#0B1B2E" : "#5B6676",
    border: `1px solid ${ready ? "#E8692A" : "#D5DCE4"}`,
    cursor: ready ? "pointer" : "not-allowed",
    boxShadow: ready ? "0 10px 24px -12px rgba(232,105,42,0.65)" : "none",
  });

  const go = (url: string | undefined) => {
    if (!url) return;
    window.location.assign(url);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "var(--font-archivo), 'Archivo', system-ui, sans-serif",
        color: "#2A2F36",
        background: "#F5F7F9",
      }}
    >
      <div data-screen-label="Hero" style={{ background: "#0B1B2E", color: "#F5F7F9", position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            left: "-30vw",
            top: "-10vw",
            width: "90vw",
            height: "90vw",
            maxWidth: 1400,
            maxHeight: 1400,
            borderRadius: "50%",
            border: "1px solid rgba(34,196,224,0.10)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-20vw",
            bottom: "-60vw",
            width: "80vw",
            height: "80vw",
            borderRadius: "50%",
            border: "1px solid rgba(34,196,224,0.07)",
            pointerEvents: "none",
          }}
        />
        {showLamb ? (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              right: "max(0px,calc((100vw - 1120px) / 2 - 60px))",
              height: "clamp(230px,calc(90vw - 400px),900px)",
              transform: "translateY(calc(44% - clamp(44px,5vw,72px)))",
              pointerEvents: "none",
            }}
          >
            <img
              className={lambMotion ? "lamb-mascot" : undefined}
              src={lambSrc}
              alt=""
              style={
                lambMotion
                  ? undefined
                  : {
                      height: "100%",
                      width: "auto",
                      display: "block",
                      filter: "drop-shadow(0 18px 24px rgba(0,0,0,0.28))",
                    }
              }
            />
          </div>
        ) : null}

        <header
          style={{
            position: "relative",
            maxWidth: 1120,
            margin: "0 auto",
            padding: "18px clamp(20px,5vw,48px)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(12px,2vw,20px)" }}>
            <img
              src="/atara/atara-logo.webp"
              alt="Atara Mechanical"
              style={{ width: "clamp(52px,6vw,64px)", height: "auto", display: "block" }}
            />
            <span
              style={{
                fontFamily: "var(--font-ibm-plex-mono), 'IBM Plex Mono', monospace",
                fontSize: 16,
                color: "#7A8EA3",
              }}
              aria-hidden="true"
            >
              ×
            </span>
            <img
              src="/atara/catalyst-banner-white.svg"
              alt="Catalyst Digital Solutions"
              style={{ height: "clamp(26px,3vw,30px)", width: "auto", display: "block" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font-ibm-plex-mono), 'IBM Plex Mono', monospace",
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#B4C1CF",
            }}
          >
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
              <rect x="1" y="6" width="10" height="7" rx="1.5" stroke="#22C4E0" strokeWidth="1.5" />
              <path d="M3.5 6V4.2a2.5 2.5 0 0 1 5 0V6" stroke="#22C4E0" strokeWidth="1.5" />
            </svg>
            <span>Private Project Checkout</span>
          </div>
        </header>

        <div
          style={{
            position: "relative",
            maxWidth: 1120,
            margin: "0 auto",
            padding: "clamp(48px,8vw,104px) clamp(20px,5vw,48px) clamp(176px,16vw,196px)",
          }}
        >
          <div style={{ maxWidth: 620, display: "flex", flexDirection: "column", gap: "clamp(16px,2vw,22px)" }}>
            <div
              style={{
                fontFamily: "var(--font-ibm-plex-mono), 'IBM Plex Mono', monospace",
                fontSize: 12,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#22C4E0",
                display: "flex",
                flexWrap: "wrap",
                gap: "8px 14px",
                alignItems: "center",
              }}
            >
              <span>Prepared for Brittany & Omar Lopez</span>
              <span style={{ width: 28, height: 1, background: "#22C4E0", opacity: 0.6 }} />
              <span>Atara Mechanical, Inc.</span>
            </div>
            <h1
              style={{
                margin: 0,
                fontWeight: 800,
                fontStretch: "112%",
                fontSize: "clamp(44px,7.2vw,84px)",
                lineHeight: 0.98,
                letterSpacing: "-0.025em",
                textWrap: "balance",
              }}
            >
              Ready when you are.
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(18px,2vw,22px)",
                lineHeight: 1.45,
                color: "#C9D3DE",
                maxWidth: 520,
                textWrap: "pretty",
              }}
            >
              Choose how you’d like to begin the Atara Mechanical website build.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 4,
                fontWeight: 600,
                fontSize: "clamp(15px,1.6vw,17px)",
                color: "#F5F7F9",
              }}
            >
              <span style={{ width: 22, height: 2, background: "#E8692A", borderRadius: 2 }} />
              <span>We’ll take it from here.</span>
            </div>
          </div>
        </div>
      </div>

      <main style={{ flex: 1, width: "100%", maxWidth: 1120, margin: "0 auto", padding: "0 clamp(16px,5vw,48px)" }}>
        <section
          data-screen-label="Payment choices"
          aria-label="Payment options"
          style={{ position: "relative", marginTop: "calc(-1 * clamp(44px,5vw,72px))" }}
        >
          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))",
              gap: "clamp(16px,2.4vw,24px)",
            }}
          >
            <article
              className="pay-card"
              style={{
                background: "linear-gradient(155deg,#E4F3FC 0%,#C9E6F8 55%,#A9D6F3 100%)",
                border: "1px solid #B7D9EF",
                borderRadius: 14,
                padding: "clamp(24px,3.4vw,40px)",
                display: "flex",
                flexDirection: "column",
                gap: 18,
                boxShadow: "0 1px 2px rgba(11,27,46,0.06),0 16px 36px -20px rgba(11,27,46,0.30)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-ibm-plex-mono), 'IBM Plex Mono', monospace",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#0F2E57",
                }}
              >
                Kickoff payment
              </div>
              <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "4px 12px" }}>
                <span
                  style={{
                    fontWeight: 800,
                    fontStretch: "108%",
                    fontSize: "clamp(48px,6vw,64px)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    color: "#0B1B2E",
                  }}
                >
                  $4,000
                </span>
                <span style={{ fontWeight: 600, fontSize: "clamp(18px,2vw,22px)", color: "#1D3A5C" }}>today</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <h2 style={{ margin: 0, fontWeight: 700, fontSize: 20, lineHeight: 1.3, color: "#0B1B2E", textWrap: "pretty" }}>
                  Begin the website build with the kickoff payment.
                </h2>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#1D3A5C" }}>
                  Begins the $8,000 strategic website build.
                </p>
              </div>
              <div
                style={{
                  background: "rgba(255,255,255,0.72)",
                  borderRadius: 10,
                  padding: "14px 16px",
                  display: "grid",
                  gridTemplateColumns: "20px 1fr",
                  gap: 10,
                  alignItems: "start",
                }}
              >
                <CheckIcon stroke="#0F2E57" />
                <span style={{ fontSize: 15, lineHeight: 1.5, color: "#0B1B2E", textWrap: "pretty" }}>
                  The other half stays with you until the website is substantially complete and ready for launch.
                </span>
              </div>
              <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 12, paddingTop: 6 }}>
                <a
                  href="#checkout-kickoff"
                  className="choice-cta"
                  style={{
                    width: "100%",
                    minHeight: 56,
                    padding: "14px 20px",
                    borderRadius: 4,
                    background: "#FFFFFF",
                    color: "#0F2E57",
                    border: "1px solid rgba(15,46,87,0.14)",
                    fontFamily: "var(--font-archivo), 'Archivo', sans-serif",
                    fontWeight: 700,
                    fontSize: 17,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    boxShadow: "0 8px 20px -12px rgba(11,27,46,0.45)",
                  }}
                >
                  <span>$4,000 Kickoff</span>
                  <DownArrow />
                </a>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: "#1D3A5C", minHeight: 42, textWrap: "pretty" }}>
                  Remaining $4,000 due when the website is substantially complete and ready for launch.
                </p>
              </div>
            </article>

            <article
              className="pay-card"
              style={{
                background: "linear-gradient(155deg,#FFA45C 0%,#F5893A 45%,#E8692A 100%)",
                border: "1px solid #E8762F",
                borderRadius: 14,
                padding: "clamp(24px,3.4vw,40px)",
                display: "flex",
                flexDirection: "column",
                gap: 18,
                boxShadow: "0 1px 2px rgba(11,27,46,0.06),0 16px 36px -20px rgba(11,27,46,0.30)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-ibm-plex-mono), 'IBM Plex Mono', monospace",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#0B1B2E",
                }}
              >
                Pay in full
              </div>
              <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "4px 12px" }}>
                <span
                  style={{
                    fontWeight: 800,
                    fontStretch: "108%",
                    fontSize: "clamp(48px,6vw,64px)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    color: "#0B1B2E",
                  }}
                >
                  $8,000
                </span>
                <span style={{ fontWeight: 600, fontSize: "clamp(18px,2vw,22px)", color: "#2A1A10" }}>today</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <h2 style={{ margin: 0, fontWeight: 700, fontSize: 20, lineHeight: 1.3, color: "#0B1B2E", textWrap: "pretty" }}>
                  Pay for the full website build today.
                </h2>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#2A1A10" }}>
                  Covers the full $8,000 strategic website build at kickoff.
                </p>
              </div>
              <div
                style={{
                  background: "rgba(255,255,255,0.72)",
                  borderRadius: 10,
                  padding: "14px 16px",
                  display: "grid",
                  gridTemplateColumns: "20px 1fr",
                  gap: 10,
                  alignItems: "start",
                }}
              >
                <CheckIcon stroke="#0F2E57" />
                <span style={{ fontSize: 15, lineHeight: 1.5, color: "#0B1B2E", textWrap: "pretty" }}>
                  Same project scope. One payment.
                </span>
              </div>
              <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 12, paddingTop: 6 }}>
                <a
                  href="#checkout-full"
                  className="choice-cta"
                  style={{
                    width: "100%",
                    minHeight: 56,
                    padding: "14px 20px",
                    borderRadius: 4,
                    background: "#FFFFFF",
                    color: "#0F2E57",
                    border: "1px solid rgba(15,46,87,0.14)",
                    fontFamily: "var(--font-archivo), 'Archivo', sans-serif",
                    fontWeight: 700,
                    fontSize: 17,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    boxShadow: "0 8px 20px -12px rgba(11,27,46,0.45)",
                  }}
                >
                  <span>$8,000 Paid in Full</span>
                  <DownArrow />
                </a>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: "#2A1A10", minHeight: 42, textWrap: "pretty" }}>
                  No remaining build balance at launch.
                </p>
              </div>
            </article>
          </div>

          <div
            style={{
              marginTop: 18,
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              fontSize: 15,
              lineHeight: 1.5,
            }}
          >
            {!accepted ? (
              <span style={{ color: "#4A5563", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "4px 8px" }}>
                <span>Checkout opens once the agreement is accepted.</span>
                <a href="#agreement" style={{ color: "#1558B8", fontWeight: 600, textUnderlineOffset: 3 }}>
                  Review & accept below ↓
                </a>
              </span>
            ) : (
              <span style={{ color: "#0F2E57", fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="10" fill="#1E6FE6" />
                  <path
                    d="M6 10.2l2.6 2.6L14 7.4"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Agreement accepted. Secure checkout is ready.
              </span>
            )}
          </div>
        </section>

        <section
          data-screen-label="What's included"
          style={{
            marginTop: "clamp(64px,8vw,104px)",
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(20px,3vw,32px)",
            alignItems: "stretch",
          }}
        >
          <div style={{ flex: "1 1 520px", minWidth: 0, display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div
                style={{
                  fontFamily: "var(--font-ibm-plex-mono), 'IBM Plex Mono', monospace",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#1558B8",
                }}
              >
                Project scope
              </div>
              <h2
                style={{
                  margin: 0,
                  fontWeight: 800,
                  fontStretch: "108%",
                  fontSize: "clamp(28px,3.4vw,36px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "#0B1B2E",
                }}
              >
                What’s Included
              </h2>
            </div>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,240px),1fr))",
                gap: "0 28px",
                borderTop: "1px solid #D5DCE4",
              }}
            >
              {INCLUDED.map((item) => (
                <li
                  key={item}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "18px 1fr",
                    gap: 12,
                    alignItems: "start",
                    padding: "14px 0",
                    borderBottom: "1px solid #E3E8EE",
                    fontSize: 16,
                    lineHeight: 1.45,
                    color: "#2A2F36",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ marginTop: 2 }}>
                    <path
                      d="M4.5 10.4l3.6 3.6L15.5 6.6"
                      stroke="#22C4E0"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside
            data-screen-label="Managed Website Care"
            style={{
              flex: "1 1 300px",
              minWidth: 0,
              background: "#EAF3FA",
              border: "1px solid #CFE0EE",
              borderRadius: 14,
              padding: "clamp(24px,3vw,32px)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              alignSelf: "flex-start",
            }}
          >
            <h3 style={{ margin: 0, fontWeight: 700, fontSize: 22, lineHeight: 1.2, color: "#0B1B2E" }}>
              Managed Website Care
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#E8692A", flex: "none" }} />
              <span style={{ fontWeight: 700, fontSize: 16, color: "#0B1B2E" }}>Begins at launch — not charged today.</span>
            </div>
            <div
              style={{
                fontWeight: 800,
                fontStretch: "106%",
                fontSize: 32,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "#0B1B2E",
              }}
            >
              $249/month
            </div>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#2A2F36", textWrap: "pretty" }}>
              Hosting, monitoring, backups, security, technical maintenance, minor updates, ongoing website support, and
              operation of the Atara AI Website Assistant.
            </p>
          </aside>
        </section>

        <section
          id="agreement"
          data-screen-label="Agreement"
          style={{ marginTop: "clamp(56px,7vw,88px)", scrollMarginTop: 24 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            <div
              style={{
                fontFamily: "var(--font-ibm-plex-mono), 'IBM Plex Mono', monospace",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#1558B8",
              }}
            >
              Final step
            </div>
            <h2
              style={{
                margin: 0,
                fontWeight: 800,
                fontStretch: "108%",
                fontSize: "clamp(28px,3.4vw,36px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "#0B1B2E",
              }}
            >
              Accept and continue
            </h2>
          </div>

          <div
            style={{
              borderRadius: 14,
              padding: "clamp(20px,3vw,32px)",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(20px,2.6vw,28px)",
              transition: "background .35s,border-color .35s,box-shadow .35s",
              background: panel.panelBg,
              border: `1px solid ${panel.panelBorder}`,
              boxShadow: panel.panelShadow,
            }}
          >
            <label
              style={{
                display: "grid",
                gridTemplateColumns: "28px 1fr",
                gap: 16,
                alignItems: "start",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <input
                type="checkbox"
                checked={accepted}
                onChange={() => setAccepted((value) => !value)}
                style={{ position: "absolute", opacity: 0, width: 28, height: 28, margin: 0, cursor: "pointer" }}
              />
              <span
                aria-hidden="true"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background .25s,border-color .25s,box-shadow .25s",
                  marginTop: 1,
                  background: panel.boxBg,
                  border: `2px solid ${panel.boxBorder}`,
                  boxShadow: panel.boxRing,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  style={{
                    transition: "opacity .2s,transform .25s",
                    opacity: panel.checkOpacity,
                    transform: `scale(${panel.checkScale})`,
                  }}
                >
                  <path
                    d="M4.5 10.4l3.6 3.6L15.5 6.6"
                    stroke="#FFFFFF"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span style={{ fontSize: "clamp(16px,1.7vw,17px)", lineHeight: 1.6, color: "#2A2F36", textWrap: "pretty" }}>
                I have read and agree to the Atara Mechanical Website Build & Managed Care Agreement and confirm that I
                am authorized to accept it on behalf of Atara Mechanical, Inc.
              </span>
            </label>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px 24px",
                paddingLeft: 44,
              }}
            >
              <a
                href={AGREEMENT_HREF}
                target="_blank"
                rel="noopener"
                className="agreement-view"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  minHeight: 44,
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#1558B8",
                  textDecoration: "underline",
                  textUnderlineOffset: 4,
                  textDecorationThickness: 1,
                }}
              >
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden="true">
                  <path d="M3 1.5h6.5L13 5v11.5H3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M9.5 1.5V5H13" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                View Agreement
              </a>
              {!accepted ? (
                <span
                  style={{
                    fontFamily: "var(--font-ibm-plex-mono), 'IBM Plex Mono', monospace",
                    fontSize: 12,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#4A5563",
                  }}
                >
                  Required before checkout
                </span>
              ) : (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: "var(--font-ibm-plex-mono), 'IBM Plex Mono', monospace",
                    fontSize: 12,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#1558B8",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#22C4E0",
                      boxShadow: "0 0 0 4px rgba(34,196,224,0.18)",
                    }}
                  />
                  Agreement accepted. Secure checkout is ready.
                </span>
              )}
            </div>

            <div
              style={{
                borderTop: `1px solid ${panel.dividerColor}`,
                paddingTop: "clamp(20px,2.6vw,28px)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))",
                gap: 12,
              }}
            >
              <button
                id="checkout-kickoff"
                type="button"
                className="checkout-btn"
                data-ready={kickoffReady ? "true" : "false"}
                disabled={!kickoffReady}
                aria-disabled={!kickoffReady}
                onClick={() => go(kickoffUrl)}
                style={{
                  scrollMarginTop: "clamp(240px,40vh,360px)",
                  width: "100%",
                  minHeight: 56,
                  padding: "14px 20px",
                  borderRadius: 4,
                  fontFamily: "var(--font-archivo), 'Archivo', sans-serif",
                  fontWeight: 700,
                  fontSize: 17,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  ...buttonLook(kickoffReady),
                }}
              >
                Start the Project — $4,000
              </button>
              <button
                id="checkout-full"
                type="button"
                className="checkout-btn"
                data-ready={fullReady ? "true" : "false"}
                disabled={!fullReady}
                aria-disabled={!fullReady}
                onClick={() => go(fullUrl)}
                style={{
                  scrollMarginTop: "clamp(240px,40vh,360px)",
                  width: "100%",
                  minHeight: 56,
                  padding: "14px 20px",
                  borderRadius: 4,
                  fontFamily: "var(--font-archivo), 'Archivo', sans-serif",
                  fontWeight: 700,
                  fontSize: 17,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  ...buttonLook(fullReady),
                }}
              >
                Pay in Full — $8,000
              </button>
            </div>
          </div>

          <div
            style={{
              marginTop: 20,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px 14px",
              textAlign: "center",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 600, fontSize: 15, color: "#0B1B2E" }}>
              <svg width="14" height="16" viewBox="0 0 12 14" fill="none" aria-hidden="true">
                <rect x="1" y="6" width="10" height="7" rx="1.5" stroke="#0B1B2E" strokeWidth="1.4" />
                <path d="M3.5 6V4.2a2.5 2.5 0 0 1 5 0V6" stroke="#0B1B2E" strokeWidth="1.4" />
              </svg>
              Secure payment processing by Stripe.
            </span>
            <span style={{ fontSize: 14, color: "#4A5563" }}>
              Available payment methods will appear securely in Stripe Checkout.
            </span>
          </div>
        </section>
      </main>

      <footer style={{ marginTop: "clamp(72px,9vw,120px)", background: "#0B1B2E", color: "#B4C1CF" }}>
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "28px clamp(20px,5vw,48px)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px 32px",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 18px" }}>
            <img
              src="/atara/catalyst-banner-white.svg"
              alt="Catalyst Digital Solutions"
              style={{ height: 28, width: "auto", display: "block" }}
            />
            <span style={{ width: 1, height: 20, background: "#2A4058" }} />
            <span
              style={{
                fontFamily: "var(--font-ibm-plex-mono), 'IBM Plex Mono', monospace",
                fontSize: 12,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#B4C1CF",
              }}
            >
              Atara Mechanical project
            </span>
          </div>
          <nav aria-label="Legal and support" style={{ display: "flex", flexWrap: "wrap", gap: "4px 24px", fontSize: 14 }}>
            <a href={AGREEMENT_HREF} target="_blank" rel="noopener" className="footer-link">
              Terms
            </a>
            <a href={PRIVACY_HREF} target="_blank" rel="noopener" className="footer-link">
              Privacy
            </a>
            <a href={MARIO_MAILTO} className="footer-link">
              Need help? Contact Mario
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
