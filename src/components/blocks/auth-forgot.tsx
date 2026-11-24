"use client";

import * as React from "react";
import { cn } from "../ui/lib/utils";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Input } from "../ui/input";
import { Alert } from "../ui/alert";

export interface AuthForgotProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    title?: string;
  subtitle?: string;
  onAction?: (action: string) => void;
}

export function AuthForgot({ title, className, onAction, ...props }: AuthForgotProps) {
  const emailId = React.useId();
  const [sent, setSent] = React.useState(false);
  return (
    <div className={cn("mx-auto w-full max-w-md", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <Badge variant="accent" className="mx-auto">GATE PASS // RECOVERY</Badge>
          <CardTitle className="text-xl">{title ?? "Lost your stub?"}</CardTitle>
          <CardDescription>Enter your crew email and we reissue a pass.</CardDescription>
        </CardHeader>
        <CardContent>
          {sent ? (
            <div className="space-y-4">
              <Alert tone="accent" title="PASS REISSUED">Check your inbox for the reset link. It expires in 30 minutes.</Alert>
              <Button variant="outline" className="w-full" onClick={() => { setSent(false); onAction?.("resend"); }}>Resend link</Button>
            </div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
                onAction?.("reset-request");
              }}
            >
              <div className="space-y-1.5">
                <label htmlFor={emailId} className="font-mono text-[11px] font-bold uppercase tracking-widest">Email</label>
                <Input id={emailId} type="email" placeholder="crew@arena.gg" autoComplete="email" />
              </div>
              <Button type="submit" className="w-full">Send reset link</Button>
              <p className="text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Remembered it? <a href="#login" className="text-accent-strong underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Back to login</a>
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
