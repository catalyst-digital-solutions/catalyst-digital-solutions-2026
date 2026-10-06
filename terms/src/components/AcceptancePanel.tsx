import CheckoutButton from "@/components/CheckoutButton";

type AcceptancePanelProps = {
  text: string;
  checkoutEnvKey: string;
  checkoutButtonLabel: string;
};

export default function AcceptancePanel({
  text,
  checkoutEnvKey,
  checkoutButtonLabel,
}: AcceptancePanelProps) {
  return (
    <aside className="acceptance-panel" aria-labelledby="acceptance-heading">
      <p className="acceptance-kicker" id="acceptance-heading">
        How these terms are accepted
      </p>
      <p>{text}</p>
      <CheckoutButton envKey={checkoutEnvKey} label={checkoutButtonLabel} />
    </aside>
  );
}
