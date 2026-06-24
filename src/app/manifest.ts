import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business";
import { getSiteUrl } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  const siteUrl = getSiteUrl();

  return {
    name: BUSINESS.displayName,
    short_name: BUSINESS.displayName,
    description:
      "Digital agency for web development, apps and advertising — building products that bring customers.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#000817",
    theme_color: "#000817",
    lang: "bg",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: `${siteUrl}/logo-dark.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
