import type { Metadata } from "next";
import { redirect } from "next/navigation";
import BrandStarterStart from "@/components/trades/BrandStarterStart";

export const metadata: Metadata = {
  title: "See five brand directions — Catalyst Digital Solutions",
  description: "Tell us about your company. See five brand directions before you pay.",
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
  if (session_id) {
    redirect(`/trades/thank-you?session_id=${encodeURIComponent(session_id)}`);
  }
  return <BrandStarterStart />;
}
