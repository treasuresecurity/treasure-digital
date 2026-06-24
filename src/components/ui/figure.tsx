import Image from "next/image";

export function Figure({
  src,
  alt,
  caption,
  width = 1200,
  height = 675,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-border bg-surface">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className="h-auto w-full object-cover"
        sizes="(max-width: 768px) 100vw, 768px"
      />
      {caption ? (
        <figcaption className="border-t border-border px-4 py-3 text-small text-text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
