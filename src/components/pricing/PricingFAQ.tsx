"use client";

import { useState } from "react";

/* Pricing FAQ accordion — single-open. Copy verbatim from CDS Pricing.dc.html. */

const FAQS = [
  { q: "Do you require long-term contracts?", a: "No. Month-to-month. We keep clients because of results, not contract lock-in." },
  { q: "What's the realistic timeline to see results?", a: "Most clients see measurable improvement in call volume and search ranking within 60–90 days. Content distribution starts immediately. SEO shows meaningful movement by month 3." },
  { q: "Do I need to be tech-savvy?", a: "No. About 3 hours of your time in the first two weeks, ~30 minutes/month after." },
  { q: "How is this different from an in-house hire?", a: "A competent in-house digital marketer costs $65,000–$85,000/year and doesn't come with AI video pipelines, programmatic SEO, or RFP monitoring." },
  { q: "Can I start at Tier 1 and upgrade?", a: "Yes — seamless, no rebuild required." },
  { q: "What trades do you work with?", a: "General contractors, commercial builders, specialty trades (electrical, plumbing, HVAC, roofing), civil contractors, demolition companies." },
  { q: "What happens if I cancel?", a: "You keep everything built — website, content, analytics setup." },
  { q: "Is there a setup fee?", a: "No. First month covers onboarding, deployment, and configuration." },
];

export default function PricingFAQ() {
  const [openFaq, setOpenFaq] = useState(-1);
  return (
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
  );
}
