"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export function LandingHero() {
  return (
    <section className="w-full overflow-hidden rounded-lg border-2 border-foreground bg-card">
      <div className="border-b-2 border-dashed border-border bg-secondary/40 px-4 py-2 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
        NOW PRINTING // 500+ STUB COMPONENTS
      </div>
      <div className="space-y-5 px-6 py-12 text-center sm:px-12">
        <Badge variant="accent" className="mx-auto">ZERO DEPENDENCIES // MIT</Badge>
        <h2 className="mx-auto max-w-2xl font-mono text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl">
          Print the night with <span className="bg-accent px-2 text-accent-foreground">ticket stubs</span>
        </h2>
        <p className="mx-auto max-w-xl text-sm text-muted-foreground sm:text-base">
          Copy-paste React components with perforated edges, stamp seals, and turnstile counters. React 19, Tailwind 4, code you own.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Button size="lg">Browse components</Button>
          <Button size="lg" variant="outline">Read the docs</Button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2 font-mono text-xs">
          <span><strong className="text-lg font-black">500+</strong> <span className="text-muted-foreground">COMPONENTS</span></span>
          <span><strong className="text-lg font-black">0</strong> <span className="text-muted-foreground">DEPENDENCIES</span></span>
          <span><strong className="text-lg font-black">MIT</strong> <span className="text-muted-foreground">LICENSE</span></span>
        </div>
      </div>
      <div className="overflow-hidden border-t-2 border-dashed border-border bg-primary py-2 text-primary-foreground">
        <p className="whitespace-nowrap text-center font-mono text-xs font-bold uppercase tracking-[0.3em]">ADMIT ONE // ADMIT ONE // ADMIT ONE // ADMIT ONE</p>
      </div>
    </section>
  );
}
