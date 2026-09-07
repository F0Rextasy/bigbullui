"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ShortcutRecorderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (shortcut: string) => void;
  label?: string;
}

const MODS = ["Control", "Shift", "Alt", "Meta"];

function formatShortcut(e: React.KeyboardEvent): string | null {
  if (MODS.includes(e.key)) return null;
  const parts: string[] = [];
  if (e.ctrlKey) parts.push("Ctrl");
  if (e.shiftKey) parts.push("Shift");
  if (e.altKey) parts.push("Alt");
  if (e.metaKey) parts.push("Meta");
  const key = e.key === " " ? "Space" : e.key.length === 1 ? e.key.toUpperCase() : e.key;
  parts.push(key);
  return parts.join("+");
}

export function ShortcutRecorder({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  label = "Shortcut",
  className,
  ...props
}: ShortcutRecorderProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const value = controlledValue ?? inner;
  const [recording, setRecording] = React.useState(false);

  const commit = (shortcut: string) => {
    setInner(shortcut);
    onValueChange?.(shortcut);
    setRecording(false);
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      <span className="mb-1 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setRecording((v) => !v)}
          onKeyDown={(e) => {
            if (!recording) return;
            e.preventDefault();
            const combo = formatShortcut(e);
            if (combo) commit(combo);
          }}
          onBlur={() => setRecording(false)}
          aria-pressed={recording}
          aria-label={recording ? "Press keys to record" : "Record shortcut"}
          className={cn(
            "min-w-44 cursor-pointer rounded-md border px-3 py-2 text-left font-mono text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            recording ? "border-accent bg-accent/10 text-accent" : "border-border bg-card hover:border-foreground/40",
          )}
        >
          {recording ? "Press keys…" : value || "Click to record"}
        </button>
        {value ? (
          <button
            type="button"
            aria-label="Clear shortcut"
            onClick={() => commit("")}
            className="cursor-pointer rounded border border-border px-2 py-2 font-mono text-xs text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        ) : null}
      </div>
    </div>
  );
}
