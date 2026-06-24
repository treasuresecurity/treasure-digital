import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl, getAllSitemapPaths } from "@/lib/site";
import {
  sitemapChangeFrequency,
  sitemapPriority,
} from "@/lib/sitemap-config";
import { getAllPostSlugs } from "@/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = getAllSitemapPaths();
  const postSlugs = await getAllPostSlugs();
  const uniqueBlogSlugs = [...new Set(postSlugs.map(({ slug }) => slug))];
  const blogPaths = uniqueBlogSlugs.map((slug) => `/blog/${slug}`);
  const paths = [...staticPaths, ...blogPaths];
  const lastModified = new Date();

  const hreflangAlternates = (path: string) =>
    Object.fromEntries(
      routing.locales.map((altLocale) => [
        altLocale,
        absoluteUrl(path, altLocale),
      ]),
    );

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: absoluteUrl(path, locale),
      lastModified,
      changeFrequency: sitemapChangeFrequency(path),
      priority: sitemapPriority(path),
      alternates: {
        languages: hreflangAlternates(path),
      },
    })),
  );
}
