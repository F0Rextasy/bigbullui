"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  front: React.ReactNode;
  back: React.ReactNode;
  /** Flip trigger: hover or click */
  trigger?: "hover" | "click";
}

/** Two-sided flip card: rotateY 180, 3D perspective, hidden backface. */
export function FlipCard({ front, back, trigger = "click", className, ...props }: FlipCardProps) {
  const [flipped, setFlipped] = React.useState(false);

  const toggle = () => {
    if (trigger === "click") setFlipped((f) => !f);
  };

  return (
    <div
      className={cn("relative h-52 w-full [perspective:1000px]", className)}
      onMouseEnter={trigger === "hover" ? () => setFlipped(true) : undefined}
      onMouseLeave={trigger === "hover" ? () => setFlipped(false) : undefined}
      onClick={toggle}
      role={trigger === "click" ? "button" : undefined}
      tabIndex={trigger === "click" ? 0 : undefined}
      onKeyDown={trigger === "click" ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFlipped((f) => !f); } } : undefined}
      aria-pressed={trigger === "click" ? flipped : undefined}
      {...props}
    >
      <style>{`
        @keyframes flipCardIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div
        className={cn(
          "relative size-full transition-transform duration-500 [transform-style:preserve-3d] motion-reduce:transition-none",
          flipped && "[transform:rotateY(180deg)]"
        )}
      >
        {/* Front side */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-lg border-2 border-dashed border-border bg-card p-5 outline-1 outline-dashed outline-offset-[-6px] outline-border/40">
          {front}
        </div>
        {/* Back side */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-lg border border-border bg-accent text-accent-foreground p-5 animate-[flipCardIn_0.3s_ease-out_both] motion-reduce:animate-none">
          {back}
        </div>
      </div>
    </div>
  );
}
