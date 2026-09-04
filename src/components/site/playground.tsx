"use client";

import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Playground() {
  const [on, setOn] = React.useState(true);
  const [volume, setVolume] = React.useState(60);

  return (
    <div className="rounded-lg border-[1.5px] border-foreground bg-card p-6 outline-1 outline-dashed outline-offset-[-7px] sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Live demo — touch it
        </span>
        <span className="flex items-center gap-2 text-sm">
          <Switch checked={on} onCheckedChange={setOn} aria-label="Notifications" />
          <span className="font-mono text-xs text-muted-foreground">{on ? "ON" : "OFF"}</span>
        </span>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <Slider value={volume} onValueChange={setVolume} aria-label="Volume" className="flex-1" />
        <span className="w-14 text-right font-mono text-sm">{volume}%</span>
      </div>
      <Tabs defaultValue="one" className="mt-6">
        <TabsList>
          <TabsTrigger value="one">Stub</TabsTrigger>
          <TabsTrigger value="two">Row</TabsTrigger>
          <TabsTrigger value="three">Seat</TabsTrigger>
        </TabsList>
        <TabsContent value="one">Row C, Seat 12 — keep this stub.</TabsContent>
        <TabsContent value="two">Gate B12, boarding 18:40.</TabsContent>
        <TabsContent value="three">No refunds, rain or shine.</TabsContent>
      </Tabs>
    </div>
  );
}
