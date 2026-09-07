"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ClanCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  tag?: string;
  members?: number;
  max?: number;
  power?: number;
  onJoin?: () => void;
}

/** Clan card: guild banner with roster count and join action. */
export function ClanCard({ name = "Iron Stubs", tag = "IRON", members = 38, max = 50, power = 9200, onJoin, className, ...props }: ClanCardProps) {
  return (
    <div role="group" aria-label={`Clan ${name}`} className={cn("w-full touch-none select-none rounded-md border-2 border-foreground bg-card p-3", className)} style={{ touchAction: "none" }} {...props}>
      <div className="flex items-center gap-2.5">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-md border-2 border-dashed border-accent bg-accent/10 font-mono text-xs font-black text-accent" aria-hidden="true">
          {tag.slice(0, 2)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-mono text-sm font-black uppercase text-foreground">{name}</span>
          <span className="block font-mono text-[10px] tabular-nums text-muted-foreground">[{tag}] · {members}/{max} · {power} PWR</span>
        </span>
      </div>
      <button
        type="button"
        onClick={onJoin}
        className="mt-2.5 min-h-11 w-full touch-none rounded-md border-2 border-foreground bg-primary font-mono text-xs font-black uppercase text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        style={{ touchAction: "none" }}
      >
        Request Join
      </button>
    </div>
  );
}
