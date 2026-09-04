"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ColorPickerProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (color: string) => void;
  colors?: string[];
  className?: string;
}

const DEFAULT_STUB_COLORS = [
  "#BC3A28", // Stamp Red
  "#17130C", // Ink Black
  "#F6F0E0", // Warm Cream
  "#ECE3CC", // Sand
  "#D8C9AC", // Tan
  "#16120B", // Dark Night
  "#E0573D", // Bright Stamp
  "#4A3F2C", // Dark Input
];

export function ColorPicker({
  value: controlledValue,
  defaultValue = "#BC3A28",
  onValueChange,
  colors = DEFAULT_STUB_COLORS,
  className,
}: ColorPickerProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentVal = isControlled ? controlledValue : uncontrolledValue;

  const handleSelect = (color: string) => {
    if (!isControlled) {
      setUncontrolledValue(color);
    }
    onValueChange?.(color);
  };

  return (
    <div
      className={cn(
        "inline-flex flex-col gap-3 rounded-lg border-2 border-dashed border-border bg-card p-3 shadow-sm select-none",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-dashed border-border pb-2">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          TICKET PALETTE
        </span>
        <div className="flex items-center gap-1.5">
          <span
            style={{ backgroundColor: currentVal }}
            className="size-3.5 rounded-xs border border-foreground/30 shadow-xs"
          />
          <span className="font-mono text-xs font-semibold text-foreground">
            {currentVal.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {colors.map((c) => {
          const isSelected = c.toLowerCase() === currentVal.toLowerCase();
          return (
            <button
              key={c}
              type="button"
              onClick={() => handleSelect(c)}
              style={{ backgroundColor: c }}
              aria-label={`Select color ${c}`}
              className={cn(
                "relative size-8 rounded-sm border border-foreground/20 shadow-xs transition-transform hover:scale-110 cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isSelected && "ring-2 ring-accent ring-offset-1 scale-105"
              )}
            >
              {isSelected ? (
                <span className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  ✓
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
