"use client";

import * as React from "react";
import { CronBuilder } from "@/components/ui/cron-builder";
import { ColorTokenTable } from "@/components/ui/color-token-table";
import { SnippetCard } from "@/components/ui/snippet-card";
import { ConsolePanel } from "@/components/ui/console-panel";
import { EnvEditor } from "@/components/ui/env-editor";
import { WorldMap } from "@/components/ui/world-map";
import { BubbleChart } from "@/components/ui/bubble-chart";
import { WordCloud } from "@/components/ui/word-cloud";
import { NetworkGraph } from "@/components/ui/network-graph";
import { SunburstChart } from "@/components/ui/sunburst-chart";
import { CheckboxCard } from "@/components/ui/checkbox-card";
import { RadioTile } from "@/components/ui/radio-tile";
import { SwitchCard } from "@/components/ui/switch-card";
import { FieldArray } from "@/components/ui/field-array";
import { CharCounter } from "@/components/ui/char-counter";
import { PasswordInput } from "@/components/ui/password-input";
import { ConsentCheckbox } from "@/components/ui/consent-checkbox";
import { AddressForm } from "@/components/ui/address-form";
import { CurrencySelect } from "@/components/ui/currency-select";
import { CountrySelect } from "@/components/ui/country-select";
import { DurationInput } from "@/components/ui/duration-input";
import { SerialInput } from "@/components/ui/serial-input";
import { TicketValidator } from "@/components/ui/ticket-validator";

export const wave18Previews: Record<string, React.ComponentType> = {
  "cron-builder": () => <CronBuilder />,
  "color-token-table": () => <ColorTokenTable tokens={[{ name: "accent", value: "#BC3A28", cssVar: "--accent" }]} />,
  "snippet-card": () => <SnippetCard code="const ticket = true;" language="ts" filename="ticket.ts" />,
  "console-panel": () => <ConsolePanel lines={[{ id: "1", text: "ticket confirmed", tone: "accent" }]} />,
  "env-editor": () => <EnvEditor />,
  "world-map": () => <WorldMap data={[{ code: "TR", value: 850 }, { code: "US", value: 331 }]} height={180} />,
  "bubble-chart": () => <BubbleChart points={[{ id: "a", x: 25, y: 30, size: 50, label: "A" }]} height={180} />,
  "word-cloud": () => <WordCloud words={[{ word: "ticket", weight: 90 }, { word: "stage", weight: 50 }]} />,
  "network-graph": () => <NetworkGraph nodes={[{ id: "a", label: "A", x: 25, y: 30 }, { id: "b", label: "B", x: 70, y: 40 }]} edges={[{ from: "a", to: "b" }]} height={180} />,
  "sunburst-chart": () => <SunburstChart slices={[{ id: "1", label: "Primary", value: 100, parentId: null }, { id: "2", label: "Secondary", value: 60, parentId: "1" }]} height={200} />,
  "checkbox-card": () => <CheckboxCard title="Subscribe to newsletter" description="Weekly updates & offers" />,
  "radio-tile": () => <RadioTile title="Credit Card" value="card" checked />,
  "switch-card": () => <SwitchCard title="Notifications" description="Email alerts" checked />,
  "field-array": () => <FieldArray rows={[{ id: "1", value: "Ticket 1" }]} />,
  "char-counter": () => <CharCounter value="Hello world" max={140} />,
  "password-input": () => <PasswordInput placeholder="Password" />,
  "consent-checkbox": () => <ConsentCheckbox text="I agree to the terms and conditions" required />,
  "address-form": () => <AddressForm />,
  "currency-select": () => <CurrencySelect />,
  "country-select": () => <CountrySelect />,
  "duration-input": () => <DurationInput />,
  "serial-input": () => <SerialInput />,
  "ticket-validator": () => <TicketValidator />,
};
