"use client";
import * as React from "react";
import { cn } from "./lib/utils";

export type TimeAgoProps = {
  date: Date | number | string;
  live?: boolean;
};

function formatTimeAgo(date: Date | number | string): string {
  const now = new Date();
  const target = typeof date === "number" ? new Date(date) : new Date(date);
  if (Number.isNaN(target.getTime())) return "UNKNOWN";
  const diffMs = now.getTime() - target.getTime();
  const isFuture = diffMs < 0;
  const diffSec = Math.floor(Math.abs(diffMs) / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  const label =
    diffDay > 0
      ? `${diffDay} DAY${diffDay === 1 ? "" : "S"}`
      : diffHour > 0
        ? `${diffHour} HR${diffHour === 1 ? "" : "S"}`
        : diffMin > 0
          ? `${diffMin} MIN${diffMin === 1 ? "" : "S"}`
          : `${diffSec} SEC${diffSec === 1 ? "" : "S"}`;

  return isFuture ? `IN ${label}` : `${label} AGO`;
}

const TimeAgo = ({ date, live = true }: TimeAgoProps) => {
  const [text, setText] = React.useState<string>("JUST NOW");

  React.useEffect(() => {
    setText(formatTimeAgo(date));
    if (!live) return;
    const interval = setInterval(() => {
      setText(formatTimeAgo(date));
    }, 30_000);
    return () => clearInterval(interval);
  }, [live, date]);

  return (
    <div
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground",
        "animate-[fade-in-up_0.3s_ease-out_both]",
        "motion-reduce:animate-none!"
      )}
    >
      {text}
    </div>
  );
};

export { TimeAgo };
