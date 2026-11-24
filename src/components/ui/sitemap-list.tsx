"use client";

import * as React from "react";
import { cn, isSafeUrl } from "./lib/utils";

export type SitemapLinkItem = string | { label: string; href: string };

export interface SitemapGroup {
  title: string;
  links: SitemapLinkItem[];
}

export interface SitemapListProps extends React.HTMLAttributes<HTMLElement> {
  groups?: SitemapGroup[];
  onSelectLink?: (label: string, href?: string) => void;
}

const DEFAULT_GROUPS: SitemapGroup[] = [
  {
    title: "Visit",
    links: [
      { label: "Shows", href: "/shows" },
      { label: "Venues", href: "/venues" },
      { label: "Season passes", href: "/passes" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help desk", href: "/help" },
      { label: "Refunds", href: "/refunds" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
  },
];

/** Sitemap list: grouped link columns with counts. */
export const SitemapList = React.forwardRef<HTMLElement, SitemapListProps>(function SitemapList(
  { groups = DEFAULT_GROUPS, onSelectLink, className, ...props },
  ref,
) {
  return (
    <nav
      ref={ref}
      aria-label="Sitemap"
      className={cn(
        "grid w-full max-w-xl grid-cols-2 gap-4 rounded-lg border-2 border-foreground bg-card p-5 sm:grid-cols-3",
        className,
      )}
      {...props}
    >
      {groups.map((g) => (
        <div key={g.title}>
          <p className="border-b-2 border-dashed border-border pb-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {g.title} · {g.links.length}
          </p>
          <ul className="mt-2 space-y-1">
            {g.links.map((item) => {
              const label = typeof item === "string" ? item : item.label;
              const rawHref = typeof item === "string" ? undefined : item.href;
              const safeHref = rawHref && isSafeUrl(rawHref) ? rawHref : undefined;

              return (
                <li key={label}>
                  {safeHref ? (
                    <a
                      href={safeHref}
                      onClick={(e) => {
                        if (onSelectLink) {
                          e.preventDefault();
                          onSelectLink(label, safeHref);
                        }
                      }}
                      className="text-xs font-bold text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {label}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSelectLink?.(label)}
                      className="text-start text-xs font-bold text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {label}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
});
SitemapList.displayName = "SitemapList";
