"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const FAQS = [
  { id: "q1", q: "How do refunds work?", a: "Refunds stamp back to the original payment within 5 business days. Partial refunds split by stub." },
  { id: "q2", q: "Can I scan offline?", a: "Yes. The gate ledger caches the night manifest and syncs when the connection returns." },
  { id: "q3", q: "Do you support assigned seating?", a: "Every tier includes seat maps with row letters, holds, and transfer links." },
  { id: "q4", q: "How do payouts land?", a: "Nightly batches settle to your linked account with a stamped invoice attached." },
];

export function PageFaq() {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-5">
      <div className="space-y-2 text-center">
        <Badge variant="accent" className="mx-auto">HELP DESK</Badge>
        <h2 className="font-mono text-3xl font-black uppercase tracking-tight">Asked at every gate</h2>
        <div className="mx-auto max-w-sm">
          <Input placeholder="Search answers..." aria-label="Search answers" />
        </div>
      </div>
      <Card>
        <CardContent className="pt-6">
          <Accordion defaultValue="q1">
            {FAQS.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      <p className="text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        Still stuck? <Button size="sm" variant="outline" className="ml-2">Open a ticket</Button>
      </p>
    </div>
  );
}
