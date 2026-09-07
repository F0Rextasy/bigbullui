"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SitemapGroup {
  title: string;
  links: string[];
}

export interface SitemapListProps extends React.HTMLAttributes<HTMLDivElement> {
  groups?: SitemapGroup[];
}

/** Sitemap list: grouped link columns with counts. */
export function SitemapList({
  groups = [
    { title: "Visit", links: ["Shows", "Venues", "Season passes"] },
    { title: "Support", links: ["Help desk", "Refunds", "Contact"] },
    { title: "Company", links: ["About", "Careers", "Press"] },
  ],
  className,
  ...props
}: SitemapListProps) {
  return (
    <nav aria-label="Sitemap" className={cn("grid w-full max-w-xl grid-cols-2 gap-4 rounded-lg border-2 border-foreground bg-card p-5 sm:grid-cols-3", className)} {...props}>
      {groups.map((g) => (
        <div key={g.title}>
          <p className="border-b-2 border-dashed border-border pb-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {g.title} · {g.links.length}
          </p>
          <ul className="mt-2 space-y-1">
            {g.links.map((l) => (
              <li key={l}>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-xs font-bold transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
