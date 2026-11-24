"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface AirmailLetterProps extends React.HTMLAttributes<HTMLElement> {
  lines: string[];
  className?: string;
}

export function AirmailLetter({ lines = [], className, ...props }: AirmailLetterProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg border border-border bg-card p-6 motion-reduce:transition-none",
        className
      )} {...props}
    >

      <div
        className="absolute top-3 right-3 size-6 rounded-full border border-destructive bg-destructive"
      />

      <div className="mt-4 space-y-2 max-h-[60%] overflow-y-auto">
        {lines.map((line, i) => (
          <div key={i} className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            {line}
          </div>
        ))}
      </div>

      <div className="mt-2 text-xs text-muted-foreground/60">
        Airmail: Priority Mail
      </div>
    </div>
  );
}