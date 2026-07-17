import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import ServicePageBody, { mono } from "@/components/services/ServicePageBody";

export const metadata: Metadata = {
  title: "Websites & Branding — Catalyst Digital Solutions",
  description: "Your website is your first impression. Custom Next.js sites, brand identity, and real proof — the full demo gallery.",
};

const LOGOS = [
  { file: "logo-anchor-point.jpeg", alt: "Anchor Point Design-Build logo" },
  { file: "logo-vantage-point.jpeg", alt: "Vantage Point Construction Company logo" },
  { file: "logo-ironclad.jpeg", alt: "Ironclad Design-Build Group logo" },
  { file: "logo-bedrock.jpeg", alt: "Bedrock Grading & Site Preparation logo" },
  { file: "logo-cascade.jpeg", alt: "Cascade Site Preparation Co. logo" },
  { file: "logo-cornerstone.jpeg", alt: "Cornerstone General Contractors logo" },
  { file: "logo-longhorn.jpeg", alt: "Longhorn Construction Company logo" },
  { file: "logo-foundry-works.jpeg", alt: "Foundry Works Construction Company logo" },
  { file: "logo-sterling-oak.jpeg", alt: "Sterling Oak Construction logo" },
];

type Demo = { href: string; domain: string; img: string; name: string; blurb: string; badgeBg: string; badgeColor: string; hover: string; ret: string };
const DEMOS: Demo[] = [
  { href: "https://construction1.catalyst-demos.com", domain: "construction1.catalyst-demos.com", img: "/assets/demo-full-apex.jpeg", name: "Apex Construction", blurb: "Design-build for commercial work. Bold, structured, sunset-warm.", badgeBg: "#FFAE3A", badgeColor: "#000", hover: "67s", ret: "16.8s" },
  { href: "https://construction2.catalyst-demos.com", domain: "construction2.catalyst-demos.com", img: "/assets/demo-full-holloway.jpeg", name: "Holloway", blurb: "Employee-owned Colorado builder. Red, human, people-first.", badgeBg: "#8F1A25", badgeColor: "#fff", hover: "44s", ret: "11.1s" },
  { href: "https://construction3.catalyst-demos.com", domain: "construction3.catalyst-demos.com", img: "/assets/demo-full-monolith.jpeg", name: "Monolith", blurb: "Earthwork and heavy civil. Blunt type, dirt-and-orange.", badgeBg: "#FD5D09", badgeColor: "#000", hover: "48s", ret: "12s" },
  { href: "https://construction4.catalyst-demos.com", domain: "construction4.catalyst-demos.com", img: "/assets/demo-full-voltaic.jpeg", name: "Voltaic", blurb: "Critical power & HVAC. Dark, technical, live telemetry.", badgeBg: "#3EC7FF", badgeColor: "#000", hover: "36s", ret: "9s" },
  { href: "https://construction5.catalyst-demos.com", domain: "construction5.catalyst-demos.com", img: "/assets/demo-full-meridian.jpeg", name: "Meridian", blurb: "Quiet luxury design-build. Editorial, calm, warm-toned.", badgeBg: "#C49A3F", badgeColor: "#fff", hover: "66s", ret: "16.6s" },
];

function LogoShowcase() {
  return (
    <section style={{ position: "relative", padding: "clamp(60px,7vw,100px) clamp(20px,5vw,64px)", borderTop: "1px solid rgba(255,255,255,.06)" }}>
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <div style={mono("#00d4ff")}>Brand identity</div>
        <h2 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(32px,3.4vw,52px)", lineHeight: 0.94, letterSpacing: "1px", color: "#fafafa", margin: 0, maxWidth: "760px" }}>A logo that looks like the company you actually are</h2>
        <p style={{ fontSize: "clamp(15.5px,1.15vw,17px)", color: "#c8c8c8", lineHeight: 1.7, margin: "18px 0 0", maxWidth: "600px", textWrap: "pretty" }}>Every brand below was designed the way we&apos;d design yours &mdash; built around your trade, your name, and the work you want more of.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,210px),1fr))", gap: "14px", marginTop: "32px" }}>
          {LOGOS.map((l) => (
            <div key={l.file} className="logo-card" style={{ background: "linear-gradient(180deg,#0c1016,#090c11)", border: "1px solid rgba(255,255,255,.09)", borderRadius: "14px", overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/assets/${l.file}`} alt={l.alt} style={{ display: "block", width: "100%", height: "auto" }} />
            </div>
          ))}
        </div>
        <div style={{ ...mono("#7f8896", 11, 2), marginTop: "18px" }}>Sample identities &middot; every mark starts from scratch</div>
      </div>
    </section>
  );
}

function DemoGallery() {
  return (
    <section style={{ position: "relative", background: "#080b0f", fontFamily: "var(--font-inter), sans-serif", color: "#c8c8c8", overflow: "hidden", padding: "clamp(80px,10vw,150px) clamp(20px,5vw,64px)", borderTop: "1px solid rgba(255,255,255,.06)" }}>
      <div style={{ position: "absolute", bottom: "-12%", right: "-8%", width: "640px", height: "640px", maxWidth: "90vw", background: "radial-gradient(circle at center,rgba(128,0,255,.2),transparent 62%)", filter: "blur(28px)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: "1220px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "24px" }}>
          <div style={{ maxWidth: "720px" }}>
            <div style={mono("#00d4ff")}>Proof, not promises</div>
            <h2 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(44px,5.6vw,92px)", lineHeight: 0.9, letterSpacing: "1px", color: "#fafafa", margin: 0, textWrap: "balance" }}>We&rsquo;d rather prove it than promise it.</h2>
            <p style={{ fontSize: "clamp(15.5px,1.15vw,17.5px)", color: "#c8c8c8", lineHeight: 1.75, margin: "24px 0 0", maxWidth: "640px", textWrap: "pretty" }}>Talk is cheap. Here&rsquo;s the work. Real, live sites we built specifically for contractors. Fast, sharp, made to win jobs. No Wordpress templates here. Just modern,&nbsp;Next.js/React. The gold standard for speed. Great for search authority. When you choose Catalyst, you get the best.</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 12px", ...mono("#00d4ff", 11.5, 1.5) }}>
            <span style={{ color: "#00d4ff" }}>Solves &rarr;</span>
            <span style={{ color: "#9aa3b0", border: "1px solid rgba(0,212,255,.28)", borderRadius: "100px", padding: "5px 12px" }}>looking small online</span>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "clamp(18px,2.4vw,28px)", marginTop: "clamp(36px,4.5vw,52px)" }}>
          {DEMOS.map((d) => (
            <a key={d.name} href={d.href} target="_blank" rel="noopener" className="demo-card" style={{ "--thumb-hover": d.hover, "--thumb-return": d.ret, flex: "1 1 460px", minWidth: "290px", maxWidth: "575px", display: "block", textDecoration: "none", background: "linear-gradient(180deg,#0c1016,#090c11)", border: "1px solid rgba(255,255,255,.09)", borderRadius: "16px", overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,.45)", transition: "border-color .35s ease" } as CSSProperties}>
              <div style={{ display: "flex", alignItems: "center", gap: "7px", background: "#0c1016", borderBottom: "1px solid rgba(255,255,255,.07)", padding: "11px 16px" }}>
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "rgba(255,255,255,.14)" }} /><span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "rgba(255,255,255,.14)" }} /><span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "rgba(255,255,255,.14)" }} />
                <span style={{ flex: 1, textAlign: "center", ...mono("#7f8896", 11, 0), textTransform: "none" }}>{d.domain}</span>
                <span style={{ ...mono("#00d4ff", 10.5, 1.5), whiteSpace: "nowrap" }}>LIVE &rarr;</span>
              </div>
              <div style={{ position: "relative", aspectRatio: "1920/1300", overflow: "hidden", containerType: "size", background: "#0a0d12" } as CSSProperties}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="demo-thumb-img" src={d.img} alt={`${d.name} demo site`} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "auto", minHeight: "100%", objectFit: "cover", objectPosition: "top" }} />
              </div>
              <div style={{ position: "relative", padding: "16px 180px 18px 20px", borderTop: "1px solid rgba(255,255,255,.07)" }}>
                <span style={{ position: "absolute", right: "14px", bottom: "16px", transform: "rotate(-6deg)", ...mono(d.badgeColor, 10.5, 1.5), fontWeight: 500, background: d.badgeBg, borderRadius: "6px", padding: "7px 12px", whiteSpace: "nowrap" }}><span className="see-live-click">Click to see live</span><span className="see-live-tap">Tap to see live</span></span>
                <div style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "24px", letterSpacing: "1.5px", color: "#fafafa" }}>{d.name}</div>
                <p style={{ fontSize: "13.5px", color: "#9aa3b0", lineHeight: 1.55, margin: "7px 0 0", textWrap: "pretty" }}>{d.blurb}</p>
              </div>
            </a>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px", marginTop: "clamp(36px,4.5vw,52px)" }}>
          <p style={{ fontSize: "clamp(20px,1.9vw,28px)", fontWeight: 600, color: "#fafafa", lineHeight: 1.35, margin: 0, maxWidth: "620px", textWrap: "balance" }}>Want to see YOUR company on one of these? Book a call and we&rsquo;ll show you in <span style={{ background: "linear-gradient(90deg,#b56bff,#00d4ff)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>10 minutes</span>.</p>
          <Link href="/contact" className="cta-full" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "48px", fontFamily: "var(--font-inter), sans-serif", fontSize: "16px", fontWeight: 600, color: "#fff", background: "linear-gradient(135deg,#8000ff,#5600ab)", border: "none", padding: "16px 30px", borderRadius: "11px", boxShadow: "0 10px 34px rgba(128,0,255,.4)", textDecoration: "none" }}>Book a 20-Min Call <span style={{ fontSize: "18px" }}>&rarr;</span></Link>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <ServicePageBody
      breadcrumbLabel="WEBSITES & BRANDING"
      accent="#00d4ff"
      eyebrow="The ground floor"
      h1="Your website is your first impression. Let's make it the right one."
      intro="Before anyone calls you, they look you up. What they find in the next 10 seconds decides if you get the job or lose it to someone who looks more professional online — even if your work is better."
      includedHeading="Everything the first impression needs"
      items={[
        { color: "#00d4ff", title: "Custom-built website — Next.js, not a template", desc: "Fast, modern, built to win jobs." },
        { color: "#00d4ff", title: "Logo, colors, and brand identity", desc: "So your image online matches the quality of your work in the field." },
        { color: "#00d4ff", title: "Hosting, monthly maintenance & performance reporting" },
        { color: "#00d4ff", title: "Analytics & conversion tracking (GA4, call tracking)", desc: "Know exactly where every call came from." },
      ]}
      extra={<><LogoShowcase /><DemoGallery /></>}
      finalCtaHeading="Ten seconds decides it. Make them count."
    />
  );
}
