import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
  axes: ["wdth"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://start.catalyst-digital-solutions.com"),
  title: {
    default: "Private Project Checkout · Atara Mechanical × Catalyst Digital Solutions",
    template: "%s",
  },
  description: "Private project checkout for Atara Mechanical.",
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
  icons: {
    icon: "/atara/atara-logo.webp",
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
      className={`${archivo.variable} ${ibmPlexMono.variable} ${archivo.className}`}
      style={{ background: "#102140" }}
    >
      <head>
        <link
          rel="preload"
          href="/atara/atara-checkout-intro-poster.jpg"
          as="image"
        />
        <link
          rel="preload"
          href="/atara/atara-checkout-intro-final.png"
          as="image"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js","splash-lock");`,
          }}
        />
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                ".intro-splash{display:none!important}html,body{overflow:auto!important;background:#F5F7F9}",
            }}
          />
        </noscript>
      </head>
      <body style={{ background: "#102140", margin: 0 }}>
        <Script id="splash-lock" strategy="beforeInteractive">
          {`document.documentElement.classList.add("js","splash-lock");`}
        </Script>
        {children}
      </body>
    </html>
  );
}
