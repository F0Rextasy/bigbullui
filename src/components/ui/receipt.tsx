"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ReceiptProps extends React.HTMLAttributes<HTMLElement> {
  items: { label: string; price: string }[];
  taxRate?: number;
  total: string;
  className?: string;
}

function parseAmount(raw: string): number {
  const n = parseFloat(raw.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function Receipt({
  items = [],
  taxRate = 0.1,
  total = "",
  className, ...props
}: ReceiptProps) {
  const subtotal = items.reduce((sum, it) => sum + parseAmount(it.price), 0);
  const tax = subtotal * Math.max(0, taxRate);

  return (
    <div
      className={cn(
        "w-full rounded-lg border border-foreground bg-secondary p-4 text-secondary-foreground shadow-sm motion-safe:animate-[fade-in_0.2s_ease-out_both]",
        className,
      )} {...props}
    >
      <div className="mb-3 border-b border-dashed border-border/80 pb-3">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          THERMAL RECEIPT
        </span>
      </div>

      <div className="max-h-96 space-y-2 overflow-y-auto">
        {items.map((it, i) => (
          <div key={`${it.label}-${i}`} className="flex items-baseline justify-between gap-2 py-1">
            <span className="line-clamp-1 flex-1 font-mono text-xs">{it.label}</span>
            <span className="text-end font-mono text-xs opacity-80">{it.price}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 space-y-1 border-t border-dashed border-border/80 pt-3 font-mono text-xs">
        <div className="flex items-baseline justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>{subtotal.toFixed(2)}</span>
        </div>
        {taxRate > 0 ? (
          <div className="flex items-baseline justify-between text-muted-foreground">
            <span>{`Tax (${Math.round(taxRate * 100)}%)`}</span>
            <span>{tax.toFixed(2)}</span>
          </div>
        ) : null}
        <div className="flex items-baseline justify-between pt-1 text-sm font-bold text-foreground">
          <span>Total</span>
          <span>{total}</span>
        </div>
      </div>

      <div className="mt-3 border-t border-dashed border-border/60 pt-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
        Thank you for your purchase!
      </div>
    </div>
  );
}
