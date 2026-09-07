"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ColorPalette {
  name: string;
  colors: string[];
}

const PRESETS: ColorPalette[] = [
  { name: "Ticket Stub", colors: ["#F6F0E0", "#17130C", "#BC3A28", "#E0573D"] },
  { name: "Night Flight", colors: ["#16120B", "#F3EAD3", "#E0573D", "#8A2E20"] },
  { name: "Blueprint", colors: ["#1E3A5F", "#E8F1FA", "#4A90D9", "#0F2440"] },
  { name: "Mono Ink", colors: ["#FFFFFF", "#111111", "#666666", "#CCCCCC"] },
];

export interface ColorPalettePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  palettes?: ColorPalette[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (hex: string, paletteName: string) => void;
  label?: string;
}

export function ColorPalettePicker({
  palettes = PRESETS,
  value: controlledValue,
  defaultValue = PRESETS[0].colors[0],
  onValueChange,
  label,
  className,
  ...props
}: ColorPalettePickerProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const value = controlledValue ?? inner;

  const pick = (hex: string, paletteName: string) => {
    setInner(hex);
    onValueChange?.(hex, paletteName);
  };

  return (
    <div className={cn("w-full space-y-3", className)} {...props}>
      {label ? (
        <span className="block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      ) : null}
      {palettes.map((p) => (
        <div key={p.name}>
          <p className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {p.name}
          </p>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={p.name}>
            {p.colors.map((hex) => {
              const active = value.toLowerCase() === hex.toLowerCase();
              return (
                <button
                  key={hex}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  aria-label={`${p.name} ${hex}`}
                  title={hex}
                  onClick={() => pick(hex, p.name)}
                  style={{ backgroundColor: hex }}
                  className={cn(
                    "size-9 cursor-pointer rounded-md border transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
                    active ? "border-foreground ring-2 ring-ring ring-offset-2 ring-offset-background" : "border-border",
                  )}
                />
              );
            })}
          </div>
        </div>
      ))}
      <p className="font-mono text-xs text-muted-foreground" aria-live="polite">
        Selected: <strong className="text-foreground">{value}</strong>
      </p>
    </div>
  );
}
