import * as React from "react";
import { cn } from "./lib/utils";

export interface DiscoBallProps {
  size?: "sm" | "md" | "lg";
  spinning?: boolean;
}

export function DiscoBall({ size = "md", spinning = true }: DiscoBallProps) {
  const sizeClasses = {
    sm: "size-16",
    md: "size-32",
    lg: "size-48",
  };

  return (
    <div
      className={cn(
        "relative size-[var(--size)] rounded-full bg-gradient-to-br from-secondary to-card border border-border/50",
        sizeClasses[size],
        spinning && "animate-spin"
      )}
    >
      <style>{`
        @keyframes discoDotDance {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>
      {/* Grid tiles */}
      {Array.from({ length: 20 }, (_, i) => {
        const mask = `radial-gradient(circle at ${30 + (i % 5) * 20}% ${40 + Math.floor(i / 5) * 15}%, rgba(255,255,255,0.2) 0%, transparent 50%)`;
        return (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: "8%",
              height: "8%",
              background: mask,
              maskImage: "radial-gradient(ellipse at 50% 50%, black, transparent)",
            }}
          />
        );
      })}

      {/* Light dots around */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const delay = i * 0.1;
        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: `calc(50% + ${Math.cos(angle) * 50}%)`,
              top: `calc(50% + ${Math.sin(angle) * 40}%)`,
              width: "3px",
              height: "3px",
              background: "currentColor",
              borderRadius: "50%",
              animation: `dotDance ${4}s ease-in-out ${delay}s infinite`,

            }}
          />
        );
      })}

      {/* Center hub */}
      <div className="absolute inset-0 rounded-full opacity-30" />
    </div>
  );
}