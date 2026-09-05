"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface EventCardProps {
  title: string;
  date?: string;
  venue?: string;
  time?: string;
  className?: string;
}

const FadeInUp = "animate-fade-in-up-0s fade-in-up-1";
const ScaleIn = "event-date-scale-in";
const Pulse = "event-stamp-pulse";

export function EventCard({
  title,
  date = "Oct 14",
  venue = "Berlin Arena",
  time = "21:00",
  className,
}: EventCardProps) {
  return (
    <div
      className={cn(
        "group relative w-full rounded-lg border border-foreground bg-card text-card-foreground p-6 transition-all duration-300 hover:translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:shadow-none",
        className
      )}
    >
      {/* Date block with dashed left edge */}
      <div className="relative flex items-start gap-3">
        <div
          className={cn(
            "group/[.event-active]:translate-y-0 shrink-0 size-8 rounded-full border-2 border-dashed border-border bg-secondary/10 flex flex-col items-center justify-center transition-all duration-300 motion-reduce:transition-none",
            ScaleIn,
            "event-date"
          )}
        >
          <div className="font-mono text-[24px] font-black uppercase tracking-widest">{date.slice(0, 2)}</div>
          <div className="font-mono text-[10px] uppercase tracking-widest">{date.slice(2)}</div>
        </div>

        <div className="group-[.event-active]:translate-x-0 flex-1">
          <h4 className="font-medium line-clamp-1">{title}</h4>
        </div>

        {time && (
          <div className="mt-1 flex items-center gap-1 text-xs uppercase tracking-wider text-muted-foreground">
            <span>{time}</span>
          </div>
        )}
      </div>

      {/* Venue chip */}
      {venue && (
        <div
          className={cn(
            "mt-3 inline-flex items-center rounded border border-dashed border-border bg-secondary/10 px-2.5 py-1 text-xs font-mono uppercase tracking-wider text-muted-foreground",
            Pulse
          )}
        >
          {venue}
        </div>
      )}
    </div>
  );
}