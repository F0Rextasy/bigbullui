"use client";

import * as React from "react";
import { cn } from "./lib/utils";

const ShareMenu: React.FC<{ onCopy?: () => void }> = ({ onCopy }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard && navigator.clipboard.writeText("https://bigbullui.com");
    setCopied(true);
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  };

  return (
    <div className="relative inline-flex items-center gap-2">
      <button
        aria-label="Share"
        className="relative flex-0 rounded-md bg-card p-2 border border-border hover:bg-accent/5 hover:text-accent-foreground transition-colors duration-200"
      >
        {/* Share SVG */}
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="18" y1="10" x2="18" y2="14" />
          <line x1="6" y1="10" x2="6" y2="14" />
        </svg>
      </button>

      {copied && (
        <span
          className="absolute -top-1 -right-1 text-[8px] mono uppercase text-accent-strong animate-[stamp_0.4s_ease-out_both]"
        >
          COPIED
        </span>
      )}

      {/* Platform icons with staggered animation */}
      <div
        className={cn(
          "absolute right-0 w-10 origin-top-right rounded-md bg-card border border-border p-1 shadow-md",
          "motion-reduce:animate-none"
        )}
        style={{
          animationName: "scale-in",
          animationDuration: "0.15s",
          animationTimingFunction: "ease-out",
          animationFillMode: "both",
        }}
      >
        <button
          className="flex flex-col items-center rounded-md p-1 hover:bg-accent/5 transition-colors duration-150"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M18 13v3a2 2 0 0 0 2 2h3m0 0v-3a2 2 0 0 0-2-2h-3m3.5-1.5c0 .21-.02.43-.05.64a4.6 4.6 0 0 1-.5 1.2 4.6 4.6 0 0 1-1.2.5 4.6 4.6 0 0 1-1.2-.5 4.6 4.6 0 0 1-.5-1.2c-.03-.21-.05-.43-.05-.64a2.66 2.66 0 0 0-1.2-1.4 2.66 2.66 0 0 0-1.2 1.4 2.66 2.66 0 0 0 .5 1.2c.03.21.05.43.05.64z" />
          </svg>
          X
        </button>
        <button
          className="flex flex-col items-center rounded-md p-1 hover:bg-accent/5 transition-colors duration-150"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M18 2h-3a2 2 0 0 0-2 2v3m0 0h3a2 2 0 0 0 2-2v-3m0 0V5a2 2 0 0 0-2-2h-3m-5.5.5A5.5 5.5 0 1 1 11 5.5 5.5 5.5 0 0 1 18 2z" />
          </svg>
          Facebook
        </button>
        <button
          className="flex flex-col items-center rounded-md p-1 hover:bg-accent/5 transition-colors duration-150"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <rect x="2" y="2" width="20" height="20" rx="6" ry="6" />
            <path d="M16 8l6 6" />
            <path d="M8 16l6 6" />
          </svg>
          LinkedIn
        </button>
        <button
          className="flex flex-col items-center rounded-md p-1 hover:bg-accent/5 transition-colors duration-150"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
          Link
        </button>
      </div>

      {/* Copy button handler */}
      <button
        onClick={handleCopy}
        className="absolute right-0 top-0 p-1 text-muted-foreground hover:text-accent-foreground transition-colors duration-150"
        aria-label="Copy link"
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="15" x2="22" y2="15" />
        </svg>
      </button>
    </div>
  );
};

export { ShareMenu };