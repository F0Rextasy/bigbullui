"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ColorOption {
  name: string;
  className?: string;
}

export interface VariantPickerProps {
  colors: ColorOption[];
  sizes?: string[];
  value?: string;
  defaultValue?: string;
  onColorChange?: (name: string) => void;
  onSizeChange?: (size: string) => void;
  className?: string;
}

const ColorSwatch = "color-swatch";
const SelectedSwatch = "color-swatch-selected";
const SizeChip = "size-picker-chip";
const FadeIn = "variant-picker-fade-in";

// Explicit color map — NO dynamic class strings
const colorMap: Record<string, string> = {
  navy: "bg-navy hover:bg-navy/80",
  green: "bg-green-500 hover:bg-green-400",
  black: "bg-gray-900 hover:bg-gray-800",
  white: "bg-white hover:bg-gray-100",
  brown: "bg-amber-500 hover:bg-amber-400",
};

export function VariantPicker({
  colors,
  sizes,
  value,
  defaultValue,
  onColorChange,
  onSizeChange,
  className,
}: VariantPickerProps) {
  const [controlledValue] = React.useState<string | undefined>(
    defaultValue ?? undefined
  );

  return (
    <div className={cn("space-y-3", className)}>
      {/* Color swatches */}
      <div>
        <span className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Color</span>
        <div className="flex gap-1.5">
          {colors.map((opt, i) => {
            const selected = controlledValue === opt.name;
            const baseClass = colorMap[opt.name] || "bg-gray-200 hover:bg-gray-300";

            return (
              <button
                key={i}
                type="button"
                className={cn(
                  "rounded-full w-6 h-6 transition-colors",
                  ColorSwatch,
                  selected && SelectedSwatch,
                  "motion-reduce:transition-none",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
                style={{ backgroundColor: opt.className ? `var(${opt.className})` : "var(--secondary)" }}
                onClick={() => onColorChange?.(opt.name)}
                aria-label={`Select ${opt.name} color`}
              >
                {/* Swatch fills from explicit map */}
              </button>
            );
          })}
        </div>
      </div>

      {/* Size row */}
      {sizes && sizes.length > 0 && (
        <div>
          <span className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Size</span>
          <div className="flex gap-1.5">
            {sizes.map((size, i) => (
              <button
                key={i}
                type="button"
                className={cn(
                  "inline-flex rounded-md border border-2 border-dashed items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider",
                  SizeChip,
                  "motion-reduce:transition-none",
                  "cursor-pointer"
                )}
                onClick={() => onSizeChange?.(size)}
                aria-label={`Select size ${size}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}