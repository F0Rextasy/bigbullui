"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MentionHighlightProps extends React.HTMLAttributes<HTMLParagraphElement> {
  text: string;
}

/** Metin içinde @bahsetme ve #etiket vurgulama. */
export function MentionHighlight({ text, className, ...props }: MentionHighlightProps) {
  const parts = React.useMemo(
    () => text.split(/(@[A-Za-z0-9_]+|#[A-Za-z0-9_]+)/g),
    [text]
  );

  return (
    <p className={cn("text-sm leading-relaxed", className)} {...props}>
      {parts.map((part, idx) => {
        if (part.startsWith("@")) {
          return (
            <span key={idx} className="rounded-sm bg-accent/10 px-0.5 font-medium text-accent animate-[fade-in_0.2s_ease-out_both] motion-reduce:animate-none">
              {part}
            </span>
          );
        }
        if (part.startsWith("#")) {
          return (
            <span key={idx} className="rounded-sm bg-secondary px-0.5 font-medium text-foreground/80">
              {part}
            </span>
          );
        }
        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </p>
  );
}
