"use client";
import * as React from "react";
import { cn } from "./lib/utils";

export type LiveClockProps = {
  timezone?: string;
  variant?: "digital" | "badge";
};

const LiveClock = ({ timezone, variant = "digital" }: LiveClockProps) => {
  const [time, setTime] = React.useState<Date | null>(null);

  React.useEffect(() => {
    const start = setTimeout(() => setTime(new Date()), 0);
    const tick = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearTimeout(start);
      clearInterval(tick);
    };
  }, []);

  const formatted = time
    ? time.toLocaleTimeString("en-US", { hour12: false, timeZone: timezone })
    : "--:--:--";

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
      {digits.map((digit, i) => (
        <span key={i} className="min-wmax">
          {digit}
        </span>
      ))}
    </div>
  );
};

export { LiveClock };
