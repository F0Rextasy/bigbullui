"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface LanyardProps {
  label?: string;
  children?: React.ReactNode;
}

export function Lanyard({ label, children }: LanyardProps) {
  return (
    <div
      className={cn(
        "relative size-64 size-1/3 max-w-full rounded-md border border-border bg-card p-4 motion-reduce:transition-none",
        "group"
      )}
    >
      <div className="absolute top-1/2 -translate-y-1/2 -left-2 size-1/3 h-0.5 rounded-full bg-border/30" />
      <div className="absolute top-1/2 -translate-y-1/2 -right-2 size-4 rounded-full bg-destructive" />
      <div className="mt-2 p-2 bg-muted rounded-sm">
        {children}
      </div>
      {label && (
        <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground mt-2">
          {label}
        </div>
      )}
    </div>
  );
}