"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface StockStatusProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** mevcut stok */
  stock: number;
  /** az stok eşiği */
  lowAt?: number;
  labelInStock?: string;
}

/** Stok durumu göstergesi: var/az/yok + nabız animasyonu. */
export function StockStatus({ stock, lowAt = 5, labelInStock = "Stokta", className, ...props }: StockStatusProps) {
  const out = stock <= 0;
  const low = stock > 0 && stock <= lowAt;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
        out ? "border-destructive/50 bg-destructive/10 text-destructive" : low ? "border-amber-500/50 bg-amber-500/10 text-amber-600" : "border-emerald-500/50 bg-emerald-500/10 text-emerald-600",
        className
      )}
      role="status"
      {...props}
    >
      <span
        className={cn(
          "size-1.5 rounded-full bg-current",
          !out && (low ? "animate-pulse motion-reduce:animate-none" : "animate-pulse motion-reduce:animate-none")
        )}
        aria-hidden="true"
      />
      {out ? "Tükendi" : low ? `Son ${stock} ürün` : `${labelInStock} · ${stock}`}
    </span>
  );
}
