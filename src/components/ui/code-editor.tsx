"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CodeEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  language?: string;
  readonly?: boolean;
}

/** Code editor with line numbers: overlay textarea + gutter. */
export function CodeEditor({ value, defaultValue = "", onValueChange, language = "ts", readonly, className, ...props }: CodeEditorProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const [focused, setFocused] = React.useState(false);
  const textRef = React.useRef<HTMLTextAreaElement>(null);
  const gutterRef = React.useRef<HTMLDivElement>(null);
  const code = value ?? internal;
  const lineCount = code.split("\n").length;

  const handleChange = (v: string) => {
    setInternal(v);
    onValueChange?.(v);
  };

  const syncScroll = () => {
    if (gutterRef.current && textRef.current) {
      gutterRef.current.scrollTop = textRef.current.scrollTop;
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const el = e.currentTarget;
      const start = el.selectionStart;
      const next = code.slice(0, start) + "  " + code.slice(el.selectionEnd);
      handleChange(next);
      requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = start + 2; });
    }
  };

  return (
    <div className={cn("w-full overflow-hidden rounded-lg border border-border bg-card transition-colors duration-200 motion-reduce:transition-none", focused && "border-foreground/40", className)} {...props}>
      <style>{`@keyframes ceIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
      <div className="flex items-center justify-between border-b border-border bg-secondary/60 px-3 py-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{language}</span>
        <span className="font-mono text-[10px] tabular-nums text-muted-foreground">{lineCount} lines</span>
      </div>
      <div className="relative flex max-h-72 overflow-hidden animate-[ceIn_0.3s_ease-out] motion-reduce:animate-none">
        {/* Gutter */}
        <div ref={gutterRef} className="select-none overflow-hidden border-r border-border/50 bg-secondary/30 px-2 py-3 text-right font-mono text-xs leading-5 text-muted-foreground/60" aria-hidden="true">
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <textarea
          ref={textRef}
          value={code}
          onChange={(e) => handleChange(e.target.value)}
          onScroll={syncScroll}
          onKeyDown={handleKey}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          readOnly={readonly}
          spellCheck={false}
          aria-label="Code editor"
          className="min-h-32 flex-1 resize-none bg-transparent px-3 py-3 font-mono text-xs leading-5 text-foreground focus-visible:outline-none"
        />
      </div>
    </div>
  );
}
