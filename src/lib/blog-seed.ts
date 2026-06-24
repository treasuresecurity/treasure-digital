import type { BlogPost, BlogPostListItem, BlogPostSlug } from "@/sanity/types";
import postsData from "../../data/blog-posts.json";

type SeedPost = BlogPost & { locale: string };

const seedPosts = postsData as SeedPost[];

export function getSeedPosts(locale: string): BlogPostListItem[] {
  return seedPosts
    .filter((post) => post.locale === locale)
    .map(({ body: _body, seoTitle: _seoTitle, seoDescription: _seoDescription, locale: _locale, ...item }) => item);
}

export function getSeedPostBySlug(
  slug: string,
  locale: string,
): BlogPost | null {
  const post = seedPosts.find((p) => p.slug === slug && p.locale === locale);
  if (!post) return null;
  const { locale: _locale, ...rest } = post;
  return rest;
}

export function getSeedPostSlugs(): BlogPostSlug[] {
  return seedPosts.map(({ slug, locale }) => ({ slug, locale }));
}
