"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SizeOption {
  label: string;
  available?: boolean;
  stock?: number;
}

export interface SizePickerProps {
  sizes: SizeOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

const SizeChip = "size-chip";
const Selected = "size-chip-selected";
const OutOfStock = "size-chip-out-of-stock";
const FadeIn = "size-picker-fade-in";

const sizeMap: Record<string, string> = {
  S: "text-xs py-1 px-2 rounded border border-border hover:bg-secondary/20 transition-colors",
  M: "text-sm py-1.5 px-3 rounded border border-border hover:bg-secondary/20 transition-colors",
  L: "text-sm py-1.5 px-3 rounded border border-border hover:bg-secondary/20 transition-colors",
  XL: "text-sm py-1.5 px-3 rounded border border-border hover:bg-secondary/20 transition-colors",
};

export function SizePicker({
  sizes,
  value,
  defaultValue,
  onValueChange,
  className,
}: SizePickerProps) {
  const [controlledValue, setControlledValue] = React.useState<
    | string
    | undefined
  >(defaultValue ?? undefined);

  React.useEffect(() => {
    if (value !== undefined) setControlledValue(value);
  }, [value]);

  return (
    <div className={cn("space-y-1.5", className)}>
      {sizes.map((opt, i) => {
        const isAvailable = opt.available !== false;
        const isSelected = controlledValue === opt.label;
        const isOutOfStock = !isAvailable;

        return (
          <button
            key={i}
            type="button"
            className={cn(
              "inline-flex rounded-md border border-2 border-dashed items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider",
              isSelected && Selected,
              isOutOfStock && OutOfStock,
              !isSelected && !isOutOfStock && SizeChip,
              sizeMap[opt.label],
              "motion-reduce:transition-none",
              "cursor-pointer"
            )}
            onClick={() => {
              if (isAvailable && onValueChange) {
                onValueChange(opt.label);
              }
            }}
            disabled={!isAvailable}
            aria-disabled={!isAvailable}
            title={isAvailable ? `Select ${opt.label}` : "Out of stock"}
          >
            <span className="relative">
              {opt.label}
              {isOutOfStock && (
                <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full border-2 border-border bg-card">
                  <span className="size-0.5 rounded-full bg-destructive" />
                </span>
              )}
              {isOutOfStock && (
                <span className="ml-1 text-xxs opacity-50">OOS</span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}