"use client";

import * as React from "react";
import { cn } from "./lib/utils";
import { formatCardNumber } from "./credit-card";

export interface CreditCardFormProps extends Omit<React.HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  onSubmit?: (data: { number: string; name: string; expiry: string; cvv: string }) => void;
}

/** Credit card form: formatting + expiry + CVV validation. */
export function CreditCardForm({ onSubmit, className, ...props }: CreditCardFormProps) {
  const [number, setNumber] = React.useState("");
  const [name, setName] = React.useState("");
  const [expiry, setExpiry] = React.useState("");
  const [cvv, setCvv] = React.useState("");

  const digits = number.replace(/\D/g, "");
  const valid = digits.length >= 15 && name.trim().length >= 2 && /^\d{2}\/\d{2}$/.test(expiry) && cvv.length >= 3;

  const handleNumber = (v: string) => setNumber(formatCardNumber(v.replace(/\D/g, "").slice(0, 16)));
  const handleExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    setExpiry(d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d);
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (valid) onSubmit?.({ number, name, expiry, cvv }); }} className={cn("w-full max-w-sm space-y-3.5", className)} noValidate {...props}>
      <style>{`@keyframes ccIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <div className="space-y-1 animate-[ccIn_0.25s_ease-out_both] motion-reduce:animate-none">
        <label htmlFor="cc-number" className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Card Number</label>
        <input
          id="cc-number"
          inputMode="numeric"
          value={number}
          onChange={(e) => handleNumber(e.target.value)}
          placeholder="4242 4242 4242 4242"
          autoComplete="cc-number"
          className={cn(
            "w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-sm tracking-wider",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors motion-reduce:transition-none",
            digits.length > 0 && digits.length < 15 && "border-destructive"
          )}
        />
      </div>

      <div className="space-y-1 animate-[ccIn_0.25s_ease-out_0.06s_both] motion-reduce:animate-none">
        <label htmlFor="cc-name" className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Name on Card</label>
        <input
          id="cc-name"
          value={name}
          onChange={(e) => setName(e.target.value.toUpperCase())}
          placeholder="ADA LOVELACE"
          autoComplete="cc-name"
          className="w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-sm uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors motion-reduce:transition-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 animate-[ccIn_0.25s_ease-out_0.12s_both] motion-reduce:animate-none">
        <div className="space-y-1">
          <label htmlFor="cc-exp" className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Son kullanma</label>
          <input
            id="cc-exp"
            inputMode="numeric"
            value={expiry}
            onChange={(e) => handleExpiry(e.target.value)}
            placeholder="AA/YY"
            autoComplete="cc-exp"
            className="w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors motion-reduce:transition-none"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="cc-cvv" className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">CVV</label>
          <input
            id="cc-cvv"
            inputMode="numeric"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="•••"
            autoComplete="cc-csc"
            className="w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors motion-reduce:transition-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!valid}
        className={cn(
          "w-full rounded-md bg-accent px-4 py-2.5 text-sm font-semibold uppercase tracking-widest text-accent-foreground",
          "transition-all duration-150 hover:bg-accent/90 active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
          "disabled:pointer-events-none disabled:opacity-40 animate-[ccIn_0.25s_ease-out_0.18s_both] motion-reduce:animate-none"
        )}
      >
        Complete payment
      </button>
    </form>
  );
}
