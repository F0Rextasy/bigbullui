"use client";

import * as React from "react";
import { cn } from "./lib/utils";

// Deterministic emoji arrays by category
const emojiCategories = {
  smileys: ["😀", "😁", "😂", "🤣", "😃", "😄", "😁", "😆", "😅", "😊"],
  gestures: ["👍", "👎", "👋", "🤝", "🙏", "✊", "👊", "🤘", "🤙", "💪"],
  hearts: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "💔", "❣️"],
  objects: ["💻", "📱", "💾", "🎮", "📚", "🎨", "🎵", "📸", "🎤", "📠"],
};

const EmojiPicker: React.FC<{
  onSelect: (emoji: string) => void;
  initialCategory?: string;
}> = ({ onSelect, initialCategory = "smileys" }) => {
  const [category, setCategory] = React.useState(initialCategory);
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState("");

  const filteredEmojis = emojiCategories[category as keyof typeof emojiCategories]
    .filter((emoji) => emoji.includes(search))
    .map((emoji) => emoji);

  return (
    <div
      className={cn(
        "w-full rounded-lg border border-border bg-card p-4",
        "motion-reduce:animate-none"
      )}
    >
      {/* Category tabs */}
      <div className="flex gap-1 mb-3">
        {Object.keys(emojiCategories).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              "rounded-md px-2 py-1 text-[10px] font-mono uppercase text-muted-foreground",
              cat === category && "bg-accent text-accent-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search filter */}
      <div className="flex gap-2 mb-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search emoji..."
          className="flex-1 rounded-border border-input px-3 py-2 text-sm"
        />
      </div>

      {/* Emoji grid */}
      <div className="flex flex-wrap gap-1">
        {filteredEmojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => {
              setSelected(emoji);
              onSelect(emoji);
            }}
            className={cn(
              "rounded-md px-2 py-1 text-[12px]",
              "hover:bg-accent/5 hover:text-accent-foreground transition-colors duration-150",
              "motion-reduce:animate-none"
            )}
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Recent row (placeholder - could store in localStorage) */}
      <div className="mt-3 pt-3 border-t border-border/30 text-[10px] mono uppercase text-muted-foreground">
        Recent
      </div>
    </div>
  );
};

export { EmojiPicker };