"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SubscriptionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  plan: string;
  price: string;
  cycle: string;
  renewDate: string;
  features?: string[];
  onCancel?: () => void;
}

/** Subscription tier card: plan + renewal date + features + cancel. */
export function SubscriptionCard({ plan, price, cycle, renewDate, features = [], onCancel, className, ...props }: SubscriptionCardProps) {
  return (
    <div className={cn("w-full max-w-sm rounded-lg border-2 border-dashed border-accent/40 bg-card p-5", className)} {...props}>
      <style>{`@keyframes subIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Abonelik</p>
          <h3 className="mt-0.5 text-lg font-bold">{plan}</h3>
        </div>
        <div className="text-right">
          <span className="font-mono text-lg font-bold tabular-nums">{price}</span>
          <span className="block text-[10px] text-muted-foreground">/ {cycle}</span>
        </div>
      </div>

      {features.length > 0 && (
        <ul className="mt-3 space-y-1">
          {features.map((f, i) => (
            <li key={f} className="flex items-center gap-2 text-sm animate-[subIn_0.3s_ease-out_both] motion-reduce:animate-none" style={{ animationDelay: `${i * 60}ms` }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
              {f}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-dashed border-border pt-3">
        <p className="text-xs text-muted-foreground">Yenileme: <span className="font-medium text-foreground">{renewDate}</span></p>
        <button
          onClick={onCancel}
          className="font-mono text-[10px] uppercase tracking-wider text-destructive hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-destructive rounded-sm"
        >
          Cancel Plan
        </button>
      </div>
    </div>
  );
}
