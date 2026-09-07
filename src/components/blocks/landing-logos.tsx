"use client";

import * as React from "react";

const LOGOS = ["NOVA", "COPPER", "VELVET", "DUNE", "HALO", "ORBIT", "PULSE", "EMBER"];

export function LandingLogos() {
  return (
    <section className="w-full space-y-4 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">TRUSTED AT VENUES RUNNING</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {LOGOS.map((logo) => (
          <div key={logo} className="rounded-md border-2 border-dashed border-border bg-card px-4 py-3 transition-colors hover:border-foreground">
            <span className="font-mono text-sm font-black uppercase tracking-[0.2em]">{logo}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
