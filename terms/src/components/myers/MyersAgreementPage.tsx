import AgreementDocument from "@/components/myers/AgreementDocument";
import PrintButton from "@/components/PrintButton";
import SectionNav from "@/components/SectionNav";
import { myersAgreement } from "@/content/myers";

export default function MyersAgreementPage() {
  const a = myersAgreement;
  return (
    <div className="md-page">
      <a className="skip-link" href="#agreement">
        Skip to agreement
      </a>
      <header className="md-topbar">
        <span className="md-topbar-text">
          <span className="md-long">
            {a.clientName} · {a.versionLabel} · {a.versionDate}
          </span>
          <span className="md-short">
            {a.versionLabel} · {a.versionDate}
          </span>
        </span>
        <span className="md-topbar-actions no-print">
          <a className="md-btn md-btn-light" href={a.pdf.href} download>
            <span className="print-full">{a.pdf.label}</span>
            <span className="print-short">PDF</span>
          </a>
          <span className="md-print">
            <PrintButton />
          </span>
        </span>
      </header>

      <div className="md-shell">
        <SectionNav items={a.nav} />
        <main className="md-main">
          <AgreementDocument sections={a.sections} title={a.title} versionLabel={a.versionLabel} />
          <section className="md-exec no-print" id="execution" aria-labelledby="execution-heading">
            <h2 id="execution-heading" className="md-exec-title">
              Execution
            </h2>
            <p>{a.executionNote}</p>
            <p className="md-pdf-note">
              <a href={a.pdf.href} download>
                {a.pdf.label}
              </a>{" "}
              — the PDF contains the identical Version 1.4 text shown on this page.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
