import AtaraIncomplete from "@/components/AtaraIncomplete";
import { ataraPrivatePageMetadata } from "@/lib/success-metadata";

export const metadata = ataraPrivatePageMetadata({
  path: "/atara/success/incomplete",
  title: "Payment not completed · Atara Mechanical × Catalyst Digital Solutions",
  description:
    "We couldn’t confirm your payment. Your project has not been marked as paid, and you have not been charged by Catalyst for this attempt.",
  imageAlt: "Atara Mechanical — Payment not completed.",
});

export default function AtaraIncompletePage() {
  return <AtaraIncomplete />;
}
