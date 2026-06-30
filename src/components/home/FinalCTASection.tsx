import Link from "next/link";
import IcebergPanel from "@/components/IcebergPanel";

export default function FinalCTASection() {
  return (
    <section
      className="section"
      style={{
        paddingTop: "120px",
        paddingBottom: "140px",
      }}
    >
      <div className="container centered" style={{ gap: "32px" }}>
        <p className="eyebrow" style={{ letterSpacing: "4px" }}>Ready When You Are</p>

        <h2
          className="display"
          style={{
            fontSize: "clamp(56px, 8vw, 130px)",
            lineHeight: 0.88,
            textAlign: "center",
            maxWidth: "900px",
          }}
        >
          Let&apos;s get your phone ringing.
        </h2>

        <p
          style={{
            fontSize: "16px",
            color: "var(--cds-body)",
            lineHeight: 1.8,
            fontFamily: "var(--font-inter)",
            textAlign: "center",
            maxWidth: "540px",
          }}
        >
          Tell us about your business. We&apos;ll show you exactly what&apos;s costing you jobs and
          how to fix it. No pressure, no jargon. Just a plain look at where you&apos;re missing
          opportunities.
        </p>

        <Link
          href="/contact"
          className="btn-primary"
          style={{ fontSize: "17px", padding: "18px 40px" }}
        >
          Get a Free Audit →
        </Link>

        <p style={{ fontSize: "14px", color: "var(--cds-muted)", fontFamily: "var(--font-inter)" }}>
          Or call us:{" "}
          <a
            href="tel:+16615359927"
            style={{ color: "var(--cds-heading)", fontWeight: 600 }}
          >
            (661) 535-9927
          </a>{" "}
          — a real person answers.
        </p>

        <IcebergPanel triggerLabel="What happens on a free audit?">
          We run your business through our live AI audit tool — checking your Google presence,
          your website performance, your local SEO rankings, and your review profile. You get a
          clear, honest picture of where you stand versus your top local competitors, and a specific
          recommendation on what to fix first. No pitch deck. No obligation. Just the numbers.
        </IcebergPanel>
      </div>
    </section>
  );
}
