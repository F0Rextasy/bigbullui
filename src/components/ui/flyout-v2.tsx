"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface Flyout2Item {
  id: string;
  label: string;
  children?: { id: string; label: string; href?: string }[];
}

export interface FlyoutV2Props extends Omit<React.HTMLAttributes<HTMLUListElement>, "onSelect"> {
  items: Flyout2Item[];
}

/** Hover flyout menü v2: alt öğeler sağdan açılır. */
export function FlyoutV2({ items, className, ...props }: FlyoutV2Props) {
  return (
    <ul className={cn("w-44 rounded-md border border-border bg-card p-1 shadow-lg", className)} role="menu" {...props}>
      <style>{`@keyframes fl2In { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: translateX(0); } }`}</style>
      {items.map((item, idx) => (
        <li key={item.id} className="group relative animate-[fl2In_0.2s_ease-out_both] motion-reduce:animate-none" style={{ animationDelay: `${idx * 35}ms` }}>
          <button
            role="menuitem"
            className="flex w-full items-center justify-between rounded-sm px-2.5 py-1.5 text-left text-xs transition-colors hover:bg-secondary motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {item.label}
            {item.children && item.children.length > 0 && (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
            )}
          </button>
          {item.children && item.children.length > 0 && (
            <ul className="invisible absolute left-full top-0 z-10 ml-0.5 w-40 rounded-md border border-border bg-card p-1 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100 motion-reduce:transition-none">
              {item.children.map((child) => (
                <li key={child.id}>
                  <a role="menuitem" href={child.href ?? "#"} className="block rounded-sm px-2.5 py-1.5 text-xs transition-colors hover:bg-secondary motion-reduce:transition-none">
                    {child.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
