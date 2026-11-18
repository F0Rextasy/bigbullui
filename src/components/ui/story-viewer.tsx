"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface Story {
  id: string;
  author: string;
  initials: string;
  body?: string;
}

export interface StoryViewerProps {
  stories: Story[];
  duration?: number;
}

const STORY_DURATION = 3000;

const StoryViewer: React.FC<StoryViewerProps> = ({ stories = [], duration = STORY_DURATION }) => {
  const [activeIdx, setActiveIdx] = React.useState<number | null>(null);
  const [paused, setPaused] = React.useState(false);
  const progressId = React.useId();

  React.useEffect(() => {
    if (activeIdx === null || paused || stories.length === 0) return;
    const timer = setTimeout(() => {
      setActiveIdx((prev) => {
        if (prev === null) return null;
        return prev + 1 < stories.length ? prev + 1 : null;
      });
    }, Math.max(500, duration));
    return () => clearTimeout(timer);
  }, [activeIdx, paused, stories.length, duration]);

  const activeStory = activeIdx !== null ? stories[activeIdx] : null;
  const radius = 8;
  const circumference = 2 * Math.PI * radius;
  const progressFraction =
    activeIdx !== null && stories.length > 0 ? (activeIdx + 1) / stories.length : 0.25;

  return (
    <div className="relative inline-block">
      {/* Story ring */}
      <div
        className={cn(
          "relative inline-flex items-center gap-2 rounded-full border border-border bg-card p-1.5",
          "motion-reduce:transition-none"
        )}
      >
        <svg className="h-10 w-10 shrink-0 -rotate-90" viewBox="0 0 24 24" aria-hidden="true">
          <circle
            cx="12"
            cy="12"
            r={radius}
            stroke="var(--border)"
            strokeWidth="2"
            fill="none"
          />
          <circle
            id={progressId}
            className="transition-[stroke-dashoffset] duration-300 motion-reduce:transition-none"
            cx="12"
            cy="12"
            r={radius}
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progressFraction)}
          />
        </svg>

        {/* Story avatars */}
        <div className="flex items-center gap-1.5">
          {stories.map((story, idx) => (
            <button
              key={story.id}
              type="button"
              onClick={() => {
                setPaused(false);
                setActiveIdx(idx);
              }}
              aria-label={`View story from ${story.author}`}
              aria-pressed={activeIdx === idx}
              className={cn(
                "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border text-[10px] font-mono uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                activeIdx === idx
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-secondary text-foreground hover:border-foreground/50"
              )}
            >
              <span className="line-clamp-1">{story.initials}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Expanded story viewer card */}
      {activeStory ? (
        <div
          role="region"
          aria-label={`Story by ${activeStory.author}`}
          className="mt-2 w-72 rounded-lg border border-border bg-card p-3 shadow-md"
        >
          <div className="mb-2 flex gap-1">
            {stories.map((s, i) => (
              <div
                key={s.id}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors motion-reduce:transition-none",
                  i <= (activeIdx ?? 0) ? "bg-accent" : "bg-border"
                )}
              />
            ))}
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-xs font-bold text-foreground">{activeStory.author}</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveIdx((i) => (i !== null && i > 0 ? i - 1 : i))}
                disabled={activeIdx === 0}
                aria-label="Previous story"
                className="cursor-pointer rounded px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground hover:bg-secondary disabled:opacity-40"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className="cursor-pointer rounded px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground hover:bg-secondary"
              >
                {paused ? "Play" : "Pause"}
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveIdx((i) =>
                    i !== null && i + 1 < stories.length ? i + 1 : null
                  )
                }
                aria-label="Next story"
                className="cursor-pointer rounded px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground hover:bg-secondary"
              >
                Next
              </button>
              <button
                type="button"
                onClick={() => setActiveIdx(null)}
                aria-label="Close story"
                className="cursor-pointer rounded px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground hover:bg-secondary"
              >
                ✕
              </button>
            </div>
          </div>
          {activeStory.body ? (
            <p className="mt-2 text-xs text-muted-foreground">{activeStory.body}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export { StoryViewer };