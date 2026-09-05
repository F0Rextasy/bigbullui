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

function DemoCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-44 items-center justify-center rounded-lg border border-border bg-card p-6">
      {children}
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DemoCard>
          <span className="flex items-center gap-2 text-sm">
            <Switch checked={on} onCheckedChange={setOn} aria-label="Notifications" />
            <span className="font-mono text-xs text-muted-foreground">{on ? "ON" : "OFF"}</span>
          </span>
        </DemoCard>

        <DemoCard>
          <span className="flex w-full max-w-xs items-center gap-3">
            <Slider value={volume} onValueChange={setVolume} aria-label="Volume" className="flex-1" />
            <span className="w-12 text-right font-mono text-sm">{volume}%</span>
          </span>
        </DemoCard>

        <DemoCard>
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
        </DemoCard>

        <DemoCard>
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
        </DemoCard>

        <DemoCard>
          <Accordion type="single" defaultValue="a" className="w-full max-w-sm">
            <AccordionItem value="a">
              <AccordionTrigger>What is bigbullui?</AccordionTrigger>
              <AccordionContent>Open-source components for React.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>Is it free?</AccordionTrigger>
              <AccordionContent>MIT licensed, forever.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </DemoCard>

        <DemoCard>
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

        <DemoCard>
          <ProgressDemo />
        </DemoCard>

        <DemoCard>
          <AlertDemo />
        </DemoCard>

        <DemoCard>
          <Tooltip content="Row C · Seat 12">
            <Button variant="outline">Hover me</Button>
          </Tooltip>
        </DemoCard>

        <DemoCard>
          <Select
            defaultValue="window"
            aria-label="Seat"
            className="w-full max-w-xs"
            options={[
              { value: "window", label: "Window" },
              { value: "aisle", label: "Aisle" },
            ]}
          />
        </DemoCard>

        <DemoCard>
          <Rating defaultValue={4} aria-label="Rate this show" />
        </DemoCard>

        <DemoCard>
          <Stepper defaultValue={2} min={0} max={5} aria-label="Tickets" />
        </DemoCard>

        <DemoCard>
          <PinInput length={4} aria-label="Ticket code" />
        </DemoCard>

        <DemoCard>
          <ToastDemo />
        </DemoCard>
      </div>
    </ToastProvider>
  );
}
