"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  brand?: string;
  items?: NavItem[];
  action?: React.ReactNode;
  className?: string;
}

export function Navbar({
  brand = "BIGBULL",
  items = [
    { label: "EVENTS", href: "#", active: true },
    { label: "STUBS", href: "#" },
    { label: "VENUES", href: "#" },
  ],
  action,
  className,
  ...props
}: NavbarProps) {
  return (
    <header
      className={cn(
        "relative flex w-full items-center justify-between border-b-2 border-dashed border-border bg-card px-4 py-3 font-mono shadow-xs select-none",
        className
      )}
      {...props}
    >
      {/* Brand */}
      <div className="flex items-center gap-2">
        <span className="flex size-6 items-center justify-center rounded-xs bg-foreground text-[11px] font-bold text-background">
          B
        </span>
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-foreground">
          {brand}
        </span>
      </div>

      {/* Nav Links */}
      <nav className="hidden sm:flex items-center gap-1">
        {items.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wider transition-colors",
              item.active
                ? "bg-accent text-accent-foreground shadow-xs"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Right Action */}
      {action ? (
        <div className="flex items-center gap-2">{action}</div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="rounded-xs border border-dashed border-border bg-secondary px-2 py-1 text-[10px] font-bold uppercase text-foreground">
            ADMIT ONE
          </span>
        </div>
      )}
    </header>
  );
}
