"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface AddressFormValue {
  street: string;
  city: string;
  state?: string;
  postal: string;
  country: string;
}

export interface AddressFormProps extends Omit<React.HTMLAttributes<HTMLFormElement>, "onChange"> {
  value?: Partial<AddressFormValue>;
  onValueChange?: (value: Partial<AddressFormValue>) => void;
}

/** Adres formu düzeni: sokak, şehir, ilçe, posta kodu grid'i. */
export function AddressForm({ value = {}, onValueChange, className, ...props }: AddressFormProps) {
  const set = (patch: Partial<AddressFormValue>) => onValueChange?.({ ...value, ...patch });

  const inputCls = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors motion-reduce:transition-none";
  const labelCls = "font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground";

  return (
    <form className={cn("w-full max-w-md space-y-3", className)} onSubmit={(e) => e.preventDefault()} {...props}>
      <style>{`@keyframes afIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="space-y-1 animate-[afIn_0.25s_ease-out_both] motion-reduce:animate-none">
        <label htmlFor="af-street" className={labelCls}>Sokak</label>
        <input id="af-street" value={value.street ?? ""} onChange={(e) => set({ street: e.target.value })} placeholder="Cadde, no" className={inputCls} />
      </div>
      <div className="grid grid-cols-2 gap-3 animate-[afIn_0.25s_ease-out_0.06s_both] motion-reduce:animate-none">
        <div className="space-y-1">
          <label htmlFor="af-city" className={labelCls}>Şehir</label>
          <input id="af-city" value={value.city ?? ""} onChange={(e) => set({ city: e.target.value })} placeholder="İstanbul" className={inputCls} />
        </div>
        <div className="space-y-1">
          <label htmlFor="af-state" className={labelCls}>İlçe</label>
          <input id="af-state" value={value.state ?? ""} onChange={(e) => set({ state: e.target.value })} placeholder="Kadıköy" className={inputCls} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 animate-[afIn_0.25s_ease-out_0.12s_both] motion-reduce:animate-none">
        <div className="space-y-1">
          <label htmlFor="af-postal" className={labelCls}>Posta kodu</label>
          <input id="af-postal" value={value.postal ?? ""} onChange={(e) => set({ postal: e.target.value })} placeholder="34000" inputMode="numeric" className={cn(inputCls, "font-mono")} />
        </div>
        <div className="space-y-1">
          <label htmlFor="af-country" className={labelCls}>Ülke</label>
          <input id="af-country" value={value.country ?? "Türkiye"} onChange={(e) => set({ country: e.target.value })} className={inputCls} />
        </div>
      </div>
    </form>
  );
}
