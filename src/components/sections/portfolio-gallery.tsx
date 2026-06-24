"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { PortfolioGalleryImage } from "@/lib/portfolio";

export function PortfolioGallery({
  images,
  captions,
  imageAlts,
  title,
}: {
  images: PortfolioGalleryImage[];
  captions: string[];
  /** SEO-friendly alt text per image — precomputed on the server. */
  imageAlts: string[];
  title: string;
}) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="flex flex-col gap-6">
      <h2 className="font-display text-h2 font-bold tracking-tight">{title}</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {images.map((image, index) => {
          const isExpanded = expandedIndex === index;
          const alt = imageAlts[index] ?? captions[index] ?? title;
          return (
            <figure
              key={image.src}
              className={cn(
                "transition-[grid-column] duration-300 ease-brand",
                isExpanded && "md:col-span-2",
              )}
            >
              <button
                type="button"
                aria-expanded={isExpanded}
                aria-label={alt}
                onClick={() =>
                  setExpandedIndex(isExpanded ? null : index)
                }
                className={cn(
                  "group w-full overflow-hidden rounded-2xl border border-border bg-surface text-left transition-colors duration-300 ease-brand",
                  "hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  isExpanded && "shadow-lg",
                )}
              >
                <div className="bg-surface-2 p-2 sm:p-3">
                  <Image
                    src={image.src}
                    alt={alt}
                    width={image.width}
                    height={image.height}
                    quality={85}
                    priority={index === 0}
                    loading={index === 0 ? undefined : "lazy"}
                    className="h-auto w-full object-contain"
                    sizes={
                      isExpanded
                        ? "(max-width: 1280px) 100vw, 1280px"
                        : "(max-width: 768px) 100vw, 640px"
                    }
                  />
                </div>
                {captions[index] && (
                  <figcaption className="border-t border-border px-4 py-3 text-small text-text-muted">
                    {captions[index]}
                  </figcaption>
                )}
              </button>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
