"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";

export function BlockNewsletter() {
  const [done, setDone] = React.useState(false);
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center gap-3 p-8 text-center sm:p-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">WEEKLY PLAYBILL</p>
        <h2 className="max-w-md font-mono text-2xl font-black uppercase tracking-tight">First to know when doors open</h2>
        {done ? (
          <p role="status" className="font-mono text-xs uppercase tracking-wider text-foreground">
            On the list. See you at doors.
          </p>
        ) : (
          <form
            className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              setDone(true);
            }}
          >
            <Input placeholder="Email address" type="email" aria-label="Email address" className="flex-1" />
            <Button type="submit">Subscribe</Button>
          </form>
        )}
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">No spam. Unsubscribe anytime.</p>
      </CardContent>
    </Card>
  );
}
