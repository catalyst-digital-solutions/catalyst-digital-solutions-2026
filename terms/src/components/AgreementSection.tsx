import { Children, type ReactNode } from "react";

type AgreementSectionProps = {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
};

export function AgreementSection({ id, number, title, children }: AgreementSectionProps) {
  const childArray = Children.toArray(children);
  const first = childArray[0];
  const rest = childArray.slice(1);

  return (
    <section className="agreement-section" aria-labelledby={id}>
      <div className="section-keep">
        <h2 id={id}>
          <span className="section-num">{number}.</span>
          {title}
        </h2>
        {first}
      </div>
      {rest}
    </section>
  );
}

type SubheadingProps = {
  id: string;
  children: ReactNode;
};

export function Subheading({ id, children }: SubheadingProps) {
  return <h3 id={id}>{children}</h3>;
}

export function PriceCallout({
  amount,
  label = "Project price",
}: {
  amount: string;
  label?: string;
}) {
  return (
    <div className="price-callout">
      <span className="price-callout-label">{label}</span>
      <span className="price-callout-amount">{amount}</span>
    </div>
  );
}
