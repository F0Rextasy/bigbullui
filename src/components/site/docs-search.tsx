"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CommandPalette, type CommandItem } from "@/components/ui/command-palette";
import { Kbd } from "@/components/ui/kbd";
import { useSearchPalette } from "@/components/site/search-store";
import { categories, components } from "@/lib/registry-site";

const GUIDES: { id: string; label: string; hint: string; href: string }[] = [
  { id: "docs", label: "Components overview", hint: "Browse every component", href: "/docs" },
  { id: "installation", label: "Installation", hint: "Install the library and tokens", href: "/docs/installation" },
  { id: "agents", label: "AI Agents", hint: "SKILL.md and agent instructions", href: "/docs/agents" },
  { id: "design", label: "Design", hint: "Ticket Stub identity and tokens", href: "/docs/design" },
  { id: "contributing", label: "Contributing", hint: "Add a component to the library", href: "/docs/contributing" },
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
      ...components.map((c) => ({
        id: c.name,
        label: c.title,
        hint: c.description,
        category: categoryName(c.category),
        keywords: keywordsFor(c.name, c.title),
        onSelect: () => router.push(`/docs/${c.name}`),
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
      {isHost ? (
        <CommandPalette
          open={open}
          onOpenChange={setOpen}
          items={items}
          placeholder="Search components and guides..."
        />
      ) : null}
    </>
  );
}
