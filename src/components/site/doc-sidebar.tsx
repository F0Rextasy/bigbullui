"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { components, categories } from "@/lib/registry-site";
import { cn } from "@/components/ui/lib/utils";
import { DocsSearch } from "@/components/site/docs-search";
import { useSeen } from "@/components/site/seen-store";

const GUIDES = [
  { href: "/docs", label: "Overview" },
  { href: "/docs/installation", label: "Installation" },
  { href: "/docs/agents", label: "AI Agents (SKILL.md)" },
  { href: "/docs/design", label: "Design System" },
  { href: "/docs/contributing", label: "Contributing" },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={cn("size-3.5 shrink-0 text-muted-foreground transition-transform duration-150", !open && "-rotate-90")}
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
  );
}

function SidebarLink({
  href,
  label,
  active,
  isNew = false,
  seen = true,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  isNew?: boolean;
  seen?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center justify-between gap-2.5 rounded-lg px-3 py-2 text-[15px] leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active
          ? "bg-accent font-medium text-accent-foreground"
          : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
      )}
    >
      <span className="flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className={cn(
            "h-1.5 w-1.5 shrink-0 rounded-full transition-colors",
            active ? "bg-accent-strong" : "bg-border"
          )}
        />
        <span className="truncate">{label}</span>
      </span>
      {isNew && !seen ? (
        <span
          title="New"
          aria-label="New component"
          className="ml-auto size-2 shrink-0 animate-pulse rounded-full bg-accent-strong"
        />
      ) : null}
    </Link>
  );
}

export const CORE_ESSENTIALS = new Set([
  // Core Forms & Inputs
  "button", "button-group", "input", "textarea", "checkbox", "switch", "radio-group", "slider",
  "select", "combobox", "stepper", "pin-input", "rating", "copy-button", "search-bar", "file-dropzone",
  // Data & Cards
  "card", "table", "data-table", "metric-card", "stat-tile", "accordion", "bento-grid",
  // Feedback & Overlays
  "dialog", "alert-dialog", "sheet", "popover", "tooltip", "toast", "alert", "callout",
  // Navigation
  "tabs", "breadcrumb", "pagination", "menubar", "command-palette", "navbar",
  // Core Elements
  "badge", "avatar", "separator", "skeleton", "spinner", "progress",
  // Pickers & Code
  "calendar", "date-picker", "color-picker", "code-block"
]);

export function DocSidebar({ onNavigate }: { onNavigate?: () => void } = {}) {
  const pathname = usePathname();
  const seen = useSeen();

  const [filterMode, setFilterMode] = React.useState<"core" | "all">("all");
  const [userToggled, setUserToggled] = React.useState<Record<string, boolean>>({});

  const activeGroup = React.useMemo(() => {
    const guidePaths = ["/docs", "/docs/installation", "/docs/agents", "/docs/design", "/docs/contributing"];
    if (guidePaths.includes(pathname)) return "guides";
    const slug = pathname.replace(/^\/docs\//, "");
    return components.find((c) => c.name === slug)?.category;
  }, [pathname]);

  const isOpen = (key: string) => {
    if (key in userToggled) return userToggled[key];
    return activeGroup === key;
  };

  const toggleMenu = (key: string) => {
    setUserToggled((prev) => ({ ...prev, [key]: !isOpen(key) }));
  };

  return (
    <nav aria-label="Documentation sidebar" className="space-y-6 pb-16 select-none">
      <DocsSearch />

      {/* Catalog Filter Mode Toggle */}
      <div className="grid grid-cols-2 gap-1 rounded-lg border border-border bg-secondary/50 p-1">
        <button
          type="button"
          onClick={() => setFilterMode("core")}
          className={cn(
            "rounded-md px-2 py-1 text-center font-mono text-[11px] uppercase tracking-wider transition-colors",
            filterMode === "core"
              ? "bg-primary font-semibold text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Core ({CORE_ESSENTIALS.size})
        </button>
        <button
          type="button"
          onClick={() => setFilterMode("all")}
          className={cn(
            "rounded-md px-2 py-1 text-center font-mono text-[11px] uppercase tracking-wider transition-colors",
            filterMode === "all"
              ? "bg-primary font-semibold text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          All ({components.length})
        </button>
      </div>

      {/* Guides Section */}
      <section>
        <button
          type="button"
          onClick={() => toggleMenu("guides")}
          className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="text-[13px] font-semibold tracking-wide text-foreground">
            Getting started
          </span>
          <Chevron open={isOpen("guides")} />
        </button>

        {isOpen("guides") ? (
          <div className="mt-1 space-y-0.5">
            {GUIDES.map((guide) => (
              <SidebarLink
                key={guide.href}
                href={guide.href}
                label={guide.label}
                active={pathname === guide.href}
                onClick={onNavigate}
              />
            ))}
          </div>
        ) : null}
      </section>

      {/* Categorized Menus */}
      {categories.map((cat) => {
        const allCatItems = components
          .filter((c) => c.category === cat.id)
          .sort((a, b) => a.title.localeCompare(b.title));
        
        const catItems = filterMode === "core"
          ? allCatItems.filter((c) => CORE_ESSENTIALS.has(c.name))
          : allCatItems;

        if (filterMode === "core" && catItems.length === 0) {
          return null;
        }

        const open = isOpen(cat.id);

        return (
          <section key={cat.id}>
            <button
              type="button"
              onClick={() => toggleMenu(cat.id)}
              className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="text-[13px] font-semibold tracking-wide text-foreground">
                {cat.name}
              </span>
              <span className="flex items-center gap-2">
                <span className="rounded-full bg-secondary px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                  {catItems.length}
                </span>
                <Chevron open={open} />
              </span>
            </button>

            {open ? (
              <div className="mt-1 space-y-0.5">
                {catItems.map((component) => (
                  <SidebarLink
                    key={component.name}
                    href={`/docs/${component.name}`}
                    label={component.title}
                    active={pathname === `/docs/${component.name}`}
                    isNew={component.isNew}
                    seen={seen.has(component.name)}
                    onClick={onNavigate}
                  />
                ))}
              </div>
            ) : null}
          </section>
        );
      })}
    </nav>
  );
}
