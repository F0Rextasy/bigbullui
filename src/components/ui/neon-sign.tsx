import * as React from "react";
import { cn } from "./lib/utils";

export interface NeonSignProps extends Omit<React.HTMLAttributes<HTMLElement>, "color"> {
  text: string;
  color?: "accent" | "destructive" | "foreground";
  className?: string;
}

export function NeonSign({ text = "", color = "accent", className, ...props }: NeonSignProps) {
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
      style={{ "--neon-glow": glowColor } as React.CSSProperties} {...props}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.15em]">
        {text.split("").map((char, i) => (
          <span
            key={i}
            className={cn(
              "text-current",
              "inline-block",
              color === "accent" && "animate-[buzzLetter_1.8s_ease-in-out_infinite_alternate] motion-reduce:animate-none"
            )}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}