"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SeasonalPumpkinProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

/** Seasonal pumpkin: autumn greeting card with harvest badge. */
export function SeasonalPumpkin({ title = "Harvest Nights", className, children, ...props }: SeasonalPumpkinProps) {
  return (
    <div className={cn("w-full max-w-sm rounded-lg border-2 border-foreground bg-card p-6 text-center", className)} {...props}>
      <div aria-hidden="true" className="mx-auto flex size-12 items-center justify-center rounded-full border-2 border-dashed border-accent bg-accent/10 text-xl transition-transform duration-300 hover:scale-110 motion-reduce:transition-none">
        <span aria-hidden="true">◉</span>
      </div>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-accent">Autumn series</p>
      <h3 className="mt-1 text-lg font-black">{title}</h3>
      <div className="mt-2 text-sm text-muted-foreground">{children ?? <p>Cider, lanterns and late shows.</p>}</div>
    </div>
  );
}
