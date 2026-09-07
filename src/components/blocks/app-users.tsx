"use client";

import * as React from "react";
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

export function AppUsers() {
  return (
    <div className="grid w-full gap-4 xl:grid-cols-3">
      <Card className="xl:col-span-2">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle>Crew roster</CardTitle>
            <div className="flex gap-2">
              <Input placeholder="Search crew..." aria-label="Search crew" className="w-40" />
              <Button size="sm">Invite</Button>
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
              {USERS.map((user) => (
                <TableRow key={user.email}>
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
            <Avatar name="Ada Bull" size="lg" />
            <div>
              <CardTitle>Ada Bull</CardTitle>
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">ADMIN // GATE OPS</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between font-mono text-xs">
            <span className="text-muted-foreground">EMAIL</span>
            <span className="font-bold">ada@arena.gg</span>
          </div>
          <div className="flex justify-between font-mono text-xs">
            <span className="text-muted-foreground">SCANS</span>
            <span className="font-bold">12,408</span>
          </div>
          <div className="flex justify-between font-mono text-xs">
            <span className="text-muted-foreground">SHIFT</span>
            <span className="font-bold">NIGHT // GATE 3</span>
          </div>
          <div className="flex gap-2">
            <Button size="sm">Message</Button>
            <Button size="sm" variant="outline">Suspend</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
