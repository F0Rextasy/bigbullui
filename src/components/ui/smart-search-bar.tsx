"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SmartSearchBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onSubmit"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  history?: string[];
  onHistoryChange?: (history: string[]) => void;
  shortcut?: string;
  placeholder?: string;
}

const HISTORY_KEY = "bigbullui-search-history";

function readHistory(): string[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const parsed: unknown = JSON.parse(raw ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string").slice(0, 8) : [];
  } catch {
    return [];
  }
}

export function SmartSearchBar({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  onSubmit,
  history: controlledHistory,
  onHistoryChange,
  shortcut = "Ctrl+K",
  placeholder = "Search anything...",
  className,
  ...props
}: SmartSearchBarProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const value = controlledValue ?? inner;
  const [innerHistory, setInnerHistory] = React.useState<string[]>([]);
  const history = controlledHistory ?? innerHistory;
  const [open, setOpen] = React.useState(false);
  const boxRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (controlledHistory === undefined) setInnerHistory(readHistory());
  }, [controlledHistory ]);

  const submit = (v: string) => {
    const trimmed = v.trim();
    if (trimmed.length === 0) return;
    const next = [trimmed, ...history.filter((h) => h !== trimmed)].slice(0, 8);
    if (controlledHistory === undefined) {
      setInnerHistory(next);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
    }
    onHistoryChange?.(next);
    onSubmit?.(trimmed);
    setOpen(false);
  };

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open ]);

  return (
    <div ref={boxRef} className={cn("relative w-full", className)} {...props}>
      <div className="flex items-center gap-2 rounded-lg border-2 border-foreground bg-card px-4 py-2.5 shadow-md transition-colors focus-within:border-accent">
        <span aria-hidden className="text-muted-foreground">⌕</span>
        <input
          value={value}
          onChange={(e) => {
            setInner(e.target.value);
            onValueChange?.(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit(value);
            else if (e.key === "Escape") setOpen(false);
          }}
          placeholder={placeholder}
          aria-label="Search"
          role="combobox"
          aria-expanded={open && history.length > 0}
          className="w-full bg-transparent font-mono text-sm focus:outline-none"
        />
        <kbd className="hidden shrink-0 rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">
          {shortcut}
        </kbd>
      </div>
      {open && history.length > 0 ? (
        <div className="absolute inset-x-0 top-full z-50 mt-1 overflow-hidden rounded-lg border border-border bg-card shadow-lg">
          <p className="border-b border-dashed border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Recent
          </p>
          {history.map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => {
                setInner(h);
                onValueChange?.(h);
                submit(h);
              }}
              className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left font-mono text-sm transition-colors hover:bg-secondary"
            >
              <span aria-hidden className="text-muted-foreground">◷</span>
              <span className="truncate">{h}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
