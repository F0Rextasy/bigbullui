"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface AdminShellProps extends React.HTMLAttributes<HTMLDivElement> {
  brand?: string;
  navItems?: { id: string; label: string; badge?: string | number }[];
  activeId?: string;
  onNavigate?: (id: string) => void;
  headerRight?: React.ReactNode;
  children?: React.ReactNode;
}

/** Yönetim paneli iskeleti: daraltılabilir yan menü + üst bar + içerik. */
export function AdminShell({ brand = "Panel", navItems = [], activeId, onNavigate, headerRight, children, className, ...props }: AdminShellProps) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [internalActive, setInternalActive] = React.useState(activeId ?? navItems[0]?.id);
  const active = activeId ?? internalActive;

  return (
    <div className={cn("flex min-h-[420px] overflow-hidden rounded-lg border border-border bg-background", className)} {...props}>
      <style>{`@keyframes adminIn { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }`}</style>

      {/* Yan menü */}
      <aside className={cn("flex shrink-0 flex-col border-r border-border bg-card transition-all duration-300 motion-reduce:transition-none", collapsed ? "w-14" : "w-52")}>
        <div className="flex h-12 items-center gap-2 border-b border-border px-3">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-accent font-mono text-[10px] font-black text-accent-foreground">B</span>
          {!collapsed && <span className="truncate font-mono text-xs font-bold uppercase tracking-widest">{brand}</span>}
        </div>
        <nav className="flex-1 space-y-0.5 p-2">
          {navItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => { setInternalActive(item.id); onNavigate?.(item.id); }}
              aria-current={active === item.id ? "page" : undefined}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-sm px-2 py-1.5 text-left text-xs transition-all duration-150 motion-reduce:transition-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "animate-[adminIn_0.25s_ease-out_both] motion-reduce:animate-none",
                active === item.id
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <span className={cn("size-1.5 shrink-0 rounded-full transition-colors motion-reduce:transition-none", active === item.id ? "bg-accent-foreground" : "bg-border")} aria-hidden="true" />
              {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
              {!collapsed && item.badge !== undefined && (
                <span className="rounded-full bg-secondary px-1.5 font-mono text-[9px] tabular-nums text-secondary-foreground">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="border-t border-border py-2 font-mono text-[9px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
          aria-label={collapsed ? "Menüyü genişlet" : "Menüyü daralt"}
        >
          {collapsed ? "»" : "« DARALT"}
        </button>
      </aside>

      {/* Sağ taraf */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-12 items-center justify-between border-b border-border px-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            {navItems.find((n) => n.id === active)?.label ?? brand}
          </span>
          {headerRight}
        </header>
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
