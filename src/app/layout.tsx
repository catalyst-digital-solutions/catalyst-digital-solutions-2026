import type { Metadata } from "next";
import { Inter, Bebas_Neue, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

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

export const metadata: Metadata = {
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
    url: "https://catalyst-digital-solutions.com",
    siteName: "Catalyst Digital Solutions",
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
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
