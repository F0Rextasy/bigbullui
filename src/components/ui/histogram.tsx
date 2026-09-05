"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface HistogramBin {
  id: string;
  label: string;
  count: number;
}

export interface HistogramProps extends React.HTMLAttributes<HTMLDivElement> {
  bins: HistogramBin[];
  height?: number;
}

/** Histogram: aralıklı bitişik çubuklar + hover detay. */
export function Histogram({ bins, height = 180, className, ...props }: HistogramProps) {
  const max = Math.max(...bins.map((b) => b.count), 1);
  const [hover, setHover] = React.useState<string | null>(null);

  return (
    <div className={cn("w-full max-w-md", className)} {...props}>
      <style>{`@keyframes hgGrow { from { transform: scaleY(0); } }`}</style>
      <div className="flex items-end" style={{ height }}>
        {bins.map((bin, idx) => {
          const h = (bin.count / max) * 100;
          const isHover = hover === bin.id;
          return (
            <div
              key={bin.id}
              className="flex h-full flex-1 flex-col items-center justify-end"
              onMouseEnter={() => setHover(bin.id)}
              onMouseLeave={() => setHover(null)}
            >
              <span className={cn("mb-0.5 font-mono text-[9px] tabular-nums transition-opacity duration-150 motion-reduce:transition-none", isHover ? "opacity-100 text-accent" : "opacity-0")}>
                {bin.count}
              </span>
              <div
                className={cn(
                  "w-full border-x border-t border-border bg-accent/50 transition-colors duration-150 motion-reduce:transition-none",
                  isHover && "bg-accent"
                )}
                style={{
                  height: `${h}%`,
                  animation: "hgGrow 0.5s cubic-bezier(0.16,1,0.3,1) both",
                  animationDelay: `${idx * 40}ms`,
                  transformOrigin: "bottom",
                }}
              />
              <span className="mt-1 truncate font-mono text-[8px] text-muted-foreground">{bin.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
