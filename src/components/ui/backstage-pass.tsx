"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface BackstagePassProps {
  holderName?: string;
  className?: string;
}

export function BackstagePass({ holderName, className }: BackstagePassProps) {
  return (
    <div
      className={cn(
        "relative size-56 rounded-lg border border-border bg-card p-6 motion-reduce:transition-none",
        "group"
      )}
    >
      <div className="absolute top-2 right-2 flex items-center gap-2">
        <div
          className="font-mono text-[8px] uppercase tracking-[0.15em] text-white bg-destructive px-2 py-1 rounded"
        >
          ALL ACCESS
        </div>
      </div>

      <div className="absolute top-3 left-3 size-3 rounded-full bg-destructive" />

      <div className="mt-6 grid grid-cols-2 gap-2">
        <div>
          <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground">NAME</div>
          <div className="font-mono text-[11px] font-medium">{holderName || "HOLDER NAME"}</div>
        </div>
        <div>
          <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground">COMPANY</div>
          <div className="font-mono text-[11px]">COMPANY NAME</div>
        </div>
      </div>

      <div className="mt-4 h-2 bg-border/30 rounded w-full" />
    </div>
  );
}