function CeilingChart() {
  // S-curve that rises steeply then flattens at a ceiling
  // ViewBox: 0 0 500 200
  const ceilY = 40;
  const floorY = 170;

  return (
    <svg
      viewBox="0 0 500 200"
      style={{ width: "100%", maxWidth: "520px", overflow: "visible" }}
      aria-label="Word of mouth growth curve hitting a ceiling"
    >
      {/* Ceiling dashed line */}
      <line
        x1="30"
        y1={ceilY}
        x2="460"
        y2={ceilY}
        stroke="rgba(255,80,80,0.5)"
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />

      {/* CEILING label */}
      <text
        x="430"
        y={ceilY - 8}
        fill="rgba(255,100,100,0.7)"
        fontSize="9"
        fontFamily="JetBrains Mono, monospace"
        letterSpacing="2"
        textAnchor="middle"
      >
        CEILING
      </text>
      {/* Arrow at end of ceiling */}
      <polygon points="462,37 458,40 462,43" fill="rgba(255,80,80,0.5)" />

      {/* Growth curve — rises then plateaus */}
      <path
        d={`M 30 ${floorY} C 80 ${floorY} 120 ${ceilY + 10} 220 ${ceilY + 5} S 400 ${ceilY + 2} 460 ${ceilY + 2}`}
        fill="none"
        stroke="rgba(0,180,255,0.8)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Caption */}
      <text x="250" y="192" fill="rgba(127,136,150,0.7)" fontSize="9" fontFamily="Inter,sans-serif" textAnchor="middle">
        Happy at your current size? Word of mouth is plenty.
      </text>
      <text x="250" y="202" fill="rgba(127,136,150,0.7)" fontSize="9" fontFamily="Inter,sans-serif" textAnchor="middle">
        Want to grow? It&apos;s the thing quietly capping you.
      </text>
    </svg>
  );
}

export default function WordOfMouthSection() {
  return (
    <section className="section">
      <div className="container centered" style={{ gap: "48px" }}>
        {/* Headline */}
        <h2
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 700,
            fontSize: "clamp(36px, 5vw, 70px)",
            color: "var(--cds-heading)",
            lineHeight: 1.1,
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          Word of mouth got you here.
          <br />
          It can&apos;t get you{" "}
          <span style={{ color: "var(--cds-purple-light)" }}>there.</span>
        </h2>

        {/* Body */}
        <p
          style={{
            fontSize: "15px",
            color: "var(--cds-body)",
            lineHeight: 1.9,
            fontFamily: "var(--font-inter)",
            textAlign: "center",
            maxWidth: "560px",
          }}
        >
          Referrals are a gift — but they&apos;re not a growth plan. You can&apos;t schedule word
          of mouth. You can&apos;t turn it up when your schedule is open. And it only ever reaches
          people who know someone who knows you. A procurement officer in the next county who&apos;ll
          need a builder for his $10M project this spring? He&apos;ll never hear your name. No
          company ever scaled past its own zip code on referrals alone.
        </p>

        <p
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "var(--cds-heading)",
            fontFamily: "var(--font-inter)",
            textAlign: "center",
          }}
        >
          Word of mouth is a ceiling, not an engine.
        </p>

        {/* Chart */}
        <CeilingChart />
      </div>
    </section>
  );
}
