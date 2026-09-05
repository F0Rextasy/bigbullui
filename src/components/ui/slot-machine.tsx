"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SlotMachineProps {
  onResult?: (result: string[]) => void;
  autoPlay?: boolean;
}

export function SlotMachine({ onResult, autoPlay = false }: SlotMachineProps) {
  const symbols = ["★", "◆", "7", "BAR"];

  return (
    <div
      className={cn(
        "relative size-48 flex items-end justify-end rounded-md border border-border bg-card p-4 motion-reduce:transition-none",
        "group"
      )}
    >
      <div className="flex gap-2">
        {Array.from({ length: 3 }, (_, reelIndex) => (
          <div
            key={reelIndex}
            className="h-24 w-4 rounded-md border border-border/50 bg-border/50 overflow-hidden"
          >
            {Array.from({ length: 8 }, (_, slotIndex) => (
              <div key={slotIndex} className="p-1 text-center font-mono text-[12px]">
                {symbols[slotIndex % symbols.length]}
              </div>
            )).map((el) => el)}
          </div>
        ))}
      </div>
    </div>
  );
}