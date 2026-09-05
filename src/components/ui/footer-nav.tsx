"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface FooterNavLink {
  label: string;
  href?: string;
}

export interface FooterNavProps extends React.HTMLAttributes<HTMLElement> {
  brand?: string;
  columns: { title: string; links: FooterNavLink[] }[];
  copyright?: string;
}

/** Site haritası footer: link kolonları + telif satırı. */
export function FooterNav({ brand = "bigbullui", columns, copyright = "© 2026", className, ...props }: FooterNavProps) {
  return (
    <footer className={cn("w-full border-t-2 border-dashed border-border bg-card px-6 py-8", className)} {...props}>
      <style>{`@keyframes fnIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 sm:grid-cols-4">
        <div className="animate-[fnIn_0.3s_ease-out_both] motion-reduce:animate-none">
          <span className="font-mono text-sm font-black uppercase tracking-widest">{brand}</span>
        </div>
        {columns.map((col, idx) => (
          <div key={col.title} className="animate-[fnIn_0.3s_ease-out_both] motion-reduce:animate-none" style={{ animationDelay: `${(idx + 1) * 80}ms` }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{col.title}</p>
            <ul className="mt-2 space-y-1.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href ?? "#"} className="text-xs text-foreground/80 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm motion-reduce:transition-none">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-8 max-w-4xl border-t border-dashed border-border/50 pt-4 text-center font-mono text-[10px] text-muted-foreground">{copyright}</p>
    </footer>
  );
}
