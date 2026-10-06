import type { AgreementSummaryRow } from "@/content/types";

type ProjectSummaryProps = {
  heading: string;
  rows: AgreementSummaryRow[];
};

export default function ProjectSummary({ heading, rows }: ProjectSummaryProps) {
  return (
    <section className="summary-card" aria-labelledby="project-summary-heading">
      <p className="summary-heading" id="project-summary-heading">
        {heading}
      </p>
      <dl className="summary-list">
        {rows.map((row) => (
          <div className="summary-row" key={row.label}>
            <dt className="summary-label">{row.label}</dt>
            <dd className="summary-value">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
