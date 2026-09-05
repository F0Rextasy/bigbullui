"use client";

import * as React from "react";
import { Carousel } from "@/components/ui/carousel";
import { PhoneInput } from "@/components/ui/phone-input";
import { EmailInput } from "@/components/ui/email-input";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { MonthPicker } from "@/components/ui/month-picker";
import { YearPicker } from "@/components/ui/year-picker";
import { TimeRangePicker } from "@/components/ui/time-range-picker";
import { ClockPicker } from "@/components/ui/clock-picker";
import { HotkeyRecorder } from "@/components/ui/hotkey-recorder";
import { FileInput } from "@/components/ui/file-input";
import { SliderTicks } from "@/components/ui/slider-ticks";

export const wave11Previews: Record<string, React.ComponentType> = {
  "phone-input": function PhoneInputPreview() {
    return (
      <PhoneInput
        defaultValue="+1 (555) 123-4567"
        onValueChange={(v) => console.log("changed", v)}
      />
    );
  },
  "email-input": function EmailInputPreview() {
    return (
      <EmailInput
        defaultValue="test@example.com"
        validate
        onValueChange={(v) => console.log("changed", v)}
      />
    );
  },
  "date-range-picker": function DateRangePickerPreview() {
    return (
      <DateRangePicker
        defaultValue={[
          new Date(2024, 0, 1),
          new Date(2024, 0, 7),
        ]}
        onValueChange={(v) => console.log("changed", v)}
      />
    );
  },
  "month-picker": function MonthPickerPreview() {
    return (
      <MonthPicker
        defaultValue={new Date().getMonth()}
        onValueChange={(v) => console.log("changed", v)}
      />
    );
  },
  "year-picker": function YearPickerPreview() {
    return (
      <YearPicker
        defaultValue={new Date().getFullYear()}
        onValueChange={(v) => console.log("changed", v)}
      />
    );
  },
  "time-range-picker": function TimeRangePickerPreview() {
    return (
      <TimeRangePicker
        defaultValue={["09:00", "17:00"]}
        onValueChange={(v) => console.log("changed", v)}
      />
    );
  },
  "clock-picker": function ClockPickerPreview() {
    return (
      <ClockPicker
        defaultValue="09:00"
        onValueChange={(v) => console.log("changed", v)}
      />
    );
  },
  "hotkey-recorder": function HotkeyRecorderPreview() {
    return (
      <HotkeyRecorder
        defaultValue="Ctrl+Shift+Z"
        onValueChange={(v) => console.log("changed", v)}
      />
    );
  },
  "file-input": function FileInputPreview() {
    return (
      <FileInput
        multiple
        onFilesChange={() => console.log("files changed")}
      />
    );
  },
  "slider-ticks": function SliderTicksPreview() {
    return (
      <SliderTicks
        min={0}
        max={100}
        step={1}
        ticks={[0, 25, 50, 75, 100]}
        defaultValue={50}
        onValueChange={(v) => console.log("changed", v)}
      />
    );
  },
};