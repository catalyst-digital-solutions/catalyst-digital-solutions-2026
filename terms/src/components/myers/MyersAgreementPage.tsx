import AgreementDocument from "@/components/myers/AgreementDocument";
import ExecutionPanel from "@/components/myers/ExecutionPanel";
import PrintButton from "@/components/PrintButton";
import SectionNav from "@/components/SectionNav";
import { myersAgreement } from "@/content/myers";
import { getCheckoutUrl } from "@/lib/config";

export default function MyersAgreementPage() {
  const a = myersAgreement;
  const checkoutUrl = a.checkout.enabled ? getCheckoutUrl(a.checkout.envKey) : undefined;
  return (
    <div className="md-page">
      <a className="skip-link" href="#agreement">
        Skip to agreement
      </a>
      {a.isDraft ? (
        <header className="md-draftbar">
          <span className="md-draft-tag">Draft</span>
          <span className="md-draftbar-text">
            <span className="md-long">
              {a.versionLabel} · {a.versionDate} · Not executed · For review only
            </span>
            <span className="md-short">{a.versionLabel} · Not executed</span>
          </span>
          <span className="md-draftbar-actions no-print">
            <a className="md-btn md-btn-light" href={a.pdf.href} download>
              <span className="print-full">{a.pdf.label}</span>
              <span className="print-short">PDF</span>
            </a>
            <span className="md-print">
              <PrintButton />
            </span>
          </span>
        </header>
      ) : null}
      {a.isDraft ? (
        <div className="md-watermark print-only" aria-hidden="true">
          DRAFT
        </div>
      ) : null}

      <div className="md-shell">
        <SectionNav items={a.nav} />
        <main className="md-main">
          <AgreementDocument sections={a.sections} title={a.title} versionLabel={a.versionLabel} />
          <ExecutionPanel
            esignEnabled={a.esign.enabled}
            esignUrl={a.esign.url}
            checkoutEnabled={a.checkout.enabled}
            checkoutUrl={checkoutUrl}
          />
          <p className="md-pdf-note no-print">
            <a href={a.pdf.href} download>
              {a.pdf.label}
            </a>{" "}
            — the PDF is generated from this same page and contains the identical Version 1.4 text.
          </p>
        </main>
      </div>
    </div>
  );
}
