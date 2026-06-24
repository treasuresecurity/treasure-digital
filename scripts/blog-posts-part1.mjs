import { body, h2, h3, p, quote } from "./blog-helpers.mjs";

export const sanityBlogPosts = [
  {
    _id: "post-tekhnichesko-seo-bg",
    locale: "bg",
    slug: "tekhnichesko-seo-navodnik-bulgaria-2026",
    category: "SEO",
    title: "Техническо SEO в България — пълен наръчник за 2026",
    excerpt:
      "Стъпка по стъпка: индексиране, Core Web Vitals, структурирани данни, hreflang и локално SEO — всичко, което Google очаква от модерен български сайт, преди да инвестирате в реклама.",
    seoTitle: "Техническо SEO в България 2026 — пълен наръчник | Treasure Digital",
    seoDescription:
      "Практически технически SEO наръчник за български бизнеси: Search Console, sitemap, скорост, mobile-first, JSON-LD и чести грешки. Без fluff — само действия.",
    publishedAt: "2026-06-01T08:00:00.000Z",
    body: body([
      p(
        "Повечето собственици на бизнес в България не търсят „по-красив сайт“. Търсят повече запитвания от Google. Проблемът е, че без техническо SEO дори най-добрият дизайн остава невидим — crawler-ът не индексира страниците, конкурентите с по-скромен, но правилно настроен сайт ви изпреварват, а рекламният бюджет отива за трафик, който landing page-ът не успява да конвертира.",
        "t1",
      ),
      p(
        "Този наръчник е написан за български пазар — с реални примери от проекти, с които работим (онлайн магазини, корпоративни сайтове, SaaS). Целта не е да научите SEO теория, а да имате checklist, който можете да приложите тази седмица.",
        "t2",
      ),
      h2("Какво е техническо SEO и защо е фундаментът", "t3"),
      p(
        "Техническото SEO е всичко, което помага на Google да открие, разбере и класира сайта ви: crawlability, скорост, mobile experience, структура на URL, canonical tags, sitemap, structured data. Content SEO и link building работят само ако техническата основа е здрава — иначе строите върху пясък.",
        "t4",
      ),
      quote(
        "Ако Google не може да индексира страницата, няма значение колко добре е написан текстът.",
        "t5",
      ),
      h2("1. Google Search Console — безплатният ви радар", "t6"),
      p(
        "Регистрирайте property за https://treasuredigital.bg (или вашия домейн) и потвърдете собствеността чрез DNS или HTML tag. Search Console показва: кои страници са индексирани, за какви заявки се показвате, Core Web Vitals грешки, mobile usability проблеми и manual actions.",
        "t7",
      ),
      h3("Какво да проверите в първите 48 часа", "t8"),
      p(
        "Pages → Indexed vs Not indexed: ако важни URL-и са „Excluded“, намерете причината (noindex, redirect, crawl anomaly). Sitemaps → подайте /sitemap.xml. Performance → вижте реални заявки на български („уеб разработка“, „онлайн магазин“ + ваш град). URL Inspection → тествайте нови страници преди да ги споделяте.",
        "t9",
      ),
      h2("2. Crawlability: robots.txt, sitemap и вътрешни линкове", "t10"),
      p(
        "robots.txt трябва да ALLOW-ва marketing страниците. Старият сайт на Treasure Security блокираше crawlers — типична грешка, която убива SEO. Уверете се, че няма Disallow: / в production. XML sitemap трябва да включва всички локали (BG на /, EN на /en/), услуги, портфолио, блог и контакти.",
        "t11",
      ),
      p(
        "Вътрешното link building е недооценено: от homepage към money pages (приложения, уеб, маркетинг), от блог към услуги, breadcrumb навигация. Страница без входящи линкове е „остров“ — Google може да я пропусне.",
        "t12",
      ),
      h2("3. Архитектура и URL — една страница = една тема", "t13"),
      p(
        "Златното правило: всяка ключова услуга или категория получава собствен URL с Latin transliteration (/uslugi/web-razrabotka, не кирилица). H1 = основната keyword фраза. Meta title уникален, 50–60 символа. Meta description с outcome („повече клиенти“, „работещ онлайн магазин“), не generic marketing speak.",
        "t14",
      ),
      h3("Примерна структура за дигитална агенция", "t15"),
      p(
        "Home → Services hub → 8 service pages → Portfolio cases → Blog → Contact. За eCommerce: Home → Categories → Products → Blog. Дълбочина max 3–4 клика до всяка важна страница. Избягвайте duplicate content между /uslugi/onlain-magazin и отделна /magazin страница със същия текст.",
        "t16",
      ),
      h2("4. Core Web Vitals — скоростта е ranking фактор и conversion фактор", "t17"),
      p(
        "Google измерва LCP (зареждане), INP (интерактивност) и CLS (визуална стабилност). Бавен сайт губи и позиции, и клиенти — особено на mobile в България, където 60%+ трафик идва от телефон. Целите: LCP < 2.5s, INP < 200ms, CLS < 0.1.",
        "t18",
      ),
      h3("Как го постигаваме в нашите Next.js проекти", "t19"),
      p(
        "SSG/ISR за marketing pages, next/image с WebP/AVIF, minimal client JS, font-display: swap с Cyrillic subsets, lazy-load below the fold. Избягваме carousels и тежки hero videos. PageSpeed Insights + real-user data от Search Console — не само lab scores.",
        "t20",
      ),
      h2("5. Mobile-first indexing", "t21"),
      p(
        "Google индексира primarily mobile версията. Ако desktop изглежда добре, но mobile menu не работи, текстът е твърде малък или CTA е скрит — класирането страда. Тествайте на реални устройства, не само Chrome DevTools.",
        "t22",
      ),
      h2("6. Structured data (JSON-LD)", "t23"),
      p(
        "Schema.org markup помага на Google да разбере съдържанието и може да активира rich results: Organization + LocalBusiness в layout, Service + FAQPage на услуги, Article на блог, BreadcrumbList на inner pages. Валидирайте с Google Rich Results Test.",
        "t24",
      ),
      h2("7. hreflang за двуезични сайтове (BG + EN)", "t25"),
      p(
        "Ако обслужвате България и международни клиенти, hreflang alternates са задължителни: bg за /, en за /en/, x-default към основния пазар. Без тях Google може да покаже английска версия на български потребители или да treat-не страниците като duplicate.",
        "t26",
      ),
      h2("8. HTTPS, canonical и дублирано съдържание", "t27"),
      p(
        "Един canonical URL на страница. WWW vs non-WWW — изберете едно и 301 redirect. HTTP → HTTPS. Параметри в URL (?utm=) — canonical към clean version. Pagination и filter pages в eCommerce — внимателно с noindex или canonical към main category.",
        "t28",
      ),
      h2("9. Чести грешки при български сайтове", "t29"),
      p(
        "Блокиран robots.txt от стара инсталация. Justified text (лошо за Cyrillic и UX). Липса на отделни service pages — всичко на една „Услуги“ страница. WordPress с 40 plugins и LCP над 5 секунди. Копиран content от конкуренти. Липса на „За нас“ и реални case studies (E-E-A-T).",
        "t30",
      ),
      h2("10. Checklist — 15 точки преди content кампания", "t31"),
      p(
        "Search Console verified · sitemap submitted · robots allows crawl · unique titles/descriptions · Core Web Vitals green or improving · mobile usable · HTTPS · canonicals set · hreflang if bilingual · JSON-LD on key templates · internal links to money pages · 404 page · fast hosting · Cyrillic fonts with good performance · Analytics + conversion tracking.",
        "t32",
      ),
      h2("Следваща стъпка", "t33"),
      p(
        "Не чакайте „перфектния redesign“, за да оправите техническото SEO. Започнете с одит — Search Console + PageSpeed + ръчен преглед на architecture. Treasure Digital предлага безплатна консултация и SEO одит на сайта ви: ще ви кажем какво блокира индексирането и какво дава най-бърз ROI. Свържете се на /kontakti.",
        "t34",
      ),
    ]),
  },
  {
    _id: "post-tekhnichesko-seo-en",
    locale: "en",
    slug: "tekhnichesko-seo-navodnik-bulgaria-2026",
    category: "SEO",
    title: "Technical SEO in Bulgaria — complete guide for 2026",
    excerpt:
      "Step by step: indexing, Core Web Vitals, structured data, hreflang and local SEO — everything Google expects from a modern Bulgarian website before you spend on ads.",
    seoTitle: "Technical SEO in Bulgaria 2026 — complete guide | Treasure Digital",
    seoDescription:
      "Practical technical SEO guide for Bulgarian businesses: Search Console, sitemap, speed, mobile-first, JSON-LD and common mistakes. No fluff — just actions.",
    publishedAt: "2026-06-01T08:00:00.000Z",
    body: body([
      p(
        "Most business owners in Bulgaria aren't looking for a \"prettier website\". They want more enquiries from Google. Without technical SEO, even the best design stays invisible — crawlers miss pages, competitors with simpler but correctly configured sites outrank you, and ad budget goes to traffic your landing page can't convert.",
        "e1",
      ),
      p(
        "This guide is written for the Bulgarian market — with real examples from projects we work on (online stores, corporate sites, SaaS). The goal isn't SEO theory; it's a checklist you can apply this week.",
        "e2",
      ),
      h2("What technical SEO is and why it's the foundation", "e3"),
      p(
        "Technical SEO is everything that helps Google discover, understand and rank your site: crawlability, speed, mobile experience, URL structure, canonical tags, sitemap, structured data. Content SEO and link building only work if the technical base is solid — otherwise you're building on sand.",
        "e4",
      ),
      quote(
        "If Google can't index the page, it doesn't matter how well the copy is written.",
        "e5",
      ),
      h2("1. Google Search Console — your free radar", "e6"),
      p(
        "Register a property for your domain and verify ownership via DNS or HTML tag. Search Console shows: indexed pages, queries you appear for, Core Web Vitals issues, mobile usability problems and manual actions.",
        "e7",
      ),
      h3("What to check in the first 48 hours", "e8"),
      p(
        "Pages → Indexed vs Not indexed. Sitemaps → submit /sitemap.xml. Performance → real queries in Bulgarian and English. URL Inspection → test new pages before sharing.",
        "e9",
      ),
      h2("2. Crawlability: robots.txt, sitemap and internal links", "e10"),
      p(
        "robots.txt must ALLOW marketing pages. Ensure there's no Disallow: / in production. Your XML sitemap should include all locales, services, portfolio, blog and contact pages.",
        "e11",
      ),
      p(
        "Internal linking is underrated: from homepage to money pages, from blog to services, breadcrumb navigation. A page with no inbound links is an island Google may skip.",
        "e12",
      ),
      h2("3. Architecture and URLs — one page, one topic", "e13"),
      p(
        "Each key service or category gets its own URL with Latin transliteration. H1 = primary keyword phrase. Unique meta title, 50–60 characters. Meta description with outcome, not generic marketing.",
        "e14",
      ),
      h2("4. Core Web Vitals — speed ranks and converts", "e15"),
      p(
        "Google measures LCP, INP and CLS. Slow sites lose rankings and clients — especially on mobile. Targets: LCP < 2.5s, INP < 200ms, CLS < 0.1. We achieve this with Next.js SSG, next/image, minimal client JS and Cyrillic-ready fonts.",
        "e16",
      ),
      h2("5. Mobile-first indexing", "e17"),
      p(
        "Google primarily indexes the mobile version. Test on real devices — broken mobile menus and hidden CTAs hurt rankings.",
        "e18",
      ),
      h2("6. Structured data (JSON-LD)", "e19"),
      p(
        "Schema.org markup helps Google understand content and can enable rich results: Organization, LocalBusiness, Service, FAQPage, Article, BreadcrumbList. Validate with Google Rich Results Test.",
        "e20",
      ),
      h2("7. hreflang for bilingual sites (BG + EN)", "e21"),
      p(
        "hreflang alternates are required: bg for /, en for /en/, x-default to your primary market. Without them Google may show the wrong language or treat pages as duplicates.",
        "e22",
      ),
      h2("8. HTTPS, canonicals and duplicate content", "e23"),
      p(
        "One canonical URL per page. Pick www or non-www and 301 redirect. HTTP → HTTPS. Careful with eCommerce filter URLs and pagination.",
        "e24",
      ),
      h2("9. Common mistakes on Bulgarian sites", "e25"),
      p(
        "Blocked robots.txt. Justified Cyrillic text. No dedicated service pages. WordPress with 40 plugins and 5s+ LCP. Copied competitor content. Missing About page and real case studies (E-E-A-T).",
        "e26",
      ),
      h2("10. Checklist — 15 points before a content campaign", "e27"),
      p(
        "Search Console verified · sitemap submitted · robots allows crawl · unique titles/descriptions · Core Web Vitals improving · mobile usable · HTTPS · canonicals · hreflang · JSON-LD · internal links · 404 page · fast hosting · Cyrillic fonts · conversion tracking.",
        "e28",
      ),
      h2("Next step", "e29"),
      p(
        "Don't wait for a perfect redesign to fix technical SEO. Start with an audit — Search Console, PageSpeed and architecture review. Treasure Digital offers a free consultation and site SEO audit. Get in touch at /kontakti.",
        "e30",
      ),
    ]),
  },
];
