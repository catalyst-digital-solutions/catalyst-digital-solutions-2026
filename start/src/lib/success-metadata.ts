import type { Metadata } from "next";

const DEFAULT_TITLE = "Welcome to the team · Atara Mechanical × Catalyst Digital Solutions";
const OG_IMAGE = {
  url: "/atara/atara-og-image.jpg",
  width: 1200,
  height: 630,
};

const ROBOTS: Metadata["robots"] = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
  },
};

type PrivatePageMeta = {
  path: string;
  description: string;
  title?: string;
  imageAlt?: string;
};

export function ataraPrivatePageMetadata({
  path,
  description,
  title = DEFAULT_TITLE,
  imageAlt = "Atara Mechanical — Welcome to the team. Payment confirmed.",
}: PrivatePageMeta): Metadata {
  const canonical = `https://start.catalyst-digital-solutions.com${path}`;
  const image = { ...OG_IMAGE, alt: imageAlt };

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical,
    },
    robots: ROBOTS,
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
