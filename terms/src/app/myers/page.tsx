import type { Metadata } from "next";
import MyersAgreementPage from "@/components/myers/MyersAgreementPage";
import { myersAgreement } from "@/content/myers";
import "./myers.css";

export const metadata: Metadata = {
  title: { absolute: myersAgreement.metadata.title },
  description: myersAgreement.metadata.description,
  alternates: {
    canonical: myersAgreement.metadata.canonical,
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

export default function MyersPage() {
  return <MyersAgreementPage />;
}
