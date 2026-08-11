/* Ported from CDS Testimonials Section.dc.html — visual fidelity */
import type { CSSProperties } from "react";

const STAR_PATH =
  "M12 1.6l3.09 6.26 6.91 1-5 4.87 1.18 6.87L12 17.35l-6.18 3.25L7 13.73l-5-4.87 6.91-1L12 1.6z";

function Stars({ size = 18 }: { size?: number }) {
  return (
    <div style={{ display: "flex", gap: size >= 18 ? 4 : 3 }} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="#ffb200" aria-hidden>
          <path d={STAR_PATH} />
        </svg>
      ))}
    </div>
  );
}

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  initial: string;
  accent: "cyan" | "purple";
  /** Construction-trade clients shown on the homepage */
  contractor: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "beverly-hitcher",
    name: "Beverly Hitcher",
    role: "General Contractor",
    quote:
      "They do everything a business owner needs! Our calls have doubled over the past couple months--hubby's a custom home builder. Spent a heck of a lot less than I thought we would and we both really regret not calling them sooner. And to top it off the guys are just the sweetest! Thank you so much!",
    initial: "B",
    accent: "cyan",
    contractor: true,
  },
  {
    id: "stan-smith",
    name: "Stan Smith",
    role: "Construction Company Owner",
    quote:
      'Was burned by another "agency" to the tune of 54k and 18 mos wasted. Catalyst is the real deal. They gave JREY a complete face lift and did all the time saving stuff. Our win rate jumped up from 11-ish to 23%. More than doubled. Can\'t say enough good things. And they did it in a fraction of the time. Yeah. Thanks guys. Someday we\'ll do our vehicles. lol',
    initial: "S",
    accent: "purple",
    contractor: true,
  },
  {
    id: "randy-purham",
    name: "Randy Purham",
    role: "Congressional Campaign Manager",
    quote:
      "I needed a dynamic campaign website for a Congressional candidate and it was well beyond what I expected. I encourage you to check them out for your digital needs.",
    initial: "R",
    accent: "cyan",
    contractor: false,
  },
  {
    id: "ricardo-alvarez",
    name: "Ricardo Alvarez",
    role: "Plumbing Contractor",
    quote:
      "Does the best work! Had my website done and ready to go, very easy to work with, listened and gave input that made sense. Website is amazing, above and beyond what i expected! You need a website, this is the business to go with. Recommening to everyone! Amazing job!",
    initial: "R",
    accent: "purple",
    contractor: true,
  },
];

const accentStyles = {
  cyan: {
    bg: "rgba(0,212,255,.1)",
    border: "rgba(0,212,255,.35)",
    color: "#00d4ff",
  },
  purple: {
    bg: "rgba(181,107,255,.1)",
    border: "rgba(181,107,255,.35)",
    color: "#b56bff",
  },
} as const;

function Card({ t }: { t: Testimonial }) {
  const a = accentStyles[t.accent];
  return (
    <figure
      style={{
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        background: "linear-gradient(180deg,#0c1016,#090c11)",
        border: "1px solid rgba(255,255,255,.09)",
        borderRadius: 16,
        padding: "clamp(26px,3vw,36px)",
      }}
    >
      <Stars size={18} />
      <blockquote
        style={{
          margin: 0,
          fontSize: "clamp(16px,1.2vw,18px)",
          color: "#e6e6e6",
          lineHeight: 1.7,
          textWrap: "pretty",
        }}
      >
        {t.quote}
      </blockquote>
      <figcaption
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          paddingTop: 20,
          borderTop: "1px solid rgba(255,255,255,.07)",
        }}
      >
        <div
          style={{
            flex: "none",
            width: 44,
            height: 44,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: a.bg,
            border: `1px solid ${a.border}`,
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 22,
            letterSpacing: 1,
            color: a.color,
          }}
        >
          {t.initial}
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#fafafa" }}>{t.name}</div>
          <div style={{ fontSize: 13.5, color: "#c8c8c8", marginTop: 3 }}>{t.role}</div>
          <div
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 11.5,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: "#7f8896",
              marginTop: 6,
            }}
          >
            Google Review
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

type Props = {
  /** Defaults to all testimonials */
  ids?: string[];
  /** Only construction-trade clients (homepage) */
  contractorsOnly?: boolean;
  showCta?: boolean;
  className?: string;
  style?: CSSProperties;
};

export default function TestimonialsSection({
  ids,
  contractorsOnly = false,
  showCta = true,
  style,
}: Props) {
  let list = TESTIMONIALS;
  if (contractorsOnly) list = list.filter((t) => t.contractor);
  if (ids?.length) {
    const order = new Map(ids.map((id, i) => [id, i]));
    list = list.filter((t) => order.has(t.id)).sort((a, b) => (order.get(a.id)! - order.get(b.id)!));
  }

  return (
    <section
      data-screen-label="Testimonials"
      style={{
        position: "relative",
        background: "#080b0f",
        fontFamily: "'Inter',sans-serif",
        color: "#c8c8c8",
        overflow: "hidden",
        padding: "clamp(80px,10vw,150px) clamp(20px,5vw,64px)",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-6%",
          width: 620,
          height: 620,
          maxWidth: "90vw",
          background: "radial-gradient(circle at center,rgba(0,212,255,.09),transparent 65%)",
          filter: "blur(28px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1180, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "clamp(24px,4vw,56px)",
          }}
        >
          <div style={{ flex: "1 1 520px", minWidth: 300 }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#00d4ff",
                marginBottom: 16,
              }}
            >
              What clients say
            </div>
            <h2
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontWeight: 400,
                textTransform: "uppercase",
                fontSize: "clamp(42px,5vw,82px)",
                lineHeight: 0.9,
                letterSpacing: 1,
                color: "#fafafa",
                margin: 0,
                textWrap: "balance",
              }}
            >
              Doubled calls. Doubled win rates.
            </h2>
            <p
              style={{
                fontSize: "clamp(16px,1.2vw,19px)",
                color: "#c8c8c8",
                lineHeight: 1.6,
                margin: "20px 0 0",
                maxWidth: 560,
                textWrap: "pretty",
              }}
            >
              Every review below is a verified 5-star review left on Google by an owner we work with.
            </p>
          </div>

          <div
            style={{
              flex: "0 1 300px",
              minWidth: 260,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              background: "rgba(255,255,255,.025)",
              border: "1px solid rgba(255,255,255,.09)",
              borderRadius: 16,
              padding: "24px 26px",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <div
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: 56,
                  lineHeight: 0.85,
                  letterSpacing: 1,
                  color: "#fafafa",
                }}
              >
                5.0
              </div>
              <div style={{ paddingBottom: 6 }}>
                <Stars size={17} />
              </div>
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#7f8896",
              }}
            >
              Average Google rating
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))",
            gap: "clamp(20px,2.4vw,28px)",
            alignItems: "start",
            marginTop: "clamp(44px,5vw,72px)",
          }}
        >
          {list.map((t) => (
            <Card key={t.id} t={t} />
          ))}
        </div>

        {showCta && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: 18,
              marginTop: "clamp(40px,5vw,64px)",
            }}
          >
            <a
              href="https://cal.com/catalystdigitalsolutions/20min"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-full"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
                background: "#00d4ff",
                color: "#04121a",
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: 2,
                textTransform: "uppercase",
                padding: "17px 30px",
                borderRadius: 8,
              }}
            >
              Book a 20-Minute Call
            </a>
            <div
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#7f8896",
              }}
            >
              No pressure. No pitch deck.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
