import type { Metadata } from "next";
import ServiceAdvertisingV4 from "@/components/v4/ServiceAdvertisingV4";

export const metadata: Metadata = {
  title: "Advertising — Catalyst Digital Solutions",
  description:
    "Paid traffic that turns into bids — leads this week while the long game builds. Construction-focused Meta and Google ads.",
};

export default function Page() {
  return <ServiceAdvertisingV4 />;
}
