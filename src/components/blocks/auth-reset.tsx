"use client";

import * as React from "react";
import { cn } from "../ui/lib/utils";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Input } from "../ui/input";

export interface AuthResetProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    title?: string;
  subtitle?: string;
  onAction?: (action: string) => void;
}

export function AuthReset({ title, className, onAction, ...props }: AuthResetProps) {
  const uid = React.useId();
  const [saved, setSaved] = React.useState(false);
  return (
    <div className={cn("mx-auto w-full max-w-md", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <Badge variant="accent" className="mx-auto">GATE PASS // NEW STUB</Badge>
          <CardTitle className="text-xl">{title ?? "Set a fresh password"}</CardTitle>
          <CardDescription>Pick something the scalpers cannot guess.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setSaved(true);
              onAction?.("reset-password");
            }}
          >
            <div className="space-y-1.5">
              <label htmlFor={`${uid}-new`} className="font-mono text-[11px] font-bold uppercase tracking-widest">New password</label>
              <Input id={`${uid}-new`} type="password" placeholder="Enter new password" autoComplete="new-password" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor={`${uid}-confirm`} className="font-mono text-[11px] font-bold uppercase tracking-widest">Confirm password</label>
              <Input id={`${uid}-confirm`} type="password" placeholder="Repeat new password" autoComplete="new-password" />
            </div>
            <Button type="submit" className="w-full">{saved ? "Password updated" : "Stamp new password"}</Button>
            <p role={saved ? "status" : undefined} className="text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {saved ? "STAMPED // PASSWORD ACTIVE" : "LINK VALID // 28 MIN LEFT"}
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
