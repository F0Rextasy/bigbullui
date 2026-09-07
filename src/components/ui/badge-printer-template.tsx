"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface BadgePrinterTemplateProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  role?: string;
  company?: string;
  serial?: string;
}

/** Print-ready staff badge template with lanyard slot and serial footer. */
export function BadgePrinterTemplate({
  name = "ADA BULL",
  role = "Stage Manager",
  company = "BIGBULL CONF 2026",
  serial = "BDG-0042",
  className,
  ...props
}: BadgePrinterTemplateProps) {
  return (
    <div className={cn("w-full max-w-[240px]", className)} {...props}>
      <button
        type="button"
        onClick={() => window.print()}
        className="mb-3 cursor-pointer rounded border-2 border-foreground bg-primary px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98] print:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Print badge
      </button>
      <div className="overflow-hidden rounded-lg border-2 border-foreground bg-card print:border-black">
        <div className="flex justify-center bg-secondary py-1.5">
          <span className="h-1.5 w-16 rounded-full border border-border bg-background" aria-hidden="true" />
        </div>
        <div className="border-y-2 border-foreground bg-primary px-3 py-3 text-center print:border-black">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary-foreground/80">{company}</p>
          <p className="mt-1 text-xl font-bold leading-tight text-primary-foreground">{name}</p>
          <p className="mt-1 inline-block rounded bg-card px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-foreground">
            {role}
          </p>
        </div>
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-end gap-0.5" aria-hidden="true">
            {[14, 8, 18, 10, 22, 12, 16, 9, 20, 11].map((h, i) => (
              <span key={i} className="w-1 bg-foreground print:bg-black" style={{ height: h }} />
            ))}
          </div>
          <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{serial}</p>
        </div>
      </div>
    </div>
  );
}
