import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="home">
      <h1>Page not found</h1>
      <p>That agreement link is not available.</p>
      <p>
        <a href="https://catalystdigitalsolutions.com">
          Return to catalystdigitalsolutions.com
        </a>
      </p>
    </main>
  );
}
