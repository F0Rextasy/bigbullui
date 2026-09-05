import * as React from "react";
import { cn } from "./lib/utils";

export type HighlightTextProps = {
  text: string;
  query: string;
};

const highlightKeyframes = `
  @keyframes highlightIn {
    from { background-size: 0% 100%; }
    to { background-size: 100% 100%; }
  }
`;

const HighlightText = ({ text, query }: HighlightTextProps) => {
  if (!query) {
    return (
      <div
        className={cn(
          "font-mono text-sm",
          "animate-[fade-in-up_0.3s_ease-out_both]",
          "motion-reduce:animate-none"
        )}
      >
        {text}
      </div>
    );
  }

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escapedQuery, "gi");
  const parts: (string | RegExpMatchArray)[] = [];
  let lastIndex = 0;

  let match: RegExpMatchArray | null;
  while ((match = regex.exec(text)) !== null) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      parts.push(text.substring(lastIndex, index));
    }
    parts.push(match);
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return (
    <div
      className={cn(
        "font-mono text-sm relative",
        "animate-[fade-in-up_0.3s_ease-out_both]",
        "motion-reduce:animate-none"
      )}
    >
      <style>{highlightKeyframes}</style>
      {parts.map((part, i) => {
        if (typeof part === "string") {
          return (
            <span key={i} className="relative">
              {part}
            </span>
          );
        }
        const [matched] = part;

        return (
          <span
            key={i}
            className={cn(
              "bg-accent/10 text-accent-foreground rounded px-1.5",
              "animate-highlightIn 0.3s ease-out"
            )}
          >
            {matched}
          </span>
        );
      })}
    </div>
  );
};

export { HighlightText };
