"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface LoginFormProps extends Omit<React.HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  onSubmit?: (data: { email: string; password: string; remember: boolean }) => void;
  /** sosyal sağlayıcı butonları göster */
  social?: boolean;
  forgotHref?: string;
  registerHref?: string;
}

/** Giriş formu: canlı doğrulama, göster/gizle şifre, beni hatırla, sosyal butonlar. */
export function LoginForm({ onSubmit, social = true, forgotHref = "#", registerHref = "#", className, ...props }: LoginFormProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!emailValid) next.email = "Geçerli bir e-posta girin";
    if (password.length < 6) next.password = "En az 6 karakter";
    setErrors(next);
    if (Object.keys(next).length === 0) onSubmit?.({ email, password, remember });
  };

  return (
    <form onSubmit={handleSubmit} className={cn("w-full max-w-sm space-y-4", className)} noValidate {...props}>
      <style>{`
        @keyframes loginShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        @keyframes loginIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="space-y-1.5 animate-[loginIn_0.35s_ease-out_both] motion-reduce:animate-none">
        <label htmlFor="login-email" className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">E-posta</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(
            "w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
            email.length > 0 && !emailValid && "border-destructive",
            emailValid && "border-emerald-500"
          )}
          placeholder="ornek@mail.com"
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="text-xs text-destructive animate-[loginShake_0.3s_ease-out] motion-reduce:animate-none">{errors.email}</p>}
      </div>

      <div className="space-y-1.5 animate-[loginIn_0.35s_ease-out_0.08s_both] motion-reduce:animate-none">
        <label htmlFor="login-password" className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Şifre</label>
        <div className="relative">
          <input
            id="login-password"
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={cn(
              "w-full rounded-md border border-input bg-background px-3 py-2 pr-16 text-sm transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
              errors.password && "border-destructive"
            )}
            placeholder="••••••••"
            aria-invalid={!!errors.password}
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors"
            aria-label={show ? "Şifreyi gizle" : "Şifreyi göster"}
          >
            {show ? "GİZLE" : "GÖSTER"}
          </button>
        </div>
        {errors.password && <p className="text-xs text-destructive animate-[loginShake_0.3s_ease-out] motion-reduce:animate-none">{errors.password}</p>}
      </div>

      <div className="flex items-center justify-between text-xs animate-[loginIn_0.35s_ease-out_0.16s_both] motion-reduce:animate-none">
        <label className="flex cursor-pointer items-center gap-1.5 select-none">
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="size-3.5 accent-accent" />
          <span className="text-muted-foreground">Beni hatırla</span>
        </label>
        <a href={forgotHref} className="text-accent hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm">Şifremi unuttum</a>
      </div>

      <button
        type="submit"
        className={cn(
          "w-full rounded-md bg-accent px-4 py-2.5 text-sm font-semibold uppercase tracking-widest text-accent-foreground",
          "transition-all duration-150 hover:bg-accent/90 active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
          "animate-[loginIn_0.35s_ease-out_0.24s_both] motion-reduce:animate-none"
        )}
      >
        Giriş yap
      </button>

      {social && (
        <div className="grid grid-cols-2 gap-2 animate-[loginIn_0.35s_ease-out_0.32s_both] motion-reduce:animate-none">
          {["Google", "GitHub"].map((p) => (
            <button
              key={p}
              type="button"
              className="rounded-md border border-border bg-card px-3 py-2 text-xs font-medium transition-all duration-150 hover:border-foreground/40 hover:bg-secondary/40 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
            >
              {p} ile devam et
            </button>
          ))}
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground animate-[loginIn_0.35s_ease-out_0.4s_both] motion-reduce:animate-none">
        Hesabın yok mu? <a href={registerHref} className="text-accent hover:underline">Kayıt ol</a>
      </p>
    </form>
  );
}
