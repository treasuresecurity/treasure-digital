import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPosts } from "@/sanity/queries";
import { BlogPostCard } from "@/components/sections/blog-post-card";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { buildAlternates } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blogPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates("/blog"),
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blogPage");
  const tn = await getTranslations("nav");
  const posts = await getPosts(locale);

  return (
    <main id="main" className="mx-auto w-full max-w-7xl px-6 py-16 lg:py-24">
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: tn("home"), path: "" },
          { name: t("breadcrumb"), path: "/blog" },
        ]}
      />

      <header className="measure flex flex-col gap-4">
        <span className="inline-flex items-center gap-2 text-small font-medium uppercase tracking-wider text-text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {t("eyebrow")}
        </span>
        <h1 className="text-balance font-display text-h1 font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-body text-text-muted">{t("subtitle")}</p>
      </header>

      {posts.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post._id} post={post} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-2xl border border-border bg-surface p-8 sm:p-10">
          <h2 className="font-display text-h3 font-bold tracking-tight">
            {t("emptyTitle")}
          </h2>
          <p className="measure mt-3 text-body text-text-muted">{t("emptyText")}</p>
        </div>
      )}
    </main>
  );
}
