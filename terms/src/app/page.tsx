import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Client Agreements",
  description: "Private client agreements from Catalyst Digital Solutions.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "https://terms.catalyst-digital-solutions.com/",
  },
};

export default function HomePage() {
  return (
    <main className="home">
      <Image
        className="home-mark"
        src="/assets/cds-logo-circle.png"
        alt=""
        width={48}
        height={48}
      />
      <h1>Client agreements</h1>
      <p>
        This host serves private agreements between Catalyst Digital Solutions
        and individual clients. If you were sent a link to your agreement, use
        that address.
      </p>
      <p>
        <a href="https://catalyst-digital-solutions.com">
          Return to catalyst-digital-solutions.com
        </a>
      </p>
    </main>
  );
}
