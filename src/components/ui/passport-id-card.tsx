"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PassportIdCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  nationality?: string;
  idNo?: string;
  expires?: string;
}

export function PassportIdCard({
  name = "ADA BULL",
  nationality = "BACKSTAGE",
  idNo = "P-00421-X",
  expires = "2030",
  className,
  ...props
}: PassportIdCardProps) {
  return (
    <div className={cn("w-full max-w-sm overflow-hidden rounded-lg border-2 border-foreground bg-card", className)} {...props}>
      <div className="flex items-center justify-between bg-secondary px-4 py-2">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em]">Passport · ID</span>
        <span aria-hidden className="flex size-6 rotate-[-8deg] items-center justify-center rounded-full border-2 border-accent font-mono text-[9px] font-bold text-accent">
          OK
        </span>
      </div>
      <div className="flex gap-4 p-4">
        <div aria-hidden className="flex h-24 w-20 shrink-0 flex-col items-center justify-center rounded border border-dashed border-border bg-secondary">
          <span className="text-2xl">◉</span>
          <span className="mt-1 font-mono text-[8px] uppercase text-muted-foreground">Photo</span>
        </div>
        <dl className="min-w-0 flex-1 space-y-1.5 text-sm">
          <div>
            <dt className="font-mono text-[9px] uppercase text-muted-foreground">Name</dt>
            <dd className="font-bold">{name}</dd>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <dt className="font-mono text-[9px] uppercase text-muted-foreground">Nation</dt>
              <dd className="font-mono text-xs">{nationality}</dd>
            </div>
            <div>
              <dt className="font-mono text-[9px] uppercase text-muted-foreground">Expires</dt>
              <dd className="font-mono text-xs">{expires}</dd>
            </div>
          </div>
        </dl>
      </div>
      <div className="border-t border-dashed border-border bg-secondary/50 px-4 py-2">
        <p aria-label={`Machine readable zone ${idNo}`} className="truncate font-mono text-[11px] tracking-[0.2em]">
          P&lt;{idNo}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
        </p>
      </div>
    </div>
  );
}
