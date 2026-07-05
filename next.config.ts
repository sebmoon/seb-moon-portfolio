import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // All content is local and statically generated; no remote image hosts.
  // Notion images are downloaded and optimised into /public/images by
  // scripts/sync-notion.mts — never hotlinked (see Engineering Handbook).
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
