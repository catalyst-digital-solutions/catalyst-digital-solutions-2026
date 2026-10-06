import type { Metadata } from "next";
import AtaraCheckout from "@/components/AtaraCheckout";
import IntroSplash from "@/components/IntroSplash";
import { getAtaraStripeUrls } from "@/lib/config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    absolute: "Private Project Checkout · Atara Mechanical × Catalyst Digital Solutions",
  },
  description: "Private project checkout for Atara Mechanical.",
  alternates: {
    canonical: "https://start.catalyst-digital-solutions.com/atara",
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

export default function AtaraCheckoutPage() {
  const { kickoffUrl, fullUrl } = getAtaraStripeUrls();

  return (
    <IntroSplash>
      <AtaraCheckout kickoffUrl={kickoffUrl} fullUrl={fullUrl} />
    </IntroSplash>
  );
}
