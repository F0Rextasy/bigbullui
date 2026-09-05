"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CommandPalette, type CommandItem } from "@/components/ui/command-palette";
import { Kbd } from "@/components/ui/kbd";
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

export function DocsSearch() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

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
        keywords: [c.name, ...c.name.split("-"), ...c.title.toLowerCase().split(" ")],
        onSelect: () => router.push(`/docs/${c.name}`),
      })),
    ],
    [router]
  );

  return (
    <>
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
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        items={items}
        placeholder="Search components and guides..."
      />
    </>
  );
}
