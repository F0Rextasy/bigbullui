"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface BettingPick {
  id: string;
  match: string;
  options: { label: string; odds: string }[];
}

export interface BettingSlipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  picks: BettingPick[];
  stake?: string;
  onSubmit?: (selections: Record<string, string>) => void;
}

/** Bahis kuponu: maçlar + oran seçimi + toplam oran. */
export function BettingSlip({ picks, stake = "₺100", onSubmit, className, ...props }: BettingSlipProps) {
  const [selections, setSelections] = React.useState<Record<string, string>>({});
  const count = Object.keys(selections).length;

  return (
    <div className={cn("w-full max-w-xs rounded-lg border-2 border-dashed border-border bg-card p-3", className)} {...props}>
      <style>{`@keyframes bsIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Kupon · {count} maç</p>
        {count > 0 && (
          <button onClick={() => setSelections({})} className="font-mono text-[9px] uppercase text-destructive hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-destructive rounded-sm">
            Temizle
          </button>
        )}
      </div>

      <ul className="mt-2 space-y-2">
        {picks.map((pick, idx) => (
          <li key={pick.id} className="animate-[bsIn_0.3s_ease-out_both] motion-reduce:animate-none" style={{ animationDelay: `${idx * 55}ms` }}>
            <p className="mb-1 truncate text-[11px] font-medium text-muted-foreground">{pick.match}</p>
            <div className="grid grid-cols-3 gap-1">
              {pick.options.map((opt) => {
                const selected = selections[pick.id] === opt.label;
                return (
                  <button
                    key={opt.label}
                    onClick={() => setSelections((s) => { const n = { ...s }; if (n[pick.id] === opt.label) delete n[pick.id]; else n[pick.id] = opt.label; return n; })}
                    className={cn(
                      "rounded-sm border py-1 font-mono text-[10px] transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                      selected ? "border-accent bg-accent/10 font-bold text-accent" : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                    )}
                  >
                    <span className="block">{opt.label}</span>
                    <span className="block text-[9px] opacity-70">{opt.odds}</span>
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Miktar: {stake}</span>
        <button
          onClick={() => onSubmit?.(selections)}
          disabled={count === 0}
          className="rounded-md bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-foreground transition-all duration-150 hover:bg-accent/90 active:scale-95 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
        >
          Kupon oyna
        </button>
      </div>
    </div>
  );
}
