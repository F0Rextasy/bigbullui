import * as React from "react";
import { cn } from "./lib/utils";

export interface NeonSignProps {
  text: string;
  color?: "accent" | "destructive" | "foreground";
  className?: string;
}

export function NeonSign({ text, color = "accent", className }: NeonSignProps) {
  const glowColor = {
    accent: "var(--accent)",
    destructive: "var(--destructive)",
    foreground: "var(--foreground)",
  }[color];

  return (
    <div
      className={cn(
        "relative rounded-lg border border-border bg-card p-4 motion-reduce:animate-none motion-reduce:transition-none",
        className
      )}
    >
      <style>{`
        @keyframes neonFlicker {
          0%, 100% { text-shadow: 0 0 5px ${glowColor}, 0 0 10px ${glowColor}, 0 0 15px ${glowColor}; }
          50% { text-shadow: 0 0 2px ${glowColor}, 0 0 5px ${glowColor}, 0 0 8px ${glowColor}; }
        }
        @keyframes buzzLetter {
          from { text-shadow: 0 0 3px currentColor, 0 0 5px currentColor; }
          to { text-shadow: 0 0 8px currentColor, 0 0 12px currentColor; }
        }
      `}</style>

      <div className="font-mono text-[10px] uppercase tracking-[0.15em]">
        {text.split("").map((char, i) => (
          <span
            key={i}
            className={cn(
              "text-current",
              "inline-block",
              color === "accent" && "animate-buzzing"
            )}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}