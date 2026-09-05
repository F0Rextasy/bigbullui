"use client";

import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Alert } from "@/components/ui/alert";
import { Rating } from "@/components/ui/rating";
import { Stepper } from "@/components/ui/stepper";
import { PinInput } from "@/components/ui/pin-input";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { TicketCard } from "@/components/ui/ticket-card";
import { MetricCard } from "@/components/ui/metric-card";
import { Sparkline } from "@/components/ui/sparkline";
import { StampSeal } from "@/components/ui/stamp-seal";
import { Barcode } from "@/components/ui/barcode";
import Link from "next/link";

function SceneFrame({ label, docs, children }: { label: string; docs: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border-2 border-foreground bg-card p-6 shadow-md outline-1 outline-dashed outline-offset-[-5px] sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </span>
        <Link
          href={docs}
          className="font-mono text-[11px] uppercase tracking-wider text-accent-strong hover:underline"
        >
          Open in docs →
        </Link>
      </div>
      <div className="mt-6 flex justify-center">{children}</div>
    </div>
  );
}

function BoxOfficeScene() {
  const { toast } = useToast();
  const [qty, setQty] = React.useState(2);
  return (
    <div className="grid w-full items-center gap-6 md:grid-cols-2">
      <TicketCard eventName="BIGBULL MAIN STAGE" status="valid" price="$45.00" />
      <div className="flex flex-col items-start gap-4">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          How many stubs?
        </span>
        <Stepper value={qty} onValueChange={setQty} min={1} max={8} aria-label="Tickets" />
        <Button
          size="lg"
          onClick={() =>
            toast({ title: "Order placed", description: `${qty} stubs · Row C`, tone: "accent" })
          }
        >
          Admit {qty} — ${(qty * 45).toFixed(2)}
        </Button>
      </div>
    </div>
  );
}

function DashboardScene() {
  const [data] = React.useState([10, 25, 18, 42, 35, 60, 52, 85]);
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      <MetricCard title="TONIGHT REVENUE" value="$48,250" trend={{ value: "+14.8%", direction: "up", label: "vs yesterday" }} />
      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border p-4">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Sales velocity
        </span>
        <Sparkline data={data} width={220} height={56} tone="accent" />
        <span className="flex w-full max-w-xs items-center gap-2">
          <Progress value={72} className="flex-1" />
          <span className="font-mono text-xs">72%</span>
        </span>
      </div>
    </div>
  );
}

function CheckInScene() {
  const [stamped, setStamped] = React.useState(false);
  return (
    <div className="flex w-full flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-10">
      <div className="flex flex-col items-center gap-2">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Gate code
        </span>
        <PinInput length={4} aria-label="Gate code" onComplete={() => setStamped(true)} />
      </div>
      <button
        type="button"
        onClick={() => setStamped((v) => !v)}
        className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
        aria-label="Toggle admission stamp"
      >
        <StampSeal text={stamped ? "ADMITTED" : "STANDBY"} tone={stamped ? "accent" : "primary"} rotate={-8} />
      </button>
      <Barcode value="BB-2026-0001" height={44} />
    </div>
  );
}

function FeedbackScene() {
  const [tone, setTone] = React.useState<"info" | "accent" | "destructive">("accent");
  const [on, setOn] = React.useState(true);
  const [volume, setVolume] = React.useState(60);
  return (
    <div className="grid w-full gap-6 md:grid-cols-2">
      <div className="flex flex-col items-start gap-4">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Rate the show
        </span>
        <Rating defaultValue={4} aria-label="Rate this show" />
        <span className="flex items-center gap-2">
          <Switch checked={on} onCheckedChange={setOn} aria-label="Notifications" />
          <span className="font-mono text-xs text-muted-foreground">{on ? "ON" : "OFF"}</span>
        </span>
        <span className="flex w-full max-w-xs items-center gap-3">
          <Slider value={volume} onValueChange={setVolume} aria-label="Volume" className="flex-1" />
          <span className="w-12 text-right font-mono text-sm">{volume}%</span>
        </span>
      </div>
      <div className="flex flex-col items-start gap-3">
        <Alert tone={tone} title={tone === "accent" ? "Limited seats" : tone === "info" ? "Gate change" : "Show cancelled"}>
          {tone === "accent" ? "Only a few stubs left." : tone === "info" ? "Boarding moved to gate B12." : "Refunds are automatic."}
        </Alert>
        <span className="flex gap-2">
          {(["info", "accent", "destructive"] as const).map((t) => (
            <Button key={t} size="sm" variant={tone === t ? "default" : "outline"} onClick={() => setTone(t)}>
              {t}
            </Button>
          ))}
        </span>
        <span className="flex items-center gap-3">
          <Checkbox defaultChecked aria-label="Extra legroom" />
          <RadioGroup name="cabin" defaultValue="eco" className="flex gap-3">
            <RadioItem value="eco">Eco</RadioItem>
            <RadioItem value="biz">Biz</RadioItem>
          </RadioGroup>
        </span>
      </div>
    </div>
  );
}

function DialogScene() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-col items-center gap-3">
      <Button size="lg" variant="outline" onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogHeader>
          <DialogTitle>Order confirmed</DialogTitle>
          <DialogDescription>Your stub is ready. Keep it until the end of the show.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Done</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

const SCENES = [
  { id: "box", label: "Box office", docs: "/docs/ticket-card" },
  { id: "dash", label: "Dashboard", docs: "/docs/metric-card" },
  { id: "gate", label: "Gate check-in", docs: "/docs/pin-input" },
  { id: "feel", label: "Feedback", docs: "/docs/rating" },
  { id: "modal", label: "Overlays", docs: "/docs/dialog" },
] as const;

export function Playground() {
  return (
    <ToastProvider>
      <Tabs defaultValue="box" className="w-full">
        <TabsList className="flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
          {SCENES.map((s) => (
            <TabsTrigger
              key={s.id}
              value={s.id}
              className="rounded-lg border border-dashed border-border px-5 py-2.5 font-mono text-sm uppercase tracking-wider data-[state=active]:border-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {s.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="mt-6">
          <TabsContent value="box">
            <SceneFrame label="Scene 01 — Sell tickets" docs="/docs/ticket-card">
              <BoxOfficeScene />
            </SceneFrame>
          </TabsContent>
          <TabsContent value="dash">
            <SceneFrame label="Scene 02 — Read the room" docs="/docs/metric-card">
              <DashboardScene />
            </SceneFrame>
          </TabsContent>
          <TabsContent value="gate">
            <SceneFrame label="Scene 03 — Scan at the gate" docs="/docs/pin-input">
              <CheckInScene />
            </SceneFrame>
          </TabsContent>
          <TabsContent value="feel">
            <SceneFrame label="Scene 04 — Hear the crowd" docs="/docs/rating">
              <FeedbackScene />
            </SceneFrame>
          </TabsContent>
          <TabsContent value="modal">
            <SceneFrame label="Scene 05 — Interrupt politely" docs="/docs/dialog">
              <DialogScene />
            </SceneFrame>
          </TabsContent>
        </div>
      </Tabs>
    </ToastProvider>
  );
}
