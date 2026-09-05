"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CommandPalette, type CommandItem } from "@/components/ui/command-palette";
import { Kbd } from "@/components/ui/kbd";
import { components } from "@/lib/registry-site";

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
      { id: "docs", label: "Components overview", category: "Guides", onSelect: () => router.push("/docs") },
      {
        id: "installation",
        label: "Installation",
        category: "Guides",
        onSelect: () => router.push("/docs/installation"),
      },
      ...components.map((c) => ({
        id: c.name,
        label: c.title,
        category: "Components",
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
