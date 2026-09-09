"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

const CARS = [
  { id: "c1", name: "City Hatch", seats: 4, price: 55, tag: "Eco" },
  { id: "c2", name: "Family Wagon", seats: 5, price: 80, tag: "Popular" },
  { id: "c3", name: "Roadster", seats: 2, price: 150, tag: "Fun" },
];

function daysBetween(a: string, b: string): number {
  if (!a || !b) return 0;
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return ms > 0 ? Math.round(ms / 86400000) : 0;
}

/** Car rental: dates + car cards + price summary. */
export function BlockCarRental() {
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [carId, setCarId] = React.useState("c2");
  const [done, setDone] = React.useState(false);

  const days = daysBetween(from, to);
  const car = CARS.find((c) => c.id === carId) ?? CARS[0];
  const total = days * car.price;
  const ready = days > 0;

  if (done) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center gap-2 p-8 text-center">
          <Badge variant="accent">Keys ready</Badge>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">{car.name}</h2>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {from} → {to} · {days} days · ${total}
          </p>
          <Button variant="outline" size="sm" onClick={() => setDone(false)}>
            Change car
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="space-y-4 p-6">
        <h2 className="font-mono text-xl font-black uppercase tracking-tight">Rent a car</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Pick-up</span>
            <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} aria-label="Pick-up date" />
          </label>
          <label className="block">
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Return</span>
            <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} aria-label="Return date" />
          </label>
        </div>
        <div className="grid gap-2 sm:grid-cols-3" role="group" aria-label="Cars">
          {CARS.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={carId === c.id}
              onClick={() => setCarId(c.id)}
              className={`rounded-md border p-3 text-start transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${carId === c.id ? "border-accent bg-accent/10" : "border-dashed border-border hover:border-foreground"}`}
            >
              <span className="flex items-center justify-between">
                <span className="font-mono text-sm font-black">{c.name}</span>
                <Badge variant="outline">{c.tag}</Badge>
              </span>
              <span className="mt-1 block font-mono text-[10px] uppercase text-muted-foreground">{c.seats} seats · ${c.price}/day</span>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between border-t-2 border-dashed border-border pt-3">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground" aria-live="polite">
            {ready ? `${days} days · ${car.name}` : "Pick dates to price the trip"}
          </p>
          <Button disabled={!ready} onClick={() => setDone(true)}>
            {ready ? `Reserve $${total}` : "Reserve"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
