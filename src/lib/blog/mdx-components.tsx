import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export const blogMdxComponents: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="font-display text-h2 font-bold tracking-tight">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-display text-h3 font-bold tracking-tight">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="measure text-body text-text">{children}</p>
  ),
  blockquote: ({ children }) => (
    <blockquote className="measure border-l-2 border-primary pl-4 text-body italic text-text-muted">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => {
    if (!href) return <>{children}</>;
    const external = href.startsWith("http");
    if (external) {
      return (
        <a
          href={href}
          className="text-primary underline-offset-4 transition-colors hover:text-brand-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className="text-primary underline-offset-4 transition-colors hover:text-brand-blue-600 hover:underline"
      >
        {children}
      </Link>
    );
  },
  img: ({ src, alt }) => {
    if (!src || typeof src !== "string") return null;
    return (
      <figure className="overflow-hidden rounded-2xl border border-border bg-surface">
        <Image
          src={src}
          alt={alt ?? ""}
          width={1200}
          height={675}
          loading="lazy"
          className="h-auto w-full object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
        {alt && (
          <figcaption className="border-t border-border px-4 py-3 text-small text-text-muted">
            {alt}
          </figcaption>
        )}
      </figure>
    );
  },
};
