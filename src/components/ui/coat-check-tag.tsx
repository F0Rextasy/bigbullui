"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CoatCheckTagProps extends React.HTMLAttributes<HTMLDivElement> {
  number?: string;
  section?: string;
  holder?: string;
}

export function CoatCheckTag({ number = "042", section = "A", holder = "GUEST", className, ...props }: CoatCheckTagProps) {
  return (
    <div className={cn("flex w-full max-w-sm items-stretch", className)} {...props}>
      <div className="flex flex-1 flex-col justify-between rounded-l-lg border-2 border-r-0 border-foreground bg-card p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Coat check · Keep this half</p>
        <p className="mt-2 font-mono text-5xl font-bold tabular-nums">{number}</p>
        <p className="mt-2 font-mono text-xs uppercase text-muted-foreground">
          Sec {section} · {holder}
        </p>
      </div>
      <div aria-hidden className="flex w-8 items-center justify-center border-2 border-dashed border-foreground/50 bg-secondary">
        <span className="rotate-90 font-mono text-[10px] tracking-[0.3em] text-muted-foreground">✂</span>
      </div>
      <div className="flex w-20 flex-col items-center justify-center gap-1 rounded-r-lg border-2 border-l-0 border-foreground bg-secondary p-2 text-center">
        <p className="font-mono text-[9px] uppercase text-muted-foreground">Claim</p>
        <p className="font-mono text-2xl font-bold tabular-nums">{number}</p>
        <span aria-hidden className="size-2.5 rounded-full border-2 border-foreground bg-card" />
      </div>
    </div>
  );
}
