"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CountryOption {
  code: string;
  label: string;
  dialCode?: string;
  flag?: string;
}

export interface PhoneInputProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  countries?: CountryOption[];
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const COUNTRIES: CountryOption[] = [
  { code: "US", label: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "TR", label: "Turkey", dialCode: "+90", flag: "🇹🇷" },
  { code: "GB", label: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "DE", label: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "FR", label: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "CA", label: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { code: "AU", label: "Australia", dialCode: "+61", flag: "🇦🇺" },
];

export function PhoneInput({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  countries = COUNTRIES,
  className,
  placeholder = "Phone number",
  disabled = false,
}: PhoneInputProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [selectedCode, setSelectedCode] = React.useState(countries[0]?.code ?? "US");
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;
  const selectedCountry = countries.find((c) => c.code === selectedCode) ?? countries[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!isControlled) setInternalValue(val);
    onValueChange?.(val);
  };

  return (
    <div className={cn("relative flex flex-col gap-2", className)}>
      <div className="relative">
        <select
          aria-label="Country"
          disabled={disabled}
          value={selectedCountry?.code ?? ""}
          onChange={(e) => setSelectedCode(e.target.value)}
          className="block w-full cursor-pointer appearance-none rounded-md border border-border bg-card px-3 py-2 pe-8 font-mono text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.flag ? `${country.flag} ${country.label}` : country.label}
              {country.dialCode ? ` (${country.dialCode})` : ""}
            </option>
          ))}
        </select>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>

      <div>
        <input
          type="tel"
          aria-label={placeholder}
          disabled={disabled}
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="block w-full rounded-md border-2 border-dashed border-input bg-transparent px-3 py-2 font-mono text-sm placeholder:text-muted-foreground focus-visible:border-solid focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
        />
        {currentValue ? (
          <div className="mt-1 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            {selectedCountry?.dialCode && !currentValue.trim().startsWith("+") ? (
              <span>{selectedCountry.dialCode}</span>
            ) : null}
            <span>{currentValue}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

PhoneInput.displayName = "PhoneInput";
