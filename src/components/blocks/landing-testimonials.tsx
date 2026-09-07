"use client";

import * as React from "react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar } from "../ui/avatar";

const QUOTES = [
  { name: "Mira Chen", role: "FRONTEND LEAD // NOVA", stars: 5, body: "Swapped our kit in a weekend. The gate team thought we hired a print shop." },
  { name: "Jon Reyes", role: "INDIE HACKER", stars: 5, body: "Zero deps is real. Vendor, tweak tokens, ship. tsc stayed green the whole time." },
  { name: "Sena Park", role: "DESIGN ENG // COPPER", stars: 4, body: "The night-stub theme made our admin panel feel like a backstage pass." },
];

export function LandingTestimonials() {
  return (
    <section className="w-full space-y-6">
      <div className="space-y-2 text-center">
        <Badge variant="accent" className="mx-auto">WORD AT THE GATE</Badge>
        <h2 className="font-mono text-3xl font-black uppercase tracking-tight">Crews keep the stubs</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {QUOTES.map((quote) => (
          <Card key={quote.name}>
            <CardHeader>
              <div className="flex items-center gap-1" aria-label={`${quote.stars} of 5 stars`}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index} className={`text-sm ${index < quote.stars ? "text-accent" : "text-muted-foreground"}`}>★</span>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">“{quote.body}”</p>
              <div className="flex items-center gap-3 border-t border-dashed border-border pt-3">
                <Avatar name={quote.name} size="sm" />
                <div>
                  <p className="font-mono text-xs font-black uppercase">{quote.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{quote.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
