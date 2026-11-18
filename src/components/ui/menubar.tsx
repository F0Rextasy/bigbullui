"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MenubarItem {
  id: string;
  label: string;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  onSelect?: () => void;
}

export interface MenubarMenu {
  id: string;
  label: string;
  items: (MenubarItem | "separator")[];
}

export interface MenubarProps extends React.HTMLAttributes<HTMLDivElement> {
  menus: MenubarMenu[];
  className?: string;
  /** Dual-mode: false renders instantly with no motion. Default true. */
  animated?: boolean;
}

export function Menubar({ menus = [], className, animated = true, ...props }: MenubarProps) {
  const [activeMenuId, setActiveMenuId] = React.useState<string | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!activeMenuId) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveMenuId(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenuId(null);
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const idx = menus.findIndex((m) => m.id === activeMenuId);
        if (idx >= 0 && menus.length > 0) {
          e.preventDefault();
          const next =
            e.key === "ArrowRight"
              ? (idx + 1) % menus.length
              : (idx - 1 + menus.length) % menus.length;
          setActiveMenuId(menus[next]!.id);
        }
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Home" || e.key === "End") {
        const activePanel = containerRef.current?.querySelector<HTMLElement>('[role="menu"]');
        const btns = Array.from(
          activePanel?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)') ?? []
        );
        if (btns.length === 0) return;
        e.preventDefault();
        const curr = btns.indexOf(document.activeElement as HTMLButtonElement);
        let next = 0;
        if (e.key === "Home") next = 0;
        else if (e.key === "End") next = btns.length - 1;
        else if (e.key === "ArrowDown") next = curr < 0 ? 0 : (curr + 1) % btns.length;
        else next = curr <= 0 ? btns.length - 1 : curr - 1;
        btns[next]?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeMenuId, menus]);

  return (
    <div
      ref={containerRef}
      role="menubar"
      className={cn(
        "inline-flex items-center rounded-lg border-2 border-foreground bg-card p-1 shadow-xs font-mono select-none",
        className
      )}
      {...props}
    >
      {menus.map((menu) => {
        const isOpen = activeMenuId === menu.id;

        return (
          <div key={menu.id} className="relative">
            <button
              type="button"
              role="menuitem"
              aria-haspopup="true"
              aria-expanded={isOpen}
              onClick={() => setActiveMenuId(isOpen ? null : menu.id)}
              onMouseEnter={() => {
                if (activeMenuId !== null) setActiveMenuId(menu.id);
              }}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer",
                isOpen
                  ? "bg-foreground text-background"
                  : "text-foreground hover:bg-secondary"
              )}
            >
              {menu.label}
            </button>

            {isOpen && (
              <div
                role="menu"
                className={cn("absolute left-0 top-full z-50 mt-1 min-w-[170px] rounded-lg border-2 border-foreground bg-card p-1.5 shadow-xl outline-1 outline-dashed outline-offset-[-4px] text-xs", animated && "motion-safe:animate-[scale-in_0.12s_ease-out_both]")}
              >
                {menu.items.map((item, idx) => {
                  if (item === "separator") {
                    return (
                      <div
                        key={`sep-${idx}`}
                        className="my-1 border-t border-dashed border-border"
                      />
                    );
                  }

                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="menuitem"
                      disabled={item.disabled}
                      onClick={() => {
                        item.onSelect?.();
                        setActiveMenuId(null);
                      }}
                      className={cn(
                        "flex w-full cursor-pointer items-center justify-between rounded-sm px-2.5 py-1.5 text-start text-xs transition-colors",
                        item.danger
                          ? "text-destructive hover:bg-destructive hover:text-white"
                          : "text-foreground hover:bg-accent hover:text-accent-foreground",
                        item.disabled && "opacity-40 pointer-events-none cursor-not-allowed"
                      )}
                    >
                      <span>{item.label}</span>
                      {item.shortcut && (
                        <span className="text-[10px] opacity-70 tracking-wider">
                          {item.shortcut}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
