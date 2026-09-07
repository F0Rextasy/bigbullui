"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface UsageQuotaRingProps extends React.HTMLAttributes<HTMLDivElement> {
  used?: number;
  limit?: number;
  label?: string;
}

/** Usage quota ring stub: animated SVG ring with over-limit stamp. */
export function UsageQuotaRing({ used = 780, limit = 1000, label = "API calls", className, ...props }: UsageQuotaRingProps) {
  const pct = Math.min(100, Math.round((used / Math.max(1, limit)) * 100));
  const r = 30;
  const c = 2 * Math.PI * r;
  const over = used > limit;
  return (
    <div className={cn("flex w-full max-w-xs items-center gap-3 rounded-lg border border-border bg-card p-4", className)} {...props}>
      <div className="relative size-20 shrink-0" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <svg viewBox="0 0 76 76" className="size-full -rotate-90">
          <circle cx="38" cy="38" r={r} fill="none" strokeWidth="8" className="stroke-border/60" />
          <circle cx="38" cy="38" r={r} fill="none" strokeWidth="8" strokeLinecap="round" className={cn(over ? "stroke-destructive" : pct >= 80 ? "stroke-amber-500" : "stroke-accent", "transition-all duration-700 motion-reduce:transition-none")} strokeDasharray={c} strokeDashoffset={c - (c * Math.min(100, pct)) / 100} />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold tabular-nums text-foreground">{pct}%</span>
      </div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
        <p className="font-mono text-xs tabular-nums text-foreground">{used.toLocaleString("en-US")} / {limit.toLocaleString("en-US")}</p>
        {over && <p className="font-mono text-[10px] font-bold uppercase text-destructive">Over quota</p>}
      </div>
    </div>
  );
}
