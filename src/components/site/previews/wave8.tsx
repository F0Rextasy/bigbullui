"use client";
import * as React from "react";
import { TimeAgo } from "@/components/ui/time-ago";
import { LiveClock } from "@/components/ui/live-clock";
import { Typewriter } from "@/components/ui/typewriter";
import { HighlightText } from "@/components/ui/highlight-text";
import { Truncate } from "@/components/ui/truncate";
import { TextDiff } from "@/components/ui/text-diff";
import { CurrencyDisplay } from "@/components/ui/currency-display";
import { CopyChip } from "@/components/ui/copy-chip";

export const wave8Previews: Record<string, React.ComponentType> = {
  "time-ago": function TimeAgoPreview() {
    return (
      <div className="p-4 border border-border bg-card">
        <TimeAgo date={new Date()} live />
      </div>
    );
  },
  "live-clock": function LiveClockPreview() {
    return (
      <div className="p-4 border border-border bg-card">
        <LiveClock timezone="UTC" variant="digital" />
      </div>
    );
  },
  "typewriter": function TypewriterPreview() {
    return (
      <div className="p-4 border border-border bg-card">
        <Typewriter
          phrases={["Hello world", "Big Bull UI", "Typewriter component"]}
          speed={100}
          loop
        />
      </div>
    );
  },
  "highlight-text": function HighlightTextPreview() {
    return (
      <div className="p-4 border border-border bg-card">
        <HighlightText
          text="The quick brown fox jumps over the lazy dog"
          query="fox"
        />
      </div>
    );
  },
  "truncate": function TruncatePreview() {
    return (
      <div className="p-4 border border-border bg-card">
        <Truncate lines={2} expandable>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </Truncate>
      </div>
    );
  },
  "text-diff": function TextDiffPreview() {
    return (
      <div className="p-4 border border-border bg-card">
        <TextDiff
          before="Hello world this is a test"
          after="Hello world this is a new test"
          mode="inline"
        />
      </div>
    );
  },
  "currency-display": function CurrencyDisplayPreview() {
    return (
      <div className="p-4 border border-border bg-card">
        <CurrencyDisplay amount={1234.56} currency="USD" animated />
      </div>
    );
  },
  "copy-chip": function CopyChipPreview() {
    return (
      <div className="p-4 border border-border bg-card">
        <CopyChip value="Hello Big Bull UI" label="Copy" />
      </div>
    );
  },
};