import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main style={{ maxWidth: "40rem", margin: "0 auto", padding: "72px 20px 96px" }}>
      <h1 style={{ margin: "0 0 10px", fontSize: "1.8rem", color: "#0B1B2E" }}>
        Page not found
      </h1>
      <p style={{ margin: "0 0 12px", lineHeight: 1.65, color: "#2A2F36" }}>
        That checkout link is not available.
      </p>
      <p style={{ margin: 0 }}>
        <a href="https://catalyst-digital-solutions.com">
          Return to catalyst-digital-solutions.com
        </a>
      </p>
    </main>
  );
}
