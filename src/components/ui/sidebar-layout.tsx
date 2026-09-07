"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SidebarLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  sidebarWidth?: number;
  sticky?: boolean;
}

export function SidebarLayout({ sidebar, children, sidebarWidth = 260, sticky = true, className, ...props }: SidebarLayoutProps) {
  return (
    <div className={cn("mx-auto flex w-full max-w-6xl items-start gap-8 px-4", className)} {...props}>
      <aside
        style={{ width: sidebarWidth }}
        className={cn("hidden shrink-0 md:block", sticky && "sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto")}
      >
        {sidebar}
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
