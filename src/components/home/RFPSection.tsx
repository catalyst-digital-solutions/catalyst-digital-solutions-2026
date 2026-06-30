import Link from "next/link";
import IcebergPanel from "@/components/IcebergPanel";

function DocGridIcon() {
  return (
    <svg viewBox="0 0 120 80" width="100%" style={{ maxWidth: "120px", opacity: 0.6 }} aria-hidden="true">
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={col * 38 + 4}
            y={row * 18 + 4}
            width="32"
            height="13"
            rx="3"
            fill="none"
            stroke="rgba(0,212,255,0.5)"
            strokeWidth="1"
          />
        ))
      )}
      <text x="6" y="73" fill="rgba(0,212,255,0.5)" fontSize="8" fontFamily="monospace">scanned 24/7</text>
      <circle cx="8" cy="70" r="3" fill="var(--cds-green)" />
    </svg>
  );
}

function FunnelIcon() {
  return (
    <svg viewBox="0 0 120 100" width="100%" style={{ maxWidth: "120px", opacity: 0.7 }} aria-hidden="true">
      {/* Funnel shape */}
      <path d="M15 15 L105 15 L75 55 L75 85 L45 85 L45 55 Z" fill="none" stroke="rgba(0,212,255,0.5)" strokeWidth="1.5" />
      {/* Dots entering */}
      {[20, 40, 60, 80, 100].map((x, i) => (
        <circle key={i} cx={x} cy="8" r="3" fill="rgba(0,212,255,0.6)" />
      ))}
      {/* Green dot at bottom */}
      <circle cx="60" cy="92" r="4" fill="var(--cds-green)" />
      <text x="14" y="100" fill="rgba(0,212,255,0.5)" fontSize="7" fontFamily="monospace">matched to your trade,</text>
    </svg>
  );
}

function InboxIcon() {
  const jobs = [
    { label: "School District Reroof", sub: "Public bid · due Aug 12" },
    { label: "City Parking Structure", sub: "Public bid · due Aug 28" },
    { label: "Community Center HVAC", sub: "Public bid · due Sep 03" },
  ];
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="rgba(0,212,255,0.6)" strokeWidth="1.5" />
          <path d="M3 9l9 6 9-6" stroke="rgba(0,212,255,0.6)" strokeWidth="1.5" />
        </svg>
        <span style={{ fontSize: "11px", color: "var(--cds-cyan)", fontFamily: "var(--font-mono)" }}>
          New jobs · 3
        </span>
      </div>
      {jobs.map((job, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "7px 0",
            borderBottom: i < jobs.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
          }}
        >
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--cds-green)", flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--cds-heading)", fontFamily: "var(--font-inter)" }}>{job.label}</p>
            <p style={{ fontSize: "10px", color: "var(--cds-muted)", fontFamily: "var(--font-inter)" }}>{job.sub}</p>
          </div>
        </div>
      ))}
      <p style={{ fontSize: "10px", color: "var(--cds-green)", fontFamily: "var(--font-mono)", marginTop: "8px" }}>● ready to bid</p>
    </div>
  );
}

const STEPS = [
  {
    num: "Step 1",
    title: "Thousands of public bids",
    visual: <DocGridIcon />,
  },
  {
    num: "Step 2",
    title: "Filtered for you",
    visual: <FunnelIcon />,
  },
  {
    num: "Step 3",
    title: "In your inbox",
    visual: <InboxIcon />,
  },
];

export default function RFPSection() {
  return (
    <section className="section">
      <div className="container centered" style={{ gap: "56px" }}>
        {/* Text block */}
        <div className="centered" style={{ gap: "20px", maxWidth: "680px" }}>
          <p className="eyebrow">Stop Hunting for Bids</p>

          <h2
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: "clamp(36px, 4.5vw, 60px)",
              color: "var(--cds-heading)",
              lineHeight: 1.15,
              textAlign: "center",
            }}
          >
            Your estimator should be bidding. Not hunting.
          </h2>

          <p style={{ fontSize: "15px", color: "var(--cds-body)", lineHeight: 1.8, fontFamily: "var(--font-inter)", textAlign: "center" }}>
            Right now, somebody on your team burns hours digging through government websites looking
            for jobs to bid on — and still misses half of them. Our system does it for you, around
            the clock, and drops the right jobs straight in your inbox.
          </p>

          <p style={{ fontSize: "17px", fontWeight: 700, color: "var(--cds-heading)", fontFamily: "var(--font-inter)", textAlign: "center" }}>
            More bids submitted. Way less time finding them.
          </p>
        </div>

        {/* Three step cards */}
        <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr", gap: "0", alignItems: "stretch" }}>
          {STEPS.map((step, i) => (
            <>
              <div
                key={step.num}
                className="card"
                style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "28px 24px" }}
              >
                <p className="eyebrow" style={{ fontSize: "11px" }}>{step.num}</p>
                <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--cds-heading)", fontFamily: "var(--font-inter)" }}>
                  {step.title}
                </p>
                <div style={{ flex: 1, display: "flex", alignItems: "center", minHeight: "80px" }}>
                  {step.visual}
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  key={`arrow-${i}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0 8px",
                    color: "rgba(0,212,255,0.4)",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 010-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                  </svg>
                </div>
              )}
            </>
          ))}
        </div>

        {/* Badge + iceberg + CTA */}
        <div className="centered" style={{ gap: "20px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              background: "rgba(128,255,128,0.07)",
              border: "1px solid rgba(128,255,128,0.2)",
              borderRadius: "999px",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="var(--cds-green)" strokeWidth="1.5" />
              <path d="M12 6v6l4 2" stroke="var(--cds-green)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span style={{ fontSize: "14px", color: "var(--cds-green)", fontFamily: "var(--font-inter)", fontWeight: 600 }}>
              15+ hours saved every week.
            </span>
          </div>

          <IcebergPanel triggerLabel="What is Construction RFP AI?">
            Our Construction RFP AI monitors thousands of public bid portals — federal, state,
            county, municipal — 24/7. It filters by your trade, your license category, and your
            service geography, then delivers every relevant opportunity directly to your inbox.
            Comparable tools cost $20,000–$55,000/year. Ours is $497/month standalone — or
            included free in our Domination tier.
          </IcebergPanel>

          <Link href="/contact" className="btn-primary">
            Show me the bids I&apos;m missing →
          </Link>
        </div>
      </div>
    </section>
  );
}
