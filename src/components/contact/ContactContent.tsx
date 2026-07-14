"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

/* CDS Contact page — recreated from "CDS Contact.dc.html" (design handoff).
   Copy is locked; transcribed verbatim. The form is a front-end-only prototype
   (matches the design): submitting toggles a success state; there is no backend
   endpoint wired up. */

const fieldBase: CSSProperties = {
  minHeight: "48px",
  background: "rgba(8,11,15,.6)",
  border: "1px solid rgba(255,255,255,.14)",
  borderRadius: "10px",
  padding: "12px 16px",
  fontFamily: "var(--font-inter), sans-serif",
  fontSize: "15px",
  color: "#fafafa",
  outline: "none",
};
const selectBase: CSSProperties = { ...fieldBase, padding: "12px 14px" };
const labelWrap: CSSProperties = { display: "flex", flexDirection: "column", gap: "8px" };
const labelText: CSSProperties = { fontSize: "13px", fontWeight: 600, color: "#fafafa" };

const TRADES = ["General Contractor", "Commercial Builder", "Roofing", "Electrical", "Plumbing", "HVAC", "Civil", "Demolition", "Specialty Trade", "Other"];
const REVENUES = ["Under $500K", "$500K–$1M", "$1M–$5M", "$5M–$10M", "$10M+", "Prefer not to say"];
const SOURCES = ["Google", "LinkedIn", "Referral", "YouTube", "Instagram", "Other"];

type FormState = { name: string; company: string; trade: string; revenue: string; url: string; challenge: string; source: string };

export default function ContactContent() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({ name: "", company: "", trade: "", revenue: "", url: "", challenge: "", source: "" });
  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div style={{ background: "#080b0f", fontFamily: "var(--font-inter), sans-serif", color: "#c8c8c8" }}>
      {/* ============ HERO + FORM ============ */}
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(90px,12vw,150px) clamp(20px,5vw,64px) clamp(80px,9vw,120px)" }}>
        <div style={{ position: "absolute", top: "-16%", left: "-10%", width: "620px", height: "620px", maxWidth: "90vw", background: "radial-gradient(circle at center,rgba(128,0,255,.15),transparent 64%)", filter: "blur(28px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1180px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "clamp(44px,5vw,80px)", alignItems: "flex-start" }}>

          {/* LEFT : heading + info */}
          <div style={{ flex: "1 1 380px", minWidth: "300px", maxWidth: "480px" }}>
            <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", color: "#00d4ff" }}>Contact</div>
            <h1 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(44px,5vw,80px)", lineHeight: 0.9, letterSpacing: "1px", color: "#fafafa", margin: "18px 0 0", textWrap: "balance" }}>
              Let&apos;s talk about your pipeline
            </h1>
            <p style={{ fontSize: "clamp(15.5px,1.2vw,17.5px)", color: "#c8c8c8", lineHeight: 1.7, margin: "22px 0 0", textWrap: "pretty" }}>
              Fill this out and we&apos;ll get back to you within 1 business day with a personalized audit of your digital presence.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "36px" }}>
              <a href="tel:+16615359927" style={{ display: "inline-flex", alignItems: "center", gap: "12px", color: "#fafafa", fontSize: "15.5px", fontWeight: 600, textDecoration: "none", width: "fit-content" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2" style={{ flex: "none" }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                (661) 535-9927
              </a>
              <a href="mailto:hello@catalyst-digital-solutions.com" style={{ display: "inline-flex", alignItems: "center", gap: "12px", color: "#fafafa", fontSize: "15.5px", fontWeight: 600, textDecoration: "none", width: "fit-content", wordBreak: "break-all" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2" style={{ flex: "none" }}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
                hello@catalyst-digital-solutions.com
              </a>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", color: "#c8c8c8", fontSize: "15px" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2" style={{ flex: "none" }}><path d="M21 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                Bakersfield, CA
              </div>
              <div style={{ display: "inline-flex", alignItems: "flex-start", gap: "12px", color: "#c8c8c8", fontSize: "15px", lineHeight: 1.6 }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2" style={{ flex: "none", marginTop: "3px" }}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                <span>Mon&ndash;Fri, 8am&ndash;6pm PT.<br /><span style={{ color: "#b56bff" }}>After-hours? Our AI is always on.</span></span>
              </div>
            </div>

            <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,.08)", margin: "34px 0" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
              {["No pitch decks. No sales pressure.", "15-minute call. You'll know if we're a fit.", "Your information is never shared or sold."].map((t) => (
                <div key={t} style={{ display: "flex", gap: "11px", alignItems: "flex-start" }}>
                  <span style={{ color: "#80ff80", fontSize: "14px", lineHeight: 1.6, flex: "none" }}>&#10003;</span>
                  <span style={{ fontSize: "14.5px", lineHeight: 1.6, color: "#c8c8c8" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT : form */}
          <div style={{ flex: "1 1 480px", minWidth: "300px" }}>
            {!submitted ? (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "20px", padding: "clamp(28px,3.4vw,44px)" }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: "18px" }}>
                  <label style={labelWrap}>
                    <span style={labelText}>Full Name</span>
                    <input className="contact-field" value={form.name} onChange={set("name")} placeholder="Your name" style={fieldBase} />
                  </label>
                  <label style={labelWrap}>
                    <span style={labelText}>Company Name</span>
                    <input className="contact-field" value={form.company} onChange={set("company")} placeholder="Your company" style={fieldBase} />
                  </label>
                  <label style={labelWrap}>
                    <span style={labelText}>Trade / Specialty</span>
                    <select className="contact-field" value={form.trade} onChange={set("trade")} style={selectBase}>
                      <option value="">Select your trade…</option>
                      {TRADES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </label>
                  <label style={labelWrap}>
                    <span style={labelText}>Current Monthly Revenue</span>
                    <select className="contact-field" value={form.revenue} onChange={set("revenue")} style={selectBase}>
                      <option value="">Select a range…</option>
                      {REVENUES.map((r) => <option key={r}>{r}</option>)}
                    </select>
                  </label>
                </div>
                <label style={{ ...labelWrap, marginTop: "18px" }}>
                  <span style={labelText}>Website URL</span>
                  <input className="contact-field" value={form.url} onChange={set("url")} placeholder="https://yourcompany.com — or 'don't have one yet'" style={fieldBase} />
                </label>
                <label style={{ ...labelWrap, marginTop: "18px" }}>
                  <span style={labelText}>Biggest Digital Challenge</span>
                  <textarea className="contact-field" value={form.challenge} onChange={set("challenge")} rows={4} placeholder="Where are you losing jobs? What's not working?" style={{ ...fieldBase, resize: "vertical", minHeight: "110px", padding: "14px 16px" }} />
                </label>
                <label style={{ ...labelWrap, marginTop: "18px" }}>
                  <span style={labelText}>How did you hear about us?</span>
                  <select className="contact-field" value={form.source} onChange={set("source")} style={selectBase}>
                    <option value="">Select one…</option>
                    {SOURCES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </label>
                <button type="submit" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", width: "100%", minHeight: "52px", fontFamily: "var(--font-inter), sans-serif", fontSize: "16px", fontWeight: 600, color: "#fff", background: "linear-gradient(135deg,#8000ff,#5600ab)", border: "none", padding: "16px 30px", borderRadius: "12px", marginTop: "26px", boxShadow: "0 10px 34px rgba(128,0,255,.4)", cursor: "pointer" }}>
                  Send My Audit Request <span style={{ fontSize: "18px" }}>&rarr;</span>
                </button>
              </form>
            ) : (
              <div style={{ background: "linear-gradient(180deg,rgba(128,255,128,.07),rgba(128,255,128,.02)),rgba(255,255,255,.02)", border: "1px solid rgba(128,255,128,.35)", borderRadius: "20px", padding: "clamp(40px,5vw,64px)", textAlign: "center", animation: "panelIn .45s cubic-bezier(.4,0,.2,1)" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(128,255,128,.1)", border: "1px solid rgba(128,255,128,.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#80ff80" strokeWidth="2.2"><path d="M20 6 9 17l-5-5" /></svg>
                </div>
                <h2 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(32px,3vw,44px)", lineHeight: 1, letterSpacing: "1px", color: "#fafafa", margin: "24px 0 0" }}>We got it.</h2>
                <p style={{ fontSize: "16px", color: "#c8c8c8", lineHeight: 1.7, margin: "14px 0 0", textWrap: "pretty" }}>Expect to hear from Mario within 1 business day.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============ WHAT HAPPENS NEXT ============ */}
      <section style={{ position: "relative", padding: "clamp(70px,8vw,110px) clamp(20px,5vw,64px)", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto clamp(44px,5vw,64px)" }}>
            <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", color: "#00d4ff" }}>After you hit send</div>
            <h2 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(38px,4.4vw,68px)", lineHeight: 0.94, letterSpacing: "1px", color: "#fafafa", margin: "14px 0 0", textWrap: "balance" }}>
              Here&apos;s exactly what happens
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", gap: "clamp(20px,2.4vw,28px)" }}>
            <StepCard n="1" stroke="rgba(0,212,255,.55)" title="We run a live AI audit" body="Of your current digital presence — what's working, what's leaking, what your competitors are doing that you aren't." />
            <StepCard n="2" stroke="rgba(181,107,255,.55)" title="You get a personalized report" body="A personalized opportunity report, emailed to you within 24 hours. Yours to keep either way." />
            <StepCard n="3" stroke="rgba(128,255,128,.5)" title="We walk through the numbers" body="A 15-minute call. You'll know if we're a fit — and if we're not, we'll say so." />
          </div>
        </div>
      </section>
    </div>
  );
}

function StepCard({ n, stroke, title, body }: { n: string; stroke: string; title: string; body: string }) {
  return (
    <div style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.09)", borderRadius: "16px", padding: "30px 28px" }}>
      <div style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "56px", lineHeight: 0.8, color: "transparent", WebkitTextStroke: `1.5px ${stroke}` }}>{n}</div>
      <h3 style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 700, fontSize: "18px", color: "#fafafa", margin: "18px 0 0" }}>{title}</h3>
      <p style={{ fontSize: "14.5px", color: "#c8c8c8", lineHeight: 1.7, margin: "10px 0 0", textWrap: "pretty" }}>{body}</p>
    </div>
  );
}
