"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { CommandPalette, type CommandItem } from "@/components/ui/command-palette";
import { Kbd } from "@/components/ui/kbd";
import { useSearchPalette } from "@/components/site/search-store";
import { categories } from "@/lib/registry-categories";
import { BLOCK_SLUGS, slugTitle } from "@/lib/site-meta";
import catalog from "@/data/catalog.json";

const GUIDES: { id: string; label: string; hint: string; href: string }[] = [
  { id: "docs", label: "Components overview", hint: "Browse every component", href: "/docs" },
  { id: "installation", label: "Installation", hint: "Install the library and tokens", href: "/docs/installation" },
  { id: "agents", label: "AI Agents", hint: "SKILL.md and agent instructions", href: "/docs/agents" },
  { id: "design", label: "Design", hint: "Ticket Stub identity and tokens", href: "/docs/design" },
  { id: "contributing", label: "Contributing", hint: "Add a component to the library", href: "/docs/contributing" },
  { id: "migrate", label: "Migrate from shadcn", hint: "Move an existing app to bigbullui", href: "/docs/migrate" },
  { id: "shortcuts", label: "Keyboard shortcuts", hint: "Every shortcut in the library", href: "/docs/shortcuts" },
  { id: "help", label: "Help & FAQ", hint: "Troubleshooting and common questions", href: "/docs/help" },
  { id: "mcp", label: "MCP Server", hint: "Use bigbullui from AI agents", href: "/docs/mcp" },
  { id: "recipes", label: "Recipes", hint: "Copy-paste patterns and layouts", href: "/docs/recipes" },
  { id: "compare", label: "Compare Components", hint: "How bigbullui differs from shadcn", href: "/docs/compare" },
  { id: "changelog", label: "Changelog", hint: "What changed in each release", href: "/docs/changelog" },
  { id: "packages", label: "Packages", hint: "npm packages and versions", href: "/packages" },
  { id: "benchmarks", label: "Bundle benchmarks", hint: "Bundle size and speed numbers", href: "/benchmarks" },
  { id: "dep-graph", label: "Dependency graph", hint: "Component dependency map", href: "/dep-graph" },
];

function categoryName(id: string): string {
  return categories.find((c) => c.id === id)?.name ?? "Components";
}

const SYNONYMS: Record<string, string[]> = {
  dialog: ["modal", "popup", "pencere"],
  table: ["tablo", "grid", "liste"],
  button: ["buton", "btn", "dugme"],
  card: ["kart", "panel"],
  input: ["giris", "alan", "field"],
  chart: ["grafik", "graph"],
  menu: ["menu", "nav"],
  toast: ["bildirim", "notice"],
  ticket: ["bilet", "stub", "kupon"],
  calendar: ["takvim", "tarih"],
  search: ["arama", "bul"],
  theme: ["tema", "dark", "gece"],
};

function keywordsFor(name: string, title: string): string[] {
  const base = [name, ...name.split("-"), ...title.toLowerCase().split(" ")];
  const extra: string[] = [];
  for (const [key, words] of Object.entries(SYNONYMS)) {
    if (name.includes(key) || title.toLowerCase().includes(key)) extra.push(...words);
  }
  return [...base, ...extra];
}

export function DocsSearch({
  trigger,
}: {
  trigger?: (setOpen: (open: boolean) => void) => React.ReactNode;
} = {}) {
  const { open, setOpen, isHost } = useSearchPalette();
  const router = useRouter();

  const items: CommandItem[] = React.useMemo(
    () => [
      ...GUIDES.map((g) => ({
        id: g.id,
        label: g.label,
        hint: g.hint,
        category: "Guides",
        keywords: ["guide", "docs", g.id],
        onSelect: () => router.push(g.href),
      })),
      ...catalog.items.map((c) => ({
        id: c.name,
        label: c.title,
        category: categoryName(c.category),
        keywords: keywordsFor(c.name, c.title),
        onSelect: () => router.push(`/docs/${c.name}`),
      })),
      ...BLOCK_SLUGS.map((slug) => ({
        id: `block-${slug}`,
        label: slugTitle(slug),
        category: "Blocks",
        keywords: ["block", ...slug.split("-"), slugTitle(slug).toLowerCase()],
        onSelect: () => router.push(`/blocks/${slug}`),
      })),
    ],
    [router]
  );

  return (
    <>
      {trigger ? (
        trigger(setOpen)
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-md border border-dashed border-border bg-transparent px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground/50 hover:text-foreground"
        >
          <span>Search components...</span>
          <span className="flex items-center gap-1">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </span>
        </button>
      )}
      {isHost && typeof document !== "undefined"
        ? createPortal(
            <CommandPalette
              open={open}
              onOpenChange={setOpen}
              items={items}
              placeholder="Search components and guides..."
            />,
            document.body
          )
        : null}
    </>
  );
}
