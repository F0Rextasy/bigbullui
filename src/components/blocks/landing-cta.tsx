"use client";

import * as React from "react";
import { cn } from "../ui/lib/utils";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export interface LandingCtaProps extends React.HTMLAttributes<HTMLElement> {
  onAction?: (action: string) => void;
}

export function LandingCta({ className, onAction, ...props }: LandingCtaProps) {
  const [notice, setNotice] = React.useState<string | null>(null);
  return (
    <section className={cn("w-full rounded-lg border-2 border-foreground bg-primary p-10 text-center text-primary-foreground outline-1 outline-dashed outline-offset-[-7px]", className)} {...props}>
      <Badge variant="outline" className="mx-auto border-primary-foreground/50 text-primary-foreground">FINAL CALL</Badge>
      <h2 className="mx-auto mt-3 max-w-xl font-mono text-3xl font-black uppercase tracking-tight sm:text-4xl">Open the gates tonight</h2>
      <p className="mx-auto mt-2 max-w-md text-sm opacity-80">Install once, print forever. Your first stub ships in under five minutes.</p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <Button size="lg" variant="secondary" onClick={() => { setNotice("Starting quick install..."); onAction?.("start-printing"); }}>Start printing</Button>
        <Button size="lg" variant="outline" className="border-primary-foreground/50 text-primary-foreground" onClick={() => { setNotice("Opening booth contact..."); onAction?.("talk-booth"); }}>Talk to the booth</Button>
      </div>
      {notice && <p role="status" className="mt-3 font-mono text-[10px] uppercase tracking-widest opacity-90">{notice}</p>}
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] opacity-60">NO TICKETMASTER FEES // EVER</p>
    </section>
  );
}
