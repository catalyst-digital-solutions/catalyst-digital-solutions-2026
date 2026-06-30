"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          background: "#080b0f",
          color: "#fafafa",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100dvh",
          gap: "16px",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <p style={{ fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", color: "#00d4ff" }}>
          Something went wrong
        </p>
        <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 700, margin: 0 }}>
          Unexpected Error
        </h1>
        <button
          onClick={() => reset()}
          style={{
            padding: "14px 28px",
            background: "linear-gradient(135deg,#8000ff,#5600ab)",
            color: "#fff",
            border: "none",
            borderRadius: "11px",
            fontSize: "15px",
            fontWeight: 600,
            cursor: "pointer",
            marginTop: "8px",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
