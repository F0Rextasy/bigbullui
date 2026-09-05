"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface OrderTrackStep {
  id: string;
  label: string;
  date?: string;
  done?: boolean;
}

export interface OrderTrackingProps extends React.HTMLAttributes<HTMLDivElement> {
  orderId: string;
  steps: OrderTrackStep[];
  courier?: string;
}

/** Order tracking timeline: status nodes + delivery carrier. */
export function OrderTracking({ orderId, steps, courier, className, ...props }: OrderTrackingProps) {
  return (
    <div className={cn("w-full max-w-md rounded-lg border border-border bg-card p-4", className)} {...props}>
      <style>{`
        @keyframes otLine { from { transform: scaleX(0); } }
        @keyframes otPop { 0% { transform: scale(0); } 70% { transform: scale(1.3); } 100% { transform: scale(1); } }
      `}</style>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Order {orderId}</span>
        {courier && <span className="font-mono text-[10px] text-muted-foreground">{courier}</span>}
      </div>

      <div className="relative mt-5">
        <div className="absolute left-0 right-0 top-2 h-0.5 rounded-full bg-border/60" aria-hidden="true" />
        <div
          className="absolute left-0 top-2 h-0.5 origin-left rounded-full bg-accent"
          style={{
            width: `${(steps.filter((s) => s.done).length / Math.max(1, steps.length - 1)) * 100}%`,
            animation: "otLine 0.8s cubic-bezier(0.16,1,0.3,1) both",
          }}
          aria-hidden="true"
        />
        <div className="relative flex justify-between">
          {steps.map((s, idx) => (
            <div key={s.id} className="flex w-1/5 flex-col items-center" style={{ marginLeft: idx === 0 ? 0 : undefined }}>
              <span
                className={cn(
                  "flex size-5 items-center justify-center rounded-full border-2",
                  s.done ? "border-accent bg-accent text-accent-foreground" : "border-border bg-card"
                )}
                style={{ animation: s.done ? "otPop 0.35s ease-out both" : undefined, animationDelay: `${idx * 150}ms` }}
                aria-hidden="true"
              >
                {s.done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>}
              </span>
              <span className={cn("mt-1 text-center text-[10px] leading-tight", s.done ? "font-medium" : "text-muted-foreground")}>{s.label}</span>
              {s.date && <span className="text-center font-mono text-[8px] text-muted-foreground">{s.date}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
