"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface VideoResult {
  id: string;
  title: string;
  channel: string;
  duration: string;
  views?: string;
  thumbnail?: string;
}

export interface VideoListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  videos: VideoResult[];
  onSelect?: (id: string) => void;
}

/** Video search results list: thumbnail + duration + channel + views. */
export function VideoList({ videos, onSelect, className, ...props }: VideoListProps) {
  return (
    <div className={cn("w-full max-w-lg space-y-2", className)} {...props}>
      <style>{`@keyframes vlIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      {videos.map((v, idx) => (
        <button
          key={v.id}
          onClick={() => onSelect?.(v.id)}
          className="flex w-full gap-3 rounded-md border border-border bg-card p-2 text-left animate-[vlIn_0.3s_ease-out_both] motion-reduce:animate-none transition-colors hover:border-foreground/30 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{ animationDelay: `${idx * 50}ms` }}
        >
          <span className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-sm bg-secondary">
            {v.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={v.thumbnail} alt="" className="size-full object-cover" loading="lazy" />
            ) : (
              <span className="flex size-full items-center justify-center text-muted-foreground">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>
              </span>
            )}
            <span className="absolute bottom-1 right-1 rounded-sm bg-black/70 px-1 font-mono text-[9px] text-white">{v.duration}</span>
          </span>
          <span className="min-w-0 flex-1 py-0.5">
            <span className="line-clamp-2 text-sm font-medium leading-snug">{v.title}</span>
            <span className="mt-1 block text-xs text-muted-foreground">{v.channel}</span>
            {v.views && <span className="block text-[11px] text-muted-foreground">{v.views} views</span>}
          </span>
        </button>
      ))}
    </div>
  );
}
