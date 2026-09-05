"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Sheet, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { DocSidebar } from "@/components/site/doc-sidebar";
import { DocsSearch } from "@/components/site/docs-search";
import { components } from "@/lib/registry-site";

export function MobileDocsBar() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  // Determine current page title
  const currentTitle = React.useMemo(() => {
    if (pathname === "/docs") return "Components Overview";
    if (pathname === "/docs/installation") return "Installation";
    if (pathname === "/docs/agents") return "AI Agent Kit";
    if (pathname === "/docs/design") return "Design Tokens";
    if (pathname === "/docs/contributing") return "Contributing";
    const slug = pathname.replace(/^\/docs\//, "");
    const comp = components.find((c) => c.name === slug);
    return comp ? comp.title : "Documentation";
  }, [pathname]);

  return (
    <div className="sticky top-16 z-30 flex items-center justify-between border-b border-border bg-background/95 px-4 py-2.5 backdrop-blur-md md:hidden">
      {/* Sidebar trigger button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md border border-dashed border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground shadow-2xs transition-colors hover:border-foreground/50 active:scale-95"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="3" x2="21" y1="6" y2="6" />
          <line x1="3" x2="21" y1="12" y2="12" />
          <line x1="3" x2="21" y1="18" y2="18" />
        </svg>
        <span className="max-w-[170px] truncate font-mono sm:max-w-[260px]">
          {currentTitle}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">▼</span>
      </button>

      {/* Quick Search */}
      <DocsSearch
        trigger={(setSearchOpen) => (
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-1.5 rounded-md border border-border bg-secondary/50 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground active:scale-95"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span className="font-mono text-[11px]">Search</span>
          </button>
        )}
      />

      {/* Slide-out Sidebar Drawer */}
      <Sheet open={open} onOpenChange={setOpen} side="left">
        <SheetHeader className="border-b border-dashed border-border pb-3 text-left">
          <SheetTitle className="text-base font-semibold tracking-tight">Component Catalog</SheetTitle>
          <SheetDescription className="text-xs">
            Browse 462 zero-dependency React 19 components.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4">
          <DocSidebar onNavigate={() => setOpen(false)} />
        </div>
      </Sheet>
    </div>
  );
}
