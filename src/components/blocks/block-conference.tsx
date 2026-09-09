"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

const SPEAKERS = [
  { id: "s1", name: "Ada Bull", talk: "Tickets as interfaces", time: "10:00" },
  { id: "s2", name: "Can Marquee", talk: "Motion with meaning", time: "11:30" },
  { id: "s3", name: "Elif Grid", talk: "Dashboards people read", time: "14:00" },
];

const PROGRAM = [
  { time: "09:00", what: "Doors + coffee" },
  { time: "10:00", what: "Keynotes" },
  { time: "12:30", what: "Lunch + demos" },
  { time: "17:00", what: "Afterparty" },
];

/** Conference page: speakers + program + ticket CTA. */
export function BlockConference() {
  const [tier, setTier] = React.useState("Standard");
  const [claimed, setClaimed] = React.useState(false);

  return (
    <div className="w-full space-y-4">
      <div className="rounded-lg border-2 border-foreground bg-card p-6 text-center shadow-md outline-1 outline-dashed outline-offset-[-5px] outline-border">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">One day · single track</p>
        <h2 className="mt-1 font-mono text-3xl font-black uppercase tracking-tight">Stubconf 2026</h2>
        <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">400 seats · no recordings, be there</p>
      </div>
      <div>
        <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Speakers</p>
        <ul className="grid gap-2 sm:grid-cols-3">
          {SPEAKERS.map((s) => (
            <li key={s.id}>
              <Card>
                <CardContent className="p-4 text-center">
                  <span className="mx-auto flex size-11 items-center justify-center rounded-full border-2 border-dashed border-accent font-mono text-sm font-black text-accent" aria-hidden="true">
                    {s.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <p className="mt-2 font-mono text-sm font-black uppercase">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.talk}</p>
                  <p className="mt-1 font-mono text-[10px] tabular-nums text-accent">{s.time}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Program</p>
        <ol className="space-y-1.5">
          {PROGRAM.map((p) => (
            <li key={p.time} className="flex items-center gap-3 rounded-md border border-dashed border-border px-3 py-2">
              <span className="font-mono text-xs font-bold tabular-nums text-accent">{p.time}</span>
              <span className="text-sm">{p.what}</span>
            </li>
          ))}
        </ol>
      </div>
      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
          <div className="flex gap-1.5" role="group" aria-label="Ticket tier">
            {["Standard", "Workshop", "Patron"].map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={tier === t}
                onClick={() => setTier(t)}
                className={`rounded-sm border px-2.5 py-1.5 font-mono text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${tier === t ? "border-accent bg-accent font-bold text-accent-foreground" : "border-dashed border-border text-muted-foreground hover:border-foreground hover:text-foreground"}`}
              >
                {t}
              </button>
            ))}
          </div>
          {claimed ? (
            <p role="status" className="font-mono text-xs font-bold uppercase text-accent">Pass claimed. See you at doors.</p>
          ) : (
            <Button onClick={() => setClaimed(true)}>Claim {tier} pass</Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
