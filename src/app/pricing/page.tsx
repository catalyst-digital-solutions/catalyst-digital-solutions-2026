import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import PricingFAQ from "@/components/pricing/PricingFAQ";

/* CDS Pricing page — recreated from "CDS Pricing.dc.html" (design handoff).
   Copy is locked; transcribed verbatim. Only the FAQ is interactive
   (isolated in the PricingFAQ client component). Keeps the #pricing-cards
   anchor referenced by other pages' pricing links.
   Canonical tier names (must match everywhere): Foundation / Framework / Landmark. */

export const metadata: Metadata = {
  title: "Pricing — Catalyst Digital Solutions",
  description:
    "Transparent pricing, measurable results. Three tiers — Foundation ($1,497/mo), Framework ($2,997/mo), Landmark ($7,997/mo) — plus Construction RFP AI standalone at $497/mo. No contracts.",
};

function Row({ mark, color, bold, children }: { mark: "check" | "dash"; color: string; bold?: boolean; children: ReactNode }) {
  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
      <span style={{ color, fontSize: "14px", lineHeight: 1.6, flex: "none" }}>{mark === "check" ? "✓" : "—"}</span>
      <span style={{ fontSize: mark === "dash" ? "13.5px" : "14px", lineHeight: 1.6, color: mark === "dash" ? "#7f8896" : bold ? "#fafafa" : "#c8c8c8", fontWeight: bold ? 600 : 400 }}>{children}</span>
    </div>
  );
}

const tierKicker = (color: string): CSSProperties => ({
  fontFamily: "var(--font-jetbrains-mono), monospace",
  fontSize: "12px",
  letterSpacing: "2.5px",
  textTransform: "uppercase",
  color,
});
const tierName: CSSProperties = {
  fontFamily: "var(--font-bebas-neue), sans-serif",
  fontWeight: 400,
  textTransform: "uppercase",
  fontSize: "40px",
  lineHeight: 1,
  letterSpacing: "1px",
  color: "#fafafa",
  margin: "10px 0 0",
};
const tierPriceWrap: CSSProperties = { display: "flex", alignItems: "baseline", gap: "6px", marginTop: "16px" };
const tierPrice: CSSProperties = { fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "52px", lineHeight: 1, color: "#fafafa" };
const tierPer: CSSProperties = { fontSize: "14px", color: "#7f8896" };
const featureCol: CSSProperties = { display: "flex", flexDirection: "column", gap: "12px", flex: 1 };

const secEyebrow = (color: string): CSSProperties => ({
  fontFamily: "var(--font-jetbrains-mono), monospace",
  fontSize: "13px",
  letterSpacing: "3px",
  textTransform: "uppercase",
  color,
});
const secH2: CSSProperties = {
  fontFamily: "var(--font-bebas-neue), sans-serif",
  fontWeight: 400,
  textTransform: "uppercase",
  fontSize: "clamp(38px,4.4vw,68px)",
  lineHeight: 0.94,
  letterSpacing: "1px",
  color: "#fafafa",
  margin: "14px 0 0",
  textWrap: "balance",
};

export default function Page() {
  return (
    <div style={{ background: "#080b0f", fontFamily: "var(--font-inter), sans-serif", color: "#c8c8c8" }}>
      {/* ============ HERO ============ */}
      <section style={{ position: "relative", overflow: "hidden", textAlign: "center", padding: "clamp(90px,12vw,150px) clamp(20px,5vw,64px) clamp(50px,6vw,80px)" }}>
        <div style={{ position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: "760px", height: "760px", maxWidth: "110vw", background: "radial-gradient(circle at center,rgba(128,0,255,.15),transparent 64%)", filter: "blur(28px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "820px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          <div style={secEyebrow("#00d4ff")}>Pricing</div>
          <h1 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(46px,5.6vw,92px)", lineHeight: 0.9, letterSpacing: "1px", color: "#fafafa", margin: 0, textWrap: "balance" }}>
            Transparent pricing. Measurable results.
          </h1>
          <p style={{ fontSize: "clamp(16px,1.25vw,18px)", color: "#c8c8c8", lineHeight: 1.7, margin: 0, maxWidth: "560px", textWrap: "pretty" }}>
            No discovery fees. No hidden costs. No contracts you can&apos;t get out of. Just a clear program that pays for itself.
          </p>
        </div>
      </section>

      {/* ============ TIERS ============ */}
      <section id="pricing-cards" style={{ position: "relative", padding: "clamp(30px,4vw,60px) clamp(20px,5vw,64px) clamp(50px,6vw,80px)" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,310px),1fr))", gap: "clamp(20px,2.2vw,26px)", alignItems: "stretch" }}>

          {/* TIER 1 FOUNDATION */}
          <div style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.10)", borderRadius: "18px", padding: "34px 30px", display: "flex", flexDirection: "column" }}>
            <div style={tierKicker("#00d4ff")}>Tier 1</div>
            <h2 style={tierName}>Foundation</h2>
            <div style={tierPriceWrap}><span style={tierPrice}>$1,497</span><span style={tierPer}>/mo</span></div>
            <p style={{ fontSize: "14.5px", fontStyle: "italic", color: "#9aa3b0", margin: "12px 0 0" }}>&ldquo;Get found. Look professional.&rdquo;</p>
            <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,.08)", margin: "24px 0" }} />
            <div style={featureCol}>
              <Row mark="check" color="#00d4ff">Custom Next.js website on Vercel</Row>
              <Row mark="check" color="#00d4ff">On-page SEO + technical optimization</Row>
              <Row mark="check" color="#00d4ff">Google Business Profile setup &amp; management</Row>
              <Row mark="check" color="#00d4ff">GA4 analytics + conversion tracking</Row>
              <Row mark="check" color="#00d4ff">Monthly maintenance + performance reporting</Row>
              <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,.06)", margin: "6px 0" }} />
              <Row mark="dash" color="#7f8896">No AI content/video generation</Row>
              <Row mark="dash" color="#7f8896">No social media management</Row>
              <Row mark="dash" color="#7f8896">No call tracking</Row>
              <Row mark="dash" color="#7f8896">No programmatic SEO</Row>
            </div>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "9px", minHeight: "48px", fontFamily: "var(--font-inter), sans-serif", fontSize: "15px", fontWeight: 600, color: "#fafafa", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.2)", padding: "14px 24px", borderRadius: "11px", marginTop: "28px", textDecoration: "none" }}>Start With Foundation</Link>
          </div>

          {/* TIER 2 FRAMEWORK */}
          <div style={{ position: "relative", background: "linear-gradient(180deg,rgba(128,0,255,.12),rgba(128,0,255,.03)),rgba(255,255,255,.02)", border: "1px solid rgba(128,0,255,.55)", borderRadius: "18px", padding: "34px 30px", display: "flex", flexDirection: "column", boxShadow: "0 0 60px rgba(128,0,255,.16)" }}>
            <div style={{ position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#fff", background: "linear-gradient(135deg,#8000ff,#5600ab)", borderRadius: "999px", padding: "6px 16px", whiteSpace: "nowrap", boxShadow: "0 6px 20px rgba(128,0,255,.5)" }}>Most Popular</div>
            <div style={tierKicker("#b56bff")}>Tier 2</div>
            <h2 style={tierName}>Framework</h2>
            <div style={tierPriceWrap}><span style={tierPrice}>$2,997</span><span style={tierPer}>/mo</span></div>
            <p style={{ fontSize: "14.5px", fontStyle: "italic", color: "#c8a8ff", margin: "12px 0 0" }}>&ldquo;Become the contractor they call first.&rdquo;</p>
            <div style={{ width: "100%", height: "1px", background: "rgba(128,0,255,.3)", margin: "24px 0" }} />
            <div style={featureCol}>
              <Row mark="check" color="#b56bff" bold>Everything in Foundation, plus:</Row>
              <Row mark="check" color="#b56bff">12&ndash;16 AI-generated videos/month</Row>
              <Row mark="check" color="#b56bff">36&ndash;96 short-form clips/month auto-distributed to YouTube, TikTok, IG Reels, LinkedIn</Row>
              <Row mark="check" color="#b56bff">Advanced SEO + keyword tracking + competitor analysis</Row>
              <Row mark="check" color="#b56bff">Local SEO + citations</Row>
              <Row mark="check" color="#b56bff">Programmatic SEO &mdash; hundreds of location + service pages</Row>
              <Row mark="check" color="#b56bff">GEO/AEO optimization</Row>
              <Row mark="check" color="#b56bff">Call tracking with source attribution</Row>
              <Row mark="check" color="#b56bff">CRM setup with basic automation</Row>
            </div>
            <div style={{ background: "rgba(128,0,255,.10)", border: "1px solid rgba(128,0,255,.35)", borderRadius: "11px", padding: "14px 16px", marginTop: "20px" }}>
              <p style={{ fontSize: "13px", color: "#d9c2ff", lineHeight: 1.6, margin: 0, textWrap: "pretty" }}>For $1,500 more than Tier 1, this includes an entire AI content factory (48&ndash;112 pieces/month) plus programmatic SEO that alone costs $3,000+ elsewhere.</p>
            </div>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "9px", minHeight: "48px", fontFamily: "var(--font-inter), sans-serif", fontSize: "15px", fontWeight: 600, color: "#fff", background: "linear-gradient(135deg,#8000ff,#5600ab)", border: "none", padding: "14px 24px", borderRadius: "11px", marginTop: "20px", boxShadow: "0 10px 34px rgba(128,0,255,.4)", textDecoration: "none" }}>Get Framework</Link>
          </div>

          {/* TIER 3 LANDMARK */}
          <div style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(0,212,255,.3)", borderRadius: "18px", padding: "34px 30px", display: "flex", flexDirection: "column" }}>
            <div style={tierKicker("#00d4ff")}>Tier 3</div>
            <h2 style={tierName}>Landmark</h2>
            <div style={tierPriceWrap}><span style={tierPrice}>$7,997</span><span style={tierPer}>/mo</span></div>
            <p style={{ fontSize: "14.5px", fontStyle: "italic", color: "#8fdcff", margin: "12px 0 0" }}>&ldquo;The obvious choice in every market you enter.&rdquo;</p>
            <div style={{ width: "100%", height: "1px", background: "rgba(0,212,255,.25)", margin: "24px 0" }} />
            <div style={featureCol}>
              <Row mark="check" color="#00d4ff" bold>Everything in Framework, plus:</Row>
              <Row mark="check" color="#00d4ff">20&ndash;30 AI videos/month + 60&ndash;180 short-form clips</Row>
              <Row mark="check" color="#00d4ff">24/7 AI Voice Agent</Row>
              <Row mark="check" color="#00d4ff">AI website chatbot (RAG-powered)</Row>
              <Row mark="check" color="#00d4ff">Construction RFP AI included free <span style={{ color: "#80ff80" }}>(worth $497/mo standalone)</span></Row>
              <Row mark="check" color="#00d4ff">AI review generation</Row>
              <Row mark="check" color="#00d4ff">Fractional CTO/CMO strategy sessions</Row>
              <Row mark="check" color="#00d4ff">Competitive intelligence monitoring</Row>
              <Row mark="check" color="#00d4ff">Full automation suite</Row>
              <Row mark="check" color="#00d4ff">Priority support with dedicated Slack</Row>
            </div>
            <div style={{ background: "rgba(0,212,255,.06)", border: "1px solid rgba(0,212,255,.25)", borderRadius: "11px", padding: "14px 16px", marginTop: "20px" }}>
              <p style={{ fontSize: "13px", color: "#9fdfff", lineHeight: 1.6, margin: 0, textWrap: "pretty" }}>RFP AI alone: comparable tools (Loopio) cost $20,000&ndash;$55,000/yr; AutoRFP starts at $899/mo. Included free here.</p>
            </div>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "9px", minHeight: "48px", fontFamily: "var(--font-inter), sans-serif", fontSize: "15px", fontWeight: 600, color: "#fafafa", background: "rgba(0,212,255,.08)", border: "1px solid rgba(0,212,255,.4)", padding: "14px 24px", borderRadius: "11px", marginTop: "20px", textDecoration: "none" }}>Let&apos;s Talk Landmark</Link>
          </div>
        </div>
      </section>

      {/* ============ RFP AI STANDALONE ============ */}
      <section style={{ position: "relative", padding: "clamp(40px,5vw,70px) clamp(20px,5vw,64px) clamp(70px,8vw,110px)" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(28px,3.4vw,44px)" }}>
            <div style={secEyebrow("#80ff80")}>A different path</div>
            <h2 style={{ ...secH2, fontSize: "clamp(34px,3.8vw,58px)" }}>Just want the bids?</h2>
          </div>
          <div style={{ position: "relative", background: "linear-gradient(120deg,rgba(128,255,128,.06),rgba(0,212,255,.04) 60%,transparent),rgba(255,255,255,.02)", border: "1px solid rgba(128,255,128,.3)", borderRadius: "20px", padding: "clamp(30px,4vw,52px)", display: "flex", flexWrap: "wrap", gap: "clamp(28px,4vw,56px)", alignItems: "center" }}>
            <div style={{ flex: "1 1 420px", minWidth: "290px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px" }}>
                <h3 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(30px,2.8vw,42px)", lineHeight: 1, letterSpacing: "1px", color: "#fafafa", margin: 0 }}>Construction RFP AI</h3>
                <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "11.5px", color: "#80ff80", background: "rgba(128,255,128,.08)", border: "1px solid rgba(128,255,128,.35)", borderRadius: "999px", padding: "5px 12px", whiteSpace: "nowrap" }}>Standalone add-on</span>
              </div>
              <p style={{ fontSize: "15.5px", color: "#c8c8c8", lineHeight: 1.7, margin: "16px 0 0", maxWidth: "520px", textWrap: "pretty" }}>Already using another agency? Fine. Add this to any existing setup &mdash; no retainer required.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "11px", marginTop: "22px" }}>
                <Row mark="check" color="#80ff80">Monitors thousands of public bid portals 24/7</Row>
                <Row mark="check" color="#80ff80">Filters by trade, license, and geography</Row>
                <Row mark="check" color="#80ff80">Delivers relevant RFPs directly to your inbox</Row>
                <Row mark="check" color="#80ff80">Competitor bid tracking</Row>
                <Row mark="check" color="#80ff80">Saves 15+ hours/week on opportunity discovery</Row>
              </div>
            </div>
            <div style={{ flex: "1 1 280px", minWidth: "260px", maxWidth: "380px", display: "flex", flexDirection: "column", gap: "18px" }}>
              <div style={{ textAlign: "center", background: "rgba(8,11,15,.6)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "16px", padding: "28px 24px" }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: "6px" }}>
                  <span style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "64px", lineHeight: 1, color: "#80ff80" }}>$497</span>
                  <span style={{ fontSize: "15px", color: "#7f8896" }}>/mo</span>
                </div>
                <div style={{ fontSize: "13px", color: "#9aa3b0", lineHeight: 1.65, marginTop: "14px", textWrap: "pretty" }}>Comparable tools: Loopio ($20,000&ndash;$55,000/yr) &middot; AutoRFP ($899&ndash;$1,299/mo)</div>
              </div>
              <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "9px", minHeight: "48px", fontFamily: "var(--font-inter), sans-serif", fontSize: "15px", fontWeight: 600, color: "#080b0f", background: "#80ff80", border: "none", padding: "14px 24px", borderRadius: "11px", boxShadow: "0 10px 34px rgba(128,255,128,.25)", textDecoration: "none" }}>Add RFP AI to My Stack</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CLIENT RESULTS ============
          Commented out until we have real client quotes/results for this
          page — reuse this exact markup/formatting when they're ready.
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(70px,8vw,110px) clamp(20px,5vw,64px)", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ position: "absolute", bottom: "-24%", right: "-10%", width: "640px", height: "640px", maxWidth: "90vw", background: "radial-gradient(circle at center,rgba(0,212,255,.10),transparent 64%)", filter: "blur(28px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1180px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto clamp(44px,5vw,64px)" }}>
            <div style={secEyebrow("#00d4ff")}>Client results</div>
            <h2 style={secH2}>Don't take our word for it</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))", gap: "clamp(20px,2.4vw,28px)", alignItems: "stretch" }}>
            <figure style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.09)", borderRadius: "18px", padding: "clamp(28px,3vw,40px)", margin: 0, display: "flex", flexDirection: "column", gap: "22px" }}>
              <div style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "64px", lineHeight: 0.5, color: "rgba(0,212,255,.5)", marginTop: "14px" }}>"</div>
              <blockquote style={{ margin: 0, fontSize: "15.5px", lineHeight: 1.75, color: "#c8c8c8", textWrap: "pretty" }}>Before Catalyst, I was spending hours every week hunting for bids on government portals and still missing half of them. Within 30 days of turning on their RFP AI, I had a pipeline full of opportunities I never would have found on my own. In the first quarter, we submitted 40% more bids than the same period last year — and won three projects that more than covered the entire annual cost of the program. Mario doesn't sell you 'marketing.' He builds you infrastructure that scales your company to the 9-digit mark!</blockquote>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "11.5px", color: "#00d4ff", background: "rgba(0,212,255,.07)", border: "1px solid rgba(0,212,255,.3)", borderRadius: "999px", padding: "5px 12px", whiteSpace: "nowrap" }}>+40% bids submitted Q1</span>
                <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "11.5px", color: "#80ff80", background: "rgba(128,255,128,.07)", border: "1px solid rgba(128,255,128,.3)", borderRadius: "999px", padding: "5px 12px", whiteSpace: "nowrap" }}>3 projects won from RFP AI</span>
                <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "11.5px", color: "#b56bff", background: "rgba(128,0,255,.08)", border: "1px solid rgba(128,0,255,.3)", borderRadius: "999px", padding: "5px 12px", whiteSpace: "nowrap" }}>ROI in first 90 days</span>
              </div>
              <figcaption style={{ marginTop: "auto", paddingTop: "6px" }}>
                <div style={{ fontWeight: 700, fontSize: "15px", color: "#fafafa" }}>Scott Baxter</div>
                <div style={{ fontSize: "13px", color: "#7f8896", marginTop: "3px" }}>Freedom Engineering, Inc. — Commercial GC, Bakersfield, CA</div>
              </figcaption>
            </figure>

            <figure style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.09)", borderRadius: "18px", padding: "clamp(28px,3vw,40px)", margin: 0, display: "flex", flexDirection: "column", gap: "22px" }}>
              <div style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "64px", lineHeight: 0.5, color: "rgba(181,107,255,.5)", marginTop: "14px" }}>"</div>
              <blockquote style={{ margin: 0, fontSize: "15.5px", lineHeight: 1.75, color: "#c8c8c8", textWrap: "pretty" }}>We came to Mario needing a website. What we left with was an entirely different operation. He built us a professional site that actually converts, set up an AI content system that keeps our name in front of clients without us lifting a finger, and then built our entire Digital Operations Hub — our internal intranet — from scratch. Our team went from using a dozen disconnected tools to having everything in one place. The website alone paid for itself in the first month.</blockquote>
              <figcaption style={{ marginTop: "auto", paddingTop: "6px" }}>
                <div style={{ fontWeight: 700, fontSize: "15px", color: "#fafafa" }}>Evert Calderon</div>
                <div style={{ fontSize: "13px", color: "#7f8896", marginTop: "3px" }}>Mesa Group Consulting — Founder/CEO, Bakersfield, CA</div>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
      */}

      {/* ============ FAQ ============ */}
      <section style={{ position: "relative", padding: "clamp(70px,8vw,110px) clamp(20px,5vw,64px)", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(40px,5vw,56px)" }}>
            <div style={secEyebrow("#00d4ff")}>Straight answers</div>
            <h2 style={{ ...secH2, textWrap: "balance" }}>Questions we actually get</h2>
          </div>
          <PricingFAQ />
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section style={{ position: "relative", overflow: "hidden", textAlign: "center", padding: "clamp(70px,9vw,120px) clamp(20px,5vw,64px) clamp(90px,11vw,140px)" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "700px", height: "700px", maxWidth: "120vw", background: "radial-gradient(circle,rgba(128,0,255,.16),transparent 64%)", filter: "blur(24px)", pointerEvents: "none", animation: "floatY 12s ease-in-out infinite" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "620px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <div style={secEyebrow("#00d4ff")}>No pressure</div>
          <h2 style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 700, fontSize: "clamp(26px,2.6vw,36px)", lineHeight: 1.25, color: "#fafafa", margin: 0, textWrap: "balance" }}>
            Not sure which fits? Fifteen minutes settles it.
          </h2>
          <p style={{ fontSize: "clamp(15.5px,1.1vw,17px)", color: "#c8c8c8", lineHeight: 1.7, margin: 0, textWrap: "pretty" }}>
            Tell me where you&apos;re losing jobs. I&apos;ll tell you &mdash; straight &mdash; whether we can fix it, and which plan actually makes sense for you.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", marginTop: "10px" }}>
            <Link href="/contact" className="cta-full" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "48px", fontFamily: "var(--font-inter), sans-serif", fontSize: "16px", fontWeight: 600, color: "#fff", background: "linear-gradient(135deg,#8000ff,#5600ab)", border: "none", padding: "16px 30px", borderRadius: "11px", boxShadow: "0 10px 34px rgba(128,0,255,.4)", textDecoration: "none" }}>
              Book a 15-Minute Call <span style={{ fontSize: "18px" }}>&rarr;</span>
            </Link>
            <a href="tel:+16615359927" className="cta-full" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "48px", fontFamily: "var(--font-inter), sans-serif", fontSize: "16px", fontWeight: 600, color: "#fafafa", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.18)", padding: "16px 28px", borderRadius: "11px", textDecoration: "none" }}>
              Call (661) 535-9927
            </a>
          </div>
          <p style={{ fontSize: "13px", color: "#7f8896", margin: "4px 0 0" }}>Month-to-month. No setup fee. You keep everything we build.</p>
        </div>
      </section>
    </div>
  );
}
