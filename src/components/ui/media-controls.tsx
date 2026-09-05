"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MediaControlsProps {
  playing?: boolean;
  onToggle?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  onStop?: () => void;
  progress?: number;
  className?: string;
}

export function MediaControls({
  playing = false,
  onToggle,
  onNext,
  onPrev,
  onStop,
  progress = 0,
  className,
  ...props
}: MediaControlsProps) {
  const handlePress = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    target.style.transform = "scale(0.95)";
    setTimeout(() => {
      target.style.transform = "";
    }, 100);
  };

  const motionReduceClass = "motion-reduce:transition-none";

  return (
    <div
      className={cn(
        "flex items-center gap-2 p-2 rounded-lg bg-card border border-border",
        className
      )}
      {...props}
    >
      {/* Prev button */}
      <button
        onClick={onPrev}
        onMouseDown={(e) => handlePress(e)}
        className={cn(
          "rounded-sm p-1.5",
          "motion-reduce:transition-none"
        )}
        aria-label="Previous"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            d="M15 18l-5-5 5-5-3.5 3.5L19 7l-5 5 5 5-3.5-3.5L7 11l5-5z"
            fill="currentColor"
        />
        </svg>
      </button>

      {/* Play/pause toggle */}
      <button
        onClick={onToggle}
        className={cn(
          "rounded-sm p-1.5 flex size-9 size-mobile-10",
          playing && "bg-primary/10 text-primary",
          !playing && "bg-secondary/10 text-secondary",
          "transition-colors hover:bg-primary/20 hover:bg-secondary/20",
          motionReduceClass
        )}
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? (
          <svg className="size-full" viewBox="0 0 24 24">
            <polygon points="5 3 19 12 5 21 5 12" fill="currentColor" />
          </svg>
        ) : (
          <svg className="size-full" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        )}
      </button>

      {/* Next button */}
      <button
        onClick={onNext}
        onMouseDown={(e) => handlePress(e)}
        className={cn(
          "rounded-sm p-1.5",
          "motion-reduce:transition-none"
        )}
        aria-label="Next"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            d="M9 18l5-5-5-5 3.5-3.5L15 7l5 5-3.5 3.5L11 13l-5 5z"
            fill="currentColor"
        />
        </svg>
      </button>

      {/* Stop button */}
      {onStop && (
        <button
          onClick={onStop}
          className={cn(
            "rounded-sm p-1.5",
            "motion-reduce:transition-none"
          )}
          aria-label="Stop"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="1.5" />
            <line x1="3" y1="15" x2="21" y2="15" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      )}

      {/* Progress micro-bar */}
      <div className="flex-1 h-0.5 bg-muted rounded-full overflow-hidden mx-2">
        <div
          className="h-full bg-primary rounded-full transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Time display */}
      <span className="text-xs text-muted-foreground">
        {progress > 0 ? "0:00" : ""}
      </span>
    </div>
  );
}