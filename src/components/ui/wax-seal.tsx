"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface WaxSealProps extends React.HTMLAttributes<HTMLElement> {
  letter: string;
  broken?: boolean;
  onBreak?: () => void;
}

export function WaxSeal({ letter, broken = false, onBreak, ...props }: WaxSealProps) {
  return (
    <div
      role={onBreak ? "button" : undefined}
      tabIndex={onBreak ? 0 : undefined}
      aria-pressed={onBreak ? broken : undefined}
      aria-label={onBreak ? `Break wax seal ${letter}` : undefined}
      onClick={onBreak}
      onKeyDown={onBreak ? (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onBreak();
        }
      } : undefined}
      className={cn(
        "relative size-24 rounded-full border border-dashed border-border/50 bg-card motion-reduce:transition-none",
        broken && "scale-95 opacity-60",
        onBreak && "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "group"
      )} {...props}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-accent to-destructive opacity-80 filter blur-sm" />
      <div
        className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white"
      >
        {letter}
      </div>
      <div className="absolute inset-0 ring-2 ring-white/20 blur-md" />
    </div>
  );
}