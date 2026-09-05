"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { components, categories, type ComponentCategory } from "@/lib/registry-site";
import { cn } from "@/components/ui/lib/utils";
import { DocsSearch } from "@/components/site/docs-search";

export function DocSidebar() {
  const pathname = usePathname();

  // Keep state of which menus are open (default all open)
  const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({
    guides: true,
    form: true,
    display: true,
    feedback: true,
    navigation: true,
  });

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <nav aria-label="Documentation sidebar" className="space-y-4 pb-16 select-none">
      <DocsSearch />
      {/* Guides Section */}
      <div className="rounded-lg border border-border bg-card/60 p-2">
        <button
          type="button"
          onClick={() => toggleMenu("guides")}
          className="flex w-full cursor-pointer items-center justify-between px-2 py-1 text-left font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-foreground"
        >
          <span>GUIDES</span>
          <svg
            className={cn("size-3.5 transition-transform duration-150", !openMenus.guides && "-rotate-90")}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m4 6 4 4 4-4" />
          </svg>
        </button>

        {openMenus.guides ? (
          <div className="mt-1 space-y-0.5 border-t border-dashed border-border/60 pt-1.5 animate-[fade-in_0.15s_ease-out]">
            <Link
              href="/docs/installation"
              className={cn(
                "flex items-center justify-between rounded-md px-2 py-1.5 font-mono text-xs transition-colors",
                pathname === "/docs/installation"
                  ? "bg-accent font-bold text-accent-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <span>Installation</span>
              {pathname === "/docs/installation" && <span>•</span>}
            </Link>
            <Link
              href="/docs/agents"
              className={cn(
                "flex items-center justify-between rounded-md px-2 py-1.5 font-mono text-xs transition-colors",
                pathname === "/docs/agents"
                  ? "bg-accent font-bold text-accent-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <span>AI Agents</span>
              {pathname === "/docs/agents" && <span>•</span>}
            </Link>
            <Link
              href="/docs/contributing"
              className={cn(
                "flex items-center justify-between rounded-md px-2 py-1.5 font-mono text-xs transition-colors",
                pathname === "/docs/contributing"
                  ? "bg-accent font-bold text-accent-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <span>Contributing</span>
              {pathname === "/docs/contributing" && <span>•</span>}
            </Link>
            <Link
              href="/docs/design"
              className={cn(
                "flex items-center justify-between rounded-md px-2 py-1.5 font-mono text-xs transition-colors",
                pathname === "/docs/design"
                  ? "bg-accent font-bold text-accent-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <span>Design</span>
              {pathname === "/docs/design" && <span>•</span>}
            </Link>
          </div>
        ) : null}
      </div>

      {/* Categorized Menus */}
      {categories.map((cat) => {
          const catItems = components
            .filter((c) => c.category === cat.id)
            .sort((a, b) => a.title.localeCompare(b.title));
        const isOpen = openMenus[cat.id] ?? true;

        return (
          <div key={cat.id} className="rounded-lg border border-border bg-card/60 p-2">
            <button
              type="button"
              onClick={() => toggleMenu(cat.id)}
              className="flex w-full cursor-pointer items-center justify-between px-2 py-1 text-left font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-foreground"
            >
              <div className="flex items-center gap-2">
                <span>{cat.name}</span>
              </div>
              <svg
                className={cn("size-3.5 transition-transform duration-150", !isOpen && "-rotate-90")}
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m4 6 4 4 4-4" />
              </svg>
            </button>

            {isOpen ? (
              <div className="mt-1 space-y-0.5 border-t border-dashed border-border/60 pt-1.5 animate-[fade-in_0.15s_ease-out]">
                {catItems.map((component) => {
                  const href = `/docs/${component.name}`;
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={component.name}
                      href={href}
                      className={cn(
                        "flex items-center justify-between rounded-md px-2 py-1.5 font-mono text-xs transition-colors",
                        isActive
                          ? "bg-accent font-bold text-accent-foreground shadow-xs"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      <span className="truncate">{component.title}</span>
                      {isActive && <span className="ml-1 text-[10px]">★</span>}
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
