"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type TruncateProps = {
  lines?: number;
  expandable?: boolean;
  className?: string;
  children: React.ReactNode;
};

const Truncate = ({ lines = 1, expandable = true, className, children }: TruncateProps) => {
  const [showMore, setShowMore] = React.useState(false);

  if (!expandable) {
    return (
      <div
        className={cn("break-words text-sm", className)}
        style={{
          display: "-webkit-box",
          WebkitLineClamp: Math.max(1, lines),
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div className={cn("text-sm", className)}>
      <div
        className="break-words"
        style={
          showMore
            ? undefined
            : {
                display: "-webkit-box",
                WebkitLineClamp: Math.max(1, lines),
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }
        }
      >
        {children}
      </div>
      <button
        type="button"
        aria-expanded={showMore}
        onClick={() => setShowMore((prev) => !prev)}
        className="mt-1.5 cursor-pointer rounded-sm font-mono text-xs font-semibold uppercase tracking-[0.15em] text-accent-strong transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {showMore ? "Less" : "More"}
      </button>
    </div>
  );
};

Truncate.displayName = "Truncate";

export { Truncate };
