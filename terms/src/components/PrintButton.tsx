"use client";

export default function PrintButton() {
  return (
    <button type="button" className="btn btn-ghost no-print" onClick={() => window.print()}>
      <span className="print-full">Print / Save as PDF</span>
      <span className="print-short">Print / PDF</span>
    </button>
  );
}
