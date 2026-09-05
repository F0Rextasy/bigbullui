"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface OrderCardProps {
  orderId: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  progress?: number;
  items?: { label: string; qty: number }[];
  className?: string;
}

const ProgressBar = "order-progress-bar";
const StatusEnter = "order-status-enter";

export function OrderCard({
  orderId,
  status = "Processing",
  progress = 0,
  items,
  className,
}: OrderCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-foreground bg-card text-card-foreground p-6 transition-all duration-300 hover:translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:shadow-none",
        className
      )}
    >
      <div className="flex items-baseline justify-between mb-4">
        <span className="font-mono text-sm uppercase tracking-widest">Order {orderId}</span>
        <span className={cn(
          "px-2 py-0.5 rounded text-xs font-mono uppercase tracking-wider",
          status === "Processing" && "bg-amber-500 text-amber-100",
          status === "Shipped" && "bg-green-500 text-green-100",
          status === "Delivered" && "bg-emerald-500 text-emerald-100",
          status === "Cancelled" && "bg-destructive text-destructive-foreground",
          StatusEnter
        )}>
          {status}
        </span>
      </div>

      {/* Progress bar */}
      {progress > 0 && progress < 1 && (
        <div className="w-full bg-secondary/20 rounded-h-full h-2 mb-3 overflow-hidden">
          <div
            className={cn(
              "h-full bg-accent rounded-h-full transition-width duration-500",
              ProgressBar,
              `w-${Math.min(progress * 100, 100)}%`
            )}
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