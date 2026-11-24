"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SizeOption {
  label: string;
  available?: boolean;
  stock?: number;
}

export interface SizePickerProps extends Omit<React.HTMLAttributes<HTMLElement>, "value" | "defaultValue"> {
  sizes: SizeOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

const sizeMap: Record<string, string> = {
  S: "text-xs py-1 px-2 rounded border border-border hover:bg-secondary/20 transition-colors",
  M: "text-sm py-1.5 px-3 rounded border border-border hover:bg-secondary/20 transition-colors",
  L: "text-sm py-1.5 px-3 rounded border border-border hover:bg-secondary/20 transition-colors",
  XL: "text-sm py-1.5 px-3 rounded border border-border hover:bg-secondary/20 transition-colors",
};

export function SizePicker({
  sizes = [],
  value,
  defaultValue,
  onValueChange,
  className, ...props
}: SizePickerProps) {
  const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue);
  const currentValue = value !== undefined ? value : internalValue;

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)} {...props}>
      {sizes.map((opt, i) => {
        const isAvailable = opt.available !== false;
        const isSelected = currentValue === opt.label;
        const isOutOfStock = !isAvailable;

        return (
          <button
            key={i}
            type="button"
            className={cn(
              "inline-flex rounded-md border-2 border-dashed items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider motion-reduce:transition-none",
              sizeMap[opt.label],
              isSelected && "border-accent bg-accent/10 text-accent-strong font-bold",
              isOutOfStock && "opacity-50 line-through cursor-not-allowed",
              !isSelected && !isOutOfStock && "border-border hover:border-foreground cursor-pointer"
            )}
            onClick={() => {
              if (!isAvailable) return;
              if (value === undefined) setInternalValue(opt.label);
              onValueChange?.(opt.label);
            }}
            aria-pressed={isSelected}
            disabled={!isAvailable}
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
                <span className="ms-1 text-xxs opacity-50">OOS</span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}