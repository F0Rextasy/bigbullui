"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CargoShippingLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  tracking?: string;
  from?: string;
  to?: string;
  weight?: string;
  fragile?: boolean;
}

export function CargoShippingLabel({
  tracking = "BB-9400-4211-TR",
  from = "IST WAREHOUSE 3",
  to = "BERLIN HUB 7",
  weight = "2.4 KG",
  fragile = true,
  className,
  ...props
}: CargoShippingLabelProps) {
  const bars = React.useMemo(() => {
    return tracking
      .replace(/[^A-Z0-9]/gi, "")
      .slice(0, 24)
      .split("")
      .map((ch) => 1 + ((ch.charCodeAt(0) * 7) % 3));
  }, [tracking ]);

  return (
    <div className={cn("w-full max-w-sm rounded-lg border-2 border-foreground bg-card p-4", className)} {...props}>
      <div className="flex items-start justify-between gap-3">
        <div className="font-mono text-xs leading-relaxed">
          <p><span className="text-muted-foreground">FROM </span>{from}</p>
          <p><span className="text-muted-foreground">TO&nbsp;&nbsp; </span>{to}</p>
          <p><span className="text-muted-foreground">WT&nbsp;&nbsp; </span>{weight}</p>
        </div>
        {fragile ? (
          <span className="shrink-0 rotate-3 rounded border-2 border-destructive px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-destructive">
            Fragile
          </span>
        ) : null}
      </div>
      <div className="mt-3 flex h-12 items-stretch gap-[2px]" role="img" aria-label={`Tracking barcode ${tracking}`}>
        {bars.map((w, i) => (
          <span key={i} className="bg-foreground" style={{ width: w }} />
        ))}
      </div>
      <p className="mt-1 text-center font-mono text-xs tracking-[0.25em]">{tracking}</p>
    </div>
  );
}
