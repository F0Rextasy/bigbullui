"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface InstallmentPlan {
  months: number;
  monthly: string;
  total: string;
  rate?: string;
}

export interface InstallmentPickerProps extends React.HTMLAttributes<HTMLDivElement> {
  plans: InstallmentPlan[];
  value?: number;
  defaultValue?: number;
  onValueChange?: (months: number) => void;
}

/** Taksit seçenekleri: vade + aylık + toplam tablosu. */
export function InstallmentPicker({ plans, value, defaultValue, onValueChange, className, ...props }: InstallmentPickerProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? plans[0]?.months);
  const active = value ?? internal;

  return (
    <div className={cn("w-full max-w-sm overflow-hidden rounded-lg border border-border bg-card", className)} role="radiogroup" aria-label="Taksit seçenekleri" {...props}>
      <style>{`@keyframes ipIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="border-b border-border px-4 py-2.5">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Taksit seçenekleri</h3>
      </div>
      <ul className="divide-y divide-border/60">
        {plans.map((plan, idx) => {
          const selected = active === plan.months;
          return (
            <li key={plan.months}>
              <button
                role="radio"
                aria-checked={selected}
                onClick={() => { setInternal(plan.months); onValueChange?.(plan.months); }}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors motion-reduce:transition-none",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring-inset",
                  "animate-[ipIn_0.3s_ease-out_both] motion-reduce:animate-none",
                  selected ? "bg-accent/5" : "hover:bg-secondary/30"
                )}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <span
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-150 motion-reduce:transition-none",
                    selected ? "border-accent" : "border-border"
                  )}
                  aria-hidden="true"
                >
                  {selected && <span className="size-2 rounded-full bg-accent" />}
                </span>
                <span className="flex-1">
                  <span className={cn("block text-sm", selected ? "font-semibold text-accent" : "font-medium")}>{plan.months} taksit</span>
                  {plan.rate && <span className="block text-[11px] text-muted-foreground">Aylık %{plan.rate}</span>}
                </span>
                <span className="shrink-0 text-right">
                  <span className={cn("block font-mono text-sm font-bold tabular-nums", selected && "text-accent")}>{plan.monthly}</span>
                  <span className="block font-mono text-[10px] tabular-nums text-muted-foreground">Toplam {plan.total}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
