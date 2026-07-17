import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";

/* Shared template for the 7 individual service pages (from the Claude Design
   "brand guide (2)" export): breadcrumb hero -> "What's included" card grid ->
   optional extra sections -> final CTA. Copy transcribed verbatim per page. */

export const mono = (color: string, size = 13, ls = 3): CSSProperties => ({
  fontFamily: "var(--font-jetbrains-mono), monospace",
  fontSize: `${size}px`,
  letterSpacing: `${ls}px`,
  textTransform: "uppercase",
  color,
});

const primaryCta: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  minHeight: "48px",
  fontFamily: "var(--font-inter), sans-serif",
  fontSize: "16px",
  fontWeight: 600,
  color: "#fff",
  background: "linear-gradient(135deg,#8000ff,#5600ab)",
  border: "none",
  padding: "16px 30px",
  borderRadius: "11px",
  boxShadow: "0 10px 34px rgba(128,0,255,.4)",
  textDecoration: "none",
};

export type IncludedItem = { color: string; title: string; desc?: ReactNode };

export function IncludedGrid({ items }: { items: IncludedItem[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: "14px", marginTop: "30px" }}>
      {items.map((it) => (
        <div key={it.title} style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.09)", borderRadius: "14px", padding: "22px 22px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <span style={{ color: it.color, fontSize: "15px", lineHeight: 1.5, flex: "none" }}>&#10003;</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: "15px", color: "#fafafa", lineHeight: 1.4 }}>{it.title}</div>
              {it.desc && <div style={{ fontSize: "13.5px", color: "#9aa3b0", lineHeight: 1.6, marginTop: "7px", textWrap: "pretty" }}>{it.desc}</div>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ServicePageBody({
  breadcrumbLabel,
  accent,
  eyebrow,
  h1,
  intro,
  ctaLabel = "Book a 20-Min Call",
  includedEyebrow = "What's included",
  includedHeading,
  items,
  extra,
  finalCtaHeading,
}: {
  breadcrumbLabel: string;
  accent: string;
  eyebrow: string;
  h1: string;
  intro: ReactNode;
  ctaLabel?: string;
  includedEyebrow?: string;
  includedHeading: string;
  items: IncludedItem[];
  extra?: ReactNode;
  finalCtaHeading: string;
}) {
  return (
    <div style={{ background: "#080b0f", fontFamily: "var(--font-inter), sans-serif", color: "#c8c8c8" }}>
      {/* ============ HERO ============ */}
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(90px,12vw,150px) clamp(20px,5vw,64px) clamp(60px,7vw,100px)" }}>
        <div style={{ position: "absolute", top: "-18%", right: "-10%", width: "640px", height: "640px", maxWidth: "90vw", background: `radial-gradient(circle at center,${accent}22,transparent 64%)`, filter: "blur(28px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1180px", margin: "0 auto" }}>
          <div style={{ ...mono("#7f8896", 12, 0), marginBottom: "16px", textTransform: "none" }}>
            <Link href="/services" style={{ color: "#7f8896", textDecoration: "none" }}>SERVICES</Link> / <span style={{ color: accent }}>{breadcrumbLabel}</span>
          </div>
          <div style={{ ...mono(accent) }}>{eyebrow}</div>
          <h1 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(44px,5.4vw,88px)", lineHeight: 0.9, letterSpacing: "1px", color: "#fafafa", margin: "18px 0 0", maxWidth: "940px", textWrap: "balance" }}>
            {h1}
          </h1>
          <p style={{ fontSize: "clamp(16px,1.25vw,18px)", color: "#c8c8c8", lineHeight: 1.7, margin: "24px 0 0", maxWidth: "620px", textWrap: "pretty" }}>{intro}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "36px" }}>
            <Link href="/contact" className="cta-full" style={primaryCta}>{ctaLabel} <span style={{ fontSize: "18px" }}>&rarr;</span></Link>
          </div>
        </div>
      </section>

      {/* ============ WHAT'S INCLUDED ============ */}
      <section style={{ position: "relative", padding: "clamp(60px,7vw,100px) clamp(20px,5vw,64px)", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <div style={{ ...mono(accent), marginBottom: "14px" }}>{includedEyebrow}</div>
          <h2 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(32px,3.4vw,52px)", lineHeight: 0.94, letterSpacing: "1px", color: "#fafafa", margin: 0, maxWidth: "760px" }}>{includedHeading}</h2>
          <IncludedGrid items={items} />
        </div>
      </section>

      {extra}

      {/* ============ FINAL CTA ============ */}
      <section style={{ position: "relative", overflow: "hidden", textAlign: "center", padding: "clamp(70px,9vw,120px) clamp(20px,5vw,64px) clamp(90px,11vw,140px)", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "680px", height: "680px", maxWidth: "120vw", background: "radial-gradient(circle,rgba(128,0,255,.16),transparent 64%)", filter: "blur(26px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "620px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <div style={mono("#00d4ff")}>Next step</div>
          <h2 style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 700, fontSize: "clamp(26px,2.6vw,36px)", lineHeight: 1.25, color: "#fafafa", margin: 0, textWrap: "balance" }}>{finalCtaHeading}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", marginTop: "10px" }}>
            <Link href="/contact" className="cta-full" style={primaryCta}>{ctaLabel} <span style={{ fontSize: "18px" }}>&rarr;</span></Link>
          </div>
          <div style={{ fontSize: "13.5px", color: "#7f8896" }}>Or call or text &mdash; <a href="tel:+16615359927" style={{ color: "#9aa3b0", textDecoration: "none", fontWeight: 600 }}>(661) 535-9927</a></div>
        </div>
      </section>
    </div>
  );
}
