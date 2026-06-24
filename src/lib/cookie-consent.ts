export const CONSENT_COOKIE = "td-cookie-consent";

export type CookieConsentValue = "necessary" | "analytics" | "all";

const MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export function parseConsentCookie(value: string | undefined): CookieConsentValue | null {
  if (value === "necessary" || value === "analytics" || value === "all") return value;
  return null;
}

export function hasAnalyticsConsent(value: CookieConsentValue | null) {
  return value === "analytics" || value === "all";
}

/** Client-only — read consent from document.cookie */
export function getConsentFromDocument(): CookieConsentValue | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE}=`));
  if (!match) return null;
  return parseConsentCookie(decodeURIComponent(match.split("=")[1]));
}

export function setConsentCookie(value: CookieConsentValue) {
  if (typeof document === "undefined") return;
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(value)}; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent("cookie-consent-updated", { detail: value }));
}

export function consentCookieHeader(value: CookieConsentValue) {
  return `${CONSENT_COOKIE}=${encodeURIComponent(value)}; Path=/; Max-Age=${MAX_AGE_SECONDS}; SameSite=Lax`;
}
