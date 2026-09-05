"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ExchangeRateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  rates?: Record<string, number>;
  defaultFrom?: string;
  defaultTo?: string;
}

const RATE_TABLE: Record<string, number> = { TRY: 1, USD: 0.029, EUR: 0.027, GBP: 0.023 };

function convert(amount: number, from: string, to: string, rates: Record<string, number>): number {
  const f = rates[from] ?? 1;
  const t = rates[to] ?? 1;
  if (f === 0) return 0;
  return (amount / f) * t;
}

function CurrencySelect({
  side,
  value,
  codes,
  onSelect,
}: {
  side: "from" | "to";
  value: string;
  codes: string[];
  onSelect: (side: "from" | "to", code: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onSelect(side, e.target.value)}
      aria-label={side === "from" ? "Source currency" : "Target currency"}
      className="rounded-md border border-input bg-background px-2 py-1.5 font-mono text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors motion-reduce:transition-none"
    >
      {codes.map((c) => <option key={c} value={c}>{c}</option>)}
    </select>
  );
}

/** Exchange rate converter: live bidirectional conversion. */
export function ExchangeRate({ rates = RATE_TABLE, defaultFrom = "TRY", defaultTo = "USD", className, ...props }: ExchangeRateProps) {
  const codes = Object.keys(rates);
  const [from, setFrom] = React.useState(defaultFrom);
  const [to, setTo] = React.useState(defaultTo);
  const [amount, setAmount] = React.useState(100);

  const result = convert(amount, from, to, rates);

  const select = (side: "from" | "to", code: string) => {
    if (side === "from") {
      if (code === to) setTo(from);
      setFrom(code);
    } else {
      if (code === from) setFrom(to);
      setTo(code);
    }
  };

  return (
    <div className={cn("w-full max-w-sm rounded-lg border border-border bg-card p-4", className)} {...props}>
      <style>{`@keyframes exSwap { from { transform: rotate(0); } to { transform: rotate(180deg); } }`}</style>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
          aria-label="Amount"
          className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2 font-mono text-sm tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors motion-reduce:transition-none"
        />
        <CurrencySelect side="from" value={from} codes={codes} onSelect={select} />
      </div>
      <div className="my-2 flex justify-center">
        <button
          onClick={() => { const f = from; setFrom(to); setTo(f); }}
          className="rounded-full border border-border p-1.5 text-muted-foreground transition-transform duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
          style={{ transitionProperty: "transform" }}
          onTransitionEnd={undefined}
          title="Switch currencies"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:animate-[exSwap_0.3s_ease-out] motion-reduce:animate-none" aria-hidden="true"><path d="M7 16V4m0 0L3 8m4-4l4 4" /><path d="M17 8v12m0 0l4-4m-4 4l-4-4" /></svg>
        </button>
      </div>
      <div className="flex items-center gap-2">
        <output className="min-w-0 flex-1 rounded-md border border-dashed border-accent/50 bg-accent/5 px-3 py-2 font-mono text-sm font-bold tabular-nums text-accent">
          {result.toLocaleString("en-US", { maximumFractionDigits: 2 })}
        </output>
        <CurrencySelect side="to" value={to} codes={codes} onSelect={select} />
      </div>
      <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
        1 {from} = {convert(1, from, to, rates).toFixed(4)} {to}
      </p>
    </div>
  );
}
