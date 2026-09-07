"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface HolyGrailProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebar?: React.ReactNode;
  aside?: React.ReactNode;
}

/** Holy grail layout: header, footer, nav, content and aside slots. */
export function HolyGrail({
  header = "Box Office",
  footer = "Stub footer · Gate info",
  sidebar = "Nav",
  aside = "Aside",
  children,
  className,
  ...props
}: HolyGrailProps) {
  return (
    <div className={cn("grid w-full max-w-2xl grid-rows-[auto_1fr_auto] overflow-hidden rounded-lg border-2 border-foreground bg-card", className)} {...props}>
      <header className="border-b-2 border-dashed border-border px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-widest">
        {header}
      </header>
      <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[130px_1fr_110px]">
        <nav aria-label="Section" className="border-r-2 border-dashed border-border p-3 font-mono text-[11px] uppercase text-muted-foreground">
          {sidebar}
        </nav>
        <main className="min-h-28 p-4 text-sm">{children ?? <p className="font-mono text-xs text-muted-foreground">Main content slot.</p>}</main>
        <aside className="hidden border-l-2 border-dashed border-border p-3 font-mono text-[11px] uppercase text-muted-foreground sm:block">
          {aside}
        </aside>
      </div>
      <footer className="border-t-2 border-dashed border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {footer}
      </footer>
    </div>
  );
}
