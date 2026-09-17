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
  // Twilio/TCR often expect /privacy-policy; canonical page is /privacy.
  async redirects() {
    return [
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
    ];
  },
  // Keep the campaign independently deployable while serving it from the CDS domain.
  async rewrites() {
    return [
      // Vercel Analytics assigns the child project a stable observability base path.
      {
        source: "/cd4ba7a87a57f6ab/:path+",
        destination: `${familyLawZoneOrigin}/cd4ba7a87a57f6ab/:path+`,
      },
      {
        source: "/family-law",
        destination: `${familyLawZoneOrigin}/family-law`,
      },
      {
        source: "/family-law/:path+",
        destination: `${familyLawZoneOrigin}/family-law/:path+`,
      },
    ];
  },
};

export default nextConfig;
