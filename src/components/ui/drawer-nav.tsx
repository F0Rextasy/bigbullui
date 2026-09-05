"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DrawerNavItem {
  id: string;
  label: string;
  href?: string;
}

export interface DrawerNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: DrawerNavItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
}

/** Mobil hamburger menü: soldan kayan overlay + staggered linkler. */
export function DrawerNav({ items, open, onOpenChange, title = "Menü", className, ...props }: DrawerNavProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onOpenChange(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className={cn("fixed inset-0 z-50", className)} {...props}>
      <style>{`@keyframes dnPanel { from { transform: translateX(-100%); } to { transform: translateX(0); } }`}</style>
      <div className="absolute inset-0 bg-black/40" onClick={() => onOpenChange(false)} aria-hidden="true" />
      <div className="absolute inset-y-0 left-0 flex w-64 flex-col border-r-2 border-dashed border-border bg-background shadow-xl" style={{ animation: "dnPanel 0.3s cubic-bezier(0.16,1,0.3,1) both" }} role="dialog" aria-modal="true" aria-label={title}>
        <div className="flex items-center justify-between border-b border-dashed border-border px-4 py-3">
          <span className="font-mono text-xs font-bold uppercase tracking-widest">{title}</span>
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
            aria-label="Kapat"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <ul className="flex-1 space-y-1 p-3">
          {items.map((item, idx) => (
            <li key={item.id} style={{ animationDelay: `${idx * 50}ms` }}>
              <a
                href={item.href ?? "#"}
                className={cn(
                  "block rounded-md px-3 py-2.5 text-sm font-medium transition-colors motion-reduce:transition-none",
                  "hover:bg-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                  "animate-[fade-in-up_0.3s_ease-out_both] motion-reduce:animate-none"
                )}
                style={{ animationDelay: `${0.15 + idx * 0.05}s` }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
