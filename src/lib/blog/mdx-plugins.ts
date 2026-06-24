import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeExternalLinks from "rehype-external-links";
import type { PluggableList } from "unified";

export const blogRemarkPlugins: PluggableList = [
  remarkGfm,
  [remarkSmartypants, { dashes: "oldschool" }],
];

export const blogRehypePlugins: PluggableList = [
  // IDs only — TOC links to #heading-id; headings are not wrapped as links
  rehypeSlug,
  [
    rehypePrettyCode,
    {
      theme: {
        dark: "github-dark",
        light: "github-light",
      },
      keepBackground: false,
      defaultLang: "plaintext",
    },
  ],
  [
    rehypeExternalLinks,
    {
      target: "_blank",
      rel: ["noopener", "noreferrer"],
    },
  ],
];
