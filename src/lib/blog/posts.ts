import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { blogMdxComponents } from "@/lib/blog/mdx-components";
import { blogRehypePlugins, blogRemarkPlugins } from "@/lib/blog/mdx-plugins";
import { extractHeadings } from "@/lib/blog/extract-headings";
import { readingTimeMinutes } from "@/lib/blog/reading-time";
import type {
  BlogPost,
  BlogPostFrontmatter,
  BlogPostListItem,
  BlogPostSlug,
} from "@/lib/blog/types";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

function localeDir(locale: string) {
  return path.join(CONTENT_DIR, locale);
}

function normalizePublishedAt(value: unknown): string | null {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string") {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
  }
  return null;
}

function resolveCover(value: unknown): string | null {
  if (typeof value !== "string" || !value.startsWith("/")) return null;
  const filePath = path.join(process.cwd(), "public", value.replace(/^\//, ""));
  return fs.existsSync(filePath) ? value : null;
}

function readFrontmatter(filePath: string): BlogPostFrontmatter | null {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);
  const locale = path.basename(path.dirname(filePath));

  if (data.draft === true) return null;

  const slug =
    typeof data.slug === "string"
      ? data.slug
      : path.basename(filePath, ".mdx");

  const publishedAt = normalizePublishedAt(data.publishedAt ?? data.date);
  const title = typeof data.title === "string" ? data.title : null;
  const excerpt =
    typeof data.excerpt === "string"
      ? data.excerpt
      : typeof data.description === "string"
        ? data.description
        : null;

  if (!title || !slug || !publishedAt || !excerpt) return null;

  const category =
    typeof data.category === "string"
      ? data.category
      : Array.isArray(data.tags) && data.tags.length > 0
        ? String(data.tags[0])
        : "Blog";

  const cover = resolveCover(data.cover ?? data.coverImage);

  const seoTitle =
    typeof data.seoTitle === "string"
      ? data.seoTitle
      : `${title} | Treasure Digital`;

  const seoDescription =
    typeof data.seoDescription === "string" ? data.seoDescription : excerpt;

  const updatedAt = normalizePublishedAt(data.updatedAt ?? data.updated);

  return {
    title,
    slug,
    locale: typeof data.locale === "string" ? data.locale : locale,
    category,
    excerpt,
    seoTitle,
    seoDescription,
    publishedAt,
    updatedAt,
    cover,
  };
}

function listMdxFiles(locale: string): string[] {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.join(dir, file));
}

function toListItem(
  filePath: string,
  data: BlogPostFrontmatter,
): BlogPostListItem {
  return {
    ...data,
    id: `${data.locale}-${data.slug}`,
  };
}

export function getPosts(locale: string): BlogPostListItem[] {
  return listMdxFiles(locale)
    .map((filePath) => {
      const data = readFrontmatter(filePath);
      return data ? toListItem(filePath, data) : null;
    })
    .filter((post): post is BlogPostListItem => post !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getPostMetaBySlug(
  slug: string,
  locale: string,
): BlogPostListItem | null {
  const filePath = path.join(localeDir(locale), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const data = readFrontmatter(filePath);
  return data ? toListItem(filePath, data) : null;
}

export async function getPostBySlug(
  slug: string,
  locale: string,
): Promise<BlogPost | null> {
  const filePath = path.join(localeDir(locale), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const frontmatter = readFrontmatter(filePath);
  if (!frontmatter) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);

  const { content: mdxContent } = await compileMDX({
    source: content,
    components: blogMdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: blogRemarkPlugins,
        rehypePlugins: blogRehypePlugins,
      },
    },
  });

  return {
    ...toListItem(filePath, frontmatter),
    content: mdxContent,
    headings: extractHeadings(content),
    readingTimeMinutes: readingTimeMinutes(content),
  };
}

export function getAllPostSlugs(): BlogPostSlug[] {
  const locales = fs.existsSync(CONTENT_DIR)
    ? fs.readdirSync(CONTENT_DIR).filter((entry) =>
        fs.statSync(path.join(CONTENT_DIR, entry)).isDirectory(),
      )
    : [];

  return locales.flatMap((locale) =>
    listMdxFiles(locale)
      .map((filePath) => {
        const data = readFrontmatter(filePath);
        return data ? { slug: data.slug, locale } : null;
      })
      .filter((item): item is BlogPostSlug => item !== null),
  );
}
