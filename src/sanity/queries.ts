import type { BlogPost, BlogPostListItem, BlogPostSlug } from "./types";
import {
  getSeedPostBySlug,
  getSeedPosts,
  getSeedPostSlugs,
} from "@/lib/blog-seed";
import { isSanityConfigured, sanityClient } from "./client";

const postListFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  publishedAt,
  cover
`;

const postDetailFields = `
  ${postListFields},
  body,
  seoTitle,
  seoDescription
`;

export async function getPosts(locale: string): Promise<BlogPostListItem[]> {
  if (isSanityConfigured()) {
    const posts = await sanityClient.fetch<BlogPostListItem[]>(
      `*[_type == "post" && locale == $locale && defined(slug.current)] | order(publishedAt desc) {
        ${postListFields}
      }`,
      { locale },
      { next: { tags: [`posts-${locale}`] } },
    );
    if (posts.length > 0) return posts;
  }

  return getSeedPosts(locale);
}

export async function getPostBySlug(
  slug: string,
  locale: string,
): Promise<BlogPost | null> {
  if (isSanityConfigured()) {
    const post = await sanityClient.fetch<BlogPost | null>(
      `*[_type == "post" && slug.current == $slug && locale == $locale][0] {
        ${postDetailFields}
      }`,
      { slug, locale },
      { next: { tags: [`post-${locale}-${slug}`] } },
    );
    if (post) return post;
  }

  return getSeedPostBySlug(slug, locale);
}

export async function getAllPostSlugs(): Promise<BlogPostSlug[]> {
  if (isSanityConfigured()) {
    const slugs = await sanityClient.fetch<BlogPostSlug[]>(
      `*[_type == "post" && defined(slug.current)] {
        "slug": slug.current,
        locale
      }`,
      {},
      { next: { tags: ["post-slugs"] } },
    );
    if (slugs.length > 0) return slugs;
  }

  return getSeedPostSlugs();
}
