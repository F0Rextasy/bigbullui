"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface VendingMachineProps extends React.HTMLAttributes<HTMLDivElement> {
  products: { id: string; label: string; slot: string; price: string; inStock?: boolean }[];
  onPurchase?: (id: string) => void;
}

/** Otomatik makine: ürün grid'i + para atma + ürün düşme animasyonu. */
export function VendingMachine({ products, onPurchase, className, ...props }: VendingMachineProps) {
  const [dropping, setDropping] = React.useState<string | null>(null);

  const buy = (id: string) => {
    if (dropping) return;
    setDropping(id);
    onPurchase?.(id);
    setTimeout(() => setDropping(null), 1200);
  };

  return (
    <div className={cn("w-full max-w-xs rounded-lg border-2 border-dashed border-border bg-card p-4", className)} {...props}>
      <style>{`@keyframes vmDrop { 0% { transform: translateY(0); opacity: 1; } 80% { transform: translateY(120px); opacity: 1; } 85% { transform: translateY(110px); } 100% { transform: translateY(120px); } }`}</style>
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Otomat · ₺ nakit/kart</p>

      <div className="mt-3 grid grid-cols-3 gap-1.5">
        {products.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => buy(p.id)}
            disabled={!p.inStock || dropping !== null}
            className={cn(
              "group relative flex flex-col items-center gap-0.5 rounded-md border border-border bg-secondary/40 px-1 py-2",
              "transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "hover:border-accent disabled:opacity-40 disabled:hover:border-border",
              dropping === p.id && "border-accent"
            )}
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <span className="font-mono text-[8px] text-muted-foreground">{p.slot}</span>
            <span className="text-lg" aria-hidden="true">📦</span>
            <span className="w-full truncate text-center font-mono text-[8px] font-bold text-accent">{p.price}</span>
            {!p.inStock && <span className="absolute inset-0 flex items-center justify-center bg-card/80 font-mono text-[8px] uppercase text-destructive">Tükendi</span>}
          </button>
        ))}
      </div>

      <div className="mt-3 flex h-10 items-center justify-center rounded-sm border border-dashed border-border bg-secondary/30">
        {dropping && (
          <span className="text-lg" style={{ animation: "vmDrop 0.8s ease-in both" }} aria-hidden="true">📦</span>
        )}
      </div>

      <div className="mt-2 flex justify-center">
        <span className="h-1.5 w-16 rounded-full bg-border/50" aria-hidden="true" />
      </div>
    </div>
  );
}
