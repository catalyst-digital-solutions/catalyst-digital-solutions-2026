import type { Metadata } from "next";
import { Inter, Bebas_Neue, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
  openGraph: {
    title: "Catalyst Digital Solutions",
    description:
      "Revenue growth for construction companies. AI-powered. Construction-only.",
    url: "https://catalyst-digital-solutions.com",
    siteName: "Catalyst Digital Solutions",
    type: "website",
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
        <LenisProvider>
          <Nav />
          <main style={{ paddingTop: "64px" }}>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
