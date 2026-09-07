"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type CardBrand = "visa" | "mastercard" | "amex" | "unknown";

export interface CreditCardInputValue {
  number: string;
  expiry: string;
  cvc: string;
  brand: CardBrand;
}

export interface CreditCardInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: Partial<CreditCardInputValue>;
  defaultValue?: Partial<CreditCardInputValue>;
  onValueChange?: (value: CreditCardInputValue, valid: boolean) => void;
  label?: string;
}

function detectBrand(digits: string): CardBrand {
  if (/^4/.test(digits)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(digits)) return "mastercard";
  if (/^3[47]/.test(digits)) return "amex";
  return "unknown";
}

function groupNumber(digits: string, brand: CardBrand): string {
  if (brand === "amex") {
    return [digits.slice(0, 4), digits.slice(4, 10), digits.slice(10, 15)].filter(Boolean).join(" ");
  }
  return (digits.match(/.{1,4}/g) ?? []).join(" ");
}

export function CreditCardInput({
  value: controlledValue,
  defaultValue = {},
  onValueChange,
  label,
  className,
  ...props
}: CreditCardInputProps) {
  const [inner, setInner] = React.useState<Partial<CreditCardInputValue>>(defaultValue);
  const merged = { ...inner, ...controlledValue };
  const digits = (merged.number ?? "").replace(/\D/g, "").slice(0, 16);
  const brand = detectBrand(digits);

  const set = (patch: Partial<CreditCardInputValue>) => {
    const next = { ...merged, ...patch };
    setInner(next);
    const d = (next.number ?? "").replace(/\D/g, "");
    const valid =
      d.length >= 15 &&
      /^(0[1-9]|1[0-2])\/\d{2}$/.test(next.expiry ?? "") &&
      (next.cvc ?? "").replace(/\D/g, "").length >= 3;
    onValueChange?.(
      { number: d, expiry: next.expiry ?? "", cvc: (next.cvc ?? "").replace(/\D/g, ""), brand: detectBrand(d) },
      valid,
    );
  };

  return (
    <div className={cn("w-full space-y-2", className)} {...props}>
      {label ? (
        <span className="block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      ) : null}
      <div className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 transition-colors focus-within:border-foreground/60">
        <span
          aria-hidden
          className={cn(
            "rounded px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase",
            brand === "unknown" ? "bg-secondary text-muted-foreground" : "bg-accent text-accent-foreground",
          )}
        >
          {brand}
        </span>
        <input
          value={groupNumber(digits, brand)}
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="4242 4242 4242 4242"
          aria-label="Card number"
          onChange={(e) => set({ number: e.target.value.replace(/\D/g, "").slice(0, 16) })}
          className="min-w-0 flex-1 bg-transparent font-mono text-sm tracking-wider focus:outline-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <input
          value={merged.expiry ?? ""}
          inputMode="numeric"
          autoComplete="cc-exp"
          placeholder="MM/YY"
          aria-label="Expiry"
          onChange={(e) => {
            const d = e.target.value.replace(/\D/g, "").slice(0, 4);
            set({ expiry: d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d });
          }}
          className="rounded-md border border-border bg-card px-3 py-2 font-mono text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <input
          value={merged.cvc ?? ""}
          inputMode="numeric"
          autoComplete="cc-csc"
          placeholder="CVC"
          aria-label="CVC"
          onChange={(e) => set({ cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })}
          className="rounded-md border border-border bg-card px-3 py-2 font-mono text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
    </div>
  );
}
