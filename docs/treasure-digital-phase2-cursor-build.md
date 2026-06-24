# TREASURE DIGITAL — Phase 2: The Cursor Build Plan
### Execute top to bottom. Each step has the command(s) and/or the exact prompt to paste into Cursor.

> Defaults locked: **Sanity** (blog) · **Bulgarian first, English wired in from day one** · **pricing ranges shown**.
> Keep `treasure-digital-master-plan.md` open in the project — Cursor reads it for design tokens.

---

## STEP 0 — Prerequisites & accounts (do once)
- **Node 20 LTS or newer** (`node -v` to check) + **Git**.
- Free accounts: **GitHub** (repo), **Vercel** (hosting), **Sanity** (blog CMS), **Resend** (form emails), **Google** (GA4 + Search Console + Tag Manager).
- Have your **domain** ready (point DNS to Vercel later).

---

## STEP 1 — Scaffold the project
Run in your projects folder:
```bash
npx create-next-app@latest treasure-digital
```
Choose: **TypeScript → Yes**, **ESLint → Yes**, **Tailwind CSS → Yes**, **`src/` dir → Yes**, **App Router → Yes**, **Turbopack → Yes**, **import alias `@/*` → Yes**.
```bash
cd treasure-digital
git init && git add -A && git commit -m "scaffold"
```

---

## STEP 2 — Install dependencies
```bash
npm i next-intl next-themes motion react-hook-form zod @hookform/resolvers resend lucide-react clsx tailwind-merge
npm i next-sanity @sanity/image-url @portabletext/react
```
- `next-intl` → BG/EN · `next-themes` → dark/light toggle · `motion` → animation (import from `motion/react`) · `react-hook-form` + `zod` → forms · `resend` → email · `lucide-react` → icons · `next-sanity` → blog.

---

## STEP 3 — Drop in the design tokens
Open Cursor chat and paste:

> **PROMPT 3:** "Open `treasure-digital-master-plan.md`. Take the CSS variables from section 2.2 and put them in `src/app/globals.css` (`:root` for light, `.dark` for dark). Add the Tailwind config extension from 2.2 into `tailwind.config.ts`. Set up the type scale from section 2.4 as CSS custom properties and Tailwind `fontSize` tokens. Add the spacing/radius/motion tokens from 2.5. Don't build any components yet — just the token foundation. Make body text left-aligned, never justified, max line length ~70ch."

---

## STEP 4 — Create the `.cursorrules` file (keeps every generation on-brand)
Create `.cursorrules` in the project root with this content:
```
You are building "Treasure Digital", a premium bilingual (BG default, EN) digital agency site.
Stack: Next.js App Router + TypeScript + Tailwind + next-intl + next-themes + motion + Sanity.

DESIGN SYSTEM (source of truth: treasure-digital-master-plan.md):
- Colors via CSS vars only: bg, surface, surface-2, text, text-muted, border, primary, accent. Never hardcode hex.
- Brand: blue #0061FE, amber #E8A50B, night #000817. Signature gradient blue→amber for accents/glow only.
- Dark mode is the PRIMARY/default experience; ship a light/dark toggle.
- Type-first design. Oversized confident headlines. Body left-aligned, ~70ch, never justified.
- Fonts MUST support Cyrillic (verify). Display + body only, max two families.
- Generous whitespace. Bento-grid layouts for services/portfolio. Cards = surface + border + rounded-2xl + hover lift.
- Motion: subtle, 150–400ms, ease cubic-bezier(.22,1,.36,1). Kinetic type in hero only. Respect prefers-reduced-motion.
- One primary CTA per view. CTA buttons get a soft blue glow on hover.

RULES:
- Accessibility: WCAG AA contrast, semantic HTML, alt text, keyboard nav, labeled form fields.
- Performance: next/image everywhere (WebP/AVIF), lazy-load below fold, SSG marketing pages, minimal client JS.
- SEO: unique title+description per page, JSON-LD, hreflang BG/EN. No carousels/sliders ever.
- All user-facing text comes from next-intl message files (bg.json / en.json) — never hardcode strings in components.
- Latin-transliteration slugs (e.g. /uslugi/web-razrabotka).
```

---

## STEP 5 — Bilingual setup (next-intl)

> **PROMPT 5:** "Set up next-intl for the App Router with `locales: ['bg','en']`, `defaultLocale: 'bg'`, and `localePrefix: 'as-needed'` so Bulgarian is at `/` and English at `/en/`. Move routes under `src/app/[locale]/`. Create the middleware, routing config, and `src/messages/bg.json` + `src/messages/en.json`. Add a locale switcher component for the header. Add hreflang alternates in the root layout metadata."

---

## STEP 6 — Theming (dark default + toggle)

> **PROMPT 6:** "Add next-themes with `attribute='class'`, `defaultTheme='dark'`, `enableSystem`. Create a `ThemeProvider` in the root layout and a `ThemeToggle` button (sun/moon from lucide-react) for the header. Prevent flash of wrong theme on load."

---

## STEP 7 — Project folder structure (target)
After steps 5–6 you're aiming for this. Paste it to Cursor as the target tree:
```
src/
├─ app/
│  └─ [locale]/
│     ├─ layout.tsx              # html, providers, fonts, header/footer
│     ├─ page.tsx                # Home
│     ├─ uslugi/
│     │  ├─ page.tsx             # Services hub
│     │  └─ [service]/page.tsx   # Service template (data-driven)
│     ├─ portfolio/
│     │  ├─ page.tsx
│     │  └─ [slug]/page.tsx
│     ├─ blog/
│     │  ├─ page.tsx
│     │  └─ [slug]/page.tsx
│     ├─ za-nas/page.tsx
│     ├─ tseni/page.tsx
│     ├─ kontakti/page.tsx
│     └─ pravna-informatsia/page.tsx
├─ components/
│  ├─ layout/  (Header, Footer, LocaleSwitcher, ThemeToggle, Container)
│  ├─ sections/(Hero, ServicesBento, WhyUs, FeaturedCases, Process, Testimonials, CtaBanner)
│  ├─ ui/      (Button, Card, Badge, Input, Gradient, InfinityMark)
│  └─ seo/     (JsonLd)
├─ messages/   (bg.json, en.json)
├─ lib/        (sanity client, utils/cn, services data, metadata helpers)
├─ sanity/     (schema, config)
└─ app/api/contact/route.ts      # Resend handler
```

---

## STEP 8 — Build the homepage, section by section (don't one-shot it)
Build in this order, one prompt at a time, commit after each.

> **PROMPT 8a — Layout shell:** "Build the Header (sticky, translucent backdrop-blur, dark-mode logo, nav, persistent primary CTA, ThemeToggle, LocaleSwitcher) and Footer (services, contacts, Viber + WhatsApp + phone, socials, legal links). Use the design tokens and pull all text from next-intl messages. Add a reusable `Container` and a `Button` (primary/secondary variants) per section 2.6."

> **PROMPT 8b — Hero:** "Build the homepage hero from master-plan section 3.2: dark, type-first, asymmetric. Left = oversized headline + one-line subhead + primary CTA 'Безплатна консултация' + secondary 'Вижте проектите ни' + a trust bar (project count / happy clients). Right = the brand infinity mark as an SVG that continuously draws itself via stroke-dashoffset animation, with a faint blue→amber radial glow behind it. Add subtle scroll parallax. Respect prefers-reduced-motion. ~85vh desktop / ~65vh mobile."

> **PROMPT 8c — Services bento:** "Build a bento grid of the 3 money services (App Development, Web Development, Digital Marketing) as large cards + the remaining services as smaller cards, mixed sizes. Each card: icon, title, one-line outcome, hover lift + gradient edge, links to its service page. Outcome-led copy, not feature-led."

> **PROMPT 8d:** "Build the Why-Us section (Прецизни & Иновативни angle, but include proof: 3 stat counters that animate on scroll)."

> **PROMPT 8e:** "Build Featured Case Studies (2–3 cards, each = project mockup in a device frame + one result metric like '+220% запитвания') linking to /portfolio/[slug]."

> **PROMPT 8f:** "Build the Process section ('Как го правим') as 4 clean numbered steps with amber-dot markers."

> **PROMPT 8g:** "Build Testimonials (placeholder data for now) + a final CTA banner with the free-audit lead magnet ('Безплатен одит на сайта ви') and email capture."

---

## STEP 9 — Service pages (data-driven, SEO backbone)

> **PROMPT 9:** "Create a `services` data file (slug, BG/EN title, keyword H1, outcome, included[], FAQ[]). Build `/uslugi/[service]/page.tsx` to render from it using the template in master-plan section 6: keyword H1, outcome, included checklists, mini case, pricing hint ('от €X'), FAQ accordion. Add `FAQPage` + `Service` JSON-LD. `generateStaticParams` for all services + `generateMetadata` per service."

---

## STEP 10 — Blog (Sanity)

> **PROMPT 10:** "Set up Sanity Studio embedded at `/studio`. Create a `post` schema (title, slug, locale, cover, excerpt, body PortableText, category, publishedAt, SEO fields). Wire `next-sanity` client. Build `/blog` (list) and `/blog/[slug]` (post) with the cover template from master-plan 3.3, PortableText rendering, and per-post metadata + `Article` JSON-LD."

---

## STEP 11 — Contact form + email

> **PROMPT 11:** "Build the contact form (name, email, service select, message) with react-hook-form + zod validation. POST to `/api/contact` which sends via Resend to our inbox. Show success/error states. Add Viber/WhatsApp/phone quick links and a '24h response' note. No HTML <form> reliance on native submit — handle via onSubmit."

---

## STEP 12 — SEO plumbing

> **PROMPT 12:** "Add: `src/app/sitemap.ts` (all locales + pages), `robots.ts` (ALLOW all crawlers, link sitemap), `Organization` + `LocalBusiness` JSON-LD in the root layout, `BreadcrumbList` on inner pages, OG/Twitter image templates (1200×630, dark + gradient + logo) via `opengraph-image` files, and per-page `generateMetadata` with unique BG/EN titles + descriptions + hreflang alternates."

---

## STEP 13 — Analytics & tags

> **PROMPT 13:** "Add Google Tag Manager to the root layout (env-driven container ID). Through GTM we'll later load GA4, the Google Ads tag, and the Meta Pixel — leave clean dataLayer hooks on the CTA buttons and form submit (event: 'lead')."

Add to `.env.local` (and Vercel env vars):
```
RESEND_API_KEY=
CONTACT_TO_EMAIL=
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## STEP 14 — Deploy
```bash
git add -A && git commit -m "site build" && git branch -M main
# create empty GitHub repo, then:
git remote add origin <your-repo-url> && git push -u origin main
```
- Import the repo in **Vercel** → add the env vars → deploy.
- Add your **domain** in Vercel → update DNS.
- Verify the domain in **Google Search Console** → submit `sitemap.xml`.
- Run **PageSpeed Insights** → confirm LCP < 2.5s, CLS < 0.1, INP < 200ms.

---

## How to work with Cursor (so it stays clean)
- **One prompt = one section.** Don't ask for the whole site at once; it tangles.
- **Commit after every working step** (`git commit`) so you can roll back.
- Keep `.cursorrules` + `treasure-digital-master-plan.md` in the repo — Cursor uses them as context.
- When something drifts off-brand, say: *"re-read .cursorrules and the master plan, then fix X to use design tokens."*
- Test **BG and EN** + **dark and light** + **mobile** after each section.

---

### Next: Phase 3 — SEO
Once the shell is live I'll deliver the keyword research (BG + EN clusters per service), the on-page map, the Google Business Profile setup, the blog content calendar, and the link-building plan. Send me your **2–3 best projects** + any **testimonials/results** and I'll fold real proof into the portfolio + keyword work.
