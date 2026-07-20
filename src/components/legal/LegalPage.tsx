import type { ReactNode } from "react";

type LegalPageProps = {
  title: string;
  effectiveDate: string;
  lastUpdated: string;
  children: ReactNode;
};

/** Shared shell for /privacy and /terms. Styles live in globals.css (.legal-page*). */
export default function LegalPage({
  title,
  effectiveDate,
  lastUpdated,
  children,
}: LegalPageProps) {
  return (
    <article className="legal-page">
      <div className="legal-page-inner">
        <h1 className="display">{title}</h1>
        <p className="legal-meta">
          Effective date: {effectiveDate}
          <br />
          Last updated: {lastUpdated}
        </p>
        <div className="legal-body">{children}</div>
      </div>
    </article>
  );
}
