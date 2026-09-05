"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DiceProps {
  rolling?: boolean;
  onRoll?: (result: "heads" | "tails") => void;
}

export function Dice({ rolling = false, onRoll }: DiceProps) {
  const [result, setResult] = React.useState<"heads" | "tails" | null>(null);

  React.useEffect(() => {
    if (rolling) {
      const timeout = setTimeout(() => {
        const r = Math.random() < 0.5 ? "heads" : "tails";
        setResult(r);
        onRoll?.(r);
        clearTimeout(timeout);
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [rolling, onRoll]);

  const dotPattern = (face: number) => {
    const patterns: number[][] = [
      [2],           // 1
      [1, 3],        // 2
      [1, 5],        // 3
      [1, 3, 5],     // 4
      [1, 5],        // 5 (center is 3)
      [3],           // 6
    ];
    return patterns[face - 1] || [];
  };

  return (
    <div className="flex gap-2">
      {Array.from({ length: 2 }, (_, i) => (
        <div
          key={i}
          className={cn(
            "size-16 rounded-md border border-3D bg-card backdrop-blur",
            "transform-style preserve-3d",
            rolling && "motion-reduce:animate-none"
          )}
        >
          <div className="size-6 rounded-md border border-border absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-3 gap-1">
            {dotPattern(6).map((dot, j) => (
              <div key={j} className="size-2 rounded-full bg-accent" />
            ))}
            {dotPattern(6).map((dot, j) => (
              <div key={j + 3} className="size-2 rounded-full bg-accent" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}