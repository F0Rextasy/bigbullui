"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

const PETS = [
  { id: "a1", name: "Boncuk", kind: "Cat", age: "2y", trait: "Lap professional" },
  { id: "a2", name: "Zeytin", kind: "Dog", age: "8mo", trait: "Fetch champion" },
  { id: "a3", name: "Mırnav", kind: "Cat", age: "4y", trait: "Sunbeam hunter" },
  { id: "a4", name: "Fındık", kind: "Rabbit", age: "1y", trait: "Carrot critic" },
];

const KINDS = ["All", "Cat", "Dog", "Rabbit"];

/** Pet adoption: filterable animal cards + application flow. */
export function BlockPetAdoption() {
  const [kind, setKind] = React.useState("All");
  const [applied, setApplied] = React.useState<string[]>([]);

  const results = PETS.filter((p) => kind === "All" || p.kind === kind);

  return (
    <div className="w-full space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-mono text-xl font-black uppercase tracking-tight">Adopt, do not shop</h2>
        <div className="flex gap-1.5" role="group" aria-label="Animal kind">
          {KINDS.map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
              className={`rounded-sm border px-2 py-1 font-mono text-[10px] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${kind === k ? "border-accent bg-accent font-bold text-accent-foreground" : "border-dashed border-border text-muted-foreground hover:border-foreground hover:text-foreground"}`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {results.map((p) => {
          const done = applied.includes(p.id);
          return (
            <li key={p.id}>
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-accent font-mono text-lg font-black text-accent" aria-hidden="true">
                    {p.name.slice(0, 1)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-sm font-black uppercase">{p.name} <span className="font-normal normal-case text-muted-foreground">· {p.age}</span></p>
                    <p className="truncate text-xs text-muted-foreground">{p.trait}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <Badge variant={done ? "accent" : "outline"}>{done ? "Applied" : p.kind}</Badge>
                    <Button size="sm" variant="outline" disabled={done} onClick={() => setApplied((a) => [...a, p.id])}>
                      {done ? "Sent" : "Adopt"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
