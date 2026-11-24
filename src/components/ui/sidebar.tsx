"use client";

import * as React from "react";
import { cn } from "./lib/utils";
import { registerEscapeLayer } from "./lib/focus-trap";

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
  footerLabel?: string;
  showStatusDot?: boolean;
  groups?: SidebarGroupData[];
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
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

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  {
    brand = "BIGBULL ARENA",
    ticketCode = "SEC-08",
    footerLabel = "System online",
    showStatusDot = true,
    groups = DEFAULT_GROUPS,
    collapsed: controlledCollapsed,
    onCollapsedChange,
    mobileOpen = false,
    onMobileOpenChange,
    activeId: controlledActiveId,
    onSelect,
    className,
    ...props
  },
  ref
) {
  const [internalCollapsed, setInternalCollapsed] = React.useState(false);
  const [internalActiveId, setInternalActiveId] = React.useState("dashboard");

  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;
  const activeId = controlledActiveId !== undefined ? controlledActiveId : internalActiveId;

  React.useEffect(() => {
    if (!mobileOpen) return;
    return registerEscapeLayer(() => onMobileOpenChange?.(false));
  }, [mobileOpen, onMobileOpenChange]);

  const toggleCollapse = () => {
    const next = !isCollapsed;
    if (controlledCollapsed === undefined) setInternalCollapsed(next);
    onCollapsedChange?.(next);
  };

  const handleSelect = (id: string) => {
    setInternalActiveId(id);
    onSelect?.(id);
    if (mobileOpen) onMobileOpenChange?.(false);
  };

  return (
    <>
      {mobileOpen ? (
        <div
          aria-hidden="true"
          onClick={() => onMobileOpenChange?.(false)}
          className="fixed inset-0 z-40 bg-foreground/60 md:hidden"
        />
      ) : null}
      <aside
        ref={ref}
        className={cn(
          "relative flex flex-col border-e-2 border-dashed border-border bg-card font-mono transition-[width,transform] duration-300 motion-reduce:transition-none",
          isCollapsed ? "w-16" : "w-64",
          mobileOpen
            ? "fixed inset-y-0 start-0 z-50 flex shadow-2xl md:static md:shadow-none"
            : "flex",
          className
        )}
        {...props}
      >
        {/* Decorative side ticket punch notch */}
        <div
          aria-hidden="true"
          className="absolute -end-2 top-8 size-4 rounded-full border-2 border-foreground bg-background"
        />
        <div
          aria-hidden="true"
          className="absolute -end-2 bottom-8 size-4 rounded-full border-2 border-foreground bg-background"
        />

        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b-2 border-border px-3">
          {!isCollapsed && (
            <div className="flex flex-col truncate">
              <span className="text-xs font-black uppercase tracking-wider text-foreground">
                {brand}
              </span>
              {ticketCode ? (
                <span className="text-[10px] tracking-widest text-muted-foreground">
                  PASS: {ticketCode}
                </span>
              ) : null}
            </div>
          )}
          <button
            type="button"
            onClick={toggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!isCollapsed}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded border border-foreground bg-secondary text-xs font-bold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {isCollapsed ? "→" : "←"}
          </button>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 space-y-6 overflow-y-auto p-3">
          {groups.map((group, gIdx) => (
            <div key={group.title || gIdx} className="space-y-1">
              {!isCollapsed && (
                <div className="mb-1 px-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                  {group.title}
                </div>
              )}
              <nav aria-label={group.title} className="space-y-1">
                {group.items.map((item) => {
                  const isActive = item.active ?? item.id === activeId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelect(item.id)}
                      aria-current={isActive ? "page" : undefined}
                      title={item.label}
                      className={cn(
                        "flex w-full cursor-pointer items-center justify-between rounded border px-2.5 py-1.5 text-start text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        isActive
                          ? "border-foreground bg-foreground text-background font-bold shadow-xs"
                          : "border-transparent text-foreground hover:bg-secondary"
                      )}
                    >
                      <span className="truncate">
                        {isCollapsed ? item.label.charAt(0).toUpperCase() : item.label}
                      </span>
                      {!isCollapsed && item.badge && (
                        <span
                          className={cn(
                            "ms-2 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase",
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
              <span>{footerLabel}</span>
              {showStatusDot ? (
                <span className="size-2 rounded-full bg-success motion-safe:animate-pulse" />
              ) : null}
            </div>
          ) : showStatusDot ? (
            <div className="flex justify-center">
              <span className="size-2 rounded-full bg-success" />
            </div>
          ) : null}
        </div>
      </aside>
    </>
  );
});
Sidebar.displayName = "Sidebar";
