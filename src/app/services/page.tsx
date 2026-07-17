import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { mono } from "@/components/services/ServicePageBody";

/* CDS Services hub — recreated from the Claude Design "brand guide (2)"
   export's CDS Services.dc.html (7-card index, replacing the old 5-capability
   single page). Copy transcribed verbatim. Shared Nav/Footer from root layout. */

export const metadata: Metadata = {
  title: "Services — Catalyst Digital Solutions",
  description:
    "One growth engine. Seven working parts: Websites & Branding, SEO, Google Optimization & Reviews, Advertising, Content Generation, Operations & Automation, and Construction RFP AI.",
};

type Item = { n: string; stroke: string; href: string; title: string; desc: string; chipColor: string; chipBg: string; chipLabel: string };
const ITEMS: Item[] = [
  { n: "01", stroke: "#00d4ff", href: "/services/websites", title: "Websites & Branding", desc: "Your first impression, made right — custom site, brand identity, and tracking that shows where every call came from.", chipColor: "#00d4ff", chipBg: "rgba(0,212,255,.07)", chipLabel: "01 · Websites & Branding" },
  { n: "02", stroke: "#b56bff", href: "/services/seo", title: "SEO", desc: "Rank on Google. Get recommended by AI. Local, technical, programmatic — and the new answer engines.", chipColor: "#b56bff", chipBg: "rgba(128,0,255,.08)", chipLabel: "02 · SEO" },
  { n: "03", stroke: "#00d4ff", href: "/services/google-reviews", title: "Google Optimization & Reviews", desc: "Own the map pack and the reviews that decide who gets the call.", chipColor: "#80ff80", chipBg: "rgba(128,255,128,.07)", chipLabel: "03 · Google & Reviews" },
  { n: "04", stroke: "#b56bff", href: "/services/advertising", title: "Advertising", desc: "Paid traffic that turns into bids — leads this week while the long game builds.", chipColor: "#00d4ff", chipBg: "rgba(0,212,255,.07)", chipLabel: "04 · Advertising" },
  { n: "05", stroke: "#80ff80", href: "/services/content", title: "Content Generation", desc: "A content factory that runs without you. Your name, everywhere they look.", chipColor: "#b56bff", chipBg: "rgba(128,0,255,.08)", chipLabel: "05 · Content Generation" },
  { n: "06", stroke: "#00d4ff", href: "/services/automation", title: "Operations & Automation", desc: "Systems that answer, follow up, and collect — while you’re not looking.", chipColor: "#80ff80", chipBg: "rgba(128,255,128,.07)", chipLabel: "06 · Operations & Automation" },
  { n: "07", stroke: "#b56bff", href: "/services/rfp-ai", title: "Construction RFP AI", desc: "Stop hunting for bids. Filtered public bids in your inbox, every morning.", chipColor: "#00d4ff", chipBg: "rgba(0,212,255,.07)", chipLabel: "07 · Construction RFP AI" },
];

const cardStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
  background: "rgba(255,255,255,.025)",
  border: "1px solid rgba(255,255,255,.09)",
  borderRadius: "16px",
  padding: "28px",
  textDecoration: "none",
};

export default function Page() {
  return (
    <div style={{ background: "#080b0f", fontFamily: "var(--font-inter), sans-serif", color: "#c8c8c8" }}>
      {/* ============ HERO ============ */}
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(90px,12vw,150px) clamp(20px,5vw,64px) clamp(60px,7vw,100px)" }}>
        <div style={{ position: "absolute", top: "-18%", right: "-10%", width: "640px", height: "640px", maxWidth: "90vw", background: "radial-gradient(circle at center,rgba(0,212,255,.13),transparent 64%)", filter: "blur(28px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1180px", margin: "0 auto" }}>
          <div style={mono("#00d4ff")}>What we build</div>
          <h1 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(46px,5.6vw,92px)", lineHeight: 0.9, letterSpacing: "1px", color: "#fafafa", margin: "18px 0 0", maxWidth: "900px", textWrap: "balance" }}>
            One growth engine. Seven working parts.
          </h1>
          <p style={{ fontSize: "clamp(16px,1.25vw,18px)", color: "#c8c8c8", lineHeight: 1.7, margin: "24px 0 0", maxWidth: "600px", textWrap: "pretty" }}>
            Every capability below is a system that keeps working after it&apos;s built. Here&apos;s the full inventory &mdash; how they bundle together lives on the{" "}
            <Link href="/pricing" style={{ color: "#00d4ff", textDecoration: "none", borderBottom: "1px solid rgba(0,212,255,.4)" }}>pricing page</Link>.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "38px" }}>
            {ITEMS.map((it) => (
              <Link key={it.n} href={it.href} style={{ ...mono(it.chipColor, 12, 0), textTransform: "none", background: it.chipBg, border: `1px solid ${it.chipColor}4d`, borderRadius: "999px", padding: "7px 14px", whiteSpace: "nowrap", textDecoration: "none" }}>{it.chipLabel}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SERVICES INDEX ============ */}
      <section style={{ position: "relative", padding: "clamp(50px,6vw,90px) clamp(20px,5vw,64px)", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,330px),1fr))", gap: "clamp(18px,2vw,24px)", alignItems: "stretch" }}>
          {ITEMS.map((it) => (
            <Link key={it.n} href={it.href} className="service-index-card" style={cardStyle}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12px" }}>
                <span style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "44px", lineHeight: 0.8, color: "transparent", WebkitTextStroke: `1.3px ${it.stroke}`, opacity: 0.75 }}>{it.n}</span>
                <span style={{ ...mono(it.stroke, 11, 1.5), whiteSpace: "nowrap" }}>EXPLORE &rarr;</span>
              </div>
              <div style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "clamp(26px,2.2vw,32px)", letterSpacing: "1px", textTransform: "uppercase", lineHeight: 0.95, color: "#fafafa" }}>{it.title}</div>
              <p style={{ fontSize: "14.5px", color: "#9aa3b0", lineHeight: 1.65, margin: 0, flex: 1, textWrap: "pretty" }}>{it.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ POSITIONING BAND ============ */}
      <section style={{ position: "relative", overflow: "hidden", textAlign: "center", padding: "clamp(80px,10vw,130px) clamp(20px,5vw,64px)", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "780px", height: "780px", maxWidth: "130vw", background: "radial-gradient(circle,rgba(128,0,255,.18),transparent 64%)", filter: "blur(24px)", pointerEvents: "none", animation: "floatY 12s ease-in-out infinite" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "820px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "22px" }}>
          <div style={mono("#00d4ff")}>Why construction</div>
          <h2 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(38px,4.6vw,72px)", lineHeight: 0.92, letterSpacing: "1px", color: "#fafafa", margin: 0, textWrap: "balance" }}>
            Most agencies avoid this industry. We built our whole model around it.
          </h2>
          <p style={{ fontSize: "clamp(16px,1.25vw,18px)", color: "#c8c8c8", lineHeight: 1.7, margin: 0, maxWidth: "640px", textWrap: "pretty" }}>
            Construction is underserved online because bidding cycles and RFPs don&apos;t fit the standard agency playbook. That&apos;s exactly why Catalyst exists &mdash; the whole model was built around this niche specifically.
          </p>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section style={{ position: "relative", textAlign: "center", padding: "clamp(70px,9vw,120px) clamp(20px,5vw,64px) clamp(90px,11vw,140px)", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ position: "relative", zIndex: 1, maxWidth: "620px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <div style={mono("#00d4ff")}>Next step</div>
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
