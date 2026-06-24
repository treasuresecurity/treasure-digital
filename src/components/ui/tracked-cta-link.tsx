"use client";

import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { pushCtaClick } from "@/lib/analytics-client";

export function TrackedCtaLink({
  href,
  location,
  children,
  className,
  ...props
}: {
  href: ComponentProps<typeof Link>["href"];
  location: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "onClick">) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => pushCtaClick(location)}
      {...props}
    >
      {children}
    </Link>
  );
}
