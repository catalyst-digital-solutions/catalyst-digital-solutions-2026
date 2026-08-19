"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import { CAL_URL, EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/config/slots";
import type { CheckoutPrefill } from "@/lib/stripe-checkout-prefill";

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

export default function BrandStarterStart({ prefill }: { prefill: CheckoutPrefill }) {
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
      document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setStatus("error");
      setError("Something went wrong. Call or text us and we'll do this together.");
    }
  }

  const calSrc = (() => {
    const u = new URL(CAL_URL);
    u.searchParams.set("embed", "true");
    if (prefill.name) u.searchParams.set("name", prefill.name);
    if (prefill.email) u.searchParams.set("email", prefill.email);
    return u.toString();
  })();

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
          Brand Starter
        </p>
        <h1 style={{ font: "700 36px/1.2 var(--font-inter), sans-serif", color: "#1a1a1a", margin: "0 0 12px" }}>
          You&rsquo;re in. Let&rsquo;s build your brand.
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: "#2b2b2b", margin: "0 0 40px" }}>
          Two quick things and we&rsquo;ll get started today.
        </p>

        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <input type="hidden" name="sessionId" value={prefill.sessionId} />
          <input type="text" name="botField" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />

          <div>
            <label htmlFor="company" style={label}>
              Company name
            </label>
            <input id="company" name="company" required defaultValue={prefill.company} style={field} />
          </div>
          <div>
            <label htmlFor="name" style={label}>
              Your name
            </label>
            <input id="name" name="name" required defaultValue={prefill.name} style={field} />
          </div>
          <div>
            <label htmlFor="phone" style={label}>
              Cell number
            </label>
            <input id="phone" name="phone" type="tel" required defaultValue={prefill.phone} style={field} />
          </div>
          <div>
            <label htmlFor="email" style={label}>
              Email
            </label>
            <input id="email" name="email" type="email" required defaultValue={prefill.email} style={field} />
          </div>
          <div>
            <label htmlFor="city" style={label}>
              City
            </label>
            <input id="city" name="city" defaultValue={prefill.city} style={field} />
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
            <p style={hint}>Optional — if you send one, we&rsquo;ll put your new sign on it.</p>
            <input id="shop" name="shop" type="file" accept="image/*" style={{ fontSize: 16 }} />
          </div>
          <div>
            <label htmlFor="truck" style={label}>
              A photo of a truck or van
            </label>
            <p style={hint}>Optional. Camera roll is fine.</p>
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
            {status === "sent" ? "Got it — pick a time below" : status === "sending" ? "Sending…" : "Send and book a time"}
          </button>
          {status === "error" && (
            <p style={{ color: "#b42318", margin: 0, fontSize: 15 }}>
              {error}{" "}
              <a href={`tel:${PHONE_TEL}`} style={{ color: "#8000ff" }}>
                {PHONE_DISPLAY}
              </a>
            </p>
          )}
        </form>

        <div id="book" style={{ marginTop: 56, scrollMarginTop: 24 }}>
          <h2 style={{ font: "700 28px/1.25 var(--font-inter), sans-serif", margin: "0 0 8px" }}>
            Pick a time to see it.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: "#4a4a4a", margin: "0 0 20px" }}>
            Your preview will be live before we meet.
          </p>
          <iframe
            title="Book a 20-minute call"
            src={calSrc}
            style={{ width: "100%", height: 740, border: "1px solid #e6e6e6", borderRadius: 12, background: "#fff" }}
          />
        </div>

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
