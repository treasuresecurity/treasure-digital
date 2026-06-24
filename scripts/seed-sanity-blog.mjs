/**
 * Publish comprehensive blog posts to Sanity.
 * Requires Editor API token: sanity.io/manage → API → Tokens
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=sk... node scripts/seed-sanity-blog.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { createClient } from "@sanity/client";

function loadEnvLocal() {
  const envPath = join(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq);
    const value = trimmed.slice(eq + 1);
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "2k5y6uzc";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

function resolveToken() {
  if (process.env.SANITY_API_WRITE_TOKEN) return process.env.SANITY_API_WRITE_TOKEN;
  try {
    const configPath = join(homedir(), ".config", "sanity", "config.json");
    const config = JSON.parse(readFileSync(configPath, "utf8"));
    if (config.authToken) return config.authToken;
  } catch {
    /* no CLI token */
  }
  return null;
}

const token = resolveToken();
if (!token) {
  console.error(
    "Missing Sanity write token.\n\n" +
      "1. Go to https://sanity.io/manage/project/" +
      projectId +
      "/api\n" +
      "2. Create token with Editor permissions\n" +
      "3. Run: SANITY_API_WRITE_TOKEN=sk... node scripts/seed-sanity-blog.mjs\n\n" +
      "Or import manually: npx sanity dataset import data/blog-posts.ndjson production --replace",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const posts = JSON.parse(readFileSync(join(process.cwd(), "data/blog-posts.json"), "utf8"));

const documents = posts.map((post) => ({
  _id: post._id,
  _type: "post",
  title: post.title,
  slug: { _type: "slug", current: post.slug },
  locale: post.locale,
  category: post.category,
  excerpt: post.excerpt,
  publishedAt: post.publishedAt,
  body: post.body,
  seoTitle: post.seoTitle,
  seoDescription: post.seoDescription,
}));

console.log(`Publishing ${documents.length} posts to ${projectId}/${dataset}...`);

for (const doc of documents) {
  await client.createOrReplace(doc);
  console.log(`  ✓ [${doc.locale}] ${doc.title}`);
}

console.log("\nDone. Open /blog to verify (Sanity posts override seed when present).");
