"use client";

import * as React from "react";
import { PromptBox } from "@/components/ui/prompt-box";
import { ChatThread } from "@/components/ui/chat-thread";
import { SuggestionChips } from "@/components/ui/suggestion-chips";
import { JwtDecoder } from "@/components/ui/jwt-decoder";
import { Base64Tool } from "@/components/ui/base64-tool";
import { CronHumanizer } from "@/components/ui/cron-humanizer";
import { ColorContrast } from "@/components/ui/color-contrast";
import { RegexVisualizer } from "@/components/ui/regex-visualizer";
import { JsonFormatter } from "@/components/ui/json-formatter";
import { LoremTyper } from "@/components/ui/lorem-typer";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { SwipeActions } from "@/components/ui/swipe-actions";
import { PullRefresh } from "@/components/ui/pull-refresh";
import { TabbarV2 } from "@/components/ui/tabbar-v2";
import { OnboardingPager } from "@/components/ui/onboarding-pager";
import { ActionSheet } from "@/components/ui/action-sheet";
import { ShiftPlanner } from "@/components/ui/shift-planner";
import { BookingCalendar } from "@/components/ui/booking-calendar";
import { CountdownV2 } from "@/components/ui/countdown-v2";
import { TimelineGantt } from "@/components/ui/timeline-gantt";
import { RecurrencePicker } from "@/components/ui/recurrence-picker";
import { PivotLite } from "@/components/ui/pivot-lite";
import { FilterBuilder } from "@/components/ui/filter-builder";
import { CsvImporter } from "@/components/ui/csv-importer";
import { AuditTimeline } from "@/components/ui/audit-timeline";
import { CompareTable } from "@/components/ui/compare-table";
import { ThemeStampingMachine } from "@/components/ui/theme-stamping-machine";
import { DocsPropPlayground } from "@/components/ui/docs-prop-playground";
import { DocsStackblitzButton } from "@/components/ui/docs-stackblitz-button";
import { TicketDeckDnd } from "@/components/ui/ticket-deck-dnd";

export const wave27Previews: Record<string, React.ComponentType> = {
  "prompt-box": function PromptBoxPreview() {
    return <div className="w-full max-w-md"><PromptBox /></div>;
  },
  "chat-thread": function ChatThreadPreview() {
    return <div className="w-full max-w-md"><ChatThread /></div>;
  },
  "suggestion-chips": function SuggestionChipsPreview() {
    return <SuggestionChips />;
  },
  "jwt-decoder": function JwtDecoderPreview() {
    return <div className="w-full max-w-lg"><JwtDecoder /></div>;
  },
  "base64-tool": function Base64ToolPreview() {
    return <div className="w-full max-w-md"><Base64Tool /></div>;
  },
  "cron-humanizer": function CronHumanizerPreview() {
    return <div className="w-full max-w-md"><CronHumanizer /></div>;
  },
  "color-contrast": function ColorContrastPreview() {
    return <div className="w-full max-w-md"><ColorContrast /></div>;
  },
  "regex-visualizer": function RegexVisualizerPreview() {
    return <div className="w-full max-w-md"><RegexVisualizer /></div>;
  },
  "json-formatter": function JsonFormatterPreview() {
    return <div className="w-full max-w-md"><JsonFormatter /></div>;
  },
  "lorem-typer": function LoremTyperPreview() {
    return <div className="w-full max-w-md"><LoremTyper /></div>;
  },
  "bottom-sheet": function BottomSheetPreview() {
    return <BottomSheet />;
  },
  "swipe-actions": function SwipeActionsPreview() {
    return <div className="w-full max-w-md"><SwipeActions /></div>;
  },
  "pull-refresh": function PullRefreshPreview() {
    return <div className="w-full max-w-md"><PullRefresh /></div>;
  },
  "tabbar-v2": function TabbarV2Preview() {
    return <div className="w-full max-w-md"><TabbarV2 /></div>;
  },
  "onboarding-pager": function OnboardingPagerPreview() {
    return <div className="w-full max-w-sm"><OnboardingPager /></div>;
  },
  "action-sheet": function ActionSheetPreview() {
    return <div className="w-full max-w-sm"><ActionSheet /></div>;
  },
  "shift-planner": function ShiftPlannerPreview() {
    return <div className="w-full max-w-md"><ShiftPlanner /></div>;
  },
  "booking-calendar": function BookingCalendarPreview() {
    return <div className="w-full max-w-sm"><BookingCalendar /></div>;
  },
  "countdown-v2": function CountdownV2Preview() {
    return <div className="w-full max-w-md"><CountdownV2 /></div>;
  },
  "timeline-gantt": function TimelineGanttPreview() {
    return <div className="w-full max-w-lg"><TimelineGantt /></div>;
  },
  "recurrence-picker": function RecurrencePickerPreview() {
    return <div className="w-full max-w-md"><RecurrencePicker /></div>;
  },
  "pivot-lite": function PivotLitePreview() {
    return <div className="w-full max-w-lg"><PivotLite /></div>;
  },
  "filter-builder": function FilterBuilderPreview() {
    return <div className="w-full max-w-lg"><FilterBuilder /></div>;
  },
  "csv-importer": function CsvImporterPreview() {
    return <div className="w-full max-w-md"><CsvImporter /></div>;
  },
  "audit-timeline": function AuditTimelinePreview() {
    return <div className="w-full max-w-md"><AuditTimeline /></div>;
  },
  "compare-table": function CompareTablePreview() {
    return <div className="w-full max-w-lg"><CompareTable /></div>;
  },
  "theme-stamping-machine": function ThemeStampingMachinePreview() {
    return <div className="w-full max-w-md"><ThemeStampingMachine /></div>;
  },
  "docs-prop-playground": function DocsPropPlaygroundPreview() {
    return <div className="w-full max-w-2xl"><DocsPropPlayground /></div>;
  },
  "docs-stackblitz-button": function DocsStackblitzButtonPreview() {
    return <DocsStackblitzButton />;
  },
  "ticket-deck-dnd": function TicketDeckDndPreview() {
    return <TicketDeckDnd />;
  },
};
