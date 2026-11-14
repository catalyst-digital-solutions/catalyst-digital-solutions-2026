type Props = {
  esignEnabled: boolean;
  esignUrl: string | null;
  checkoutEnabled: boolean;
  checkoutUrl?: string;
};

/**
 * Explains the execution and payment order. This panel is not part of the
 * Agreement text. Both actions stay disabled until an approved e-signature
 * provider is connected and Mario authorizes live payment collection.
 */
export default function ExecutionPanel({ esignEnabled, esignUrl, checkoutEnabled, checkoutUrl }: Props) {
  const canSign = esignEnabled && Boolean(esignUrl);
  const canPay = checkoutEnabled && Boolean(checkoutUrl);
  return (
    <section className="md-exec no-print" id="execution" aria-labelledby="execution-heading">
      <p className="md-kicker">Not part of the Agreement text</p>
      <h2 id="execution-heading" className="md-exec-title">
        Signing &amp; kickoff payment
      </h2>
      <p>
        This page is for review only and does not accept signatures, elections or
        payments. Viewing this page, or paying an invoice, does not execute the
        Agreement. The Schedule D hosting election (Accept or Decline) is made by
        Myers&apos;s authorized signer during electronic signing.
      </p>
      <ol className="md-steps">
        <li>Myers reviews the complete Version 1.4 Agreement.</li>
        <li>
          Both authorized representatives execute the Agreement through a separate,
          secure electronic-signature process, including the Schedule D hosting election.
        </li>
        <li>The fully executed Agreement is retained by both Parties.</li>
        <li>Myers then receives the secure $8,500 Phase 1 kickoff checkout link.</li>
        <li>Payment is confirmed and recorded against the $25,000 project price.</li>
      </ol>
      <div className="md-exec-actions">
        {canSign ? (
          <a className="md-btn md-btn-primary" href={esignUrl!}>
            Review &amp; sign electronically
          </a>
        ) : (
          <span className="md-btn md-btn-disabled" aria-disabled="true">
            Electronic signing not yet open
          </span>
        )}
        {canPay ? (
          <a className="md-btn md-btn-secondary" href={checkoutUrl}>
            Pay $8,500 Phase 1 kickoff
          </a>
        ) : (
          <span className="md-btn md-btn-disabled" aria-disabled="true">
            $8,500 kickoff checkout · available after execution
          </span>
        )}
      </div>
    </section>
  );
}
