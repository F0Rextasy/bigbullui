"use client";

import * as React from "react";
import { cn } from "./lib/utils";
import { UsageMeter } from "./usage-meter";
import { TeamMembers } from "./team-members";

export interface BillingPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  plan: string;
  price: string;
  cycle: string;
  invoices?: { id: string; date: string; amount: string }[];
  onUpgrade?: () => void;
}

/** Billing overview panel: plan + usage meters + invoice history. */
export function BillingPanel({ plan, price, cycle, invoices = [], onUpgrade, className, ...props }: BillingPanelProps) {
  return (
    <div className={cn("w-full max-w-2xl space-y-4", className)} {...props}>
      <style>{`@keyframes bpIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      {/* Plan card */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-accent/40 bg-accent/5 p-4 animate-[bpIn_0.3s_ease-out_both] motion-reduce:animate-none">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Mevcut plan</p>
          <p className="mt-0.5 text-lg font-bold">{plan}</p>
          <p className="text-xs text-muted-foreground">{price} / {cycle}</p>
        </div>
        <button
          onClick={onUpgrade}
          className={cn(
            "rounded-md bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-accent-foreground",
            "transition-all duration-150 hover:bg-accent/90 active:scale-[0.97]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
          )}
        >
          Planı yükselt
        </button>
      </div>

      {/* Usage meters */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <UsageMeter label="Proje" used={7} limit={10} />
        <UsageMeter label="API requests / mo" used={18400} limit={50000} />
      </div>

      {/* Faturalar */}
      <div className="overflow-hidden rounded-lg border border-border bg-card animate-[bpIn_0.3s_ease-out_0.15s_both] motion-reduce:animate-none">
        <div className="border-b border-border px-4 py-2.5">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Faturalar</h3>
        </div>
        <ul className="divide-y divide-border/60">
          {invoices.slice(0, 5).map((inv, i) => (
            <li key={inv.id} className="flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-secondary/30 motion-reduce:transition-none" style={{ transitionDelay: `${i * 30}ms` }}>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted-foreground">{inv.id}</span>
                <span className="text-xs text-muted-foreground">{inv.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs tabular-nums">{inv.amount}</span>
                <button className="font-mono text-[9px] uppercase tracking-wider text-accent hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm">PDF</button>
              </div>
            </li>
          ))}
          {invoices.length === 0 && <li className="px-4 py-4 text-center text-xs text-muted-foreground">Fatura yok</li>}
        </ul>
      </div>
    </div>
  );
}
