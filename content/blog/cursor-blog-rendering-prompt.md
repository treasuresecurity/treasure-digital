# MASTER PROMPT — BEAUTIFUL, FAST MDX BLOG RENDERING (paste into Cursor)

> Paste this into Cursor (Agent mode, full project open).
> Goal: every blog post — current and future — renders beautifully and consistently,
> with zero manual styling per post, and WITHOUT making the site heavy.

---

## YOUR ROLE & PRINCIPLES

You are a senior Next.js engineer setting up a best-in-class MDX blog rendering pipeline.

**Non-negotiable principles:**
1. **Do not change the site's existing design language, colors, or fonts** — match them. The blog should feel native to the site.
2. **Performance first.** All markdown/syntax processing happens at **build time**, not in the browser. Ship as little client-side JavaScript as possible. No heavy runtime libraries. Posts must stay statically generated (SSG/RSC).
3. **Write once, style everywhere.** I should be able to drop a `.mdx` file into the content folder and it renders perfectly — tables, callouts, code, images, lists — with no per-post styling.
4. Detect what already exists before adding anything. Work with the current setup, don't duplicate it.
5. After finishing, show me every file you changed and run the test post (Phase 5).

---

## PHASE 0 — DETECT THE SETUP

Tell me: how MDX is currently wired (`@next/mdx`, `next-mdx-remote`, Contentlayer, Velite, or other), the content folder location, whether Tailwind is used, and what (if any) remark/rehype plugins are already configured. Then proceed.

## PHASE 1 — FIX PARSING (this is why tables show as raw `| --- |`)

Standard MDX does NOT support tables by default. Add the **remark** plugins so GitHub-Flavored Markdown works:

- `remark-gfm` → tables, strikethrough, task lists, auto-links (THE core fix)
- `remark-smartypants` → proper typographic quotes, dashes, ellipses (optional but makes text look professional)

Wire these into the `remarkPlugins` array of the existing MDX config — do not create a second pipeline.

## PHASE 2 — RICH, ACCESSIBLE HTML (rehype plugins, all build-time)

Add these **rehype** plugins (they run at build, add ~0 client JS):

- `rehype-slug` → gives every heading an `id` (needed for anchor links + table of contents)
- `rehype-autolink-headings` → headings become clickable anchors (set `behavior: 'wrap'`, accessible label)
- `rehype-pretty-code` (powered by **Shiki**) → gorgeous syntax-highlighted code blocks, highlighted **at build time** so NO highlighter JS is shipped to the browser. Pick a theme that matches the site (e.g. one light + one dark if the site has dark mode).
- `rehype-external-links` → external links open in a new tab with `rel="noopener noreferrer"`, internal links stay normal.

Keep the plugin list lean — only these. Don't add anything unused.

## PHASE 3 — STYLING (clean tables, callouts, typography)

1. **Typography base:** use **`@tailwindcss/typography`** and wrap the rendered post body in a `prose` container, tuned to the site's brand (`prose-headings`, link color, max-width ~70ch for readability, responsive `prose-lg` on desktop). This single step makes tables, blockquotes, lists, and headings look great automatically. If Tailwind isn't used, add equivalent scoped CSS for the `.post-content` wrapper instead.

2. **Tables — make them beautiful AND responsive:** clean header row (subtle background), row separators, comfortable padding, and **horizontal scroll on mobile** so wide tables never break the layout (wrap tables in an overflow-x container via a custom MDX component).

3. **Callout / answer box:** create a reusable `<Callout>` component (and style blockquotes `>` to match) for the "direct answer" boxes at the top of posts — subtle background, left accent border, rounded corners. This is what makes the intro answer pop for readers and AI.

4. Style links, inline `code`, code blocks, images, and horizontal rules to match the brand. Ensure strong color contrast (accessibility).

## PHASE 4 — IMAGES & MEDIA (beautiful but lightweight)

- Map the MDX `img` to **`next/image`**: automatic AVIF/WebP, responsive `srcset`, lazy loading below the fold, blur-up placeholder, explicit dimensions to prevent layout shift.
- Support optional **captions** (e.g. via a custom `<Figure>` component).
- Optimize the cover image per post the same way.
- Result: rich visuals, minimal weight.

## PHASE 5 — READING EXPERIENCE (the polish)

- **Auto Table of Contents** generated from the post's headings (built from the slugs in Phase 2), sticky on desktop, collapsible on mobile — only render it for longer posts.
- **Reading time** + published/updated date in the post header.
- Consistent, shared **post layout/template** so every post automatically looks identical in structure — I never style a post by hand.
- Smooth, brand-matching styles for blockquotes, lists, and emphasis.
- Respect dark mode if the site has it.

## PHASE 6 — PERFORMANCE GUARDRAILS (keep it light)

Confirm and enforce:
- Posts are **statically generated** (no client-side markdown parsing, no runtime fetching of content).
- Syntax highlighting is **build-time only** (Shiki via rehype-pretty-code) — no Prism/highlight.js shipped to the client.
- Fonts via `next/font` (no render-blocking, no layout shift).
- Interactive components (TOC, etc.) are lightweight and lazy where possible; everything else is server-rendered.
- No large dependencies added. Report the approximate JS bundle impact of anything you add.

## PHASE 7 — TEST POST (prove it works)

Create a temporary `kitchen-sink.mdx` post that includes: an H2/H3 hierarchy, a **table**, a **callout/blockquote**, a **code block**, an ordered + unordered list, **bold/italic**, an image, and an external + internal link. Build/run it and confirm every element renders beautifully and responsively. Show me a screenshot or the rendered output, then I'll tell you to delete it.

---

## OUTPUT I WANT

1. Phase 0 detection summary, then implement phases in order.
2. The exact list of files changed and packages added (with bundle-size note).
3. The working `kitchen-sink.mdx` rendered, so I can see tables/callouts/code all look perfect.
4. A short `BLOG-RENDERING.md` documenting what's set up, so future me understands the pipeline.

Begin with Phase 0.
