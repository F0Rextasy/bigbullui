"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const CLASSES = [
  { id: "g1", name: "Boxing Basics", coach: "Kaya", day: "Mon", time: "18:00", spots: 4 },
  { id: "g2", name: "HIIT 45", coach: "Demir", time: "19:30", day: "Mon", spots: 0 },
  { id: "g3", name: "Yoga Flow", coach: "Aydin", time: "08:00", day: "Tue", spots: 6 },
  { id: "g4", name: "Spin Class", coach: "Kaya", time: "18:00", day: "Wed", spots: 2 },
  { id: "g5", name: "Strength", coach: "Demir", time: "19:30", day: "Thu", spots: 5 },
  { id: "g6", name: "Open Mat", coach: "All", time: "10:00", day: "Sat", spots: 12 },
];

/** Gym schedule: weekly class grid + spot booking. */
export function BlockGym() {
  const [booked, setBooked] = React.useState<string[]>([]);

  return (
    <div className="w-full space-y-3">
      <div className="flex items-end justify-between">
        <h2 className="font-mono text-xl font-black uppercase tracking-tight">This week</h2>
        <Badge>{booked.length === 0 ? "No bookings" : `${booked.length} booked`}</Badge>
      </div>
      <ul className="space-y-2">
        {DAYS.map((d) => {
          const rows = CLASSES.filter((c) => c.day === d);
          if (rows.length === 0) return null;
          return (
            <li key={d}>
              <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{d}</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {rows.map((c) => {
                  const isBooked = booked.includes(c.id);
                  const full = c.spots === 0;
                  return (
                    <li key={c.id}>
                      <Card className={isBooked ? "border-accent" : undefined}>
                        <CardContent className="flex items-center justify-between gap-3 p-3">
                          <div>
                            <p className="font-mono text-sm font-black uppercase">{c.name}</p>
                            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                              {c.time} · {c.coach} · {full ? "waitlist" : `${c.spots} spots`}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant={isBooked ? "default" : "outline"}
                            disabled={full && !isBooked}
                            onClick={() => setBooked((b) => (isBooked ? b.filter((x) => x !== c.id) : [...b, c.id]))}
                          >
                            {isBooked ? "In" : full ? "Full" : "Book"}
                          </Button>
                        </CardContent>
                      </Card>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
