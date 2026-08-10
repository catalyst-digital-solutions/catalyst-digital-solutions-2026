import type { Metadata } from "next";
import ServicesV4 from "@/components/v4/ServicesV4";

export const metadata: Metadata = {
  title: "Services — Catalyst Digital Solutions",
  description:
    "One growth engine. Seven working parts: Websites & Branding, SEO, Google Optimization & Reviews, Advertising, Content Generation, Operations & Automation, and Construction RFP AI.",
};

export default function Page() {
  return <ServicesV4 />;
}
