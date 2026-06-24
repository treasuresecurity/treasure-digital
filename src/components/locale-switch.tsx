"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitch({ className }: { className?: string }) {
  const activeLocale = useLocale();
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-btn border border-border bg-surface p-1",
        className,
      )}
    >
      {routing.locales.map((locale) => (
        <Link
          key={locale}
          href={pathname}
          locale={locale}
          aria-current={locale === activeLocale ? "true" : undefined}
          className={cn(
            "rounded-md px-3 py-1 text-small font-medium uppercase transition-colors",
            locale === activeLocale
              ? "bg-primary text-primary-foreground"
              : "text-text-muted hover:text-text",
          )}
        >
          {locale}
        </Link>
      ))}
    </div>
  );
}
