"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface VideoPlayerProps {
  title: string;
  duration: number;
  poster?: React.ReactNode;
  className?: string;
}

export function VideoPlayer({
  title,
  duration,
  poster,
  className,
  ...props
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);
  const videoRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((p) => Math.min(p + 5, duration));
      }, 200);
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
      ref={videoRef}
      className={cn(
        "rounded-lg overflow-hidden bg-card border border-border shadow-sm",
        className
      )}
      {...props}
    >
      {/* Video frame with sprocket styling */}
      <div className="relative">
        {/* Poster frame */}
        {poster && (
          <div
            className={cn(
              "relative w-full",
              "motion-reduce:transition-none"
            )}
          >
            {typeof poster === "string" ? (
              <img
                src={poster}
                alt={title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div
                className="w-full h-48 bg-muted flex items-center justify-center"
              >
                {/* Poster content */}
              </div>
            )}
          </div>
        )}

        {/* Controls overlay on hover - with focus-visible */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center pointer-events-none",
            hovered && "opacity-100 transition-opacity duration-300 ease-out",
            !hovered && "opacity-0 transition-opacity duration-300 ease-in",
            "motion-reduce:transition-none"
          )}
        >
          <div className="flex items-center gap-3 text-white">
            <button
              onClick={togglePlay}
              className={cn(
                "rounded-full p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-black/50 transition-colors hover:bg-black/70",
                "motion-reduce:transition-none"
              )}
            >
              {isPlaying ? (
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <polygon
                    points="5 3 19 12 5 21 5 12"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" fill="currentColor" />
                </svg>
              )}
            </button>

            <span className="text-sm text-white/80">
              {formatTime(progress)}/{formatTime(duration)}
            </span>
          </div>

          {/* Progress bar on hover */}
          {hovered && (
            <div className="w-full bg-black/20 h-1 rounded-full mb-3">
              <div
                className="bg-white h-full rounded-full transition-width duration-200 ease-out"
                style={{ width: `${(progress / duration) * 100}%` }}
              />
            </div>
          )}
        </div>

        {/* Always-visible progress bar bottom */}
        <div className="absolute bottom-2 left-0 right-0 flex items-center text-sm text-white/70">
          <span>0:00</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Sprocket frame */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-foreground/20">
          <div className="relative w-full h-full">
            {/* Top sprocket */}
            <div className="flex h-2 items-center justify-between px-1">
              <div className="size-1.5 bg-foreground rotate-90" />
              <div className="size-1.5 bg-foreground rotate-nagative-90" />
            </div>
            {/* Bottom sprocket */}
            <div className="flex h-2 items-center justify-between px-1">
              <div className="size-1.5 bg-foreground rotate-90" />
              <div className="size-1.5 bg-foreground rotate-nagative-90" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}