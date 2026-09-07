"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface InventoryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  slots?: number;
  filled?: number;
  onPick?: (index: number) => void;
}

/** Inventory grid: tappable slot matrix with fill states. */
export function InventoryGrid({ slots = 12, filled = 7, onPick, className, ...props }: InventoryGridProps) {
  return (
    <div role="grid" aria-label={`Inventory ${filled} of ${slots} filled`} className={cn("grid touch-none grid-cols-4 gap-1.5 select-none", className)} style={{ touchAction: "none" }} {...props}>
      {Array.from({ length: slots }).map((_, i) => (
        <button
          key={i}
          type="button"
          role="gridcell"
          aria-label={i < filled ? `Slot ${i + 1} occupied` : `Slot ${i + 1} empty`}
          onClick={() => onPick?.(i)}
          className={cn(
            "flex min-h-11 min-w-11 touch-none items-center justify-center rounded-md border-2 border-dashed font-mono text-[10px] font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            i < filled ? "border-foreground bg-secondary text-foreground" : "border-border bg-card text-muted-foreground"
          )}
          style={{ touchAction: "none" }}
        >
          {i < filled ? `×${(i % 9) + 1}` : "—"}
        </button>
      ))}
    </div>
  );
}
