"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/config/slots";

const field: CSSProperties = {
  width: "100%",
  border: "1px solid #d8d8d8",
  borderRadius: 10,
  padding: "14px 14px",
  fontSize: 16,
  fontFamily: "var(--font-inter), sans-serif",
  color: "#1a1a1a",
  background: "#fff",
};

const label: CSSProperties = {
  display: "block",
  fontSize: 14,
  fontWeight: 600,
  color: "#1a1a1a",
  marginBottom: 6,
};

const hint: CSSProperties = {
  fontSize: 13,
  color: "#6b6b6b",
  fontWeight: 500,
  margin: "4px 0 8px",
};

export default function BrandStarterStart() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const body = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/brand-starter", { method: "POST", body });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(json.error || "Something went wrong. Call or text us and we'll do this together.");
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("Something went wrong. Call or text us and we'll do this together.");
    }
  }

  return (
    <div
      style={{
        background: "#f8f8f8",
        minHeight: "100vh",
        fontFamily: "var(--font-inter), sans-serif",
        color: "#1a1a1a",
      }}
    >
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e6e6e6",
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "16px 32px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/trades/cds-wordmark.png"
          alt="Catalyst Digital Solutions"
          style={{ height: 30, width: "auto", display: "block" }}
        />
      </header>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "56px 24px 96px" }}>
        <p
          style={{
            font: "600 12px var(--font-inter), sans-serif",
            color: "#8000ff",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            margin: "0 0 12px",
          }}
        >
          Five Brand Directions
        </p>
        <h1 style={{ font: "700 36px/1.2 var(--font-inter), sans-serif", color: "#1a1a1a", margin: "0 0 12px" }}>
          Tell us about your company.
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: "#2b2b2b", margin: "0 0 40px" }}>
          We&rsquo;ll use your answers to create five different visual directions and send them within two business days.
          No payment is required. Business days are Monday through Saturday; Sundays don&rsquo;t count.
        </p>

        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <input type="text" name="botField" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />

          <div>
            <label htmlFor="company" style={label}>
              Company name
            </label>
            <input id="company" name="company" required style={field} />
          </div>
          <div>
            <label htmlFor="name" style={label}>
              Your name
            </label>
            <input id="name" name="name" required style={field} />
          </div>
          <div>
            <label htmlFor="phone" style={label}>
              Cell number
            </label>
            <input id="phone" name="phone" type="tel" required style={field} />
          </div>
          <div>
            <label htmlFor="email" style={label}>
              Email
            </label>
            <input id="email" name="email" type="email" required style={field} />
          </div>
          <div>
            <label htmlFor="city" style={label}>
              City
            </label>
            <input id="city" name="city" style={field} />
          </div>
          <div>
            <label htmlFor="towns" style={label}>
              Towns you cover
            </label>
            <input id="towns" name="towns" placeholder="Oildale, Wasco, Taft…" style={field} />
          </div>
          <div>
            <label htmlFor="services" style={label}>
              Services you offer
            </label>
            <textarea id="services" name="services" required rows={4} style={{ ...field, resize: "vertical" }} />
          </div>
          <div>
            <label htmlFor="impression" style={label}>
              How should customers describe your company?
            </label>
            <p style={hint}>For example: established, tough, premium, modern, friendly, or family-owned.</p>
            <textarea id="impression" name="impression" required rows={3} style={{ ...field, resize: "vertical" }} />
          </div>

          <div>
            <label htmlFor="logo" style={label}>
              Your current logo, if you have one
            </label>
            <p style={hint}>Optional. Camera roll is fine.</p>
            <input id="logo" name="logo" type="file" accept="image/*,.ai,.svg,.pdf" style={{ fontSize: 16 }} />
          </div>
          <div>
            <label htmlFor="shop" style={label}>
              A photo of your shop or storefront
            </label>
            <p style={hint}>Optional. If you later start production, we can use it for your paid signage mockups.</p>
            <input id="shop" name="shop" type="file" accept="image/*" style={{ fontSize: 16 }} />
          </div>
          <div>
            <label htmlFor="truck" style={label}>
              A photo of a truck or van
            </label>
            <p style={hint}>Optional. If you later start production, we can use it for your paid wrap mockups.</p>
            <input id="truck" name="truck" type="file" accept="image/*" style={{ fontSize: 16 }} />
          </div>

          <fieldset style={{ border: "1px solid #e6e6e6", borderRadius: 12, padding: 16, margin: 0 }}>
            <legend style={{ fontWeight: 600, padding: "0 6px" }}>Do you want a mascot / character?</legend>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
              {["Yes", "No", "Show me both"].map((opt) => (
                <label key={opt} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 16 }}>
                  <input type="radio" name="mascot" value={opt} defaultChecked={opt === "Show me both"} />
                  {opt}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="colors" style={label}>
              Colors you like or want to avoid
            </label>
            <p style={hint}>Optional</p>
            <textarea id="colors" name="colors" rows={2} style={{ ...field, resize: "vertical" }} />
          </div>
          <div>
            <label htmlFor="competitors" style={label}>
              Two competitors whose look you&rsquo;d like to beat
            </label>
            <p style={hint}>Optional</p>
            <textarea id="competitors" name="competitors" rows={2} style={{ ...field, resize: "vertical" }} />
          </div>

          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              padding: 16,
              border: "1px solid #d8d8d8",
              borderRadius: 10,
              background: "#fff",
              fontSize: 13.5,
              lineHeight: 1.55,
              color: "#4a4a4a",
            }}
          >
            <input type="checkbox" name="termsAccepted" value="yes" required style={{ marginTop: 3, flex: "none" }} />
            <span>
              I understand the five initial directions are AI-assisted raster concept images for choosing a direction,
              not finished or vector logo files. Unselected concepts may not be used. I agree to the{" "}
              <a href="/trades/terms#B.0" target="_blank" rel="noreferrer" style={{ color: "#8000ff" }}>
                pre-purchase concept terms
              </a>
              .
            </span>
          </label>

          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            style={{
              background: "linear-gradient(135deg,#8000ff,#5600ab)",
              color: "#fff",
              border: "none",
              borderRadius: 11,
              fontWeight: 600,
              fontSize: 17,
              padding: "16px 28px",
              cursor: status === "sending" || status === "sent" ? "default" : "pointer",
              opacity: status === "sending" ? 0.7 : 1,
            }}
          >
            {status === "sent" ? "Got it — your directions are next" : status === "sending" ? "Sending…" : "Show Me My 5 Directions"}
          </button>
          {status === "sent" && (
            <p style={{ margin: 0, padding: 16, borderRadius: 10, background: "#ecfdf3", color: "#176b3a", fontSize: 15, lineHeight: 1.6 }}>
              We received your intake. We&rsquo;ll send your five directions within two business days. You won&rsquo;t be
              asked to pay unless you choose a direction and want us to produce it.
            </p>
          )}
          {status === "error" && (
            <p style={{ color: "#b42318", margin: 0, fontSize: 15 }}>
              {error}{" "}
              <a href={`tel:${PHONE_TEL}`} style={{ color: "#8000ff" }}>
                {PHONE_DISPLAY}
              </a>
            </p>
          )}
        </form>

        <p style={{ marginTop: 32, fontSize: 16, color: "#4a4a4a" }}>
          Rather just talk? Call or text us at{" "}
          <a href={`tel:${PHONE_TEL}`} style={{ color: "#8000ff", fontWeight: 600, textDecoration: "none" }}>
            {PHONE_DISPLAY}
          </a>
          . Or email{" "}
          <a href={`mailto:${EMAIL}`} style={{ color: "#8000ff", textDecoration: "none" }}>
            {EMAIL}
          </a>
          .
        </p>
      </main>
    </div>
  );
}
