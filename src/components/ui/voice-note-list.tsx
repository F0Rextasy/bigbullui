"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface VoiceNote {
  id: string;
  sender: string;
  duration: string;
  bars: number[];
}

export interface VoiceNoteListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onPlay"> {
  notes: VoiceNote[];
  onPlay?: (id: string) => void;
}

/** Voice note playlist: audio playback + waveform + duration. */
export function VoiceNoteList({ notes, onPlay, className, ...props }: VoiceNoteListProps) {
  const [playing, setPlaying] = React.useState<string | null>(null);

  return (
    <div className={cn("w-full max-w-sm space-y-2", className)} {...props}>
      <style>{`@keyframes vnIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      {notes.map((note, idx) => {
        const isPlaying = playing === note.id;
        return (
          <div
            key={note.id}
            className="flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2.5 animate-[vnIn_0.3s_ease-out_both] motion-reduce:animate-none"
            style={{ animationDelay: `${idx * 55}ms` }}
          >
            <button
              onClick={() => { setPlaying(isPlaying ? null : note.id); if (!isPlaying) onPlay?.(note.id); }}
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-full transition-colors duration-150 motion-reduce:transition-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isPlaying ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent/20"
              )}
              aria-label={`${note.sender} sesli notunu ${isPlaying ? "duraklat" : "oynat"}`}
            >
              {isPlaying ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
              )}
            </button>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium">{note.sender}</p>
              <div className="mt-1 flex h-4 items-end gap-0.5" aria-hidden="true">
                {note.bars.map((h, i) => (
                  <span
                    key={i}
                    className={cn("w-0.5 rounded-full transition-colors duration-150 motion-reduce:transition-none", isPlaying ? "bg-accent" : "bg-border")}
                    style={{ height: `${Math.max(15, h)}%` }}
                  />
                ))}
              </div>
            </div>
            <span className="shrink-0 font-mono text-[10px] tabular-nums text-muted-foreground">{note.duration}</span>
          </div>
        );
      })}
    </div>
  );
}
