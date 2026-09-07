"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Countdown } from "../ui/countdown";
import { PageHeader } from "../ui/page-header";
import { PricingTable } from "../ui/pricing-table";
import { Timeline } from "../ui/timeline";

const TIERS = [
  {
    id: "general",
    name: "GENERAL",
    subtitle: "Standing floor admission for opening night.",
    serial: "TCK-GA-001",
    monthlyPrice: 45,
    annualPrice: 39,
    features: ["Floor standing zone", "Doors at 19:00", "Merch booth access"],
    cta: { label: "Claim general" },
  },
  {
    id: "orchestra",
    name: "ORCHESTRA",
    subtitle: "Reserved seating with sightline guarantee.",
    badge: "MOST CLAIMED",
    serial: "TCK-OR-002",
    monthlyPrice: 120,
    annualPrice: 99,
    popular: true,
    popularLabel: "HOUSE PICK",
    features: ["Reserved row seating", "Priority gate lane", "Commemorative stub"],
    cta: { label: "Claim orchestra", variant: "accent" as const },
  },
  {
    id: "vip",
    name: "VIP BOX",
    subtitle: "Balcony box with host service all evening.",
    serial: "TCK-VP-003",
    monthlyPrice: 240,
    annualPrice: 199,
    features: ["Private box for four", "Host service", "Signed poster"],
    cta: { label: "Claim vip", variant: "outline" as const },
  },
];

const SCHEDULE = [
  { date: "19:00", title: "Doors and lobby reel", description: "Gate scan opens, merch booth live.", tone: "default" as const },
  { date: "20:00", title: "Opening brass set", description: "House band warms the main stage.", tone: "default" as const },
  { date: "21:30", title: "Headline performance", description: "Full stage show with encore ballot.", tone: "accent" as const },
  { date: "23:00", title: "Late stub social", description: "Lobby meet with signed stubs.", tone: "default" as const },
];

export function BlockEventLanding() {
  return (
    <div className="w-full space-y-6">
      <PageHeader
        eyebrow="EVENT // MAIN STAGE"
        title="Neon Brass Festival"
        description="One night, three tiers, stamped admission for every seat."
        actions={
          <div className="flex shrink-0 items-center gap-2">
            <Badge variant="accent">ON SALE</Badge>
            <Button size="sm">Get stubs</Button>
          </div>
        }
      />
      <div className="rounded-lg border border-border bg-card p-6 outline-1 outline-dashed outline-offset-[-7px] outline-border">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">CURTAIN IN</p>
            <Countdown targetDate="2026-12-31T20:00:00" />
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">DEC 31</Badge>
            <Badge variant="outline">HALL A</Badge>
          </div>
        </div>
      </div>
      <PricingTable tiers={TIERS} defaultBillingCycle="monthly" />
      <div className="min-w-0">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">RUNNING ORDER</p>
        <Timeline items={SCHEDULE} />
      </div>
    </div>
  );
}
