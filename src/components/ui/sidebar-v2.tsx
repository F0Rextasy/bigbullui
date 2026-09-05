"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SidebarV2Item {
  id: string;
  label: string;
  badge?: string | number;
  children?: { id: string; label: string }[];
}

export interface SidebarV2Props extends React.HTMLAttributes<HTMLElement> {
  items: SidebarV2Item[];
  activeId?: string;
  onNavigate?: (id: string) => void;
  title?: string;
}

/** Two-level collapsible sidebar v2. */
export function SidebarV2({ items, activeId, onNavigate, title = "Menu", className, ...props }: SidebarV2Props) {
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set());
  const [active, setActive] = React.useState(activeId ?? items[0]?.id);

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const renderItems = (list: SidebarV2Item[], depth: number): React.ReactNode =>
    list.map((item, idx) => {
      const hasChildren = item.children && item.children.length > 0;
      const isOpen = expanded.has(item.id);
      const isActive = active === item.id;
      return (
        <li key={item.id} className="animate-[sb2In_0.25s_ease-out_both] motion-reduce:animate-none" style={{ animationDelay: `${idx * 40}ms` }}>
          <button
            onClick={() => { if (hasChildren) toggle(item.id); setActive(item.id); onNavigate?.(item.id); }}
            aria-expanded={hasChildren ? isOpen : undefined}
            className={cn(
              "flex w-full items-center gap-2 rounded-sm text-left text-xs transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              isActive ? "bg-accent/10 font-medium text-accent" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
            style={{ paddingLeft: `${8 + depth * 14}px`, paddingTop: 6, paddingBottom: 6, paddingRight: 8 }}
          >
            {hasChildren ? (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={cn("shrink-0 transition-transform duration-200 motion-reduce:transition-none", isOpen && "rotate-90")} aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
            ) : (
              <span className="size-2.5 shrink-0" aria-hidden="true" />
            )}
            <span className="flex-1 truncate">{item.label}</span>
            {item.badge !== undefined && <span className="rounded-full bg-secondary px-1.5 font-mono text-[9px] tabular-nums">{item.badge}</span>}
          </button>
          {hasChildren && isOpen && (
            <ul className="mt-0.5 space-y-0.5">
              {renderChildren(item.children!, depth + 1)}
            </ul>
          )}
        </li>
      );
    });

  const renderChildren = (children: NonNullable<SidebarV2Item["children"]>, depth: number): React.ReactNode =>
    children.map((child) => (
      <li key={child.id}>
        <button
          onClick={() => { setActive(child.id); onNavigate?.(child.id); }}
          className={cn(
            "flex w-full items-center rounded-sm py-1.5 text-left text-xs transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            active === child.id ? "text-accent" : "text-muted-foreground hover:text-foreground"
          )}
          style={{ paddingLeft: `${14 + depth * 14}px` }}
        >
          {child.label}
        </button>
      </li>
    ));

  return (
    <nav className={cn("w-full max-w-56 rounded-lg border border-border bg-card p-2", className)} aria-label={title} {...props}>
      <style>{`@keyframes sb2In { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: translateX(0); } }`}</style>
      <p className="px-2 pb-2 pt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{title}</p>
      <ul className="space-y-0.5">{renderItems(items, 0)}</ul>
    </nav>
  );
}
