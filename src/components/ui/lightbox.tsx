"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface LightboxImage {
  src: string;
  alt?: string;
  title?: string;
}

export interface LightboxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: LightboxImage[];
  initialIndex?: number;
  className?: string;
}

export function Lightbox({
  open,
  onOpenChange,
  images,
  initialIndex = 0,
  className,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);

  React.useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
      if (e.key === "ArrowRight") setCurrentIndex((i) => (i < images.length - 1 ? i + 1 : 0));
      if (e.key === "ArrowLeft") setCurrentIndex((i) => (i > 0 ? i - 1 : images.length - 1));
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, images.length, onOpenChange]);

  if (!open || images.length === 0) return null;

  const current = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 font-mono select-none">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => onOpenChange(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-xs animate-[fade-in_0.15s_ease-out_both]"
      />

      {/* Lightbox Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Ticket lightbox viewer"
        className={cn(
          "relative z-50 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border-2 border-foreground bg-card shadow-2xl outline-1 outline-dashed outline-offset-[-6px] animate-[scale-in_0.15s_ease-out_both]",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-dashed border-border px-4 py-3 bg-secondary/40">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-accent font-bold">★</span>
            <span className="font-bold text-foreground uppercase">{current.title || "TICKET ARCHIVE"}</span>
            <span className="text-[10px] text-muted-foreground">({currentIndex + 1} / {images.length})</span>
          </div>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xs border border-border bg-card px-2 py-0.5 text-[10px] uppercase font-bold text-foreground hover:bg-foreground hover:text-background cursor-pointer transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Display Frame */}
        <div className="relative flex min-h-[260px] flex-1 items-center justify-center bg-secondary/20 p-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="size-36 rounded-lg border-2 border-dashed border-border bg-card flex items-center justify-center text-4xl shadow-inner mb-3">
              🎟️
            </div>
            <p className="font-bold text-sm text-foreground uppercase">{current.title || "ADMISSION PASS"}</p>
            <p className="text-xs text-muted-foreground mt-1">{current.alt || "Official verified stub preview"}</p>
          </div>

          {/* Nav Arrows */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setCurrentIndex((i) => (i > 0 ? i - 1 : images.length - 1))}
                aria-label="Previous ticket image"
                className="absolute left-3 top-1/2 -translate-y-1/2 size-8 rounded-sm border border-foreground bg-card flex items-center justify-center text-xs font-bold hover:bg-foreground hover:text-background cursor-pointer shadow-xs transition-colors"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => setCurrentIndex((i) => (i < images.length - 1 ? i + 1 : 0))}
                aria-label="Next ticket image"
                className="absolute right-3 top-1/2 -translate-y-1/2 size-8 rounded-sm border border-foreground bg-card flex items-center justify-center text-xs font-bold hover:bg-foreground hover:text-background cursor-pointer shadow-xs transition-colors"
              >
                →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
