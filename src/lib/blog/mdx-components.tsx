import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Callout } from "@/components/ui/callout";
import { Figure } from "@/components/ui/figure";

export const blogMdxComponents: MDXComponents = {
  Callout,
  Figure,
  blockquote: ({ children }) => (
    <blockquote className="not-prose my-8 rounded-2xl border border-border border-l-4 border-l-primary bg-surface px-5 py-4 text-body text-text [&>p:last-child]:mb-0">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="not-prose my-8 overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[32rem] border-collapse text-left text-body">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-surface-2 text-text">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="border-b border-border px-4 py-3 font-semibold text-text">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-border px-4 py-3 text-text">{children}</td>
  ),
  tr: ({ children }) => <tr className="even:bg-surface/50">{children}</tr>,
  a: ({ href, children }) => {
    if (!href) return <>{children}</>;
    const external = href.startsWith("http");
    if (external) {
      return (
        <a
          href={href}
          className="font-medium text-primary underline-offset-4 transition-colors duration-200 ease-brand hover:text-brand-blue-600 hover:underline"
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
        className="font-medium text-primary underline-offset-4 transition-colors duration-200 ease-brand hover:text-brand-blue-600 hover:underline"
      >
        {children}
      </Link>
    );
  },
  img: ({ src, alt }) => {
    if (!src || typeof src !== "string") return null;
    return (
      <Figure
        src={src}
        alt={alt ?? ""}
        caption={alt ?? undefined}
      />
    );
  },
  hr: () => <hr className="my-10 border-border" />,
};
