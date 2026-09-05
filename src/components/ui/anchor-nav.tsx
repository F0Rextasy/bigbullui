"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface AnchorNavItem {
  id: string;
  label: string;
}

export interface AnchorNavProps extends React.HTMLAttributes<HTMLElement> {
  items: AnchorNavItem[];
  /** Active section tracking via IntersectionObserver */
  activeId?: string;
}

/** Fixed section anchor links: vertical line + active indicator dot. */
export function AnchorNav({ items, activeId, className, ...props }: AnchorNavProps) {
  const [internal, setInternal] = React.useState(items[0]?.id);
  const active = activeId ?? internal;

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setInternal(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  const activeIdx = items.findIndex((i) => i.id === active);

  return (
    <nav className={cn("relative flex flex-col gap-1 pl-4", className)} aria-label="Section links" {...props}>
      {/* Vertical track */}
      <span className="absolute left-[5px] top-1 bottom-1 w-0.5 rounded-full bg-border/50" aria-hidden="true" />
      {/* Moving indicator dot */}
      {activeIdx >= 0 && (
        <span
          className="absolute left-[3px] w-1 rounded-full bg-accent transition-all duration-300 motion-reduce:transition-none"
          style={{ top: `${8 + activeIdx * 30}px`, height: `${items[activeIdx] ? 22 : 0}px` }}
          aria-hidden="true"
        />
      )}
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => { e.preventDefault(); setInternal(item.id); document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" }); }}
          className={cn(
            "relative z-10 py-1 pl-3 text-xs transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm",
            active === item.id ? "font-medium text-accent" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
