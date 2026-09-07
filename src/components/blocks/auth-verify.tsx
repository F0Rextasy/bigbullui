"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Input } from "../ui/input";

export function AuthVerify() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Card>
        <CardHeader className="text-center">
          <Badge variant="accent" className="mx-auto">GATE PASS // VERIFY</Badge>
          <CardTitle className="text-xl">Check your inbox</CardTitle>
          <CardDescription>We sent a 6-digit code to crew@arena.gg.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
            <div className="flex justify-center gap-2" role="group" aria-label="Verification code">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <Input key={index} inputMode="numeric" maxLength={1} aria-label={`Digit ${index + 1}`} className="size-11 px-0 text-center text-lg font-black" />
              ))}
            </div>
            <Button type="submit" className="w-full">Verify stub</Button>
            <p className="text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              No code? <a href="#resend" className="text-accent-strong underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Resend in 00:42</a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
