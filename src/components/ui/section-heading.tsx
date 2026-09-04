"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  badge?: string;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  badge,
  action,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-1.5 border-b-2 border-dashed border-border pb-3 font-mono select-none",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="size-2 rounded-full bg-accent animate-ping" />
          <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-foreground">
            {title}
          </h3>
          {badge && (
            <span className="rounded-xs border border-accent bg-accent/10 px-1.5 py-0.5 text-[9px] font-bold uppercase text-accent">
              {badge}
            </span>
          )}
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>

      {subtitle && (
        <p className="text-[11px] text-muted-foreground uppercase tracking-wider pl-4.5">
          {subtitle}
        </p>
      )}
    </div>
  );
}
