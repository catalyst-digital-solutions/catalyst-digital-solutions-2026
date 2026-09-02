import type { Metadata } from "next";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/config/slots";

export const metadata: Metadata = {
  title: "Payment received — Catalyst Digital Solutions",
  description: "Thank you — your payment went through. Here's what happens next.",
  robots: { index: false, follow: false },
  icons: {
    icon: [
      {
        url: "/assets/trades/j-shield-emblem_circle-favicon.png",
        type: "image/png",
        sizes: "64x64",
      },
    ],
  },
};

const stepNumberStyle: React.CSSProperties = {
  flexShrink: 0,
  width: 32,
  height: 32,
  borderRadius: "50%",
  background: "linear-gradient(135deg,#8000ff,#5600ab)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  font: "700 14px var(--font-inter), sans-serif",
};

export default function TradesThankYouPage() {
  return (
    <div
      style={{
        background: "#f8f8f8",
        minHeight: "100vh",
        fontFamily: "var(--font-inter), sans-serif",
        color: "#1a1a1a",
      }}
    >
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e6e6e6",
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "16px 32px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/trades/cds-wordmark.png"
          alt="Catalyst Digital Solutions"
          style={{ height: 30, width: "auto", display: "block" }}
        />
      </header>

      <main style={{ maxWidth: 640, margin: "0 auto", padding: "72px 24px 96px" }}>
        <p
          style={{
            font: "600 12px var(--font-inter), sans-serif",
            color: "#8000ff",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            margin: "0 0 12px",
          }}
        >
          Payment received
        </p>
        <h1 style={{ font: "700 36px/1.2 var(--font-inter), sans-serif", color: "#1a1a1a", margin: "0 0 16px" }}>
          You&rsquo;re in. Here&rsquo;s what happens next.
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: "#2b2b2b", margin: "0 0 40px" }}>
          Your $500 payment went through and a receipt is on its way to your email. Your selected direction is now in
          production, and the seven-business-day delivery clock has started.
        </p>

        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 28 }}>
          <li style={{ display: "flex", gap: 16 }}>
            <span style={stepNumberStyle}>1</span>
            <div>
              <p style={{ fontWeight: 600, margin: "4px 0 4px" }}>Production begins now</p>
              <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: "#4a4a4a" }}>
                We turn the direction you selected into your finished logo, wordmark, lockups, vector files, color
                palette, typography system, and business-card files.
              </p>
            </div>
          </li>
          <li style={{ display: "flex", gap: 16 }}>
            <span style={stepNumberStyle}>2</span>
            <div>
              <p style={{ fontWeight: 600, margin: "4px 0 4px" }}>We build the mockups and homepage</p>
              <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: "#4a4a4a" }}>
                You&rsquo;ll receive front, side, and rear vehicle-wrap mockups; embroidered polo and ball-cap mockups;
                three signage mockups; and a working homepage preview.
              </p>
            </div>
          </li>
          <li style={{ display: "flex", gap: 16 }}>
            <span style={stepNumberStyle}>3</span>
            <div>
              <p style={{ fontWeight: 600, margin: "4px 0 4px" }}>You review and decide</p>
              <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: "#4a4a4a" }}>
                We deliver within seven business days. Your homepage preview then stays live for fourteen days. Continue
                into the complete $4,000 build for the remaining $3,500, or stop with nothing more due.
              </p>
            </div>
          </li>
        </ol>

        <div
          style={{
            marginTop: 48,
            padding: "24px 28px",
            background: "#ffffff",
            border: "1px solid #e6e6e6",
            borderRadius: 12,
          }}
        >
          <p style={{ fontWeight: 600, margin: "0 0 6px" }}>Questions in the meantime?</p>
          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.7, color: "#4a4a4a" }}>
            Call or text <a href={`tel:${PHONE_TEL}`} style={{ color: "#8000ff", textDecoration: "none" }}>{PHONE_DISPLAY}</a>
            {" "}or email{" "}
            <a href={`mailto:${EMAIL}`} style={{ color: "#8000ff", textDecoration: "none" }}>{EMAIL}</a>.
          </p>
        </div>

        <p style={{ marginTop: 40, fontSize: 13.5, color: "#9a9a9a" }}>
          Your purchase is governed by our{" "}
          <a href="/trades/terms" style={{ color: "#8000ff", textDecoration: "none" }}>
            Terms of Service, Schedule A — Brand Build, and Schedule B — Brand Starter
          </a>
          .
        </p>
      </main>
    </div>
  );
}
