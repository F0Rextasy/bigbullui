"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PriceOffer {
  id: string;
  seller: string;
  price: number;
  shipping?: string;
  best?: boolean;
}

export interface PriceCompareProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  offers: PriceOffer[];
  currency?: string;
}

/** Price comparison table highlighting the best vendor offer. */
export function PriceCompare({ title, offers, currency = "₺", className, ...props }: PriceCompareProps) {
  const sorted = [...offers].sort((a, b) => a.price - b.price);
  const best = sorted[0];

  return (
    <div className={cn("w-full max-w-md overflow-hidden rounded-lg border border-border bg-card", className)} {...props}>
      <style>{`@keyframes pcIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="border-b border-border px-4 py-2.5">
        <h3 className="truncate text-sm font-semibold">{title}</h3>
      </div>
      <ul className="divide-y divide-border/60">
        {sorted.map((o, idx) => (
          <li
            key={o.id}
            className={cn(
              "flex items-center justify-between gap-3 px-4 py-2.5 animate-[pcIn_0.3s_ease-out_both] motion-reduce:animate-none transition-colors motion-reduce:transition-none",
              o.best || o.id === best?.id ? "bg-accent/5" : "hover:bg-secondary/30"
            )}
            style={{ animationDelay: `${idx * 55}ms` }}
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-medium">{o.seller}</span>
                {(o.best || o.id === best?.id) && (
                  <span className="shrink-0 rounded-full bg-accent px-1.5 py-px font-mono text-[8px] uppercase tracking-wider text-accent-foreground">
                    En iyi
                  </span>
                )}
              </div>
              {o.shipping && <p className="text-[11px] text-muted-foreground">{o.shipping}</p>}
            </div>
            <span className={cn("shrink-0 font-mono text-sm font-bold tabular-nums", (o.best || o.id === best?.id) && "text-accent")}>
              {currency}{o.price.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
