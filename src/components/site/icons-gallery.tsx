"use client";

import * as React from "react";
import { NavIcon, type NavIconName } from "@/components/site/nav-icons";
import { CopyButton } from "@/components/ui/copy-button";

const NAMES: NavIconName[] = [
  "home", "components", "blocks", "showcase", "install", "design",
  "agents", "contribute", "dashboard", "app", "auth", "system",
  "marketing", "content", "operations", "storefront", "service",
  "pages", "theme", "ticket", "stub", "perforation", "stamp", "gate",
];

export function IconsGallery() {
  const [big, setBig] = React.useState(false);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {NAMES.length} hand-drawn icons
        </p>
        <button
          type="button"
          onClick={() => setBig((v) => !v)}
          aria-pressed={big}
          className="rounded-md border border-border bg-card px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {big ? "Size 20" : "Size 40"}
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {NAMES.map((name) => (
          <div
            key={name}
            className="group flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground/50"
          >
            <NavIcon name={name} size={big ? 40 : 20} />
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
              {name}
            </span>
            <CopyButton value={`<StampIcon name="${name}" />`} />
          </div>
        ))}
      </div>
    </div>
  );
}
