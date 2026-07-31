"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Event-delegation wrapper for design-port ⊕ disclosures and FAQ accordions.
 * Buttons marked data-expand-toggle toggle the nearest following data-expand-panel.
 */
export default function Expandable({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const buttons = root.querySelectorAll<HTMLButtonElement>("[data-expand-toggle]");
    buttons.forEach((btn, i) => {
      if (!btn.id) btn.id = `expand-btn-${i}`;
      const panel = findPanel(btn);
      if (panel) {
        if (!panel.id) panel.id = `expand-panel-${i}`;
        btn.setAttribute("aria-controls", panel.id);
        btn.setAttribute("aria-expanded", panel.hasAttribute("hidden") ? "false" : "true");
      }
    });

    function onClick(e: MouseEvent) {
      const el = rootRef.current;
      if (!el) return;
      const target = e.target as HTMLElement | null;
      const btn = target?.closest?.("[data-expand-toggle]") as HTMLButtonElement | null;
      if (!btn || !el.contains(btn)) return;
      e.preventDefault();
      const panel = findPanel(btn);
      if (!panel) return;
      const willOpen = panel.hasAttribute("hidden");
      if (willOpen) panel.removeAttribute("hidden");
      else panel.setAttribute("hidden", "");
      btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
      updateIcon(btn, willOpen);
    }

    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, []);

  return <div ref={rootRef}>{children}</div>;
}

function findPanel(btn: HTMLElement): HTMLElement | null {
  let el: Element | null = btn.nextElementSibling;
  while (el) {
    if (el instanceof HTMLElement && el.hasAttribute("data-expand-panel")) return el;
    el = el.nextElementSibling;
  }
  const parent = btn.parentElement;
  if (!parent) return null;
  return parent.querySelector<HTMLElement>(":scope > [data-expand-panel]");
}

function updateIcon(btn: HTMLButtonElement, open: boolean) {
  const spans = btn.querySelectorAll("span");
  for (const span of spans) {
    const t = span.textContent?.trim();
    if (t === "+" || t === "−" || t === "-" || t === "–") {
      span.textContent = open ? "−" : "+";
      return;
    }
  }
}
