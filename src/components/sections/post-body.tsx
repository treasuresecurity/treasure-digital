import Image from "next/image";
import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { urlFor } from "@/sanity/image";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-display text-h2 font-bold tracking-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-h3 font-bold tracking-tight">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="measure text-body text-text">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="measure border-l-2 border-primary pl-4 text-body italic text-text-muted">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href as string | undefined;
      if (!href) return <>{children}</>;
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-primary underline-offset-4 transition-colors hover:text-brand-blue-600 hover:underline"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const alt = (value.alt as string | undefined) ?? "";
      const width =
        (value.asset as { metadata?: { dimensions?: { width?: number } } })
          ?.metadata?.dimensions?.width ?? 1200;
      const height =
        (value.asset as { metadata?: { dimensions?: { height?: number } } })
          ?.metadata?.dimensions?.height ?? 675;
      const src = urlFor(value).width(1200).quality(85).url();
      return (
        <figure className="overflow-hidden rounded-2xl border border-border bg-surface">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
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
  },
};

export function PostBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      <PortableText value={value} components={components} />
    </div>
  );
}
