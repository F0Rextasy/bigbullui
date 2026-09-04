"use client";

import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioItem } from "@/components/ui/radio-group";

function DemoCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-44 flex-col rounded-lg border border-border bg-card p-5">
      <span className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <div className="flex flex-1 items-center justify-center">{children}</div>
    </div>
  );
}

export function Playground() {
  const [on, setOn] = React.useState(true);
  const [volume, setVolume] = React.useState(60);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <DemoCard label="Switch">
        <span className="flex items-center gap-2 text-sm">
          <Switch checked={on} onCheckedChange={setOn} aria-label="Notifications" />
          <span className="font-mono text-xs text-muted-foreground">{on ? "ON" : "OFF"}</span>
        </span>
      </DemoCard>

      <DemoCard label="Slider">
        <span className="flex w-full max-w-xs items-center gap-3">
          <Slider value={volume} onValueChange={setVolume} aria-label="Volume" className="flex-1" />
          <span className="w-12 text-right font-mono text-sm">{volume}%</span>
        </span>
      </DemoCard>

      <DemoCard label="Tabs">
        <Tabs defaultValue="one" className="w-full max-w-xs">
          <TabsList>
            <TabsTrigger value="one">Stub</TabsTrigger>
            <TabsTrigger value="two">Row</TabsTrigger>
            <TabsTrigger value="three">Seat</TabsTrigger>
          </TabsList>
          <TabsContent value="one">Row C, Seat 12 — keep this stub.</TabsContent>
          <TabsContent value="two">Gate B12, boarding 18:40.</TabsContent>
          <TabsContent value="three">No refunds, rain or shine.</TabsContent>
        </Tabs>
      </DemoCard>

      <DemoCard label="Dialog">
        <span>
          <Button variant="outline" onClick={() => setDialogOpen(true)}>
            Open dialog
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogHeader>
              <DialogTitle>Order confirmed</DialogTitle>
              <DialogDescription>Your stub is ready.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setDialogOpen(false)}>Done</Button>
            </DialogFooter>
          </Dialog>
        </span>
      </DemoCard>

      <DemoCard label="Accordion">
        <Accordion type="single" defaultValue="a" className="w-full">
          <AccordionItem value="a">
            <AccordionTrigger>What is bigbullui?</AccordionTrigger>
            <AccordionContent>Ticket-stub components for React.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Is it free?</AccordionTrigger>
            <AccordionContent>MIT licensed, forever.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </DemoCard>

      <DemoCard label="Pickers">
        <span className="flex flex-col items-start gap-3">
          <span className="flex items-center gap-2 text-sm">
            <Checkbox defaultChecked aria-label="Extra legroom" />
            <span className="text-muted-foreground">Extra legroom</span>
          </span>
          <RadioGroup name="cabin" defaultValue="eco">
            <RadioItem value="eco">Eco</RadioItem>
            <RadioItem value="biz">Biz</RadioItem>
          </RadioGroup>
        </span>
      </DemoCard>
    </div>
  );
}
