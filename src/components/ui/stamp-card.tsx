"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface StampCardProps extends React.HTMLAttributes<HTMLElement> {
  text?: string;
  subtext?: string;
  tone?: "accent" | "primary" | "destructive";
  className?: string;
}

export function StampCard({
  text = "ADMITTED",
  subtext = "OFFICIAL STUB",
  tone = "accent",
  className, ...props
}: StampCardProps) {
  return (
    <div
      className={cn(
        "group relative w-full rounded-lg border border-foreground bg-card text-card-foreground p-4 transition-[transform,width,height,opacity,background-color,border-color] duration-300 hover:translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:shadow-none",
        className
      )} {...props}
    >
      {/* Top tone badge */}
      <div className="flex items-center justify-between mb-3">
        <span className={cn(
          "inline-flex size-4 rounded-full border-2 border-dashed border-border text-xs font-mono uppercase tracking-wider",
          tone === "accent" && "border-accent text-accent",
          tone === "primary" && "border-primary text-primary",
          tone === "destructive" && "border-destructive text-destructive"
        )}>
          {text}
        </span>

        {/* Pulse indicator */}
        <span className="size-1.5 rounded-full bg-accent motion-safe:animate-pulse" aria-hidden="true" />
      </div>

      {/* Subtext */}
      <p className="text-xs text-muted-foreground line-clamp-2">
        {subtext}
      </p>
    </div>
  );
}