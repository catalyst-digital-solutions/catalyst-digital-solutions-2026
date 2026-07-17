import type { Metadata } from "next";
import ServicePageBody from "@/components/services/ServicePageBody";

export const metadata: Metadata = {
  title: "SEO — Catalyst Digital Solutions",
  description: "Rank on Google. Get recommended by AI. On-page, local, programmatic SEO, and GEO/AEO optimization for AI answer engines.",
};

export default function Page() {
  return (
    <ServicePageBody
      breadcrumbLabel="SEO"
      accent="#b56bff"
      eyebrow="Get found — everywhere they're looking"
      h1="Rank on Google. Get recommended by AI."
      intro="Ranking isn't just a Google game anymore. Your customers are asking ChatGPT and AI search tools who the best contractor is — and if you're not optimized for that, you're invisible to an entire new channel of leads."
      includedHeading="Search, maps, and the AI answer engines"
      items={[
        { color: "#b56bff", title: "On-page + technical SEO", desc: "The fundamentals done right." },
        { color: "#b56bff", title: "Local SEO + citations", desc: "Show up in the map pack for your city." },
        { color: "#b56bff", title: "Programmatic SEO", desc: "Hundreds of location + service pages, built at scale." },
        { color: "#b56bff", title: "GEO/AEO optimization", desc: "Tuning your site so AI answer engines (ChatGPT, Perplexity, Google AI Overviews) find and recommend your business — not just traditional search." },
        { color: "#b56bff", title: "Blog and written content", desc: "Fuel for both search rankings and AI answer engines — every post is written to be the source an AI cites when someone asks “who’s the best [trade] in [city].”" },
      ]}
      finalCtaHeading="Be the answer — on Google and in the AI."
    />
  );
}
