import type { Metadata } from "next";
import Link from "next/link";
import ServicePageBody from "@/components/services/ServicePageBody";

export const metadata: Metadata = {
  title: "Operations & Automation — Catalyst Digital Solutions",
  description: "Systems that run your business while you're not looking. 24/7 AI voice agent, chatbot, CRM automation, and ERP setup.",
};

export default function Page() {
  return (
    <ServicePageBody
      breadcrumbLabel="OPERATIONS & AUTOMATION"
      accent="#00d4ff"
      eyebrow="The part that keeps working at 2am"
      h1="Systems that run your business while you're not looking."
      intro="The gap between owners who scale and owners who stay stuck usually isn't work ethic — it's how much still depends on them personally answering, following up, and keeping track. This closes that gap."
      includedHeading="Nothing depends on you being available"
      items={[
        { color: "#00d4ff", title: "24/7 AI Voice Agent", desc: "Answers every call, qualifies the lead, books the appointment." },
        { color: "#00d4ff", title: "AI website chatbot", desc: "Trained on your services — answers visitors like someone who works there." },
        { color: "#00d4ff", title: "CRM setup + automation", desc: "Leads get followed up every time, automatically." },
        { color: "#00d4ff", title: "Invoice and collections automation", desc: "Chasing payment stops eating your week." },
        {
          color: "#00d4ff",
          title: "ERP setup — one-time project",
          desc: (
            <>
              BuilderTrend/Procore implementation — see{" "}
              <Link href="/quick-wins" style={{ color: "#00d4ff", textDecoration: "none", borderBottom: "1px solid rgba(0,212,255,.4)" }}>Quick Wins</Link>{" "}
              for scope and pricing.
            </>
          ),
        },
      ]}
      finalCtaHeading="Scale past what depends on you personally."
    />
  );
}
