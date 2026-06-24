# Blog content guide — Treasure Digital

Articles live as **MDX files** in `content/blog/{locale}/`. No CMS — edit in the repo, commit, deploy.

## Folder structure

```
content/blog/
├── bg/
│   └── my-article-slug.mdx
└── en/
    └── my-article-slug.mdx
```

- **Bulgarian (default):** `content/blog/bg/`
- **English:** `content/blog/en/`
- Use the **same slug** in both locales (Latin transliteration, e.g. `tekhnichesko-seo-navodnik-bulgaria-2026`).

## Frontmatter (required)

Every `.mdx` file must start with YAML frontmatter:

```yaml
---
title: "Article title — clear and keyword-aware"
slug: my-article-slug
locale: bg
category: "SEO"
excerpt: "One or two sentences for cards, RSS and meta description fallback."
seoTitle: "SEO title | Treasure Digital"
seoDescription: "155-character meta description for Google."
publishedAt: 2026-06-01T08:00:00.000Z
cover: /blog/covers/my-cover.webp
---
```

| Field | Notes |
|--------|--------|
| `title` | H1 on the page |
| `slug` | Must match filename without `.mdx` |
| `locale` | `bg` or `en` |
| `category` | Shown as pill (e.g. SEO, Уеб разработка) |
| `excerpt` | List cards + JSON-LD |
| `seoTitle` / `seoDescription` | Optional overrides for `<title>` and meta |
| `publishedAt` | ISO 8601 date |
| `cover` | Optional — path under `public/` (WebP/AVIF recommended) |

## Writing the body

Standard Markdown / MDX after the frontmatter:

```md
Opening paragraph — lead with the outcome for the reader.

## Section heading (H2)

Body copy. Left-aligned, outcome-first. No justified text.

### Subsection (H3)

> Pull quote or key takeaway.

[Internal link to a service](/uslugi/web-razrabotka)
```

### Rules (match site standards)

- **Both locales** — every BG article needs an EN counterpart (and vice versa if you add EN-first).
- **Euros only** — `от €X` (BG) / `from €X` (EN). Never leva.
- **No hardcoded UI copy** outside the MDX file — page chrome comes from `src/messages/`.
- **Images:** place in `public/blog/` and reference as `/blog/...`. Use descriptive alt text in Markdown: `![Alt text](/blog/example.webp)`.
- **Links:** prefer internal links to services, portfolio and other blog posts for SEO.

## After publishing

1. Run `npm run build` locally to verify.
2. Commit the new/changed `.mdx` file(s).
3. Push — Vercel rebuilds static pages automatically.
4. Optional: submit updated sitemap in Google Search Console.

**Rendering pipeline:** see [`docs/BLOG-RENDERING.md`](../docs/BLOG-RENDERING.md) for MDX plugins, components (`Callout`, `Figure`), TOC, and styling rules.

## RSS feeds

- Bulgarian: `https://treasure-digital.com/feed.xml`
- English: `https://treasure-digital.com/en/feed.xml`

## Migrating legacy JSON (optional)

The one-time converter `scripts/json-to-mdx.mjs` can regenerate MDX from a Portable Text JSON export if you have one. After migration, edit MDX files directly.
