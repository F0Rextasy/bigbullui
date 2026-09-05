"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface RouteLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visible progress bar animation during route transitions */
  active: boolean;
}

/** Route progress bar: top micro loading indicator. */
export function RouteLoader({ active, className, ...props }: RouteLoaderProps) {
  return (
    <div
      className={cn("fixed inset-x-0 top-0 z-[60] h-0.5 overflow-hidden transition-opacity duration-200 motion-reduce:transition-none", active ? "opacity-100" : "opacity-0", className)}
      role="progressbar"
      aria-label="Page loading"
      {...props}
    >
      <style>{`
        @keyframes rlRun {
          0% { transform: translateX(-100%) scaleX(0.4); }
          50% { transform: translateX(30%) scaleX(0.5); }
          100% { transform: translateX(100%) scaleX(0.4); }
        }
      `}</style>
      {active && <div className="h-full w-full bg-accent" style={{ animation: "rlRun 1.2s ease-in-out infinite" }} />}
    </div>
  );
}
