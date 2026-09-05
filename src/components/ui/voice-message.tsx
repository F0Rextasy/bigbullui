"use client";

import * as React from "react";
import { cn } from "./lib/utils";

const waveformKeyframe = `
  @keyframes waveformBounce {
    0%, 100% { height: 4px; }
    50% { height: 16px; }
  }
`;

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
                "rounded-full bg-accent flex-1",
                "animate-[waveformBounce_0.8s_ease-in_out_both]",
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
              className="w-1 h-4 rounded-full bg-border/30"
              style={{ height: `${4 + Math.random() * 4}px` }}
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
            "rounded-full bg-border/20 p-0.5 text-[10px] mono uppercase text-muted-foreground",
            "w-6 h-6 flex-shrink-0"
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
          onClick={onPlayPause}
          className="absolute -right-1 -top-1 rounded-full bg-card p-1 border border-border hover:bg-accent/5 transition-colors duration-150"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect x="6" y="4" width="12" height="16" rx="2" ry="2" />
              <rect x="12" y="4" width="12" height="16" rx="2" ry="2" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                d="M6 4h4l2-3h6l2 3h4L12 20v-8L6 4z"
              />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

export { VoiceMessage };