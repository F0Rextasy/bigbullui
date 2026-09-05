"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MegaMenuColumn {
  title: string;
  links: { label: string; href?: string; description?: string }[];
}

export interface MegaMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  trigger: React.ReactNode;
  columns: MegaMenuColumn[];
  /** Featured promotional box in bottom-left */
  featured?: React.ReactNode;
}

/** Full-width mega menu: multi-column links + featured banner. */
export function MegaMenu({ trigger, columns, featured, className, ...props }: MegaMenuProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)} {...props}>
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
        {trigger}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} aria-hidden="true" />
          <div
            className={cn(
              "absolute left-1/2 z-40 mt-2 w-[560px] -translate-x-1/2 rounded-lg border border-border bg-card p-5 shadow-lg",
              "animate-[fade-in-up_0.25s_ease-out_both] motion-reduce:animate-none origin-top"
            )}
            role="menu"
          >
            <div className="grid grid-cols-3 gap-5">
              {columns.map((col, idx) => (
                <div key={col.title} className="animate-[fade-in-up_0.3s_ease-out_both] motion-reduce:animate-none" style={{ animationDelay: `${idx * 60}ms` }}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{col.title}</p>
                  <ul className="mt-2 space-y-1">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href ?? "#"}
                          role="menuitem"
                          className="group block rounded-sm px-2 py-1.5 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
                        >
                          <span className="text-sm font-medium transition-colors group-hover:text-accent motion-reduce:transition-none">{link.label}</span>
                          {link.description && <span className="mt-0.5 block text-xs text-muted-foreground">{link.description}</span>}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {featured && (
              <div className="mt-4 rounded-md border border-dashed border-border bg-secondary/40 p-3 animate-[fade-in-up_0.3s_ease-out_0.2s_both] motion-reduce:animate-none">
                {featured}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
