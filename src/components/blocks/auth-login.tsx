"use client";

import * as React from "react";
import { cn } from "../ui/lib/utils";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

export interface AuthLoginCredentials {
  email: string;
  password: string;
  remember: boolean;
}

export interface AuthLoginProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  badgeLabel?: string;
  title?: string;
  description?: string;
  forgotHref?: string;
  registerHref?: string;
  onSubmitCredentials?: (creds: AuthLoginCredentials) => void;
  onSsoClick?: () => void;
  onPasskeyClick?: () => void;
  onAction?: (action: string) => void;
}

export function AuthLogin({
  badgeLabel = "GATE PASS // LOGIN",
  title = "Welcome back to the booth",
  description = "Sign in to manage stubs, scans, and payouts.",
  forgotHref = "#forgot",
  registerHref = "#register",
  onSubmitCredentials,
  onSsoClick,
  onPasskeyClick,
  className,
  onAction,
  ...props
}: AuthLoginProps) {
  const uid = React.useId();
  const emailId = `${uid}-email`;
  const passwordId = `${uid}-password`;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(false);
  const [notice, setNotice] = React.useState<string | null>(null);

  return (
    <div className={cn("mx-auto w-full max-w-md", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <Badge variant="accent" className="mx-auto">
            {badgeLabel}
          </Badge>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setNotice("Signed in to crew booth.");
              onSubmitCredentials?.({ email, password, remember });
              onAction?.("submit");
            }}
          >
            <div className="space-y-1.5">
              <label htmlFor={emailId} className="font-mono text-[11px] font-bold uppercase tracking-widest">
                Email
              </label>
              <Input
                id={emailId}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="crew@arena.gg"
                autoComplete="email"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor={passwordId} className="font-mono text-[11px] font-bold uppercase tracking-widest">
                Password
              </label>
              <Input
                id={passwordId}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
              />
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest">
              <label className="inline-flex cursor-pointer items-center gap-2 text-muted-foreground">
                <Checkbox checked={remember} onCheckedChange={setRemember} aria-label="Remember me" />
                <span>Remember me</span>
              </label>
              <a
                href={forgotHref}
                className="text-accent-strong underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Forgot pass?
              </a>
            </div>
            <Button type="submit" className="w-full">
              Admit me
            </Button>
            <Separator>OR</Separator>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setNotice("Opening SSO gateway...");
                  onSsoClick?.();
                  onAction?.("sso");
                }}
              >
                SSO
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setNotice("Waiting for passkey prompt...");
                  onPasskeyClick?.();
                  onAction?.("passkey");
                }}
              >
                Passkey
              </Button>
            </div>
            {notice && (
              <p
                role="status"
                className="rounded-sm border border-dashed border-border bg-secondary/50 px-3 py-2 text-center font-mono text-[10px] uppercase tracking-wider text-foreground"
              >
                {notice}
              </p>
            )}
            <p className="text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              New crew?{" "}
              <a
                href={registerHref}
                className="text-accent-strong underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Register
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
