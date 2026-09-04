import * as React from "react";
import { cn } from "./lib/utils";

export interface TimelineItem {
  date: string;
  title: string;
  description?: string;
  tone?: "default" | "accent";
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className, ...props }: TimelineProps) {
  return (
    <div className={cn("relative space-y-6 pl-6", className)} {...props}>
      {/* Continuous dashed vertical stem */}
      <div className="absolute left-[11px] top-2 bottom-2 w-0 border-l-2 border-dashed border-border" />

      {items.map((item, idx) => {
        const isAccent = item.tone === "accent";
        return (
          <div key={idx} className="relative flex items-start gap-4">
            {/* Node stamp */}
            <div
              className={cn(
                "relative z-10 -ml-6 mt-0.5 flex size-6 items-center justify-center rounded-full border-2 bg-card font-mono text-[10px] font-bold shadow-xs",
                isAccent ? "border-accent text-accent" : "border-foreground text-foreground"
              )}
            >
              {idx + 1}
            </div>

            {/* Content card */}
            <div className="flex-1 rounded-md border border-border bg-card p-3 shadow-xs">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="font-mono text-xs font-bold text-foreground uppercase tracking-wide">
                  {item.title}
                </h4>
                <span className="font-mono text-[10px] text-muted-foreground">{item.date}</span>
              </div>
              {item.description ? (
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
