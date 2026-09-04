"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ContextMenuItem {
  id: string;
  label: string;
  shortcut?: string;
  danger?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface ContextMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items: (ContextMenuItem | "separator")[];
  children: React.ReactNode;
  className?: string;
}

export function ContextMenu({
  items,
  children,
  className,
  ...props
}: ContextMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const menuRef = React.useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const x = Math.min(e.clientX, window.innerWidth - 200);
    const y = Math.min(e.clientY, window.innerHeight - 250);
    setPosition({ x, y });
    setIsOpen(true);
  };

  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div onContextMenu={handleContextMenu} className={cn("relative", className)} {...props}>
      {children}

      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          style={{
            position: "fixed",
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
          className="z-50 min-w-[180px] rounded-lg border-2 border-foreground bg-card p-1.5 shadow-xl outline-1 outline-dashed outline-offset-[-4px] animate-[scale-in_0.12s_ease-out_both] font-mono text-xs select-none"
        >
          {items.map((item, idx) => {
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
                disabled={item.disabled}
                onClick={() => {
                  item.onSelect?.();
                  setIsOpen(false);
                }}
                className={cn(
                  "flex w-full cursor-pointer items-center justify-between rounded-sm px-2.5 py-1.5 text-left text-xs transition-colors",
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
}
