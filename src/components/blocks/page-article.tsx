"use client";

import * as React from "react";
import { Badge } from "../ui/badge";
import { Avatar } from "../ui/avatar";
import { Toc } from "../ui/toc";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const HEADINGS = [
  { id: "doors", text: "Doors and entry flow", level: 2 as const },
  { id: "tiers", text: "Choosing a tier", level: 2 as const },
  { id: "encore", text: "The encore ballot", level: 2 as const },
];

export function PageArticle() {
  return (
    <div className="w-full space-y-6">
      <div className="min-w-0 space-y-2">
        <div className="flex flex-wrap gap-2">
          <Badge variant="accent">GUIDES</Badge>
          <Badge variant="outline">6 MIN READ</Badge>
        </div>
        <h1 className="font-mono text-2xl font-black uppercase tracking-tight sm:text-3xl">How we stamp 5,000 stubs a night</h1>
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">BY ADA BULL // FILED DEC 12</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <article className="min-w-0 space-y-6 lg:col-span-2">
          <section id="doors" className="space-y-2">
            <h2 className="font-mono text-sm font-black uppercase tracking-wider">Doors and entry flow</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">Gates open ninety minutes before curtain. Each lane scans, stamps, and tears in one motion so the queue never stalls past the lobby reel.</p>
            <p className="text-sm leading-relaxed text-muted-foreground">Holders with reissued barcodes enter through lane two, where agents verify the serial against the nightly ledger.</p>
          </section>
          <section id="tiers" className="space-y-2">
            <h2 className="font-mono text-sm font-black uppercase tracking-wider">Choosing a tier</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">General keeps the floor loud, orchestra keeps sightlines clean, and the box keeps the evening calm. Pick the tier that matches the night planned.</p>
          </section>
          <section id="encore" className="space-y-2">
            <h2 className="font-mono text-sm font-black uppercase tracking-wider">The encore ballot</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">Torn stub halves become ballots. The crew counts them during intermission and the winning song closes the show.</p>
          </section>
        </article>
        <div className="min-w-0 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contents</CardTitle>
            </CardHeader>
            <CardContent>
              <Toc headings={HEADINGS} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Author</CardTitle>
            </CardHeader>
            <CardContent className="flex items-start gap-3">
              <Avatar name="Ada Bull" size="md" />
              <div className="min-w-0">
                <p className="font-mono text-xs font-bold uppercase">Ada Bull</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Box office lead. Stamps first, counts later, writes on Sundays.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
