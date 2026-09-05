"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ThumbnailItem {
  id: string;
  src: string;
  alt?: string;
}

export interface ThumbnailStripProps extends React.HTMLAttributes<HTMLDivElement> {
  images: ThumbnailItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
}

/** Horizontal thumbnail strip: animated border outline on selection. */
export function ThumbnailStrip({ images, value, defaultValue, onValueChange, className, ...props }: ThumbnailStripProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? images[0]?.id);
  const active = value ?? internal;

  return (
    <div className={cn("flex gap-2 overflow-x-auto pb-1", className)} role="radiogroup" aria-label="Thumbnails" {...props}>
      <style>{`@keyframes tsSel { from { transform: scale(0.92); } to { transform: scale(1); } }`}</style>
      {images.map((img, idx) => {
        const selected = active === img.id;
        return (
          <button
            key={img.id}
            role="radio"
            aria-checked={selected}
            onClick={() => { setInternal(img.id); onValueChange?.(img.id); }}
            className={cn(
              "relative shrink-0 overflow-hidden rounded-md border-2 transition-all duration-200 motion-reduce:transition-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected ? "border-accent animate-[tsSel_0.2s_ease-out] motion-reduce:animate-none" : "border-transparent opacity-70 hover:opacity-100"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.alt ?? ""} className="size-16 object-cover" loading="lazy" />
            {selected && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-accent" aria-hidden="true" />}
          </button>
        );
      })}
    </div>
  );
}
