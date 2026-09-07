"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SuggestionChipsProps extends React.HTMLAttributes<HTMLDivElement> {
  suggestions?: string[];
  onPick?: (value: string) => void;
}

const FALLBACK = ["Print VIP stubs", "Refund Row B", "Show gate map", "Night stub theme"];

/** Suggestion chip row with stamp-on-pick feedback. */
export function SuggestionChips({ suggestions = FALLBACK, onPick, className, ...props }: SuggestionChipsProps) {
  const [picked, setPicked] = React.useState<string | null>(null);
  return (
    <div className={cn("flex flex-wrap gap-2", className)} {...props}>
      {suggestions.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => { setPicked(s); onPick?.(s); }}
          className={cn(
            "rounded-full border px-3 py-1 font-mono text-[11px] font-bold uppercase transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            picked === s ? "border-foreground bg-accent text-accent-foreground" : "border-dashed border-border bg-card text-muted-foreground hover:border-foreground hover:text-foreground"
          )}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
