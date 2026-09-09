"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

const ROOMS = [
  { id: "r1", name: "Attic Single", price: 90, beds: 1 },
  { id: "r2", name: "Courtyard Double", price: 140, beds: 2 },
  { id: "r3", name: "Roof Suite", price: 260, beds: 3 },
];

function nightsBetween(a: string, b: string): number {
  if (!a || !b) return 0;
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return ms > 0 ? Math.round(ms / 86400000) : 0;
}

/** Hotel booking: date range + room cards + stay summary. */
export function BlockHotel() {
  const [checkIn, setCheckIn] = React.useState("");
  const [checkOut, setCheckOut] = React.useState("");
  const [roomId, setRoomId] = React.useState("r2");
  const [done, setDone] = React.useState(false);

  const nights = nightsBetween(checkIn, checkOut);
  const room = ROOMS.find((r) => r.id === roomId) ?? ROOMS[0];
  const total = nights * room.price;
  const ready = nights > 0;

  if (done) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center gap-2 p-8 text-center">
          <Badge variant="accent">Booked</Badge>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">{room.name}</h2>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {checkIn} → {checkOut} · {nights} nights · ${total}
          </p>
          <Button variant="outline" size="sm" onClick={() => setDone(false)}>
            Modify stay
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="space-y-4 p-6">
        <h2 className="font-mono text-xl font-black uppercase tracking-tight">Book your stay</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Check-in</span>
            <Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} aria-label="Check-in date" />
          </label>
          <label className="block">
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Check-out</span>
            <Input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} aria-label="Check-out date" />
          </label>
        </div>
        <div className="grid gap-2 sm:grid-cols-3" role="group" aria-label="Rooms">
          {ROOMS.map((r) => (
            <button
              key={r.id}
              type="button"
              aria-pressed={roomId === r.id}
              onClick={() => setRoomId(r.id)}
              className={`rounded-md border p-3 text-start transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${roomId === r.id ? "border-accent bg-accent/10" : "border-dashed border-border hover:border-foreground"}`}
            >
              <span className="block font-mono text-sm font-black">{r.name}</span>
              <span className="block font-mono text-[10px] uppercase text-muted-foreground">{r.beds} bed · ${r.price}/night</span>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between border-t-2 border-dashed border-border pt-3">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground" aria-live="polite">
            {ready ? `${nights} nights · ${room.name}` : "Pick dates to price your stay"}
          </p>
          <Button disabled={!ready} onClick={() => setDone(true)}>
            {ready ? `Reserve $${total}` : "Reserve"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
