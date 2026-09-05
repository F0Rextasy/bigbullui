import * as React from "react";
import { cn } from "./lib/utils";

export interface StageLightsProps {
  count?: number;
  className?: string;
}

export function StageLights({ count = 4, className }: StageLightsProps) {
  return (
    <div
      className={cn(
        "relative h-48 bg-card overflow-hidden motion-reduce:transition-none",
        className
      )}
    >
      <style>{`
        @keyframes stageLightSweep {
          0%, 100% { transform: translateX(-50%) rotate(-16deg); }
          50% { transform: translateX(-50%) rotate(16deg); }
        }
      `}</style>

      {/* Cones from top with gradient beams */}
      {Array.from({ length: count }, (_, i) => {
        const color = i % 2 === 0 ? "var(--accent)" : "var(--destructive)";
        return (
          <div
            key={i}
            className="absolute top-0 left-1/2 w-16 h-40 origin-top motion-reduce:animate-none"
            style={{
              left: `${(i + 1) * (100 / (count + 1))}%`,
              background: `linear-gradient(to bottom, ${color}, transparent)`,
              clipPath: "polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%)",
              animation: `stageLightSweep ${4}s ease-in-out ${i * 0.5}s infinite`,
            }}
          />
        );
      })}

      {/* Stage floor ellipse glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 size-24 rounded-full bg-accent/20 animate-pulse motion-reduce:animate-none" />
    </div>
  );
}