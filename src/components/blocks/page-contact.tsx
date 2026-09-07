"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PageHeader } from "../ui/page-header";
import { Faq } from "../ui/faq";

const FAQS = [
  { question: "How fast does the desk reply?", answer: "Most notes get a stamped reply within one business day." },
  { question: "Where is the box office?", answer: "Hall A north lobby, gate 03, open on show nights from 18:00." },
  { question: "Can I exchange a tier?", answer: "Yes, file a request with the serial and the desk swaps it." },
];

export function PageContact() {
  const [sent, setSent] = React.useState(false);

  return (
    <div className="w-full space-y-6">
      <PageHeader
        eyebrow="DESK // SAY HELLO"
        title="Contact the box office"
        description="A full page for notes, swaps, and lost stubs."
        actions={<Badge variant="accent">REPLIES IN 1 DAY</Badge>}
      />
      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Send a note</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <Input placeholder="Full name" aria-label="Full name" />
              <Input placeholder="Email for reply" aria-label="Email" />
            </div>
            <Input placeholder="Subject, e.g. lost stub BB-90210" aria-label="Subject" />
            <Textarea placeholder="Write the note with dates, gates, and serials" aria-label="Message" />
            <Button size="sm" onClick={() => setSent(true)}>{sent ? "Note stamped and sent" : "Send note"}</Button>
          </CardContent>
        </Card>
        <div className="min-w-0 space-y-4 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Visit card</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 font-mono text-xs">
              <p className="font-bold uppercase">Hall A North Lobby</p>
              <p className="text-muted-foreground">Gate 03, open show nights 18:00 to 23:00</p>
              <div className="flex flex-wrap gap-2 pt-1">
                <Badge variant="outline">DESK@BIGBULL</Badge>
                <Badge variant="outline">+1 555 0103</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quick answers</CardTitle>
            </CardHeader>
            <CardContent>
              <Faq items={FAQS} defaultOpen={0} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
