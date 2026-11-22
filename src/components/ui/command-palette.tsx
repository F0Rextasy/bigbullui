"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "./lib/utils";
import { getFocusable, lockBodyScroll, registerEscapeLayer, trapFocus } from "./lib/focus-trap";

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
  synonyms?: Record<string, string | string[]>;
}

const EMPTY_SYNONYMS: Record<string, string | string[]> = {};

function normalizeWord(word: string): string {
  return word
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ı/g, "i")
    .replace(/[-_]+/g, " ")
    .trim();
}

function expandToken(token: string, synonyms: Record<string, string | string[]>): string[] {
  const out = [token];
  const mapped = synonyms[token];
  if (!mapped) return out;
  const list = Array.isArray(mapped) ? mapped : [mapped];
  for (const entry of list) {
    for (const w of wordsOf(entry)) {
      if (w !== token && !out.includes(w)) out.push(w);
    }
  }
  return out;
}

function isFuzzyMatch(a: string, b: string): boolean {
  if (a === b) return true;
  const lenA = a.length;
  const lenB = b.length;
  if (Math.abs(lenA - lenB) > 1) return false;
  if (lenA < 3 || lenB < 3) return false;
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < lenA && j < lenB) {
    if (a[i] === b[j]) {
      i += 1;
      j += 1;
    } else {
      edits += 1;
      if (edits > 1) return false;
      if (lenA === lenB) {
        i += 1;
        j += 1;
      } else if (lenA > lenB) {
        i += 1;
      } else {
        j += 1;
      }
    }
  }
  edits += lenA - i + (lenB - j);
  return edits <= 1;
}

function wordsOf(text: string): string[] {
  return normalizeWord(text).split(/\s+/).filter(Boolean);
}

export function CommandPalette({
  open,
  onOpenChange,
  items = [],
  placeholder = "Type a command or search tickets...",
  synonyms = EMPTY_SYNONYMS,
}: CommandPaletteProps) {
  const [search, setSearch] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const MAX_RESULTS = 60;

  const { filteredItems, totalMatches } = React.useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return { filteredItems: items.slice(0, MAX_RESULTS), totalMatches: items.length };
    }
    const tokens = wordsOf(query);
    const scored: { item: CommandItem; score: number }[] = [];
    for (const item of items) {
      const labelWords = wordsOf(item.label);
      const labelFlat = labelWords.join(" ");
      const labelSmushed = labelWords.join("");
      const categoryWords = wordsOf(item.category ?? "");
      const hintWords = wordsOf(item.hint ?? "");
      const keywordWords = (item.keywords ?? []).flatMap(wordsOf);
      const keywordSmushed = keywordWords.join("");
      let score = 0;
      let missed = false;
      for (const rawToken of tokens) {
        const variants = expandToken(rawToken, synonyms);
        const tokenSmushed = rawToken.replace(/\s+/g, "");
        let tokenScore = 0;
        const hit = (words: string[], exact: number, prefix: number, sub: number, fuzzy: number) => {
          for (const w of words) {
            for (const v of variants) {
              if (w === v) tokenScore = Math.max(tokenScore, exact);
              else if (w.startsWith(v)) tokenScore = Math.max(tokenScore, prefix);
              else if (w.includes(v)) tokenScore = Math.max(tokenScore, sub);
              else if (isFuzzyMatch(w, v)) tokenScore = Math.max(tokenScore, fuzzy);
            }
          }
        };
        hit(labelWords, 120, 100, 50, 70);
        hit(keywordWords, 60, 40, 20, 30);
        hit(categoryWords, 20, 10, 5, 8);
        hit(hintWords, 10, 5, 2, 4);
        if (tokenSmushed.length >= 4) {
          if (labelSmushed.includes(tokenSmushed)) tokenScore = Math.max(tokenScore, 80);
          else if (keywordSmushed.includes(tokenSmushed)) tokenScore = Math.max(tokenScore, 35);
        }
        if (labelFlat.startsWith(tokens.join(" "))) tokenScore += 30;
        if (tokenScore === 0) {
          missed = true;
          break;
        }
        score += tokenScore;
      }
      if (!missed && score > 0) scored.push({ item, score });
    }
    scored.sort((a, b) => b.score - a.score);
    return {
      filteredItems: scored.slice(0, MAX_RESULTS).map((entry) => entry.item),
      totalMatches: scored.length,
    };
  }, [items, search, synonyms]);

  const panelRef = React.useRef<HTMLDivElement>(null);
  const returnFocusRef = React.useRef<HTMLElement | null>(null);
  const onOpenChangeRef = React.useRef(onOpenChange);
  const listId = React.useId();

  React.useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  });

  const activeIndex = filteredItems.length === 0 ? 0 : Math.min(selectedIndex, filteredItems.length - 1);

  React.useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const focusTimer = setTimeout(() => {
      setSearch("");
      setSelectedIndex(0);
      inputRef.current?.focus();
    }, 0);
    const releaseScroll = lockBodyScroll();
    const releaseEscape = registerEscapeLayer(() => {
      onOpenChangeRef.current?.(false);
    });
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab" && panelRef.current) {
        if (!panelRef.current.contains(document.activeElement)) {
          e.preventDefault();
          const first = getFocusable(panelRef.current)[0];
          (inputRef.current ?? first)?.focus();
          return;
        }
        trapFocus(panelRef.current, e);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      releaseEscape();
      releaseScroll();
      returnFocusRef.current?.focus();
    };
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === "Enter" && filteredItems[activeIndex]) {
      e.preventDefault();
      filteredItems[activeIndex].onSelect?.();
      onOpenChangeRef.current?.(false);
    }
  };

  if (!open) return null;

  const overlay = (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-hidden overscroll-contain pt-20 sm:pt-28">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => onOpenChangeRef.current?.(false)}
        className="fixed inset-0 bg-foreground/50 backdrop-blur-[2px] overscroll-contain animate-[fade-in_0.15s_ease-out_both] motion-reduce:animate-none!"
      />

      {/* Palette Card */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative z-50 w-full max-w-xl overflow-hidden overscroll-contain rounded-xl border-2 border-foreground bg-card shadow-2xl outline-1 outline-dashed outline-offset-[-6px] animate-[scale-in_0.15s_ease-out_both] motion-reduce:animate-none!"
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
            className="text-muted-foreground me-3 shrink-0"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            inputMode="search"
            enterKeyHint="search"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            autoComplete="off"
            role="combobox"
            aria-expanded={filteredItems.length > 0}
            aria-controls={listId}
            aria-activedescendant={
              filteredItems[activeIndex] ? `${listId}-item-${filteredItems[activeIndex].id}` : undefined
            }
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full rounded-sm bg-transparent font-mono text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:text-sm"
          />
          <span className="font-mono text-[10px] text-muted-foreground uppercase border border-border px-1.5 py-0.5 rounded-sm">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div id={listId} role="listbox" aria-label="Search results" className="max-h-72 overflow-y-auto overscroll-contain p-2">
          {filteredItems.length === 0 ? (
            <div className="py-6 text-center font-mono text-xs text-muted-foreground">
              NO COMMANDS MATCHING QUERY
            </div>
          ) : (
            (() => {
              const rows: React.ReactNode[] = [];
              let lastCategory: string | undefined;
              let flatIndex = 0;
              let groupCount = 0;
              for (const item of filteredItems) {
                const group = item.category ?? "Results";
                if (group !== lastCategory) {
                  lastCategory = group;
                  groupCount += 1;
                  rows.push(
                    <div
                      key={`group-${groupCount}-${group}`}
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
                    id={`${listId}-item-${item.id}`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      item.onSelect?.();
                      onOpenChangeRef.current?.(false);
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={cn(
                      "flex cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2.5 font-mono text-xs transition-colors select-none sm:py-2",
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
                            isSelected ? "text-accent-foreground" : "text-muted-foreground"
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
                          isSelected ? "text-accent-foreground" : "text-muted-foreground"
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

  return typeof document !== "undefined" ? createPortal(overlay, document.body) : overlay;
}
