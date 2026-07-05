import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // All content is local and statically generated. Notion images are
  // downloaded and optimised into /public/images by scripts/sync-notion.mts —
  // never hotlinked (see Engineering Handbook). The single remote pattern is
  // for YouTube thumbnails used by the click-to-play video facade.
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
  },
};

export default nextConfig;
