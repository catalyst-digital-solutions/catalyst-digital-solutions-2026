import type { Metadata } from "next";
import BrandStarterStart from "@/components/trades/BrandStarterStart";
import { getCheckoutPrefill } from "@/lib/stripe-checkout-prefill";

export const metadata: Metadata = {
  title: "You're in — let's build your brand",
  description: "Two quick things and we'll get started today.",
  robots: { index: false, follow: false },
  icons: {
    icon: [
      {
        url: "/assets/trades/j-shield-emblem_circle-favicon.png",
        type: "image/png",
        sizes: "64x64",
      },
    ],
  },
};

export default async function BrandStarterStartPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const prefill = await getCheckoutPrefill(session_id);
  return <BrandStarterStart prefill={prefill} />;
}
