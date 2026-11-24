"use client";

import * as React from "react";
import { cn } from "../ui/lib/utils";

const DEFAULT_LOGOS = ["NOVA", "COPPER", "VELVET", "DUNE", "HALO", "ORBIT", "PULSE", "EMBER"];

export interface LandingLogosProps extends React.HTMLAttributes<HTMLElement> {
    logos?: typeof DEFAULT_LOGOS;
  onAction?: (action: string) => void;
}

export function LandingLogos({ logos = DEFAULT_LOGOS, className, onAction, ...props }: LandingLogosProps) {
  void onAction;
  return (
    <section className={cn("w-full space-y-4 text-center", className)} {...props}>
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">TRUSTED AT VENUES RUNNING</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {logos.map((logo) => (
          <div key={logo} className="rounded-md border-2 border-dashed border-border bg-card px-4 py-3 transition-colors hover:border-foreground">
            <span className="font-mono text-sm font-black uppercase tracking-[0.2em]">{logo}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
