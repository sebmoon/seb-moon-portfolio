/**
 * Core content types. The zod schema that validates MDX frontmatter at
 * build time lives in src/lib/content.ts and must stay in sync with these.
 */

/** Presentation tier — decides which template a project renders with. */
export type Tier = "flagship" | "project" | "gallery";

export const DISCIPLINES = [
  "Product Design",
  "Mechatronics & Robotics",
  "Manufacturing & Materials",
  "CAD & Visualisation",
] as const;

export type Discipline = (typeof DISCIPLINES)[number];

/**
 * Case-study sections, in handbook order. Sections are optional: a page
 * renders only the sections present in the MDX body (## headings).
 */
export const CASE_STUDY_SECTIONS = [
  "Overview",
  "Problem",
  "Objectives",
  "Research",
  "Ideation",
  "CAD",
  "Engineering Development",
  "Prototyping",
  "Testing",
  "Manufacture",
  "Final Outcome",
  "Reflection",
  "Downloads",
] as const;

export interface ProjectImage {
  /** Path under /public, e.g. /images/twist/hero.webp */
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  /** Display year (from Notion date; see docs/decisions on date cleanup). */
  year: number;
  tier: Tier;
  disciplines: Discipline[];
  roles: string[];
  /** One-paragraph summary shown on cards and as the case-study lede. */
  summary: string;
  hero?: ProjectImage;
  /** Sort weight within a tier (lower = earlier). */
  order?: number;
  /** Featured on the home page. Only flagships should set this. */
  featured?: boolean;
  /** Notion page id this file was synced from (traceability). */
  notionId?: string;
  draft?: boolean;
}

export interface Project extends ProjectFrontmatter {
  /** Raw MDX body (compiled per-page with next-mdx-remote). */
  body: string;
}
