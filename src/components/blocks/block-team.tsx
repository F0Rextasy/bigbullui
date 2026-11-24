"use client";

import * as React from "react";
import { cn } from "../ui/lib/utils";
import { Card, CardContent } from "../ui/card";
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";

const DEFAULT_MEMBERS = [
  { name: "Ada Bull", role: "Doors & Admission", tag: "OPS" },
  { name: "Grace Hopper", role: "Ledger & Refunds", tag: "FIN" },
  { name: "Alan Turing", role: "Print Room", tag: "PROD" },
  { name: "Sena Park", role: "Night Support", tag: "CARE" },
];

export interface BlockTeamProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    title?: string;
  subtitle?: string;
  members?: typeof DEFAULT_MEMBERS;
  onAction?: (action: string) => void;
}

export function BlockTeam({ title, members = DEFAULT_MEMBERS, className, onAction, ...props }: BlockTeamProps) {
  void onAction;
  return (
    <div className={cn("w-full space-y-4", className)} {...props}>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2 className="font-mono text-2xl font-black uppercase tracking-tight">{title ?? "Crew on duty"}</h2>
        <Badge variant="outline">4 STAFFED</Badge>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {members.map((member) => (
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
