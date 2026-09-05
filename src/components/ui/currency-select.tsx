"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CurrencyOption {
  code: string;
  symbol: string;
  label: string;
}

export const CURRENCIES: CurrencyOption[] = [
  { code: "TRY", symbol: "₺", label: "Türk Lirası" },
  { code: "USD", symbol: "$", label: "Amerikan Doları" },
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "GBP", symbol: "£", label: "Sterlin" },
];

export interface CurrencySelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (code: string) => void;
}

/** Para birimi seçici: sembol + kod dropdown. */
export function CurrencySelect({ value, defaultValue, onValueChange, className, ...props }: CurrencySelectProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? "TRY");
  const [open, setOpen] = React.useState(false);
  const active = CURRENCIES.find((c) => c.code === (value ?? internal)) ?? CURRENCIES[0];

  return (
    <div className={cn("relative", className)} {...props}>
      <style>{`@keyframes curIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={cn(
          "flex w-full items-center gap-2.5 rounded-md border border-input bg-background px-3 py-2 text-sm",
          "transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "hover:border-foreground/40"
        )}
      >
        <span className="font-mono text-base font-bold text-accent">{active.symbol}</span>
        <span className="flex-1 text-left">{active.label}</span>
        <span className="font-mono text-[10px] text-muted-foreground">{active.code}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("shrink-0 text-muted-foreground transition-transform duration-200 motion-reduce:transition-none", open && "rotate-180")} aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} aria-hidden="true" />
          <ul role="listbox" className="absolute z-30 mt-1 w-full rounded-md border border-border bg-card p-1 shadow-lg animate-[curIn_0.2s_ease-out_both] motion-reduce:animate-none">
            {CURRENCIES.map((c) => (
              <li key={c.code}>
                <button
                  role="option"
                  aria-selected={c.code === active.code}
                  onClick={() => { setInternal(c.code); onValueChange?.(c.code); setOpen(false); }}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-sm px-2 py-1.5 text-sm transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    c.code === active.code ? "bg-accent/10 text-accent" : "hover:bg-secondary"
                  )}
                >
                  <span className="font-mono font-bold">{c.symbol}</span>
                  <span className="flex-1 text-left">{c.label}</span>
                  <span className="font-mono text-[10px] text-muted-foreground">{c.code}</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
