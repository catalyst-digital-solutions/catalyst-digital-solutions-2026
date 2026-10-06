import { getCheckoutUrl } from "@/lib/config";

type CheckoutButtonProps = {
  envKey: string;
  label: string;
};

export default function CheckoutButton({ envKey, label }: CheckoutButtonProps) {
  const href = getCheckoutUrl(envKey);

  if (!href) {
    return (
      <div className="acceptance-actions">
        <span className="btn-disabled" role="link" aria-disabled="true">
          {label}
        </span>
        <p className="checkout-note">Checkout link coming soon</p>
      </div>
    );
  }

  return (
    <div className="acceptance-actions">
      <a className="btn btn-primary" href={href}>
        {label}
      </a>
    </div>
  );
}
