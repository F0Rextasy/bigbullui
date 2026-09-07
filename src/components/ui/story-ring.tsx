"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface StoryRingProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  segments?: number;
  seen?: number;
  onOpen?: () => void;
}

/** Story ring: avatar with segmented progress ring and tap zones. */
export function StoryRing({ name = "Ada", segments = 4, seen = 1, onOpen, className, ...props }: StoryRingProps) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className={cn("flex flex-col items-center gap-1.5", className)} {...props}>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open story by ${name}`}
        className="relative rounded-full transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none"
      >
        <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true" className="-rotate-90">
          <circle cx="36" cy="36" r={r} fill="none" strokeWidth="4" className="stroke-border" />
          {Array.from({ length: segments }).map((_, i) => (
            <circle
              key={i}
              cx="36"
              cy="36"
              r={r}
              fill="none"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${c / segments - 4} ${c}`}
              strokeDashoffset={-(i * (c / segments))}
              className={i < seen ? "stroke-muted-foreground" : "stroke-accent"}
            />
          ))}
        </svg>
        <span className="absolute inset-[10px] flex items-center justify-center rounded-full border-2 border-dashed border-border bg-secondary font-mono text-sm font-black">
          {name.slice(0, 2).toUpperCase()}
        </span>
      </button>
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{name}</span>
    </div>
  );
}
