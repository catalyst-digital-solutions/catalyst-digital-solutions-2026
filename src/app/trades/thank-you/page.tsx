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
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 6,
            background: "linear-gradient(135deg,#8000ff,#5600ab)",
            flexShrink: 0,
          }}
        />
        <span style={{ font: "600 15px var(--font-inter), sans-serif" }}>
          Catalyst Digital Solutions
        </span>
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
        <h1 style={{ font: "700 36px/1.2 var(--font-inter), sans-serif", margin: "0 0 16px" }}>
          You&rsquo;re in. Here&rsquo;s what happens next.
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: "#2b2b2b", margin: "0 0 40px" }}>
          Your payment went through and a receipt is on its way to your email. No forms to fill
          out right now — we take it from here.
        </p>

        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 28 }}>
          <li style={{ display: "flex", gap: 16 }}>
            <span style={stepNumberStyle}>1</span>
            <div>
              <p style={{ fontWeight: 600, margin: "4px 0 4px" }}>We reach out within one business day</p>
              <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: "#4a4a4a" }}>
                We&rsquo;ll call or text to schedule your kickoff call — about twenty minutes to learn
                your services, your service area, and how you want to be seen.
              </p>
            </div>
          </li>
          <li style={{ display: "flex", gap: 16 }}>
            <span style={stepNumberStyle}>2</span>
            <div>
              <p style={{ fontWeight: 600, margin: "4px 0 4px" }}>You get your Statement of Work</p>
              <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: "#4a4a4a" }}>
                Your scope, page list, and delivery target — in writing, before production begins.
                Nothing starts until you&rsquo;ve signed it.
              </p>
            </div>
          </li>
          <li style={{ display: "flex", gap: 16 }}>
            <span style={stepNumberStyle}>3</span>
            <div>
              <p style={{ fontWeight: 600, margin: "4px 0 4px" }}>We build</p>
              <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: "#4a4a4a" }}>
                You approve the brand first, then the site gets built around it. We target thirty
                days from cleared deposit and signed Statement of Work to launch.
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
            Terms of Service and Schedule A — Brand Build Program
          </a>
          .
        </p>
      </main>
    </div>
  );
}
