"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ColorOption {
  name: string;
  className?: string;
}

export interface VariantPickerProps extends Omit<React.HTMLAttributes<HTMLElement>, "value" | "defaultValue"> {
  colors: ColorOption[];
  sizes?: string[];
  value?: string;
  defaultValue?: string;
  onColorChange?: (name: string) => void;
  onSizeChange?: (size: string) => void;
  className?: string;
}

export function VariantPicker({
  colors = [],
  sizes,
  value,
  defaultValue,
  onColorChange,
  onSizeChange,
  className, ...props
}: VariantPickerProps) {
  const [internalColor, setInternalColor] = React.useState<string | undefined>(
    defaultValue ?? undefined
  );
  const controlledValue = value ?? internalColor;

  return (
    <div className={cn("space-y-3", className)} {...props}>
      {/* Color swatches */}
      <div>
        <span className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Color</span>
        <div className="flex gap-1.5">
          {colors.map((opt, i) => {
            const selected = controlledValue === opt.name;

            return (
              <button
                key={i}
                type="button"
                className={cn(
                  "rounded-full w-6 h-6 border border-border transition-colors motion-reduce:transition-none",
                  selected && "ring-2 ring-ring ring-offset-2 ring-offset-background",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
                style={{ backgroundColor: opt.className ? `var(${opt.className})` : "var(--secondary)" }}
                onClick={() => { setInternalColor(opt.name); onColorChange?.(opt.name); }}
                aria-pressed={selected}
                aria-label={`Select ${opt.name} color`}
              />
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
                className="inline-flex rounded-md border-2 border-dashed border-border items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider hover:border-foreground motion-reduce:transition-none cursor-pointer"
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