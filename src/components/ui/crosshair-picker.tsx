"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CrosshairPickerProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onPick?: (id: string) => void;
}

const STYLES = [
  { id: "cross", glyph: "+", label: "Cross" },
  { id: "dot", glyph: "•", label: "Dot" },
  { id: "circle", glyph: "○", label: "Circle" },
  { id: "x", glyph: "×", label: "X mark" },
];

/** Crosshair picker: reticle style grid with live preview. */
export function CrosshairPicker({ value = "cross", onPick, className, ...props }: CrosshairPickerProps) {
  const [sel, setSel] = React.useState(value);
  return (
    <div role="radiogroup" aria-label="Crosshair style" className={cn("w-full touch-none select-none rounded-md border border-dashed border-border bg-card p-2.5", className)} style={{ touchAction: "none" }} {...props}>
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Crosshair</p>
      <div className="mt-2 grid grid-cols-4 gap-1.5">
        {STYLES.map((s) => (
          <button
            key={s.id}
            type="button"
            role="radio"
            aria-checked={sel === s.id}
            aria-label={s.label}
            onClick={() => {
              setSel(s.id);
              onPick?.(s.id);
            }}
            className={cn(
              "flex min-h-11 touch-none items-center justify-center rounded-md border-2 font-mono text-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              sel === s.id ? "border-accent bg-accent/10 text-foreground" : "border-border bg-background text-muted-foreground"
            )}
            style={{ touchAction: "none" }}
          >
            {s.glyph}
          </button>
        ))}
      </div>
    </div>
  );
}
