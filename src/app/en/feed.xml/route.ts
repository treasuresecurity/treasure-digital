import { getPosts } from "@/lib/blog/posts";
import { absoluteUrl } from "@/lib/site";
import { SITE_EMAIL } from "@/lib/contact";
import { BUSINESS } from "@/lib/business";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getPosts("en");
  const siteUrl = absoluteUrl("", "en");
  const buildDate = new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`, "en");
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <category>${escapeXml(post.category)}</category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(BUSINESS.displayName)} — Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Articles on web development, SEO and digital marketing from ${escapeXml(BUSINESS.displayName)}.</description>
    <language>en</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>${SITE_EMAIL} (${escapeXml(BUSINESS.displayName)})</managingEditor>
    <webMaster>${SITE_EMAIL} (${escapeXml(BUSINESS.displayName)})</webMaster>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
