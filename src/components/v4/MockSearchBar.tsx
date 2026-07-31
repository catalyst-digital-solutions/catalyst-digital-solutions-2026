"use client";

import { useEffect, useState } from "react";

const QUERY = "general contractor in Los Angeles";

/** Looping typewriter for the homepage mock Google search bar. */
export default function MockSearchBar() {
  const [text, setText] = useState("");

  useEffect(() => {
    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout>;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timeout = setTimeout(resolve, ms);
      });

    async function loop() {
      while (!cancelled) {
        for (let i = 1; i <= QUERY.length; i++) {
          if (cancelled) return;
          setText(QUERY.slice(0, i));
          await wait(55 + Math.random() * 35);
        }
        await wait(1800);
        for (let i = QUERY.length - 1; i >= 0; i--) {
          if (cancelled) return;
          setText(QUERY.slice(0, i));
          await wait(28);
        }
        await wait(700);
      }
    }

    loop();
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        background: "#0c1016",
        border: "1px solid rgba(0,212,255,.35)",
        borderRadius: 100,
        padding: "18px 26px",
        boxShadow: "0 0 0 1px rgba(0,212,255,.08),0 24px 70px rgba(0,0,0,.55),0 0 44px rgba(0,212,255,.12)",
        textAlign: "left",
        pointerEvents: "none",
        userSelect: "none",
      }}
      aria-hidden
    >
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2.2" style={{ flex: "none" }}>
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.5" y2="16.5" />
      </svg>
      <div
        style={{
          flex: 1,
          fontSize: "clamp(15px,1.5vw,18px)",
          color: "#fafafa",
          whiteSpace: "nowrap",
          overflow: "hidden",
          minWidth: 0,
        }}
      >
        {text}
        <span
          style={{
            display: "inline-block",
            width: 2,
            height: "1.1em",
            background: "#00d4ff",
            verticalAlign: "text-bottom",
            marginLeft: 2,
            animation: "caretBlink 1.1s step-end infinite",
          }}
        />
      </div>
      <div
        style={{
          flex: "none",
          fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: "1.5px",
          color: "#7f8896",
          textTransform: "uppercase",
        }}
      >
        Google
      </div>
    </div>
  );
}
