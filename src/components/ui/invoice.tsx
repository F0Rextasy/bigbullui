"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface InvoiceLineItem {
  label: string;
  qty: number;
  price: string;
}

export interface InvoiceProps {
  number: string;
  items: InvoiceLineItem[];
  taxRate?: number;
  status?: "draft" | "paid" | "void";
  className?: string;
}

const StripeEnter = "invoice-stripe-enter";
const TotalRise = "invoice-total-rise";
const Pulse = "invoice-status-pulse";

export function Invoice({
  number,
  items,
  taxRate = 0.1,
  status = "draft",
  className,
}: InvoiceProps) {
  const subtotal = items.reduce((sum, it) => sum + parseFloat(it.price) * it.qty, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div
      className={cn(
        "rounded-lg border border-foreground bg-card text-card-foreground p-6 shadow-sm motion-reduce:shadow-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-border/80 pb-4">
        <div className="flex justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Invoice #{number}</span>
          <span className={cn(
            "px-2 py-0.5 rounded text-xs font-mono uppercase tracking-widest",
            status === "draft" && "bg-secondary/20 text-muted-foreground",
            status === "paid" && "bg-accent/10 text-accent",
            status === "void" && "bg-destructive/10 text-destructive",
            TotalRise
          )}>
            {status}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-mono">Date: 2026-09-15</span>
          <span className="text-sm font-mono">Due: 2026-10-15</span>
        </div>
      </div>

      {/* Line items table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-muted-foreground">
              <th className="text-left">Item</th>
              <th className="text-center">Qty</th>
              <th className="text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr
                key={i}
                className={cn(
                  "border-t border-border/50 last:border-0",
                  "motion-reduce:transition-none"
                )}
              >
                <td className="font-medium">{it.label}</td>
                <td className="text-center font-mono">{it.qty}</td>
                <td className="text-right font-mono">{it.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="mt-4 space-y-1.5 pt-4 border-t border-border/80">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-mono text-muted-foreground">Subtotal</span>
          <span className="font-mono text-right">{subtotal.toFixed(2)}</span>
        </div>
        {taxRate > 0 && (
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-mono text-muted-foreground">Tax ({taxRate * 100}%)</span>
            <span className="font-mono text-right ml-2">{tax.toFixed(2)}</span>
          </div>
        )}
        <div className={cn("flex items-baseline justify-between pt-1", TotalRise)}>
          <span className="font-medium">Total</span>
          <span className="font-medium text-accent text-right">{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}