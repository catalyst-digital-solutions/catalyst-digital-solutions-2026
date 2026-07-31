import type { Metadata } from "next";
import ServiceGoogleReviewsV4 from "@/components/v4/ServiceGoogleReviewsV4";

export const metadata: Metadata = {
  title: "Google Optimization & Reviews — Catalyst Digital Solutions",
  description:
    "Own the map pack and the reviews that decide who gets the call. Google Business Profile optimization for construction.",
};

export default function Page() {
  return <ServiceGoogleReviewsV4 />;
}
