"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface GanttItem {
  id: string;
  title: string;
  stage: string;
  startHour: number; // 0 to 24 (e.g. 18.5 = 18:30)
  durationHours: number;
  tier?: "VIP" | "HEADLINER" | "SUPPORT" | "DJ";
}

export interface GanttLiteProps extends React.HTMLAttributes<HTMLDivElement> {
  stages?: string[];
  items?: GanttItem[];
  startHour?: number;
  endHour?: number;
  liveHour?: number;
  onSelectItem?: (item: GanttItem) => void;
  className?: string;
}

const DEFAULT_STAGES = ["MAIN STAGE", "ARENA B", "ACOUSTIC DOME"];

const DEFAULT_ITEMS: GanttItem[] = [
  { id: "g1", title: "THE NEON PULSE", stage: "MAIN STAGE", startHour: 18, durationHours: 2, tier: "HEADLINER" },
  { id: "g2", title: "CYBER STRINGS", stage: "MAIN STAGE", startHour: 20.5, durationHours: 2.5, tier: "HEADLINER" },
  { id: "g3", title: "SOLO ACOUSTIC", stage: "ARENA B", startHour: 19, durationHours: 1.5, tier: "SUPPORT" },
  { id: "g4", title: "MIDNIGHT ECHOES", stage: "ARENA B", startHour: 21, durationHours: 2, tier: "DJ" },
  { id: "g5", title: "SECRET STUB SET", stage: "ACOUSTIC DOME", startHour: 19.5, durationHours: 2, tier: "VIP" },
];

const TIER_COLORS: Record<string, string> = {
  HEADLINER: "border-accent bg-accent/20 text-accent font-bold",
  VIP: "border-foreground bg-foreground text-background font-bold",
  SUPPORT: "border-border bg-card text-foreground",
  DJ: "border-dashed border-border bg-secondary text-foreground",
};

export function GanttLite({
  stages = DEFAULT_STAGES,
  items = DEFAULT_ITEMS,
  startHour = 18,
  endHour = 24,
  liveHour = 20,
  onSelectItem,
  className,
  ...props
}: GanttLiteProps) {
  const totalHours = endHour - startHour;
  const hours = Array.from({ length: totalHours + 1 }, (_, i) => startHour + i);

  // Live line position percent
  const livePercent = Math.max(0, Math.min(100, ((liveHour - startHour) / totalHours) * 100));

  return (
    <div
      className={cn(
        "relative w-full overflow-x-auto rounded-lg border-2 border-foreground bg-card p-4 font-mono select-none shadow-sm",
        className
      )}
      {...props}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-border pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-accent animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider text-foreground">
            VENUE TIMETABLE & STUB SCHEDULE
          </span>
        </div>
        <span className="rounded border border-accent bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">
          CURRENT: {liveHour.toString().padStart(2, "0")}:00
        </span>
      </div>

      <div className="min-w-[640px]">
        {/* Time column headers */}
        <div className="flex border-b border-border pb-2 text-[10px] font-bold text-muted-foreground">
          <div className="w-36 shrink-0 uppercase tracking-wider">STAGE / ZONE</div>
          <div className="relative flex flex-1 justify-between px-2">
            {hours.map((h) => (
              <span key={h} className="text-center w-10">
                {h}:00
              </span>
            ))}
          </div>
        </div>

        {/* Rows per stage */}
        <div className="relative divide-y divide-border/60">
          {/* Animated live line indicator */}
          <div
            style={{ left: `calc(9rem + (100% - 9rem) * ${livePercent / 100})` }}
            className="absolute top-0 bottom-0 z-20 pointer-events-none w-0.5 bg-accent"
          >
            <div className="absolute -top-2 -translate-x-1/2 rounded bg-accent px-1 text-[8px] font-bold text-accent-foreground">
              NOW
            </div>
          </div>

          {stages.map((stage) => {
            const stageItems = items.filter((item) => item.stage === stage);

            return (
              <div key={stage} className="relative flex items-center py-3 min-h-[56px]">
                {/* Stage label */}
                <div className="w-36 shrink-0 pr-3">
                  <div className="text-xs font-bold uppercase text-foreground truncate">
                    {stage}
                  </div>
                  <div className="text-[9px] text-muted-foreground uppercase">
                    {stageItems.length} ACTS
                  </div>
                </div>

                {/* Timeline track */}
                <div className="relative flex-1 h-10 rounded bg-secondary/40 border border-dashed border-border/50">
                  {stageItems.map((item) => {
                    const leftPercent = ((item.startHour - startHour) / totalHours) * 100;
                    const widthPercent = (item.durationHours / totalHours) * 100;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => onSelectItem?.(item)}
                        style={{
                          left: `${leftPercent}%`,
                          width: `${widthPercent}%`,
                        }}
                        className={cn(
                          "absolute top-1 bottom-1 flex items-center justify-between rounded px-2 text-left cursor-pointer border shadow-xs transition-all hover:scale-[1.02] hover:z-30 hover:shadow-md",
                          TIER_COLORS[item.tier || "SUPPORT"]
                        )}
                      >
                        <span className="truncate text-[10px] uppercase font-bold tracking-tight">
                          {item.title}
                        </span>
                        {item.tier && (
                          <span className="ml-1 shrink-0 rounded bg-background/80 px-1 py-0.2 text-[8px] text-foreground">
                            {item.tier}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
