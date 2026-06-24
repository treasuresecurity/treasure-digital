/** Internal linking map for SEO — services ↔ portfolio ↔ blog. */
import type { ServiceKey } from "@/lib/services";
import type { PortfolioCase } from "@/lib/portfolio";

export const serviceToPortfolio: Partial<Record<ServiceKey, PortfolioCase["key"]>> = {
  app: "finpro",
  web: "webShop",
  eshop: "webShop",
};

export const PORTFOLIO_SLUGS: Record<PortfolioCase["key"], string> = {
  finpro: "finpro",
  webShop: "onlain-magazin",
  sussi: "sussi",
};

export const serviceToBlog: Partial<Record<ServiceKey, string[]>> = {
  web: ["online-magazin-seo-konversii-navodnik"],
  eshop: ["online-magazin-seo-konversii-navodnik"],
  seo: [
    "tekhnichesko-seo-navodnik-bulgaria-2026",
    "lokalno-seo-bulgaria-google-business-profile",
  ],
  marketing: [
    "online-magazin-seo-konversii-navodnik",
    "lokalno-seo-bulgaria-google-business-profile",
  ],
  googleAds: ["online-magazin-seo-konversii-navodnik"],
};

export const portfolioToServices: Record<PortfolioCase["key"], ServiceKey[]> = {
  finpro: ["app"],
  webShop: ["web", "eshop", "seo", "marketing"],
  sussi: ["app"],
};

export const blogToServices: Record<string, ServiceKey[]> = {
  "tekhnichesko-seo-navodnik-bulgaria-2026": ["seo", "web"],
  "online-magazin-seo-konversii-navodnik": ["eshop", "web", "seo"],
  "lokalno-seo-bulgaria-google-business-profile": ["seo", "marketing"],
};

export function getPortfolioSlugForService(key: ServiceKey) {
  const caseKey = serviceToPortfolio[key];
  if (!caseKey) return null;
  return PORTFOLIO_SLUGS[caseKey];
}

export function getPortfolioCaseKeyForService(key: ServiceKey) {
  return serviceToPortfolio[key] ?? null;
}
