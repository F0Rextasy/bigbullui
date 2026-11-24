"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface OrderCardProps extends React.HTMLAttributes<HTMLElement> {
  orderId: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  progress?: number;
  items?: { label: string; qty: number }[];
  className?: string;
}

export function OrderCard({
  orderId,
  status = "Processing",
  progress = 0,
  items,
  className, ...props
}: OrderCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-foreground bg-card text-card-foreground p-6 transition-[transform,opacity,background-color,border-color,color] duration-300 hover:translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:shadow-none",
        className
      )} {...props}
    >
      <div className="flex items-baseline justify-between mb-4">
        <span className="font-mono text-sm uppercase tracking-widest">Order {orderId}</span>
        <span className={cn(
          "px-2 py-0.5 rounded text-xs font-mono uppercase tracking-wider",
          status === "Processing" && "bg-warning text-white",
          status === "Shipped" && "bg-success text-white",
          status === "Delivered" && "bg-success text-white",
          status === "Cancelled" && "bg-destructive text-white"
        )}>
          {status}
        </span>
      </div>

      {/* Progress bar */}
      {progress > 0 && progress < 1 && (
        <div className="w-full bg-secondary/40 rounded-full h-2 mb-3 overflow-hidden">
          <div
            style={{ width: `${Math.min(Math.max(progress * 100, 0), 100)}%` }}
            className="h-full rounded-full bg-accent transition-[width] duration-500 motion-reduce:transition-none"
          />
        </div>
      )}

      {/* Items list */}
      {items && items.length > 0 && (
        <div className="space-y-2 text-sm">
          {items.map((it, i) => (
            <div key={i} className="flex items-baseline justify-between">
              <span className="font-medium">{it.label}</span>
              <span className="font-mono text-muted-foreground">{it.qty}x</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}