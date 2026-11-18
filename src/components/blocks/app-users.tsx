"use client";

import * as React from "react";
import { cn } from "../ui/lib/utils";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../ui/table";
import { Avatar } from "../ui/avatar";

const USERS = [
  { name: "Ada Bull", email: "ada@arena.gg", role: "ADMIN", status: "ACTIVE" },
  { name: "Grace Hopper", email: "grace@arena.gg", role: "EDITOR", status: "ACTIVE" },
  { name: "Alan Turing", email: "alan@arena.gg", role: "MEMBER", status: "INVITED" },
  { name: "Margaret Hamilton", email: "margaret@arena.gg", role: "VIEWER", status: "SUSPENDED" },
];

export interface AppUsersProps extends React.HTMLAttributes<HTMLDivElement> {
  onAction?: (action: string) => void;
}

export function AppUsers({ className, onAction, ...props }: AppUsersProps) {
  const [query, setQuery] = React.useState("");
  const [users, setUsers] = React.useState(USERS);
  const [selectedEmail, setSelectedEmail] = React.useState(USERS[0].email);
  const [notice, setNotice] = React.useState<string | null>(null);
  const visible = users.filter((u) => `${u.name} ${u.email} ${u.role}`.toLowerCase().includes(query.trim().toLowerCase()));
  const selected = users.find((u) => u.email === selectedEmail) ?? users[0];
  return (
    <div className={cn("grid w-full gap-4 xl:grid-cols-3", className)} {...props}>
      <Card className="xl:col-span-2">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle>Crew roster</CardTitle>
            <div className="flex gap-2">
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search crew..." aria-label="Search crew" className="w-40" />
              <Button size="sm" onClick={() => { setNotice("Invite link copied."); onAction?.("invite"); }}>Invite</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Member</TableHeaderCell>
                <TableHeaderCell>Role</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visible.map((user) => (
                <TableRow
                  key={user.email}
                  className={selected.email === user.email ? "bg-secondary/40 cursor-pointer" : "cursor-pointer"}
                  onClick={() => { setSelectedEmail(user.email); setNotice(null); }}
                >
                  <TableCell>
                    <span className="inline-flex items-center gap-2">
                      <Avatar name={user.name} size="sm" />
                      <span>
                        <span className="block font-bold">{user.name}</span>
                        <span className="block text-muted-foreground">{user.email}</span>
                      </span>
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === "ADMIN" ? "accent" : "default"}>{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "ACTIVE" ? "outline" : "secondary"}>{user.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Avatar name={selected.name} size="lg" />
            <div>
              <CardTitle>{selected.name}</CardTitle>
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{selected.role}{" // "}GATE OPS</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between font-mono text-xs">
            <span className="text-muted-foreground">EMAIL</span>
            <span className="font-bold">{selected.email}</span>
          </div>
          <div className="flex justify-between font-mono text-xs">
            <span className="text-muted-foreground">STATUS</span>
            <span className="font-bold">{selected.status}</span>
          </div>
          <div className="flex justify-between font-mono text-xs">
            <span className="text-muted-foreground">SHIFT</span>
            <span className="font-bold">NIGHT // GATE 3</span>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => { setNotice(`Sent ping to ${selected.name}`); onAction?.("message-user"); }}>Message</Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const nextStatus = selected.status === "SUSPENDED" ? "ACTIVE" : "SUSPENDED";
                setUsers((prev) => prev.map((u) => (u.email === selected.email ? { ...u, status: nextStatus } : u)));
                setNotice(`${selected.name} set to ${nextStatus}`);
                onAction?.("toggle-suspend");
              }}
            >
              {selected.status === "SUSPENDED" ? "Restore" : "Suspend"}
            </Button>
          </div>
          {notice && <p role="status" className="font-mono text-[10px] uppercase tracking-wider text-accent">{notice}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
