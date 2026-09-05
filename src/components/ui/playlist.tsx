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
  tracks,
  activeId,
  onPlay,
  className,
  ...props
}: PlaylistProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<string | null>(null);

  const formatDuration = (seconds?: number) => {
    if (seconds === undefined) return "-";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const motionReduceClass = "motion-reduce:transition-none";

  return (
    <div className={cn("space-y-1", className)} {...props}>
      {tracks.map((track) => {
        const isActive = track.id === activeId;
        const rowClass = cn(
          "flex items-center justify-between px-3 py-2 rounded-md transition-colors hover:bg-muted/50",
          isActive && "bg-primary/10 border border-primary/20",
          "motion-reduce:transition-none"
        );

        return (
          <div
            key={track.id}
            className={rowClass}
            onMouseEnter={() => setHoveredIndex(track.id)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                {tracks.indexOf(track) + 1}
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
            </div>

            {/* Active track equalizer bars */}
            {isActive && (
              <div className="mt-1 flex gap-1">
                {[1, 2, 3, 4, 5].map((height) => (
                  <div
                    key={height}
                    className={cn(
                      "flex-1 rounded-md bg-primary/30",
                      motionReduceClass
                    )}
                    style={{ height: `${height * 8}px` }}
                  />
                ))}
              </div>
            )}

            {/* Slide-in marker for active track */}
            {isActive && (
              <div
                className="absolute left-0 w-full h-full pointer-events-none"
                style={{
                  transition: "left 0.2s ease-out",
                  left: isActive ? "0" : "-100%",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}