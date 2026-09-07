"use client";

import * as React from "react";
import { ComboboxV2 } from "@/components/ui/combobox-v2";
import { SelectV2 } from "@/components/ui/select-v2";
import { InputOtp } from "@/components/ui/input-otp";
import { useFormField, required, minLength } from "@/components/ui/form-validation";
import { LanguageSelect } from "@/components/ui/language-select";
import { TimezoneSelect } from "@/components/ui/timezone-select";
import { NumberInput } from "@/components/ui/number-input";
import { SearchCommand } from "@/components/ui/search-command";
import { SliderRangeLabel } from "@/components/ui/slider-range-label";
import { FileImagePreview } from "@/components/ui/file-image-preview";
import { InputMaskPhone } from "@/components/ui/input-mask-phone";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { RangeCalendar } from "@/components/ui/range-calendar";
import { InlineMultiselect } from "@/components/ui/inline-multiselect";
import { SignatureLine } from "@/components/ui/signature-line";
import { StampField } from "@/components/ui/stamp-field";
import { CreditCardInput } from "@/components/ui/credit-card-input";
import { ActivityCalendar } from "@/components/ui/activity-calendar";
import { SmartSearchBar } from "@/components/ui/smart-search-bar";
import { StarRatingInput } from "@/components/ui/star-rating-input";
import { ColorPalettePicker } from "@/components/ui/color-palette-picker";

function EmailValidationDemo() {
  const email = useFormField<string>("", [required("Email required")]);
  const password = useFormField<string>("", [required("Password required"), minLength(6)]);
  const [sent, setSent] = React.useState(false);
  return (
    <form
      className="grid w-full max-w-sm gap-3"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        email.blur();
        password.blur();
        if (!email.error && !password.error && String(email.value) && String(password.value)) setSent(true);
      }}
    >
      <label className="block">
        <span className="mb-1 block font-mono text-[11px] uppercase text-muted-foreground">Email</span>
        <input
          value={String(email.value)}
          onChange={(e) => email.set(e.target.value)}
          onBlur={email.blur}
          placeholder="ada@arena.com"
          className="w-full rounded-md border border-border bg-card px-3 py-2 font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        {email.error ? <span className="mt-1 block font-mono text-[11px] text-destructive">{email.error}</span> : null}
      </label>
      <label className="block">
        <span className="mb-1 block font-mono text-[11px] uppercase text-muted-foreground">Password</span>
        <input
          type="password"
          value={String(password.value)}
          onChange={(e) => password.set(e.target.value)}
          onBlur={password.blur}
          placeholder="••••••"
          className="w-full rounded-md border border-border bg-card px-3 py-2 font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        {password.error ? <span className="mt-1 block font-mono text-[11px] text-destructive">{password.error}</span> : null}
      </label>
      <button
        type="submit"
        className="rounded-md bg-primary px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Validate
      </button>
      {sent ? (
        <span role="status" className="font-mono text-[11px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Valid. Ready to print.
        </span>
      ) : null}
    </form>
  );
}

export const wave22Previews: Record<string, React.ComponentType> = {
  "combobox-v2": function ComboboxV2Preview() {
    const [value, setValue] = React.useState("orch");
    return (
      <div className="w-full max-w-xs">
        <ComboboxV2
          value={value}
          onSelectionChange={(v) => setValue(v)}
          options={[
            { value: "orch", label: "Orchestra" },
            { value: "balc", label: "Balcony" },
            { value: "vip", label: "VIP Box" },
          ]}
        />
      </div>
    );
  },

  "select-v2": function SelectV2Preview() {
    const [value, setValue] = React.useState("b1");
    return (
      <div className="w-full max-w-xs">
        <SelectV2
          value={value}
          onValueChange={(v) => setValue(v)}
          label="Tier"
          groups={[
            { label: "Floor", options: [{ value: "a1", label: "Row A" }, { value: "b1", label: "Row B" }] },
            { label: "Upper", options: [{ value: "c1", label: "Balcony", disabled: true }] },
          ]}
        />
      </div>
    );
  },

  "input-otp": function InputOtpPreview() {
    const [pin, setPin] = React.useState("");
    return (
      <div className="flex flex-col items-center gap-2">
        <InputOtp value={pin} onValueChange={setPin} label="Gate code" />
        <span className="font-mono text-[11px] text-muted-foreground">Value: {pin || "—"}</span>
      </div>
    );
  },

  "form-validation": function FormValidationPreview() {
    return <EmailValidationDemo />;
  },

  "language-select": function LanguageSelectPreview() {
    const [lang, setLang] = React.useState("en");
    return (
      <div className="w-full max-w-xs">
        <LanguageSelect value={lang} onValueChange={setLang} label="Language" />
      </div>
    );
  },

  "timezone-select": function TimezoneSelectPreview() {
    const [zone, setZone] = React.useState("Europe/Istanbul");
    return (
      <div className="w-full max-w-xs">
        <TimezoneSelect value={zone} onValueChange={setZone} label="Timezone" />
      </div>
    );
  },

  "number-input": function NumberInputPreview() {
    const [amount, setAmount] = React.useState(4500);
    return (
      <div className="flex w-full max-w-xs flex-col items-center gap-2">
        <NumberInput value={amount} onValueChange={setAmount} currency="$" aria-label="Amount" />
        <span className="font-mono text-[11px] text-muted-foreground">Cents: {amount}</span>
      </div>
    );
  },

  "search-command": function SearchCommandPreview() {
    return (
      <div className="w-full max-w-sm">
        <SearchCommand
          items={[
            { id: "1", label: "Print stubs", hint: "Box office" },
            { id: "2", label: "Open seat map", hint: "Navigation" },
            { id: "3", label: "Refund order", hint: "Billing" },
          ]}
        />
      </div>
    );
  },

  "slider-range-label": function SliderRangeLabelPreview() {
    const [range, setRange] = React.useState<[number, number]>([30, 120]);
    return (
      <div className="w-full max-w-sm">
        <SliderRangeLabel value={range} onValueChange={setRange} min={0} max={200} format={(v) => `$${v}`} />
      </div>
    );
  },

  "file-image-preview": function FileImagePreviewPreview() {
    return (
      <div className="w-full max-w-sm">
        <FileImagePreview />
      </div>
    );
  },

  "input-mask-phone": function InputMaskPhonePreview() {
    const [phone, setPhone] = React.useState("");
    const [done, setDone] = React.useState(false);
    return (
      <div className="flex w-full max-w-xs flex-col items-center gap-2">
        <InputMaskPhone
          value={phone}
          onValueChange={(v, complete) => {
            setPhone(v);
            setDone(complete);
          }}
          aria-label="Phone"
        />
        <span className="font-mono text-[11px] text-muted-foreground">{done ? "Complete" : "Typing…"}</span>
      </div>
    );
  },

  "date-time-picker": function DateTimePickerPreview() {
    return (
      <div className="w-full max-w-sm">
        <DateTimePicker label="Showtime" />
      </div>
    );
  },

  "range-calendar": function RangeCalendarPreview() {
    const [start, setStart] = React.useState("");
    const [end, setEnd] = React.useState("");
    return (
      <div className="flex flex-col items-center gap-2">
        <RangeCalendar
          start={start}
          end={end}
          onRangeChange={(s, e) => {
            setStart(s);
            setEnd(e);
          }}
        />
        <span className="font-mono text-[11px] text-muted-foreground">
          {start || "—"} → {end || "—"}
        </span>
      </div>
    );
  },

  "inline-multiselect": function InlineMultiselectPreview() {
    const [tags, setTags] = React.useState<string[]>(["VIP"]);
    return (
      <div className="w-full max-w-sm">
        <InlineMultiselect
          value={tags}
          onValueChange={setTags}
          options={["VIP", "Balcony", "Orchestra", "Standing", "Press"]}
          label="Tiers"
        />
      </div>
    );
  },

  "signature-line": function SignatureLinePreview() {
    return (
      <div className="w-full max-w-sm">
        <SignatureLine />
      </div>
    );
  },

  "stamp-field": function StampFieldPreview() {
    return (
      <div className="w-full max-w-sm">
        <StampField />
      </div>
    );
  },

  "credit-card-input": function CreditCardInputPreview() {
    return (
      <div className="w-full max-w-sm">
        <CreditCardInput label="Payment card" />
      </div>
    );
  },

  "activity-calendar": function ActivityCalendarPreview() {
    return (
      <div className="w-full max-w-md">
        <ActivityCalendar
          label="Contributions"
          weeks={10}
          data={{ [new Date().toISOString().slice(0, 10)]: 5 }}
        />
      </div>
    );
  },

  "smart-search-bar": function SmartSearchBarPreview() {
    return (
      <div className="w-full max-w-md">
        <SmartSearchBar />
      </div>
    );
  },

  "star-rating-input": function StarRatingInputPreview() {
    const [stars, setStars] = React.useState(4);
    return (
      <div className="flex flex-col items-center gap-2">
        <StarRatingInput value={stars} onValueChange={setStars} label="Rate the show" />
      </div>
    );
  },

  "color-palette-picker": function ColorPalettePickerPreview() {
    return (
      <div className="w-full max-w-sm">
        <ColorPalettePicker label="Theme" />
      </div>
    );
  },
};
