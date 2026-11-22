"use client";

import * as React from "react";
import { cn } from "./lib/utils";


const VoiceMessage: React.FC<{
  duration: number;
  bars?: number;
  playing?: boolean;
  onPlayPause?: () => void;
}> = ({ duration, bars = 5, playing = false, onPlayPause }) => {
  const renderBars = () => {
    if (playing) {
      return (
        <span
          className={cn(
            "flex items-baseline gap-0.5",
            "motion-reduce:animate-none"
          )}
        >
          {[...Array(bars)].map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-4 w-1 origin-bottom rounded-full bg-accent flex-1",
                "animate-[waveformBounce_0.8s_ease-in-out_infinite]",
                "motion-reduce:animate-none"
              )}
              style={{ animationDelay: `${i * 20}ms` }}
            />
          ))}
        </span>
      );
    } else {
      return (
        <span
          className={cn(
            "flex items-baseline gap-0.5",
            "motion-reduce:transition-none"
          )}
        >
          {[...Array(bars)].map((_, i) => (
            <span
              key={i}
              className="w-1 rounded-full bg-border/40"
              style={{ height: `${6 + ((i * 7 + duration) % 10)}px` }}
            />
          ))}
        </span>
      );
    }
  };

  return (
    <div className="relative rounded-xl border border-border bg-card p-3">
      <div className="flex items-baseline gap-2 text-sm">
        <span
          className={cn(
            "rounded-full bg-border/20 p-0.5 text-[10px] font-mono uppercase text-muted-foreground",
            "w-6 h-6 flex items-center justify-center flex-shrink-0"
          )}
        >
          {"⏺"}
        </span>
        <span className="font-mono text-foreground">
          {duration}s
        </span>
      </div>

      <div className="mt-2 flex-1 min-h-6">
        {renderBars()}
      </div>

      {onPlayPause && (
        <button
          type="button"
          onClick={onPlayPause}
          className="absolute -right-1 -top-1 cursor-pointer rounded-full bg-card p-1 border border-border hover:bg-secondary transition-colors duration-150"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <polygon points="8 5 19 12 8 19" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

export { VoiceMessage };