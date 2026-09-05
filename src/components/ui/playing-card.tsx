"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PlayingCardProps {
  rank: "A" | "K" | "Q" | "J" | "10" | "9" | "8" | "7" | "6" | "5" | "4" | "3" | "2";
  suit: "spades" | "hearts" | "diamonds" | "clubs";
  faceDown?: boolean;
  className?: string;
}

export function PlayingCard({ rank, suit, faceDown = false, className }: PlayingCardProps) {
  const suitSymbols: Record<string, string> = {
    spades: "♠",
    hearts: "♥",
    diamonds: "♦",
    clubs: "♣",
  };

  return (
    <div
      className={cn(
        "relative size-32 rounded-md border border-border bg-card p-2 shadow-sm motion-reduce:transition-none",
        faceDown && "animate-flipCard",
        "cursor-pointer group"
      )}
    >
      {!faceDown && (
        <div className="flex flex-col items-center gap-2 p-2">
          <div className="font-mono text-[7px] uppercase tracking-[0.1em] text-muted-foreground">
            {rank} {suitSymbols[suit]}
          </div>
          <div className="font-serif text-[24px]">
            {suitSymbols[suit]}
          </div>
        </div>
      )}

      <div className="absolute inset-0 rotate-y-180"
        style={{
          backgroundImage: "radial-gradient(circle at 25% 25%, currentColor 5%, transparent 5.5%), radial-gradient(circle at 75% 75%, currentColor 5%, transparent 5.5%), radial-gradient(circle at 75% 25%, currentColor 5%, transparent 5.5%), radial-gradient(circle at 25% 75%, currentColor 5%, transparent 5.5%)",
          backgroundSize: "10px 10px",
          backgroundRepeat: "repeat",
          opacity: 0.3
        }}
      />
      <div className="absolute inset-0 rounded-md border border-border/20" />
    </div>
  );
}