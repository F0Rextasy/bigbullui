"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

const JOBS = [
  { id: "j1", title: "Frontend Engineer", team: "Box Office", type: "Full-time", location: "Remote", salary: "$90–120k" },
  { id: "j2", title: "Motion Designer", team: "Marquee", type: "Contract", location: "Istanbul", salary: "$60–80k" },
  { id: "j3", title: "Support Lead", team: "Desk", type: "Full-time", location: "Remote", salary: "$55–70k" },
  { id: "j4", title: "Data Analyst", team: "Ledger", type: "Part-time", location: "Berlin", salary: "$40–55k" },
];

const TYPES = ["All", "Full-time", "Contract", "Part-time"];

/** Job board: search + type filter + apply drawer. */
export function BlockJobBoard() {
  const [query, setQuery] = React.useState("");
  const [type, setType] = React.useState("All");
  const [openId, setOpenId] = React.useState<string | null>(null);
  const [applied, setApplied] = React.useState<string[]>([]);

  const results = JOBS.filter(
    (j) =>
      (type === "All" || j.type === type) &&
      (!query || `${j.title} ${j.team} ${j.location}`.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="w-full space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search roles..."
          aria-label="Search jobs"
          className="max-w-56 flex-1"
        />
        <div className="flex gap-1.5" role="group" aria-label="Employment type">
          {TYPES.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={type === t}
              onClick={() => setType(t)}
              className={`rounded-sm border px-2 py-1 font-mono text-[10px] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${type === t ? "border-accent bg-accent font-bold text-accent-foreground" : "border-dashed border-border text-muted-foreground hover:border-foreground hover:text-foreground"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      {results.length === 0 ? (
        <p role="status" className="rounded-lg border border-dashed border-border p-6 text-center font-mono text-xs uppercase tracking-wider text-muted-foreground">
          No roles match. Broaden the net.
        </p>
      ) : (
        <ul className="space-y-2">
          {results.map((j) => {
            const isOpen = openId === j.id;
            const isApplied = applied.includes(j.id);
            return (
              <li key={j.id}>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-mono text-sm font-black uppercase">{j.title}</p>
                        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                          {j.team} · {j.location} · {j.salary}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={isApplied ? "accent" : "outline"}>{isApplied ? "Applied" : j.type}</Badge>
                        <Button size="sm" variant={isOpen ? "default" : "outline"} onClick={() => setOpenId(isOpen ? null : j.id)}>
                          {isOpen ? "Close" : "View"}
                        </Button>
                      </div>
                    </div>
                    {isOpen && (
                      <div className="mt-3 space-y-2 border-t border-dashed border-border pt-3">
                        <p className="text-sm text-muted-foreground">
                          Own the {j.title.toLowerCase()} craft end to end. Ship weekly, write crisply, argue kindly. Two interviews, one paid trial day, offer within a week.
                        </p>
                        <Button
                          size="sm"
                          disabled={isApplied}
                          onClick={() => setApplied((a) => [...a, j.id])}
                        >
                          {isApplied ? "Application sent" : "Apply in one click"}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
