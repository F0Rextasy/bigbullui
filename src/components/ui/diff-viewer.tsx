"use client";

import * as React from "react";
import { cn } from "./lib/utils";

interface DiffLine {
  text: string;
  type: "added" | "removed" | "context";
}

export interface DiffViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  before: string;
  after: string;
  className?: string;
}

function computeDiff(
  before: string,
  after: string,
): DiffLine[] {
  // Simple diff: split by lines and find added/removed/context
  const beforeLines = before.split("\n");
  const afterLines = after.split("\n");

  const lines: DiffLine[] = [];
  let i = 0,
    j = 0;

  while (i < beforeLines.length || j < afterLines.length) {
    if (i < beforeLines.length && j < afterLines.length && beforeLines[i] === afterLines[j]) {
      lines.push({ text: beforeLines[i], type: "context" });
      i++;
      j++;
    } else if (i < beforeLines.length) {
      lines.push({ text: beforeLines[i], type: "removed" });
      i++;
    } else {
      lines.push({ text: afterLines[j], type: "added" });
      j++;
    }
  }

  return lines;
}

export function DiffViewer({
  before,
  after,
  className,
  ...props
}: DiffViewerProps) {
  const diffLines = computeDiff(before, after);

  return (
    <div
      className={cn(
        "w-full rounded-md border border-border/60 bg-card p-4",
        "motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      <div className="space-y-2 text-[10px]">
        {diffLines.map((line, idx) => {
          const bgClass =
            line.type === "added"
              ? "bg-emerald-100 text-emerald-800"
              : line.type === "removed"
                ? "bg-destructive/10 text-destructive"
                : "bg-muted/50 text-muted-foreground";

          const transformClass =
            line.type === "added"
              ? "transform translate-x-0 transition-all duration-300"
              : line.type === "removed"
                ? "transform translate-x-[-10px] transition-all duration-300"
                : "";

          return (
            <div
              key={idx}
              className={cn(
                "p-2 rounded",
                bgClass,
                transformClass,
                "motion-reduce:transition-none",
                "animate-[slide-in_0.3s_ease-out_both]",
              )}
            >
              <span className="font-mono break-all">{line.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}