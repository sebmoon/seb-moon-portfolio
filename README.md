# seb-moon-portfolio

Engineering portfolio of Seb Moon — [www.sebmoon.dev](https://www.sebmoon.dev)

Built with Next.js 15 (App Router), TypeScript and Tailwind CSS. Fully
statically generated; content is synced from a Notion workspace (the source
of truth) into `content/projects/*.mdx` with locally optimised images.

## Development

```bash
npm install
npm run dev        # local dev server
npm run build      # production build (also validates all content)
npm run typecheck  # tsc --noEmit
```

## Content workflow

1. Edit or add project content in Notion (H2 headings matching the
   case-study sections: Overview, Problem, Objectives, Research, …).
2. `NOTION_TOKEN=... npm run sync` (or `npm run sync -- <slug>` for one
   project). Images are downloaded and optimised to WebP automatically.
3. Review the git diff, adjust curation fields (`tier`, `order`,
   `featured`, alt text) if needed, commit.

Frontmatter is validated with zod at build time — a malformed project fails
the build rather than shipping a broken page.

## Structure

See `docs/decisions/` for architecture decision records and
`docs/context/` for the Engineering Handbook that governs design, writing
style, accessibility and performance targets.
