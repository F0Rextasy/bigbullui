"use client";

import * as React from "react";
import { cn } from "../ui/lib/utils";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar } from "../ui/avatar";

export interface SettingsAccountProps extends React.HTMLAttributes<HTMLDivElement> {
  onAction?: (action: string) => void;
}

export function SettingsAccount({ className, onAction, ...props }: SettingsAccountProps) {
  const uid = React.useId();
  const [muted, setMuted] = React.useState(false);
  const [notice, setNotice] = React.useState<string | null>(null);
  return (
    <div className={cn("w-full space-y-4", className)} {...props}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">CONTROL BOOTH // SETTINGS</p>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">Account hub</h2>
        </div>
        {notice && (
          <p role="status" className="rounded-sm border border-dashed border-border bg-secondary/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground">
            {notice}
          </p>
        )}
      </div>
      <Tabs defaultValue="profile">
        <div className="overflow-x-auto">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notify">Notify</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar name="Ada Bull" size="lg" />
                <div>
                  <CardTitle>Public stub</CardTitle>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">VISIBLE ON SHARED BOARDS</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor={`${uid}-name`} className="font-mono text-[11px] font-bold uppercase tracking-widest">Display name</label>
                  <Input id={`${uid}-name`} defaultValue="Ada Bull" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor={`${uid}-role`} className="font-mono text-[11px] font-bold uppercase tracking-widest">Role line</label>
                  <Input id={`${uid}-role`} defaultValue="Gate Ops Lead" />
                </div>
              </div>
              <Button size="sm" onClick={() => { setNotice("Profile saved."); onAction?.("save-profile"); }}>Save profile</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notify">
          <Card>
            <CardHeader>
              <CardTitle>Notification feed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {["SOLD-OUT ALERTS", "REFUND REQUESTS", "WEEKLY LEDGER"].map((row) => (
                <div key={row} className="flex items-center justify-between rounded-md border border-dashed border-border px-3 py-2.5">
                  <span className="font-mono text-xs font-bold">{row}</span>
                  <Badge variant={muted ? "outline" : "accent"}>{muted ? "MUTED" : "ON"}</Badge>
                </div>
              ))}
              <Button size="sm" variant="outline" onClick={() => { setMuted((m) => !m); setNotice(muted ? "Alerts enabled." : "All alerts muted."); onAction?.("toggle-mute"); }}>
                {muted ? "Enable all" : "Mute all"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Lock the booth</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor={`${uid}-pass`} className="font-mono text-[11px] font-bold uppercase tracking-widest">Current password</label>
                <Input id={`${uid}-pass`} type="password" placeholder="Enter current password" autoComplete="current-password" />
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => { setNotice("Password rotated."); onAction?.("rotate-password"); }}>Rotate password</Button>
                <Button size="sm" variant="outline" onClick={() => { setNotice("Other sessions signed out."); onAction?.("sign-out-devices"); }}>Sign out devices</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing stub</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-md border-2 border-foreground px-3 py-2.5">
                <span className="font-mono text-xs font-black">BOX OFFICE PRO // $29 MO</span>
                <Badge variant="accent">CURRENT</Badge>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => { setNotice("Upgrade plan requested."); onAction?.("upgrade"); }}>Upgrade</Button>
                <Button size="sm" variant="outline" onClick={() => { setNotice("Downloading invoices..."); onAction?.("invoices"); }}>Invoices</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
