import AtaraSuccess from "@/components/AtaraSuccess";
import { ataraPrivatePageMetadata } from "@/lib/success-metadata";

export const metadata = ataraPrivatePageMetadata({
  path: "/atara/success/full",
  description: "Payment confirmed. The Atara Mechanical website build is paid in full.",
});

export default function AtaraFullPaySuccessPage() {
  return <AtaraSuccess variant="full" />;
}
