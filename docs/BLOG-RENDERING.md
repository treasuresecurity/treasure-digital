# Blog rendering pipeline — Treasure Digital

How MDX blog posts are compiled, styled, and served. **Drop a `.mdx` file in `content/blog/{locale}/` — no per-post styling required.**

## Stack (Phase 0)

| Piece | Implementation |
| --- | --- |
| MDX compiler | `next-mdx-remote/rsc` (`compileMDX`) — build-time, RSC/SSG |
| Content | `content/blog/{bg,en}/*.mdx` + `gray-matter` frontmatter |
| Styling | Tailwind v4 + `@tailwindcss/typography` (`.prose-blog` wrapper) |
| Images | `next/image` via `<Figure>` and cover on post template |
| i18n | `next-intl` for page chrome; copy lives in MDX per locale |

No Contentlayer, Velite, or `@next/mdx` App Router integration — single pipeline in `src/lib/blog/posts.ts`.

## Remark plugins (Phase 1 — parsing)

Configured in `src/lib/blog/mdx-plugins.ts`:

- **remark-gfm** — tables, strikethrough, task lists, autolinks
- **remark-smartypants** — typographic quotes, dashes, ellipses

## Rehype plugins (Phase 2 — HTML, build-time)

- **rehype-slug** — `id` on every heading (used by the sidebar TOC)
- **rehype-pretty-code** + **Shiki** — syntax highlighting at build time (no client highlighter)
- **rehype-external-links** — `target="_blank"` + `rel="noopener noreferrer"` on external URLs

## Styling (Phase 3)

- Post body wrapped in **`.prose-blog`** — brand tokens (`--text`, `--primary`, `--accent`, etc.)
- **`<Callout>`** — direct-answer / AEO boxes (also styled blockquotes `>`)
- **Tables** — custom MDX `table` wrapper with horizontal scroll on mobile
- **Code** — Shiki output styled in `globals.css`; inline `` `code` `` uses surface background

## MDX components

Registered in `src/lib/blog/mdx-components.tsx`:

| Component | Usage |
| --- | --- |
| `<Callout>` | Opening direct-answer blocks |
| `<Figure src alt caption width height />` | Images with optional caption |
| `>` blockquote | Auto-styled like callouts |
| Markdown `img` | Maps to `<Figure>` |
| Internal `a` | `next-intl` `<Link>` |
| External `a` | Handled by rehype + fallback in component |

## Post template (Phase 5)

`src/app/[locale]/blog/[slug]/page.tsx`:

- Category pill, title, excerpt
- Published date, optional **updated** date, **reading time**
- Cover image (only if file exists under `public/`)
- **Table of contents** — sticky sidebar on desktop, collapsible `<details>` on mobile (≥3 H2/H3)
- Related service links via `BlogRelatedLinks`

## Frontmatter

See `content/CONTENT.md`. Required: `title`, `slug`, `locale`, `category`, `excerpt`, `publishedAt`. Optional: `seoTitle`, `seoDescription`, `cover`, `updatedAt`, `draft: true` (hidden from list/sitemap).

Cover paths are validated — missing files are ignored (no broken image blocks).

## Performance (Phase 6)

- All MDX/remark/rehype/Shiki runs at **build time** only
- Posts are **SSG** via `generateStaticParams`
- TOC uses native `<details>` on mobile — no client JS
- Added deps are server/build-only (~0 KB client JS for markdown pipeline)

## Test post (Phase 7)

`content/blog/bg/kitchen-sink.mdx` (`draft: true`) — includes every element. Remove when done reviewing.

To preview a draft locally, temporarily set `draft: false` or remove the field, rebuild, visit `/blog/kitchen-sink`.

## Authoring tips

1. Open with a **`<Callout>`** or `>` blockquote for the direct answer (AEO).
2. Use **question-style H2s** for snippets and TOC.
3. Use **Latin slugs** matching the filename.
4. Place images in `public/` and reference as `/path/to/image.webp`.
5. Both **BG + EN** files should exist for production posts (same slug).
