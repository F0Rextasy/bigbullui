import * as React from "react";
import { cn } from "./lib/utils";

export type CurrencyDisplayProps = {
  amount: number;
  currency?: string;
  locale?: string;
  animated?: boolean;
};

const CurrencyDisplay = ({
  amount,
  currency = "USD",
  locale = "en-US",
  animated = true,
}: CurrencyDisplayProps) => {
  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  const parts = formatted.split(".");

  return (
    <div
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground",
        "inline-flex items-baseline gap-2",
        animated && "animate-[fade-in-up_0.3s_ease-out_both]",
        "motion-reduce:animate-none"
      )}
    >
      <style>{`
        @keyframes currencyPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
      <span>{parts[0]}</span>
      <span className="text-xs opacity-60">
        .{parts[1] || "00"}
      </span>
      <span className="ml-1 text-xs uppercase tracking-wider">
        {currency}
      </span>
    </div>
  );
};

export { CurrencyDisplay };
