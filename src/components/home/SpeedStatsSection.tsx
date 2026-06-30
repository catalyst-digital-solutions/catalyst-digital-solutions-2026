"use client";

import { useEffect, useRef, useState } from "react";
import IcebergPanel from "@/components/IcebergPanel";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  {
    value: 21,
    suffix: "x",
    label: "more likely to land the job when you respond in 5 minutes instead of 30",
  },
  {
    value: 42,
    suffix: " hrs",
    label: "the average business takes to respond to a new lead",
  },
  {
    value: 78,
    suffix: "%",
    label: "of customers buy from whoever responds first",
  },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setCount(target); return; }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          function step(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {count}
      {suffix}
    </span>
  );
}

export default function SpeedStatsSection() {
  return (
    <section
      className="section"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(128,0,255,0.18), transparent 70%)",
      }}
    >
      <div className="container centered" style={{ gap: "48px" }}>
        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <h2
            className="display"
            style={{ fontSize: "clamp(40px, 5vw, 80px)", textAlign: "center", maxWidth: "700px" }}
          >
            The Fastest Contractor Wins the Job
          </h2>
          <p
            style={{
              color: "var(--cds-purple-light)",
              fontFamily: "var(--font-inter)",
              fontSize: "16px",
              textAlign: "center",
              maxWidth: "520px",
              lineHeight: 1.6,
            }}
          >
            Most leads go to whoever answers first. Here&apos;s what the speed gap really costs you.
          </p>
        </div>

        {/* Stat cards */}
        <div className="three-col" style={{ width: "100%", gap: "20px" }}>
          {STATS.map((stat) => (
            <div
              key={stat.suffix}
              className="card"
              style={{ textAlign: "center", padding: "40px 28px" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 700,
                  fontSize: "clamp(52px, 6vw, 72px)",
                  color: "var(--cds-green)",
                  lineHeight: 1,
                  marginBottom: "16px",
                  letterSpacing: "-1px",
                }}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--cds-body)",
                  lineHeight: 1.6,
                  fontFamily: "var(--font-inter)",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Iceberg */}
        <IcebergPanel triggerLabel="See how we make you the first to respond →" variant="text">
          Our 24/7 AI Voice Agent answers every call within seconds — qualifying the lead, capturing
          their details, and booking the appointment before they even think about calling your
          competitor. Speed wins jobs. We give you speed.
        </IcebergPanel>
      </div>
    </section>
  );
}
