"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/lib/nav";
import { Logo } from "./logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitch } from "@/components/locale-switch";
import { buttonVariants } from "@/components/ui/button";
import { pushCtaClick } from "@/components/seo/google-tag-manager";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/70 backdrop-blur-lg">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-6">
        <Logo label={tc("siteName")} />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 lg:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-small font-medium text-text-muted transition-colors hover:text-text"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitch className="hidden sm:inline-flex" />
          <ThemeToggle className="hidden sm:inline-flex" />
          <Link
            href="/kontakti"
            onClick={() => pushCtaClick("header_desktop")}
            className={cn(buttonVariants({ size: "sm" }), "hidden md:inline-flex")}
          >
            {tc("cta")}
          </Link>
          <button
            type="button"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-btn border border-border bg-surface text-text transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-bg lg:hidden">
          <nav
            aria-label="Mobile"
            className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-6 py-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-body font-medium text-text-muted transition-colors hover:bg-surface hover:text-text"
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="mt-3 flex items-center justify-between gap-3">
              <LocaleSwitch />
              <ThemeToggle />
            </div>
            <Link
              href="/kontakti"
              onClick={() => {
                pushCtaClick("header_mobile");
                setOpen(false);
              }}
              className={cn(buttonVariants(), "mt-2 w-full")}
            >
              {tc("cta")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
