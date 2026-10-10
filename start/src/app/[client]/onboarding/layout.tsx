import type { Metadata, Viewport } from "next";
import "@/components/onboarding/onboarding.css";

export const metadata: Metadata = {
  referrer: "no-referrer",
};

export const viewport: Viewport = {
  themeColor: "#0B1B2E",
};

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return <div className="cds-onboarding">{children}</div>;
}
