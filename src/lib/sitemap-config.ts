/** Sitemap priority and changeFrequency by path pattern. */
export function sitemapPriority(path: string): number {
  if (path === "") return 1;
  if (path === "/kontakti") return 0.9;
  if (path.startsWith("/uslugi/")) return 0.9;
  if (path === "/uslugi") return 0.85;
  if (path.startsWith("/portfolio/")) return 0.8;
  if (path === "/portfolio") return 0.75;
  if (path.startsWith("/blog/")) return 0.7;
  if (path === "/blog") return 0.65;
  if (path === "/za-nas") return 0.6;
  if (path.startsWith("/pravna-informatsia/")) return 0.3;
  return 0.5;
}

export function sitemapChangeFrequency(
  path: string,
): "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" {
  if (path === "") return "weekly";
  if (path.startsWith("/blog")) return "monthly";
  if (path.startsWith("/pravna-informatsia/")) return "yearly";
  return "monthly";
}
