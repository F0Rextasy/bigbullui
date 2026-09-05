"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type ImageCompareProps = {
  before: string;
  after: string;
  alt?: string;
  defaultPosition?: number;
};

export function ImageCompare({ before, after, alt = "Comparison", defaultPosition = 50 }: ImageCompareProps) {
  const [position, setPosition] = React.useState(defaultPosition);
  const [dragging, setDragging] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = e.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();
    const clientX = e.clientX;
    const inset = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(0, Math.min(100, inset));
    setPosition(clamped);
    setDragging(true);
  };

  const handleMouseUp = () => setDragging(false);
  const handleMouseLeave = () => setDragging(false);

  return (
    <div
      className={cn("relative w-full h-64 rounded-md overflow-hidden bg-border", "motion-reduce:animate-none")}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0">
        <img
          src={before}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ clipPath: `inset(0 0 0 ${100 - position}%)` }}
        />
        <img
          src={after}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        />
      </div>

      <div
        className={cn(
          "absolute top-0 bottom-0 w-px bg-border",
          "dragging:scale-150",
          "motion-reduce:animate-none",
          "motion-reduce:transition-none",
        )}
        onMouseDown={(e) => { handleMouseMove(e); setDragging(true); }}
      >
        {/* Drag handle */}
        <div
          className={cn(
            "absolute -left-1/2 -translate-x-1/2 bottom-1/2 transform -rotate-90 w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center",
            "dragging:scale-125",
            "motion-reduce:animate-none",
            "motion-reduce:transition-none",
          )}
        >
          {position > 0 && position < 100 ? "&" : ""}
        </div>
      </div>

      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          "motion-reduce:animate-none",
        )}
      >
        {/* Labels */}
        <div className="pointer-events-auto">
          <div className="absolute left-2 top-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            BEFORE
          </div>
          <div className="absolute right-2 bottom-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            AFTER
          </div>
        </div>
      </div>
    </div>
  );
}