"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface WaxSealProps {
  letter: string;
  broken?: boolean;
  onBreak?: () => void;
}

export function WaxSeal({ letter, broken = false, onBreak }: WaxSealProps) {
  return (
    <div
      className={cn(
        "relative size-24 rounded-full border border-dashed border-border/50 bg-card motion-reduce:transition-none",
        "group"
      )}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-accent to-destructive opacity-80 filter blur-sm" />
      <div
        className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white"
      >
        {letter}
      </div>
      <div className="absolute inset-0 ring-2 ring-white/20 blur-md" />
      <style>{`
        @keyframes waxSealPress {
          from { transform: scale(1); }
          to { transform: scale(0.9) rotate(-5deg); }
        }
      `}</style>
    </div>
  );
}