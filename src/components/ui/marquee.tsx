"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  speed?: number; // duration in seconds
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  speed = 25,
  direction = "left",
  pauseOnHover = true,
  className,
  ...props
}: MarqueeProps) {
  const isRight = direction === "right";

  return (
    <div
      className={cn("group flex overflow-hidden select-none", className)}
      {...props}
    >
      <div
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-6 motion-reduce:transform-none",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          animation: `marquee ${speed}s linear infinite ${isRight ? "reverse" : "normal"}`,
        }}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-6 motion-reduce:transform-none",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          animation: `marquee ${speed}s linear infinite ${isRight ? "reverse" : "normal"}`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
