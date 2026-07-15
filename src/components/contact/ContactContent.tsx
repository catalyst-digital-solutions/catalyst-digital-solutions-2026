"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

/* CDS Contact page — recreated from "CDS Contact.dc.html" (design handoff).
   The form POSTs to /api/contact, which forwards to a webhook or emails
   hello@ (see app/api/contact/route.ts). Includes contact/SMS consent, a
   honeypot, and per-form tracking metadata so multiple forms can be told apart. */

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

type FormState = { name: string; company: string; email: string; phone: string; trade: string; tradeOther: string; revenue: string; url: string; challenge: string; source: string; sourceOther: string };

export default function ContactContent() {
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [agreeContact, setAgreeContact] = useState(false);
  const [agreeSms, setAgreeSms] = useState(false);
  const [botField, setBotField] = useState("");
  const [form, setForm] = useState<FormState>({ name: "", company: "", email: "", phone: "", trade: "", tradeOther: "", revenue: "", url: "", challenge: "", source: "", sourceOther: "" });
  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreeContact || status === "submitting") return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId: "contact-page",
          formName: "Contact — Let's talk about your pipeline",
          ...form,
          consentToContact: agreeContact,
          consentToSms: agreeSms,
          botField,
          meta: {
            submittedAt: new Date().toISOString(),
            pagePath: typeof window !== "undefined" ? window.location.pathname : "",
            pageUrl: typeof window !== "undefined" ? window.location.href : "",
            referrer: typeof document !== "undefined" ? document.referrer : "",
          },
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSubmitted(true);
    } catch {
      setStatus("error");
    }
  }

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
                onSubmit={handleSubmit}
                style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "20px", padding: "clamp(28px,3.4vw,44px)" }}
              >
                {/* Honeypot — hidden from users; bots that fill it get dropped server-side */}
                <input
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
                />
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
                    <span style={labelText}>Email <span style={{ color: "#b56bff" }}>*</span></span>
                    <input className="contact-field" type="email" required value={form.email} onChange={set("email")} placeholder="you@company.com" style={fieldBase} />
                  </label>
                  <label style={labelWrap}>
                    <span style={labelText}>Phone <span style={{ color: "#7f8896", fontWeight: 400 }}>(for a call or text)</span></span>
                    <input className="contact-field" type="tel" value={form.phone} onChange={set("phone")} placeholder="(661) 555-0123" style={fieldBase} />
                  </label>
                  <label style={labelWrap}>
                    <span style={labelText}>Trade / Specialty</span>
                    <select className="contact-field" value={form.trade} onChange={set("trade")} style={selectBase}>
                      <option value="">Select your trade…</option>
                      {TRADES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </label>
                  <label style={labelWrap}>
                    <span style={labelText}>Current Annual Revenue</span>
                    <select className="contact-field" value={form.revenue} onChange={set("revenue")} style={selectBase}>
                      <option value="">Select a range…</option>
                      {REVENUES.map((r) => <option key={r}>{r}</option>)}
                    </select>
                  </label>
                </div>
                {form.trade === "Other" && (
                  <label style={{ ...labelWrap, marginTop: "18px", animation: "panelIn .3s ease" }}>
                    <span style={labelText}>Tell us your trade / specialty</span>
                    <input className="contact-field" value={form.tradeOther} onChange={set("tradeOther")} placeholder="e.g. Concrete, Landscaping, Solar…" style={fieldBase} />
                  </label>
                )}
                <label style={{ ...labelWrap, marginTop: "18px" }}>
                  <span style={labelText}>Website URL</span>
                  <input className="contact-field" value={form.url} onChange={set("url")} placeholder="https://yourcompany.com — or 'don't have one yet'" style={fieldBase} />
                </label>
                <label style={{ ...labelWrap, marginTop: "18px" }}>
                  <span style={labelText}>Biggest Digital or Operational Challenge</span>
                  <textarea className="contact-field" value={form.challenge} onChange={set("challenge")} rows={4} placeholder="Where are you losing jobs? What's not working?" style={{ ...fieldBase, resize: "vertical", minHeight: "110px", padding: "14px 16px" }} />
                </label>
                <label style={{ ...labelWrap, marginTop: "18px" }}>
                  <span style={labelText}>How did you hear about us?</span>
                  <select className="contact-field" value={form.source} onChange={set("source")} style={selectBase}>
                    <option value="">Select one…</option>
                    {SOURCES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </label>
                {form.source === "Other" && (
                  <label style={{ ...labelWrap, marginTop: "18px", animation: "panelIn .3s ease" }}>
                    <span style={labelText}>How did you hear about us? (please specify)</span>
                    <input className="contact-field" value={form.sourceOther} onChange={set("sourceOther")} placeholder="Tell us where you found us" style={fieldBase} />
                  </label>
                )}

                {/* Consent */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "24px" }}>
                  <label style={{ display: "flex", gap: "11px", alignItems: "flex-start", cursor: "pointer" }}>
                    <input type="checkbox" checked={agreeContact} onChange={(e) => setAgreeContact(e.target.checked)} required style={{ marginTop: "2px", width: "17px", height: "17px", accentColor: "#8000ff", flex: "none", cursor: "pointer" }} />
                    <span style={{ fontSize: "13.5px", lineHeight: 1.55, color: "#c8c8c8" }}>I agree to be contacted by Catalyst Digital Solutions about my request. <span style={{ color: "#b56bff" }}>*</span></span>
                  </label>
                  <label style={{ display: "flex", gap: "11px", alignItems: "flex-start", cursor: "pointer" }}>
                    <input type="checkbox" checked={agreeSms} onChange={(e) => setAgreeSms(e.target.checked)} style={{ marginTop: "2px", width: "17px", height: "17px", accentColor: "#8000ff", flex: "none", cursor: "pointer" }} />
                    <span style={{ fontSize: "13.5px", lineHeight: 1.55, color: "#9aa3b0" }}>I also agree to receive text messages (SMS) at the number I provide. Message &amp; data rates may apply; reply STOP to opt out. <span style={{ color: "#7f8896" }}>(optional)</span></span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!agreeContact || status === "submitting"}
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", width: "100%", minHeight: "52px", fontFamily: "var(--font-inter), sans-serif", fontSize: "16px", fontWeight: 600, color: "#fff", background: "linear-gradient(135deg,#8000ff,#5600ab)", border: "none", padding: "16px 30px", borderRadius: "12px", marginTop: "22px", boxShadow: agreeContact ? "0 10px 34px rgba(128,0,255,.4)" : "none", opacity: agreeContact && status !== "submitting" ? 1 : 0.5, cursor: agreeContact && status !== "submitting" ? "pointer" : "not-allowed", transition: "opacity .2s, box-shadow .2s" }}
                >
                  {status === "submitting" ? "Sending…" : <>Send My Audit Request <span style={{ fontSize: "18px" }}>&rarr;</span></>}
                </button>
                {status === "error" && (
                  <p style={{ color: "#ff8a8a", fontSize: "13.5px", lineHeight: 1.6, margin: "12px 0 0", textWrap: "pretty" }}>
                    Something went wrong sending your request. Please call or text <a href="tel:+16615359927" style={{ color: "#00d4ff", textDecoration: "none" }}>(661) 535-9927</a> or email <a href="mailto:hello@catalyst-digital-solutions.com" style={{ color: "#00d4ff", textDecoration: "none" }}>hello@catalyst-digital-solutions.com</a>.
                  </p>
                )}
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
