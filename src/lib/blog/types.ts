import type { ReactNode } from "react";

export interface BlogHeading {
  level: number;
  text: string;
  id: string;
}

export interface BlogPostFrontmatter {
  title: string;
  slug: string;
  locale: string;
  category: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  publishedAt: string;
  updatedAt?: string | null;
  cover?: string | null;
}

export interface BlogPostListItem extends BlogPostFrontmatter {
  id: string;
}

export interface BlogPost extends BlogPostListItem {
  content: ReactNode;
  headings: BlogHeading[];
  readingTimeMinutes: number;
}

export interface BlogPostSlug {
  slug: string;
  locale: string;
}
