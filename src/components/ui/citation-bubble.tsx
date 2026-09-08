"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CitationBubbleProps extends React.HTMLAttributes<HTMLSpanElement> {
  index: number;
  title?: string;
  source?: string;
  excerpt?: string;
}

/** Superscript citation marker with focusable source popover. */
export function CitationBubble({
  index,
  title = "Box office manifest",
  source = "bigbull archive · page 12",
  excerpt = "Capacity verified at 240 seats for the main stage.",
  className,
  ...props
}: CitationBubbleProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <span className={cn("relative inline-block", className)} {...props}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`Citation ${index}: ${title}`}
        className="inline-flex size-4.5 cursor-pointer items-center justify-center rounded-full border border-accent/60 bg-accent/10 align-super font-mono text-[9px] font-bold text-accent hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {index}
      </button>
      {open && (
        <span className="absolute bottom-6 left-1/2 z-20 w-60 -translate-x-1/2 rounded-lg border-2 border-foreground bg-card p-2.5 text-start shadow-lg">
          <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            Source {index}
          </span>
          <span className="mt-0.5 block text-xs font-bold text-foreground">{title}</span>
          <span className="mt-1 block text-xs leading-5 text-muted-foreground">{excerpt}</span>
          <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {source}
          </span>
        </span>
      )}
    </span>
  );
}
