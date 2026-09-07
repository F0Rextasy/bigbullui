"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface LogoMarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  logos?: string[];
}

/** Logo marquee: infinite monogram ticker pausing on hover. */
export function LogoMarquee({ logos = ["ARENA", "STAGECO", "TIXLY", "GATE9", "ENCORE", "BALCONY"], className, ...props }: LogoMarqueeProps) {
  const row = [...logos, ...logos];
  return (
    <div className={cn("w-full max-w-xl overflow-hidden rounded-lg border-2 border-foreground bg-card py-3", className)} {...props}>
      <style>{`@keyframes logoSlide { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      <div className="flex w-max gap-2 motion-safe:animate-[logoSlide_18s_linear_infinite] hover:[animation-play-state:paused]" aria-label="Partner logos">
        {row.map((l, i) => (
          <span key={i} aria-hidden={i >= logos.length} className="rounded-md border border-dashed border-border bg-background px-4 py-1.5 font-mono text-xs font-black tracking-widest">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
