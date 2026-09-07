"use client";

import * as React from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";

const MEMBERS = [
  { name: "Ada Bull", role: "Doors & Admission", tag: "OPS" },
  { name: "Grace Hopper", role: "Ledger & Refunds", tag: "FIN" },
  { name: "Alan Turing", role: "Print Room", tag: "PROD" },
  { name: "Sena Park", role: "Night Support", tag: "CARE" },
];

export function BlockTeam() {
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2 className="font-mono text-2xl font-black uppercase tracking-tight">Crew on duty</h2>
        <Badge variant="outline">4 STAFFED</Badge>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {MEMBERS.map((member) => (
          <Card key={member.name}>
            <CardContent className="flex items-center gap-3 p-5">
              <Avatar name={member.name} size="md" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">{member.name}</p>
                <p className="truncate text-xs text-muted-foreground">{member.role}</p>
                <Badge variant="outline" className="mt-1.5">{member.tag}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
