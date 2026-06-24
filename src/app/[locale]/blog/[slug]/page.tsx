import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { BlogRelatedLinks } from "@/components/sections/internal-links";
import { BlogPostingJsonLd } from "@/components/seo/blog-posting-json-ld";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { blogCoverAlt } from "@/lib/image-alt";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog/posts";
import { buildPageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site";

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map(({ slug, locale }) => ({ locale, slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale);
  if (!post) return {};

  return buildPageMetadata({
    path: `/blog/${slug}`,
    locale,
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPostBySlug(slug, locale);
  if (!post) notFound();

  const t = await getTranslations("blogPage");
  const tn = await getTranslations("nav");
  const formattedDate = new Intl.DateTimeFormat(
    locale === "bg" ? "bg-BG" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" },
  ).format(new Date(post.publishedAt));
  const articleUrl = absoluteUrl(`/blog/${slug}`, locale);
  const coverUrl = post.cover ?? null;

  return (
    <main id="main" className="mx-auto w-full max-w-7xl px-6 py-16 lg:py-24">
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: tn("home"), path: "" },
          { name: t("breadcrumb"), path: "/blog" },
          { name: post.title, path: `/blog/${slug}` },
        ]}
      />
      <BlogPostingJsonLd
        title={post.title}
        description={post.excerpt}
        url={articleUrl}
        publishedAt={post.publishedAt}
        imageUrl={coverUrl ?? undefined}
      />

      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-small font-medium text-text-muted transition-colors hover:text-text"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("backToBlog")}
      </Link>

      <article className="mt-8">
        <header className="flex flex-col gap-6 border-b border-border pb-10">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-small text-text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {post.category}
          </span>

          <h1 className="measure text-balance font-display text-h1 font-bold tracking-tight">
            {post.title}
          </h1>

          <p className="measure text-body text-text-muted">{post.excerpt}</p>

          <time
            dateTime={post.publishedAt}
            className="inline-flex items-center gap-1.5 text-small text-text-muted"
          >
            <CalendarDays className="h-4 w-4" aria-hidden />
            {formattedDate}
          </time>
        </header>

        {coverUrl && (
          <div className="relative mt-10 aspect-video overflow-hidden rounded-2xl border border-border bg-surface-2">
            <Image
              src={coverUrl}
              alt={blogCoverAlt(post.title)}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        )}

        <div className="measure mt-10 flex flex-col gap-6">{post.content}</div>

        <BlogRelatedLinks slug={slug} />
      </article>
    </main>
  );
}
