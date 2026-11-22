"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface Track {
  id: string;
  title: string;
  artist?: string;
  duration?: number;
}

export interface PlaylistProps {
  tracks: Track[];
  activeId?: string;
  onPlay?: (track: Track) => void;
  className?: string;
}

export function Playlist({
  tracks = [],
  activeId,
  onPlay,
  className,
  ...props
}: PlaylistProps) {
  const formatDuration = (seconds?: number) => {
    if (seconds === undefined) return "-";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const motionReduceClass = "motion-reduce:transition-none";

  return (
    <div className={cn("space-y-1", className)} {...props}>
      {tracks.map((track, idx) => {
        const isActive = track.id === activeId;
        const rowClass = cn(
          "relative flex w-full cursor-pointer items-center justify-between px-3 py-2 rounded-md text-left transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isActive && "bg-primary/10 border border-primary/20",
          "motion-reduce:transition-none"
        );

        return (
          <button
            type="button"
            key={track.id}
            className={rowClass}
            onClick={() => onPlay?.(track)}
            aria-current={isActive ? "true" : undefined}
          >
            <span className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                {idx + 1}
              </span>
              <span className="font-mono text-sm text-foreground">
                {track.title}
              </span>
              {track.artist && (
                <span className="text-muted-foreground/60 text-sm">
                  {track.artist}
                </span>
              )}
              <span className="text-muted-foreground/60 text-sm">
                {formatDuration(track.duration)}
              </span>
            </span>

            {/* Active track equalizer bars */}
            {isActive && (
              <span className="mt-1 flex gap-1" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((height) => (
                  <span
                    key={height}
                    className={cn(
                      "block flex-1 rounded-md bg-primary/30",
                      motionReduceClass
                    )}
                    style={{ height: `${height * 8}px` }}
                  />
                ))}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}