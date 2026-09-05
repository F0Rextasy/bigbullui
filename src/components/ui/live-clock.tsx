"use client";
import * as React from "react";
import { cn } from "./lib/utils";

export type LiveClockProps = {
  timezone?: string;
  variant?: "digital" | "badge";
};

const clockFlipKeyframes = `
  @keyframes clockFlip {
    from { transform: translateY(0) rotate(0deg); }
    to { transform: translateY(-100%) rotate(180deg); }
  }
`;

const LiveClock = ({ timezone, variant = "digital" }: LiveClockProps) => {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const tick = setTimeout(() => setTime(new Date()), 1000);
    return () => clearTimeout(tick);
  }, []);

  const formatted = time.toLocaleTimeString("en-US", {
    hour12: false,
    timeZone: timezone,
  });

  const digits = formatted.split(":");

  return (
    <div
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground",
        "inline-flex gap-1",
        variant === "digital" && "animate-[fade-in-up_0.3s_ease-out_both]",
        variant === "badge" && "bg-card p-2 rounded-md",
        "motion-reduce:animate-none"
      )}
    >
      <style>{clockFlipKeyframes}</style>
      {digits.map((digit, i) => (
        <span key={i} className="min-wmax">
          {digit}
        </span>
      ))}
    </div>
  );
};

export { LiveClock };
