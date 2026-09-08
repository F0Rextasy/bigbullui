"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ItemSlotProps extends React.HTMLAttributes<HTMLButtonElement> {
  name?: string;
  count?: number;
  rarity?: "common" | "rare" | "epic" | "legendary";
  selected?: boolean;
  onSelect?: () => void;
}

/** Item slot: single inventory cell with rarity frame and count. */
export function ItemSlot({ name = "Medkit", count = 3, rarity = "rare", selected, onSelect, className, ...props }: ItemSlotProps) {
  const frames: Record<string, string> = {
    common: "border-border",
    rare: "border-primary",
    epic: "border-accent",
    legendary: "border-warning",
  };
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`${name} times ${count}, ${rarity}`}
      className={cn(
        "relative flex min-h-11 min-w-11 touch-none flex-col items-center justify-center rounded-md border-2 bg-card px-2 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        frames[rarity],
        selected && "bg-secondary"
      )}
      style={{ touchAction: "none" }}
      {...props}
    >
      <span className={cn("flex size-11 items-center justify-center rounded border border-dashed border-border bg-background font-mono text-base", className)} aria-hidden="true">
        ◆
      </span>
      <span className="mt-1 max-w-16 truncate font-mono text-[9px] font-bold uppercase text-foreground">{name}</span>
      <span className="absolute right-1 top-1 rounded bg-foreground px-1 font-mono text-[9px] font-black tabular-nums text-background" aria-hidden="true">
        {count}
      </span>
    </button>
  );
}
