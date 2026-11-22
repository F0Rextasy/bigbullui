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
  onCommand?: (command: string) => void;
  className?: string;
}

const TONE_CLASS: Record<NonNullable<TerminalLine["tone"]>, string> = {
  info: "text-foreground",
  warn: "text-warning",
  error: "text-destructive",
};

export function Terminal({
  lines = [],
  prompt = "> ",
  loop = false,
  onCommand,
  className,
  ...props
}: TerminalProps) {
  const [command, setCommand] = React.useState("");
  const [history, setHistory] = React.useState<TerminalLine[]>([]);
  const loopKey = `${loop}:${lines.length}`;
  const [visEntry, setVisEntry] = React.useState({ key: loopKey, count: loop ? 1 : lines.length });
  const visibleCount = !loop || lines.length === 0 ? lines.length : (visEntry.key === loopKey ? visEntry.count : 1);

  React.useEffect(() => {
    if (!loop || lines.length === 0) return;
    const id = setInterval(() => {
      setVisEntry((prev) => {
        const cur = prev.key === loopKey ? prev.count : 1;
        return { key: loopKey, count: cur >= lines.length ? 1 : cur + 1 };
      });
    }, 800);
    return () => clearInterval(id);
  }, [lines.length, loop, loopKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = command.trim();
    if (!trimmed) return;
    setHistory((prev) => [...prev, { text: trimmed, tone: "info" }]);
    onCommand?.(trimmed);
    setCommand("");
  };

  const renderedLines = [...lines.slice(0, visibleCount), ...history];

  return (
    <div
      className={cn(
        "w-full rounded-lg border border-border bg-card overflow-hidden",
        className,
      )}
      {...props}
    >
      {/* Title bar */}
      <div className="flex items-center border-b border-border bg-secondary/70 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-success" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-destructive" aria-hidden="true" />
          <span className="ms-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            terminal
          </span>
        </div>
      </div>

      {/* Output area */}
      <div
        className="h-64 overflow-y-auto bg-background/60 p-4 font-mono text-xs leading-relaxed"
        role="log"
        aria-live="polite"
      >
        {renderedLines.map((line, lineIdx) => (
          <div
            key={`${lineIdx}-${line.text}`}
            style={{ animationDelay: `${Math.min(lineIdx, 8) * 35}ms` }}
            className={cn(
              "animate-[fadeIn_0.2s_ease-out_both] motion-reduce:animate-none!",
              TONE_CLASS[line.tone ?? "info"]
            )}
          >
            <span className="font-mono break-all">
              <span className="text-muted-foreground">{prompt}</span>
              {line.text}
            </span>
          </div>
        ))}
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="border-t border-border bg-secondary/40 p-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            aria-label="Terminal command input"
            className="flex-1 rounded-md border border-input bg-card px-2.5 py-1.5 font-mono text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder={prompt.trim() || ">"}
          />
          <button
            type="submit"
            aria-label="Run command"
            className="cursor-pointer rounded-md border border-border bg-card px-3 font-mono text-xs text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            ↩
          </button>
        </div>
      </form>
    </div>
  );
}