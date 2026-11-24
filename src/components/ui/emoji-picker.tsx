"use client";

import * as React from "react";
import { cn } from "./lib/utils";
import { useLocalStorage } from "./lib/hooks";

export interface EmojiEntry {
  char: string;
  name: string;
  keywords: string;
}

const EMOJI_CATEGORIES = {
  smileys: [
    { char: "😀", name: "Grinning face", keywords: "smile happy grin" },
    { char: "😁", name: "Beaming face", keywords: "smile teeth happy" },
    { char: "😂", name: "Tears of joy", keywords: "laugh cry lol funny" },
    { char: "🤣", name: "Rolling laughing", keywords: "rofl laugh funny" },
    { char: "😃", name: "Big smile", keywords: "happy smile joy" },
    { char: "😄", name: "Smiling eyes", keywords: "smile happy glad" },
    { char: "😆", name: "Squinting laugh", keywords: "laugh haha" },
    { char: "😅", name: "Sweat smile", keywords: "nervous relief smile" },
    { char: "😊", name: "Blushing smile", keywords: "warm blush happy" },
  ],
  gestures: [
    { char: "👍", name: "Thumbs up", keywords: "approve yes like ok" },
    { char: "👎", name: "Thumbs down", keywords: "dislike no bad" },
    { char: "👋", name: "Waving hand", keywords: "hello hi bye wave" },
    { char: "🤝", name: "Handshake", keywords: "deal agree partner" },
    { char: "🙏", name: "Folded hands", keywords: "thanks please pray" },
    { char: "✊", name: "Raised fist", keywords: "power solidarity" },
    { char: "👊", name: "Fist bump", keywords: "punch bump" },
    { char: "🤘", name: "Sign of horns", keywords: "rock music" },
    { char: "🤙", name: "Call me hand", keywords: "hang loose call" },
    { char: "💪", name: "Flexed biceps", keywords: "strong muscle win" },
  ],
  hearts: [
    { char: "❤️", name: "Red heart", keywords: "love heart like" },
    { char: "🧡", name: "Orange heart", keywords: "love warm heart" },
    { char: "💛", name: "Yellow heart", keywords: "love gold heart" },
    { char: "💚", name: "Green heart", keywords: "love nature heart" },
    { char: "💙", name: "Blue heart", keywords: "love trust heart" },
    { char: "💜", name: "Purple heart", keywords: "love royal heart" },
    { char: "🖤", name: "Black heart", keywords: "love dark heart" },
    { char: "🤍", name: "White heart", keywords: "love pure heart" },
    { char: "💔", name: "Broken heart", keywords: "sad heartbreak" },
    { char: "❣️", name: "Heart exclamation", keywords: "love emphasis" },
  ],
  objects: [
    { char: "💻", name: "Laptop", keywords: "code computer dev" },
    { char: "📱", name: "Mobile phone", keywords: "phone smartphone app" },
    { char: "💾", name: "Floppy disk", keywords: "save disk retro" },
    { char: "🎮", name: "Game controller", keywords: "play game console" },
    { char: "📚", name: "Books", keywords: "docs read study" },
    { char: "🎨", name: "Artist palette", keywords: "design art theme" },
    { char: "🎵", name: "Musical note", keywords: "music audio sound" },
    { char: "📸", name: "Camera flash", keywords: "photo image snap" },
    { char: "🎤", name: "Microphone", keywords: "voice stage audio" },
    { char: "🎟️", name: "Admission ticket", keywords: "ticket stub pass event" },
  ],
} as const;

export type EmojiCategoryKey = keyof typeof EMOJI_CATEGORIES;

export interface EmojiPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  onSelect?: (emoji: string) => void;
  initialCategory?: string;
}

const RECENT_STORAGE_KEY = "bigbullui-recent-emojis";

export const EmojiPicker = React.forwardRef<HTMLDivElement, EmojiPickerProps>(function EmojiPicker(
  { onSelect, initialCategory = "smileys", className, ...props },
  ref,
) {
  const safeInitial: EmojiCategoryKey =
    initialCategory in EMOJI_CATEGORIES ? (initialCategory as EmojiCategoryKey) : "smileys";
  const [category, setCategory] = React.useState<EmojiCategoryKey>(safeInitial);
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState("");
  const [recent, setRecent] = useLocalStorage<string[]>(RECENT_STORAGE_KEY, []);

  const query = search.trim().toLowerCase();
  const list = query
    ? Object.values(EMOJI_CATEGORIES).flat()
    : EMOJI_CATEGORIES[category];

  const filteredEmojis = list.filter((item) => {
    if (!query) return true;
    return (
      item.char.includes(query) ||
      item.name.toLowerCase().includes(query) ||
      item.keywords.toLowerCase().includes(query)
    );
  });

  const handlePick = (char: string) => {
    setSelected(char);
    setRecent((prev) => [char, ...prev.filter((c) => c !== char)].slice(0, 8));
    onSelect?.(char);
  };

  return (
    <div
      ref={ref}
      className={cn("w-full max-w-xs rounded-lg border border-border bg-card p-3", className)}
      {...props}
    >
      {/* Category tabs */}
      <div className="mb-2.5 flex flex-wrap gap-1" role="tablist" aria-label="Emoji categories">
        {(Object.keys(EMOJI_CATEGORIES) as EmojiCategoryKey[]).map((cat) => (
          <button
            type="button"
            role="tab"
            aria-selected={cat === category && !query}
            key={cat}
            onClick={() => {
              setCategory(cat);
              setSearch("");
            }}
            className={cn(
              "rounded-md px-2 py-1 font-mono text-[10px] uppercase text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              cat === category && !query && "bg-accent text-accent-foreground",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search filter */}
      <div className="mb-2.5">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search emoji (e.g. smile, heart)..."
          aria-label="Search emoji"
          className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      {/* Emoji grid */}
      <div className="flex min-h-16 flex-wrap gap-1">
        {filteredEmojis.length > 0 ? (
          filteredEmojis.map((item) => (
            <button
              type="button"
              key={item.char}
              title={item.name}
              aria-label={item.name}
              aria-pressed={selected === item.char}
              onClick={() => handlePick(item.char)}
              className={cn(
                "rounded-md px-2 py-1 text-base transition-colors duration-150 hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selected === item.char && "bg-accent/20 ring-1 ring-accent",
              )}
            >
              {item.char}
            </button>
          ))
        ) : (
          <p className="py-2 font-mono text-xs text-muted-foreground">No matching emojis</p>
        )}
      </div>

      {/* Recent row */}
      <div className="mt-2.5 border-t border-border/50 pt-2">
        <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Recent
        </span>
        {recent.length > 0 ? (
          <div className="mt-1 flex flex-wrap gap-1">
            {recent.map((char) => (
              <button
                type="button"
                key={`recent-${char}`}
                aria-label={`Recent emoji ${char}`}
                onClick={() => handlePick(char)}
                className="rounded-md px-1.5 py-0.5 text-sm transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {char}
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-1 font-mono text-[11px] text-muted-foreground">No recent picks</p>
        )}
      </div>
    </div>
  );
});
EmojiPicker.displayName = "EmojiPicker";
