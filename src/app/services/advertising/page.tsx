import type { Metadata } from "next";
import ServicePageBody from "@/components/services/ServicePageBody";

export const metadata: Metadata = {
  title: "Advertising — Catalyst Digital Solutions",
  description: "Paid traffic that actually turns into bids. Meta Ads, Google Ads, dedicated landing pages, and call tracking.",
};

export default function Page() {
  return (
    <ServicePageBody
      breadcrumbLabel="ADVERTISING"
      accent="#b56bff"
      eyebrow="Immediate leads, while the long game builds"
      h1="Paid traffic that actually turns into bids."
      intro="SEO builds your moat over months. Ads bring qualified leads starting this week. Used right, they work together — ads catch the buyers ready now, SEO builds the presence that keeps working after you stop paying for clicks."
      includedHeading="Campaigns built to convert, not to spend"
      items={[
        { color: "#b56bff", title: "Meta Ads (Facebook & Instagram)", desc: "Creative, targeting, and campaign management." },
        { color: "#b56bff", title: "Google Ads (Search/PPC)", desc: "Captures high-intent searches like “custom home builder [city].”" },
        { color: "#b56bff", title: "Dedicated landing pages for ad traffic", desc: "Never sent to your homepage — always built to convert one specific offer." },
        { color: "#b56bff", title: "Call tracking and source attribution", desc: "Know exactly which ad, which keyword, which dollar produced the lead." },
      ]}
      finalCtaHeading="Leads this week. A moat over months."
    />
  );
}
