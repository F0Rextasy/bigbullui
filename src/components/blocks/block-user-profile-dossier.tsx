"use client";

import * as React from "react";
import { Badge } from "../ui/badge";
import { Avatar } from "../ui/avatar";
import { RoleBadge } from "../ui/role-badge";
import { StampSeal } from "../ui/stamp-seal";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PageHeader } from "../ui/page-header";

const SEALS = [
  { text: "VERIFIED", subtext: "BOX OFFICE", tone: "accent" as const },
  { text: "FOUNDER", subtext: "SINCE 2019", tone: "primary" as const },
];

export function BlockUserProfileDossier() {
  return (
    <div className="w-full space-y-6">
      <PageHeader
        eyebrow="MEMBERS // DOSSIER"
        title="Holder dossier"
        description="Identity, clearance, and stamped approvals in one card."
      />
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>ADMIT HOLDER FILE</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-start gap-5">
            <Avatar name="Ada Bull" size="lg" />
            <div className="min-w-0 flex-1">
              <p className="font-mono text-lg font-black uppercase tracking-tight">Ada Bull</p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">MEMBER NO. BB-00421 // HALL A</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <RoleBadge role="admin" />
                <RoleBadge role="editor" label="Curator" />
                <Badge variant="outline">142 STUBS</Badge>
                <Badge variant="outline">ZERO NO-SHOWS</Badge>
              </div>
            </div>
            <div className="flex gap-3">
              {SEALS.map((seal) => (
                <StampSeal key={seal.text} text={seal.text} subtext={seal.subtext} tone={seal.tone} />
              ))}
            </div>
          </div>
          <div className="mt-5 grid gap-3 rounded-md border border-dashed border-border bg-secondary p-4 sm:grid-cols-3">
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">HOME GATE</p>
              <p className="font-mono text-xs font-bold">GATE 03 NORTH</p>
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">FAVORITE TIER</p>
              <p className="font-mono text-xs font-bold">ORCHESTRA ROW C</p>
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">STANDING</p>
              <p className="font-mono text-xs font-bold text-accent">VERIFIED HOLDER</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
