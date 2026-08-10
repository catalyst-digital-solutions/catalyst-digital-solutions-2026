import type { Metadata } from "next";
import AboutV4 from "@/components/v4/AboutV4";

export const metadata: Metadata = {
  title: "About — Catalyst Digital Solutions",
  description:
    "A fair warning from founder Mario Garza. Why Catalyst exists, what makes us different, and who we build for. Construction-only growth partner in Bakersfield, CA.",
};

export default function Page() {
  return <AboutV4 />;
}
