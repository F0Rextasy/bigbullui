"use client";

import * as React from "react";
import { Separator } from "../ui/separator";

const COLUMNS = [
  { title: "BOOTH", links: ["Components", "Blocks", "Pricing", "Changelog"] },
  { title: "GATES", links: ["Docs", "Installation", "Design", "Agents"] },
  { title: "HOUSE", links: ["About", "Contact", "License", "Status"] },
];

export function LandingFooter() {
  return (
    <footer className="w-full rounded-lg border-2 border-foreground bg-card p-8">
      <div className="grid gap-8 md:grid-cols-4">
        <div className="space-y-2">
          <p className="font-mono text-lg font-black uppercase tracking-tight">BIGBULLUI</p>
          <p className="max-w-52 text-sm text-muted-foreground">Ticket-stub components you own. React 19, zero dependencies, MIT.</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">STUB № 000500 // PRINTED 2026</p>
        </div>
        {COLUMNS.map((column) => (
          <nav key={column.title} aria-label={column.title} className="space-y-2">
            <p className="font-mono text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">{column.title}</p>
            {column.links.map((link) => (
              <a key={link} href="#top" className="block font-mono text-xs uppercase tracking-widest transition-colors hover:text-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {link}
              </a>
            ))}
          </nav>
        ))}
      </div>
      <Separator className="my-6" />
      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        <span>© 2026 BIGBULLUI // MIT</span>
        <span>CREAM PAPER // INK // STAMP RED</span>
      </div>
    </footer>
  );
}
