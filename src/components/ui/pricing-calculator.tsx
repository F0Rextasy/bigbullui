"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PricingCalculatorProps extends React.HTMLAttributes<HTMLDivElement> {
  unitPrice?: number;
}

/** Pricing calculator: seat stepper with live total readout. */
export function PricingCalculator({ unitPrice = 45, className, ...props }: PricingCalculatorProps) {
  const [seats, setSeats] = React.useState(2);
  const [vip, setVip] = React.useState(false);
  const total = seats * (vip ? unitPrice + 30 : unitPrice);
  return (
    <div className={cn("w-full max-w-sm rounded-lg border-2 border-foreground bg-card p-4", className)} {...props}>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Price estimator</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs font-bold">Seats</span>
        <span className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSeats((s) => Math.max(1, s - 1))}
            aria-label="Fewer seats"
            className="size-7 rounded border font-mono font-bold transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            −
          </button>
          <span className="w-6 text-center font-mono text-sm font-black tabular-nums" aria-live="polite">{seats}</span>
          <button
            type="button"
            onClick={() => setSeats((s) => Math.min(12, s + 1))}
            aria-label="More seats"
            className="size-7 rounded border font-mono font-bold transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            +
          </button>
        </span>
      </div>
      <label className="mt-2 flex cursor-pointer items-center justify-between text-xs font-bold">
        VIP upgrade (+$30 / seat)
        <input type="checkbox" checked={vip} onChange={(e) => setVip(e.target.checked)} className="size-4 accent-accent" />
      </label>
      <div className="mt-3 flex items-center justify-between border-t-2 border-dashed border-border pt-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Estimate</span>
        <span key={total} className="font-mono text-xl font-black text-accent tabular-nums">${total}</span>
      </div>
    </div>
  );
}
