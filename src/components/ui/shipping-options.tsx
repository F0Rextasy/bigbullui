"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ShippingOption {
  id: string;
  carrier: string;
  duration: string;
  price: string;
  recommended?: boolean;
}

export interface ShippingOptionsProps extends React.HTMLAttributes<HTMLDivElement> {
  options: ShippingOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
}

/** Shipping option selector: radio card options + delivery duration + rate. */
export function ShippingOptions({ options, value, defaultValue, onValueChange, className, ...props }: ShippingOptionsProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? options.find((o) => o.recommended)?.id ?? options[0]?.id);
  const active = value ?? internal;

  return (
    <div className={cn("w-full max-w-sm space-y-2", className)} role="radiogroup" aria-label="Shipping options" {...props}>
      <style>{`@keyframes soIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      {options.map((opt, idx) => {
        const selected = active === opt.id;
        return (
          <button
            key={opt.id}
            role="radio"
            aria-checked={selected}
            onClick={() => { setInternal(opt.id); onValueChange?.(opt.id); }}
            className={cn(
              "flex w-full items-center gap-3 rounded-md border px-3 py-2.5 text-left transition-all duration-200 motion-reduce:transition-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "animate-[soIn_0.3s_ease-out_both] motion-reduce:animate-none",
              selected ? "border-accent bg-accent/5" : "border-border hover:border-foreground/40"
            )}
            style={{ animationDelay: `${idx * 55}ms` }}
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
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className="truncate text-sm font-medium">{opt.carrier}</span>
                {opt.recommended && (
                  <span className="shrink-0 rounded-full border border-accent/50 bg-accent/10 px-1.5 py-px font-mono text-[8px] uppercase tracking-wider text-accent">Recommended</span>
                )}
              </span>
              <span className="block text-xs text-muted-foreground">{opt.duration}</span>
            </span>
            <span className="shrink-0 font-mono text-sm font-bold tabular-nums">{opt.price}</span>
          </button>
        );
      })}
    </div>
  );
}
