"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ScrollSpyV2Props extends React.HTMLAttributes<HTMLElement> {
  sections: { id: string; label: string }[];
}

/** Horizontal scroll-spy nav v2: sliding active indicator pill. */
export function ScrollSpyV2({ sections, className, ...props }: ScrollSpyV2Props) {
  const [active, setActive] = React.useState(sections[0]?.id);
  const listRef = React.useRef<HTMLUListElement>(null);
  const itemRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  React.useLayoutEffect(() => {
    const btn = itemRefs.current[active];
    const list = listRef.current;
    if (btn && list) {
      list.scrollTo({ left: btn.offsetLeft - list.clientWidth / 2 + btn.clientWidth / 2, behavior: "smooth" });
    }
  }, [active]);

  return (
    <nav className={cn("w-full border-b border-border", className)} aria-label="Sections" {...props}>
      <ul ref={listRef} className="flex gap-1 overflow-x-auto px-2" style={{ scrollbarWidth: "none" }}>
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id} className="relative shrink-0">
              <button
                ref={(el) => { itemRefs.current[s.id] = el; }}
                onClick={() => { setActive(s.id); document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" }); }}
                className={cn(
                  "px-3 py-2 text-xs transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-t-sm",
                  isActive ? "font-medium text-accent" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {s.label}
              </button>
              {isActive && <span className="absolute inset-x-1 -bottom-px h-0.5 rounded-full bg-accent animate-[fade-in_0.2s_ease-out] motion-reduce:animate-none" aria-hidden="true" />}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
