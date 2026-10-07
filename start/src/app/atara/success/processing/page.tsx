import AtaraProcessing from "@/components/AtaraProcessing";
import { ataraPrivatePageMetadata } from "@/lib/success-metadata";

export const metadata = ataraPrivatePageMetadata({
  path: "/atara/success/processing",
  title: "Payment processing · Atara Mechanical × Catalyst Digital Solutions",
  description: "Stripe is still confirming the payment. You don’t need to submit it again.",
  imageAlt: "Atara Mechanical — Payment processing.",
});

export default function AtaraProcessingPage() {
  return <AtaraProcessing />;
}
