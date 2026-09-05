"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ResponsiveNavItem {
  id: string;
  label: string;
  href?: string;
}

export interface ResponsiveNavProps extends React.HTMLAttributes<HTMLElement> {
  brand?: string;
  items: ResponsiveNavItem[];
  activeId?: string;
  breakpoint?: "sm" | "md" | "lg";
}

/** Masaüstü yatay nav + mobil hamburger otomatik geçiş. */
export function ResponsiveNav({ brand = "bigbullui", items, activeId, breakpoint = "md", className, ...props }: ResponsiveNavProps) {
  const [open, setOpen] = React.useState(false);
  const bp = { sm: "sm:hidden", md: "md:hidden", lg: "lg:hidden" }[breakpoint];
  const bpDesktop = { sm: "sm:flex", md: "md:flex", lg: "lg:flex" }[breakpoint];
  const bpPanel = { sm: "sm:hidden", md: "md:hidden", lg: "lg:hidden" }[breakpoint];

  return (
    <nav className={cn("relative border-b-2 border-dashed border-border bg-background", className)} {...props}>
      <style>{`@keyframes rnvDrop { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="flex items-center justify-between px-4 py-3">
        <span className="font-mono text-sm font-bold uppercase tracking-widest">{brand}</span>

        <ul className={cn("hidden items-center gap-5", bpDesktop)}>
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={item.href ?? "#"}
                aria-current={activeId === item.id ? "page" : undefined}
                className={cn(
                  "relative font-mono text-xs uppercase tracking-wider transition-colors motion-reduce:transition-none",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm",
                  activeId === item.id ? "text-accent after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-accent after:animate-[fade-in_0.2s_ease-out_both]" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Menüyü aç/kapat"
          className={cn("rounded-sm p-1.5 text-foreground transition-transform duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", bp, open && "rotate-90")}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>}
          </svg>
        </button>
      </div>

      {open && (
        <ul className={cn("space-y-1 border-t border-dashed border-border px-4 py-3 animate-[rnvDrop_0.25s_ease-out_both] motion-reduce:animate-none", bpPanel)}>
          {items.map((item, idx) => (
            <li key={item.id} style={{ animationDelay: `${idx * 50}ms` }}>
              <a
                href={item.href ?? "#"}
                aria-current={activeId === item.id ? "page" : undefined}
                className={cn(
                  "block rounded-sm px-2 py-2 font-mono text-xs uppercase tracking-wider transition-colors motion-reduce:transition-none",
                  activeId === item.id ? "bg-accent/10 text-accent" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
