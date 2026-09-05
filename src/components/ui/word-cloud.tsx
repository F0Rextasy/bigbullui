"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface WordEntry {
  word: string;
  weight: number;
}

export interface WordCloudProps extends React.HTMLAttributes<HTMLDivElement> {
  words: WordEntry[];
  maxFontSize?: number;
  minFontSize?: number;
  onWordClick?: (word: string) => void;
}

/** Kelime bulutu: ağırlığa göre boyut, hover renk değişimi. */
export function WordCloud({ words, maxFontSize = 28, minFontSize = 11, onWordClick, className, ...props }: WordCloudProps) {
  const max = Math.max(...words.map((w) => w.weight), 1);
  const min = Math.min(...words.map((w) => w.weight), 0);
  const range = max - min || 1;

  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-x-3 gap-y-1 p-4", className)} {...props}>
      <style>{`@keyframes wcIn { from { opacity: 0; transform: scale(0.6); } to { opacity: 1; transform: scale(1); } }`}</style>
      {words.map((w, idx) => {
        const t = (w.weight - min) / range;
        const size = Math.round(minFontSize + t * (maxFontSize - minFontSize));
        return (
          <button
            key={w.word}
            onClick={() => onWordClick?.(w.word)}
            className="font-mono font-bold transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
            style={{
              fontSize: `${size}px`,
              opacity: 0.45 + t * 0.55,
              animation: `wcIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both`,
              animationDelay: `${idx * 40}ms`,
            }}
            aria-label={`${w.word} (${w.weight})`}
          >
            <span className="hover:text-accent">{w.word}</span>
          </button>
        );
      })}
    </div>
  );
}
