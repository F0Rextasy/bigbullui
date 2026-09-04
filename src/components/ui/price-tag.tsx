import * as React from "react";
import { cn } from "./lib/utils";

export interface PriceTagProps extends React.HTMLAttributes<HTMLDivElement> {
  price: string;
  originalPrice?: string;
  currency?: string;
  label?: string;
  sale?: boolean;
  className?: string;
}

export function PriceTag({
  price,
  originalPrice,
  currency = "$",
  label = "ADMISSION",
  sale = false,
  className,
  ...props
}: PriceTagProps) {
  return (
    <div
      className={cn(
        "relative inline-flex flex-col items-center rounded-lg border-2 border-dashed border-foreground/70 bg-card p-4 shadow-sm select-none min-w-[130px]",
        className
      )}
      {...props}
    >
      {/* Eyelet string punch hole */}
      <div className="size-3.5 rounded-full border-2 border-foreground bg-background mb-3 shadow-inner" />

      {/* Label */}
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>

      {/* Price */}
      <div className="mt-1 flex items-baseline gap-0.5">
        <span className="font-mono text-sm font-semibold text-muted-foreground">{currency}</span>
        <span className="font-mono text-2xl font-black text-foreground">{price}</span>
      </div>

      {/* Original Price / Sale Stamp */}
      {originalPrice ? (
        <span className="mt-0.5 font-mono text-xs text-muted-foreground line-through">
          {currency}{originalPrice}
        </span>
      ) : null}

      {sale ? (
        <div className="mt-2 rotate-[-4deg] rounded-sm bg-accent px-2 py-0.5 font-mono text-[10px] font-bold text-accent-foreground tracking-wider uppercase">
          SALE STAMP
        </div>
      ) : null}
    </div>
  );
}
