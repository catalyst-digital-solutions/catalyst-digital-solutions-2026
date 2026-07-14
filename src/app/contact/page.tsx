import type { Metadata } from "next";
import ContactContent from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact — Catalyst Digital Solutions",
  description:
    "Let's talk about your pipeline. Get a personalized audit of your digital presence within 1 business day. Call or text (661) 535-9927. Bakersfield, CA.",
};

export default function Page() {
  return <ContactContent />;
}
