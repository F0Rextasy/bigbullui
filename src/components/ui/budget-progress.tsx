"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface BudgetCategory {
  id: string;
  label: string;
  spent: number;
  limit: number;
}

export interface BudgetProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: BudgetCategory[];
  currency?: string;
}

/** Bütçe harcama çubuğu: kategorili, aşım uyarılı. */
export function BudgetProgress({ categories, currency = "₺", className, ...props }: BudgetProgressProps) {
  return (
    <div className={cn("w-full max-w-sm space-y-3", className)} {...props}>
      <style>{`@keyframes bpFill { from { transform: scaleX(0); } }`}</style>
      {categories.map((cat, idx) => {
        const pct = Math.min(100, Math.round((cat.spent / Math.max(1, cat.limit)) * 100));
        const over = cat.spent > cat.limit;
        const warn = !over && pct >= 85;
        return (
          <div key={cat.id} className="animate-[fade-in-up_0.3s_ease-out_both] motion-reduce:animate-none" style={{ animationDelay: `${idx * 70}ms` }}>
            <div className="flex items-baseline justify-between text-xs">
              <span className="font-medium">{cat.label}</span>
              <span className={cn("font-mono tabular-nums", over ? "text-destructive" : "text-muted-foreground")}>
                {cat.spent.toLocaleString("tr-TR")} / {cat.limit.toLocaleString("tr-TR")} {currency}
              </span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-border/50">
              <div
                className={cn(
                  "h-full origin-left rounded-full transition-colors duration-300 motion-reduce:transition-none",
                  over ? "bg-destructive" : warn ? "bg-amber-500" : "bg-accent"
                )}
                style={{ width: `${pct}%`, animation: "bpFill 0.6s cubic-bezier(0.16,1,0.3,1) both", animationDelay: `${idx * 70}ms` }}
              />
            </div>
            {over && <p className="mt-0.5 font-mono text-[9px] text-destructive">Bütçe {(cat.spent - cat.limit).toLocaleString("tr-TR")} {currency} aşıldı</p>}
          </div>
        );
      })}
    </div>
  );
}
