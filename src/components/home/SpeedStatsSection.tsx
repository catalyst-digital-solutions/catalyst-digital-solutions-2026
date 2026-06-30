"use client";

import { useEffect, useRef, useState } from "react";

interface Stat { value: number; suffix: string; label: string; }

const STATS: Stat[] = [
  { value: 21, suffix: "×",    label: "more likely to land the job when you respond in 5 minutes instead of 30" },
  { value: 42, suffix: " hrs", label: "the average business takes to respond to a new lead" },
  { value: 78, suffix: "%",    label: "of customers buy from whoever responds first" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setCount(target); return; }

    // IntersectionObserver — no scroll-handler jank
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const dur = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / dur);
            const k = 1 - Math.pow(1 - t, 3); // cubic ease-out, exact match reference
            setCount(Math.round(target * k));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div
      ref={ref}
      style={{
        fontFamily: "'Inter',sans-serif",
        fontWeight: 700,
        fontSize: "clamp(54px,6vw,76px)",
        lineHeight: 1,
        letterSpacing: "-1px",
        color: "#80ff80",
        // Glow from reference
        textShadow: "0 0 28px rgba(128,255,128,.35)",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {count}
      {suffix}
    </div>
  );
}

export default function SpeedStatsSection() {
  return (
    <section
      style={{
        position: "relative",
        background: "#080b0f",
        fontFamily: "'Inter',sans-serif",
        color: "#c8c8c8",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "clamp(40px,5vw,64px)",
        padding: "clamp(80px,11vw,150px) clamp(20px,5vw,64px)",
      }}
    >
      {/* Purple radial glow — top-left */}
      <div
        style={{
          position: "absolute",
          top: "-8%",
          left: "-6%",
          width: "560px",
          height: "560px",
          maxWidth: "90vw",
          background: "radial-gradient(circle at center,rgba(128,0,255,.26),transparent 64%)",
          filter: "blur(26px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "840px" }}>
        <h2
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontWeight: 400,
            textTransform: "uppercase",
            fontSize: "clamp(40px,5.4vw,80px)",
            lineHeight: .92,
            letterSpacing: "1px",
            color: "#fafafa",
            margin: 0,
          }}
        >
          The fastest contractor wins the job
        </h2>
        <p style={{ fontSize: "clamp(16px,1.4vw,18px)", color: "#b56bff", lineHeight: 1.6, margin: "22px auto 0", maxWidth: "580px" }}>
          Most leads go to whoever answers first. Here&apos;s what the speed gap really costs you.
        </p>
      </div>

      {/* Stat cards — green border, glow text-shadow */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "stretch",
          justifyContent: "center",
          gap: "clamp(16px,2vw,24px)",
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        {STATS.map((stat) => (
          <div
            key={stat.suffix}
            style={{
              flex: "1 1 270px",
              minWidth: "240px",
              maxWidth: "320px",
              background: "linear-gradient(180deg,#0c1016,#090c11)",
              border: "1px solid rgba(128,255,128,.22)",
              borderRadius: "18px",
              padding: "34px 28px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0 24px 60px rgba(0,0,0,.4)",
            }}
          >
            <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            <p style={{ fontSize: "14.5px", color: "#c8c8c8", lineHeight: 1.55, margin: "18px 0 0" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Iceberg link — #00d4ff per reference */}
      <a
        href="/how-it-works#speed-to-lead"
        style={{
          position: "relative",
          zIndex: 1,
          display: "inline-flex",
          alignItems: "center",
          gap: "9px",
          fontFamily: "'Inter',sans-serif",
          fontSize: "15.5px",
          fontWeight: 600,
          color: "#00d4ff",
          textDecoration: "none",
        }}
      >
        <span style={{ fontSize: "17px", lineHeight: 1 }}>⊕</span>{" "}
        See how we make you the first to respond{" "}
        <span style={{ fontSize: "17px" }}>→</span>
      </a>
    </section>
  );
}
