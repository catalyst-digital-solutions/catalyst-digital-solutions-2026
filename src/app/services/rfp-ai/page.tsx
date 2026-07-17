import type { Metadata } from "next";
import ServicePageBody, { mono } from "@/components/services/ServicePageBody";

export const metadata: Metadata = {
  title: "Construction RFP AI — Catalyst Digital Solutions",
  description: "Stop hunting for bids. Let them find you. Daily bid portal monitoring, filtered to your trade — for $497/mo vs. $20k+/yr enterprise tools.",
};

function Comparison() {
  const cardBase = { background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.09)", borderRadius: "16px", padding: "30px 28px", display: "flex", flexDirection: "column" as const, gap: "10px" };
  return (
    <section style={{ position: "relative", padding: "clamp(60px,7vw,100px) clamp(20px,5vw,64px)", borderTop: "1px solid rgba(255,255,255,.06)" }}>
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <div style={mono("#b56bff")}>The comparison that closes it</div>
        <h2 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(32px,3.4vw,52px)", lineHeight: 0.94, letterSpacing: "1px", color: "#fafafa", margin: 0 }}>Enterprise results. Contractor pricing.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,270px),1fr))", gap: "16px", marginTop: "32px", alignItems: "stretch" }}>
          <div style={cardBase}>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "#9aa3b0" }}>Loopio</div>
            <div style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "38px", lineHeight: 1, color: "#c8c8c8" }}>$20,000&ndash;$55,000<span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "14px", color: "#7f8896" }}>/year</span></div>
            <div style={{ fontSize: "13.5px", color: "#7f8896", lineHeight: 1.6 }}>Enterprise RFP software, priced for enterprises.</div>
          </div>
          <div style={cardBase}>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "#9aa3b0" }}>AutoRFP</div>
            <div style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "38px", lineHeight: 1, color: "#c8c8c8" }}>$899&ndash;$1,299<span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "14px", color: "#7f8896" }}>/month</span></div>
            <div style={{ fontSize: "13.5px", color: "#7f8896", lineHeight: 1.6 }}>Generic RFP automation, not built for construction.</div>
          </div>
          <div style={{ background: "linear-gradient(180deg,rgba(128,0,255,.12),rgba(128,0,255,.04)),rgba(255,255,255,.02)", border: "1px solid rgba(128,0,255,.5)", borderRadius: "16px", padding: "30px 28px", display: "flex", flexDirection: "column", gap: "10px", boxShadow: "0 20px 60px rgba(128,0,255,.18)" }}>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "#b56bff" }}>Construction RFP AI</div>
            <div style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "44px", lineHeight: 1, color: "#fafafa" }}>$497<span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "14px", color: "#9aa3b0" }}>/month</span></div>
            <div style={{ fontSize: "13.5px", color: "#c8c8c8", lineHeight: 1.6 }}>Standalone &mdash; or included free in our top tier.</div>
          </div>
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(128,255,128,.08)", border: "1px solid rgba(128,255,128,.32)", borderRadius: "100px", padding: "13px 24px", marginTop: "32px" }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#80ff80" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
          <span style={{ fontSize: "clamp(15px,1.3vw,18px)", fontWeight: 600, color: "#80ff80" }}>15+ hours back every week that used to go to digging through government portals.</span>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <ServicePageBody
      breadcrumbLabel="CONSTRUCTION RFP AI"
      accent="#b56bff"
      eyebrow="Late Majority or market leader — pick one"
      h1="Stop hunting for bids. Let them find you."
      intro="Every new technology follows the same curve: Innovators, then Early Adopters, then the Early Majority — and that's the moment it stops being an edge and becomes the price of staying in business. The one that waits for “everyone else to do it first” is waiting to become a Late Majority, competing on price against companies that already automated the cost out of their overhead."
      ctaLabel="Start Finding Bids"
      includedHeading="What it does"
      items={[
        { color: "#b56bff", title: "Daily bid portal monitoring", desc: "Thousands of public sources, scanned around the clock." },
        { color: "#b56bff", title: "Filtered to your trade, license, and geography", desc: "Only the jobs that actually fit." },
        { color: "#b56bff", title: "Delivered straight to your inbox", desc: "Ready to bid every morning." },
      ]}
      extra={<Comparison />}
      finalCtaHeading="Get the edge before it becomes the entry fee."
    />
  );
}
