"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PageHeader } from "../ui/page-header";

const ROLES = [
  { id: "gate-agent", title: "Gate Agent", team: "BOX OFFICE", place: "HALL A // NIGHTS", type: "FULL TIME" },
  { id: "stub-designer", title: "Stub Designer", team: "DESIGN", place: "REMOTE // EU", type: "FULL TIME" },
  { id: "sound-tech", title: "Sound Technician", team: "STAGE CREW", place: "HALL B // WEEKENDS", type: "PART TIME" },
  { id: "support-lead", title: "Support Lead", team: "HELP DESK", place: "REMOTE // US", type: "FULL TIME" },
];

export function PageCareers() {
  const [selected, setSelected] = React.useState(ROLES[0].id);
  const [applied, setApplied] = React.useState(false);
  const current = ROLES.find((role) => role.id === selected) ?? ROLES[0];

  return (
    <div className="w-full space-y-6">
      <PageHeader
        eyebrow="CREW // OPEN ROLES"
        title="Join the box office"
        description="Four open counters. Pick a role and file an application."
        actions={<Button size="sm">Refer a friend</Button>}
      />
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="space-y-3 lg:col-span-3">
          {ROLES.map((role) => (
            <button
              key={role.id}
              type="button"
              onClick={() => { setSelected(role.id); setApplied(false); }}
              className={`w-full rounded-md border p-4 text-start transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selected === role.id ? "border-accent bg-card" : "border-dashed border-border bg-card hover:border-foreground/40"}`}
            >
              <span className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-sm font-bold uppercase">{role.title}</span>
                <Badge variant={selected === role.id ? "accent" : "outline"}>{role.type}</Badge>
              </span>
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{role.team}{" // "}{role.place}</span>
            </button>
          ))}
        </div>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Apply panel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="rounded-md border border-dashed border-border bg-secondary p-3 font-mono text-[11px] uppercase tracking-wider">
              Applying for {current.title}
            </p>
            <Input placeholder="Full name" aria-label="Applicant name" />
            <Input placeholder="Email for reply" aria-label="Applicant email" />
            <Textarea placeholder="Two lines on nights worked and stubs handled" aria-label="Cover note" />
            <Button size="sm" className="w-full" onClick={() => setApplied(true)}>
              {applied ? "Filed at counter" : `Apply for ${current.title}`}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
