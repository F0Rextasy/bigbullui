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
import { Progress } from "@/components/ui/progress";
import { Alert } from "@/components/ui/alert";
import { Tooltip } from "@/components/ui/tooltip";
import { Select } from "@/components/ui/select";
import { Rating } from "@/components/ui/rating";
import { Stepper } from "@/components/ui/stepper";
import { PinInput } from "@/components/ui/pin-input";
import { ToastProvider, useToast } from "@/components/ui/toast";

function DemoRow({ no, label, children }: { no: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-4 py-7 first:pt-1 last:pb-1">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {no} · {label}
      </span>
      <div className="flex w-full items-center justify-center">{children}</div>
    </div>
  );
}

function Perforation() {
  return (
    <div aria-hidden className="flex items-center gap-3">
      <div className="h-px flex-1 border-t border-dashed border-border" />
      <span className="size-2.5 rounded-full border border-dashed border-border" />
      <div className="h-px flex-1 border-t border-dashed border-border" />
    </div>
  );
}

function ProgressDemo() {
  const [value, setValue] = React.useState(12);
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(72);
      return;
    }
    const id = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 4));
    }, 120);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="w-full max-w-xs">
      <Progress value={value} />
      <span className="mt-2 block text-center font-mono text-xs text-muted-foreground">{value}%</span>
    </span>
  );
}

function AlertDemo() {
  const [tone, setTone] = React.useState<"info" | "accent" | "destructive">("info");
  const copy = {
    info: { title: "Gate change", body: "Boarding moved to gate B12." },
    accent: { title: "Limited seats", body: "Only a few stubs left." },
    destructive: { title: "Show cancelled", body: "Refunds are automatic." },
  } as const;
  return (
    <span className="flex w-full max-w-xs flex-col gap-3">
      <Alert tone={tone} title={copy[tone].title}>{copy[tone].body}</Alert>
      <span className="flex gap-2">
        {(Object.keys(copy) as Array<keyof typeof copy>).map((t) => (
          <Button
            key={t}
            size="sm"
            variant={tone === t ? "default" : "outline"}
            onClick={() => setTone(t)}
            aria-pressed={tone === t}
          >
            {t}
          </Button>
        ))}
      </span>
    </span>
  );
}

function ToastDemo() {
  const { toast } = useToast();
  return (
    <Button
      variant="outline"
      onClick={() => toast({ title: "Stub saved", description: "Row C · Seat 12", tone: "accent" })}
    >
      Fire toast
    </Button>
  );
}

export function Playground() {
  const [on, setOn] = React.useState(true);
  const [volume, setVolume] = React.useState(60);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <ToastProvider>
      <div className="rounded-lg border-[1.5px] border-foreground bg-card px-6 py-4 outline-1 outline-dashed outline-offset-[-7px] sm:px-10">
        <DemoRow no="01" label="Switch">
          <span className="flex items-center gap-2 text-sm">
            <Switch checked={on} onCheckedChange={setOn} aria-label="Notifications" />
            <span className="font-mono text-xs text-muted-foreground">{on ? "ON" : "OFF"}</span>
          </span>
        </DemoRow>
        <Perforation />
        <DemoRow no="02" label="Slider">
          <span className="flex w-full max-w-xs items-center gap-3">
            <Slider value={volume} onValueChange={setVolume} aria-label="Volume" className="flex-1" />
            <span className="w-12 text-right font-mono text-sm">{volume}%</span>
          </span>
        </DemoRow>
        <Perforation />
        <DemoRow no="03" label="Tabs">
          <Tabs defaultValue="one" className="w-full max-w-xs">
            <TabsList>
              <TabsTrigger value="one">Gate</TabsTrigger>
              <TabsTrigger value="two">Row</TabsTrigger>
              <TabsTrigger value="three">Seat</TabsTrigger>
            </TabsList>
            <TabsContent value="one">Row C, Seat 12 — hold onto it.</TabsContent>
            <TabsContent value="two">Gate B12, boarding 18:40.</TabsContent>
            <TabsContent value="three">No refunds, rain or shine.</TabsContent>
          </Tabs>
        </DemoRow>
        <Perforation />
        <DemoRow no="04" label="Dialog">
          <span>
            <Button variant="outline" onClick={() => setDialogOpen(true)}>
              Open dialog
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogHeader>
                <DialogTitle>Order confirmed</DialogTitle>
                <DialogDescription>Your stub is ready.</DialogDescription>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">Press Esc or click outside to close.</p>
              <DialogFooter>
                <Button onClick={() => setDialogOpen(false)}>Done</Button>
              </DialogFooter>
            </Dialog>
          </span>
        </DemoRow>
        <Perforation />
        <DemoRow no="05" label="Accordion">
          <Accordion type="single" defaultValue="a" className="w-full max-w-sm">
            <AccordionItem value="a">
              <AccordionTrigger>What is bigbullui?</AccordionTrigger>
              <AccordionContent>Zero-dependency components for React.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>Is it free?</AccordionTrigger>
              <AccordionContent>MIT licensed, forever.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </DemoRow>
        <Perforation />
        <DemoRow no="06" label="Pickers">
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
        </DemoRow>
        <Perforation />
        <DemoRow no="07" label="Progress">
          <ProgressDemo />
        </DemoRow>
        <Perforation />
        <DemoRow no="08" label="Alert">
          <AlertDemo />
        </DemoRow>
        <Perforation />
        <DemoRow no="09" label="Tooltip">
          <Tooltip content="Row C · Seat 12">
            <Button variant="outline">Hover me</Button>
          </Tooltip>
        </DemoRow>
        <Perforation />
        <DemoRow no="10" label="Select">
          <Select
            defaultValue="window"
            aria-label="Seat"
            className="w-full max-w-xs"
            options={[
              { value: "window", label: "Window" },
              { value: "aisle", label: "Aisle" },
            ]}
          />
        </DemoRow>
        <Perforation />
        <DemoRow no="11" label="Rating">
          <Rating defaultValue={4} aria-label="Rate this show" />
        </DemoRow>
        <Perforation />
        <DemoRow no="12" label="Stepper">
          <Stepper defaultValue={2} min={0} max={5} aria-label="Tickets" />
        </DemoRow>
        <Perforation />
        <DemoRow no="13" label="Pin input">
          <PinInput length={4} aria-label="Ticket code" />
        </DemoRow>
        <Perforation />
        <DemoRow no="14" label="Toast">
          <ToastDemo />
        </DemoRow>
      </div>
    </ToastProvider>
  );
}
