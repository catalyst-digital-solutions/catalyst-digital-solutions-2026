import Image from "next/image";
import AcceptancePanel from "@/components/AcceptancePanel";
import PrintButton from "@/components/PrintButton";
import ProjectSummary from "@/components/ProjectSummary";
import SectionNav from "@/components/SectionNav";
import type { AgreementDefinition } from "@/content/types";

type AgreementPageProps = {
  agreement: AgreementDefinition;
};

export default function AgreementPage({ agreement }: AgreementPageProps) {
  const Body = agreement.Body;

  return (
    <div className="page">
      <a className="skip-link" href="#agreement">
        Skip to agreement
      </a>
      <header className="chrome no-print">
        <a
          className="chrome-brand"
          href="https://catalyst-digital-solutions.com"
        >
          <Image
            className="chrome-wordmark"
            src="/assets/cds-wordmark.png"
            alt="Catalyst Digital Solutions"
            width={200}
            height={70}
            priority
          />
        </a>
        <PrintButton />
      </header>

      <div className="shell">
        <SectionNav items={agreement.nav} />
        <article className="agreement" id="agreement">
          <p className="parties">{agreement.partiesLine}</p>
          <h1>{agreement.title}</h1>
          <p className="subtitle">{agreement.subtitle}</p>
          <p className="updated">Last updated: {agreement.lastUpdated}</p>
          <ProjectSummary
            heading={agreement.summary.heading}
            rows={agreement.summary.rows}
          />
          <Body />
          <AcceptancePanel
            text={agreement.acceptanceText}
            checkoutEnvKey={agreement.checkoutEnvKey}
            checkoutButtonLabel={agreement.checkoutButtonLabel}
          />
          <p className="updated updated-footer">
            Last updated: {agreement.lastUpdated}
          </p>
        </article>
      </div>
    </div>
  );
}
