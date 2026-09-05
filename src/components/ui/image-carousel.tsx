"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ImageCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  images: { id: string; src: string; alt?: string }[];
  autoPlay?: boolean;
  interval?: number;
}

/** Görsel kaydırıcı: oklar + noktalar + otomatik oynatma. */
export function ImageCarousel({ images, autoPlay, interval = 4000, className, ...props }: ImageCarouselProps) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (!autoPlay || images.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), interval);
    return () => clearInterval(t);
  }, [autoPlay, interval, images.length]);

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + images.length) % images.length);

  return (
    <div className={cn("relative w-full overflow-hidden rounded-lg border border-border", className)} {...props}>
      <style>{`@keyframes icSlide { from { opacity: 0; transform: scale(1.04); } to { opacity: 1; transform: scale(1); } }`}</style>
      <div className="aspect-video w-full">
        {images.map((img, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={img.id}
            src={img.src}
            alt={img.alt ?? ""}
            className={cn(
              "absolute inset-0 size-full object-cover transition-opacity duration-400 motion-reduce:transition-none",
              i === index ? "opacity-100 animate-[icSlide_0.4s_ease-out] motion-reduce:animate-none" : "opacity-0"
            )}
            loading="lazy"
          />
        ))}
      </div>
      <button
        onClick={() => go(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/40 p-1.5 text-white transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none"
        aria-label="Önceki görsel"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/40 p-1.5 text-white transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none"
        aria-label="Sonraki görsel"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
      </button>
      <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setIndex(i)}
            aria-label={`${i + 1}. görsele git`}
            className={cn("rounded-full transition-all duration-200 motion-reduce:transition-none", i === index ? "h-1.5 w-4 bg-white" : "size-1.5 bg-white/50 hover:bg-white/80")}
          />
        ))}
      </div>
    </div>
  );
}
