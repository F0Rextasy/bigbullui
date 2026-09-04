"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MaskedCurrencyProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  currency?: string;
  value?: number;
  defaultValue?: number;
  onValueChange?: (cents: number, formatted: string) => void;
  className?: string;
}

export function MaskedCurrency({
  currency = "$",
  value: controlledValue,
  defaultValue = 4500, // in cents (e.g. 4500 = $45.00)
  onValueChange,
  className,
  ...props
}: MaskedCurrencyProps) {
  const [internalCents, setInternalCents] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentCents = isControlled ? controlledValue : internalCents;

  const formatCents = (cents: number) => {
    const dollars = (cents / 100).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return dollars;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawDigits = e.target.value.replace(/[^0-9]/g, "");
    const cents = parseInt(rawDigits || "0", 10);
    if (!isControlled) setInternalCents(cents);
    onValueChange?.(cents, `${currency} ${formatCents(cents)}`);
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center rounded-lg border-2 border-foreground bg-card shadow-xs font-mono select-none",
        className
      )}
    >
      <span className="flex h-full items-center border-r-2 border-dashed border-border bg-secondary/70 px-3 text-xs font-bold text-muted-foreground">
        {currency}
      </span>
      <input
        type="text"
        inputMode="numeric"
        value={formatCents(currentCents)}
        onChange={handleChange}
        className={cn(
          "w-full bg-transparent px-3 py-2 text-right text-xs font-bold text-foreground outline-none",
          "focus-visible:ring-1 focus-visible:ring-accent"
        )}
        {...props}
      />
    </div>
  );
}
