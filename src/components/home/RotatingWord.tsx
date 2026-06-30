"use client";

import { useEffect, useRef, useState } from "react";

const WORDS = ["JOBS", "REVENUE", "PROFIT"] as const;

export default function RotatingWord() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Always cycle words — just skip the CSS animation when reduced-motion
    setAnimate(!prefersReduced);

    // 2000ms interval — exact reference value
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, 2000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <span
      key={animate ? index : undefined} // key only when animating (forces re-mount for wordIn)
      style={{
        display: "inline-block",
        background: "linear-gradient(90deg,#b56bff,#00d4ff)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        animation: animate ? "wordIn .55s cubic-bezier(.2,.8,.2,1)" : "none",
      }}
    >
      {WORDS[index]}
    </span>
  );
}
