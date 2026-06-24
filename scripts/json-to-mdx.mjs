/**
 * One-time converter: data/blog-posts.json → content/blog/{locale}/{slug}.mdx
 * Run: node scripts/json-to-mdx.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const posts = JSON.parse(
  fs.readFileSync(path.join(root, "data/blog-posts.json"), "utf8"),
);

/** @param {unknown[]} blocks */
function portableTextToMdx(blocks) {
  return blocks
    .map((block) => {
      if (!block || typeof block !== "object") return "";
      const b = /** @type {{ _type?: string; style?: string; children?: { text?: string }[] }} */ (
        block
      );
      if (b._type !== "block") return "";
      const text = (b.children ?? [])
        .map((c) => c.text ?? "")
        .join("")
        .trim();
      if (!text) return "";
      switch (b.style) {
        case "h2":
          return `## ${text}\n`;
        case "h3":
          return `### ${text}\n`;
        case "blockquote":
          return `> ${text}\n`;
        default:
          return `${text}\n`;
      }
    })
    .join("\n")
    .trim();
}

/** @param {string} value */
function yamlQuote(value) {
  return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

for (const post of posts) {
  const dir = path.join(root, "content/blog", post.locale);
  fs.mkdirSync(dir, { recursive: true });

  const frontmatter = [
    "---",
    `title: ${yamlQuote(post.title)}`,
    `slug: ${post.slug}`,
    `locale: ${post.locale}`,
    `category: ${yamlQuote(post.category)}`,
    `excerpt: ${yamlQuote(post.excerpt)}`,
    `seoTitle: ${yamlQuote(post.seoTitle ?? post.title)}`,
    `seoDescription: ${yamlQuote(post.seoDescription ?? post.excerpt)}`,
    `publishedAt: ${post.publishedAt}`,
    "---",
    "",
  ].join("\n");

  const body = portableTextToMdx(post.body);
  const filePath = path.join(dir, `${post.slug}.mdx`);
  fs.writeFileSync(filePath, `${frontmatter}${body}\n`, "utf8");
  console.log(`Wrote ${path.relative(root, filePath)}`);
}

console.log(`Done — ${posts.length} MDX files.`);
