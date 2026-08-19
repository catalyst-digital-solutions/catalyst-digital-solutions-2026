import type { Metadata } from "next";
import TradesOfferLanding from "@/components/trades/TradesOfferLanding";

export const metadata: Metadata = {
  title: "The $500 Brand Starter — Catalyst Digital Solutions",
  description:
    "See your plumbing company's new logo, business cards, and a working website preview for $500. Keep the logo either way. Bakersfield, CA.",
  robots: { index: false, follow: false },
  icons: {
    icon: [{ url: "/assets/trades/j-shield-emblem_circle-favicon.png", type: "image/png", sizes: "64x64" }],
    apple: [{ url: "/assets/trades/j-shield-emblem_circle-favicon.png", type: "image/png" }],
  },
  openGraph: {
    title: "Be the one they call first.",
    description: "$500 to see your new logo, cards, and a working preview of your website. Keep the logo either way.",
    url: "https://getbranded.catalyst-digital-solutions.com",
    images: [
      {
        url: "/assets/trades/super-j-opengraph-image.png",
        width: 1731,
        height: 909,
        alt: "Super J Open Graph preview — commercial refrigeration brand system",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Be the one they call first.",
    description: "$500 to see your new logo, cards, and a working preview of your website. Keep the logo either way.",
    images: ["/assets/trades/super-j-opengraph-image.png"],
  },
};

export default function TradesPage() {
  return <TradesOfferLanding />;
}
