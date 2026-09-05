"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PassportProps {
  holderName?: string;
  nationality?: string;
  visaCountries?: string[];
  className?: string;
}

export function Passport({ holderName, nationality, visaCountries = [], className }: PassportProps) {
  return (
    <div
      className={cn(
        "relative size-96 rounded-lg border border-border bg-card p-6 motion-reduce:transition-none",
        className
      )}
    >
      <div className="relative rounded-2xl border border-border bg-secondary p-2">
        <div className="relative">
          <div
            className="absolute -top-2 -right-2 size-6 rounded-full border border-border/20 flex items-center justify-center text-[8px] font-bold">
            {holderName ? holderName.charAt(0) : "H"}
          </div>
          <div className="absolute inset-1 rounded-lg border border-dashed border-border/40" />
        </div>
      </div>

      <div className="mt-4 grid rows-2 gap-4">
        <div>
          <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">NAME</div>
          <div className="font-mono text-[11px] font-medium">{holderName || "HOLDER NAME"}</div>
        </div>
        <div>
          <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">NATIONALITY</div>
          <div className="font-mono text-[11px]">{nationality || "NATIONALITY"}</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2">
        {visaCountries.map((country, i) => (
          <VisaStamp key={i} country={country} index={i} />
        ))}
      </div>
    </div>
  );
}

function VisaStamp({ country, index }: { country: string; index: number }) {
  return (
    <div
      className={cn(
        "aspect-square rounded-md border border-dashed border-border/50 flex items-center justify-center text-[7px] font-bold",
        index % 2 === 0 && "animate-stamp"
      )}
    >
      {country.charAt(0).toUpperCase()}
    </div>
  );
}