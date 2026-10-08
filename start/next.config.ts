import type { NextConfig } from "next";
import path from "path";

// Vercel sets outputFileTracingRoot to the git repo root even when Root
// Directory is `start`. Keep turbopack.root on the same path so Next does not
// warn and then ignore the nested app root. start/postcss.config.mjs stops
// PostCSS from walking up to the main site's Tailwind config.
const repoRoot = path.resolve(__dirname, "..");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  outputFileTracingRoot: repoRoot,
  turbopack: {
    root: repoRoot,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        // Private onboarding: never cached, framed, or leaked via Referer.
        source: "/:client/onboarding/:path*",
        headers: [
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Cache-Control", value: "private, no-store" },
          { key: "Permissions-Policy", value: "microphone=(self), camera=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
