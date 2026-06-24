import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { blogCoverAlt } from "@/lib/image-alt";
import type { BlogPostListItem } from "@/sanity/types";
import { urlFor } from "@/sanity/image";

export async function BlogPostCard({
  post,
  locale,
}: {
  post: BlogPostListItem;
  locale: string;
}) {
  const t = await getTranslations("blogPage");
  const coverUrl = post.cover
    ? urlFor(post.cover).width(800).height(450).quality(90).url()
    : null;
  const formattedDate = formatPostDate(post.publishedAt, locale);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 ease-brand hover:-translate-y-1"
    >
      <div className="relative aspect-video overflow-hidden border-b border-border bg-surface-2">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={blogCoverAlt(post.title)}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-300 ease-brand group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 opacity-25 [background:var(--gradient-brand)]" />
        )}
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-border bg-bg/90 px-3 py-1 text-small text-text-muted backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <time
          dateTime={post.publishedAt}
          className="inline-flex items-center gap-1.5 text-small text-text-muted"
        >
          <CalendarDays className="h-4 w-4" aria-hidden />
          {formattedDate}
        </time>
        <h2 className="font-display text-h3 font-bold tracking-tight">{post.title}</h2>
        <p className="line-clamp-3 text-body text-text-muted">{post.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 text-small font-medium text-primary">
          {t("readPost")}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

function formatPostDate(isoDate: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "bg" ? "bg-BG" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}
