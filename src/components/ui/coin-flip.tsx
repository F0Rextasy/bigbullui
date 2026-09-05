"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CoinFlipProps {
  result?: "heads" | "tails";
  flipping?: boolean;
  onFlip?: (result: "heads" | "tails") => void;
}

export function CoinFlip({ result, flipping = false, onFlip }: CoinFlipProps) {
  const [currentResult, setCurrentResult] = React.useState<"heads" | "tails" | null>(result ?? null);

  React.useEffect(() => {
    if (flipping) {
      const timeout = setTimeout(() => {
        const r = Math.random() < 0.5 ? "heads" : "tails";
        setCurrentResult(r);
        onFlip?.(r);
        clearTimeout(timeout);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [flipping, onFlip]);

  return (
    <div
      className={cn(
        "relative size-24 rounded-md bg-card p-4 transform transition-transform duration-500 motion-reduce:transition-none",
        "group-data-[result]:rotate-180"
      )}
      data-result={currentResult}
    >
      <div className="font-mono text-[12px] font-bold uppercase tracking-wider">
        {currentResult || "HEADS"}
      </div>
    </div>
  );
}