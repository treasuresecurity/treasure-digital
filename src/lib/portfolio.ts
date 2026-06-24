// Portfolio case studies (master-plan §5 / §6).
// `key` maps into the "caseStudies.items" message namespace.
export interface PortfolioGalleryImage {
  src: string;
  width: number;
  height: number;
}

export interface PortfolioCase {
  key: "finpro" | "webShop" | "sussi";
  slug: string;
  featured?: boolean;
  /** Cover image for cards — path under /public */
  image?: string;
  /** Additional screenshots for the case study detail page */
  gallery?: PortfolioGalleryImage[];
}

export const portfolioCases: PortfolioCase[] = [
  {
    key: "finpro",
    slug: "finpro",
    featured: true,
    image: "/portfolio/FinPro/1.png",
    gallery: [
      { src: "/portfolio/FinPro/1.png", width: 1629, height: 936 },
      { src: "/portfolio/FinPro/2.png", width: 1405, height: 965 },
      { src: "/portfolio/FinPro/3.png", width: 1408, height: 995 },
      { src: "/portfolio/FinPro/4.png", width: 1600, height: 965 },
    ],
  },
  {
    key: "webShop",
    slug: "onlain-magazin",
    // Homepage hero — best overview for card covers
    image: "/portfolio/Dobrev/1.png",
    gallery: [
      { src: "/portfolio/Dobrev/1.png", width: 1274, height: 628 },
      { src: "/portfolio/Dobrev/2.png", width: 1276, height: 626 },
      { src: "/portfolio/Dobrev/3.png", width: 1278, height: 624 },
      { src: "/portfolio/Dobrev/4.png", width: 1263, height: 626 },
    ],
  },
  {
    key: "sussi",
    slug: "sussi",
    // File manager — best product overview for card covers
    image: "/projects/SUSS/2.png",
    gallery: [
      { src: "/projects/SUSS/1.png", width: 1274, height: 628 },
      { src: "/projects/SUSS/2.png", width: 1262, height: 620 },
      { src: "/projects/SUSS/3.png", width: 1278, height: 626 },
      { src: "/projects/SUSS/4.png", width: 1119, height: 293 },
    ],
  },
];

/** @deprecated use portfolioCases — kept for homepage import */
export const featuredCases = portfolioCases;

export function getCaseBySlug(slug: string) {
  return portfolioCases.find((item) => item.slug === slug);
}

export function getAllCaseSlugs() {
  return portfolioCases.map((item) => item.slug);
}

export function getCaseByKey(key: PortfolioCase["key"]) {
  return portfolioCases.find((item) => item.key === key);
}
