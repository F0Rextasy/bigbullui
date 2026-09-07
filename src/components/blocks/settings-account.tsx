"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar } from "../ui/avatar";

export function SettingsAccount() {
  return (
    <div className="w-full space-y-4">
      <div className="space-y-1">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">CONTROL BOOTH // SETTINGS</p>
        <h2 className="font-mono text-2xl font-black uppercase tracking-tight">Account hub</h2>
      </div>
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notify">Notify</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
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
                  <label htmlFor="settings-name" className="font-mono text-[11px] font-bold uppercase tracking-widest">Display name</label>
                  <Input id="settings-name" defaultValue="Ada Bull" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="settings-role" className="font-mono text-[11px] font-bold uppercase tracking-widest">Role line</label>
                  <Input id="settings-role" defaultValue="Gate Ops Lead" />
                </div>
              </div>
              <Button size="sm">Save profile</Button>
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
                  <Badge variant="accent">ON</Badge>
                </div>
              ))}
              <Button size="sm" variant="outline">Mute all</Button>
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
                <label htmlFor="settings-pass" className="font-mono text-[11px] font-bold uppercase tracking-widest">Current password</label>
                <Input id="settings-pass" type="password" placeholder="Enter current password" autoComplete="current-password" />
              </div>
              <div className="flex gap-2">
                <Button size="sm">Rotate password</Button>
                <Button size="sm" variant="outline">Sign out devices</Button>
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
                <Button size="sm">Upgrade</Button>
                <Button size="sm" variant="outline">Invoices</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
