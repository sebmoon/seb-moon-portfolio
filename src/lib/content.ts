import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import {
  DISCIPLINES,
  type Project,
  type ProjectFrontmatter,
} from "@/types/project";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

const imageSchema = z.object({
  src: z.string().startsWith("/images/"),
  alt: z.string().min(1, "Images must have alt text (handbook: accessibility)"),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  caption: z.string().optional(),
});

const frontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "kebab-case slugs only"),
  year: z.number().int().gte(2015).lte(2100),
  tier: z.enum(["flagship", "project", "gallery"]),
  disciplines: z.array(z.enum(DISCIPLINES)).min(1),
  roles: z.array(z.string()).min(1),
  summary: z.string().min(1),
  hero: imageSchema.optional(),
  order: z.number().int().optional(),
  featured: z.boolean().optional(),
  notionId: z.string().optional(),
  draft: z.boolean().optional(),
});

/**
 * Reads, validates and caches all projects. A malformed frontmatter fails
 * the production build — content errors surface at build time, not runtime.
 */
let cache: Project[] | null = null;

export function getAllProjects(): Project[] {
  if (cache) return cache;

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .sort();

  const projects = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const parsed = frontmatterSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(
        `Invalid frontmatter in content/projects/${file}:\n${parsed.error.message}`,
      );
    }
    const fm: ProjectFrontmatter = parsed.data;
    if (`${fm.slug}.mdx` !== file) {
      throw new Error(
        `Slug/filename mismatch: content/projects/${file} declares slug "${fm.slug}"`,
      );
    }
    return { ...fm, body: content.trim() };
  });

  const published = projects.filter((p) => !p.draft);

  const tierRank = { flagship: 0, project: 1, gallery: 2 } as const;
  published.sort(
    (a, b) =>
      tierRank[a.tier] - tierRank[b.tier] ||
      (a.order ?? 99) - (b.order ?? 99) ||
      b.year - a.year,
  );

  cache = published;
  return published;
}

export function getProject(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}
