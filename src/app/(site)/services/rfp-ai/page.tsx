import type { Metadata } from "next";
import ServiceRfpAiV4 from "@/components/v4/ServiceRfpAiV4";

export const metadata: Metadata = {
  title: "Construction RFP AI — Catalyst Digital Solutions",
  description:
    "Stop hunting for bids. Filtered public bids in your inbox every morning — Construction RFP AI for contractors.",
};

export default function Page() {
  return <ServiceRfpAiV4 />;
}
