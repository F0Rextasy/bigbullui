"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface TocProps extends React.HTMLAttributes<HTMLElement> {
  headings?: TocHeading[];
  onSelectHeading?: (id: string) => void;
}

export const Toc = React.forwardRef<HTMLElement, TocProps>(function Toc(
  { headings = [], onSelectHeading, className, "aria-label": ariaLabel = "Table of contents", ...props },
  ref,
) {
  const [activeId, setActiveId] = React.useState<string | null>(headings[0]?.id ?? null);

  React.useEffect(() => {
    if (typeof IntersectionObserver === "undefined" || headings.length === 0) return;

    const indexById = new Map(headings.map((h, i) => [h.id, i]));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => (indexById.get(a.target.id) ?? 0) - (indexById.get(b.target.id) ?? 0));
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );

    for (const heading of headings) {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [headings]);

  const handleSelect = (heading: TocHeading) => {
    setActiveId(heading.id);
    onSelectHeading?.(heading.id);
    const target = typeof document !== "undefined" ? document.getElementById(heading.id) : null;
    if (target) {
      const reduced =
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }
  };

  const resolvedActiveId = activeId ?? headings[0]?.id ?? null;

  return (
    <nav ref={ref} aria-label={ariaLabel} className={cn("flex flex-col items-start gap-1", className)} {...props}>
      {headings.map((heading) => {
        const isActive = heading.id === resolvedActiveId;
        const levelClass = heading.level === 2 ? "text-sm font-medium" : "text-xs";
        const indent = heading.level === 3 ? "ps-3" : "";

        return (
          <button
            type="button"
            key={heading.id}
            onClick={() => handleSelect(heading)}
            aria-current={isActive ? "location" : undefined}
            className={cn(
              "relative cursor-pointer rounded-sm py-1 text-start transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              indent,
              levelClass,
              isActive
                ? "font-semibold text-foreground after:absolute after:bottom-0 after:start-0 after:h-0.5 after:w-full after:border-b-2 after:border-dashed after:border-accent after:content-[''] motion-safe:after:animate-[slide-in_0.25s_ease-out_both] motion-reduce:after:animate-none"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {heading.text}
          </button>
        );
      })}
    </nav>
  );
});
Toc.displayName = "Toc";
