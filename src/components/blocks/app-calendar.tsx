"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const DAYS = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
const CELLS: ({ day: number; events?: string[] } | null)[] = [
  null, null, { day: 1, events: ["DOORS 19:30"] }, { day: 2 }, { day: 3, events: ["SOUNDCHECK"] },
  { day: 4 }, { day: 5, events: ["MAIN SHOW", "AFTERPARTY"] },
  { day: 6 }, { day: 7 }, { day: 8, events: ["MATINEE"] }, { day: 9 }, { day: 10 },
  { day: 11 }, { day: 12, events: ["VIP NIGHT"] },
];

export function AppCalendar() {
  const [selected, setSelected] = React.useState(5);
  return (
    <div className="grid w-full gap-4 xl:grid-cols-3">
      <Card className="xl:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>June 2026</CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">Prev</Button>
              <Button size="sm" variant="outline">Next</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1.5">
            {DAYS.map((day) => (
              <p key={day} className="pb-1 text-center font-mono text-[10px] font-black uppercase tracking-widest text-muted-foreground">{day}</p>
            ))}
            {CELLS.map((cell, index) => (
              cell === null ? (
                <span key={`blank-${index}`} className="min-h-20 rounded-md bg-secondary/30" />
              ) : (
                <button
                  key={cell.day}
                  type="button"
                  onClick={() => setSelected(cell.day)}
                  className={`min-h-20 cursor-pointer rounded-md border p-1.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selected === cell.day ? "border-foreground bg-primary text-primary-foreground" : "border-dashed border-border bg-card hover:border-foreground"}`}
                >
                  <span className="font-mono text-xs font-black">{String(cell.day).padStart(2, "0")}</span>
                  <span className="mt-1 block space-y-1">
                    {(cell.events ?? []).map((event) => (
                      <span key={event} className="block truncate rounded-sm bg-accent px-1 py-0.5 font-mono text-[9px] font-bold text-accent-foreground">{event}</span>
                    ))}
                  </span>
                </button>
              )
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Day stub</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Badge variant="accent">JUN {String(selected).padStart(2, "0")}{" // MAIN SHOW"}</Badge>
          <p className="text-sm text-muted-foreground">Doors 19:30. Support act 20:15. Headliner 21:30. Curfew 23:30.</p>
          <div className="flex gap-2">
            <Button size="sm">Add event</Button>
            <Button size="sm" variant="outline">Clear day</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
