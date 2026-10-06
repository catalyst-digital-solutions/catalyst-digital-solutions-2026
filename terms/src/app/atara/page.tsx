import type { Metadata } from "next";
import AgreementPage from "@/components/AgreementPage";
import { ataraAgreement } from "@/content/atara";

export const metadata: Metadata = {
  title: { absolute: ataraAgreement.metadata.title },
  description: ataraAgreement.metadata.description,
  alternates: {
    canonical: ataraAgreement.metadata.canonical,
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AtaraAgreementPage() {
  return <AgreementPage agreement={ataraAgreement} />;
}
