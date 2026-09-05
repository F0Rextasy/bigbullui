"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface NowServingProps {
  number: string;
  className?: string;
}

export function NowServing({ number, className }: NowServingProps) {
  const [flapState, setFlapState] = React.useState<number[]>([]);

  React.useEffect(() => {
    const digits = number.split("").map(d => parseInt(d, 10) || 0);
    setFlapState(digits);
  }, [number]);

  return (
    <div
      className={cn(
        "relative rounded-lg border border-border bg-card p-6 motion-reduce:transition-none",
        className
      )}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
        NOW SERVING
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 max-w-fit">
        {number.split("").map((digit, i) => (
          <FlipDigit key={i} value={parseInt(digit, 10) || 0} index={i} />
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          Chime
          <Dot className="inline-block w-1 h-1 size-2 rounded-full bg-accent animate-pulse" />
        </span>
      </div>
    </div>
  );
}

function FlipDigit({ value, index }: { value: number; index: number }) {
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  return (
    <div
      className={cn(
        "aspect-square rounded-md border border-dashed border-border/50 flex flex-col items-center justify-center min-w-[30px] min-h-[30px]",
        index === 0 && "animate-servingFirst"
      )}
    >
      <span className="font-mono text-[12px] font-bold">
        {digits[value]}
      </span>
    </div>
  );
}

function Dot({ className }: { className?: string }) {
  return (
    <span
      className={cn("animate-pulse", className)}
    />
  );
}