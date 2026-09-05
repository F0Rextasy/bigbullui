"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { DocsSearch } from "@/components/site/docs-search";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { Star } from "@/components/ui/star";
import { categories } from "@/lib/registry-site";

export function MobileNav({ stars }: { stars: number | null }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex items-center gap-2 md:hidden">
      {/* Mobile Search Quick Trigger */}
      <DocsSearch
        trigger={(setSearchOpen) => (
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search components"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-dashed border-border bg-card text-muted-foreground transition-colors hover:border-foreground hover:text-foreground active:scale-95"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        )}
      />

      {/* Theme Toggle in mobile header */}
      <ThemeToggle />

      {/* Mobile Menu Hamburger Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-secondary/60 text-foreground transition-colors hover:bg-secondary active:scale-95"
      >
        <svg
          width="16"
          height="16"
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
      </button>

      {/* Slide-out Navigation Drawer */}
      <Sheet open={open} onOpenChange={setOpen} side="right">
        <SheetHeader className="border-b border-dashed border-border pb-4 text-left">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="bigbullui logo" width={28} height={28} className="size-7" />
            <SheetTitle className="text-base font-semibold tracking-tight">bigbullui</SheetTitle>
            <span className="rounded bg-accent/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-accent-strong">
              v0.2
            </span>
          </div>
          <SheetDescription className="text-xs">
            Open-source React 19 UI library. Zero dependencies.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-6">
          {/* Search Trigger inside drawer */}
          <div>
            <DocsSearch
              trigger={(setSearchOpen) => (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setSearchOpen(true);
                  }}
                  className="flex w-full cursor-pointer items-center justify-between rounded-md border border-dashed border-border bg-secondary/40 px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-foreground/50 hover:text-foreground"
                >
                  <span className="flex items-center gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                    <span>Search 460+ components...</span>
                  </span>
                  <span className="font-mono text-[10px] rounded border border-border bg-secondary px-1.5 py-0.5">
                    ⌘K
                  </span>
                </button>
              )}
            />
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-1">
            <p className="px-1 font-mono text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Main Menu
            </p>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <span>🏠</span> Home
            </Link>
            <Link
              href="/docs"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <span className="flex items-center gap-2.5">
                <span>📦</span> Components
              </span>
              <span className="font-mono text-[10px] rounded bg-secondary px-2 py-0.5 text-muted-foreground">
                462
              </span>
            </Link>
            <Link
              href="/docs/installation"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <span>⚡</span> Installation Guide
            </Link>
            <Link
              href="/docs/design"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <span>🎨</span> Design Tokens &amp; Colors
            </Link>
            <Link
              href="/docs/agents"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <span>🤖</span> AI Agent Kit (SKILL.md)
            </Link>
            <Link
              href="/docs/contributing"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <span>🤝</span> Contributing
            </Link>
          </div>

          {/* Category Quick Links */}
          <div className="space-y-1">
            <p className="px-1 font-mono text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Categories
            </p>
            <div className="grid grid-cols-1 gap-0.5">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/docs#${cat.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-md px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <span>{cat.name}</span>
                  <span className="font-mono text-[10px]">&rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="mt-auto border-t border-dashed border-border pt-4 flex flex-col gap-2">
          <a
            href="https://github.com/F0Rextasy/bigbullui"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-md border border-border bg-secondary/50 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <Star size={14} className="text-amber-400" />
            <span>Star on GitHub {stars !== null ? `(${stars})` : ""}</span>
          </a>
          <Link
            href="/docs"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center rounded-md bg-primary py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Browse 460+ Components
          </Link>
        </div>
      </Sheet>
    </div>
  );
}
