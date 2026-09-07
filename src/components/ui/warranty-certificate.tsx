"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface WarrantyCertificateProps extends React.HTMLAttributes<HTMLDivElement> {
  product?: string;
  serial?: string;
  validUntil?: string;
  holder?: string;
}

export function WarrantyCertificate({
  product = "Touring Amplifier",
  serial = "SN-88-00421-X",
  validUntil = "SEP 2028",
  holder = "ADA BULL",
  className,
  ...props
}: WarrantyCertificateProps) {
  return (
    <div className={cn("w-full max-w-md rounded-lg border-2 border-foreground bg-card p-6 text-center", className)} {...props}>
      <div className="rounded-md border border-dashed border-border p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Certificate of warranty</p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight">{product}</h3>
        <p className="mt-1 font-mono text-xs text-muted-foreground">Registered to {holder}</p>
        <div className="mx-auto mt-4 flex max-w-xs items-center justify-between border-t border-dashed border-border pt-3 font-mono text-xs">
          <span className="text-muted-foreground">{serial}</span>
          <span className="rounded bg-accent px-2 py-0.5 font-bold text-accent-foreground">UNTIL {validUntil}</span>
        </div>
        <div aria-hidden className="mx-auto -mb-9 mt-4 flex size-14 rotate-[-8deg] items-center justify-center rounded-full border-[3px] border-accent font-mono text-[10px] font-bold uppercase text-accent">
          Sealed
        </div>
      </div>
    </div>
  );
}
