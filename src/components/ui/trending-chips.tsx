"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TrendingChipsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  items?: { label: string; hot?: boolean }[];
  onSelect?: (label: string) => void;
}

/** Trending chips row: stamp-red hot marks with dashed chip frames. */
export function TrendingChips({ items = [{ label: " courtside", hot: true }, { label: "balcony" }, { label: "vip box", hot: true }, { label: "matinee" }], onSelect, className, ...props }: TrendingChipsProps) {
  const [active, setActive] = React.useState<string | null>(null);
  return (
    <div className={cn("w-full max-w-md rounded-lg border border-border bg-card p-3", className)} {...props}>
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Trending now</span>
      <div className="mt-2 flex flex-wrap gap-1.5" role="listbox" aria-label="Trending searches">
        {items.map((chip) => (
          <button
            key={chip.label}
            type="button"
            role="option"
            aria-selected={active === chip.label}
            onClick={() => { setActive(chip.label); onSelect?.(chip.label); }}
            className={cn(
              "rounded-full border border-dashed border-border bg-background px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
              active === chip.label ? "border-accent bg-accent text-accent-foreground" : "text-foreground hover:border-accent/60"
            )}
          >
            {chip.hot && <span className="mr-1 inline-block size-1.5 rounded-full bg-accent" aria-hidden="true" />}
            {chip.label.trim()}
          </button>
        ))}
      </div>
    </div>
  );
}
