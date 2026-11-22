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

/** Address form layout: street, city, state, postal code grid. */
export function AddressForm({ value = {}, onValueChange, className, ...props }: AddressFormProps) {
  const uid = React.useId();
  const streetId = `${uid}-street`;
  const cityId = `${uid}-city`;
  const stateId = `${uid}-state`;
  const postalId = `${uid}-postal`;
  const countryId = `${uid}-country`;
  const set = (patch: Partial<AddressFormValue>) => onValueChange?.({ ...value, ...patch });

  const inputCls = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors motion-reduce:transition-none";
  const labelCls = "font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground";

  return (
    <form className={cn("w-full max-w-md space-y-3", className)} onSubmit={(e) => e.preventDefault()} {...props}>
      <div className="space-y-1 animate-[afIn_0.25s_ease-out_both] motion-reduce:animate-none">
        <label htmlFor={streetId} className={labelCls}>Street</label>
        <input id={streetId} value={value.street ?? ""} onChange={(e) => set({ street: e.target.value })} placeholder="123 Main St" className={inputCls} />
      </div>
      <div className="grid grid-cols-2 gap-3 animate-[afIn_0.25s_ease-out_0.06s_both] motion-reduce:animate-none">
        <div className="space-y-1">
          <label htmlFor={cityId} className={labelCls}>City</label>
          <input id={cityId} value={value.city ?? ""} onChange={(e) => set({ city: e.target.value })} placeholder="New York" className={inputCls} />
        </div>
        <div className="space-y-1">
          <label htmlFor={stateId} className={labelCls}>State / Region</label>
          <input id={stateId} value={value.state ?? ""} onChange={(e) => set({ state: e.target.value })} placeholder="NY" className={inputCls} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 animate-[afIn_0.25s_ease-out_0.12s_both] motion-reduce:animate-none">
        <div className="space-y-1">
          <label htmlFor={postalId} className={labelCls}>Postal Code</label>
          <input id={postalId} value={value.postal ?? ""} onChange={(e) => set({ postal: e.target.value })} placeholder="10001" inputMode="numeric" className={cn(inputCls, "font-mono")} />
        </div>
        <div className="space-y-1">
          <label htmlFor={countryId} className={labelCls}>Country</label>
          <input id={countryId} value={value.country ?? "United States"} onChange={(e) => set({ country: e.target.value })} className={inputCls} />
        </div>
      </div>
    </form>
  );
}
