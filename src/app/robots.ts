import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

/** AI crawlers are allowed by default — only /api/ is disallowed. */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
