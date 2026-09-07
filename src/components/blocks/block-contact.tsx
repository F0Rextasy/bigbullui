"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";

export function BlockContact() {
  const [sent, setSent] = React.useState(false);
  return (
    <div className="grid w-full gap-4 lg:grid-cols-5">
      <Card className="lg:col-span-2">
        <CardHeader>
          <Badge variant="accent">BOX OFFICE</Badge>
          <CardTitle>Talk to a human</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Weekdays 09:00 to 18:00, answers within one business day.</p>
          <p className="font-mono text-xs">hello@bigbull.example</p>
          <p className="font-mono text-xs">+90 212 000 00 00</p>
        </CardContent>
      </Card>
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Send a message</CardTitle>
        </CardHeader>
        <CardContent>
          {sent ? (
            <p role="status" className="rounded-md border border-dashed border-border bg-secondary/50 p-4 font-mono text-xs uppercase tracking-wider text-foreground">
              Received. Your stub number is BC-1042.
            </p>
          ) : (
            <form
              className="space-y-3"
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <Input placeholder="Full name" aria-label="Full name" />
                <Input placeholder="Email" type="email" aria-label="Email" />
              </div>
              <Textarea placeholder="How can we help?" aria-label="Message" />
              <Button type="submit">Send message</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
