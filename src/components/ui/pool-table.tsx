"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PoolBall {
  number: number;
  color: string;
  striped?: boolean;
}

export interface PoolTableProps extends React.HTMLAttributes<HTMLDivElement> {
  balls?: PoolBall[];
}

const DEFAULT_BALLS: PoolBall[] = [
  { number: 1, color: "bg-amber-400" },
  { number: 2, color: "bg-sky-500" },
  { number: 3, color: "bg-red-500" },
  { number: 4, color: "bg-violet-600" },
  { number: 5, color: "bg-orange-500" },
  { number: 6, color: "bg-emerald-600" },
  { number: 7, color: "bg-red-800" },
  { number: 8, color: "bg-black" },
  { number: 9, color: "bg-amber-400", striped: true },
  { number: 10, color: "bg-sky-500", striped: true },
  { number: 11, color: "bg-red-500", striped: true },
  { number: 12, color: "bg-violet-600", striped: true },
];

/** Bilardo topu düzenleyici: renkli top grid'i. */
export function PoolTable({ balls = DEFAULT_BALLS, className, ...props }: PoolTableProps) {
  return (
    <div className={cn("w-48 rounded-lg border-2 border-amber-900/60 bg-emerald-900/40 p-3", className)} {...props}>
      <style>{`@keyframes ptIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
      <p className="mb-2 text-center font-mono text-[9px] uppercase tracking-widest text-emerald-200/60">Bilardo topu düzenleyici</p>
      <div className="grid grid-cols-4 place-items-center gap-2">
        {balls.map((ball, idx) => (
          <span
            key={ball.number}
            className={cn(
              "relative flex size-8 items-center justify-center rounded-full border border-black/30 shadow-sm",
              ball.striped ? "bg-white" : ball.color
            )}
            style={{ animation: `ptIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both`, animationDelay: `${idx * 45}ms` }}
            aria-label={`${ball.number} numaralı top`}
          >
            {ball.striped && <span className={cn("absolute inset-x-0 top-1/2 h-1/2 -translate-y-0", ball.color)} aria-hidden="true" />}
            <span className="relative z-10 flex size-3.5 items-center justify-center rounded-full bg-white font-mono text-[8px] font-bold text-black">
              {ball.number}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
