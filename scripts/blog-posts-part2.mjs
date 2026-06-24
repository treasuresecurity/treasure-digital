import { body, h2, h3, p, quote } from "./blog-helpers.mjs";

export const sanityBlogPostsPart2 = [
  {
    _id: "post-ecommerce-seo-bg",
    locale: "bg",
    slug: "online-magazin-seo-konversii-navodnik",
    category: "Уеб разработка",
    title: "Онлайн магазин, който Google намира и хората купуват — SEO + UX наръчник",
    excerpt:
      "Каталог, product pages, category SEO, checkout и Core Web Vitals — как да превърнете brochure сайт в eCommerce канал с органичен трафик и реални поръчки.",
    seoTitle: "Онлайн магазин SEO и конверсии — пълен наръчник | Treasure Digital",
    seoDescription:
      "eCommerce SEO за България: продуктови страници, категории, филтри, structured data, скорост и checkout UX. Базирано на реални проекти с десетки онлайн поръчки.",
    publishedAt: "2026-06-12T08:00:00.000Z",
    body: body([
      p(
        "Информационен сайт показва продуктите ви — но не ги продава. Посетителят трябва да се обади, да пише във Viber или да дойде на място. Междувременно конкурент с работещ checkout събира поръчки 24/7 от Google. В един от нашите проекти (мебелен обков) преминаването към онлайн магазин + SEO доведе до 50+ реални продажби след пускането.",
        "m1",
      ),
      p(
        "Този наръчник обяснява какво трябва да има един eCommerce сайт, за да се класира за продуктови и category keywords и да конвертира трафика — без magic tricks, само architecture, content и performance.",
        "m2",
      ),
      h2("Фаза 1: Информационна архитектура на магазина", "m3"),
      p(
        "Йерархията е: Home → Categories → Subcategories → Products. Всяка category page targets една keyword група („мебелни панти“, „онлайн магазин за …“). Product pages targets long-tail („3D панта Fiorri 180 градуса“). URL-ите са четими, на лatinica, без session IDs.",
        "m4",
      ),
      h3("Navigation и faceted search", "m5"),
      p(
        "Филтрите (цена, марка, размер) улесняват потребителя, но създават SEO risk: hundreds of thin duplicate URLs. Решение: canonical към main category, noindex на extreme filter combinations, или AJAX filters без промяна на URL за minor facets.",
        "m6",
      ),
      h2("Фаза 2: Product page SEO — шаблон, който работи", "m7"),
      p(
        "Unique title: „[Product name] | [Category] | [Brand]“. Meta description с benefit + наличие. H1 = product name. Structured data: Product schema с price, currency EUR (€), availability, image, sku. Alt text на всички product images. User-generated content (reviews) за fresh content и rich snippets.",
        "m8",
      ),
      quote(
        "Thin product pages с едно изречение и снимка не се класират — и не продават.",
        "m9",
      ),
      h2("Фаза 3: Category pages — вашият organic traffic engine", "m10"),
      p(
        "Category page не е само grid с продукти. Добавете 200–400 думи unique intro text над лisting-а: какво предлагате, за кого е, FAQ snippet. Internal links към related categories и top products. Breadcrumbs: Начало > Категория > Подкategория.",
        "m11",
      ),
      h2("Фаза 4: Скорост при много продукти", "m12"),
      p(
        "eCommerce sites често fail Core Web Vitals заради unoptimized images и heavy JS carts. next/image, lazy loading, CDN, server-side rendering за category pages, edge caching. Тествайте category page на 3G — ако LCP е над 4s, губите и SEO, и mobile sales.",
        "m13",
      ),
      h2("Фаза 5: Checkout и trust signals", "m14"),
      p(
        "SEO носи трафик; checkout го monetize-ва. Guest checkout, ясни shipping costs, EUR pricing, SSL badge, return policy link, phone/Viber visible. Cart abandonment пада, когато няма surprise fees на последната стъпка.",
        "m15",
      ),
      h3("Conversion tracking", "m16"),
      p(
        "GA4 + Google Ads conversion tag + Meta Pixel (ако ползвате) — purchase event, add_to_cart, begin_checkout. Без data не знаете кои category pages продават и кои само „горят“ server resources.",
        "m17",
      ),
      h2("Фаза 6: Content marketing за eCommerce", "m18"),
      p(
        "Блог секция „Статии“ (както при наш клиент Dobrev) дърпа informational queries: „как да избера мебелни панти“, „5 елемента при избор на обков“. Internal links от статии към category pages pass authority и educate buyers pre-purchase.",
        "m19",
      ),
      h2("Фаза 7: Локално SEO за физически магазини", "m20"),
      p(
        "Ако имате шоурум в Пловдив, София или друг град — Google Business Profile с NAP (name, address, phone), снимки, posts, reviews. Local pack + organic = двоен канал. Website трябва да match-ва NAP точно.",
        "m21",
      ),
      h2("Метрики — какво да следите месец 1–6", "m22"),
      p(
        "Organic sessions · product page impressions in GSC · category rankings · conversion rate · average order value · cart abandonment · top landing pages. SEO success = растящ organic revenue, не само „позиция 5 за keyword X“.",
        "m23",
      ),
      h2("Чести грешки", "m24"),
      p(
        "Duplicate product descriptions от доставчик. Out-of-stock products без 301 или proper handling. Mobile checkout broken. Липса на sitemap за product URLs. Blocking /shop in robots. Mixing BGN display without clear EUR policy (за международни клиенти — € only на новите сайтове).",
        "m25",
      ),
      h2("Готови за следващата стъпка?", "m26"),
      p(
        "Ако сайтът ви показва продукти, но не продава онлайн — започнете с одит на architecture и конкурентен SERP analysis. Treasure Digital изгражда Next.js онлайн магазини с SEO от ден едно. Безплатна консултация на /kontakti.",
        "m27",
      ),
    ]),
  },
  {
    _id: "post-ecommerce-seo-en",
    locale: "en",
    slug: "online-magazin-seo-konversii-navodnik",
    category: "Web development",
    title: "An online store Google finds — and people buy from: SEO + UX guide",
    excerpt:
      "Catalog, product pages, category SEO, checkout and Core Web Vitals — how to turn a brochure site into an eCommerce channel with organic traffic and real orders.",
    seoTitle: "eCommerce SEO and conversions — complete guide | Treasure Digital",
    seoDescription:
      "eCommerce SEO for Bulgaria: product pages, categories, filters, structured data, speed and checkout UX. Based on real projects with dozens of online orders.",
    publishedAt: "2026-06-12T08:00:00.000Z",
    body: body([
      p(
        "A brochure site showcases products — but doesn't sell them. Visitors must call, message or visit in person. Meanwhile a competitor with working checkout collects orders 24/7 from Google. In one of our projects (furniture hardware), moving to an online store + SEO led to 50+ real sales after launch.",
        "em1",
      ),
      p(
        "This guide explains what an eCommerce site needs to rank for product and category keywords and convert traffic — architecture, content and performance, no magic tricks.",
        "em2",
      ),
      h2("Phase 1: Store information architecture", "em3"),
      p(
        "Hierarchy: Home → Categories → Subcategories → Products. Each category targets one keyword group. Product pages target long-tail queries. URLs are readable, Latin script, no session IDs.",
        "em4",
      ),
      h2("Phase 2: Product page SEO template", "em5"),
      p(
        "Unique title, meta description with benefit, H1 = product name. Product schema with price in EUR, availability, image, SKU. Alt text on images. Reviews for fresh content and rich snippets.",
        "em6",
      ),
      h2("Phase 3: Category pages as organic engines", "em7"),
      p(
        "Add 200–400 words unique intro above the listing. Internal links to related categories. Breadcrumbs. Category pages aren't just product grids.",
        "em8",
      ),
      h2("Phase 4: Speed at scale", "em9"),
      p(
        "Optimize images, lazy load, CDN, SSR for categories. Test on 3G — LCP over 4s loses SEO and mobile sales.",
        "em10",
      ),
      h2("Phase 5: Checkout and trust", "em11"),
      p(
        "Guest checkout, clear shipping, EUR pricing, SSL, return policy, visible contact. Track purchase, add_to_cart, begin_checkout events.",
        "em12",
      ),
      h2("Phase 6: Content marketing", "em13"),
      p(
        "Blog articles pull informational queries and link to category pages — educating buyers and passing authority.",
        "em14",
      ),
      h2("Phase 7: Local SEO for showrooms", "em15"),
      p(
        "Google Business Profile with consistent NAP, photos, reviews. Website NAP must match exactly.",
        "em16",
      ),
      h2("Metrics months 1–6", "em17"),
      p(
        "Organic sessions, GSC product impressions, conversion rate, AOV, cart abandonment. SEO success = growing organic revenue.",
        "em18",
      ),
      h2("Next step", "em19"),
      p(
        "If your site shows products but doesn't sell online — start with architecture audit and SERP analysis. Treasure Digital builds Next.js stores with SEO from day one. Free consultation at /kontakti.",
        "em20",
      ),
    ]),
  },
  {
    _id: "post-local-seo-bg",
    locale: "bg",
    slug: "lokalno-seo-bulgaria-google-business-profile",
    category: "SEO",
    title: "Локално SEO в България — Google Business Profile, карти и „близо до мен“",
    excerpt:
      "Как български бизнеси да се появят в Google Maps и local pack — NAP, reviews, локални keywords, landing pages по градове и технически checklist за 2026.",
    seoTitle: "Локално SEO България — Google Maps & GBP | Treasure Digital",
    seoDescription:
      "Пълен local SEO наръчник за BG: Google Business Profile, NAP consistency, local keywords, city pages, reviews стратегия и връзка с organic SEO.",
    publishedAt: "2026-06-20T08:00:00.000Z",
    body: body([
      p(
        "„Магазин за … близо до мен“ — търсенето расте всяка година. За ресторанти, салони, сервизи, B2B шоуруми и агенции local visibility е often по-ценна от national rankings. Ако не сте в Google Maps pack и local results, отдавате клиенти на конкурент с по-слаб сайт, но по-добър Google Business Profile.",
        "l1",
      ),
      h2("Local SEO vs organic SEO — как работят заедно", "l2"),
      p(
        "Organic SEO класира website pages. Local SEO класира Google Business Profile (GBP) + local signals: NAP consistency, reviews, proximity, categories, website quality. Идеалният setup: силен сайт + optimized GBP + local content pages.",
        "l3",
      ),
      h2("1. Google Business Profile — foundation", "l4"),
      p(
        "Claim или create listing на business.google.com. Primary category точна (напр. „Marketing agency“, „Software company“, „Furniture store“). Secondary categories where relevant. Business hours актуални. Phone и website URL correct. Description с keywords естествено на български + services list.",
        "l5",
      ),
      h3("Снимки и posts", "l6"),
      p(
        "Качете logo, cover, interior, team, product shots. GBP posts weekly: offers, news, case study links. Profiles с photos get повече clicks. Отговаряйте на reviews — и положителни, и negative — професионално и бързо.",
        "l7",
      ),
      h2("2. NAP consistency — name, address, phone", "l8"),
      p(
        "NAP на сайта, GBP, Facebook, directories трябва да match character-by-character. „ул. Example 15“ vs „ул. Example №15“ confuse Google. За service-area businesses без public address — configure service areas in GBP вместо fake address.",
        "l9",
      ),
      h2("3. Local keywords и on-page optimization", "l10"),
      p(
        "Target „[услуга] + [град]“: „уеб разработка Пловдив“, „SEO агенция София“. Title tags, H1, meta, body copy — natural inclusion. Avoid doorway pages: една quality city page > 28 thin pages за всеки град в BG.",
        "l11",
      ),
      h2("4. Local landing pages (when they make sense)", "l12"),
      p(
        "Ако обслужвате Пlovdiv + region — една „За Пловдив / контакти“ или service page section с local proof (client logos, map embed, local phone). Unique content: как работите с местни бизнеси, case studies от региона.",
        "l13",
      ),
      h2("5. Reviews strategy — ethical и effective", "l14"),
      p(
        "Reviews са top local ranking factor. Не купувайте fake reviews — Google penalties. Питайте доволни клиенти след project delivery. QR link към GBP review page. Respond на всеки review. 4.5+ stars с volume beats perfect score с 3 reviews.",
        "l15",
      ),
      h2("6. Local citations и directories", "l16"),
      p(
        "Bulgarian directories, industry listings, Chamber of Commerce where relevant. Consistent NAP. Quality > quantity — spam directories hurt more than help.",
        "l17",
      ),
      h2("7. LocalBusiness schema на сайта", "l18"),
      p(
        "JSON-LD LocalBusiness с addressCountry BG, areaServed, sameAs social profiles. Helps Google connect website ↔ GBP. Part of our standard SEO setup on Treasure Digital site.",
        "l19",
      ),
      h2("8. „Near me“ mobile behavior", "l20"),
      p(
        "Mobile users click call button and directions. Click-to-call prominent on mobile. Fast mobile site — slow load = bounce to competitor in map results. Viber/WhatsApp links popular in Bulgaria — include them.",
        "l21",
      ),
      h2("9. Tracking local performance", "l22"),
      p(
        "GBP Insights: views, searches, calls, direction requests. Search Console filter by query containing city names. UTM on GBP website link optional. Call tracking number only if you can maintain NAP consistency.",
        "l23",
      ),
      h2("10. Local SEO checklist", "l24"),
      p(
        "GBP claimed & verified · categories set · photos uploaded · NAP match site · reviews strategy · LocalBusiness schema · city/service keywords in content · mobile fast · map embed on contact page · respond to all reviews.",
        "l25",
      ),
      h2("Комбинирайте local + technical + content SEO", "l26"),
      p(
        "Local pack + blog articles + service pages = full funnel. Treasure Digital помага на български бизнеси да изградят visibility в Google — от GBP optimization до цялостен Next.js сайт. Заявете безплатна консултация на /kontakti.",
        "l27",
      ),
    ]),
  },
  {
    _id: "post-local-seo-en",
    locale: "en",
    slug: "lokalno-seo-bulgaria-google-business-profile",
    category: "SEO",
    title: "Local SEO in Bulgaria — Google Business Profile, maps and \"near me\"",
    excerpt:
      "How Bulgarian businesses appear in Google Maps and the local pack — NAP, reviews, local keywords, city pages and a 2026 technical checklist.",
    seoTitle: "Local SEO Bulgaria — Google Maps & GBP | Treasure Digital",
    seoDescription:
      "Complete local SEO guide for BG: Google Business Profile, NAP consistency, local keywords, city pages, reviews strategy and connection to organic SEO.",
    publishedAt: "2026-06-20T08:00:00.000Z",
    body: body([
      p(
        "\"Shop near me\" searches grow every year. For restaurants, salons, showrooms and agencies, local visibility is often worth more than national rankings. Without Google Maps and local results, you hand clients to competitors with weaker sites but better Google Business Profiles.",
        "el1",
      ),
      h2("Local SEO vs organic SEO — working together", "el2"),
      p(
        "Organic SEO ranks website pages. Local SEO ranks GBP plus signals: NAP consistency, reviews, proximity, categories, website quality. Ideal setup: strong site + optimized GBP + local content.",
        "el3",
      ),
      h2("1. Google Business Profile foundation", "el4"),
      p(
        "Claim listing at business.google.com. Accurate primary category. Updated hours. Correct phone and website. Description with natural keywords and services list.",
        "el5",
      ),
      h2("2. NAP consistency", "el6"),
      p(
        "Name, address, phone must match across site, GBP and social profiles. For service-area businesses, use service areas instead of fake addresses.",
        "el7",
      ),
      h2("3. Local keywords", "el8"),
      p(
        "Target \"[service] + [city]\" in titles, H1, meta and body. One quality city page beats dozens of thin doorway pages.",
        "el9",
      ),
      h2("4. Reviews strategy", "el10"),
      p(
        "Reviews are a top local factor. Ask satisfied clients after delivery. Respond to every review. Volume and authenticity matter.",
        "el11",
      ),
      h2("5. LocalBusiness schema", "el12"),
      p(
        "JSON-LD on your site helps Google connect website and GBP. Standard on our Treasure Digital builds.",
        "el13",
      ),
      h2("6. Mobile \"near me\" behavior", "el14"),
      p(
        "Mobile users call and get directions. Fast mobile site, click-to-call, Viber/WhatsApp — essential in Bulgaria.",
        "el15",
      ),
      h2("Local SEO checklist", "el16"),
      p(
        "GBP verified · categories · photos · NAP match · reviews · schema · local keywords · mobile speed · map on contact page.",
        "el17",
      ),
      h2("Next step", "el18"),
      p(
        "Combine local, technical and content SEO for full funnel visibility. Free consultation at /kontakti.",
        "el19",
      ),
    ]),
  },
];
