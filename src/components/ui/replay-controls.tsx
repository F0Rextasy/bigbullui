"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ReplayControlsProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;
  onSeek?: (time: number) => void;
}

/** Replay controls: transport bar with seek track. */
export function ReplayControls({ duration = 120, onSeek, className, ...props }: ReplayControlsProps) {
  const [time, setTime] = React.useState(32);
  const [playing, setPlaying] = React.useState(false);
  const pct = (time / Math.max(1, duration)) * 100;
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const seek = (t: number) => {
    const next = Math.max(0, Math.min(duration, t));
    setTime(next);
    onSeek?.(next);
  };
  return (
    <div role="group" aria-label="Replay controls" className={cn("w-full touch-none select-none rounded-md border-2 border-foreground bg-card p-2.5", className)} style={{ touchAction: "none" }} {...props}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => seek(time - 10)}
          aria-label="Back 10 seconds"
          className="flex min-h-11 min-w-11 touch-none items-center justify-center rounded-md border border-border font-mono text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{ touchAction: "none" }}
        >
          ◂◂
        </button>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause replay" : "Play replay"}
          aria-pressed={playing}
          className="flex min-h-11 min-w-11 touch-none items-center justify-center rounded-md border-2 border-foreground bg-primary font-mono text-sm text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{ touchAction: "none" }}
        >
          {playing ? "❚❚" : "▶"}
        </button>
        <button
          type="button"
          onClick={() => seek(time + 10)}
          aria-label="Forward 10 seconds"
          className="flex min-h-11 min-w-11 touch-none items-center justify-center rounded-md border border-border font-mono text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{ touchAction: "none" }}
        >
          ▸▸
        </button>
        <span className="ml-auto font-mono text-[11px] tabular-nums text-muted-foreground" role="timer">{fmt(time)} / {fmt(duration)}</span>
      </div>
      <input
        type="range"
        min={0}
        max={duration}
        value={time}
        aria-label="Seek replay"
        onChange={(e) => seek(Number(e.target.value))}
        className="mt-2 min-h-11 w-full touch-none cursor-pointer accent-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        style={{ touchAction: "none" }}
      />
      <div className="h-1.5 overflow-hidden rounded-full bg-secondary" aria-hidden="true">
        <div className="h-full bg-accent transition-[width] motion-reduce:transition-none" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
