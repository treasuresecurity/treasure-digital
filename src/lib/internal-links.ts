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
  web: ["onlain-magazin"],
  eshop: ["onlain-magazin"],
  seo: ["onlain-magazin"],
  marketing: ["onlain-magazin"],
  googleAds: ["onlain-magazin"],
};

export const portfolioToServices: Record<PortfolioCase["key"], ServiceKey[]> = {
  finpro: ["app"],
  webShop: ["web", "eshop", "seo", "marketing"],
  sussi: ["app"],
};

export const blogToServices: Record<string, ServiceKey[]> = {
  "onlain-magazin": ["eshop", "web", "seo", "marketing"],
};

export function getPortfolioSlugForService(key: ServiceKey) {
  const caseKey = serviceToPortfolio[key];
  if (!caseKey) return null;
  return PORTFOLIO_SLUGS[caseKey];
}

export function getPortfolioCaseKeyForService(key: ServiceKey) {
  return serviceToPortfolio[key] ?? null;
}
