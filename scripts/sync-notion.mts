/**
 * Notion → repo content sync.
 *
 * Pulls every project from the "Featured Work" database in Seb's Notion
 * workspace and writes:
 *   - content/projects/<slug>.mdx   (frontmatter + sectioned body)
 *   - public/images/<slug>/…        (originals → optimised WebP via sharp)
 *
 * Usage:
 *   NOTION_TOKEN=secret_xxx npm run sync            # sync everything
 *   NOTION_TOKEN=secret_xxx npm run sync -- twist   # sync one slug
 *
 * Design rules (Engineering Handbook):
 *   - Notion is the source of truth; this script never edits Notion.
 *   - Images are downloaded and stored locally — never hotlinked.
 *   - The sync output is an ordinary git diff: review it, then commit.
 *   - Existing frontmatter fields `tier`, `order`, `featured`, `hero.alt`
 *     and image alt text edited by hand are PRESERVED on re-sync (curation
 *     lives in the repo; facts live in Notion).
 */

import fs from "node:fs/promises";
import path from "node:path";
import { Client } from "@notionhq/client";
import sharp from "sharp";
import matter from "gray-matter";

const DATABASE_ID = "025e9d5b-da17-4508-9f6a-d08185f95091"; // Featured Work
const CONTENT_DIR = path.join(process.cwd(), "content", "projects");
const IMAGES_DIR = path.join(process.cwd(), "public", "images");

/** Case-study headings recognised in Notion pages (H2), handbook order. */
const SECTION_HEADINGS = [
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
];

const notion = new Client({ auth: requireEnv("NOTION_TOKEN") });

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing ${name}. Run: NOTION_TOKEN=... npm run sync`);
    process.exit(1);
  }
  return v;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function readExistingFrontmatter(slug: string) {
  try {
    const raw = await fs.readFile(
      path.join(CONTENT_DIR, `${slug}.mdx`),
      "utf8",
    );
    return matter(raw).data as Record<string, unknown>;
  } catch {
    return {};
  }
}

async function optimiseImage(
  buffer: Buffer,
  slug: string,
  baseName: string,
): Promise<{ src: string; width: number; height: number }> {
  const dir = path.join(IMAGES_DIR, slug);
  await fs.mkdir(dir, { recursive: true });
  const out = path.join(dir, `${baseName}.webp`);
  const pipeline = sharp(buffer).rotate().resize({
    width: 1920,
    withoutEnlargement: true,
  });
  const info = await pipeline.webp({ quality: 82 }).toFile(out);
  return {
    src: `/images/${slug}/${baseName}.webp`,
    width: info.width,
    height: info.height,
  };
}

async function download(url: string): Promise<Buffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed (${res.status}): ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

type NotionBlock = {
  id: string;
  type: string;
  [key: string]: unknown;
};

async function listAllBlocks(blockId: string): Promise<NotionBlock[]> {
  const blocks: NotionBlock[] = [];
  let cursor: string | undefined;
  do {
    const res = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    });
    blocks.push(...(res.results as NotionBlock[]));
    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
  } while (cursor);
  return blocks;
}

function richTextToMd(rich: Array<Record<string, any>> = []): string {
  return rich
    .map((t) => {
      let s: string = t.plain_text ?? "";
      if (t.annotations?.code) s = `\`${s}\``;
      if (t.annotations?.bold) s = `**${s}**`;
      if (t.annotations?.italic) s = `*${s}*`;
      if (t.href) s = `[${s}](${t.href})`;
      return s;
    })
    .join("");
}

async function syncPage(page: Record<string, any>, only?: string) {
  const props = page.properties;
  const title: string = richTextToMd(props.Name?.title) || "Untitled";
  const slug = slugify(title.split("—")[0].split("-")[0].trim()) || page.id;

  if (only && slug !== only) return;

  const existing = await readExistingFrontmatter(slug);

  console.log(`→ ${slug}`);

  // --- body + images ---
  const blocks = await listAllBlocks(page.id);
  const lines: string[] = [];
  let imgIndex = 0;
  let hero = (existing.hero as Record<string, unknown>) ?? null;

  for (const block of blocks) {
    const b = block as Record<string, any>;
    switch (block.type) {
      case "heading_1":
      case "heading_2": {
        const text = richTextToMd(b[block.type]?.rich_text);
        // Normalise known section headings to H2
        const canonical = SECTION_HEADINGS.find(
          (h) => h.toLowerCase() === text.trim().toLowerCase(),
        );
        lines.push(`\n## ${canonical ?? text}\n`);
        break;
      }
      case "heading_3":
        lines.push(`\n### ${richTextToMd(b.heading_3?.rich_text)}\n`);
        break;
      case "paragraph": {
        const text = richTextToMd(b.paragraph?.rich_text);
        if (text.trim()) lines.push(`${text}\n`);
        break;
      }
      case "bulleted_list_item":
        lines.push(`- ${richTextToMd(b.bulleted_list_item?.rich_text)}`);
        break;
      case "numbered_list_item":
        lines.push(`1. ${richTextToMd(b.numbered_list_item?.rich_text)}`);
        break;
      case "image": {
        const src: string =
          b.image?.type === "external" ? b.image.external.url : b.image?.file?.url;
        if (!src) break;
        imgIndex += 1;
        const caption = richTextToMd(b.image?.caption) || "";
        const baseName = caption
          ? slugify(caption).slice(0, 60)
          : `${slug}-${String(imgIndex).padStart(2, "0")}`;
        try {
          const buf = await download(src);
          const img = await optimiseImage(buf, slug, baseName);
          const alt = caption || `${title} — image ${imgIndex}`;
          if (!hero) {
            hero = { ...img, alt, ...(caption ? { caption } : {}) };
          } else {
            lines.push(`\n![${alt}](${img.src})\n`);
          }
        } catch (e) {
          console.warn(`  ! image skipped: ${(e as Error).message}`);
        }
        break;
      }
      case "video":
        console.warn(
          `  ! video block found — export the original and add it manually (Notion video URLs expire)`,
        );
        break;
      default:
        break;
    }
  }

  // --- frontmatter (preserve curated fields) ---
  const overview: string =
    richTextToMd(props["Project Overview"]?.rich_text) || "";
  const roles: string[] =
    props["My Role"]?.multi_select?.map((r: { name: string }) => r.name) ?? [];
  const dateStart: string | undefined = props.Date?.date?.start;

  const fm: Record<string, unknown> = {
    title: (existing.title as string) ?? title,
    slug,
    year:
      (existing.year as number) ??
      (dateStart ? Number(dateStart.slice(0, 4)) : new Date().getFullYear()),
    tier: existing.tier ?? "project",
    disciplines: existing.disciplines ?? ["Product Design"],
    roles: roles.length ? roles : ((existing.roles as string[]) ?? ["Engineer"]),
    summary: overview || ((existing.summary as string) ?? ""),
    ...(hero ? { hero } : {}),
    ...(existing.order !== undefined ? { order: existing.order } : {}),
    ...(existing.featured !== undefined ? { featured: existing.featured } : {}),
    notionId: page.id,
  };

  const body = lines.join("\n").trim() || `## Overview\n\n${overview}`;
  const out = matter.stringify(`\n${body}\n`, fm);
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.writeFile(path.join(CONTENT_DIR, `${slug}.mdx`), out, "utf8");
}

async function main() {
  const only = process.argv[2];
  const pages: Record<string, any>[] = [];
  let cursor: string | undefined;
  do {
    const res: Record<string, any> = await notion.databases.query({
      database_id: DATABASE_ID,
      start_cursor: cursor,
      page_size: 100,
    });
    pages.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);

  console.log(`${pages.length} projects in Notion`);
  for (const page of pages) {
    await syncPage(page, only);
  }
  console.log("Done. Review the git diff, then commit.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
