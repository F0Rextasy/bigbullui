"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PageTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: { id: string; label: string; param?: string }[];
  activeId?: string;
  onNavigate?: (id: string) => void;
}

/** In-page tab navigation synchronized with URL query params (?tab=...). */
export function PageTabs({ tabs, activeId, onNavigate, className, ...props }: PageTabsProps) {
  const [internal, setInternal] = React.useState(activeId ?? tabs[0]?.id);
  const active = activeId ?? internal;

  const select = (id: string) => {
    setInternal(id);
    onNavigate?.(id);
    const tab = tabs.find((t) => t.id === id);
    if (tab?.param) {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tab.param);
      window.history.replaceState(null, "", url.toString());
    }
  };

  return (
    <div className={cn("flex gap-0.5 border-b-2 border-dashed border-border", className)} role="tablist" {...props}>
      <style>{`@keyframes ptUnderline { from { transform: scaleX(0); } }`}</style>
      {tabs.map((tab, idx) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => select(tab.id)}
          className={cn(
            "relative px-3 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors motion-reduce:transition-none",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-t-sm",
            active === tab.id ? "text-accent" : "text-muted-foreground hover:text-foreground"
          )}
          style={{ animationDelay: `${idx * 40}ms` }}
        >
          {tab.label}
          {active === tab.id && (
            <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-accent" style={{ animation: "ptUnderline 0.25s ease-out both" }} aria-hidden="true" />
          )}
        </button>
      ))}
    </div>
  );
}
