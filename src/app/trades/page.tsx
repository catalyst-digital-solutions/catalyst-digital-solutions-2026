import type { Metadata } from "next";
import TradesOfferLanding from "@/components/trades/TradesOfferLanding";

export const metadata: Metadata = {
  title: "The $4,000 Brand — Catalyst Digital Solutions",
  description:
    "Complete brand + website package for HVAC, refrigeration, and plumbing owners. First 5 companies $4,000. Book a 20-minute call.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Be the one they call first.",
    description: "Complete brand + website for HVAC, refrigeration & plumbing — $4,000 for the first 5.",
    url: "https://getbranded.catalyst-digital-solutions.com",
    images: [{ url: "/assets/trades/super-j-opengraph-image.png", width: 1200, height: 630 }],
  },
};

export default function TradesPage() {
  return <TradesOfferLanding />;
}
