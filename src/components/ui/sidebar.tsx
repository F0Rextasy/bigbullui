"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SidebarItemData {
  id: string;
  label: string;
  badge?: string;
  active?: boolean;
}

export interface SidebarGroupData {
  title: string;
  items: SidebarItemData[];
}

export interface SidebarProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  brand?: string;
  ticketCode?: string;
  groups?: SidebarGroupData[];
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  activeId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

const DEFAULT_GROUPS: SidebarGroupData[] = [
  {
    title: "BOX OFFICE",
    items: [
      { id: "dashboard", label: "Dashboard", badge: "LIVE" },
      { id: "orders", label: "Stub Orders", badge: "12" },
      { id: "inventory", label: "Seat Tiers" },
    ],
  },
  {
    title: "ADMISSIONS",
    items: [
      { id: "turnstiles", label: "Turnstile Gates" },
      { id: "scanners", label: "Barcode Scanners" },
      { id: "reports", label: "Audience Logs" },
    ],
  },
];

export function Sidebar({
  brand = "BIGBULL ARENA",
  ticketCode = "SEC-08",
  groups = DEFAULT_GROUPS,
  collapsed: controlledCollapsed,
  onCollapsedChange,
  activeId: controlledActiveId,
  onSelect,
  className,
  ...props
}: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = React.useState(false);
  const [internalActiveId, setInternalActiveId] = React.useState("dashboard");

  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;
  const activeId = controlledActiveId !== undefined ? controlledActiveId : internalActiveId;

  const toggleCollapse = () => {
    const next = !isCollapsed;
    setInternalCollapsed(next);
    onCollapsedChange?.(next);
  };

  const handleSelect = (id: string) => {
    setInternalActiveId(id);
    onSelect?.(id);
  };

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r-2 border-dashed border-border bg-card font-mono select-none transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
      {...props}
    >
      {/* Decorative side ticket punch notch */}
      <div
        aria-hidden="true"
        className="absolute -right-2 top-8 size-4 rounded-full border-2 border-foreground bg-background"
      />
      <div
        aria-hidden="true"
        className="absolute -right-2 bottom-8 size-4 rounded-full border-2 border-foreground bg-background"
      />

      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b-2 border-border px-3">
        {!isCollapsed && (
          <div className="flex flex-col truncate">
            <span className="text-xs font-black uppercase tracking-wider text-foreground">
              {brand}
            </span>
            <span className="text-[10px] tracking-widest text-muted-foreground">
              PASS: {ticketCode}
            </span>
          </div>
        )}
        <button
          type="button"
          onClick={toggleCollapse}
          className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded border border-foreground bg-secondary text-xs font-bold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 space-y-6 overflow-y-auto p-3">
        {groups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {!isCollapsed && (
              <div className="px-2 text-[9px] font-bold tracking-widest text-muted-foreground uppercase mb-1">
                {group.title}
              </div>
            )}
            <nav className="space-y-1">
              {group.items.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item.id)}
                    className={cn(
                      "flex w-full cursor-pointer items-center justify-between rounded px-2.5 py-1.5 text-xs font-medium transition-all text-left",
                      isActive
                        ? "border border-foreground bg-foreground text-background font-bold shadow-xs"
                        : "text-foreground hover:bg-secondary border border-transparent"
                    )}
                    title={item.label}
                  >
                    <span className="truncate">
                      {isCollapsed ? item.label.charAt(0).toUpperCase() : item.label}
                    </span>
                    {!isCollapsed && item.badge && (
                      <span
                        className={cn(
                          "ml-2 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase",
                          isActive
                            ? "bg-background text-foreground"
                            : "border border-border bg-secondary text-muted-foreground"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t-2 border-border p-3">
        {!isCollapsed ? (
          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <span>TERMINAL #04</span>
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="size-2 rounded-full bg-emerald-500" />
          </div>
        )}
      </div>
    </aside>
  );
}
