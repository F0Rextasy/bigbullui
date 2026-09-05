"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface RevolvingDoorProps extends React.HTMLAttributes<HTMLDivElement> {
  spinning?: boolean;
  label?: string;
}

/** Döner kapı: kanatlar dönüyor. */
export function RevolvingDoor({ spinning = true, label, className, ...props }: RevolvingDoorProps) {
  return (
    <div className={cn("flex w-40 flex-col items-center rounded-lg border-2 border-dashed border-border bg-card p-4", className)} {...props}>
      <style>{`@keyframes rdSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <div className="relative size-24">
        <span className="absolute inset-0 rounded-full border-4 border-border" aria-hidden="true" />
        <span
          className={cn("absolute inset-2", spinning && "animate-[rdSpin_6s_linear_infinite] motion-reduce:animate-none")}
          aria-hidden="true"
        >
          {[0, 90, 180, 270].map((deg) => (
            <span
              key={deg}
              className="absolute left-1/2 top-1/2 h-[42%] w-0.5 origin-top bg-accent/70"
              style={{ transform: `rotate(${deg}deg)` }}
            />
          ))}
          <span className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground" />
        </span>
      </div>
      {label && <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>}
    </div>
  );
}
