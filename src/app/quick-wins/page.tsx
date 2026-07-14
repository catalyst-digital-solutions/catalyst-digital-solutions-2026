import type { Metadata } from "next";
import QuickWinsContent from "@/components/quick-wins/QuickWinsContent";

export const metadata: Metadata = {
  title: "Quick Wins — Catalyst Digital Solutions",
  description:
    "Not ready for a full monthly plan? Start small. Leak Finder, Bid Finder AI, Speed-to-Lead, Lead Reactivation, and 5-Star Autopilot — each solves one problem fast, with every dollar crediting toward the real thing.",
};

export default function Page() {
  return <QuickWinsContent />;
}
