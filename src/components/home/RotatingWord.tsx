"use client";

import { useEffect, useState } from "react";

const WORDS = ["JOBS", "REVENUE", "PROFIT"] as const;

export default function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // Exact reference interval: 2000ms
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, 2000);

    return () => clearInterval(id);
  }, []);

  return (
    // key forces React to remount the span so wordIn animation re-runs each word
    <span
      key={index}
      style={{
        display: "inline-block",
        background: "linear-gradient(90deg,#b56bff,#00d4ff)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        // wordIn: from{opacity:0;transform:translateY(.55em)} to{opacity:1;transform:translateY(0)}
        animation: "wordIn .55s cubic-bezier(.2,.8,.2,1)",
      }}
    >
      {WORDS[index]}
    </span>
  );
}
