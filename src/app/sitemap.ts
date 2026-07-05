import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/content";
import { SITE } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/projects", "/about", "/contact"].map((p) => ({
    url: `${SITE.url}${p}`,
    changeFrequency: "monthly" as const,
  }));

  const projects = getAllProjects().map((p) => ({
    url: `${SITE.url}/projects/${p.slug}`,
    changeFrequency: "yearly" as const,
  }));

  return [...staticPages, ...projects];
}
