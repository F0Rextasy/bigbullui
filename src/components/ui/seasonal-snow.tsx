"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SeasonalSnowProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  flakes?: number;
}

/** Seasonal snow: greeting card with falling snow animation. */
export function SeasonalSnow({ title = "Winter Gala", flakes = 14, className, children, ...props }: SeasonalSnowProps) {
  const drops = React.useMemo(
    () =>
      Array.from({ length: flakes }).map((_, i) => ({
        left: `${(i * 71) % 100}%`,
        delay: `${(i % 7) * 0.6}s`,
        size: 4 + ((i * 3) % 6),
      })),
    [flakes]
  );
  return (
    <div className={cn("relative w-full max-w-sm overflow-hidden rounded-lg border-2 border-foreground bg-card p-6 text-center", className)} {...props}>
      <style>{`@keyframes snowFall { 0% { transform: translateY(-12px); opacity: 0; } 20% { opacity: 1; } 100% { transform: translateY(150px); opacity: 0; } }`}</style>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 motion-reduce:hidden">
        {drops.map((d, i) => (
          <span
            key={i}
            className="absolute top-0 rounded-full bg-foreground/40"
            style={{ left: d.left, width: d.size, height: d.size, animation: `snowFall 3.2s linear ${d.delay} infinite` }}
          />
        ))}
      </div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Seasonal stub</p>
      <h3 className="mt-1 text-lg font-black">{title}</h3>
      <div className="mt-2 text-sm text-muted-foreground">{children ?? <p>Doors open at first snowfall.</p>}</div>
    </div>
  );
}
