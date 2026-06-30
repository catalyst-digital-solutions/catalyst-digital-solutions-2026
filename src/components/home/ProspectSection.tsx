import IcebergPanel from "@/components/IcebergPanel";

function PhoneMockup() {
  return (
    <div
      style={{
        position: "relative",
        maxWidth: "280px",
        margin: "0 auto",
      }}
    >
      {/* Phone shell */}
      <div
        style={{
          background: "rgba(18,22,30,0.95)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "28px",
          padding: "24px 18px 32px",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Search bar */}
        <div
          style={{
            background: "rgba(255,255,255,0.06)",
            borderRadius: "8px",
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "20px",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ color: "var(--cds-muted)", flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: "11px", color: "var(--cds-muted)", fontFamily: "var(--font-inter)" }}>
            john&apos;s custom builders
          </span>
        </div>

        {/* Search result card */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            borderRadius: "10px",
            padding: "14px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {/* Profile row */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(128,0,255,0.2)",
                border: "1px solid rgba(128,0,255,0.3)",
                flexShrink: 0,
              }}
            />
            <div>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--cds-heading)", fontFamily: "var(--font-inter)" }}>
                John&apos;s Custom Builders
              </p>
              <p style={{ fontSize: "10px", color: "var(--cds-muted)", fontFamily: "var(--font-inter)" }}>
                ★ 1 review
              </p>
            </div>
          </div>

          {/* Dead links */}
          {["linktree.ee/jcbuilders", "Facebook", "Call us"].map((item) => (
            <div
              key={item}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "6px",
                padding: "8px 12px",
                fontSize: "11px",
                color: "var(--cds-muted)",
                fontFamily: "var(--font-inter)",
                textAlign: "center",
              }}
            >
              {item}
            </div>
          ))}

          {/* Dead social icons placeholder */}
          <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "6px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              />
            ))}
          </div>

          <p style={{ fontSize: "10px", color: "rgba(127,136,150,0.6)", fontFamily: "var(--font-inter)", textAlign: "center" }}>
            No posts since 2021
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ProspectSection() {
  return (
    <section className="section" style={{ paddingTop: "120px" }}>
      <div className="container">
        <div className="two-col-40-60" style={{ alignItems: "center" }}>
          {/* Left — Phone mockup */}
          <div className="reverse-mobile">
            <PhoneMockup />
          </div>

          {/* Right — Copy */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <p className="eyebrow">Before They Ever Call You</p>

            <h2
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 700,
                fontSize: "clamp(32px, 4vw, 56px)",
                color: "var(--cds-heading)",
                lineHeight: 1.15,
              }}
            >
              If a prospect looks you up, what do they find?
            </h2>

            <p style={{ fontSize: "15px", color: "var(--cds-body)", lineHeight: 1.8, fontFamily: "var(--font-inter)" }}>
              Before anyone hires you, they Google you. Your next big client might be doing it right
              now. So what shows up? A sharp website that makes you look like the pro you are? Real
              reviews? Completed job photos?
            </p>

            <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--cds-heading)", fontFamily: "var(--font-inter)" }}>
              Or do they just find a{" "}
              <span style={{ color: "var(--cds-purple-light)" }}>Linktree</span>?
            </p>

            <p style={{ fontSize: "15px", color: "var(--cds-body)", lineHeight: 1.8, fontFamily: "var(--font-inter)" }}>
              A dead Facebook page. One old review. Maybe nothing at all.
            </p>

            <p style={{ fontSize: "15px", color: "var(--cds-body)", lineHeight: 1.8, fontFamily: "var(--font-inter)" }}>
              The hard reality: if you look small online, you lose to the guy who looks more
              professional — even if your work is better.
            </p>

            <IcebergPanel triggerLabel="What should they find?">
              A fast, modern website that immediately establishes your credibility. Real project
              photos, genuine reviews, and a clear path to contact you. Your Google Business Profile
              optimized so you appear first. Content that answers every question before they even
              call. We build all of this — so the first impression you make online is the same as
              the impression you make on the job site.
            </IcebergPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
