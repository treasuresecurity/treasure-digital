/** Central contact details — single source of truth. */
export const SITE_EMAIL = "office@treasure-sec.com";

export const SITE_PHONE_E164 = "+359885462525";

export const SITE_PHONE_DISPLAY = "+359 88 546 2525";

export const SITE_PHONE_TEL = `tel:${SITE_PHONE_E164}`;

export const SITE_VIBER_URL = `viber://chat?number=${encodeURIComponent(SITE_PHONE_E164)}`;

export const SITE_WHATSAPP_URL = `https://wa.me/${SITE_PHONE_E164.replace("+", "")}`;

export const SITE_MAILTO = `mailto:${SITE_EMAIL}`;
