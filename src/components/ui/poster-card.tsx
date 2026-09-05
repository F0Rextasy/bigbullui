"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PosterCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  /** Date badge corner: { day, month } */
  date?: { day: string; month: string };
  gradient?: React.ReactNode;
}

/** Event poster card: gradient overlay + calendar date badge. */
export function PosterCard({ title, subtitle, date, gradient, className, children, ...props }: PosterCardProps) {
  return (
    <div className={cn("group relative aspect-[3/4] w-full max-w-56 overflow-hidden rounded-lg border border-border bg-secondary", className)} {...props}>
      <style>{`@keyframes pcZoom { from { transform: scale(1); } to { transform: scale(1.06); } }`}</style>
      <div className="absolute inset-0" aria-hidden="true">
        {gradient ?? <div className="size-full bg-gradient-to-br from-accent/40 via-secondary to-card" />}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 transition-opacity duration-300 motion-reduce:transition-none" aria-hidden="true" />

      {date && (
        <span className="absolute right-3 top-3 flex flex-col items-center rounded-md border border-white/20 bg-black/50 px-2 py-1 backdrop-blur-sm" style={{ animation: "pcZoom 0.3s ease-out both" }}>
          <span className="font-mono text-sm font-bold text-white">{date.day}</span>
          <span className="font-mono text-[8px] uppercase tracking-widest text-white/70">{date.month}</span>
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="truncate text-sm font-bold text-white">{title}</h3>
        {subtitle && <p className="mt-0.5 truncate text-xs text-white/70">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
