"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CheckoutSummaryItem {
  id: string;
  title: string;
  price: string;
  qty: number;
}

export interface CheckoutSummaryProps {
  items: CheckoutSummaryItem[];
  subtotal?: string;
  tax?: string;
  total?: string;
  cta?: string;
  className?: string;
  onQtyChange?: (id: string, qty: number) => void;
  onCheckout?: () => void;
}

const StepSlide = "checkout-step-slide";
const FadeIn = "checkout-fade-in";

export function CheckoutSummary({
  items,
  subtotal = "$0.00",
  tax = "$0.00",
  total = "$0.00",
  cta = "Checkout",
  className,
  onQtyChange,
  onCheckout,
}: CheckoutSummaryProps) {
  const [localQtys, setLocalQtys] = React.useState<Record<string, number>>({});
  const qtyOf = (it: CheckoutSummaryItem) => localQtys[it.id] ?? it.qty;
  const bump = (id: string, d: number) => {
    const current = items.find((it) => it.id === id);
    if (!current) return;
    const next = Math.max(1, qtyOf(current) + d);
    if (onQtyChange) {
      onQtyChange(id, next);
      return;
    }
    setLocalQtys((prev) => ({ ...prev, [id]: next }));
  };
  return (
    <div
      className={cn(
        "rounded-lg border border-foreground bg-card text-card-foreground p-6 shadow-sm motion-reduce:shadow-none",
        className
      )}
    >
      {/* Items section */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {items.map((it) => (
          <div
            key={it.id}
            className={cn(
              "flex items-baseline justify-between py-2 border-b border-border/50 last:border-0",
              StepSlide
            )}
          >
            <span className="font-medium line-clamp-1 min-w-0">{it.title}</span>
            <div className="flex items-baseline gap-2">
              <button
                type="button"
                onClick={() => bump(it.id, -1)}
                className={cn(
                  "rounded border border-border w-6 h-6 flex items-center justify-center text-xs font-mono",
                  "motion-reduce:transition-none"
                )}
                aria-label={`Decrease quantity of ${it.title}`}
              >
                −
              </button>
              <span className="font-mono w-8 text-center" aria-live="polite">{qtyOf(it)}</span>
              <button
                type="button"
                onClick={() => bump(it.id, 1)}
                className={cn(
                  "rounded border border-border w-6 h-6 flex items-center justify-center text-xs font-mono",
                  "motion-reduce:transition-none"
                )}
                aria-label={`Increase quantity of ${it.title}`}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 pt-4 border-t border-border/50">
        <span className="text-sm font-mono text-muted-foreground">Subtotal</span>
        <span className="font-mono text-right">{subtotal}</span>

        {tax && (
          <div className="ms-2 flex items-baseline gap-2">
            <span className="text-sm font-mono text-muted-foreground">Tax</span>
            <span className="font-mono text-right ms-2">{tax}</span>
          </div>
        )}

        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-medium text-sm font-mono">Total</span>
          <span className="font-mono text-right text-accent font-bold">{total}</span>
        </div>
      </div>

      {/* CTA */}
      {cta && (
        <button
          type="button"
          onClick={() => onCheckout?.()}
          className={cn(
            "mt-4 w-full rounded-md bg-accent text-accent-foreground px-4 py-2 text-sm font-semibold uppercase tracking-widest hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors duration-150 motion-reduce:transition-none motion-reduce:focus-visible:ring-0",
            FadeIn
          )}
        >
          {cta}
        </button>
      )}
    </div>
  );
}