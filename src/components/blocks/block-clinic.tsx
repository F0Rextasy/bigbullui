"use client";

import * as React from "react";
import { cn } from "../ui/lib/utils";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

const DEFAULT_DOCTORS = [
  { id: "d1", name: "Dr. Elif Aydin", field: "Dermatology" },
  { id: "d2", name: "Dr. Mert Kaya", field: "Cardiology" },
  { id: "d3", name: "Dr. Zeynep Demir", field: "Pediatrics" },
];

const DEFAULT_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const DEFAULT_HOURS = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

/** Clinic booking: doctor pick + day/hour grid + confirmation stub. */
export interface BlockClinicProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    title?: string;
  subtitle?: string;
  doctors?: typeof DEFAULT_DOCTORS;
  days?: typeof DEFAULT_DAYS;
  hours?: typeof DEFAULT_HOURS;
  onAction?: (action: string) => void;
}

export function BlockClinic({ title, doctors = DEFAULT_DOCTORS, days = DEFAULT_DAYS, hours = DEFAULT_HOURS, className, onAction, ...props }: BlockClinicProps) {
  const [doctor, setDoctor] = React.useState(doctors[0].id);
  const [slot, setSlot] = React.useState<string | null>(null);
  const [done, setDone] = React.useState(false);

  const doc = doctors.find((d) => d.id === doctor) ?? doctors[0];
  const key = (d: string, h: string) => `${d} ${h}`;

  if (done && slot) {
    return (
      <Card className={cn("w-full", className)} {...props}>
        <CardContent className="flex flex-col items-center gap-2 p-8 text-center">
          <Badge variant="accent">Confirmed</Badge>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">{doc.name}</h2>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {doc.field} · {slot}
          </p>
          <p className="text-sm text-muted-foreground">Arrive 10 minutes early with your ID card.</p>
          <Button variant="outline" size="sm" onClick={() => { setDone(false); setSlot(null); }}>
            Reschedule
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardContent className="space-y-4 p-6">
        <h2 className="font-mono text-xl font-black uppercase tracking-tight">{title ?? "Book a visit"}</h2>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Doctors">
          {doctors.map((d) => (
            <button
              key={d.id}
              type="button"
              aria-pressed={doctor === d.id}
              onClick={() => { setDoctor(d.id); setSlot(null); }}
              className={`rounded-md border px-3 py-2 text-start transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${doctor === d.id ? "border-accent bg-accent/10" : "border-dashed border-border hover:border-foreground"}`}
            >
              <span className="block font-mono text-xs font-bold">{d.name}</span>
              <span className="block font-mono text-[10px] uppercase text-muted-foreground">{d.field}</span>
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-center">
            <thead>
              <tr>
                <th className="p-1" aria-hidden="true" />
                {days.map((d) => (
                  <th key={d} className="p-1 font-mono text-[10px] uppercase text-muted-foreground">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map((h) => (
                <tr key={h}>
                  <th className="p-1 font-mono text-[10px] tabular-nums text-muted-foreground">{h}</th>
                  {days.map((d) => {
                    const k = key(d, h);
                    const on = slot === k;
                    return (
                      <td key={k} className="p-1">
                        <button
                          type="button"
                          aria-pressed={on}
                          aria-label={`${d} ${h} with ${doc.name}`}
                          onClick={() => setSlot(k)}
                          className={`size-7 rounded-sm border font-mono text-[10px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${on ? "border-accent bg-accent font-bold text-accent-foreground" : "border-dashed border-border hover:border-accent hover:text-accent"}`}
                        >
                          {on ? "✓" : "+"}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button className="w-full" disabled={!slot} onClick={() => { setDone(true); onAction?.("confirm-visit"); }}>
          {slot ? `Confirm ${slot}` : "Pick a slot"}
        </Button>
      </CardContent>
    </Card>
  );
}
