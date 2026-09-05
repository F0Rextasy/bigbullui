"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MobileMenuItem {
  id: string;
  label: string;
  href?: string;
}

export interface MobileMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MobileMenuItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Fullscreen mobile navigation overlay with staggered entrance. */
export function MobileMenu({ items, open, onOpenChange, className, ...props }: MobileMenuProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onOpenChange(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className={cn("fixed inset-0 z-50 flex flex-col bg-background", className)} role="dialog" aria-modal="true" aria-label="Mobile menu" {...props}>
      <style>{`@keyframes mmIn { from { opacity: 0; transform: translateY(-14px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="flex items-center justify-between border-b-2 border-dashed border-border px-4 py-3">
        <span className="font-mono text-xs font-bold uppercase tracking-widest">Menu</span>
        <button
          onClick={() => onOpenChange(false)}
          className="rounded-sm p-1.5 text-foreground transition-transform duration-200 hover:rotate-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
          aria-label="Kapat"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      </div>
      <ul className="flex-1 overflow-auto p-6">
        {items.map((item, idx) => (
          <li key={item.id} className="animate-[mmIn_0.35s_cubic-bezier(0.16,1,0.3,1)_both] motion-reduce:animate-none" style={{ animationDelay: `${idx * 70}ms` }}>
            <a
              href={item.href ?? "#"}
              onClick={() => onOpenChange(false)}
              className="block border-b border-dashed border-border/50 py-4 font-mono text-lg font-bold uppercase tracking-wider transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm motion-reduce:transition-none"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
