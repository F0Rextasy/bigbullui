"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

const SLOTS = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];
const TABLES = [
  { id: "W1", seats: 2, area: "Window" },
  { id: "W2", seats: 2, area: "Window" },
  { id: "C1", seats: 4, area: "Center" },
  { id: "C2", seats: 4, area: "Center" },
  { id: "C3", seats: 6, area: "Center" },
  { id: "P1", seats: 8, area: "Private" },
];

/** Restaurant reservation: date + slot + party size + table pick + ticket. */
export function BlockRestaurant() {
  const [date, setDate] = React.useState("");
  const [slot, setSlot] = React.useState(SLOTS[2]);
  const [party, setParty] = React.useState(2);
  const [table, setTable] = React.useState("C1");
  const [booked, setBooked] = React.useState(false);

  const fitting = TABLES.filter((t) => t.seats >= party);
  const active = fitting.some((t) => t.id === table) ? table : (fitting[0]?.id ?? "");

  if (booked) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center gap-2 p-8 text-center">
          <Badge variant="accent">Reserved</Badge>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">Table {active}</h2>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {party} guests · {date || "tonight"} · {slot}
          </p>
          <p className="text-sm text-muted-foreground">Show this stub at the door. Kitchen closes 23:00.</p>
          <Button variant="outline" size="sm" onClick={() => setBooked(false)}>
            Change booking
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-xl font-black uppercase tracking-tight">Reserve a table</h2>
          <Badge>Bistro stub</Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="block">
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Date</span>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} aria-label="Reservation date" />
          </label>
          <div>
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Party</span>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => setParty((p) => Math.max(1, p - 1))} aria-label="Fewer guests">−</Button>
              <span className="min-w-8 text-center font-mono text-sm font-bold tabular-nums" aria-live="polite">{party}</span>
              <Button size="sm" variant="outline" onClick={() => setParty((p) => Math.min(8, p + 1))} aria-label="More guests">+</Button>
            </div>
          </div>
          <div>
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Time</span>
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Time slots">
              {SLOTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={slot === s}
                  onClick={() => setSlot(s)}
                  className={`rounded-sm border px-2 py-1 font-mono text-[11px] tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${slot === s ? "border-accent bg-accent font-bold text-accent-foreground" : "border-dashed border-border text-muted-foreground hover:border-foreground hover:text-foreground"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Table · fits {party}</span>
          <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6" role="group" aria-label="Tables">
            {TABLES.map((t) => {
              const fits = t.seats >= party;
              const on = active === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  disabled={!fits}
                  aria-pressed={on}
                  onClick={() => setTable(t.id)}
                  className={`rounded-md border p-2 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-30 ${on ? "border-accent bg-accent/10" : "border-dashed border-border hover:border-foreground"}`}
                >
                  <span className="block font-mono text-sm font-black">{t.id}</span>
                  <span className="block font-mono text-[9px] uppercase text-muted-foreground">{t.seats} · {t.area}</span>
                </button>
              );
            })}
          </div>
        </div>
        <Button className="w-full" disabled={!active} onClick={() => setBooked(true)}>
          Book table {active} · {slot}
        </Button>
      </CardContent>
    </Card>
  );
}
