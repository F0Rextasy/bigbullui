"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

export function AuthRegister() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Card>
        <CardHeader className="text-center">
          <Badge variant="accent" className="mx-auto">GATE PASS // REGISTER</Badge>
          <CardTitle className="text-xl">Claim your crew stub</CardTitle>
          <CardDescription>One account for every gate, booth, and ledger.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor="auth-reg-first" className="font-mono text-[11px] font-bold uppercase tracking-widest">First</label>
                <Input id="auth-reg-first" placeholder="Ada" autoComplete="given-name" />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="auth-reg-last" className="font-mono text-[11px] font-bold uppercase tracking-widest">Last</label>
                <Input id="auth-reg-last" placeholder="Bull" autoComplete="family-name" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="auth-reg-email" className="font-mono text-[11px] font-bold uppercase tracking-widest">Email</label>
              <Input id="auth-reg-email" type="email" placeholder="crew@arena.gg" autoComplete="email" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="auth-reg-password" className="font-mono text-[11px] font-bold uppercase tracking-widest">Password</label>
              <Input id="auth-reg-password" type="password" placeholder="8+ chars, mixed case" autoComplete="new-password" />
            </div>
            <div className="h-2 overflow-hidden rounded-sm border border-border bg-secondary">
              <div className="h-full w-3/4 bg-accent" />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">STRENGTH // STRONG STUB</p>
            <Button type="submit" className="w-full">Print my pass</Button>
            <Separator>OR</Separator>
            <Button type="button" variant="outline" className="w-full">Continue with SSO</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
