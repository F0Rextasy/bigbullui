import * as React from "react";
import { cn } from "./lib/utils";

export interface QuoteProps {
  children?: React.ReactNode;
  cite?: string;
  author?: string;
}

export function Quote({
  children,
  cite,
  author,
}: QuoteProps) {
  const citeClasses = "mt-2 text-sm font-mono text-uppercase text-muted-foreground";

  return (
    <blockquote
      className={cn(
        "border-l-2 border-dashed border-border/60 pl-4 my-2",
        "motion-reduce:transition-none",
        "animate-[stamp_0.4s_ease-out_both]"
      )}
    >
      <p className="text-lg line-clamp-3">
        {children}
      </p>
      <div className="mt-3">
        {cite && (
          <cite className={cn(citeClasses, "block")}>
            {cite}
          </cite>
        )}
        {author && (
          <p className={citeClasses}>
            {author}
          </p>
        )}
      </div>
    </blockquote>
  );
}
/* Decorative quote mark stamp is implied by the stamp animation on mount */
/* The oversized decorative quote mark can be rendered via absolute-positioned pseudo-element if desired */