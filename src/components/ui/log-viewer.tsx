"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface LogEntry {
  time?: string;
  level: "INFO" | "WARN" | "ERROR";
  message: string;
}

export interface LogViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  entries: LogEntry[];
  className?: string;
}

export function LogViewer({
  entries,
  className,
  ...props
}: LogViewerProps) {
  const [filterLevel, setFilterLevel] = React.useState<"INFO" | "WARN" | "ERROR" | "all">(
    "all",
  );

  const filteredEntries = entries.filter(
    (entry) => filterLevel === "all" || entry.level === filterLevel,
  );

  const levelClass = {
    INFO: "bg-emerald-100 text-emerald-800",
    WARN: "bg-emerald-100 text-emerald-800",
    ERROR: "bg-destructive/10 text-destructive",
  };

  return (
    <div
      className={cn(
        "w-full",
        "motion-reduce:animate-none",
        className,
      )}
      {...props}
    >
      {/* Filter chips */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setFilterLevel("all")}
          className={cn(
            "px-3 py-1 rounded text-[9px] uppercase",
            filterLevel === "all"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground transition-colors",
          )}
        >
          All
        </button>
        <button
          onClick={() => setFilterLevel("INFO")}
          className={cn(
            "px-3 py-1 rounded text-[9px] uppercase",
            filterLevel === "INFO"
              ? "bg-emerald-100 text-emerald-800"
              : "text-muted-foreground hover:text-foreground transition-colors",
          )}
        >
          INFO
        </button>
        <button
          onClick={() => setFilterLevel("WARN")}
          className={cn(
            "px-3 py-1 rounded text-[9px] uppercase",
            filterLevel === "WARN"
              ? "bg-emerald-100 text-emerald-800"
              : "text-muted-foreground hover:text-foreground transition-colors",
          )}
        >
          WARN
        </button>
        <button
          onClick={() => setFilterLevel("ERROR")}
          className={cn(
            "px-3 py-1 rounded text-[9px] uppercase",
            filterLevel === "ERROR"
              ? "bg-destructive/10 text-destructive"
              : "text-muted-foreground hover:text-foreground transition-colors",
          )}
        >
          ERROR
        </button>
      </div>

      {/* Log lines with fade-slide stagger */}
      <div className="space-y-2 h-64 overflow-y-auto p-2 font-mono text-[10px]">
        {filteredEntries.map((entry, idx) => {
          const delay = idx * 30;
          const levelBg = levelClass[entry.level];

          return (
            <div
              key={entry.message}
              className={cn(
                "motion-reduce:transition-none",
                `animate-[slide-in_0.2s_ease-out_both ${delay}ms fill mode]`,
                levelBg,
                "p-2 rounded",
              )}
            >
              <span
                className={cn(
                  "inline-block px-2 py-0.5 rounded text-[8px] uppercase",
                  levelBg,
                  "mr-1",
                )}
              >
                {entry.level}
              </span>
              <span className="ml-2 break-all">{entry.message}</span>
            </div>
          );
        })}

        {/* Placeholder for empty */}
        {filteredEntries.length === 0 && (
          <div className="pt-4 text-center text-muted-foreground">
            No log entries match the current filter.
          </div>
        )}
      </div>
    </div>
  );
}