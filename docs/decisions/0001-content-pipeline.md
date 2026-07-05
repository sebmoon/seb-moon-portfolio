# ADR 0001 — Content pipeline: hybrid Notion sync

**Status:** Accepted (Seb, 2026-07-04)

## Context

The Engineering Handbook names the Notion workspace as the single source of
truth, forbids hotlinking Notion images, and targets Lighthouse ≥ 95. Notion
image URLs are signed and expire within minutes, so runtime rendering from
Notion would violate the image rule outright.

## Decision

A sync script (`scripts/sync-notion.mts`) pulls Notion content into
`content/projects/*.mdx` and downloads/optimises images into
`public/images/<slug>/` as WebP. The Next.js app reads only local content
and is fully statically generated; it never contacts Notion at runtime.

Curation fields (`tier`, `order`, `featured`, hand-written alt text) live in
the repo and are preserved on re-sync; facts live in Notion. New deep
case-study content is authored in Notion under the handbook's standard H2
headings and re-synced — or directly in MDX where that is easier.

## Alternatives considered

- **Live Notion API (SSR/ISR):** rejected — runtime dependency, rate limits,
  expiring image URLs, Lighthouse risk.
- **Manual MDX only:** rejected as default — silently breaks source-of-truth;
  allowed per-project where pragmatic.
- **Headless CMS:** rejected — second content system, more moving parts.

## Consequences

- Publishing requires running the sync and committing (deliberate step,
  reviewable diff).
- `NOTION_TOKEN` is needed locally or in CI; never committed.
- Videos cannot be synced automatically (expiring URLs) — originals are
  exported manually into `public/`.
