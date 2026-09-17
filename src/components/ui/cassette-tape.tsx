"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CassetteTapeProps {
  title: string;
  playing?: boolean;
  onToggle?: () => void;
}

export function CassetteTape({ title, playing = false, onToggle }: CassetteTapeProps) {
  return (
    <div className="w-64 max-w-full">
      <style>{`@keyframes ctSpin { to { transform: rotate(360deg); } }`}</style>
      <div
        className={cn(
          "relative rounded-md border border-border bg-card p-4 motion-reduce:transition-none"
        )}
      >
        {/* Screws */}
        <div className="absolute top-1.5 left-1.5 size-1.5 rounded-full border border-border/50 bg-border/50" />
        <div className="absolute top-1.5 right-1.5 size-1.5 rounded-full border border-border/50 bg-border/50" />
        <div className="absolute bottom-1.5 left-1.5 size-1.5 rounded-full border border-border/50 bg-border/50" />
        <div className="absolute right-1.5 bottom-1.5 size-1.5 rounded-full border border-border/50 bg-border/50" />

        {/* Label */}
        <div className="rounded-sm border border-dashed border-border/60 bg-secondary/30 px-2 py-1 text-center">
          <div className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Cassette</div>
          <div className="truncate font-mono text-xs font-semibold text-foreground italic">{title}</div>
        </div>

        {/* Reels */}
        <div className="mt-3 flex items-center justify-between gap-3 px-1">
          <span
            aria-hidden="true"
            className="grid size-10 place-items-center rounded-full border-2 border-foreground/30 bg-background motion-reduce:animate-none"
            style={playing ? { animation: "ctSpin 1.2s linear infinite" } : undefined}
          >
            <span className="grid size-5 grid-cols-2 gap-px">
              <i className="rounded-full bg-muted-foreground/60" />
              <i className="rounded-full bg-muted-foreground/60" />
              <i className="rounded-full bg-muted-foreground/60" />
              <i className="rounded-full bg-muted-foreground/60" />
            </span>
          </span>
          <span className={cn("h-1 flex-1 rounded-full bg-border/60", playing && "bg-accent/60")} aria-hidden="true" />
          <span
            aria-hidden="true"
            className="grid size-10 place-items-center rounded-full border-2 border-foreground/30 bg-background motion-reduce:animate-none"
            style={playing ? { animation: "ctSpin 1.2s linear infinite reverse" } : undefined}
          >
            <span className="grid size-5 grid-cols-2 gap-px">
              <i className="rounded-full bg-muted-foreground/60" />
              <i className="rounded-full bg-muted-foreground/60" />
              <i className="rounded-full bg-muted-foreground/60" />
              <i className="rounded-full bg-muted-foreground/60" />
            </span>
          </span>
        </div>

        {/* Play toggle */}
        <button
          type="button"
          onClick={() => onToggle?.()}
          aria-pressed={playing}
          aria-label={playing ? "Pause cassette" : "Play cassette"}
          className="mt-3 w-full rounded-md border border-border bg-secondary/40 py-1.5 font-mono text-[10px] tracking-wider text-foreground uppercase transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none"
        >
          {playing ? "❚❚ Pause" : "▶ Play"}
        </button>
      </div>
    </div>
  );
}