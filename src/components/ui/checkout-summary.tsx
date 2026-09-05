"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CheckoutSummaryProps {
  items: { id: string; title: string; price: string; qty: number }[];
  subtotal?: string;
  tax?: string;
  total?: string;
  cta?: string;
  className?: string;
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
}: CheckoutSummaryProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-foreground bg-card text-card-foreground p-6 shadow-sm motion-reduce:shadow-none",
        className
      )}
    >
      {/* Items section */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {items.map((it, i) => (
          <div
            key={i}
            className={cn(
              "flex items-baseline justify-between py-2 border-b border-border/50 last:border-0",
              StepSlide
            )}
          >
            <span className="font-medium line-clamp-1">{it.title}</span>
            <div className="flex items-baseline gap-2">
              <button
                className={cn(
                  "rounded border border-border w-6 h-6 flex items-center justify-center text-xs font-mono",
                  "motion-reduce:transition-none"
                )}
                aria-label="decrease qty"
              >
                −
              </button>
              <span className="font-mono w-8 text-center">{it.qty}</span>
              <button
                className={cn(
                  "rounded border border-border w-6 h-6 flex items-center justify-center text-xs font-mono",
                  "motion-reduce:transition-none"
                )}
                aria-label="increase qty"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="mt-4 flex items-baseline justify-between pt-4 border-t border-border/50">
        <span className="text-sm font-mono text-muted-foreground">Subtotal</span>
        <span className="font-mono text-right">{subtotal}</span>

        {tax && (
          <div className="ml-2 flex items-baseline gap-2">
            <span className="text-sm font-mono text-muted-foreground">Tax</span>
            <span className="font-mono text-right ml-2">{tax}</span>
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