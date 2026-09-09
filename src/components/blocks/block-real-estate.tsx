"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

const LISTINGS = [
  { id: "KX-101", title: "Corner Loft", area: "Karakoy", price: "$1,850/mo", beds: 2, baths: 1, size: 95 },
  { id: "KX-204", title: "Garden Flat", area: "Moda", price: "$1,200/mo", beds: 1, baths: 1, size: 70 },
  { id: "KX-318", title: "Bosphorus View", area: "Bebek", price: "$3,400/mo", beds: 3, baths: 2, size: 140 },
  { id: "KX-422", title: "Studio Box", area: "Kadikoy", price: "$800/mo", beds: 1, baths: 1, size: 45 },
];

/** Real-estate showcase: filterable listing grid + detail drawer. */
export function BlockRealEstate() {
  const [query, setQuery] = React.useState("");
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const results = LISTINGS.filter(
    (l) => !query || `${l.title} ${l.area}`.toLowerCase().includes(query.toLowerCase())
  );
  const active = LISTINGS.find((l) => l.id === activeId) ?? null;

  return (
    <div className="w-full space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-mono text-xl font-black uppercase tracking-tight">Listings</h2>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search area or title..."
          aria-label="Search listings"
          className="max-w-56"
        />
      </div>
      {results.length === 0 ? (
        <p role="status" className="rounded-lg border border-dashed border-border p-6 text-center font-mono text-xs uppercase tracking-wider text-muted-foreground">
          No flats match. Try another area.
        </p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {results.map((l) => (
            <li key={l.id}>
              <Card className={activeId === l.id ? "border-accent" : undefined}>
                <CardContent className="space-y-2 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-sm font-black uppercase">{l.title}</p>
                    <Badge variant="outline">{l.id}</Badge>
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {l.area} · {l.beds} bd · {l.baths} ba · {l.size} m²
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-sm font-bold tabular-nums text-accent">{l.price}</p>
                    <Button size="sm" variant={activeId === l.id ? "default" : "outline"} onClick={() => setActiveId(activeId === l.id ? null : l.id)}>
                      {activeId === l.id ? "Close" : "Details"}
                    </Button>
                  </div>
                  {active && active.id === l.id && (
                    <p className="rounded-sm border border-dashed border-border bg-secondary/50 p-2 text-xs text-muted-foreground">
                      Viewing {active.title}. Deposit equals one month. Pets negotiable, balcony guaranteed.
                    </p>
                  )}
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
