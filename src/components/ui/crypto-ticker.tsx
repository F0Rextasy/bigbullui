"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CryptoEntry {
  symbol: string;
  name: string;
  price: string;
  change: number;
}

export interface CryptoTickerProps extends React.HTMLAttributes<HTMLDivElement> {
  entries: CryptoEntry[];
}

/** Crypto ticker tape: up/down animated change indicators. */
export function CryptoTicker({ entries, className, ...props }: CryptoTickerProps) {
  return (
    <div className={cn("w-full overflow-hidden rounded-md border border-border bg-card", className)} {...props}>
      <style>{`@keyframes ctScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      <div className="flex w-max gap-6 px-4 py-2" style={{ animation: "ctScroll 20s linear infinite" }}>
        {[...entries, ...entries].map((e, idx) => (
          <div key={`${e.symbol}-${idx}`} className="flex shrink-0 items-center gap-1.5 font-mono text-xs">
            <span className="font-bold">{e.symbol}</span>
            <span className="tabular-nums text-foreground">{e.price}</span>
            <span className={cn("inline-flex items-center gap-0.5 tabular-nums", e.change >= 0 ? "text-emerald-500" : "text-destructive")}>
              <span aria-hidden="true">{e.change >= 0 ? "▲" : "▼"}</span>
              {Math.abs(e.change).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
