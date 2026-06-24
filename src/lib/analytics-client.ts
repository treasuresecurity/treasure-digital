"use client";

import {
  getConsentFromDocument,
  hasAnalyticsConsent,
} from "@/lib/cookie-consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

function pushEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent(getConsentFromDocument())) return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: eventName, ...params });
  window.gtag?.("event", eventName, params);
}

/** GA4 recommended lead event — contact form, audit form, etc. */
export function pushLeadEvent(source: string) {
  pushEvent("generate_lead", { lead_source: source });
}

export function pushCtaClick(location: string) {
  pushEvent("cta_click", { cta_location: location });
}

export function pushPhoneClick(location: string) {
  pushEvent("phone_click", { link_location: location });
}

export function pushEmailClick(location: string) {
  pushEvent("email_click", { link_location: location });
}
