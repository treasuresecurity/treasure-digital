# TREASURE DIGITAL — Build & Growth Master Plan
### (Cursor-ready master document — paste sections directly as project context)

> **Rebrand note:** The company is now **Treasure Digital** (previously Treasure Security).
> The new name resolves the old "security = cybersecurity" confusion — "Digital" matches what you sell.
> Brand mark: an **infinity loop** in blue + amber with a digital "pixel-splash" detail = *endless growth, continuity, momentum.*

**The 5 phases:** 1) Foundation, Architecture & Design ← *here* · 2) Cursor Build Plan · 3) SEO · 4) Conversion & Lead Gen · 5) Paid Ads

---

## 1. Brand Foundation

- **Name:** Treasure Digital
- **What we sell (priority order):** App Development · Web Development · Digital Marketing → then eShop/eCommerce, SEO, Google Ads, Meta/Facebook Ads, Social Media Management
- **Markets:** Bulgaria (stronghold to dominate) + International (niche + portfolio-led)
- **Hero promise (BG):** *„Изграждаме сайтове, приложения и реклами, които носят клиенти."*
- **Hero promise (EN):** *"We build websites, apps and campaigns that bring customers — not just good looks."*
- **Brand principle:** lead with the **outcome** (повече клиенти / more clients), not the service.

---

## 2. BRAND & DESIGN SYSTEM

This is the single source of truth for visuals. Cursor should generate all components from these tokens.

### 2.1 Logo usage
- **Dark mode (primary):** white "TREASURE" wordmark + blue "DIGITAL", full-color infinity mark on `#000817`.
- **Light mode:** near-black "TREASURE" wordmark + blue "DIGITAL", full-color infinity mark on white.
- **Clear space:** keep padding around the logo ≥ the height of the infinity mark's loop.
- **Minimum width:** 120px (full lockup); use mark-only below that (e.g. mobile nav, favicon).
- **Don'ts:** don't recolor the mark, don't stretch, don't place the dark-mode white wordmark on light backgrounds (and vice-versa), don't add shadows to the mark.
- **Favicon / app icon:** the infinity mark alone, on `#000817`.

### 2.2 Color tokens (sampled directly from the official logo files)

**Core brand:**
| Token | Hex | Role |
|---|---|---|
| `brand-blue` | `#0061FE` | Primary — CTAs, links, key accents, trust |
| `brand-blue-600` | `#0052D6` | Hover/pressed state for blue |
| `brand-amber` | `#E8A50B` | Secondary accent — highlights, dots, gradient end |
| `ink` | `#1F1F1E` | Near-black text (light mode) |
| `night` | `#000817` | Brand dark background |
| `white` | `#FFFFFF` | Pure white text (dark mode) |

**Signature gradient (use sparingly, on accents/hero glow — mirrors the logo):**
`linear-gradient(120deg, #0061FE 0%, #2E7BFF 45%, #E8A50B 100%)`

#### CSS variables (drop into `globals.css`)
```css
:root {
  /* brand */
  --brand-blue: #0061FE;
  --brand-blue-600: #0052D6;
  --brand-amber: #E8A50B;

  /* LIGHT MODE (default-light) */
  --bg: #FFFFFF;
  --surface: #F5F7FA;
  --surface-2: #ECEFF5;
  --text: #1F1F1E;
  --text-muted: #5B6472;
  --border: #E5E8EF;
  --primary: var(--brand-blue);
  --primary-foreground: #FFFFFF;
  --accent: var(--brand-amber);
  --ring: rgba(0,97,254,.35);
}

.dark {
  /* DARK MODE (primary brand mode) */
  --bg: #000817;
  --surface: #0A1426;
  --surface-2: #12203A;
  --text: #FFFFFF;
  --text-muted: #9AA7BD;
  --border: rgba(255,255,255,.08);
  --primary: #2E7BFF;          /* slightly brightened blue for AA contrast on dark */
  --primary-foreground: #FFFFFF;
  --accent: #F5B028;           /* slightly brightened amber for dark */
  --ring: rgba(46,123,255,.45);
}
```

#### Tailwind config extension (`tailwind.config.ts`)
```ts
extend: {
  colors: {
    bg: 'var(--bg)',
    surface: 'var(--surface)',
    'surface-2': 'var(--surface-2)',
    text: 'var(--text)',
    'text-muted': 'var(--text-muted)',
    border: 'var(--border)',
    primary: { DEFAULT: 'var(--primary)', foreground: 'var(--primary-foreground)' },
    accent: 'var(--accent)',
    brand: { blue: '#0061FE', amber: '#E8A50B', night: '#000817' },
  },
  borderRadius: { xl: '1rem', '2xl': '1.5rem' },
}
```

> ⚠️ Confirm these hexes against your original brand source/vector files before launch — they were sampled from raster exports and may differ by a shade.

### 2.3 Mode strategy
- **Dark mode = primary brand experience** (premium, tech-forward, makes the blue/amber pop).
- Ship a **light/dark toggle** in the header; respect `prefers-color-scheme` on first visit, then remember the user's choice (server-readable cookie, *not* localStorage if SSR-rendered).
- Both modes must pass **WCAG AA contrast** (4.5:1 body text). The brightened dark-mode blue/amber above are for exactly this.

### 2.4 Typography
**Hard rule: every font MUST have full Cyrillic support** or Bulgarian text breaks.

- **Display / headlines:** a bold, geometric, Cyrillic-ready face — e.g. **Unbounded**, **Onest**, or **Space Grotesk** (verify Cyrillic). Used large and confident (type-first hero).
- **Body / UI:** **Inter**, **Manrope**, or **Golos Text** — clean and legible in BG + EN.
- **Max two families.** Load as variable fonts; `font-display: swap`; preload the display font used above the fold.

**Type scale (fluid, `clamp`):**
```
Display XL  clamp(2.75rem, 6vw, 5.5rem)   /* hero headline */
H1          clamp(2.25rem, 4vw, 3.5rem)
H2          clamp(1.75rem, 3vw, 2.5rem)
H3          1.5rem
Body        1.0625rem / 1.7 line-height
Small       0.9375rem
```
**Body text fix from the old site:** left-aligned, 60–75 characters per line, never justified (justified Cyrillic creates ugly gaps).

### 2.5 Spacing, radius, elevation, motion
- **Spacing scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 px. Be generous — whitespace reads as premium.
- **Radius:** cards `1rem`, large panels `1.5rem`, buttons `0.75rem`, pills full.
- **Elevation (dark):** use subtle borders + soft blue/amber glows instead of heavy black shadows.
- **Motion:** durations 150–400ms, ease `cubic-bezier(.22,1,.36,1)`. Scroll-reveal, hover lift on cards, kinetic hero type. Respect `prefers-reduced-motion`.

### 2.6 Component UI specs
- **Primary button:** `bg-primary text-white`, radius `0.75rem`, hover → `brand-blue-600` + slight lift + glow `0 0 24px rgba(0,97,254,.4)`.
- **Secondary button:** transparent, `border-border`, text = `--text`; hover → `border-primary`.
- **Cards (bento):** `bg-surface border border-border rounded-2xl`, hover lift + faint gradient edge. Mix sizes for a modern bento grid.
- **Nav:** sticky, translucent (`backdrop-blur`), logo left, links center/right, **persistent CTA button** + mode toggle + BG/EN switch.
- **Forms:** large inputs, clear labels, inline validation, one primary action; minimal fields.
- **Accent dots:** echo the amber dots from the logo as small decorative details (section numbers, list markers).

---

## 3. COVERS & HERO SYSTEM  *(research-backed, 2026)*

"Cover" = the first full-viewport visual users meet (homepage hero) + the section headers/cover images on inner pages and social/OG cards.

### 3.1 Principles (what 2026 data supports)
- **No carousels/sliders** — they hurt click-through and load speed. One static, confident hero.
- **Type-first:** the oversized headline *is* the hero. Visuals support, don't compete.
- **One clear, literal headline** (outcome, not wordplay) + **one primary CTA** (+ one quiet secondary).
- **Social proof above the fold** (logos / a result stat) — feeds Google E-E-A-T and trust.
- **Dark hero, vibrant text** for premium tech feel and CTA pop.
- **Gradient/glow** to guide the eye to the CTA — your blue→amber.
- **Motion with restraint:** subtle, branded, never noisy. Kinetic type in hero only.
- **Hero height:** ~70–90% viewport on desktop, ~55–70% on mobile, with everything (headline, sub, CTA, proof) visible without scrolling.
- **Performance:** any imagery in **WebP/AVIF**, compressed; background video (if ever) muted, looped, < 5MB; lazy-load below the fold.

### 3.2 Recommended homepage hero for Treasure Digital
**Layout:** dark (`#000817`), type-first, asymmetric/split.

- **Left:** oversized headline (outcome promise) → subheadline (one line) → primary CTA *"Безплатна консултация"* + secondary *"Вижте проектите ни"* → trust bar (logos or "X+ проекта · Y доволни клиенти").
- **Right / behind:** the **infinity mark animated as a continuously drawing loop** (SVG `stroke-dashoffset` animation) — perfect symbol for "endless growth," and on-brand. Optional faint blue→amber aurora/gradient glow behind it.
- **Accents:** amber dots, thin grid lines (carry over the one signature you already had), subtle parallax on scroll.
- **CTA glow** so it's the brightest element on screen.

This single design hits every research point: static, type-first, dark, high-contrast CTA, branded motion, fast.

### 3.3 Inner-page covers (consistency system)
- **Service pages:** compact cover — H1 keyword headline on `--surface` with a blue→amber edge gradient + the relevant icon; breadcrumb above.
- **Portfolio/case study:** project mockup in a device frame as the cover visual + result stat overlaid.
- **Blog:** a clean cover template (title + category tag + amber dot motif) auto-generated per post for consistency.
- **OG / social share covers:** a templated 1200×630 image per page (logo + page title on `#000817` with the gradient) so shared links look intentional everywhere.

### 3.4 Avoid
Carousels, stock-photo collages, multiple competing CTAs, clever/ambiguous headlines, heavy unoptimized hero images/video, low-contrast muted text on dark.

---

## 4. Tech Stack
| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | Best SEO (SSG/SSR), Cursor knows it deeply |
| Styling | **Tailwind CSS** (+ tokens above) | Tight, consistent system |
| UI primitives | **shadcn/ui** (optional) | Accessible, fully ownable |
| Animation | **Framer Motion** | Scroll reveals, kinetic hero, the infinity loop |
| Bilingual | **next-intl** | BG/EN routing + hreflang |
| Blog/Content | **Sanity** (non-devs publish) or **MDX** | Pick in Phase 2 |
| Forms/Leads | **React Hook Form + Resend** | Reliable lead capture to inbox/CRM |
| Hosting | **Vercel** | Made for Next.js; edge speed; free start |
| Analytics | **GA4 + Search Console + Vercel Analytics** | Traffic, rankings, behavior |
| Tags | **Google Tag Manager** | GA4 + Google Ads + Meta Pixel in one place |

---

## 5. Architecture & Sitemap
**URLs:** BG at root `/`, English at `/en/`; hreflang tags; Latin-transliteration slugs.

```
/                         Home
/uslugi                   Services hub
  /uslugi/prilozhenia       App Development     [money]
  /uslugi/web-razrabotka    Web Development     [money]
  /uslugi/onlain-magazin    eShop / eCommerce
  /uslugi/seo               SEO
  /uslugi/google-ads        Google Ads
  /uslugi/facebook-reklama  Meta / Facebook Ads
  /uslugi/sotsialni-mrezhi  Social Media Mgmt
/portfolio                Case studies  → /portfolio/[slug]
/za-nas                   About
/blog                     Blog → /blog/[slug]
/tseni                    Packages / pricing (optional)
/kontakti                 Contact
/pravna-informatsia       Privacy · Terms · Cookies (GDPR — required in EU)
```
**SEO backbone:** every service = its own page targeting one keyword cluster.

---

## 6. Key Page Structures
**Home:** Hero → trust bar → 3 money services (bento) → why-us (with proof) → featured cases (with metrics) → process ("Как го правим") → testimonials → final CTA + free-audit lead magnet → footer.
**Service page:** keyword H1 → outcome → what's included (checklists) → mini case → pricing hint → FAQ (rich-snippet) → CTA.
**Portfolio:** each case = Problem → Solution → Result (number). Numbers close international clients.
**Contact:** short form + Viber + WhatsApp + phone + 24h response promise.

---

## 7. UX & Conversion Logic
- One primary action everywhere (consultation / quote).
- Sticky header CTA; repeat CTA after each major section.
- Free **site/SEO audit** lead magnet → email capture → nurture.
- Friction killers: short forms, instant Viber/WhatsApp, no forced signup.
- Proof (testimonials, metrics) before every big ask.

---

## 8. Technical SEO Baseline (from day one)
SSG marketing pages · `next/image` everywhere (WebP/AVIF) · Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms · unique title+description per page · JSON-LD (`Organization`, `LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`) · hreflang BG/EN · XML sitemap + robots.txt (allow crawlers — the *old* site blocks them) · GSC + GA4 verified pre-launch.

---

## Decisions needed to start Phase 2 (Cursor build)
1. **Blog CMS:** Sanity (easy publishing) or MDX (simpler)? — *default: Sanity*
2. **Launch scope:** BG first then EN, or both at launch? — *default: BG first, EN structured in from day one*
3. **Pricing page:** show "from X лв." or quote-only? — *default: show ranges*

Reply with picks (or "use defaults") → I'll deliver **Phase 2: exact Cursor build plan** (setup commands, full folder structure, ordered copy-paste prompts).
