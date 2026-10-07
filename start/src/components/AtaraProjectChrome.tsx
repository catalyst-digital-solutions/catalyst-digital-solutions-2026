import type { CSSProperties } from "react";
import { ATARA_AGREEMENT_HREF, ATARA_MARIO_MAILTO, ATARA_PRIVACY_HREF } from "@/lib/atara-links";

export const ataraPageShellStyle: CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  fontFamily: "var(--font-archivo), 'Archivo', system-ui, sans-serif",
  color: "#2A2F36",
  background: "#F5F7F9",
};

export function AtaraHeroDecor() {
  return (
    <>
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
    </>
  );
}

export function AtaraProjectHeader() {
  return (
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
        <span>Private Client Project</span>
      </div>
    </header>
  );
}

export function AtaraProjectFooter() {
  return (
    <footer style={{ marginTop: "clamp(64px,8vw,104px)", background: "#0B1B2E", color: "#B4C1CF" }}>
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
          <a href={ATARA_AGREEMENT_HREF} target="_blank" rel="noopener" className="footer-link">
            Terms
          </a>
          <a href={ATARA_PRIVACY_HREF} target="_blank" rel="noopener" className="footer-link">
            Privacy
          </a>
          <a href={ATARA_MARIO_MAILTO} className="footer-link">
            Need help? Contact Mario
          </a>
        </nav>
      </div>
    </footer>
  );
}
