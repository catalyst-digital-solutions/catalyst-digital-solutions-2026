"use client";

import { useEffect, useState } from "react";
import type { AgreementNavItem } from "@/content/types";

type SectionNavProps = {
  items: AgreementNavItem[];
};

function NavLinks({
  items,
  activeId,
}: {
  items: AgreementNavItem[];
  activeId: string | null;
}) {
  return (
    <ol className="nav-list">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            aria-current={activeId === item.id ? "location" : undefined}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ol>
  );
}

export default function SectionNav({ items }: SectionNavProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="section-nav" aria-label="Agreement sections">
      <details className="jump-nav">
        <summary>Jump to section</summary>
        <NavLinks items={items} activeId={activeId} />
      </details>
      <div className="desktop-nav">
        <p className="nav-heading">On this page</p>
        <NavLinks items={items} activeId={activeId} />
      </div>
    </nav>
  );
}
