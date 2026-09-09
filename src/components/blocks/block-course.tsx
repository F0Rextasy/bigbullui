"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const MODULES = [
  { id: "m1", title: "Week 1 · Foundations", lessons: ["Setup & tokens", "First component", "Dark mode"] },
  { id: "m2", title: "Week 2 · Composition", lessons: ["Layouts", "Blocks", "State patterns"] },
  { id: "m3", title: "Week 3 · Ship", lessons: ["Build & publish", "Docs", "Growth loops"] },
];

/** Course page: syllabus accordion + instructor + enroll CTA. */
export function BlockCourse() {
  const [open, setOpen] = React.useState<string | null>("m1");
  const [enrolled, setEnrolled] = React.useState(false);

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Cohort 07 · starts Monday</p>
          <h2 className="mt-1 font-mono text-2xl font-black uppercase tracking-tight">Ship interfaces in 3 weeks</h2>
        </div>
        <Badge variant="accent">12 seats left</Badge>
      </div>
      <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-accent font-mono text-sm font-black text-accent" aria-hidden="true">AB</span>
        <div>
          <p className="font-mono text-sm font-bold">Ada Bull</p>
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Ships tickets, teaches grids</p>
        </div>
      </div>
      <Accordion defaultValue={open ?? undefined} className="w-full">
        {MODULES.map((m) => (
          <AccordionItem key={m.id} value={m.id}>
            <AccordionTrigger isOpen={open === m.id} contentId={`${m.id}-body`}>
              <span onClick={() => setOpen(open === m.id ? null : m.id)}>{m.title}</span>
            </AccordionTrigger>
            <AccordionContent isOpen={open === m.id} contentId={`${m.id}-body`}>
              <ul className="list-inside list-disc space-y-1">
                {m.lessons.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {enrolled ? (
        <p role="status" className="rounded-lg border border-accent bg-accent/10 p-3 text-center font-mono text-xs font-bold uppercase tracking-wider text-accent">
          Enrolled. Check your inbox for the gate pass.
        </p>
      ) : (
        <Button className="w-full" onClick={() => setEnrolled(true)}>
          Enroll — $149
        </Button>
      )}
    </div>
  );
}
