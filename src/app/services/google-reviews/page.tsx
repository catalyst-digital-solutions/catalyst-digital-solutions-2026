import type { Metadata } from "next";
import ServicePageBody from "@/components/services/ServicePageBody";

export const metadata: Metadata = {
  title: "Google Optimization & Reviews — Catalyst Digital Solutions",
  description: "Own the map. Own the reviews. Google Business Profile management, maps optimization, and automated review generation.",
};

export default function Page() {
  return (
    <ServicePageBody
      breadcrumbLabel="GOOGLE & REVIEWS"
      accent="#00d4ff"
      eyebrow="Your local search weapon"
      h1="Own the map. Own the reviews."
      intro="When someone searches “[your trade] near me,” three companies show up before anyone else. If that's not you, that's who gets the call — and it's decided almost entirely by your Google Business Profile and your reviews."
      includedHeading="Winning the 3-pack, on autopilot"
      items={[
        { color: "#00d4ff", title: "Google Business Profile setup, optimization & ongoing management" },
        { color: "#00d4ff", title: "Regular GBP posts", desc: "Keeps your profile active and ranking." },
        { color: "#00d4ff", title: "Google Maps optimization", desc: "Verified, complete, and positioned to win the 3-pack." },
        { color: "#00d4ff", title: "Automated review generation", desc: "Every finished job becomes a request at the moment your client's happiest." },
        { color: "#00d4ff", title: "Review monitoring and response", desc: "Professional replies to every review, good or bad." },
      ]}
      finalCtaHeading="Three names win the call. Be one of them."
    />
  );
}
