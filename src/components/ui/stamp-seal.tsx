import * as React from "react";
import { cn } from "./lib/utils";

export interface StampSealProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  subtext?: string;
  tone?: "accent" | "primary" | "destructive";
  rotate?: number;
  className?: string;
}

export function StampSeal({
  text = "ADMITTED",
  subtext = "OFFICIAL STUB",
  tone = "accent",
  rotate = -8,
  className,
  ...props
}: StampSealProps) {
  return (
    <div
      style={{ transform: `rotate(${rotate}deg)` }}
      className={cn(
        "relative inline-flex size-24 select-none flex-col items-center justify-center rounded-full border-2 p-1 text-center transition-transform hover:scale-105",
        tone === "accent" && "border-accent text-accent",
        tone === "primary" && "border-primary text-primary",
        tone === "destructive" && "border-destructive text-destructive",
        className
      )}
      {...props}
    >
      {/* Inner dashed ring */}
      <div
        className={cn(
          "flex size-full flex-col items-center justify-center rounded-full border border-dashed p-1",
          tone === "accent" && "border-accent",
          tone === "primary" && "border-primary",
          tone === "destructive" && "border-destructive"
        )}
      >
        <span className="font-mono text-[9px] uppercase tracking-widest opacity-80">
          ★ {subtext} ★
        </span>
        <span className="my-0.5 font-mono text-xs font-black uppercase tracking-[0.2em]">
          {text}
        </span>
        <span className="font-mono text-[8px] uppercase tracking-wider opacity-70">
          VERIFIED
        </span>
      </div>
    </div>
  );
}
