"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface RegisterFormProps extends Omit<React.HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  onSubmit?: (data: { name: string; email: string; password: string }) => void;
  termsHref?: string;
}

/** Registration form: name/email/password + terms consent + live validation. */
export function RegisterForm({ onSubmit, termsHref = "#", className, ...props }: RegisterFormProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [agreed, setAgreed] = React.useState(false);
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : /[A-Z]/.test(password) && /[0-9]/.test(password) ? 3 : 2;
  const strengthLabels = ["", "WEAK", "MEDIUM", "STRONG"];
  const strengthColors = ["", "bg-destructive", "bg-amber-500", "bg-emerald-500"];

  const valid = name.trim().length >= 2 && emailValid && password.length >= 6 && agreed;

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (valid) onSubmit?.({ name, email, password }); }}
      className={cn("w-full max-w-sm space-y-4", className)}
      noValidate
      {...props}
    >
      <style>{`@keyframes regIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <div className="space-y-1.5 animate-[regIn_0.3s_ease-out_both] motion-reduce:animate-none">
        <label htmlFor="reg-name" className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Ad Soyad</label>
        <input
          id="reg-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          className={cn(
            "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors motion-reduce:transition-none",
            touched.name && name.trim().length < 2 && "border-destructive"
          )}
          placeholder="Ada Lovelace"
        />
      </div>

      <div className="space-y-1.5 animate-[regIn_0.3s_ease-out_0.06s_both] motion-reduce:animate-none">
        <label htmlFor="reg-email" className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">E-posta</label>
        <input
          id="reg-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          className={cn(
            "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors motion-reduce:transition-none",
            touched.email && !emailValid && "border-destructive"
          )}
          placeholder="ornek@mail.com"
        />
      </div>

      <div className="space-y-1.5 animate-[regIn_0.3s_ease-out_0.12s_both] motion-reduce:animate-none">
        <label htmlFor="reg-password" className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Password</label>
        <input
          id="reg-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors motion-reduce:transition-none"
          placeholder="••••••••"
        />
        {password.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex flex-1 gap-1">
              {[1, 2, 3].map((seg) => (
                <div
                  key={seg}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors duration-300 motion-reduce:transition-none",
                    strength >= seg ? strengthColors[strength] : "bg-border"
                  )}
                />
              ))}
            </div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{strengthLabels[strength]}</span>
          </div>
        )}
      </div>

      <label className="flex cursor-pointer items-start gap-2 text-xs animate-[regIn_0.3s_ease-out_0.18s_both] motion-reduce:animate-none select-none">
        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 size-3.5 accent-accent" />
        <span className="text-muted-foreground">
          I have read and agree to the <a href={termsHref} className="text-accent hover:underline">Terms of Service</a> and Privacy Policy.
        </span>
      </label>

      <button
        type="submit"
        disabled={!valid}
        className={cn(
          "w-full rounded-md bg-accent px-4 py-2.5 text-sm font-semibold uppercase tracking-widest text-accent-foreground",
          "transition-all duration-150 hover:bg-accent/90 active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
          "disabled:pointer-events-none disabled:opacity-40",
          "animate-[regIn_0.3s_ease-out_0.24s_both] motion-reduce:animate-none"
        )}
      >
        Create Account
      </button>
    </form>
  );
}
