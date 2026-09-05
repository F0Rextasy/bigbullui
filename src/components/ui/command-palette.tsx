"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CommandItem {
  id: string;
  label: string;
  category?: string;
  shortcut?: string;
  hint?: string;
  keywords?: string[];
  onSelect?: () => void;
}

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandItem[];
  placeholder?: string;
}

export function CommandPalette({
  open,
  onOpenChange,
  items,
  placeholder = "Type a command or search tickets...",
}: CommandPaletteProps) {
  const [search, setSearch] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const MAX_RESULTS = 60;

  function scoreItem(item: CommandItem, tokens: string[]): number {
    const label = item.label.toLowerCase();
    const category = (item.category ?? "").toLowerCase();
    const hint = (item.hint ?? "").toLowerCase();
    const keywords = (item.keywords ?? []).map((k) => k.toLowerCase());
    let score = 0;
    for (const token of tokens) {
      let tokenScore = 0;
      if (label.startsWith(token)) tokenScore = Math.max(tokenScore, 100);
      else if (label.toLowerCase().includes(token)) tokenScore = Math.max(tokenScore, 50);
      for (const kw of keywords) {
        if (kw.startsWith(token)) tokenScore = Math.max(tokenScore, 30);
        else if (kw.includes(token)) tokenScore = Math.max(tokenScore, 20);
      }
      if (category.includes(token)) tokenScore = Math.max(tokenScore, 10);
      if (hint.includes(token)) tokenScore = Math.max(tokenScore, 5);
      if (tokenScore === 0) return 0;
      score += tokenScore;
    }
    return score;
  }

  const filteredItems = React.useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return items.slice(0, MAX_RESULTS);
    const tokens = query.split(/\s+/).filter(Boolean);
    return items
      .map((item) => ({ item, score: scoreItem(item, tokens) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_RESULTS)
      .map((entry) => entry.item);
  }, [items, search]);

  const totalMatches = React.useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return items.length;
    const tokens = query.split(/\s+/).filter(Boolean);
    return items.filter((item) => scoreItem(item, tokens) > 0).length;
  }, [items, search]);

  React.useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems.length]);

  React.useEffect(() => {
    if (open) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onOpenChange(false);
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, onOpenChange]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      filteredItems[selectedIndex].onSelect?.();
      onOpenChange(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => onOpenChange(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-[2px] animate-[fade-in_0.15s_ease-out_both]"
      />

      {/* Palette Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative z-50 w-full max-w-xl overflow-hidden rounded-xl border-2 border-foreground bg-card shadow-2xl outline-1 outline-dashed outline-offset-[-6px] animate-[scale-in_0.15s_ease-out_both]"
      >
        {/* Search Header */}
        <div className="flex items-center border-b-2 border-dashed border-border px-4 py-3">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground mr-3 shrink-0"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <span className="font-mono text-[10px] text-muted-foreground uppercase border border-border px-1.5 py-0.5 rounded-sm">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-72 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="py-6 text-center font-mono text-xs text-muted-foreground">
              NO COMMANDS MATCHING QUERY
            </div>
          ) : (
            (() => {
              const rows: React.ReactNode[] = [];
              let lastCategory: string | undefined;
              let flatIndex = 0;
              for (const item of filteredItems) {
                const group = item.category ?? "Results";
                if (group !== lastCategory) {
                  lastCategory = group;
                  rows.push(
                    <div
                      key={`group-${group}`}
                      className="px-3 pb-1 pt-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground"
                      aria-hidden="true"
                    >
                      {group}
                    </div>
                  );
                }
                const idx = flatIndex;
                flatIndex += 1;
                const isSelected = idx === selectedIndex;
                rows.push(
                  <div
                    key={item.id}
                    onClick={() => {
                      item.onSelect?.();
                      onOpenChange(false);
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={cn(
                      "flex cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2 font-mono text-xs transition-colors select-none",
                      isSelected
                        ? "bg-accent font-bold text-accent-foreground"
                        : "text-foreground hover:bg-secondary"
                    )}
                  >
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate">{item.label}</span>
                      {item.hint ? (
                        <span
                          className={cn(
                            "truncate text-[10px] font-normal",
                            isSelected ? "text-accent-foreground opacity-80" : "text-muted-foreground"
                          )}
                        >
                          {item.hint}
                        </span>
                      ) : null}
                    </div>
                    {item.shortcut ? (
                      <span
                        className={cn(
                          "shrink-0 text-[10px] tracking-wider",
                          isSelected ? "text-accent-foreground opacity-90" : "text-muted-foreground"
                        )}
                      >
                        {item.shortcut}
                      </span>
                    ) : null}
                  </div>
                );
              }
              return rows;
            })()
          )}
        </div>

        {/* Palette Footer */}
        <div className="flex items-center justify-between border-t border-dashed border-border bg-secondary/40 px-4 py-2 font-mono text-[10px] text-muted-foreground">
          <span>
            {totalMatches} result{totalMatches === 1 ? "" : "s"}
          </span>
          <span>Navigate: ↑↓</span>
          <span>Select: ↵</span>
        </div>
      </div>
    </div>
  );
}
