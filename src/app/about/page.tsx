export default function Page() {
  return (
    <section
      style={{
        minHeight: "80dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        textAlign: "center",
        padding: "80px 24px",
      }}
    >
      <p className="eyebrow">Coming Soon</p>
      <h1
        className="display"
        style={{ fontSize: "clamp(42px, 5vw, 80px)" }}
      >
        About
      </h1>
      <p style={{ color: "var(--cds-muted)", maxWidth: "400px", lineHeight: 1.6 }}>
        This page is being built. Check back soon.
      </p>
    </section>
  );
}
