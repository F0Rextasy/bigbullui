"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type LoadingDotsProps = {
  size?: "sm" | "md" | "lg";
  tone?: "default" | "accent" | "destructive";
} & React.HTMLAttributes<HTMLElement>;

function getSizeClass(size: LoadingDotsProps["size"]): string {
  switch (size) {
    case "sm":
      return "w-2 h-2";
    case "lg":
      return "w-4 h-4";
    default:
      return "w-3 h-3";
  }
}

function getToneClass(tone: LoadingDotsProps["tone"]): string {
  switch (tone) {
    case "accent":
      return "text-accent";
    case "destructive":
      return "text-destructive";
    default:
      return "text-muted-foreground";
  }
}

export function LoadingDots({ size = "md", tone = "default", ...props }: LoadingDotsProps) {
  const sizeClass = getSizeClass(size);
  const toneClass = getToneClass(tone);

  return (
    <div className={cn("flex items-center gap-2", "motion-reduce:animate-none")} {...props}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(sizeClass, "rounded-full bg-current", toneClass, "animate-[loadingDotsBounce_1.2s_ease-in-out_infinite]", "motion-reduce:animate-none")}
          style={{ animationDelay: `${i * 160}ms` }}
        />
      ))}
    </div>
  );
}