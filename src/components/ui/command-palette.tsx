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

const SYNONYMS: Record<string, string> = {
  buton: "button",
  düğme: "button",
  kart: "card",
  bilet: "ticket",
  stub: "ticket",
  tablo: "table",
  giriş: "input",
  giris: "input",
  yükle: "upload",
  yukle: "upload",
  dosya: "file",
  resim: "image",
  fotograf: "image",
  ses: "audio",
  ileti: "message",
  mesaj: "message",
  sayfa: "page",
  menü: "menu",
  menu: "menu",
  arama: "search",
  grafik: "chart",
  liste: "list",
  takvim: "calendar",
  saat: "clock",
  tarih: "date",
  fiyat: "price",
  odeme: "payment",
  ödeme: "payment",
  kullanici: "user",
  kullanıcı: "user",
  ayarlar: "settings",
  bildirim: "notification",
  sifre: "password",
  şifre: "password",
  modal: "dialog",
  pencere: "dialog",
  sekme: "tabs",
  rozet: "badge",
  onay: "confirm",
  formlar: "form",
  ticket: "bilet",
  card: "kart",
  ticketcard: "ticket card",
  button: "buton",
  table: "tablo",
  search: "arama",
  chart: "grafik",
  dialog: "modal",
  user: "kullanici",
  file: "dosya",
  image: "resim",
};

function normalizeWord(word: string): string {
  return word
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ı/g, "i")
    .replace(/[-_]+/g, " ")
    .trim();
}

function expandToken(token: string): string[] {
  const out = [token];
  const mapped = SYNONYMS[token];
  if (mapped && mapped !== token) {
    for (const w of wordsOf(mapped)) {
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
  items,
  placeholder = "Type a command or search tickets...",
}: CommandPaletteProps) {
  const [search, setSearch] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const MAX_RESULTS = 60;

  function scoreItem(item: CommandItem, tokens: string[]): number {
    const labelWords = wordsOf(item.label);
    const labelFlat = labelWords.join(" ");
    const labelSmushed = labelWords.join("");
    const categoryWords = wordsOf(item.category ?? "");
    const hintWords = wordsOf(item.hint ?? "");
    const keywordWords = (item.keywords ?? []).flatMap(wordsOf);
    const keywordSmushed = keywordWords.join("");
    let score = 0;
    for (const rawToken of tokens) {
      const variants = expandToken(rawToken);
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
      if (tokenScore === 0) return 0;
      score += tokenScore;
    }
    return score;
  }

  const filteredItems = React.useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return items.slice(0, MAX_RESULTS);
    const tokens = wordsOf(query);
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
    const tokens = wordsOf(query);
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
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onOpenChange(false);
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = prevOverflow;
      };
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
        className="fixed inset-0 bg-black/50 backdrop-blur-[2px] animate-[fade-in_0.15s_ease-out_both] motion-reduce:animate-none"
      />

      {/* Palette Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative z-50 w-full max-w-xl overflow-hidden rounded-xl border-2 border-foreground bg-card shadow-2xl outline-1 outline-dashed outline-offset-[-6px] animate-[scale-in_0.15s_ease-out_both] motion-reduce:animate-none"
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
            inputMode="search"
            enterKeyHint="search"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            autoComplete="off"
            role="combobox"
            aria-expanded={filteredItems.length > 0}
            aria-controls="command-palette-list"
            aria-activedescendant={
              filteredItems[selectedIndex] ? `cmd-item-${filteredItems[selectedIndex].id}` : undefined
            }
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full bg-transparent font-mono text-base text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-sm"
          />
          <span className="font-mono text-[10px] text-muted-foreground uppercase border border-border px-1.5 py-0.5 rounded-sm">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div id="command-palette-list" role="listbox" aria-label="Search results" className="max-h-72 overflow-y-auto p-2">
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
                    id={`cmd-item-${item.id}`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      item.onSelect?.();
                      onOpenChange(false);
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
