import {
  AtaraHeroDecor,
  AtaraProjectFooter,
  AtaraProjectHeader,
  ataraPageShellStyle,
} from "@/components/AtaraProjectChrome";
import { ATARA_AGREEMENT_HREF, ATARA_MARIO_MAILTO } from "@/lib/atara-links";

export type AtaraSuccessVariant = "kickoff" | "full";

const NEXT_STEPS = [
  {
    n: "01",
    title: "Onboarding",
    body: "We gather the remaining information, access, and materials.",
    upNext: true,
  },
  {
    n: "02",
    title: "Final Strategy",
    body: "We confirm the final website architecture, service priorities, and secondary market.",
  },
  {
    n: "03",
    title: "Design + Development",
    body: "Catalyst builds the full Atara Mechanical website.",
  },
  {
    n: "04",
    title: "Review + Launch",
    body: "You review the completed site, we make agreed revisions, and prepare for launch.",
  },
] as const;

const VARIANT = {
  kickoff: {
    paymentLabel: "Kickoff payment",
    paymentLabelColor: "#0F2E57",
    amount: "$4,000",
    paymentStatus: "Kickoff Payment Received",
    paymentBody: "Remaining $4,000 is due when the website is substantially complete and ready for launch.",
    receiptColor: "#1D3A5C",
    projectStatus: "Kickoff Complete",
    cardBackground: "linear-gradient(155deg,#E4F3FC 0%,#C9E6F8 55%,#A9D6F3 100%)",
    cardBorder: "1px solid #B7D9EF",
  },
  full: {
    paymentLabel: "Paid in full",
    paymentLabelColor: "#0B1B2E",
    amount: "$8,000",
    paymentStatus: "Website Build Paid in Full",
    paymentBody: "Your strategic website build is fully paid.",
    receiptColor: "#2A1A10",
    projectStatus: "Website Build Paid in Full",
    cardBackground: "linear-gradient(155deg,#FFA45C 0%,#F5893A 45%,#E8692A 100%)",
    cardBorder: "1px solid #E8762F",
  },
} as const;

function DocumentIcon() {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden="true">
      <path d="M3 1.5h6.5L13 5v11.5H3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9.5 1.5V5H13" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function FilledCheck({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="#0F2E57" />
      <path
        d="M6 10.2l2.6 2.6L14 7.4"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BlueCheck({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="#1E6FE6" />
      <path
        d="M6 10.2l2.6 2.6L14 7.4"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProcessStep({
  n,
  title,
  body,
  upNext,
}: {
  n: string;
  title: string;
  body: string;
  upNext?: boolean;
}) {
  return (
    <li
      style={
        upNext
          ? {
              background: "#FFFFFF",
              border: "1px solid #E8692A",
              borderRadius: 14,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              boxShadow: "0 0 0 4px rgba(232,105,42,0.08)",
            }
          : {
              background: "#FFFFFF",
              border: "1px solid #D5DCE4",
              borderRadius: 14,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }
      }
    >
      {upNext ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <span
            style={{
              fontFamily: "var(--font-ibm-plex-mono), 'IBM Plex Mono', monospace",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.12em",
              color: "#B4501C",
            }}
          >
            {n}
          </span>
          <span
            style={{
              fontFamily: "var(--font-ibm-plex-mono), 'IBM Plex Mono', monospace",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#0B1B2E",
              background: "#FDE6D8",
              borderRadius: 999,
              padding: "4px 10px",
            }}
          >
            Up next
          </span>
        </div>
      ) : (
        <span
          style={{
            fontFamily: "var(--font-ibm-plex-mono), 'IBM Plex Mono', monospace",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.12em",
            color: "#1558B8",
            lineHeight: "24px",
          }}
        >
          {n}
        </span>
      )}
      <h3 style={{ margin: 0, fontWeight: 700, fontSize: 20, lineHeight: 1.25, color: "#0B1B2E" }}>{title}</h3>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "#4A5563", textWrap: "pretty" }}>{body}</p>
    </li>
  );
}

type AtaraSuccessProps = {
  variant: AtaraSuccessVariant;
};

export default function AtaraSuccess({ variant }: AtaraSuccessProps) {
  const copy = VARIANT[variant];

  return (
    <div className="atara-success-page" style={ataraPageShellStyle}>
      <div
        data-screen-label="Hero"
        style={{ background: "#0B1B2E", color: "#F5F7F9", position: "relative", overflow: "hidden" }}
      >
        <AtaraHeroDecor />
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
          <img className="lamb-mascot" src="/atara/lamb-cool-thumbs-up-hires.webp" alt="" />
        </div>
        <AtaraProjectHeader />

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
                display: "flex",
                alignItems: "center",
                gap: 10,
                alignSelf: "flex-start",
                border: "1px solid rgba(34,196,224,0.45)",
                background: "rgba(34,196,224,0.08)",
                borderRadius: 999,
                padding: "7px 14px 7px 10px",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="10" fill="#22C4E0" />
                <path
                  d="M6 10.2l2.6 2.6L14 7.4"
                  stroke="#0B1B2E"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                style={{
                  fontFamily: "var(--font-ibm-plex-mono), 'IBM Plex Mono', monospace",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#22C4E0",
                }}
              >
                Payment confirmed
              </span>
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
              Welcome to the team.
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
              Your Atara Mechanical website project is officially underway.
            </p>
          </div>
        </div>
      </div>

      <main style={{ flex: 1, width: "100%", maxWidth: 1120, margin: "0 auto", padding: "0 clamp(16px,5vw,48px)" }}>
        <section
          data-screen-label="Confirmation"
          aria-label="Payment and project status"
          style={{
            position: "relative",
            zIndex: 1,
            marginTop: "calc(-1 * clamp(44px,5vw,72px))",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))",
            gap: "clamp(16px,2.4vw,24px)",
          }}
        >
          <article
            style={{
              background: copy.cardBackground,
              border: copy.cardBorder,
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
                color: copy.paymentLabelColor,
              }}
            >
              {copy.paymentLabel}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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
                {copy.amount}
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontWeight: 700,
                  fontSize: 20,
                  lineHeight: 1.3,
                  color: "#0B1B2E",
                }}
              >
                <FilledCheck size={20} />
                {copy.paymentStatus}
              </span>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.72)",
                borderRadius: 10,
                padding: "14px 16px",
                fontSize: 15,
                lineHeight: 1.5,
                color: "#0B1B2E",
                textWrap: "pretty",
              }}
            >
              {copy.paymentBody}
            </div>
            <p style={{ margin: "auto 0 0", fontSize: 14, lineHeight: 1.5, color: copy.receiptColor }}>
              A receipt will also be provided through Stripe.
            </p>
          </article>

          <article
            style={{
              background: "#FFFFFF",
              border: "1px solid #D5DCE4",
              borderRadius: 14,
              padding: "clamp(24px,3.4vw,40px)",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(20px,2.4vw,26px)",
              boxShadow: "0 1px 2px rgba(11,27,46,0.06),0 16px 36px -20px rgba(11,27,46,0.30)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
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
                Project status
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <BlueCheck size={22} />
                <span
                  style={{
                    fontWeight: 800,
                    fontStretch: "106%",
                    fontSize: "clamp(24px,2.6vw,28px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.015em",
                    color: "#0B1B2E",
                  }}
                >
                  {copy.projectStatus}
                </span>
              </div>
            </div>
            <div style={{ height: 1, background: "#E3E8EE" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
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
                Next step
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    border: "2px solid #E8692A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: "none",
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#E8692A" }} />
                </span>
                <span
                  style={{
                    fontWeight: 800,
                    fontStretch: "106%",
                    fontSize: "clamp(24px,2.6vw,28px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.015em",
                    color: "#0B1B2E",
                  }}
                >
                  Onboarding
                </span>
              </div>
              <p style={{ margin: 0, paddingLeft: 34, fontSize: 14, lineHeight: 1.5, color: "#4A5563" }}>
                Your onboarding link is on its way from Mario.
              </p>
            </div>
            <div
              aria-hidden="true"
              style={{ marginTop: "auto", display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 6 }}
            >
              <span style={{ height: 6, borderRadius: 3, background: "#1E6FE6" }} />
              <span style={{ height: 6, borderRadius: 3, background: "#E8692A" }} />
              <span style={{ height: 6, borderRadius: 3, background: "#E3E8EE" }} />
              <span style={{ height: 6, borderRadius: 3, background: "#E3E8EE" }} />
              <span style={{ height: 6, borderRadius: 3, background: "#E3E8EE" }} />
            </div>
          </article>
        </section>

        <section
          data-screen-label="Primary message"
          style={{
            marginTop: "clamp(64px,8vw,104px)",
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(28px,4vw,64px)",
            alignItems: "flex-start",
          }}
        >
          <h2
            style={{
              flex: "1 1 420px",
              minWidth: 0,
              margin: 0,
              fontWeight: 800,
              fontStretch: "110%",
              fontSize: "clamp(36px,5vw,60px)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              color: "#0B1B2E",
              textWrap: "balance",
            }}
          >
            You run Atara. <span style={{ color: "#1E6FE6" }}>We’ll take it from here.</span>
          </h2>
          <div style={{ flex: "1 1 380px", minWidth: 0, display: "flex", flexDirection: "column", gap: 20 }}>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(17px,1.8vw,19px)",
                lineHeight: 1.6,
                color: "#2A2F36",
                textWrap: "pretty",
              }}
            >
              The next step is onboarding. We’ll collect the company information, account access, documents, photos, and
              other details we need to begin building the site.
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(17px,1.8vw,19px)",
                lineHeight: 1.6,
                color: "#0B1B2E",
                fontWeight: 600,
                textWrap: "pretty",
              }}
            >
              You don’t need to prepare everything at once. We’ll walk through it together.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "40px 1fr",
                gap: 14,
                alignItems: "center",
                background: "#FFFFFF",
                border: "1px solid #D5DCE4",
                borderRadius: 12,
                padding: "16px 18px",
                marginTop: 8,
              }}
            >
              <span
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "#FDE6D8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
                  <rect x="1" y="1" width="16" height="12" rx="2" stroke="#B4501C" strokeWidth="1.6" />
                  <path d="M1.8 2l7.2 5.6L16.2 2" stroke="#B4501C" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ fontSize: 16, lineHeight: 1.5, color: "#0B1B2E", textWrap: "pretty" }}>
                <strong style={{ fontWeight: 700 }}>Mario will be in touch soon</strong> with your onboarding link and a
                simple checklist to get started.
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 24px" }}>
              <a
                href={ATARA_AGREEMENT_HREF}
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
                <DocumentIcon />
                View Agreement
              </a>
            </div>
          </div>
        </section>

        <section
          data-screen-label="What happens next"
          style={{
            marginTop: "clamp(64px,8vw,104px)",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(24px,3vw,32px)",
          }}
        >
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
              The process
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
              What happens next
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,440px),1fr))",
              gap: "clamp(16px,2vw,20px)",
            }}
          >
            <ol
              start={1}
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,210px),1fr))",
                gap: "clamp(16px,2vw,20px)",
              }}
            >
              {NEXT_STEPS.slice(0, 2).map((step) => (
                <ProcessStep key={step.n} {...step} />
              ))}
            </ol>
            <ol
              start={3}
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,210px),1fr))",
                gap: "clamp(16px,2vw,20px)",
              }}
            >
              {NEXT_STEPS.slice(2).map((step) => (
                <ProcessStep key={step.n} {...step} />
              ))}
            </ol>
          </div>
          <div style={{ display: "flex", justifyContent: "center", fontSize: 15 }}>
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
        </section>
      </main>

      <AtaraProjectFooter />
    </div>
  );
}
