# SEO README — Treasure Digital

Technical SEO foundation for [treasure-digital.com](https://treasure-digital.com).  
Implemented in Phases 1–9 (2026). Stack: Next.js 16 App Router, SSG, next-intl (BG `/`, EN `/en/`).

---

## What is set up

| Area | Status | Location |
|------|--------|----------|
| Unique title + meta + canonical per page | ✅ | `src/lib/metadata.ts`, per-page `generateMetadata` |
| hreflang (BG + EN + x-default) | ✅ | `buildAlternates()` |
| Preview deployments noindex | ✅ | `previewRobots()` when `VERCEL_ENV=preview` |
| `robots.txt` | ✅ | `src/app/robots.ts` — allows all, blocks `/api/` |
| `sitemap.xml` | ✅ | `src/app/sitemap.ts` — static pages + blog posts, both locales |
| JSON-LD (Organization, LocalBusiness, WebSite, Person) | ✅ | `src/components/seo/organization-json-ld.tsx` |
| Service + FAQPage schema | ✅ | `src/components/seo/service-json-ld.tsx` |
| Portfolio CreativeWork + ImageObject | ✅ | `src/components/seo/portfolio-json-ld.tsx` |
| BlogPosting schema | ✅ | `src/components/seo/blog-posting-json-ld.tsx` |
| BreadcrumbList | ✅ | Inner pages via `breadcrumb-json-ld.tsx` |
| Core Web Vitals optimisations | ✅ | Fonts, lazy images, code-split, cache headers (Phase 3) |
| Image alts + next/image | ✅ | Portfolio, blog, OG images |
| Internal linking (services ↔ portfolio ↔ blog) | ✅ | `src/lib/internal-links.ts`, `internal-links.tsx` |
| NAP consistency | ✅ | Footer, contact, about, schema |
| MDX blog + RSS | ✅ | `content/blog/`, `/feed.xml`, `/en/feed.xml` |
| llms.txt + llms-full.txt | ✅ | AI crawler summaries |
| AEO summary blocks | ✅ | Homepage, services, about |
| GA4 (consent-gated) | ✅ | `G-LDRCFVTNZ5` — `src/lib/site-verification.ts` |
| GSC verification meta | ✅ | Token in layout metadata |
| Bing verification scaffold | ✅ | `NEXT_PUBLIC_BING_VERIFICATION` env |
| Vercel Analytics + Speed Insights | ✅ | Root layout |
| Web manifest + favicons | ✅ | `manifest.ts`, `icon.tsx`, `apple-icon.tsx` |

---

## Phase 9 QA checklist

| Check | Result | Notes |
|-------|--------|-------|
| Unique title + meta + canonical on indexable pages | **PASS** | All marketing routes use `buildPageMetadata` |
| 404 has title + noindex | **PASS** | `[locale]/not-found.tsx` |
| sitemap includes all pages + blog posts | **PASS** | ~60 SSG routes; blog slugs from MDX |
| No draft/noindex URLs in sitemap | **PASS** | No draft flag yet; all published MDX included |
| robots.txt valid + sitemap link | **PASS** | |
| JSON-LD on key templates | **PASS** | Validate at [Google Rich Results Test](https://search.google.com/test/rich-results) after deploy |
| No client-only indexable pages | **PASS** | All `page.tsx` routes are Server Components (SSG) |
| Meaningful image alts | **PASS** | Portfolio `coverAlt`, blog cover alts, gallery alts |
| One H1 per page | **PASS** | Service/portfolio/blog/home templates |
| Internal links services ↔ portfolio ↔ blog | **PASS** | Phase 5 |
| hreflang BG + EN | **PASS** | Canonical + alternates on all indexable pages |
| llms.txt present | **PASS** | `/llms.txt`, `/llms-full.txt` |
| FAQ schema on service pages | **PASS** | FAQPage JSON-LD where FAQ exists |
| Production not noindexed | **PASS** | noindex only on preview + 404 |
| Blog MDX + RSS + CONTENT.md | **PASS** | See `content/CONTENT.md` |
| GSC + GA4 + Bing scaffold | **PASS** | Manual verification steps below |
| Lighthouse (local prod, Jun 2026) | **PARTIAL** | SEO 92 · A11y 89 · Best practices 96 · Performance 37* |

\*Local `npm start` Lighthouse run showed inflated LCP (~18s) — typical for cold local Node server. **Re-run on production URL** after Vercel deploy for accurate Core Web Vitals:  
`npx lighthouse https://treasure-digital.com --view`

Target on production: LCP < 2.5s, CLS < 0.1, INP < 200ms.

---

## Environment variables (Vercel)

Set in **Project → Settings → Environment Variables**:

```env
NEXT_PUBLIC_SITE_URL=https://treasure-digital.com
NEXT_PUBLIC_GA4_ID=G-LDRCFVTNZ5
NEXT_PUBLIC_GSC_VERIFICATION=8plwFDCESSqMdc96xDP2SS0hkvCl8RSzrRhG1vs7MH8
NEXT_PUBLIC_BING_VERIFICATION=          # when Bing provides token
NEXT_PUBLIC_GTM_ID=                       # optional, in addition to GA4
CONTACT_TO_EMAIL=office@treasure-sec.com
AUDIT_TO_EMAIL=office@treasure-sec.com
RESEND_API_KEY=                           # for contact/audit forms
```

Copy from `.env.example`. Redeploy after changes.

---

## Manual tasks (you still need to do)

### Google Search Console
1. Open [Google Search Console](https://search.google.com/search-console)
2. Add property `https://treasure-digital.com`
3. Verify via HTML tag (should auto-detect after deploy)
4. Submit sitemap: `https://treasure-digital.com/sitemap.xml`
5. Monitor Coverage + Core Web Vitals reports

### Google Analytics 4
1. Confirm data in [GA4](https://analytics.google.com) Realtime after accepting cookies on site
2. Mark **conversions**: `generate_lead`, optionally `cta_click`, `phone_click`, `email_click`
3. Link GA4 to Google Ads if running campaigns

### Bing Webmaster Tools
1. Add site at [Bing Webmaster](https://www.bing.com/webmasters)
2. Copy meta verification content → `NEXT_PUBLIC_BING_VERIFICATION` in Vercel
3. Submit sitemap

### Google Business Profile
1. Create/claim GBP for **Treasure Digital**, Plovdiv
2. NAP must match site exactly:
   - **Name:** Treasure Digital
   - **Address:** Plovdiv, Bulgaria
   - **Phone:** +359 88 546 2525
   - **Website:** https://treasure-digital.com

### Post-deploy smoke test
- [ ] `/` and `/en/` load (dark + light)
- [ ] `/sitemap.xml` shows `treasure-digital.com` URLs
- [ ] `/robots.txt` references sitemap
- [ ] `/llms.txt` returns company summary
- [ ] `/feed.xml` valid RSS
- [ ] Contact form sends (needs `RESEND_API_KEY`)
- [ ] Cookie banner → accept → GA4 Realtime shows visit

---

## How to add a new service page

Services are data-driven — no new route file needed.

1. **Add service key** in `src/lib/services.ts`:
   - `key`, `slug` (Latin), `href`, `icon`, optional `priority`

2. **Add copy** in `src/messages/bg.json` and `src/messages/en.json` under `servicePages.items.{key}`:
   - `metaTitle`, `metaDescription`, `title`, `subtitle`, `directAnswer`, `outcome`, `includes`, `faq`, `ctaTitle`
   - Optional: `caseStudy`

3. **Add hub card copy** under `services.items.{key}` (title, description, features)

4. **Internal links** (optional): update `src/lib/internal-links.ts` if linking to portfolio/blog

5. **Build & deploy:**
   ```bash
   npm run build
   git add . && git commit -m "Add service: …" && git push
   ```

URL will be `/uslugi/{slug}` (BG) and `/en/uslugi/{slug}` (EN). Sitemap updates automatically.

---

## How to publish a blog article

See **`content/CONTENT.md`** for full authoring guide.

Quick steps:

1. Create **two** MDX files (same slug):
   - `content/blog/bg/your-slug.mdx`
   - `content/blog/en/your-slug.mdx`

2. Fill YAML frontmatter: `title`, `slug`, `locale`, `category`, `excerpt`, `seoTitle`, `seoDescription`, `publishedAt`

3. Write Markdown body below frontmatter

4. Preview: `npm run dev` → `/blog/your-slug`

5. Push to GitHub → Vercel rebuilds → live in sitemap + RSS

---

## Analytics events (after cookie consent)

| Event | Trigger |
|-------|---------|
| `generate_lead` | Contact form or audit form submit |
| `cta_click` | Header / CTA band / service CTAs → `/kontakti` |
| `phone_click` | Phone, Viber, WhatsApp links |
| `email_click` | Email links in NAP block |

---

## Key file reference

```
src/lib/metadata.ts          — canonical, hreflang, preview noindex
src/lib/site.ts              — site URL, sitemap paths
src/lib/business.ts          — NAP + schema business facts
src/lib/internal-links.ts    — SEO cross-link map
src/lib/llms-content.ts      — llms.txt generator
src/lib/site-verification.ts — GA4, GSC, GTM IDs
src/lib/blog/posts.ts        — MDX blog loader
src/app/sitemap.ts           — dynamic sitemap
src/app/robots.ts            — robots rules
content/CONTENT.md           — blog authoring guide
```

---

## Legal / cookies note

Cookie and privacy policy copy has been updated to reflect the MDX file-based blog (no external CMS).

---

*Last updated: Phase 9 completion — Treasure Digital SEO implementation.*
