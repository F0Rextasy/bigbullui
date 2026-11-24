"use client";

import * as React from "react";
import { cn } from "../ui/lib/utils";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export interface LandingStatItem {
  value: string;
  label: string;
}

const DEFAULT_STATS: LandingStatItem[] = [
  { value: "500+", label: "COMPONENTS" },
  { value: "0", label: "DEPENDENCIES" },
  { value: "MIT", label: "LICENSE" },
];

export interface LandingHeroProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  badgeText?: string;
  heading?: React.ReactNode;
  description?: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  stats?: LandingStatItem[];
  tickerText?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  onAction?: (action: string) => void;
}

export function LandingHero({
  eyebrow = "NOW PRINTING // 500+ STUB COMPONENTS",
  badgeText = "ZERO DEPENDENCIES // MIT",
  heading,
  description = "Copy-paste React components with perforated edges, stamp seals, and turnstile counters. React 19, Tailwind 4, code you own.",
  primaryActionLabel = "Browse components",
  secondaryActionLabel = "Read the docs",
  stats = DEFAULT_STATS,
  tickerText = "ADMIT ONE // ADMIT ONE // ADMIT ONE // ADMIT ONE",
  onPrimaryAction,
  onSecondaryAction,
  className,
  onAction,
  ...props
}: LandingHeroProps) {
  const [selected, setSelected] = React.useState<string | null>(null);
  return (
    <section
      className={cn("w-full overflow-hidden rounded-lg border-2 border-foreground bg-card", className)}
      {...props}
    >
      <div className="border-b-2 border-dashed border-border bg-secondary/40 px-4 py-2 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
        {eyebrow}
      </div>
      <div className="space-y-5 px-6 py-12 text-center sm:px-12">
        <Badge variant="accent" className="mx-auto">
          {badgeText}
        </Badge>
        <h2 className="mx-auto max-w-2xl font-mono text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl">
          {heading ?? (
            <>
              Print the night with{" "}
              <span className="bg-accent px-2 text-accent-foreground">ticket stubs</span>
            </>
          )}
        </h2>
        <p className="mx-auto max-w-xl text-sm text-muted-foreground sm:text-base">{description}</p>
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            size="lg"
            onClick={() => {
              setSelected("Opening component catalog...");
              onPrimaryAction?.();
              onAction?.("browse-components");
            }}
          >
            {primaryActionLabel}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              setSelected("Opening installation docs...");
              onSecondaryAction?.();
              onAction?.("read-docs");
            }}
          >
            {secondaryActionLabel}
          </Button>
        </div>
        {selected && (
          <p role="status" className="font-mono text-[10px] uppercase tracking-widest text-accent">
            {selected}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2 font-mono text-xs">
          {stats.map((stat) => (
            <span key={stat.label}>
              <strong className="text-lg font-black">{stat.value}</strong>{" "}
              <span className="text-muted-foreground">{stat.label}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="overflow-hidden border-t-2 border-dashed border-border bg-primary py-2 text-primary-foreground">
        <p className="whitespace-nowrap text-center font-mono text-xs font-bold uppercase tracking-[0.3em]">
          {tickerText}
        </p>
      </div>
    </section>
  );
}
