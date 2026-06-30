import IcebergPanel from "@/components/IcebergPanel";

const PLATFORMS = [
  {
    label: "Google",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <circle cx="12" cy="12" r="10" stroke="rgba(0,212,255,0.5)" strokeWidth="1.5" />
        <path d="M15.5 12H12v2.5h2c-.4 1-1.4 1.5-2 1.5-1.7 0-3-1.3-3-3s1.3-3 3-3c.8 0 1.4.3 1.9.7l1.8-1.8C14.8 7.7 13.5 7 12 7c-2.8 0-5 2.2-5 5s2.2 5 5 5c2.5 0 4.7-1.8 4.7-5 0-.3 0-.7-.1-1h-.1z" fill="rgba(0,212,255,0.8)" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="4" stroke="rgba(0,212,255,0.5)" strokeWidth="1.5" />
        <path d="M10 9l5 3-5 3V9z" fill="rgba(0,212,255,0.8)" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="rgba(0,212,255,0.5)" strokeWidth="1.5" />
        <path d="M13 21v-7h2.5l.5-3H13V9c0-.8.4-1.5 1.5-1.5H16V5s-1.1-.2-2.2-.2C11 4.8 10 6.3 10 8.4V11H7.5v3H10v7h3z" fill="rgba(0,212,255,0.8)" />
      </svg>
    ),
  },
  {
    label: "Google Maps",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <path d="M12 2C8.1 2 5 5.1 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z" fill="rgba(0,212,255,0.8)" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="6" stroke="rgba(0,212,255,0.5)" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" stroke="rgba(0,212,255,0.8)" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="rgba(0,212,255,0.8)" />
      </svg>
    ),
  },
];

function DistributionNetwork() {
  // SVG-based hub-and-spoke: Catalyst center node → 5 platform nodes
  const cx = 430; // center x
  const cy = 60;  // center y
  const nodeY = 240;
  const nodePositions = [80, 225, 370, 515, 660];

  return (
    <div style={{ width: "100%", position: "relative" }}>
      {/* SVG for connecting lines only */}
      <svg
        viewBox="0 0 740 280"
        style={{ width: "100%", position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
        aria-hidden="true"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {nodePositions.map((nx) => (
          <g key={nx}>
            {/* Dashed connecting line */}
            <line
              x1={cx}
              y1={cy + 30}
              x2={nx + 60}
              y2={nodeY - 10}
              stroke="rgba(0,212,255,0.35)"
              strokeWidth="1.5"
              strokeDasharray="5 4"
            />
            {/* Green dot at platform end */}
            <circle
              cx={nx + 60}
              cy={nodeY - 10}
              r="4"
              fill="var(--cds-green)"
              filter="url(#glow)"
            />
          </g>
        ))}
      </svg>

      {/* Center node */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "0px",
        }}
      >
        <p
          className="eyebrow"
          style={{ marginBottom: "10px", letterSpacing: "4px" }}
        >
          Catalyst
        </p>
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #8000ff, #5600ab)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 40px rgba(128,0,255,0.5), 0 0 80px rgba(128,0,255,0.2)",
            marginBottom: "100px",
          }}
        >
          {/* Dots grid (stylized) */}
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
            {[4, 8, 12, 16, 20].map((x) =>
              [4, 8, 12, 16, 20].map((y) => (
                <circle
                  key={`${x}-${y}`}
                  cx={x}
                  cy={y}
                  r={Math.random() > 0.3 ? 1.2 : 0.5}
                  fill="white"
                  opacity={0.5 + Math.random() * 0.5}
                />
              ))
            )}
          </svg>
        </div>
      </div>

      {/* Platform nodes */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5,1fr)",
          gap: "12px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {PLATFORMS.map((platform) => (
          <div
            key={platform.label}
            className="card"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "18px 12px",
              textAlign: "center",
              position: "relative",
            }}
          >
            {/* Status dot */}
            <span
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--cds-green)",
                boxShadow: "0 0 6px var(--cds-green)",
              }}
            />
            {platform.icon}
            <span
              style={{
                fontSize: "11px",
                color: "var(--cds-muted)",
                fontFamily: "var(--font-inter)",
              }}
            >
              {platform.label}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile: collapse to 3 columns */}
      <style>{`@media(max-width:640px){.platform-grid{grid-template-columns:repeat(3,1fr)!important}}`}</style>
    </div>
  );
}

export default function OmnipresenceSection() {
  return (
    <section className="section">
      <div className="container centered" style={{ gap: "56px" }}>
        {/* Text block */}
        <div className="centered" style={{ gap: "20px", maxWidth: "700px" }}>
          <p className="eyebrow">Show Up Everywhere</p>

          <h2
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: "clamp(38px, 5vw, 64px)",
              color: "var(--cds-heading)",
              lineHeight: 1.15,
              textAlign: "center",
            }}
          >
            Be the name they see everywhere.
          </h2>

          <p style={{ fontSize: "16px", color: "var(--cds-body)", lineHeight: 1.8, fontFamily: "var(--font-inter)", textAlign: "center" }}>
            The contractor who shows up first usually wins the job. We put your business in front of
            the right people — on Google, on YouTube, on Facebook, wherever they&apos;re looking.
            Fresh videos and posts go out for you every week. You don&apos;t lift a finger.
          </p>

          <p style={{ fontSize: "17px", fontWeight: 700, color: "var(--cds-heading)", fontFamily: "var(--font-inter)", textAlign: "center" }}>
            You just become the obvious choice.
          </p>

          <IcebergPanel triggerLabel="How does that work?">
            Our AI content engine generates 12–16 long-form videos per month using your face, your
            voice (via ElevenLabs), and your expertise. Those videos get auto-distributed to
            YouTube, TikTok, Instagram Reels, and LinkedIn. Simultaneously, our programmatic SEO
            system builds hundreds of location + service pages that rank for every variation of
            &ldquo;contractor near me&rdquo; in your market. You become unavoidable.
          </IcebergPanel>
        </div>

        {/* Distribution network */}
        <div style={{ width: "100%", maxWidth: "740px" }}>
          <DistributionNetwork />
        </div>
      </div>
    </section>
  );
}
