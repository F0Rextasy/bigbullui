"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface LootBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  locked?: boolean;
  onOpen?: () => void;
}

/** Loot box: sealed crate with shake-to-open action. */
export function LootBox({ locked = false, onOpen, className, ...props }: LootBoxProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={cn("flex touch-none select-none flex-col items-center gap-2", className)} style={{ touchAction: "none" }} {...props}>
      <style>{`@keyframes crateShake { 0%, 100% { transform: rotate(0); } 25% { transform: rotate(-3deg); } 75% { transform: rotate(3deg); } }`}</style>
      <div
        role="img"
        aria-label={open ? "Loot box opened" : locked ? "Loot box locked" : "Loot box ready"}
        className={cn(
          "flex size-24 items-center justify-center rounded-md border-2 border-foreground bg-card font-mono text-4xl motion-reduce:animate-none",
          !open && !locked && "animate-[crateShake_1.6s_ease-in-out_infinite]"
        )}
      >
        {open ? "✦" : locked ? "▣" : "◈"}
      </div>
      <button
        type="button"
        disabled={locked}
        onClick={() => {
          setOpen(true);
          onOpen?.();
        }}
        className="min-h-11 touch-none rounded-md border-2 border-foreground bg-primary px-4 font-mono text-xs font-black uppercase text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
        style={{ touchAction: "none" }}
      >
        {locked ? "Locked" : open ? "Opened" : "Open"}
      </button>
    </div>
  );
}
