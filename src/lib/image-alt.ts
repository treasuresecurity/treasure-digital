import { BUSINESS } from "@/lib/business";

/** Keyword-natural alt for portfolio gallery screenshots (SEO + accessibility). */
export function portfolioGalleryAlt(caption: string, projectTitle: string) {
  return `${caption} — ${projectTitle}, ${BUSINESS.displayName}`;
}

/** Alt for blog post cover images. */
export function blogCoverAlt(postTitle: string) {
  return `${postTitle} — ${BUSINESS.displayName} blog`;
}
