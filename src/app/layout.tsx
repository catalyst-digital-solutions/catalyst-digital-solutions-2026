import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Bebas_Neue, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import {
  ADDRESS_LOCALITY,
  ADDRESS_REGION,
  PHONE_SCHEMA,
  POSTAL_CODE,
  PUBLIC_EMAIL,
  SAME_AS,
  SITE_NAME,
  SITE_ORIGIN,
  STREET_ADDRESS,
} from "@/config/site";

/* v4 design: fixed overlay nav — page heroes own their top padding (no main offset). */

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: SITE_NAME,
  url: SITE_ORIGIN,
  telephone: PHONE_SCHEMA,
  email: PUBLIC_EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: STREET_ADDRESS,
    addressLocality: ADDRESS_LOCALITY,
    addressRegion: ADDRESS_REGION,
    postalCode: POSTAL_CODE,
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "Canada" },
  ],
  sameAs: [...SAME_AS],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  // A URL object is resolved against each page's path, so every route
  // canonicalizes on this origin instead of inheriting the homepage URL.
  alternates: {
    canonical: new URL(SITE_ORIGIN),
  },
  title: "Catalyst Digital Solutions — Revenue Growth for Construction",
  description:
    "AI-powered marketing that grows your construction business. More qualified leads, more bids won, more revenue. Construction-only. Results in 90 days.",
  keywords: [
    "construction marketing",
    "contractor marketing",
    "construction leads",
    "AI marketing construction",
    "Bakersfield",
  ],
  icons: {
    icon: "/assets/catalyst-digital-solutions-favicon-circle.png",
  },
  openGraph: {
    title: "Catalyst Digital Solutions",
    description:
      "Revenue growth for construction companies. AI-powered. Construction-only.",
    url: SITE_ORIGIN,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: "/assets/og-share.jpg",
        width: 1024,
        height: 537,
        alt: "Catalyst Digital Solutions — Better jobs. Bigger margins.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Catalyst Digital Solutions",
    description:
      "Revenue growth for construction companies. AI-powered. Construction-only.",
    images: ["/assets/og-share.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebasNeue.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <LenisProvider>{children}</LenisProvider>
        <Suspense fallback={null}>
          <AnalyticsProvider />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
