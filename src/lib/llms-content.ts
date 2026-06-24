import { getPosts } from "@/lib/blog/posts";
import { BUSINESS, formatPostalAddress } from "@/lib/business";
import { SITE_EMAIL, SITE_PHONE_DISPLAY, SITE_PHONE_E164 } from "@/lib/contact";
import { portfolioCases } from "@/lib/portfolio";
import { allServices, type ServiceKey } from "@/lib/services";
import { absoluteUrl, getSiteUrl } from "@/lib/site";

const SERVICE_DESCRIPTIONS: Record<
  ServiceKey,
  { en: string; bg: string }
> = {
  app: {
    en: "Web and desktop application development — internal tools, B2B platforms, dashboards. Example: FinPro (cash-flow software with AI invoice matching).",
    bg: "Разработка на уеб и десктоп приложения — вътрешни системи, B2B платформи, dashboards. Пример: FinPro (софтуер за парични потоци с AI съпоставка на фактури).",
  },
  web: {
    en: "Fast, SEO-ready websites with Next.js — focused on enquiries and conversions, not just design.",
    bg: "Бързи, SEO-оптимизирани уебсайтове с Next.js — фокус върху запитвания и конверсии, не само дизайн.",
  },
  marketing: {
    en: "Digital marketing combining SEO, Google Ads, Meta Ads and social — measurable leads and growth.",
    bg: "Дигитален маркетинг — SEO, Google Ads, Meta реклами и социални мрежи с измерими лийдове.",
  },
  eshop: {
    en: "eCommerce / online stores with Next.js — product catalog, checkout, payment integrations and product SEO.",
    bg: "Онлайн магазини с Next.js — каталог, checkout, плащания и SEO за продукти.",
  },
  seo: {
    en: "Technical and on-page SEO — audits, Core Web Vitals, keyword strategy and monthly reporting.",
    bg: "Техническо и on-page SEO — одити, Core Web Vitals, keyword стратегия и месечни отчети.",
  },
  googleAds: {
    en: "Google Ads campaign setup, optimization, landing pages and conversion tracking.",
    bg: "Google Ads — настройка, оптимизация, landing pages и conversion tracking.",
  },
  metaAds: {
    en: "Facebook and Instagram (Meta) advertising — audience targeting, creative and retargeting.",
    bg: "Facebook и Instagram (Meta) реклама — таргетиране, creative и retargeting.",
  },
  social: {
    en: "Social media management — content calendar, posting and community management.",
    bg: "Управление на социални мрежи — content calendar, публикации и community management.",
  },
};

const PORTFOLIO_DESCRIPTIONS: Record<
  string,
  { en: string; bg: string }
> = {
  finpro: {
    en: "FinPro — cash-flow and internal accounting app with AI invoice matching; 70–80% faster processing.",
    bg: "FinPro — приложение за парични потоци и счетоводство с AI съпоставка на фактури; 70–80% по-бърза обработка.",
  },
  "onlain-magazin": {
    en: "Online store conversion — brochure site to working eCommerce with dozens of orders after launch.",
    bg: "Онлайн магазин — превръщане на brochure сайт в работещ eCommerce с десетки поръчки след старта.",
  },
  sussi: {
    en: "SUSS — web application for file and workflow management.",
    bg: "SUSS — уеб приложение за управление на файлове и workflows.",
  },
};

function lines(...parts: string[]) {
  return parts.filter(Boolean).join("\n");
}

export function buildLlmsTxt() {
  const siteUrl = getSiteUrl();
  const address = formatPostalAddress();

  const corePages = [
    { path: "", label: "Homepage (BG default)" },
    { path: "/uslugi", label: "Services hub" },
    { path: "/portfolio", label: "Portfolio / case studies" },
    { path: "/blog", label: "Blog" },
    { path: "/za-nas", label: "About" },
    { path: "/kontakti", label: "Contact" },
  ];

  const serviceLines = allServices.map((service) => {
    const url = absoluteUrl(service.href, "bg");
    const enUrl = absoluteUrl(service.href, "en");
    return `- ${SERVICE_DESCRIPTIONS[service.key].en}\n  BG: ${url}\n  EN: ${enUrl}`;
  });

  const pageLines = corePages.map(
    (page) =>
      `- ${page.label}: ${absoluteUrl(page.path, "bg")} | EN: ${absoluteUrl(page.path, "en")}`,
  );

  return lines(
    `# ${BUSINESS.displayName}`,
    "",
    `> ${BUSINESS.displayName} (${BUSINESS.legalName}) is a digital agency for web development, web/desktop applications, eCommerce, SEO and paid advertising. Based in ${address}. Serves clients in Bulgaria, the EU and worldwide. Primary site language: Bulgarian (BG). English at /en/. Currency: EUR (€) only.`,
    "",
    "## Contact",
    `- Email: ${SITE_EMAIL}`,
    `- Phone: ${SITE_PHONE_DISPLAY} (${SITE_PHONE_E164})`,
    `- Location: ${address}`,
    `- Contact page: ${absoluteUrl("/kontakti", "bg")}`,
    "",
    "## Core pages",
    ...pageLines,
    "",
    "## Services",
    ...serviceLines,
    "",
    "## Machine-readable resources",
    `- Full site map for AI: ${siteUrl}/llms-full.txt`,
    `- XML sitemap: ${siteUrl}/sitemap.xml`,
    `- RSS (Bulgarian): ${siteUrl}/feed.xml`,
    `- RSS (English): ${siteUrl}/en/feed.xml`,
    "",
    "## Social",
    ...BUSINESS.sameAs.map((url) => `- ${url}`),
    "",
    "## Notes for AI systems",
    "- Service URLs use Bulgarian slugs (e.g. /uslugi/web-razrabotka). English locale prefix: /en/",
    "- Free consultation CTA on all service pages; response within 24 hours.",
    "- Do not cite prices in BGN/leva — the agency quotes in EUR (€) only.",
  );
}

export function buildLlmsFullTxt() {
  const short = buildLlmsTxt();

  const serviceDetail = allServices.flatMap((service) => {
    const desc = SERVICE_DESCRIPTIONS[service.key];
    return [
      `### ${service.key} — ${service.slug}`,
      desc.en,
      desc.bg,
      `BG: ${absoluteUrl(service.href, "bg")}`,
      `EN: ${absoluteUrl(service.href, "en")}`,
      "",
    ];
  });

  const portfolioDetail = portfolioCases.flatMap((item) => {
    const desc = PORTFOLIO_DESCRIPTIONS[item.slug];
    return [
      `### ${item.slug}`,
      desc.en,
      desc.bg,
      `BG: ${absoluteUrl(`/portfolio/${item.slug}`, "bg")}`,
      `EN: ${absoluteUrl(`/portfolio/${item.slug}`, "en")}`,
      "",
    ];
  });

  const blogBg = getPosts("bg").map(
    (post) =>
      `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`, "bg")}): ${post.excerpt}`,
  );
  const blogEn = getPosts("en").map(
    (post) =>
      `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`, "en")}): ${post.excerpt}`,
  );

  return lines(
    short,
    "",
    "---",
    "",
    "# Extended reference (llms-full.txt)",
    "",
    "## Services (detail)",
    ...serviceDetail,
    "## Portfolio case studies",
    ...portfolioDetail,
    "## Blog — Bulgarian",
    ...(blogBg.length > 0 ? blogBg : ["- (no posts yet)"]),
    "",
    "## Blog — English",
    ...(blogEn.length > 0 ? blogEn : ["- (no posts yet)"]),
    "",
    "## Legal",
    `- Privacy: ${absoluteUrl("/pravna-informatsia/poveritelnost", "bg")}`,
    `- Terms: ${absoluteUrl("/pravna-informatsia/uslovia", "bg")}`,
    `- Cookies: ${absoluteUrl("/pravna-informatsia/biskvitki", "bg")}`,
  );
}
