"use client";

import * as React from "react";
import { cn } from "../ui/lib/utils";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar } from "../ui/avatar";

const DEFAULT_CONTACTS = [
  { name: "Ada Bull", detail: "Door captain // Gate 01", group: "CREW" },
  { name: "Grace Hopper", detail: "VIP patron // Box seats", group: "VIP" },
  { name: "Jon Reyes", detail: "Scanner tech // Night shift", group: "CREW" },
  { name: "Mira Chen", detail: "Sponsor // Annex Events", group: "PARTNERS" },
  { name: "Sena Park", detail: "Host // Lounge", group: "CREW" },
  { name: "Linus Torvalds", detail: "Press // Balcony row", group: "PRESS" },
];

const GROUPS = ["ALL", "CREW", "VIP", "PARTNERS", "PRESS"] as const;

export interface AppContactsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    title?: string;
  subtitle?: string;
  contacts?: typeof DEFAULT_CONTACTS;
  onAction?: (action: string) => void;
}

export function AppContacts({ title, contacts = DEFAULT_CONTACTS, className, onAction, ...props }: AppContactsProps) {
  const [group, setGroup] = React.useState<(typeof GROUPS)[number]>("ALL");
  const [notice, setNotice] = React.useState<string | null>(null);
  const visible = contacts.filter((person) => group === "ALL" || person.group === group);
  return (
    <div className={cn("w-full space-y-4", className)} {...props}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">ROLLODEX // CONTACTS</p>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">{title ?? "People file"}</h2>
        </div>
        <div className="flex items-center gap-2">
          {notice && <span role="status" className="font-mono text-[10px] uppercase tracking-wider text-accent">{notice}</span>}
          <Button size="sm" onClick={() => { setNotice("New contact slot ready."); onAction?.("add-contact"); }}>Add contact</Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter contacts by group">
        {GROUPS.map((option) => (
          <Button
            key={option}
            size="sm"
            variant={group === option ? "default" : "outline"}
            onClick={() => setGroup(option)}
            aria-pressed={group === option}
          >
            {option}
          </Button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((person) => (
          <Card key={person.name} className="min-w-0">
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
              <Avatar name={person.name} size="md" />
              <div className="min-w-0">
                <CardTitle className="truncate text-sm">{person.name}</CardTitle>
                <p className="truncate font-mono text-[11px] text-muted-foreground">{person.detail}</p>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-2">
              <Badge variant="outline">{person.group}</Badge>
              <Button size="sm" variant="ghost" onClick={() => { setNotice(`Messaging ${person.name}`); onAction?.("message-contact"); }}>Message</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
