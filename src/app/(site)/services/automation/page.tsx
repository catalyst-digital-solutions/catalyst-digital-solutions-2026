import type { Metadata } from "next";
import ServiceAutomationV4 from "@/components/v4/ServiceAutomationV4";

export const metadata: Metadata = {
  title: "Operations & Automation — Catalyst Digital Solutions",
  description:
    "Systems that answer, follow up, and collect — while you're not looking. Voice AI, CRM automation, and website chatbots for contractors.",
};

export default function Page() {
  return <ServiceAutomationV4 />;
}
