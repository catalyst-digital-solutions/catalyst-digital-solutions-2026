"use client";

import { useEffect, useState } from "react";

const WORDS = ["Jobs.", "Revenue.", "Profit."];

export default function RotatingWord() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 280);
    }, 2400);

    return () => clearInterval(id);
  }, []);

  return (
    <span
      style={{
        color: "var(--cds-purple-light)",
        display: "inline-block",
        transition: "opacity 0.28s ease, transform 0.28s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
      }}
    >
      {WORDS[index]}
    </span>
  );
}
