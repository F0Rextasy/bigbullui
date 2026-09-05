"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface AudioPlayerProps {
  title: string;
  artist?: string;
  duration?: number;
  cover?: React.ReactNode;
  className?: string;
}

export function AudioPlayer({
  title,
  artist = "Unknown Artist",
  duration = 180,
  cover,
  className,
  ...props
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [volume, setVolume] = React.useState(0.7);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((p) => Math.min(p + 1, duration));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, duration]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-xl border-2 border-dashed border-border bg-card p-6 shadow-sm outline-1 outline-dashed outline-offset-[-6px]",
        className
      )}
      {...props}
    >
      {cover && (
        <div className="rounded-lg overflow-hidden bg-muted h-40">
          {typeof cover === "string" ? cover : null}
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          {title}
        </h3>
        {artist && (
          <p className="font-mono text-sm text-muted-foreground">{artist}</p>
        )}
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>0:00</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div
          className={cn(
            "w-full bg-background rounded-full h-2.5 overflow-hidden",
            "motion-reduce:transition-none"
          )}
        >
          <div
            className={cn(
              "h-full bg-primary w-0 rounded-full transition-all duration-500 ease-out",
              progress > 0 && "shadow-lg",
              "motion-reduce:transition-none"
            )}
            style={{ width: `${(progress / duration) * 100}%` }}
          >
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
          <span>0:00</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <button
          onClick={togglePlay}
          className={cn(
            "rounded-full p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "bg-primary/10 text-primary",
            "transition-colors hover:bg-primary/20",
            "motion-reduce:animate-none"
          )}
        >
          {isPlaying ? (
            <svg
              className="w-5 h-5"
            >
              <polygon
                points="5 3 19 12 5 21 5 12"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
            >
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          )}
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            {formatTime(progress)}
          </span>
          <input
            type="range"
            min="0"
            max={duration}
            value={progress}
            onChange={(e) => setProgress(parseInt(e.target.value, 10))}
            className="w-24 appearance-none rounded-md bg-muted h-1.5 outline-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setVolume(0)}
          className={cn(
            "p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:bg-muted transition-colors",
            "motion-reduce:animate-none"
          )}
          aria-label="Mute"
        >
          <svg
            className="w-4 h-4"
          >
            <path
              d="M6 4h4v16H6V4zm10-4v16h4v-2h2v-4h2v-4h4v-2h2V4h-4v2h-2v4h-2v2h-4v-2H6zm14.5-3.5a8.38 8.38 0 0 1-.9 3.8 8.4 8.4 0 0 1-3.3 1.8 8.38 8.38 0 0 1-3.8-.5 8.36 8.36 0 0 1-2.4-2.2 8.35 8.35 0 0 1-.5-3.3 8.38 8.38 0 0 1 1.8-3.3 8.4 8.4 0 0 1 3.8-.9 8.38 8.38 0 0 1 3.8 1.8 8.36 8.36 0 0 1 1.8 3.3 8.35 8.35 0 0 1-.5 3.3z"
            />
          </svg>
        </button>
        <button
          onClick={() => setVolume(1)}
          className={cn(
            "p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:bg-primary-50 transition-colors",
            "motion-reduce:animate-none"
          )}
          aria-label="Unmute"
        >
          <svg
            className="w-4 h-4"
          >
            <path
              d="M5 9v6h4v5h2v-5h4v5h2v-6H5zm2-3a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}