import type { NextConfig } from "next";
import path from "path";

const familyLawZoneOrigin = (
  process.env.FAMILY_LAW_ZONE_ORIGIN
  ?? "https://ai-answer-optimization-campaign-bas.vercel.app"
).replace(/\/$/, "");

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Keep campaign and policy aliases on their canonical destinations.
  async redirects() {
    return [
      {
        source: "/family-law",
        destination: "https://familylaw.catalyst-digital-solutions.com",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
    ];
  },
  // Preserve child-zone analytics and legacy deep links served through the parent domain.
  async rewrites() {
    return [
      // Vercel Analytics assigns the child project a stable observability base path.
      {
        source: "/cd4ba7a87a57f6ab/:path+",
        destination: `${familyLawZoneOrigin}/cd4ba7a87a57f6ab/:path+`,
      },
      {
        source: "/family-law/:path+",
        destination: `${familyLawZoneOrigin}/family-law/:path+`,
      },
    ];
  },
};

export default nextConfig;
