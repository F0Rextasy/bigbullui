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

// Keyframe for progress bar fill
const progressKeyframe = `
  @keyframes storyProgress {
    from { stroke-dashoffset: 0; }
    to { stroke-dashoffset: ${44 - 44 * 0.25}; }
  }
`;

const StoryViewer: React.FC<StoryViewerProps> = ({ stories, duration = STORY_DURATION }) => {
  return (
    <div className="relative">
      {/* Story ring */}
      <div
        className={cn(
          "relative inline-flex rounded-full border border-border bg-card p-1",
          "motion-reduce:transition-none"
        )}
      >
        {/* Progress bar track */}
        <svg
          className="relative w-20 h-20"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="8"
            stroke="var(--border)"
            strokeWidth="1"
            fill="none"
          />
          <circle
            id="story-progress"
            cx="12"
            cy="12"
            r="8"
            stroke="var(--accent)"
            strokeWidth="2"
            fill="none"
            style={{
              strokeDasharray: 50,
              strokeDashoffset: 0,
              animation: `${progressKeyframe} ${duration / 1000}s linear infinite`,
            }}
          />
        </svg>

        {/* Story avatars */}
        <div className="relative flex items-center gap-1">
          {stories.map((story, idx) => (
            <div
              key={story.id}
              className={cn(
                "relative w-8 h-8 rounded-full bg-border/20 flex items-center justify-center text-[10px] mono uppercase text-muted-foreground",
                "motion-reduce:animate-none"
              )}
            >
              <span className="line-clamp-1">{story.initials}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Full overlay panel when stories are clicked */}
      <div
        className="absolute inset-0 hidden"
        onClick={() => {}}
      >
        {/* Progress bars top - segments fill sequentially */}
        <div className="absolute top-0 left-0 right-0 h-px bg-border/50">
          {[...Array(stories.length)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-px bg-accent transition-all duration-500",
                "motion-reduce:transition-none",
                              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { StoryViewer };