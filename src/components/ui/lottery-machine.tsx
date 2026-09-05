"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface LotteryMachineProps extends React.HTMLAttributes<HTMLDivElement> {
  onDraw?: (numbers: number[]) => void;
  ballCount?: number;
  pickCount?: number;
}

/** Piyango makinesi: toplar dönerek düşer, sonuç rozetleri stamp animasyonuyla gelir. */
export function LotteryMachine({ onDraw, ballCount = 49, pickCount = 6, className, ...props }: LotteryMachineProps) {
  const [drawing, setDrawing] = React.useState(false);
  const [numbers, setNumbers] = React.useState<number[]>([]);

  const draw = () => {
    if (drawing) return;
    setDrawing(true);
    setNumbers([]);
    const pool = Array.from({ length: ballCount }, (_, i) => i + 1);
    const picked: number[] = [];
    const step = () => {
      if (picked.length >= pickCount) {
        setDrawing(false);
        onDraw?.(picked);
        return;
      }
      const idx = Math.floor(Math.random() * pool.length);
      picked.push(pool.splice(idx, 1)[0]);
      setNumbers([...picked]);
      setTimeout(step, 350);
    };
    setTimeout(step, 400);
  };

  return (
    <div className={cn("w-full max-w-sm rounded-lg border-2 border-dashed border-border bg-card p-5 text-center", className)} {...props}>
      <style>{`
        @keyframes lmShake { 0%, 100% { transform: translateX(0) rotate(0); } 20% { transform: translateX(-4px) rotate(-3deg); } 40% { transform: translateX(4px) rotate(3deg); } 60% { transform: translateX(-3px) rotate(-2deg); } 80% { transform: translateX(3px) rotate(2deg); } }
        @keyframes lmStamp { 0% { transform: scale(1.8) rotate(-14deg); opacity: 0; } 60% { transform: scale(0.95) rotate(-6deg); opacity: 1; } 100% { transform: scale(1) rotate(-8deg); opacity: 1; } }
      `}</style>
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Çekiliş makinesi</p>

      <div className={cn("mx-auto mt-3 flex size-20 items-center justify-center rounded-full border-4 border-dashed border-accent/60 bg-accent/10", drawing && "animate-[lmShake_0.4s_ease-in-out_infinite] motion-reduce:animate-none")} aria-hidden="true">
        <span className="text-2xl">🎱</span>
      </div>

      <div className="mt-4 flex min-h-9 flex-wrap items-center justify-center gap-1.5">
        {numbers.map((n, idx) => (
          <span
            key={`${n}-${idx}`}
            className="flex size-8 items-center justify-center rounded-full border-2 border-accent bg-accent/10 font-mono text-xs font-bold text-accent"
            style={{ animation: "lmStamp 0.35s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            {String(n).padStart(2, "0")}
          </span>
        ))}
        {!drawing && numbers.length === 0 && (
          <span className="text-xs text-muted-foreground">Çekmek için butona bas</span>
        )}
      </div>

      <button
        onClick={draw}
        disabled={drawing}
        className={cn(
          "mt-4 w-full rounded-md bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-accent-foreground",
          "transition-all duration-150 hover:bg-accent/90 active:scale-[0.97]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
          "disabled:pointer-events-none disabled:opacity-50"
        )}
      >
        {drawing ? "Çekiliyor…" : `${pickCount} sayı çek`}
      </button>
    </div>
  );
}
