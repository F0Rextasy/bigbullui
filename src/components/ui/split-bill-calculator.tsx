"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SplitBillPerson {
  name: string;
  paid?: number;
}

export interface SplitBillCalculatorProps extends React.HTMLAttributes<HTMLDivElement> {
  total?: number;
  defaultTotal?: number;
  people?: SplitBillPerson[];
  currency?: string;
}

export function SplitBillCalculator({
  total: controlledTotal,
  defaultTotal = 120,
  people = [{ name: "Ada" }, { name: "Grace" }, { name: "Linus" }],
  currency = "$",
  className,
  ...props
}: SplitBillCalculatorProps) {
  const [innerTotal, setInnerTotal] = React.useState(defaultTotal);
  const total = controlledTotal ?? innerTotal;
  const [tipPct, setTipPct] = React.useState(10);

  const withTip = total * (1 + tipPct / 100);
  const perPerson = people.length > 0 ? withTip / people.length : 0;

  return (
    <div className={cn("w-full max-w-sm rounded-lg border border-border bg-card p-4", className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Bill total</span>
        <div className="flex items-center gap-1 font-mono text-sm">
          <span className="text-muted-foreground">{currency}</span>
          <input
            value={total}
            inputMode="decimal"
            aria-label="Bill total"
            onChange={(e) => setInnerTotal(Number(e.target.value.replace(/[^0-9.]/g, "")) || 0)}
            className="w-20 bg-transparent text-right font-bold tabular-nums focus:outline-none"
          />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span className="font-mono text-[11px] uppercase text-muted-foreground">Tip</span>
        {[0, 10, 15, 20].map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={tipPct === t}
            onClick={() => setTipPct(t)}
            className={cn(
              "cursor-pointer rounded border px-2 py-1 font-mono text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              tipPct === t ? "border-foreground bg-primary font-bold text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {t}%
          </button>
        ))}
      </div>
      <div className="mt-3 space-y-1.5 border-t border-dashed border-border pt-3">
        {people.map((p) => (
          <div key={p.name} className="flex items-center justify-between font-mono text-sm">
            <span>{p.name}</span>
            <strong className="tabular-nums">
              {currency}
              {perPerson.toFixed(2)}
            </strong>
          </div>
        ))}
      </div>
      <p className="mt-3 border-t border-dashed border-border pt-2 text-right font-mono text-xs text-muted-foreground">
        Total with tip:{" "}
        <strong className="text-base text-foreground tabular-nums">
          {currency}
          {withTip.toFixed(2)}
        </strong>
      </p>
    </div>
  );
}
