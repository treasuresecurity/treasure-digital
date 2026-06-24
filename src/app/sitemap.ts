import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl, getAllSitemapPaths } from "@/lib/site";
import { getAllPostSlugs } from "@/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = getAllSitemapPaths();
  const postSlugs = await getAllPostSlugs();
  const blogPaths = postSlugs.map(({ slug }) => `/blog/${slug}`);
  const paths = [...staticPaths, ...blogPaths];
  const lastModified = new Date();

  return paths.map((path) => ({
    url: absoluteUrl(path, routing.defaultLocale),
    lastModified,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((altLocale) => [
          altLocale,
          absoluteUrl(path, altLocale),
        ]),
      ),
    },
  }));
}
