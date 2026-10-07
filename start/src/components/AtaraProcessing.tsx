import {
  ATARA_CHECKOUT_HREF,
  ATARA_MARIO_MAILTO,
} from "@/lib/atara-links";
import {
  AtaraHeroDecor,
  AtaraProjectFooter,
  AtaraProjectHeader,
  ataraPageShellStyle,
} from "@/components/AtaraProjectChrome";

export default function AtaraProcessing() {
  return (
    <div className="atara-processing-page" style={ataraPageShellStyle}>
      <div
        data-screen-label="Hero"
        style={{ background: "#0B1B2E", color: "#F5F7F9", position: "relative", overflow: "hidden" }}
      >
        <AtaraHeroDecor />
        <AtaraProjectHeader />

        <div
          style={{
            position: "relative",
            maxWidth: 1120,
            margin: "0 auto",
            padding: "clamp(48px,8vw,104px) clamp(20px,5vw,48px) clamp(140px,14vw,176px)",
          }}
        >
          <div style={{ maxWidth: 680, display: "flex", flexDirection: "column", gap: "clamp(16px,2vw,22px)" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                alignSelf: "flex-start",
                border: "1px solid rgba(245,178,122,0.45)",
                background: "rgba(232,105,42,0.10)",
                borderRadius: 999,
                padding: "7px 14px 7px 12px",
              }}
            >
              <span className="processing-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span
                style={{
                  fontFamily: "var(--font-ibm-plex-mono), 'IBM Plex Mono', monospace",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#F5B27A",
                }}
              >
                Payment processing
              </span>
            </div>
            <h1
              style={{
                margin: 0,
                fontWeight: 800,
                fontStretch: "112%",
                fontSize: "clamp(40px,6.4vw,72px)",
                lineHeight: 0.98,
                letterSpacing: "-0.025em",
                textWrap: "balance",
              }}
            >
              Your payment is processing.
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(18px,2vw,22px)",
                lineHeight: 1.45,
                color: "#C9D3DE",
                maxWidth: 560,
                textWrap: "pretty",
              }}
            >
              Stripe is still confirming the payment. You don’t need to submit it again.
            </p>
          </div>
        </div>
      </div>

      <main style={{ flex: 1, width: "100%", maxWidth: 1120, margin: "0 auto", padding: "0 clamp(16px,5vw,48px)" }}>
        <section
          data-screen-label="Waiting"
          aria-label="Payment status"
          style={{
            position: "relative",
            zIndex: 1,
            marginTop: "calc(-1 * clamp(44px,5vw,72px))",
          }}
        >
          <article
            style={{
              background: "#FFFFFF",
              border: "1px solid #D5DCE4",
              borderRadius: 14,
              padding: "clamp(24px,3.4vw,40px)",
              display: "flex",
              flexDirection: "column",
              gap: 22,
              maxWidth: 720,
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
                color: "#4A5563",
              }}
            >
              Still confirming
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(17px,1.8vw,19px)",
                lineHeight: 1.6,
                color: "#0B1B2E",
                textWrap: "pretty",
              }}
            >
              We’ll confirm your Atara Mechanical project as soon as the payment clears.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 24px" }}>
              <a
                href={ATARA_CHECKOUT_HREF}
                className="processing-return"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 52,
                  padding: "14px 22px",
                  borderRadius: 4,
                  background: "#0B1B2E",
                  color: "#F5F7F9",
                  fontWeight: 700,
                  fontSize: 16,
                  textDecoration: "none",
                  boxShadow: "0 10px 24px -12px rgba(11,27,46,0.55)",
                }}
              >
                Return to Project Page
              </a>
              <a
                href={ATARA_MARIO_MAILTO}
                style={{
                  color: "#1558B8",
                  fontWeight: 600,
                  textUnderlineOffset: 3,
                  minHeight: 44,
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                Questions? Contact Mario
              </a>
            </div>
          </article>
        </section>
      </main>

      <AtaraProjectFooter />
    </div>
  );
}
