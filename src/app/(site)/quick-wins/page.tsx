import type { Metadata } from "next";
import QuickWinsV4 from "@/components/v4/QuickWinsV4";

export const metadata: Metadata = {
  title: "Quick Wins — Catalyst Digital Solutions",
  description:
    "Fast, high-leverage improvements for construction companies — including Bid Finder AI and other systems you can put to work quickly.",
};

export default function Page() {
  return <QuickWinsV4 />;
}
