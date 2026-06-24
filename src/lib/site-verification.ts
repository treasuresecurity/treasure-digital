/** Public verification / measurement IDs (override via env on Vercel). */
export const GA4_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA4_ID ?? "G-LDRCFVTNZ5";

export const GSC_VERIFICATION =
  process.env.NEXT_PUBLIC_GSC_VERIFICATION ??
  "8plwFDCESSqMdc96xDP2SS0hkvCl8RSzrRhG1vs7MH8";

export const BING_VERIFICATION = process.env.NEXT_PUBLIC_BING_VERIFICATION;

export const GTM_CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_ID;
