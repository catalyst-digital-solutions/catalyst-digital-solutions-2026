import type { Metadata } from "next";
import ServiceWebsitesV4 from "@/components/v4/ServiceWebsitesV4";

export const metadata: Metadata = {
  title: "Websites & Branding — Catalyst Digital Solutions",
  description:
    "Your website is your first impression. Custom Next.js sites, brand identity, and real proof — built for construction companies.",
};

export default function Page() {
  return <ServiceWebsitesV4 />;
}
