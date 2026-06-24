import type { ReactNode } from "react";

export interface BlogPostFrontmatter {
  title: string;
  slug: string;
  locale: string;
  category: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  publishedAt: string;
  cover?: string | null;
}

export interface BlogPostListItem extends BlogPostFrontmatter {
  id: string;
}

export interface BlogPost extends BlogPostListItem {
  content: ReactNode;
}

export interface BlogPostSlug {
  slug: string;
  locale: string;
}
