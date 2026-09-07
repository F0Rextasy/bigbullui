"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ThemePreset {
  id: string;
  name: string;
  swatch: string;
}

export interface ThemePresetPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  presets?: ThemePreset[];
  value?: string;
  onChange?: (id: string) => void;
}

/** Theme preset picker: swatch cards with selected ring. */
export function ThemePresetPicker({
  presets = [
    { id: "cream", name: "Cream Paper", swatch: "#F6F0E0" },
    { id: "night", name: "Night Stub", swatch: "#16120B" },
    { id: "stamp", name: "Stamp Red", swatch: "#BC3A28" },
  ],
  value,
  onChange,
  className,
  ...props
}: ThemePresetPickerProps) {
  const [inner, setInner] = React.useState(presets[0]?.id);
  const active = value ?? inner;
  return (
    <div className={cn("w-full max-w-sm", className)} {...props}>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Theme preset</p>
      <div className="mt-2 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Theme presets">
        {presets.map((p) => {
          const selected = p.id === active;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => {
                setInner(p.id);
                onChange?.(p.id);
              }}
              className={cn(
                "rounded-lg border-2 p-2 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
                selected ? "border-accent" : "border-dashed border-border hover:border-foreground"
              )}
            >
              <span className="mx-auto block size-8 rounded-full border border-foreground/20" style={{ backgroundColor: p.swatch }} aria-hidden="true" />
              <span className="mt-1.5 block font-mono text-[10px] font-bold uppercase">{p.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
