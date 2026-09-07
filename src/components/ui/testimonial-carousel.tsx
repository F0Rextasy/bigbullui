"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CarouselQuote {
  quote: string;
  name: string;
}

export interface TestimonialCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  quotes?: CarouselQuote[];
}

/** Testimonial carousel: rotating quotes with dots and arrows. */
export function TestimonialCarousel({
  quotes = [
    { quote: "Gates cleared in minutes, zero drama.", name: "Mara V" },
    { quote: "Our regulars love the paper stubs.", name: "Jon K" },
    { quote: "Refunds took one click. One.", name: "Priya S" },
  ],
  className,
  ...props
}: TestimonialCarouselProps) {
  const [idx, setIdx] = React.useState(0);
  const q = quotes[idx % quotes.length];
  return (
    <div className={cn("w-full max-w-sm rounded-lg border-2 border-foreground bg-card p-5 text-center", className)} {...props}>
      <div key={idx} aria-live="polite">
        <p className="text-sm leading-relaxed">“{q.quote}”</p>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-accent">{q.name}</p>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setIdx((i) => (i - 1 + quotes.length) % quotes.length)}
          aria-label="Previous quote"
          className="size-7 rounded border font-mono transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          ←
        </button>
        <span className="flex gap-1" role="tablist" aria-label="Quotes">
          {quotes.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === idx % quotes.length}
              aria-label={`Quote ${i + 1}`}
              onClick={() => setIdx(i)}
              className={cn("h-1.5 rounded-full transition-all motion-reduce:transition-none", i === idx % quotes.length ? "w-5 bg-accent" : "w-1.5 bg-border hover:bg-foreground/40")}
            />
          ))}
        </span>
        <button
          type="button"
          onClick={() => setIdx((i) => (i + 1) % quotes.length)}
          aria-label="Next quote"
          className="size-7 rounded border font-mono transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          →
        </button>
      </div>
    </div>
  );
}
