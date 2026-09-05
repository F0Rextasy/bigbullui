"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ArcadeCabinetProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  onCoinInsert?: () => void;
  score?: number;
}

/** Atari kabini: ekran + joystick + coin atma. */
export function ArcadeCabinet({ title = "BIGBULL", onCoinInsert, score = 48200, className, ...props }: ArcadeCabinetProps) {
  const [coins, setCoins] = React.useState(0);
  const [glow, setGlow] = React.useState(false);

  const insert = () => {
    setCoins((c) => c + 1);
    setGlow(true);
    onCoinInsert?.();
    setTimeout(() => setGlow(false), 800);
  };

  return (
    <div className={cn("w-40 rounded-t-lg border-2 border-dashed border-border bg-card p-3", className)} {...props}>
      <style>{`
        @keyframes acScan { 0% { top: 0; opacity: 0.6; } 100% { top: 100%; opacity: 0.2; } }
        @keyframes acBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      `}</style>
      <p className="text-center font-mono text-[9px] font-black uppercase tracking-widest text-accent" style={{ animation: "acBlink 1.6s ease-in-out infinite" }}>{title}</p>

      {/* Ekran */}
      <div className="relative mt-2 aspect-[4/3] overflow-hidden rounded-sm border border-border bg-[#0a0a0a]">
        <div className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-foreground/5 to-transparent" style={{ animation: "acScan 2.5s linear infinite" }} aria-hidden="true" />
        <div className="flex size-full items-center justify-center">
          <span className="font-mono text-[11px] font-bold text-emerald-500 tabular-nums">{score.toLocaleString("tr-TR")}</span>
        </div>
      </div>

      {/* Kontroller */}
      <div className="mt-2 flex items-center justify-between px-1">
        <span className="flex size-7 items-center justify-center rounded-full border-2 border-border bg-secondary/60" aria-hidden="true">
          <span className="size-3 rounded-full bg-destructive/80" />
        </span>
        <span className="flex gap-1" aria-hidden="true">
          <span className="size-3 rounded-sm border border-border bg-accent/60" />
          <span className="size-3 rounded-sm border border-border bg-accent/60" />
        </span>
      </div>

      <button
        onClick={insert}
        className={cn(
          "mt-2 w-full rounded-sm border border-dashed py-1.5 font-mono text-[9px] uppercase tracking-widest transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          glow ? "border-accent bg-accent/20 text-accent" : "border-border text-muted-foreground hover:border-accent hover:text-accent"
        )}
      >
        🪙 COIN ({coins})
      </button>
    </div>
  );
}
