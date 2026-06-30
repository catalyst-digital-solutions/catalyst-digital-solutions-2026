export default function WordOfMouthSection() {
  return (
    <section
      style={{
        position: "relative",
        background: "#080b0f",
        fontFamily: "'Inter',sans-serif",
        color: "#c8c8c8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "clamp(110px,15vw,200px) clamp(20px,5vw,64px)",
      }}
    >
      {/* Headline — "there" gradient text */}
      <h2
        style={{
          fontFamily: "'Inter',sans-serif",
          fontWeight: 700,
          fontSize: "clamp(36px,4.6vw,66px)",
          lineHeight: 1.04,
          letterSpacing: "-1px",
          color: "#fafafa",
          margin: 0,
          maxWidth: "960px",
        }}
      >
        <div>Word of mouth got you here.</div>
        <div>
          It can&apos;t get you{" "}
          <span
            style={{
              background: "linear-gradient(90deg,#b56bff,#00d4ff)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            there
          </span>
          .
        </div>
      </h2>

      <p
        style={{
          fontSize: "clamp(16px,1.25vw,18.5px)",
          color: "#c8c8c8",
          lineHeight: 1.75,
          margin: "34px auto 0",
          maxWidth: "680px",
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
          fontSize: "clamp(22px,2.2vw,34px)",
          fontWeight: 600,
          color: "#fafafa",
          lineHeight: 1.25,
          margin: "48px 0 0",
          maxWidth: "760px",
        }}
      >
        Word of mouth is a ceiling, not an engine.
      </p>

      {/* Ceiling chart — exact from reference */}
      <svg
        viewBox="0 0 360 150"
        style={{ width: "clamp(260px,32vw,360px)", height: "auto", marginTop: "40px" }}
        fill="none"
        aria-label="Growth curve hitting a ceiling"
      >
        {/* Ceiling dashed line */}
        <line x1="18" y1="42" x2="342" y2="42" stroke="#ffffff" strokeOpacity=".16" strokeWidth="1.5" strokeDasharray="6 7" />
        <text x="342" y="34" fontFamily="'JetBrains Mono',monospace" fontSize="10" letterSpacing="1.5" fill="#5b6470" textAnchor="end">
          CEILING
        </text>
        {/* S-curve path */}
        <path
          d="M20 138 C 80 136, 120 96, 170 70 C 210 50, 250 47, 300 46 L 332 46"
          stroke="#00d4ff"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="332" cy="46" r="3.5" fill="#00d4ff" />
      </svg>

      {/* Caption */}
      <p
        style={{
          fontSize: "clamp(13px,1vw,14.5px)",
          color: "#c8c8c8",
          opacity: .5,
          lineHeight: 1.6,
          margin: "36px auto 0",
          maxWidth: "560px",
          whiteSpace: "pre-line",
        }}
      >
        {"Happy at your current size? Word of mouth is plenty.\nWant to grow? It's the thing quietly capping you."}
      </p>
    </section>
  );
}
