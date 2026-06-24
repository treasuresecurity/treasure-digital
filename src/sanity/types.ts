import type { PortableTextBlock } from "@portabletext/types";

export interface SanityImageAsset {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface BlogPostListItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  cover?: SanityImageAsset | null;
}

export interface BlogPost extends BlogPostListItem {
  body: PortableTextBlock[];
  seoTitle?: string | null;
  seoDescription?: string | null;
}

export interface BlogPostSlug {
  slug: string;
  locale: string;
}
