"use client";

import { useState } from "react";

interface IcebergPanelProps {
  triggerLabel: string;
  children: React.ReactNode;
  variant?: "text" | "pill";
}

export default function IcebergPanel({
  triggerLabel,
  children,
  variant = "pill",
}: IcebergPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={variant === "pill" ? "iceberg-pill" : "iceberg-trigger"}
      >
        <span style={{ fontSize: "15px", lineHeight: 1 }}>{open ? "⊖" : "⊕"}</span>
        {triggerLabel}
      </button>

      <div className={`iceberg-panel${open ? " open" : ""}`}>
        <div
          style={{
            fontSize: "14px",
            color: "var(--cds-body)",
            lineHeight: 1.7,
            fontFamily: "var(--font-inter)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
