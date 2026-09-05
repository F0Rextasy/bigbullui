"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface FerrisWheelProps extends React.HTMLAttributes<HTMLDivElement> {
  spinning?: boolean;
  cabins?: number;
}

/** Dev tepsi dönücü: kabinler süspansiyonlu döner. */
export function FerrisWheel({ spinning = true, cabins = 8, className, ...props }: FerrisWheelProps) {
  const R = 44;

  return (
    <div className={cn("flex w-44 flex-col items-center rounded-lg border-2 border-dashed border-border bg-card p-4", className)} {...props}>
      <style>{`@keyframes fwSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes fwCounter { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }`}</style>
      <div className="relative size-44">
        {/* Çerçeve */}
        <span className="absolute bottom-0 left-1/2 h-20 w-0.5 -translate-x-1/2 bg-border" aria-hidden="true" />
        <span className="absolute bottom-0 left-1/2 h-24 w-0.5 -translate-x-1/2 rotate-[25deg] bg-border/60" aria-hidden="true" />
        <span className="absolute bottom-0 left-1/2 h-24 w-0.5 -translate-x-1/2 -rotate-[25deg] bg-border/60" aria-hidden="true" />
        {/* Tekerlek */}
        <span
          className={cn("absolute inset-0", spinning && "animate-[fwSpin_14s_linear_infinite] motion-reduce:animate-none")}
          style={{ transformOrigin: "50% 50%" }}
          aria-hidden="true"
        >
          <span className="absolute left-1/2 top-1/2 size-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-border" />
          <span className="absolute left-1/2 top-1/2 size-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/50" />
          {Array.from({ length: cabins }).map((_, i) => {
            const angle = (i / cabins) * 360;
            const rad = (angle * Math.PI) / 180;
            const x = 50 + (R * Math.cos(rad)) / (88 / 2);
            const y = 50 + (R * Math.sin(rad)) / (88 / 2);
            return (
              <span key={i} className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}>
                <span className={cn("block size-3 rounded-full border border-accent/60 bg-accent/20", spinning && "animate-[fwCounter_14s_linear_infinite] motion-reduce:animate-none")} />
              </span>
            );
          })}
        </span>
      </div>
    </div>
  );
}
