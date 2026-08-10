import type { Metadata } from "next";
import ServiceSeoV4 from "@/components/v4/ServiceSeoV4";

export const metadata: Metadata = {
  title: "SEO — Catalyst Digital Solutions",
  description:
    "Rank on Google. Get recommended by AI. Local, technical, programmatic SEO — and answer engines — for construction companies.",
};

export default function Page() {
  return <ServiceSeoV4 />;
}
