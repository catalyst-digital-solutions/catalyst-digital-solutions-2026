import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/config/site";

/** Indexable marketing and legal pages. The Martin proposal is noindex and omitted. */
const PATHS = [
  "/",
  "/about",
  "/services",
  "/services/websites",
  "/services/seo",
  "/services/google-reviews",
  "/services/advertising",
  "/services/content",
  "/services/automation",
  "/services/rfp-ai",
  "/pricing",
  "/quick-wins",
  "/contact",
  "/privacy",
  "/terms",
  "/legal/service-agreement",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: path === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
