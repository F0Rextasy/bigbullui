"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CountdownProps extends React.HTMLAttributes<HTMLDivElement> {
  targetDate: Date | string;
  onComplete?: () => void;
  className?: string;
}

export function Countdown({
  targetDate,
  onComplete,
  className,
  ...props
}: CountdownProps) {
  const calculateTimeLeft = React.useCallback(() => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, completed: true };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      completed: false,
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft);

  React.useEffect(() => {
    const timer = setInterval(() => {
      const next = calculateTimeLeft();
      setTimeLeft(next);
      if (next.completed) {
        clearInterval(timer);
        onComplete?.();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft, onComplete]);

  const units = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINS", value: timeLeft.minutes },
    { label: "SECS", value: timeLeft.seconds },
  ];

  return (
    <div
      role="timer"
      aria-label="Countdown timer"
      className={cn("inline-flex items-center gap-2 select-none", className)}
      {...props}
    >
      {units.map((unit, idx) => (
        <React.Fragment key={unit.label}>
          <div className="flex flex-col items-center justify-center rounded-md border-2 border-foreground bg-card px-3 py-2 text-center shadow-xs min-w-[56px]">
            <span className="font-mono text-xl font-black text-foreground">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5">
              {unit.label}
            </span>
          </div>
          {idx < units.length - 1 ? (
            <span className="font-mono text-lg font-bold text-muted-foreground">:</span>
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
}
