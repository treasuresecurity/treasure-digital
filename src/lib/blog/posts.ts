import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { blogMdxComponents } from "@/lib/blog/mdx-components";
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

function readFrontmatter(filePath: string): BlogPostFrontmatter | null {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);
  if (!data.title || !data.slug || !data.publishedAt) return null;
  return data as BlogPostFrontmatter;
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

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogPostFrontmatter;

  const { content: mdxContent } = await compileMDX({
    source: content,
    components: blogMdxComponents,
    options: { parseFrontmatter: false },
  });

  return {
    ...toListItem(filePath, frontmatter),
    content: mdxContent,
  };
}

export function getAllPostSlugs(): BlogPostSlug[] {
  const locales = fs.existsSync(CONTENT_DIR)
    ? fs.readdirSync(CONTENT_DIR).filter((entry) =>
        fs.statSync(path.join(CONTENT_DIR, entry)).isDirectory(),
      )
    : [];

  return locales.flatMap((locale) =>
    listMdxFiles(locale).map((filePath) => {
      const data = readFrontmatter(filePath)!;
      return { slug: data.slug, locale };
    }),
  );
}
