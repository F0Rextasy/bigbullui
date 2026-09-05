"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface Chapter {
  time: number; // seconds
  title: string;
}

export interface PodcastPlayerProps {
  title: string;
  episodes: { id: string; title: string; artist?: string }[];
  activeId?: string;
  chapters?: Chapter[];
  onPlay?: (episode: { id: string; title: string }) => void;
  onSkip?: (seconds: number) => void;
  className?: string;
}

export function PodcastPlayer({
  title,
  episodes,
  activeId,
  chapters,
  onPlay,
  onSkip,
  className,
  ...props
}: PodcastPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [speed, setSpeed] = React.useState(1);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((p) => Math.min(p + 1, 1800));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    if (seconds <= 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const motionReduceClass = "motion-reduce:transition-none";

  const speedChips = [
    { value: 1, label: "1x" },
    { value: 1.25, label: "1.25x" },
    { value: 1.5, label: "1.5x" },
  ];

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-6 shadow-sm outline-1 outline-dashed outline-offset-[-6px]",
        className
      )}
      {...props}
    >
      <header className="mb-4">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          {title}
        </h3>
      </header>

      <div className="mb-4">
        <div className="flex gap-2">
          {speedChips.map((chip) => (
            <button
              key={chip.value}
              onClick={() => setSpeed(chip.value)}
              className={cn(
                "rounded px-2 py-1 text-xs font-mono uppercase tracking-[0.1em]",
                chip.value === speed &&
                  "bg-primary text-primary-foreground shadow-sm",
                "motion-reduce:transition-none"
              )}
            >
              {chip.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={cn(
            "rounded-full p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            isPlaying && "bg-primary/10 text-primary",
            !isPlaying && "bg-secondary/10 text-secondary",
            "transition-colors hover:bg-primary/20 hover:bg-secondary/20",
            motionReduceClass
          )}
        >
          {isPlaying ? (
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <polygon points="5 3 19 12 5 21 5 12" fill="currentColor" />
            </svg>
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatTime(progress)}</span>
          <span>Remaining</span>
        </div>
        <div className="w-full bg-background rounded-full h-2 overflow-hidden">
          <div
            className={cn(
              "h-full bg-primary w-0 rounded-full transition-all duration-500 ease-out",
              progress > 0 && "shadow-lg",
              motionReduceClass
            )}
            style={{ width: `${(progress / 1800) * 100}%` }}
          />
        </div>
      </div>

      {/* Chapter ticks */}
      {chapters && chapters.length > 0 && (
        <div className="mt-2 text-xs text-muted-foreground">
          {chapters.map((chapter) => {
            const percent = (chapter.time / 1800) * 100;
            return (
              <span
                key={chapter.title}
                className="mr-2"
                style={{ flexBasis: `${percent}%` }}
              >
                {formatTime(chapter.time)}
              </span>
            );
          })}
        </div>
      )}

      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={() => onSkip?.(-15)}
          className={cn(
            "rounded p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-transform hover:scale-95",
            motionReduceClass
          )}
          aria-label="Skip back 15s"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        </button>
        <button
          onClick={() => onSkip?.(15)}
          className={cn(
            "rounded p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-transform hover:scale-95",
            motionReduceClass
          )}
          aria-label="Skip forward 15s"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path d="M16 5v14l-11-7z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
  );
}