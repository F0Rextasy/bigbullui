"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ReceiptProps {
  items: { label: string; price: string }[];
  taxRate?: number;
  total: string;
  className?: string;
}

const FadeIn = "receipt-fade-in";
const ZigZag = "receipt-zig-zag";

export function Receipt({
  items,
  taxRate = 0.1,
  total,
  className,
}: ReceiptProps) {
  const subtotal = items.reduce((sum, it) => sum + parseFloat(it.price), 0);
  const tax = subtotal * taxRate;

  return (
    <div
      className={cn(
        "w-full rounded-lg border border-foreground bg-secondary text-secondary-foreground shadow-sm",
        FadeIn,
        className
      )}
    >
      {/* Receipt header */}
      <div className="border-b border-border/80 pb-4 mb-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-thermal">THERMAL RECEIPT</span>
          <span className="font-mono text-xs uppercase tracking-wider">#{Math.random().toString(36).slice(2, 8).toUpperCase()}</span>
        </div>
      </div>

      {/* Items list with zig-zag bottom */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {items.map((it, i) => (
          <div
            key={i}
            className={cn(
              "flex items-baseline py-1.5",
              ZigZag
            )}
          >
            <span className="font-mono text-xs flex-1 line-clamp-1">{it.label}</span>
            <span className="font-mono text-right text-xs opacity-80">{it.price}</span>
          </div>
        ))}
      </div>

      {/* Totals row with dashed separator */}
      <div
        className={cn(
          "flex items-baseline justify-between pt-2 border-t border-dashed border-border/50",
          ZigZag
        )}
      >
        <span className="text-xs font-mono text-muted-foreground">Total</span>
        <span className="font-mono text-right font-bold">{total}</span>
      </div>

      {/* Footer */}
      <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">
        Thank you for your purchase!
      </div>
    </div>
  );
}