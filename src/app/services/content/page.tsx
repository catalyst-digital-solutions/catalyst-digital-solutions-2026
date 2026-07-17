import type { Metadata } from "next";
import ServicePageBody from "@/components/services/ServicePageBody";

export const metadata: Metadata = {
  title: "Content Generation — Catalyst Digital Solutions",
  description: "Your name, everywhere they look — without you behind a camera. AI-generated video, short-form clips, and auto-distribution.",
};

export default function Page() {
  return (
    <ServicePageBody
      breadcrumbLabel="CONTENT GENERATION"
      accent="#80ff80"
      eyebrow="A content factory that runs without you"
      h1="Your name, everywhere they look — without you behind a camera."
      intro="Consistency is what turns “never heard of them” into “the obvious choice.” Most contractors can't keep up a posting schedule — crews to run, bids to write, no time left for content. This runs whether you touch it or not."
      includedHeading="The factory floor"
      items={[
        { color: "#80ff80", title: "AI-generated video content", desc: "12 to 30 videos/month depending on plan." },
        { color: "#80ff80", title: "Short-form clips auto-extracted from every video", desc: "36 to 180 clips/month." },
        { color: "#80ff80", title: "Auto-distribution", desc: "YouTube, TikTok, Instagram Reels, and LinkedIn." },
        { color: "#80ff80", title: "Social media posting management", desc: "Consistent presence without you lifting a finger." },
      ]}
      finalCtaHeading="Stay in front of them — every single week."
    />
  );
}
