"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Input } from "../ui/input";

export function AuthReset() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Card>
        <CardHeader className="text-center">
          <Badge variant="accent" className="mx-auto">GATE PASS // NEW STUB</Badge>
          <CardTitle className="text-xl">Set a fresh password</CardTitle>
          <CardDescription>Pick something the scalpers cannot guess.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
            <div className="space-y-1.5">
              <label htmlFor="auth-reset-new" className="font-mono text-[11px] font-bold uppercase tracking-widest">New password</label>
              <Input id="auth-reset-new" type="password" placeholder="Enter new password" autoComplete="new-password" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="auth-reset-confirm" className="font-mono text-[11px] font-bold uppercase tracking-widest">Confirm password</label>
              <Input id="auth-reset-confirm" type="password" placeholder="Repeat new password" autoComplete="new-password" />
            </div>
            <Button type="submit" className="w-full">Stamp new password</Button>
            <p className="text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">LINK VALID // 28 MIN LEFT</p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
