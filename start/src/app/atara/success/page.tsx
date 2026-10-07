import AtaraSuccess from "@/components/AtaraSuccess";
import { ataraPrivatePageMetadata } from "@/lib/success-metadata";

export const metadata = ataraPrivatePageMetadata({
  path: "/atara/success",
  description: "Payment confirmed. The Atara Mechanical website project is officially underway.",
});

export default function AtaraKickoffSuccessPage() {
  return <AtaraSuccess variant="kickoff" />;
}
