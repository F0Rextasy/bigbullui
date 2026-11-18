"use client";

import * as React from "react";
import { cn } from "../ui/lib/utils";
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

export interface AppCalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  onAction?: (action: string) => void;
}

const MONTHS = ["May 2026", "June 2026", "July 2026"];

export function AppCalendar({ className, onAction, ...props }: AppCalendarProps) {
  const [selected, setSelected] = React.useState(5);
  const [monthIdx, setMonthIdx] = React.useState(1);
  const [customEvents, setCustomEvents] = React.useState<Record<number, string[]>>({});
  const eventsFor = (day: number, base?: string[]) => [...(base ?? []), ...(customEvents[day] ?? [])];
  const selectedCell = CELLS.find((c) => c?.day === selected);
  const selectedEvents = eventsFor(selected, selectedCell?.events);
  return (
    <div className={cn("grid w-full gap-4 xl:grid-cols-3", className)} {...props}>
      <Card className="xl:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{MONTHS[monthIdx]}</CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => { setMonthIdx((i) => Math.max(0, i - 1)); onAction?.("prev-month"); }}>Prev</Button>
              <Button size="sm" variant="outline" onClick={() => { setMonthIdx((i) => Math.min(MONTHS.length - 1, i + 1)); onAction?.("next-month"); }}>Next</Button>
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
                  className={`min-h-20 cursor-pointer rounded-md border p-1.5 text-start transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selected === cell.day ? "border-foreground bg-primary text-primary-foreground" : "border-dashed border-border bg-card hover:border-foreground"}`}
                >
                  <span className="font-mono text-xs font-black">{String(cell.day).padStart(2, "0")}</span>
                  <span className="mt-1 block space-y-1">
                    {eventsFor(cell.day, cell.events).map((event) => (
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
          <Badge variant="accent">{MONTHS[monthIdx].slice(0, 3).toUpperCase()} {String(selected).padStart(2, "0")}{" // "}{selectedEvents[0] ?? "OPEN"}</Badge>
          <p className="text-sm text-muted-foreground">Doors 19:30. Support act 20:15. Headliner 21:30. Curfew 23:30.</p>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => { setCustomEvents((prev) => ({ ...prev, [selected]: [...(prev[selected] ?? []), "CHECK"] })); onAction?.("add-event"); }}>Add event</Button>
            <Button size="sm" variant="outline" onClick={() => { setCustomEvents((prev) => ({ ...prev, [selected]: [] })); onAction?.("clear-day"); }}>Clear day</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
