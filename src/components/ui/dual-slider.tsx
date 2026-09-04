"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DualSliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  min?: number;
  max?: number;
  step?: number;
  value?: [number, number];
  defaultValue?: [number, number];
  onValueChange?: (val: [number, number]) => void;
  currency?: string;
  className?: string;
}

export function DualSlider({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue = [20, 80],
  onValueChange,
  currency = "$",
  className,
  ...props
}: DualSliderProps) {
  const [internalVal, setInternalVal] = React.useState<[number, number]>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const [valMin, valMax] = isControlled ? controlledValue : internalVal;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), valMax - step);
    const updated: [number, number] = [newMin, valMax];
    if (!isControlled) setInternalVal(updated);
    onValueChange?.(updated);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), valMin + step);
    const updated: [number, number] = [valMin, newMax];
    if (!isControlled) setInternalVal(updated);
    onValueChange?.(updated);
  };

  const minPercent = ((valMin - min) / (max - min)) * 100;
  const maxPercent = ((valMax - min) / (max - min)) * 100;

  return (
    <div className={cn("w-full space-y-3 font-mono select-none", className)} {...props}>
      {/* Price Header */}
      <div className="flex items-center justify-between text-xs font-bold text-foreground">
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
          PRICE RANGE
        </span>
        <div className="flex items-center gap-1.5 rounded-sm border border-dashed border-border bg-secondary px-2 py-0.5 text-accent">
          <span>{currency}{valMin}</span>
          <span>—</span>
          <span>{currency}{valMax}</span>
        </div>
      </div>

      {/* Dual Slider Track */}
      <div className="relative flex h-6 w-full items-center">
        {/* Background Track */}
        <div className="absolute h-2 w-full rounded-xs bg-secondary border border-border" />

        {/* Selected Range Highlight */}
        <div
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
          className="absolute h-2 bg-accent shadow-xs"
        />

        {/* Range Inputs Overlaid */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valMin}
          onChange={handleMinChange}
          aria-label="Minimum price"
          className="pointer-events-none absolute h-2 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-4.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-xs [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-foreground [&::-webkit-slider-thumb]:bg-card [&::-webkit-slider-thumb]:shadow-xs [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:hover:scale-110"
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valMax}
          onChange={handleMaxChange}
          aria-label="Maximum price"
          className="pointer-events-none absolute h-2 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-4.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-xs [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-foreground [&::-webkit-slider-thumb]:bg-card [&::-webkit-slider-thumb]:shadow-xs [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:hover:scale-110"
        />
      </div>
    </div>
  );
}
