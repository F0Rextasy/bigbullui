"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  tag?: string;
}

export interface ShopGridProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: ShopItem[];
  onBuy?: (id: string) => void;
}

/** Shop grid: purchasable item cards with price and buy action. */
export function ShopGrid({ items, onBuy, className, ...props }: ShopGridProps) {
  const fallback: ShopItem[] = [
    { id: "s1", name: "Medkit", price: 150, tag: "HOT" },
    { id: "s2", name: "Shield", price: 300 },
    { id: "s3", name: "Boost", price: 220, tag: "NEW" },
    { id: "s4", name: "Radar", price: 410 },
  ];
  return (
    <div role="list" aria-label="Shop items" className={cn("grid touch-none grid-cols-2 gap-2 select-none", className)} style={{ touchAction: "none" }} {...props}>
      {(items ?? fallback).map((item) => (
        <div key={item.id} role="listitem" className="rounded-md border-2 border-foreground bg-card p-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-black uppercase text-foreground">{item.name}</span>
            {item.tag && <span className="rounded bg-accent px-1.5 py-0.5 font-mono text-[9px] font-black text-accent-foreground">{item.tag}</span>}
          </div>
          <p className="mt-1 font-mono text-[11px] tabular-nums text-muted-foreground">{item.price} COINS</p>
          <button
            type="button"
            onClick={() => onBuy?.(item.id)}
            aria-label={`Buy ${item.name} for ${item.price} coins`}
            className="mt-2 min-h-11 w-full touch-none rounded-md border border-foreground bg-primary font-mono text-xs font-bold uppercase text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{ touchAction: "none" }}
          >
            Buy
          </button>
        </div>
      ))}
    </div>
  );
}
