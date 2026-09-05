"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface VideoThumbnailProps {
  poster?: React.ReactNode;
  duration?: number;
  title?: string;
  className?: string;
}

export function VideoThumbnail({
  poster,
  duration,
  title,
  className,
  ...props
}: VideoThumbnailProps) {
  const motionReduceClass = "motion-reduce:transition-none";

  return (
    <div
      className={cn(
        "rounded-lg overflow-hidden bg-card border border-border p-6",
        className
      )}
      {...props}
    >
      {/* Poster frame */}
      <div
        className={cn(
          "relative w-full h-48 mb-3",
          "motion-reduce:transition-none"
        )}
      >
        {poster && (
          <div className="relative w-full h-48">
            {typeof poster === "string" ? (
              <img
                src={poster}
                alt={title || "Video"}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div
                className="w-full h-48 bg-muted flex items-center justify-center"
              >
                {/* Poster placeholder */}
              </div>
            )}
          </div>
        )}

        {/* Duration badge */}
        {duration && (
          <div
            className={cn(
              "absolute top-2 left-2 flex items-center gap-1 bg-background rounded-full px-2 py-0.5 text-xs font-mono uppercase tracking-[0.1em] text-muted-foreground",
              motionReduceClass
            )}
          >
            <span className="font-mono">
              {duration} {
                duration === 1 ? "min" : "min"
              }
            </span>
          </div>
        )}

        {/* Play overlay circle - scales on hover with ripple ring */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-full border-2 border-border/60",
            "motion-reduce:transition-none",
            "hover:scale-105",
            "transition-transform duration-200 ease-out"
          )}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
        >
          <svg
            className={cn("w-12 h-12 text-primary", motionReduceClass)}
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M8 12l4 4L20 4"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Title strip bottom gradient */}
      {title && (
        <div className="pt-3 border-t border-border/50">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            {title}
          </p>
        </div>
      )}
    </div>
  );
}