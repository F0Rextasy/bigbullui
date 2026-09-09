"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { SeatMap, type SeatData } from "../ui/seat-map";

/** Event ticketing: seat map + cart stub + confirmation. */
export function BlockEventTicketing() {
  const [seats, setSeats] = React.useState<SeatData[]>([]);
  const [total, setTotal] = React.useState(0);
  const [paid, setPaid] = React.useState(false);

  if (paid) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center gap-2 p-8 text-center">
          <Badge variant="accent">Admit {seats.length}</Badge>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">You are in</h2>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {seats.map((s) => s.id).join(", ")} · ${total}
          </p>
          <Button variant="outline" size="sm" onClick={() => { setPaid(false); setSeats([]); setTotal(0); }}>
            Buy more
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full space-y-3">
      <div className="flex items-end justify-between gap-2">
        <h2 className="font-mono text-xl font-black uppercase tracking-tight">Main stage · Sat</h2>
        <Badge>{seats.length === 0 ? "Pick seats" : `${seats.length} selected`}</Badge>
      </div>
      <SeatMap
        eventName="Main stage"
        eventDate="Sat"
        selectedSeatIds={seats.map((s) => s.id)}
        onSelectionChange={(next) => setSeats(next)}
        onCheckout={(next, price) => { setSeats(next); setTotal(price); setPaid(true); }}
      />
    </div>
  );
}
