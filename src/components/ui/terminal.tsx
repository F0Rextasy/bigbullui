"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TerminalLine {
  text: string;
  tone?: "info" | "warn" | "error";
}

export interface TerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  lines: TerminalLine[];
  prompt?: string;
  loop?: boolean;
  className?: string;
}

export function Terminal({
  lines,
  prompt = "> ",
  loop = false,
  className,
  ...props
}: TerminalProps) {
  const [visibleIndex, setVisibleIndex] = React.useState(0);

  return (
    <div
      className={cn(
        "w-full rounded-lg border border-border/60 bg-card overflow-hidden",
        "motion-reduce:animate-none",
        className,
      )}
      {...props}
    >
      {/* Title bar */}
      <div className="flex items-center border-b border-border/60 bg-black/20 p-2">
        <div className="w-full flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
          <span className="text-[10px] uppercase text-muted-foreground">terminal</span>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-gray-300"></span>
          <span className="w-2 h-2 rounded-full bg-gray-400"></span>
        </div>
      </div>

      {/* Output area */}
      <div
        className="h-64 overflow-y-auto p-4 font-mono text-[10px] leading-relaxed text-muted-foreground"
        role="log"
      >
        {lines.map((line, lineIdx) => {
          const delay = lineIdx * 40;

          return (
            <div
              key={line.text}
              className={cn(
                "motion-reduce:transition-none",
                `animate-[type-in_0.2s_ease-out_both ${delay}ms fill mode]`,
                lineIdx < visibleIndex ? "" : "hidden",
              )}
            >
              <span className="font-mono break-all">{line.text}</span>
            </div>
          );
        })}

        {/* Auto-scroll: show last line */}
        {lines.length > 0 && (
          <div
            style={{ opacity: 0 }}
            className="pt-2"
          >
            {lines[lines.length - 1]?.text}
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="p-2 border-t border-border/60 bg-black/10">
        <div className="flex gap-2">
          <input
            type="text"
            className={cn(
              "flex-1 rounded-b-lg border border-border/60 bg-black p-2 text-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
            placeholder=">"
          />
          <button
            className={cn(
              "rounded-b-lg border border-border/60 bg-black px-3 text-[10px]",
            )}
            onClick={() => {}}
          >
            ↩
          </button>
        </div>
      </div>
    </div>
  );
}