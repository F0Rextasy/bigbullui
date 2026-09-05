"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface AppShellProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  defaultCollapsed?: boolean;
  className?: string;
}

export function AppShell({
  header,
  sidebar,
  children,
  defaultCollapsed = false,
  className,
}: AppShellProps) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  return (
    <div className={cn("flex min-h-screen overflow-hidden", className)}>
      {/* Skip link */}
      <a
        href="#main"
        className={cn(
          "hidden focus:not-sr-only focus:translate-x-0 focus:transition-transform",
          "mx-2 mb-2 rounded-md bg-secondary text-secondary-foreground px-3 py-1 text-[10px] uppercase tracking-[0.15em]"
        )}
      >
        Skip to main content
      </a>

      {/* Top bar */}
      <header
        className={cn(
          "flex h-16 items-center border-b border-border/50 bg-background px-4 sm:px-6"
        )}
      >
        {header}
      </header>

      {/* Main content */}
      <main
        id="main"
        className={cn(
          "flex-1 overflow-y-auto p-4 sm:p-6",
          collapsed && "pl-3 pr-0",
          "transition-left duration-300 ease-out"
        )}
      >
        {children}
      </main>

      {/* Sidebar */}
      <aside
        className={cn(
          "w-64 flex-shrink-0 bg-card border-r border-border/50 transition-colors duration-300 ease-out",
          collapsed && "w-0",
          !collapsed && "pr-2",
          "accordion"
        )}
      >
        {sidebar || (
          <div className="p-4 text-sm text-muted-foreground">
            <p className="uppercase tracking-[0.15em]">Collapse sidebar</p>
            <button
              className="mt-2 w-full rounded-md py-2 bg-secondary text-secondary-foreground text-[10px] uppercase tracking-[0.15em]"
              onClick={() => setCollapsed(!collapsed)}
            >
              Collapse
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}