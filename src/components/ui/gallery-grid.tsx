"use client";

import * as React from "react";
import { getFocusable, lockBodyScroll, registerEscapeLayer, trapFocus } from "./lib/focus-trap";
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

/** Image gallery grid: expandable fullscreen lightbox view. */
export function GalleryGrid({ images = [], columns = 3, className, ...props }: GalleryGridProps) {
  const [active, setActive] = React.useState<number | null>(null);
  const isOpen = active !== null;
  const panelRef = React.useRef<HTMLDivElement>(null);
  const restoreRef = React.useRef<HTMLElement | null>(null);
  const colClass = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" }[columns];

  React.useEffect(() => {
    if (!isOpen) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const releaseScroll = lockBodyScroll();
    const releaseEscape = registerEscapeLayer(() => setActive(null));
    const onKey = (e: KeyboardEvent) => {
      if (panelRef.current) trapFocus(panelRef.current, e);
      if (e.key === "ArrowRight") setActive((a) => (a === null ? null : (a + 1) % images.length));
      if (e.key === "ArrowLeft") setActive((a) => (a === null ? null : (a - 1 + images.length) % images.length));
    };
    document.addEventListener("keydown", onKey);
    if (panelRef.current) {
      const focusables = getFocusable(panelRef.current);
      (focusables[0] ?? panelRef.current).focus();
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      releaseEscape();
      releaseScroll();
      restoreRef.current?.focus();
    };
  }, [isOpen, images.length]);

  return (
    <div className={cn("w-full", className)} {...props}>
      <div className={cn("grid gap-2", colClass)}>
        {images.map((img, idx) => (
          <button
            type="button"
            key={img.id}
            onClick={() => setActive(idx)}
            className="group relative aspect-square overflow-hidden rounded-md border border-border animate-[ggIn_0.35s_ease-out_both] motion-reduce:animate-none transition-transform duration-200 hover:scale-[1.02] motion-reduce:hover:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
            style={{ animationDelay: `${idx * 50}ms` }}
            aria-label={img.alt ?? `Image ${idx + 1}`}
          >
            { }
            <img src={img.src} alt={img.alt ?? ""} className="size-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:group-hover:scale-100 motion-reduce:transition-none" loading="lazy" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active !== null && images[active] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 motion-safe:animate-[fade-in_0.2s_ease-out]">
          <div className="absolute inset-0 bg-black/80" onClick={() => setActive(null)} aria-hidden="true" />
          <div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={images[active].alt ?? `Image ${active + 1} of ${images.length}`}
            className="relative z-10 flex max-h-full max-w-2xl flex-col items-center animate-[ggIn_0.25s_ease-out_both] motion-reduce:animate-none focus:outline-none"
          >
            <img src={images[active].src} alt={images[active].alt ?? ""} className="max-h-[80vh] rounded-lg border-2 border-dashed border-border object-contain" />
            <div className="mt-2 flex w-full items-center justify-between">
              <button
                type="button"
                onClick={() => setActive((a) => (a !== null ? (a - 1 + images.length) % images.length : null))}
                className="rounded-sm border border-border bg-card px-3 py-1 font-mono text-[10px] uppercase text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
              >
                ← Previous
              </button>
              <span className="font-mono text-[10px] text-muted-foreground">{active + 1} / {images.length}</span>
              <button
                type="button"
                onClick={() => setActive((a) => (a !== null ? (a + 1) % images.length : null))}
                className="rounded-sm border border-border bg-card px-3 py-1 font-mono text-[10px] uppercase text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
              >
                Next →
              </button>
            </div>
            <button
              type="button"
              onClick={() => setActive(null)}
              className="mt-3 rounded-sm border border-border bg-card/80 px-3 py-1 font-mono text-[10px] uppercase text-foreground transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
              aria-label="Close"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
