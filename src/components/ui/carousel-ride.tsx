"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CarouselRideProps extends React.HTMLAttributes<HTMLDivElement> {
  spinning?: boolean;
  horses?: number;
}

/** Dönme dolap: atlar çember üzerinde döner, yukarı-aşağı süzülür. */
export function CarouselRide({ spinning = true, horses = 6, className, ...props }: CarouselRideProps) {
  const R = 40;
  return (
    <div className={cn("flex w-44 flex-col items-center rounded-lg border-2 border-dashed border-border bg-card p-4", className)} {...props}>
      <style>{`
        @keyframes crSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes crCounter { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes crBob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
      `}</style>
      <div className="relative size-40">
        <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border" aria-hidden="true" />
        <span
          className={cn("absolute inset-0", spinning && "animate-[crSpin_10s_linear_infinite] motion-reduce:animate-none")}
          aria-hidden="true"
        >
          {Array.from({ length: horses }).map((_, i) => {
            const angle = (i / horses) * 360;
            const rad = (angle * Math.PI) / 180;
            const x = 50 + (R * Math.cos(rad)) / 2;
            const y = 50 + (R * Math.sin(rad)) / 2;
            return (
              <span key={i} className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}>
                <span
                  className={cn("block text-xl", spinning && "animate-[crCounter_10s_linear_infinite] motion-reduce:animate-none")}
                  style={spinning ? { animation: `crCounter 10s linear infinite, crBob 2s ease-in-out ${i * 0.3}s infinite` } : undefined}
                >
                  🎠
                </span>
              </span>
            );
          })}
        </span>
        <span className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent/60 bg-card" aria-hidden="true" />
      </div>
    </div>
  );
}
