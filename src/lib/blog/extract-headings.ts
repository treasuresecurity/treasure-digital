import GithubSlugger from "github-slugger";
import type { BlogHeading } from "@/lib/blog/types";

/** Strip inline markdown for TOC labels (build-time only). */
function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();
}

/** Extract H2/H3 headings for table of contents — IDs match rehype-slug. */
export function extractHeadings(content: string): BlogHeading[] {
  const slugger = new GithubSlugger();
  const headings: BlogHeading[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;

  for (const match of content.matchAll(regex)) {
    const level = match[1].length;
    const text = stripMarkdown(match[2]);
    if (!text) continue;
    headings.push({ level, text, id: slugger.slug(text) });
  }

  return headings;
}
