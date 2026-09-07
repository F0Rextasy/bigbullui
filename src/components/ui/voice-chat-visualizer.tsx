"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface VoiceChatVisualizerProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  bars?: number;
  label?: string;
}

/** Animated voice bars for live chat state with motion-reduce fallback. */
export function VoiceChatVisualizer({
  active = true,
  bars = 24,
  label = "Live voice",
  className,
  ...props
}: VoiceChatVisualizerProps) {
  return (
    <div
      className={cn("w-full rounded-lg border-2 border-foreground bg-card p-3", className)}
      role="status"
      aria-label={active ? `${label}, speaking` : `${label}, idle`}
      {...props}
    >
      <style>{`@keyframes vcvBar { 0%, 100% { transform: scaleY(0.25); } 50% { transform: scaleY(1); } }`}</style>
      <div className="flex items-center gap-2">
        <span className={cn("size-2 rounded-full", active ? "animate-pulse bg-accent motion-reduce:animate-none" : "bg-border")} aria-hidden="true" />
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
        <p className="ml-auto font-mono text-[10px] uppercase text-muted-foreground">{active ? "Speaking" : "Idle"}</p>
      </div>
      <div className="mt-2.5 flex h-10 items-center gap-1" aria-hidden="true">
        {Array.from({ length: bars }).map((_, i) => (
          <span
            key={i}
            className={cn("w-full origin-center rounded-full", active ? "bg-accent" : "bg-border")}
            style={
              active
                ? { height: "100%", animation: `vcvBar 0.9s ease-in-out ${i * 60}ms infinite` }
                : { height: 4 }
            }
          />
        ))}
      </div>
    </div>
  );
}
