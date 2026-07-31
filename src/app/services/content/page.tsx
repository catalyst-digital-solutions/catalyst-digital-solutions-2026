import type { Metadata } from "next";
import ServiceContentV4 from "@/components/v4/ServiceContentV4";

export const metadata: Metadata = {
  title: "Content Generation — Catalyst Digital Solutions",
  description:
    "A content factory that runs without you. Short-form video, clips, and blog — your name everywhere they look.",
};

export default function Page() {
  return <ServiceContentV4 />;
}
