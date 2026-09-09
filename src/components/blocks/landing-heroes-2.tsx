"use client";

import * as React from "react";
import { Badge } from "../ui/badge";
import { AnnouncementBar } from "../ui/announcement-bar";
import { Hero } from "../ui/hero";

const SHOT_ROWS = [
  { label: "GROSS TONIGHT", value: "$48,250" },
  { label: "STUBS SCANNED", value: "4,820" },
  { label: "GATE QUEUE", value: "312" },
];

export function LandingHeroes2() {
  return (
    <div className="w-full space-y-4">
      <AnnouncementBar
        variant="accent"
        badgeLabel="WINTER SEASON"
        title="Season stubs are live for all twelve halls"
        urgencyText="ENDS SUNDAY"
        actionLabel="Browse season"
        dismissible
      />
      <Hero
        title="Every seat tells a story"
        highlight="story"
        description="Box office tooling for venues that still stamp every stub by hand."
        primaryAction={{ label: "Start selling", href: "#start" }}
        secondaryAction={{ label: "View demo", href: "#demo" }}
        marqueeItems={["STAMPED", "VERIFIED", "ADMITTED", "ENCORE"]}
      />
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-dashed border-border px-4 py-2">
          <span className="size-2 rounded-full bg-border" aria-hidden="true" />
          <span className="size-2 rounded-full bg-border" aria-hidden="true" />
          <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
          <p className="ms-2 truncate font-mono text-[10px] uppercase tracking-widest text-muted-foreground">app.bigbull — nightly audit</p>
        </div>
        <div className="grid gap-3 p-4 sm:grid-cols-3">
          {SHOT_ROWS.map((row) => (
            <div key={row.label} className="min-w-0 rounded-md border border-dashed border-border bg-secondary p-4">
              <p className="truncate font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{row.label}</p>
              <p className="mt-1 font-mono text-xl font-black">{row.value}</p>
              <Badge variant="outline" className="mt-2">LIVE</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
