import type { Metadata } from "next";
import PricingV4 from "@/components/v4/PricingV4";

export const metadata: Metadata = {
  title: "Pricing — Catalyst Digital Solutions",
  description:
    "Construction growth programs starting at $1,497/mo. No long contracts. Clear scope — websites, SEO, ads, content, automation, and more.",
};

export default function Page() {
  return <PricingV4 />;
}
