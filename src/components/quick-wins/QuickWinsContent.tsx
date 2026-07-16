"use client";

import { useState } from "react";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

/* CDS Quick Wins page — recreated from "CDS Quick Wins.dc.html" (design handoff).
   Copy is locked; transcribed verbatim. NOTE: the Credit Mechanic section copy
   contains an intentional placeholder ("[X]% / [Y] days") flagged in the design
   as "Do not publish as-is" — preserved verbatim per the transcribe-exactly rule. */

const ghostCta: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "9px",
  minHeight: "48px",
  fontFamily: "var(--font-inter), sans-serif",
  fontSize: "15px",
  fontWeight: 600,
  color: "#fafafa",
  background: "rgba(255,255,255,.04)",
  border: "1px solid rgba(255,255,255,.2)",
  padding: "14px 22px",
  borderRadius: "11px",
  textDecoration: "none",
};
const primaryCta: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "9px",
  minHeight: "48px",
  fontFamily: "var(--font-inter), sans-serif",
  fontSize: "15px",
  fontWeight: 600,
  color: "#fff",
  background: "linear-gradient(135deg,#8000ff,#5600ab)",
  border: "none",
  padding: "14px 22px",
  borderRadius: "11px",
  boxShadow: "0 10px 34px rgba(128,0,255,.4)",
  textDecoration: "none",
};
const plainCard: CSSProperties = {
  background: "rgba(255,255,255,.025)",
  border: "1px solid rgba(255,255,255,.09)",
  borderRadius: "16px",
  padding: "30px 28px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};
const kicker = (color: string): CSSProperties => ({
  fontFamily: "var(--font-jetbrains-mono), monospace",
  fontSize: "12px",
  letterSpacing: "2.5px",
  textTransform: "uppercase",
  color,
});
const cardH2: CSSProperties = {
  fontFamily: "var(--font-inter), sans-serif",
  fontWeight: 700,
  fontSize: "clamp(20px,1.7vw,25px)",
  lineHeight: 1.3,
  color: "#fafafa",
  margin: 0,
  textWrap: "balance",
};
const priceRow = (price: string, unit: string) => (
  <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
    <span style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "42px", lineHeight: 1, color: "#fafafa" }}>{price}</span>
    <span style={{ fontSize: "13.5px", color: "#7f8896" }}>{unit}</span>
  </div>
);
const bodyP: CSSProperties = { fontSize: "14.5px", color: "#c8c8c8", lineHeight: 1.7, margin: 0, flex: 1, textWrap: "pretty" };
const chip: CSSProperties = {
  fontFamily: "var(--font-jetbrains-mono), monospace",
  fontSize: "11px",
  color: "#c8c8c8",
  background: "rgba(255,255,255,.05)",
  border: "1px solid rgba(255,255,255,.14)",
  borderRadius: "999px",
  padding: "5px 11px",
  whiteSpace: "nowrap",
};

function AccordionTrigger({ color, hoverColor, open, onToggle, children }: { color: string; hoverColor: string; open: boolean; onToggle: () => void; children: ReactNode }) {
  return (
    <button
      aria-expanded={open}
      onClick={onToggle}
      style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "none", border: "none", padding: 0, fontFamily: "var(--font-inter), sans-serif", fontSize: "13px", fontWeight: 600, color, cursor: "pointer", textAlign: "left" }}
      onMouseEnter={(e) => (e.currentTarget.style.color = hoverColor)}
      onMouseLeave={(e) => (e.currentTarget.style.color = color)}
    >
      <span style={{ fontSize: "15px", lineHeight: 1 }}>&oplus;</span> {children}
    </button>
  );
}

function AccordionPanel({ children }: { children: ReactNode }) {
  return (
    <div style={{ borderLeft: "2px solid #8000ff", padding: "4px 0 4px 16px", animation: "panelIn .35s cubic-bezier(.4,0,.2,1)" }}>
      <p style={{ fontSize: "13.5px", color: "#c8c8c8", lineHeight: 1.7, margin: 0, textWrap: "pretty" }}>{children}</p>
    </div>
  );
}

const FAQS = [
  { q: "Are these one-time or recurring?", a: "Leak Finder, Speed-to-Lead, Lead Reactivation, and 5-Star Autopilot are one-time builds — you own the system after. Bid Finder AI is a monthly subscription, since bid monitoring only works while it's actively running." },
  { q: "Can I do more than one?", a: "Yes. Many owners pair Leak Finder (know what's broken) with one of the fix-it offers." },
  { q: "What happens after?", a: "Most clients who start with a Quick Win move to a full monthly plan within 90 days once they've seen it work. No pressure — we'll talk options when you're ready." },
  { q: "Do I need to be tech-savvy?", a: "No. Each offer needs about 30 minutes of your time for kickoff — access to your existing tools and a quick call. We handle the rest." },
];

export default function QuickWinsContent() {
  const [open0, setOpen0] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);

  return (
    <div style={{ background: "#080b0f", fontFamily: "var(--font-inter), sans-serif", color: "#c8c8c8" }}>
      {/* ============ SECTION 1 : OPENING BAND ============ */}
      <section style={{ position: "relative", overflow: "hidden", textAlign: "center", padding: "clamp(90px,12vw,150px) clamp(20px,5vw,64px) clamp(50px,6vw,80px)" }}>
        <div style={{ position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: "760px", height: "760px", maxWidth: "110vw", background: "radial-gradient(circle at center,rgba(0,212,255,.10),transparent 64%)", filter: "blur(28px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "820px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          <div style={kicker("#00d4ff")}>Start small. See it work.</div>
          <h1 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(46px,5.6vw,92px)", lineHeight: 0.9, letterSpacing: "1px", color: "#fafafa", margin: 0, textWrap: "balance" }}>
            Pick one problem. We fix it in days.
          </h1>
          <p style={{ fontSize: "clamp(16px,1.25vw,18px)", color: "#c8c8c8", lineHeight: 1.7, margin: 0, maxWidth: "580px", textWrap: "pretty" }}>
            Not ready for a full monthly plan yet? Start here. Each of these solves one specific problem &mdash; fast &mdash; so you can see real results before you commit to anything bigger.
          </p>
        </div>
      </section>

      {/* ============ SECTION 2 : OFFER GRID ============ */}
      <section style={{ position: "relative", padding: "clamp(30px,4vw,60px) clamp(20px,5vw,64px) clamp(70px,8vw,110px)" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,330px),1fr))", gap: "clamp(20px,2.2vw,26px)", alignItems: "stretch" }}>

          {/* CARD 1 : LEAK FINDER */}
          <div style={plainCard}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
              <div style={kicker("#00d4ff")}>Diagnose &amp; plan</div>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.6" style={{ flex: "none", opacity: 0.85 }}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" /><path d="M8 11h6" /><path d="M11 8v6" /></svg>
            </div>
            <h2 style={cardH2}>Find out exactly where you&apos;re losing jobs.</h2>
            {priceRow("$497", "one-time")}
            <p style={bodyP}>We run a deep audit of your website, Google Business Profile, SEO, and online reputation &mdash; then hand you a written, specific action plan. Not a sales pitch. A map of what&apos;s broken and what to fix first.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <span style={chip}>5 business days</span>
              <span style={chip}>Walkthrough + written report</span>
            </div>
            <AccordionTrigger color="#8000ff" hoverColor="#b56bff" open={open0} onToggle={() => setOpen0((v) => !v)}>How is this different from the free audit?</AccordionTrigger>
            {open0 && (
              <AccordionPanel>
                The free audit on our homepage tells you <i>if</i> you have a problem. Leak Finder tells you exactly <i>what</i> it is, <i>why</i> it&apos;s costing you jobs, and the specific order to fix it in.
              </AccordionPanel>
            )}
            <Link href="/contact" style={ghostCta}>Get My Leak Finder Report</Link>
          </div>

          {/* CARD 2 : BID FINDER AI — FEATURED */}
          <div style={{ position: "relative", background: "linear-gradient(180deg,rgba(128,0,255,.12),rgba(128,0,255,.03)),rgba(255,255,255,.02)", border: "1px solid rgba(128,0,255,.45)", borderRadius: "16px", padding: "30px 28px", display: "flex", flexDirection: "column", gap: "16px", boxShadow: "0 0 60px rgba(128,0,255,.16)" }}>
            <div style={{ position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#fff", background: "linear-gradient(135deg,#8000ff,#5600ab)", borderRadius: "999px", padding: "6px 16px", whiteSpace: "nowrap", boxShadow: "0 6px 20px rgba(128,0,255,.5)" }}>Most popular first step</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginTop: "4px" }}>
              <div style={kicker("#b56bff")}>Bid Finder AI</div>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#b56bff" strokeWidth="1.6" style={{ flex: "none", opacity: 0.9 }}><path d="M3 8l9-5 9 5-9 5-9-5z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" /></svg>
            </div>
            <h2 style={cardH2}>Stop hunting for bids. Let them find you.</h2>
            {priceRow("$497", "/mo")}
            <p style={bodyP}>The same AI that powers our top-tier clients&apos; bid pipeline &mdash; monitoring thousands of public bid portals 24/7, filtered to your trade and geography, delivered straight to your inbox. This is the fastest way to see what Catalyst can do, because the results show up as literal opportunities in your inbox within days.</p>
            <AccordionTrigger color="#b56bff" hoverColor="#d9b3ff" open={open1} onToggle={() => setOpen1((v) => !v)}>Is this the same as the Construction RFP AI on the pricing page?</AccordionTrigger>
            {open1 && (
              <AccordionPanel>
                Yes &mdash; same tool. This is the on-ramp; the <Link href="/pricing" style={{ color: "#00d4ff", textDecoration: "none", borderBottom: "1px solid rgba(0,212,255,.4)" }}>Landmark tier</Link> includes it free once you&apos;re ready to go all-in.
              </AccordionPanel>
            )}
            <Link href="/contact" style={{ ...primaryCta }}>Start Finding Bids</Link>
          </div>

          {/* CARD 3 : SPEED-TO-LEAD */}
          <div style={plainCard}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
              <div style={kicker("#00d4ff")}>Never lose a lead again</div>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.6" style={{ flex: "none", opacity: 0.85 }}><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" /></svg>
            </div>
            <h2 style={cardH2}>Be the first call back. Every time.</h2>
            {priceRow("$1,997", "one-time build")}
            <p style={bodyP}>A done-for-you system that responds to every new lead automatically &mdash; so a slow callback never costs you a job again. One build. Yours to keep running.</p>
            <AccordionTrigger color="#8000ff" hoverColor="#b56bff" open={open2} onToggle={() => setOpen2((v) => !v)}>What&apos;s included?</AccordionTrigger>
            {open2 && (
              <AccordionPanel>
                Automated first-response messaging, missed-call follow-up, and a structured follow-up sequence so leads don&apos;t go cold while you&apos;re on the jobsite.
              </AccordionPanel>
            )}
            <Link href="/contact" style={ghostCta}>Build My Speed-to-Lead System</Link>
          </div>

          {/* CARD 4 : LEAD REACTIVATION */}
          <div style={plainCard}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
              <div style={kicker("#00d4ff")}>Found money, no ad spend</div>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.6" style={{ flex: "none", opacity: 0.85 }}><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /></svg>
            </div>
            <h2 style={cardH2}>The jobs you already lost might still be winnable.</h2>
            {priceRow("$1,497", "one-time build")}
            <p style={bodyP}>We build an automated outreach sequence to your past leads and old contacts &mdash; the ones who went quiet, not the ones who said no. Real revenue sitting in a contact list you already have.</p>
            <Link href="/contact" style={ghostCta}>Reactivate My Past Leads</Link>
          </div>

          {/* CARD 5 : 5-STAR AUTOPILOT */}
          <div style={plainCard}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
              <div style={kicker("#00d4ff")}>Get found on Google</div>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.6" style={{ flex: "none", opacity: 0.85 }}><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            </div>
            <h2 style={cardH2}>Every finished job becomes a 5-star review &mdash; automatically.</h2>
            {priceRow("$1,497", "one-time build")}
            <p style={bodyP}>An automated system that asks happy clients for a review right after the job&apos;s done, when they&apos;re happiest. Set it up once. It runs forever.</p>
            <Link href="/contact" style={ghostCta}>Put My Reviews on Autopilot</Link>
          </div>
        </div>
      </section>

      {/* ============ SECTION 3 : CREDIT MECHANIC ============ */}
      <section style={{ position: "relative", overflow: "hidden", textAlign: "center", padding: "clamp(80px,10vw,130px) clamp(20px,5vw,64px)", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "780px", height: "780px", maxWidth: "130vw", background: "radial-gradient(circle,rgba(128,0,255,.18),transparent 64%)", filter: "blur(24px)", pointerEvents: "none", animation: "floatY 12s ease-in-out infinite" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "780px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "22px" }}>
          <div style={{ ...kicker("#b56bff"), fontSize: "13px", letterSpacing: "3px" }}>Nothing you spend here is wasted</div>
          <h2 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(40px,4.8vw,76px)", lineHeight: 0.92, letterSpacing: "1px", color: "#fafafa", margin: 0, textWrap: "balance" }}>
            Every dollar credits toward the real thing.
          </h2>
          <p style={{ fontSize: "clamp(16px,1.25vw,18px)", color: "#c8c8c8", lineHeight: 1.7, margin: 0, maxWidth: "620px", textWrap: "pretty" }}>
            If you like what a Quick Win does for your business, <span style={{ color: "#80ff80", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: ".9em" }}>[X]%</span> of what you paid credits directly toward your first month on any monthly plan &mdash; or toward your custom website build &mdash; if you upgrade within <span style={{ color: "#80ff80", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: ".9em" }}>[Y]</span> days. You&apos;re not starting over. You&apos;re picking up where you left off.
          </p>
          {/* Internal note — do not publish. Uncomment only if intentionally left visible pending Mario's final credit %/window call.
          <p style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "12px", color: "#7f8896", margin: "6px 0 0" }}>[Placeholder — final credit % and window pending Mario's call. Do not publish as-is.]</p>
          */}
        </div>
      </section>

      {/* ============ SECTION 4 : FAQ ============ */}
      <section style={{ position: "relative", padding: "clamp(70px,8vw,110px) clamp(20px,5vw,64px)", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(40px,5vw,56px)" }}>
            <div style={{ ...kicker("#00d4ff"), fontSize: "13px", letterSpacing: "3px" }}>Straight answers</div>
            <h2 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(38px,4.4vw,68px)", lineHeight: 0.94, letterSpacing: "1px", color: "#fafafa", margin: "14px 0 0" }}>Before you ask</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {FAQS.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={faq.q} style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.09)", borderRadius: "14px", overflow: "hidden" }}>
                  <button
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", width: "100%", background: "none", border: "none", padding: "20px 24px", fontFamily: "var(--font-inter), sans-serif", fontSize: "16px", fontWeight: 600, color: "#fafafa", textAlign: "left", cursor: "pointer" }}
                  >
                    <span style={{ lineHeight: 1.5 }}>{faq.q}</span>
                    <span style={{ flex: "none", fontSize: "18px", color: "#b56bff", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .3s ease" }}>&#8964;</span>
                  </button>
                  {open && (
                    <div style={{ padding: "0 24px 22px", animation: "panelIn .35s cubic-bezier(.4,0,.2,1)" }}>
                      <p style={{ fontSize: "15px", color: "#c8c8c8", lineHeight: 1.75, margin: 0, textWrap: "pretty" }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ SECTION 5 : FINAL CTA ============ */}
      <section style={{ position: "relative", textAlign: "center", padding: "clamp(70px,9vw,120px) clamp(20px,5vw,64px) clamp(90px,11vw,140px)" }}>
        <div style={{ position: "relative", zIndex: 1, maxWidth: "620px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <div style={{ ...kicker("#00d4ff"), fontSize: "13px", letterSpacing: "3px" }}>No pressure</div>
          <h2 style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 700, fontSize: "clamp(26px,2.6vw,36px)", lineHeight: 1.25, color: "#fafafa", margin: 0, textWrap: "balance" }}>
            Not sure which one&apos;s right for you?
          </h2>
          <p style={{ fontSize: "clamp(15.5px,1.1vw,17px)", color: "#c8c8c8", lineHeight: 1.7, margin: 0, textWrap: "pretty" }}>
            Tell us your biggest problem right now. We&apos;ll tell you &mdash; straight &mdash; which Quick Win actually fixes it.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", marginTop: "10px" }}>
            <Link href="/contact" className="cta-full" style={{ ...primaryCta, fontSize: "16px", padding: "16px 30px" }}>
              Book a 15-Minute Call <span style={{ fontSize: "18px" }}>&rarr;</span>
            </Link>
            <Link href="/pricing" className="cta-full" style={{ ...ghostCta, fontSize: "16px", padding: "16px 28px", border: "1px solid rgba(255,255,255,.18)" }}>
              See the Full Plans <span style={{ fontSize: "18px" }}>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
