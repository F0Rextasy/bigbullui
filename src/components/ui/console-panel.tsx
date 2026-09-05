"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ConsoleLine {
  id: string;
  text: string;
  tone?: "input" | "output" | "error" | "accent";
}

export interface ConsolePanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  lines: ConsoleLine[];
  prompt?: string;
  onSubmit?: (command: string) => void;
}

/** Konsol çıktı paneli: log + input satırı + renkli tonlar. */
export function ConsolePanel({ lines, prompt = ">", onSubmit, className, ...props }: ConsolePanelProps) {
  const [input, setInput] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines.length]);

  const toneClass = {
    input: "text-accent",
    output: "text-foreground/90",
    error: "text-destructive",
    accent: "text-emerald-500",
  };

  return (
    <div
      className={cn("w-full overflow-hidden rounded-lg border border-border bg-[#0d0d0d] font-mono text-xs", className)}
      onClick={() => inputRef.current?.focus()}
      {...props}
    >
      <style>{`@keyframes cpIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="flex items-center justify-between border-b border-border/40 bg-secondary/40 px-3 py-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">konsol</span>
        <span className="flex gap-1" aria-hidden="true">
          <span className="size-1.5 rounded-full bg-destructive/70" />
          <span className="size-1.5 rounded-full bg-amber-500/70" />
          <span className="size-1.5 rounded-full bg-emerald-500/70" />
        </span>
      </div>
      <div ref={scrollRef} className="max-h-56 overflow-y-auto p-3">
        {lines.map((line, idx) => (
          <div key={line.id} className={cn("leading-5 animate-[cpIn_0.2s_ease-out_both] motion-reduce:animate-none", toneClass[line.tone ?? "output"])} style={{ animationDelay: `${Math.min(idx, 20) * 25}ms` }}>
            {line.tone === "input" && <span className="mr-1 text-muted-foreground">{prompt}</span>}
            {line.text}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 border-t border-border/40 px-3 py-2">
        <span className="text-accent" aria-hidden="true">{prompt}</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input.trim()) {
              onSubmit?.(input.trim());
              setInput("");
            }
          }}
          className="min-w-0 flex-1 bg-transparent text-foreground focus-visible:outline-none"
          aria-label="Komut girişi"
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
