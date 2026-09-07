"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

export function Auth2fa() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Card>
        <CardHeader className="text-center">
          <Badge variant="accent" className="mx-auto">GATE PASS // 2FA</Badge>
          <CardTitle className="text-xl">Second stamp required</CardTitle>
          <CardDescription>Enter the 6-digit code from your authenticator.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
            <div className="flex justify-center gap-2" role="group" aria-label="Two-factor code">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <Input key={index} inputMode="numeric" maxLength={1} aria-label={`Code digit ${index + 1}`} className="size-11 px-0 text-center text-lg font-black" />
              ))}
            </div>
            <Button type="submit" className="w-full">Confirm entry</Button>
            <Separator>RECOVERY</Separator>
            <p className="text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Lost your device? <a href="#recovery" className="text-accent-strong underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Use a recovery code</a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
