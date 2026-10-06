import type { Metadata } from "next";
import AtaraCheckout from "@/components/AtaraCheckout";
import IntroSplash from "@/components/IntroSplash";
import { getAtaraStripeUrls } from "@/lib/config";

export const dynamic = "force-dynamic";

const PAGE_TITLE =
  "Private Project Checkout · Atara Mechanical × Catalyst Digital Solutions";
const OG_DESCRIPTION =
  "Choose how you’d like to begin the Atara Mechanical website build.";
const OG_IMAGE_ALT =
  "Atara Mechanical — Ready when you are. Private project checkout.";
const OG_IMAGE = {
  url: "/atara/atara-og-image.jpg",
  width: 1200,
  height: 630,
  alt: OG_IMAGE_ALT,
};

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
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
  openGraph: {
    title: PAGE_TITLE,
    description: OG_DESCRIPTION,
    type: "website",
    url: "https://start.catalyst-digital-solutions.com/atara",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE],
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
