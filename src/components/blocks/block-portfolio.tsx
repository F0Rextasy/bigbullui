"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

const PROJECTS = [
  { id: "p1", title: "Opera Season Identity", tags: ["branding", "print"], year: "2025" },
  { id: "p2", title: "Night Ferry App", tags: ["product", "mobile"], year: "2025" },
  { id: "p3", title: "Seed Packet Series", tags: ["print", "packaging"], year: "2024" },
  { id: "p4", title: "Box Office Kiosk", tags: ["product", "kiosk"], year: "2024" },
];

/** Portfolio page: project grid + lightbox + contact strip. */
export function BlockPortfolio() {
  const [filter, setFilter] = React.useState("all");
  const [lightbox, setLightbox] = React.useState<string | null>(null);
  const [sent, setSent] = React.useState(false);

  const tags = ["all", ...Array.from(new Set(PROJECTS.flatMap((p) => p.tags)))];
  const results = PROJECTS.filter((p) => filter === "all" || p.tags.includes(filter));
  const active = PROJECTS.find((p) => p.id === lightbox) ?? null;

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2 className="font-mono text-2xl font-black uppercase tracking-tight">Selected work</h2>
        <div className="flex gap-1.5" role="group" aria-label="Filter by tag">
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={filter === t}
              onClick={() => setFilter(t)}
              className={`rounded-sm border px-2 py-1 font-mono text-[10px] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${filter === t ? "border-accent bg-accent font-bold text-accent-foreground" : "border-dashed border-border text-muted-foreground hover:border-foreground hover:text-foreground"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {results.map((p, i) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => setLightbox(p.id)}
              className="group block w-full rounded-lg border-2 border-foreground bg-card p-5 text-start shadow-sm outline-1 outline-dashed outline-offset-[-5px] outline-border transition-transform hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none motion-reduce:hover:scale-100"
              aria-label={`Open ${p.title}`}
            >
              <span className="flex h-24 items-center justify-center rounded-md border border-dashed border-border bg-secondary/50 font-mono text-3xl font-black text-muted-foreground" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-2 block font-mono text-sm font-black uppercase">{p.title}</span>
              <span className="mt-1 flex items-center gap-2">
                <Badge variant="outline">{p.year}</Badge>
                {p.tags.map((t) => (
                  <span key={t} className="font-mono text-[10px] uppercase text-muted-foreground">{t}</span>
                ))}
              </span>
            </button>
          </li>
        ))}
      </ul>
      {active && (
        <div role="dialog" aria-modal="true" aria-label={active.title} className="rounded-lg border-2 border-accent bg-card p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-mono text-lg font-black uppercase">{active.title}</h3>
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{active.tags.join(" · ")}</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => setLightbox(null)}>Close</Button>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Full case study on request. Timeline, constraints, and the three decisions that mattered.</p>
        </div>
      )}
      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Like the tickets? Commission the next one.</p>
          {sent ? (
            <p role="status" className="font-mono text-xs font-bold uppercase text-accent">Brief received.</p>
          ) : (
            <form
              className="flex gap-2"
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            >
              <Input placeholder="Email for brief" type="email" aria-label="Email for brief" className="w-48" />
              <Button type="submit" size="sm">Send</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
