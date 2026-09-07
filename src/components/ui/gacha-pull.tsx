"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface GachaPullProps extends React.HTMLAttributes<HTMLDivElement> {
  result?: string;
  rarity?: string;
  onPull?: () => void;
}

/** Gacha pull: single-draw capsule reveal card. */
export function GachaPull({ result = "Star Blade", rarity = "SSR", onPull, className, ...props }: GachaPullProps) {
  const [pulled, setPulled] = React.useState(false);
  return (
    <div className={cn("w-full touch-none select-none rounded-md border-2 border-foreground bg-card p-3 text-center", className)} style={{ touchAction: "none" }} {...props}>
      <style>{`@keyframes gachaIn { 0% { transform: scale(0.7); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }`}</style>
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">Gacha Draw</p>
      {pulled ? (
        <div role="status" aria-label={`${result} ${rarity}`} className="animate-[gachaIn_0.35s_ease-out] motion-reduce:animate-none">
          <p className="mt-1 font-mono text-3xl" aria-hidden="true">⬢</p>
          <p className="mt-1 font-mono text-sm font-black uppercase text-foreground">{result}</p>
          <p className="mx-auto mt-1 w-fit rounded bg-accent px-2 py-0.5 font-mono text-[10px] font-black text-accent-foreground">{rarity}</p>
        </div>
      ) : (
        <p className="mt-1 font-mono text-sm text-muted-foreground">Capsule sealed</p>
      )}
      <button
        type="button"
        onClick={() => {
          setPulled(true);
          onPull?.();
        }}
        className="mt-2 min-h-11 w-full touch-none rounded-md border-2 border-foreground bg-primary font-mono text-xs font-black uppercase text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        style={{ touchAction: "none" }}
      >
        Pull ×1
      </button>
    </div>
  );
}
