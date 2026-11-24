"use client";

import * as React from "react";
import { cn } from "../ui/lib/utils";
import { Button } from "../ui/button";
import { MetricCard } from "../ui/metric-card";
import { TeamGrid } from "../ui/team-grid";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PageHeader } from "../ui/page-header";

const DEFAULT_TEAM = [
  { id: "ada", name: "Ada Bull", role: "Box office lead" },
  { id: "grace", name: "Grace Hopper", role: "Stub designer" },
  { id: "alan", name: "Alan Turing", role: "Gate systems" },
];

export interface PageAboutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    title?: string;
  subtitle?: string;
  team?: typeof DEFAULT_TEAM;
  onAction?: (action: string) => void;
}

export function PageAbout({ title, team = DEFAULT_TEAM, className, onAction, ...props }: PageAboutProps) {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div className={cn("w-full space-y-6", className)} {...props}>
      <PageHeader
        eyebrow="HOUSE // OUR STORY"
        title="Paper first, always"
        description="A box office crew keeping admission tactile since 2019."
        actions={
          <Button size="sm" variant="outline" onClick={() => { setExpanded((v) => !v); onAction?.("read-manifesto"); }}>
            {expanded ? "Hide manifesto" : "Read manifesto"}
          </Button>
        }
      />
      {expanded && (
        <p role="status" className="rounded-md border border-dashed border-accent bg-accent/10 p-4 font-mono text-xs uppercase tracking-wider text-foreground">
          Paper outlives apps. Keep edges sharp, labels clear, and tokens honest.
        </p>
      )}
      <Card>
        <CardHeader>
          <CardTitle>{title ?? "The story so far"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>We started with one folding table, a rubber stamp, and a spool of numbered stubs. Every show sold out, so we built tooling that keeps the paper ritual while the ledger stays exact.</p>
          <p>Today twelve halls run on the same double frame: solid outer border, dashed inner outline, and a stamp that means the seat is truly yours.</p>
        </CardContent>
      </Card>
      <div className="grid gap-4 sm:grid-cols-3">
        <MetricCard title="STUBS STAMPED" value="1.2M" trend={{ value: "+9.4%", direction: "up", label: "THIS SEASON" }} periodLabel="SINCE 2019" sparklineData={[12, 18, 22, 30, 38, 44, 52, 60]} />
        <MetricCard title="HALLS SERVED" value="12" trend={{ value: "+2", direction: "up", label: "THIS YEAR" }} periodLabel="AND COUNTING" sparklineData={[4, 5, 6, 7, 8, 10, 11, 12]} />
        <MetricCard title="NO-SHOW RATE" value="0.6%" trend={{ value: "-0.2%", direction: "down", label: "VS LAST YEAR" }} periodLabel="ROLLING 90 DAYS" sparklineTone="muted" sparklineData={[9, 8, 8, 7, 6, 6, 5, 4]} />
      </div>
      <div className="min-w-0">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">THE CREW</p>
        <TeamGrid members={team} columns={3} />
      </div>
    </div>
  );
}
