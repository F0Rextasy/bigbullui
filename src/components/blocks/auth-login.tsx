"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

export function AuthLogin() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Card>
        <CardHeader className="text-center">
          <Badge variant="accent" className="mx-auto">GATE PASS // LOGIN</Badge>
          <CardTitle className="text-xl">Welcome back to the booth</CardTitle>
          <CardDescription>Sign in to manage stubs, scans, and payouts.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
            <div className="space-y-1.5">
              <label htmlFor="auth-login-email" className="font-mono text-[11px] font-bold uppercase tracking-widest">Email</label>
              <Input id="auth-login-email" type="email" placeholder="crew@arena.gg" autoComplete="email" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="auth-login-password" className="font-mono text-[11px] font-bold uppercase tracking-widest">Password</label>
              <Input id="auth-login-password" type="password" placeholder="Enter password" autoComplete="current-password" />
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest">
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <span className="inline-block size-3 rounded-sm border-2 border-foreground" /> Remember me
              </span>
              <a href="#forgot" className="text-accent-strong underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Forgot pass?</a>
            </div>
            <Button type="submit" className="w-full">Admit me</Button>
            <Separator>OR</Separator>
            <div className="grid grid-cols-2 gap-2">
              <Button type="button" variant="outline">SSO</Button>
              <Button type="button" variant="outline">Passkey</Button>
            </div>
            <p className="text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              New crew? <a href="#register" className="text-accent-strong underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Register</a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
