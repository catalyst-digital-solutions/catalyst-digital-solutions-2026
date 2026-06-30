import Link from "next/link";
import IcebergPanel from "@/components/IcebergPanel";

function ChatCard() {
  return (
    <div
      style={{
        background: "rgba(18,22,30,0.9)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: "20px",
        padding: "24px",
        maxWidth: "400px",
        width: "100%",
        boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(128,0,255,0.1)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "16px",
          padding: "12px 16px",
          background: "rgba(128,0,255,0.1)",
          borderRadius: "12px",
        }}
      >
        {/* Voice agent avatar */}
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #8000ff, #5600ab)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 0 20px rgba(128,0,255,0.5)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <p style={{ fontWeight: 600, fontSize: "14px", color: "var(--cds-heading)", fontFamily: "var(--font-inter)" }}>
            Voice Agent
          </p>
          <p style={{ fontSize: "11px", color: "var(--cds-green)", fontFamily: "var(--font-inter)", display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--cds-green)", display: "inline-block" }} />
            Active 24/7
          </p>
        </div>
      </div>

      {/* Incoming call notification */}
      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          borderRadius: "10px",
          padding: "10px 14px",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: "var(--cds-cyan)", flexShrink: 0 }}>
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor" />
        </svg>
        <div>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--cds-heading)", fontFamily: "var(--font-inter)" }}>
            Incoming call — Mike R.
          </p>
          <p style={{ fontSize: "11px", color: "var(--cds-muted)", fontFamily: "var(--font-inter)" }}>
            Answered in 2 seconds
          </p>
        </div>
      </div>

      {/* Chat messages */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {/* Customer message */}
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div
            style={{
              background: "rgba(255,255,255,0.07)",
              borderRadius: "12px 12px 12px 4px",
              padding: "10px 14px",
              maxWidth: "75%",
              fontSize: "13px",
              color: "var(--cds-body)",
              fontFamily: "var(--font-inter)",
              lineHeight: 1.5,
            }}
          >
            &ldquo;Hi, do you do bathroom remodels? Looking to get one done soon.&rdquo;
          </div>
        </div>

        {/* Agent reply */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div
            style={{
              background: "linear-gradient(135deg, #8000ff, #5600ab)",
              borderRadius: "12px 12px 4px 12px",
              padding: "10px 14px",
              maxWidth: "75%",
              fontSize: "13px",
              color: "white",
              fontFamily: "var(--font-inter)",
              lineHeight: 1.5,
            }}
          >
            &ldquo;We do, Mike. I can book your free estimate this Friday at 10 AM — does that work?&rdquo;
          </div>
        </div>

        {/* Customer confirms */}
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div
            style={{
              background: "rgba(255,255,255,0.07)",
              borderRadius: "12px 12px 12px 4px",
              padding: "10px 14px",
              fontSize: "13px",
              color: "var(--cds-body)",
              fontFamily: "var(--font-inter)",
            }}
          >
            &ldquo;Yeah, Friday works.&rdquo;
          </div>
        </div>

        {/* Job booked */}
        <div
          style={{
            background: "rgba(128,255,128,0.08)",
            border: "1px solid rgba(128,255,128,0.2)",
            borderRadius: "10px",
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "4px",
          }}
        >
          <span style={{ fontSize: "13px", color: "var(--cds-green)", fontWeight: 600, fontFamily: "var(--font-inter)" }}>
            ✓ Job booked
          </span>
          <span style={{ fontSize: "11px", color: "var(--cds-muted)", fontFamily: "var(--font-mono)" }}>
            FRI · 10:00 AM
          </span>
        </div>
      </div>
    </div>
  );
}

export default function VoiceAgentSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="two-col-60-40" style={{ alignItems: "center" }}>
          {/* Left — Copy */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <p className="eyebrow">Never Miss a Job Again</p>

            <h2
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 700,
                fontSize: "clamp(36px, 4.5vw, 62px)",
                color: "var(--cds-heading)",
                lineHeight: 1.1,
              }}
            >
              Your phone rings.{" "}
              <span style={{ color: "var(--cds-purple-light)", display: "block" }}>
                We answer.
              </span>
            </h2>

            <p style={{ fontSize: "15px", color: "var(--cds-body)", lineHeight: 1.8, fontFamily: "var(--font-inter)", maxWidth: "480px" }}>
              You can&apos;t stop work to grab every call. So you don&apos;t have to. Our AI
              answers for you — day, night, weekends. It talks like a real person, finds out what
              the job is, and books the good ones straight onto your calendar. You&apos;re on the
              roof. It&apos;s working the phones.
            </p>

            <p style={{ fontSize: "17px", fontWeight: 700, color: "var(--cds-heading)", fontFamily: "var(--font-inter)" }}>
              A missed call is a missed job. Now you miss neither.
            </p>

            <IcebergPanel triggerLabel="How can a robot answer my phone?">
              Our AI Voice Agent is trained on your business — your services, your pricing, your
              service area. It answers in your company name, qualifies the caller, answers common
              questions, and books appointments directly into your calendar. Callers often
              can&apos;t tell it&apos;s AI. What they do notice: you called back before anyone else
              did.
            </IcebergPanel>

            <Link href="/contact" className="btn-primary" style={{ alignSelf: "flex-start", fontSize: "15px" }}>
              Get a Free Audit →
            </Link>
          </div>

          {/* Right — Chat card */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ChatCard />
          </div>
        </div>
      </div>
    </section>
  );
}
