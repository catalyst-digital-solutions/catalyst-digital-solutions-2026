import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";

/* CDS Services page — recreated from "CDS Services.dc.html" (design handoff).
   Copy is locked; transcribed verbatim. Shared Nav/Footer come from the root
   layout. No client interactivity (scroll chrome lives in Nav). */

export const metadata: Metadata = {
  title: "Services — Catalyst Digital Solutions",
  description:
    "One growth engine. Five working parts: Website & Foundation, SEO, Content & Video, AI Tools, and Reporting & Strategy. Systems built for construction that keep working after they're built.",
};

const rowSection: CSSProperties = {
  position: "relative",
  padding: "clamp(60px,7vw,100px) clamp(20px,5vw,64px)",
  borderTop: "1px solid rgba(255,255,255,.06)",
};
const rowInner: CSSProperties = {
  maxWidth: "1180px",
  margin: "0 auto",
  display: "flex",
  flexWrap: "wrap",
  gap: "clamp(32px,4vw,64px)",
  alignItems: "flex-start",
};
const numWrap: CSSProperties = {
  flex: "0 0 auto",
  display: "flex",
  alignItems: "baseline",
  gap: "16px",
  minWidth: "220px",
};
const bodyCol: CSSProperties = { flex: "1 1 480px", minWidth: "300px" };
const h2Style: CSSProperties = {
  fontFamily: "var(--font-bebas-neue), sans-serif",
  fontWeight: 400,
  textTransform: "uppercase",
  fontSize: "clamp(34px,3.6vw,56px)",
  lineHeight: 0.94,
  letterSpacing: "1px",
  color: "#fafafa",
  margin: 0,
};
const leadP: CSSProperties = {
  fontSize: "clamp(15.5px,1.2vw,17.5px)",
  color: "#c8c8c8",
  lineHeight: 1.75,
  margin: "18px 0 0",
  maxWidth: "600px",
  textWrap: "pretty",
};
const checkGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,250px),1fr))",
  gap: "12px",
  marginTop: "26px",
};

function BigNumber({ n, stroke, line }: { n: string; stroke: string; line: string }) {
  return (
    <div style={numWrap}>
      <span
        style={{
          fontFamily: "var(--font-bebas-neue), sans-serif",
          fontSize: "clamp(72px,7vw,110px)",
          lineHeight: 0.8,
          color: "transparent",
          WebkitTextStroke: `1.5px ${stroke}`,
        }}
      >
        {n}
      </span>
      <div style={{ width: "44px", height: "2px", background: `linear-gradient(90deg,${line},transparent)`, marginBottom: "8px" }} />
    </div>
  );
}

function CheckItem({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: "11px", alignItems: "flex-start", background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.09)", borderRadius: "12px", padding: "16px 18px" }}>
      <span style={{ color, fontSize: "15px", lineHeight: 1.5, flex: "none" }}>&#10003;</span>
      <span style={{ fontSize: "14.5px", lineHeight: 1.6, color: "#c8c8c8" }}>{children}</span>
    </div>
  );
}

function ToolCard({ title, desc, featured }: { title: string; desc: string; featured?: boolean }) {
  return (
    <div
      style={
        featured
          ? { background: "linear-gradient(180deg,rgba(0,212,255,.07),rgba(0,212,255,.02)),rgba(255,255,255,.02)", border: "1px solid rgba(0,212,255,.35)", borderRadius: "12px", padding: "18px 20px" }
          : { background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.09)", borderRadius: "12px", padding: "18px 20px" }
      }
    >
      <div style={{ fontWeight: 600, fontSize: "15px", color: "#fafafa" }}>{title}</div>
      <div style={{ fontSize: "13.5px", color: "#9aa3b0", lineHeight: 1.6, marginTop: "6px" }}>{desc}</div>
    </div>
  );
}

export default function Page() {
  return (
    <div style={{ background: "#080b0f", fontFamily: "var(--font-inter), sans-serif", color: "#c8c8c8" }}>
      {/* ============ HERO ============ */}
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(80px,10vw,140px) clamp(20px,5vw,64px) clamp(60px,7vw,100px)" }}>
        <div style={{ position: "absolute", top: "-18%", right: "-10%", width: "640px", height: "640px", maxWidth: "90vw", background: "radial-gradient(circle at center,rgba(0,212,255,.13),transparent 64%)", filter: "blur(28px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1180px", margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", color: "#00d4ff" }}>What we build</div>
          <h1 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(46px,5.6vw,92px)", lineHeight: 0.9, letterSpacing: "1px", color: "#fafafa", margin: "18px 0 0", maxWidth: "900px", textWrap: "balance" }}>
            One growth engine. Five working parts.
          </h1>
          <p style={{ fontSize: "clamp(16px,1.25vw,18px)", color: "#c8c8c8", lineHeight: 1.7, margin: "24px 0 0", maxWidth: "600px", textWrap: "pretty" }}>
            Every capability below is a system that keeps working after it&apos;s built. Here&apos;s the full inventory &mdash; how they bundle together lives on the{" "}
            <Link href="/pricing" style={{ color: "#00d4ff", textDecoration: "none", borderBottom: "1px solid rgba(0,212,255,.4)" }}>pricing page</Link>.
          </p>

          {/* index strip */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "38px" }}>
            <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "12px", color: "#00d4ff", background: "rgba(0,212,255,.07)", border: "1px solid rgba(0,212,255,.3)", borderRadius: "999px", padding: "7px 14px", whiteSpace: "nowrap" }}>01 &middot; Website &amp; Foundation</span>
            <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "12px", color: "#b56bff", background: "rgba(128,0,255,.08)", border: "1px solid rgba(128,0,255,.3)", borderRadius: "999px", padding: "7px 14px", whiteSpace: "nowrap" }}>02 &middot; SEO</span>
            <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "12px", color: "#80ff80", background: "rgba(128,255,128,.07)", border: "1px solid rgba(128,255,128,.3)", borderRadius: "999px", padding: "7px 14px", whiteSpace: "nowrap" }}>03 &middot; Content &amp; Video</span>
            <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "12px", color: "#00d4ff", background: "rgba(0,212,255,.07)", border: "1px solid rgba(0,212,255,.3)", borderRadius: "999px", padding: "7px 14px", whiteSpace: "nowrap" }}>04 &middot; AI Tools</span>
            <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "12px", color: "#b56bff", background: "rgba(128,0,255,.08)", border: "1px solid rgba(128,0,255,.3)", borderRadius: "999px", padding: "7px 14px", whiteSpace: "nowrap" }}>05 &middot; Reporting &amp; Strategy</span>
          </div>
        </div>
      </section>

      {/* ============ CAPABILITY 01 ============ */}
      <section id="launchpad" style={rowSection}>
        <div style={rowInner}>
          <BigNumber n="01" stroke="rgba(0,212,255,.55)" line="#00d4ff" />
          <div style={bodyCol}>
            <h2 style={h2Style}>Website &amp; Foundation</h2>
            <p style={leadP}>The ground floor. A fast, custom-built site that makes you look like the obvious professional &mdash; plus the plumbing that tells you exactly where every call came from.</p>
            <div style={checkGrid}>
              <CheckItem color="#00d4ff">Custom Next.js website deployed on Vercel</CheckItem>
              <CheckItem color="#00d4ff">Google Business Profile setup &amp; management</CheckItem>
              <CheckItem color="#00d4ff">GA4 analytics &amp; conversion tracking</CheckItem>
              <CheckItem color="#00d4ff">Monthly maintenance &amp; reporting</CheckItem>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CAPABILITY 02 ============ */}
      <section style={rowSection}>
        <div style={rowInner}>
          <BigNumber n="02" stroke="rgba(181,107,255,.55)" line="#b56bff" />
          <div style={bodyCol}>
            <h2 style={h2Style}>SEO &mdash; Google and beyond</h2>
            <p style={leadP}>Ranking isn&apos;t just Google anymore. We optimize for the searches contractors&apos; customers actually make &mdash; including the AI answer engines that increasingly make the recommendation for them.</p>
            <div style={checkGrid}>
              <CheckItem color="#b56bff">On-page &amp; technical SEO</CheckItem>
              <CheckItem color="#b56bff">Advanced SEO with keyword tracking</CheckItem>
              <CheckItem color="#b56bff">Local SEO &amp; citations</CheckItem>
              <CheckItem color="#b56bff">Programmatic SEO &mdash; hundreds of location &amp; service pages at scale</CheckItem>
              <CheckItem color="#b56bff">GEO/AEO optimization &mdash; how AI answer engines find &amp; recommend your business</CheckItem>
            </div>
          </div>
        </div>
      </section>

      {/* ============ POSITIONING BAND ============ */}
      <section style={{ position: "relative", overflow: "hidden", textAlign: "center", padding: "clamp(80px,10vw,130px) clamp(20px,5vw,64px)", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "780px", height: "780px", maxWidth: "130vw", background: "radial-gradient(circle,rgba(128,0,255,.18),transparent 64%)", filter: "blur(24px)", pointerEvents: "none", animation: "floatY 12s ease-in-out infinite" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "820px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "22px" }}>
          <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", color: "#00d4ff" }}>Why construction</div>
          <h2 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(38px,4.6vw,72px)", lineHeight: 0.92, letterSpacing: "1px", color: "#fafafa", margin: 0, textWrap: "balance" }}>
            Most agencies avoid this industry. We built our whole model around it.
          </h2>
          <p style={{ fontSize: "clamp(16px,1.25vw,18px)", color: "#c8c8c8", lineHeight: 1.7, margin: 0, maxWidth: "640px", textWrap: "pretty" }}>
            Construction is underserved online because bidding cycles and RFPs don&apos;t fit the standard agency playbook. That&apos;s exactly why Catalyst exists &mdash; the whole model was built around this niche specifically.
          </p>
        </div>
      </section>

      {/* ============ CAPABILITY 03 ============ */}
      <section style={rowSection}>
        <div style={rowInner}>
          <BigNumber n="03" stroke="rgba(128,255,128,.5)" line="#80ff80" />
          <div style={bodyCol}>
            <h2 style={h2Style}>Content &amp; Video</h2>
            <p style={leadP}>A content factory that runs without you. Your name stays in front of customers every week &mdash; while you&apos;re on the jobsite, not behind a camera.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginTop: "26px" }}>
              <div style={{ flex: "1 1 200px", minWidth: "180px", background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.09)", borderRadius: "14px", padding: "22px 20px" }}>
                <div style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "38px", lineHeight: 1, color: "#80ff80" }}>12&ndash;30</div>
                <div style={{ fontSize: "13.5px", color: "#c8c8c8", lineHeight: 1.55, marginTop: "8px" }}>AI-generated videos per month, depending on scope</div>
              </div>
              <div style={{ flex: "1 1 200px", minWidth: "180px", background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.09)", borderRadius: "14px", padding: "22px 20px" }}>
                <div style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "38px", lineHeight: 1, color: "#80ff80" }}>36&ndash;180</div>
                <div style={{ fontSize: "13.5px", color: "#c8c8c8", lineHeight: 1.55, marginTop: "8px" }}>Short-form clips auto-extracted from those videos</div>
              </div>
              <div style={{ flex: "1 1 200px", minWidth: "180px", background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.09)", borderRadius: "14px", padding: "22px 20px" }}>
                <div style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "38px", lineHeight: 1, color: "#80ff80" }}>4</div>
                <div style={{ fontSize: "13.5px", color: "#c8c8c8", lineHeight: 1.55, marginTop: "8px" }}>Platforms, auto-distributed: YouTube, TikTok, Instagram Reels, LinkedIn</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CAPABILITY 04 ============ */}
      <section id="rfp-ai" style={rowSection}>
        <div style={rowInner}>
          <BigNumber n="04" stroke="rgba(0,212,255,.55)" line="#00d4ff" />
          <div style={bodyCol}>
            <h2 style={h2Style}>AI Tools</h2>
            <p style={leadP}>The part that keeps working at 2am. Systems that answer, qualify, book, follow up, and hunt for bids &mdash; so nothing depends on you being available.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: "12px", marginTop: "26px" }}>
              <ToolCard title="24/7 AI Voice Agent" desc="Answers calls, qualifies leads, and books appointments — around the clock." />
              <ToolCard featured title="Construction RFP AI" desc="Monitors public bid portals 24/7, filters by trade, license, and geography, and delivers relevant bids straight to your inbox." />
              <ToolCard title="AI Website Chatbot" desc="Trained on your own services — answers visitors like someone who works there." />
              <ToolCard title="Call Tracking" desc="Source attribution on every call — know exactly what's making the phone ring." />
              <ToolCard title="CRM + Automation" desc="Setup and automation so leads get followed up — every time, automatically." />
              <ToolCard title="AI Review Generation" desc="Post-job SMS requests that turn finished work into five-star proof." />
            </div>
          </div>
        </div>
      </section>

      {/* ============ CAPABILITY 05 ============ */}
      <section style={rowSection}>
        <div style={rowInner}>
          <BigNumber n="05" stroke="rgba(181,107,255,.55)" line="#b56bff" />
          <div style={bodyCol}>
            <h2 style={h2Style}>Reporting &amp; Strategy</h2>
            <p style={leadP}>You&apos;ll never wonder what you&apos;re paying for. Numbers every month, a straight read on your competitors, and a strategic partner in the room when it&apos;s time to decide what&apos;s next.</p>
            <div style={checkGrid}>
              <CheckItem color="#b56bff">Monthly performance reporting</CheckItem>
              <CheckItem color="#b56bff">Competitor analysis</CheckItem>
              <CheckItem color="#b56bff">Fractional CTO/CMO strategy sessions</CheckItem>
              <CheckItem color="#b56bff">Competitive intelligence monitoring</CheckItem>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section style={{ position: "relative", textAlign: "center", padding: "clamp(70px,9vw,120px) clamp(20px,5vw,64px) clamp(90px,11vw,140px)", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ position: "relative", zIndex: 1, maxWidth: "620px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", color: "#00d4ff" }}>Next step</div>
          <h2 style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 700, fontSize: "clamp(26px,2.6vw,36px)", lineHeight: 1.25, color: "#fafafa", margin: 0, textWrap: "balance" }}>
            See how these bundle into plans &mdash; or just ask.
          </h2>
          <p style={{ fontSize: "clamp(15.5px,1.1vw,17px)", color: "#c8c8c8", lineHeight: 1.7, margin: 0, textWrap: "pretty" }}>
            Three tiers, transparent pricing, no contracts you can&apos;t get out of. Or start with a free audit and we&apos;ll tell you what you actually need.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", marginTop: "10px" }}>
            <Link href="/pricing" className="cta-full" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "48px", fontFamily: "var(--font-inter), sans-serif", fontSize: "16px", fontWeight: 600, color: "#fff", background: "linear-gradient(135deg,#8000ff,#5600ab)", border: "none", padding: "16px 30px", borderRadius: "11px", boxShadow: "0 10px 34px rgba(128,0,255,.4)", textDecoration: "none" }}>
              See the Plans <span style={{ fontSize: "18px" }}>&rarr;</span>
            </Link>
            <Link href="/contact" className="cta-full" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "48px", fontFamily: "var(--font-inter), sans-serif", fontSize: "16px", fontWeight: 600, color: "#fafafa", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.18)", padding: "16px 28px", borderRadius: "11px", textDecoration: "none" }}>
              Get a Free Audit <span style={{ fontSize: "18px" }}>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
