"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
}

export interface GlossaryListProps extends React.HTMLAttributes<HTMLDivElement> {
  terms: GlossaryTerm[];
}

/** Glossary list: alphabet jump index + term definitions. */
export function GlossaryList({ terms, className, ...props }: GlossaryListProps) {
  const sorted = [...terms].sort((a, b) => a.term.localeCompare(b.term, "tr"));
  const letters = [...new Set(sorted.map((t) => t.term[0].toUpperCase()))];
  const [active, setActive] = React.useState(letters[0]);

  const visible = sorted.filter((t) => t.term[0].toUpperCase() === active);

  return (
    <div className={cn("w-full max-w-md", className)} {...props}>
      <style>{`@keyframes glIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      {/* Harf indeksi */}
      <div className="flex flex-wrap gap-1" role="tablist" aria-label="Harf indeksi">
        {letters.map((letter) => (
          <button
            key={letter}
            role="tab"
            aria-selected={active === letter}
            onClick={() => setActive(letter)}
            className={cn(
              "size-7 rounded-sm font-mono text-xs font-bold uppercase transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              active === letter ? "bg-accent text-accent-foreground" : "border border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            )}
          >
            {letter}
          </button>
        ))}
      </div>

      <dl className="mt-4 divide-y divide-border/60 overflow-hidden rounded-lg border border-border bg-card">
        {visible.map((t, idx) => (
          <div key={t.id} className="px-4 py-3 animate-[glIn_0.3s_ease-out_both] motion-reduce:animate-none" style={{ animationDelay: `${idx * 45}ms` }}>
            <dt className="text-sm font-semibold">{t.term}</dt>
            <dd className="mt-0.5 text-sm text-muted-foreground">{t.definition}</dd>
          </div>
        ))}
        {visible.length === 0 && <div className="px-4 py-4 text-center text-sm text-muted-foreground">Bu harfte terim yok.</div>}
      </dl>
    </div>
  );
}
