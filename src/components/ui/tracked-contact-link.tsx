"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import {
  pushEmailClick,
  pushPhoneClick,
} from "@/lib/analytics-client";

export function TrackedPhoneLink({
  href,
  location,
  children,
  className,
}: {
  href: string;
  location: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => pushPhoneClick(location)}
    >
      {children}
    </a>
  );
}

export function TrackedEmailLink({
  href,
  location,
  children,
  className,
}: {
  href: string;
  location: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => pushEmailClick(location)}
    >
      {children}
    </a>
  );
}

export function TrackedExternalLink({
  href,
  event,
  location,
  children,
  className,
  ...props
}: {
  href: string;
  event: "phone" | "email";
  location: string;
  children: ReactNode;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">) {
  const onClick =
    event === "phone"
      ? () => pushPhoneClick(location)
      : () => pushEmailClick(location);

  return (
    <a href={href} className={className} onClick={onClick} {...props}>
      {children}
    </a>
  );
}
