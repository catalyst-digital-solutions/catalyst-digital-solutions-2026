import type { Metadata } from "next";
import BrandBuildTerms from "@/components/trades/BrandBuildTerms";

export const metadata: Metadata = {
  title: "Terms of Service — Catalyst Digital Solutions",
  description:
    "Terms of Service v1.0, Schedule A v1.2 (Brand Build), and Schedule B v1.1 (Brand Starter) for Catalyst Digital Solutions, LLC.",
  robots: { index: false, follow: false },
  icons: {
    icon: [
      {
        url: "/assets/trades/j-shield-emblem_circle-favicon.png",
        type: "image/png",
        sizes: "64x64",
      },
    ],
  },
};

export default function TradesTermsPage() {
  return <BrandBuildTerms />;
}
