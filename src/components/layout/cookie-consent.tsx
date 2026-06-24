"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  getConsentFromDocument,
  hasAnalyticsConsent,
  setConsentCookie,
  type CookieConsentValue,
} from "@/lib/cookie-consent";

export function GoogleTagManager() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const sync = () => {
      setEnabled(hasAnalyticsConsent(getConsentFromDocument()));
    };
    sync();
    window.addEventListener("cookie-consent-updated", sync);
    return () => window.removeEventListener("cookie-consent-updated", sync);
  }, []);

  if (!gtmId || !enabled) return null;

  return (
    <>
      <Script id="gtm-init" strategy="afterInteractive">{`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `}</Script>
      <noscript>
        <iframe
          title="Google Tag Manager"
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}

/** Push a lead event to dataLayer — only when analytics consent is granted. */
export function pushLeadEvent(source: string) {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent(getConsentFromDocument())) return;
  const w = window as Window & { dataLayer?: Record<string, string>[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event: "lead", lead_source: source });
}

export function CookieConsentBanner() {
  const t = useTranslations("cookieConsent");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getConsentFromDocument() === null);
  }, []);

  const save = (value: CookieConsentValue) => {
    setConsentCookie(value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/95 p-4 backdrop-blur-md sm:p-6"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="measure flex flex-col gap-2">
          <p
            id="cookie-consent-title"
            className="font-display text-h3 font-bold tracking-tight"
          >
            {t("title")}
          </p>
          <p id="cookie-consent-desc" className="text-body text-text-muted">
            {t("description")}{" "}
            <Link
              href="/pravna-informatsia/biskvitki"
              className="text-primary underline-offset-4 hover:underline"
            >
              {t("policyLink")}
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:shrink-0">
          <Button
            type="button"
            variant="secondary"
            onClick={() => save("necessary")}
          >
            {t("necessaryOnly")}
          </Button>
          <Button type="button" onClick={() => save("all")}>
            {t("acceptAll")}
          </Button>
        </div>
      </div>
    </div>
  );
}
