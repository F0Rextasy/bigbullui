"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export function LandingCta() {
  return (
    <section className="w-full rounded-lg border-2 border-foreground bg-primary p-10 text-center text-primary-foreground outline-1 outline-dashed outline-offset-[-7px]">
      <Badge variant="outline" className="mx-auto border-primary-foreground/50 text-primary-foreground">FINAL CALL</Badge>
      <h2 className="mx-auto mt-3 max-w-xl font-mono text-3xl font-black uppercase tracking-tight sm:text-4xl">Open the gates tonight</h2>
      <p className="mx-auto mt-2 max-w-md text-sm opacity-80">Install once, print forever. Your first stub ships in under five minutes.</p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <Button size="lg" variant="secondary">Start printing</Button>
        <Button size="lg" variant="outline" className="border-primary-foreground/50 text-primary-foreground">Talk to the booth</Button>
      </div>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] opacity-60">NO TICKETMASTER FEES // EVER</p>
    </section>
  );
}
