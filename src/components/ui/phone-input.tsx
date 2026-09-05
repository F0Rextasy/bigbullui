"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CountryOption {
  code: string;
  label: string;
  flag?: string;
}

export interface PhoneInputProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  countries?: CountryOption[];
  className?: string;
  placeholder?: string;
}

const COUNTRIES: CountryOption[] = [
  { code: "US", label: "United States", flag: "🇺🇸" },
  { code: "TR", label: "Turkey", flag: "🇹🇷" },
  { code: "GB", label: "United Kingdom", flag: "🇬🇧" },
  { code: "DE", label: "Germany", flag: "🇩🇪" },
  { code: "FR", label: "France", flag: "🇫🇷" },
  { code: "CA", label: "Canada", flag: "🇨🇦" },
  { code: "AU", label: "Australia", flag: "🇦🇺" },
];

const formatPhone = (num: string, code: string) => {
  const digits = num.replace(/\D/g, "");
  if (digits.length === 0) return "";
  if (code === "US") {
    const d = digits.slice(1);
    if (d.length <= 3) return `+1 ${d}`;
    if (d.length <= 6) return `+1 (${d.slice(0, 3)}) ${d.slice(3)}`;
    return `+1 (${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6, 9)}`;
  }
  return `+${code} ${digits}`;
};

export function PhoneInput({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  countries = COUNTRIES,
  className,
  placeholder = "Phone number",
}: PhoneInputProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [selectedCountry, setSelectedCountry] = React.useState(countries[0]);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInternalValue(val);
    onValueChange?.(val);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(countries.find(c => c.code === e.target.value) || countries[0]);
  };

  return (
    <div
      className={cn(
        "relative flex flex-col gap-2",
        className,
      )}
    >
      <div className="relative">
        <select
          value={selectedCountry.code}
          onChange={handleCountryChange}
          className={cn(
            "block w-full rounded-md border border-border bg-transparent px-3 py-2 font-mono text-sm text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            "appearance-none bg-no-repeat bg-right-4/10 cursor-pointer",
          )}
        >
          {countries.map((country) => (
            <option
              key={country.code}
              value={country.code}
            >
              {country.flag ? `${country.flag} ${country.label}` : country.label}
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
          className="absolute right-3 top-1/2 -translate-y-1 text-muted-foreground"
        >
          <path d="M18 8h1a4 4 0 0 1 0 8h1a4 4 0 0 1 0 8h-1a4 4 0 0 1-4-4h-1a4 4 0 0 1-4-4z" />
          <line x1="6" y1="9" x2="6" y2="15" />
          <line x1="10" y1="9" x2="10" y2="15" />
        </svg>
      </div>

      <div>
        <input
          type="tel"
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            "block w-full rounded-md border-2 border-dashed border-input bg-transparent px-3 py-2 font-mono text-sm placeholder-text-muted-foreground focus-visible:outline-none focus-visible:border-solid focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
            className,
          )}
        />
        {currentValue && (
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            {selectedCountry.code === "US" ? (
              <span className="relative after:content-['+'] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:text-[10px]">
                +1
              </span>
            ) : null}
            <span>{currentValue || "&nbsp;"}</span>
          </div>
        )}
      </div>

      {isControlled ? null : (
        <small className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          Controlled: use onValueChange to handle input
        </small>
      )}
    </div>
  );
}

PhoneInput.displayName = "PhoneInput";

