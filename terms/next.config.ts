import type { NextConfig } from "next";
import path from "path";

// Vercel sets outputFileTracingRoot to the git repo root even when Root
// Directory is `terms`. Keep turbopack.root on the same path so Next does not
// warn and then ignore the nested app root. terms/postcss.config.mjs stops
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
    ];
  },
};

export default nextConfig;
