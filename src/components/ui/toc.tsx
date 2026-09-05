"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface TocProps {
  headings: TocHeading[];
  className?: string;
}

export function Toc({ headings, className }: TocProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Track visible sections via IntersectionObserver
  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveIndex(headings.indexOf(heading));
              }
            });
          },
          { rootMargin: "-40% 0px" }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [headings]);

  return (
    <nav className={cn("space-y-1", className)}>
      {headings.map((heading, index) => {
        const isActive = index === activeIndex;
        const levelClass = heading.level === 2 ? "text-lg" : "text-base";
        const indent = heading.level === 3 ? "pl-3" : "";

        return (
          <button
            key={heading.id}
            className={cn(
              "whitespace-nowrap select-none",
              indent,
              levelClass,
              "text-muted-foreground hover:text-foreground transition-colors",
              isActive && "relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-accent after:dashed after:border-0 after:border-border/60 after:transition-all after:duration-300 ease-out after:top-0 after:pointer-events-none after:select-none after:animate-[slide-in_top_0.3s_ease-out_both]",
              isActive && "text-foreground"
            )}
            onClick={() => setActiveIndex(index)}
            aria-disabled={isActive}
            role="button"
          >
            {heading.text}
          </button>
        );
      })}
    </nav>
  );
}