"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PaymentMethod {
  id: string;
  label: string;
  description?: string;
  icon: "card" | "bank" | "cash" | "wallet";
}

export interface PaymentMethodsProps extends React.HTMLAttributes<HTMLDivElement> {
  methods: PaymentMethod[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
}

const ICONS: Record<PaymentMethod["icon"], React.ReactNode> = {
  card: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></>,
  bank: <><path d="M3 10l9-7 9 7" /><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8" /><path d="M3 20h18" /></>,
  cash: <><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="3" /></>,
  wallet: <><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4z" /></>,
};

/** Payment method selector: card / bank / on-delivery / wallet tiles. */
export function PaymentMethods({ methods, value, defaultValue, onValueChange, className, ...props }: PaymentMethodsProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? methods[0]?.id);
  const active = value ?? internal;

  return (
    <div className={cn("grid grid-cols-2 gap-2", className)} role="radiogroup" aria-label="Payment method" {...props}>
      <style>{`@keyframes pmIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      {methods.map((m, idx) => {
        const selected = active === m.id;
        return (
          <button
            key={m.id}
            role="radio"
            aria-checked={selected}
            onClick={() => { setInternal(m.id); onValueChange?.(m.id); }}
            className={cn(
              "flex items-center gap-2.5 rounded-md border p-3 text-left transition-all duration-200 motion-reduce:transition-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "animate-[pmIn_0.3s_ease-out_both] motion-reduce:animate-none",
              selected ? "border-accent bg-accent/5" : "border-border hover:border-foreground/40"
            )}
            style={{ animationDelay: `${idx * 55}ms` }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cn("shrink-0", selected ? "text-accent" : "text-muted-foreground")} aria-hidden="true">
              {ICONS[m.icon]}
            </svg>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium">{m.label}</span>
              {m.description && <span className="block truncate text-[11px] text-muted-foreground">{m.description}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}
