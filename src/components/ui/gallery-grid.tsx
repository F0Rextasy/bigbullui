"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface GalleryImage {
  id: string;
  src: string;
  alt?: string;
}

export interface GalleryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
}

/** Lightbox bağlantılı görsel galerisi: tıklayınca tam ekran açılır. */
export function GalleryGrid({ images, columns = 3, className, ...props }: GalleryGridProps) {
  const [active, setActive] = React.useState<number | null>(null);
  const colClass = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" }[columns];

  React.useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((a) => (a === null ? null : (a + 1) % images.length));
      if (e.key === "ArrowLeft") setActive((a) => (a === null ? null : (a - 1 + images.length) % images.length));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, images.length]);

  return (
    <div className={cn("w-full", className)} {...props}>
      <style>{`@keyframes ggIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }`}</style>
      <div className={cn("grid gap-2", colClass)}>
        {images.map((img, idx) => (
          <button
            key={img.id}
            onClick={() => setActive(idx)}
            className="group relative aspect-square overflow-hidden rounded-md border border-border animate-[ggIn_0.35s_ease-out_both] motion-reduce:animate-none transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
            style={{ animationDelay: `${idx * 50}ms` }}
            aria-label={img.alt ?? `Görsel ${idx + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.alt ?? ""} className="size-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none" loading="lazy" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active !== null && images[active] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-[fade-in_0.2s_ease-out]" onClick={() => setActive(null)}>
          <div className="relative max-h-full max-w-2xl animate-[ggIn_0.25s_ease-out_both] motion-reduce:animate-none" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[active].src} alt={images[active].alt ?? ""} className="max-h-[80vh] rounded-lg border-2 border-dashed border-border object-contain" />
            <div className="mt-2 flex items-center justify-between">
              <button
                onClick={() => setActive((a) => (a !== null ? (a - 1 + images.length) % images.length : null))}
                className="rounded-sm border border-border bg-card px-3 py-1 font-mono text-[10px] uppercase text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
              >
                ← Önceki
              </button>
              <span className="font-mono text-[10px] text-muted-foreground">{active + 1} / {images.length}</span>
              <button
                onClick={() => setActive((a) => (a !== null ? (a + 1) % images.length : null))}
                className="rounded-sm border border-border bg-card px-3 py-1 font-mono text-[10px] uppercase text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
              >
                Sonraki →
              </button>
            </div>
          </div>
          <button
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 rounded-sm p-1.5 text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white motion-reduce:transition-none"
            aria-label="Kapat"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}
