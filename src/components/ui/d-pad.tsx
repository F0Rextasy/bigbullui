"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type DPadDirection = "up" | "down" | "left" | "right";

export interface DPadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  onPress?: (direction: DPadDirection) => void;
}

/** D-pad: cross layout of four 44px directional buttons with touch-action none. */
export function DPad({ onPress, className, ...props }: DPadProps) {
  const [held, setHeld] = React.useState<DPadDirection | null>(null);
  const dirs: { dir: DPadDirection; label: string; glyph: string; area: string }[] = [
    { dir: "up", label: "Move up", glyph: "▲", area: "1 / 2" },
    { dir: "left", label: "Move left", glyph: "◀", area: "2 / 1" },
    { dir: "right", label: "Move right", glyph: "▶", area: "2 / 3" },
    { dir: "down", label: "Move down", glyph: "▼", area: "3 / 2" },
  ];
  return (
    <div
      role="group"
      aria-label="Directional pad"
      className={cn("grid w-fit touch-none select-none grid-cols-3 grid-rows-3 gap-1", className)}
      style={{ touchAction: "none" }}
      {...props}
    >
      {dirs.map((d) => (
        <button
          key={d.dir}
          type="button"
          aria-label={d.label}
          style={{ gridArea: d.area, touchAction: "none" }}
          className={cn(
            "flex size-11 touch-none items-center justify-center rounded-md border-2 border-foreground bg-card font-mono text-sm text-foreground shadow-xs transition-colors hover:bg-secondary active:bg-primary active:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
            held === d.dir && "bg-accent text-accent-foreground"
          )}
          onPointerDown={() => {
            setHeld(d.dir);
            onPress?.(d.dir);
          }}
          onPointerUp={() => setHeld(null)}
          onPointerLeave={() => setHeld(null)}
        >
          <span aria-hidden="true">{d.glyph}</span>
        </button>
      ))}
    </div>
  );
}
