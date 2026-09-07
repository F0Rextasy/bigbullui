"use client";

import * as React from "react";
import { PrintInvoice } from "@/components/ui/print-invoice";
import { OtpV2 } from "@/components/ui/otp-v2";
import { MasterDetail } from "@/components/ui/master-detail";
import { HolyGrail } from "@/components/ui/holy-grail";
import { SplitView } from "@/components/ui/split-view";
import { StoryRing } from "@/components/ui/story-ring";
import { PollResults } from "@/components/ui/poll-results";
import { SeasonalSnow } from "@/components/ui/seasonal-snow";
import { SeasonalPumpkin } from "@/components/ui/seasonal-pumpkin";
import { EmptySearch } from "@/components/ui/empty-search";
import { EmptyOffline } from "@/components/ui/empty-offline";
import { Error500 } from "@/components/ui/error-500";
import { MaintenancePage } from "@/components/ui/maintenance-page";
import { ChangelogEntry } from "@/components/ui/changelog-entry";
import { RoadmapBoard } from "@/components/ui/roadmap-board";
import { WallOfLove } from "@/components/ui/wall-of-love";
import { NewsletterBox } from "@/components/ui/newsletter-box";
import { CookiePrefs } from "@/components/ui/cookie-prefs";
import { SitemapList } from "@/components/ui/sitemap-list";
import { KeyboardShortcuts } from "@/components/ui/keyboard-shortcuts";
import { CommandKRoot } from "@/components/ui/command-k-root";
import { ThemePresetPicker } from "@/components/ui/theme-preset-picker";
import { FormBuilder } from "@/components/ui/form-builder";
import { SpreadsheetLite } from "@/components/ui/spreadsheet-lite";
import { ImportReview } from "@/components/ui/import-review";
import { ConditionalFields } from "@/components/ui/conditional-fields";
import { PricingCalculator } from "@/components/ui/pricing-calculator";
import { StatsBand } from "@/components/ui/stats-band";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";
import { LogoMarquee } from "@/components/ui/logo-marquee";
import { NpsSurvey } from "@/components/ui/nps-survey";
import { BugReport } from "@/components/ui/bug-report";
import { FeatureVote } from "@/components/ui/feature-vote";
import { PushPermission } from "@/components/ui/push-permission";
import { DigestPreview } from "@/components/ui/digest-preview";

export const wave30Previews: Record<string, React.ComponentType> = {
  "print-invoice": function PrintInvoicePreview() {
    return <PrintInvoice />;
  },
  "otp-v2": function OtpV2Preview() {
    const [code, setCode] = React.useState<string | null>(null);
    return (
      <div className="flex flex-col items-center gap-2">
        <OtpV2 onComplete={setCode} />
        {code && <span className="font-mono text-[11px] text-accent">CODE {code}</span>}
      </div>
    );
  },
  "master-detail": function MasterDetailPreview() {
    return <MasterDetail />;
  },
  "holy-grail": function HolyGrailPreview() {
    return (
      <HolyGrail>
        <p className="font-mono text-xs text-muted-foreground">Tonight: 3 acts, 2 encores.</p>
      </HolyGrail>
    );
  },
  "split-view": function SplitViewPreview() {
    return (
      <SplitView
        left={<p className="font-mono text-xs">Orders queue</p>}
        right={<p className="font-mono text-xs">Stub detail</p>}
      />
    );
  },
  "story-ring": function StoryRingPreview() {
    return (
      <div className="flex gap-3">
        <StoryRing name="Ada" seen={3} />
        <StoryRing name="Jon" seen={1} />
        <StoryRing name="Pri" seen={0} />
      </div>
    );
  },
  "poll-results": function PollResultsPreview() {
    return <PollResults />;
  },
  "seasonal-snow": function SeasonalSnowPreview() {
    return <SeasonalSnow />;
  },
  "seasonal-pumpkin": function SeasonalPumpkinPreview() {
    return <SeasonalPumpkin />;
  },
  "empty-search": function EmptySearchPreview() {
    return <EmptySearch />;
  },
  "empty-offline": function EmptyOfflinePreview() {
    return <EmptyOffline />;
  },
  "error-500": function Error500Preview() {
    return <Error500 />;
  },
  "maintenance-page": function MaintenancePagePreview() {
    return <MaintenancePage />;
  },
  "changelog-entry": function ChangelogEntryPreview() {
    return <ChangelogEntry />;
  },
  "roadmap-board": function RoadmapBoardPreview() {
    return <RoadmapBoard />;
  },
  "wall-of-love": function WallOfLovePreview() {
    return <WallOfLove />;
  },
  "newsletter-box": function NewsletterBoxPreview() {
    return <NewsletterBox />;
  },
  "cookie-prefs": function CookiePrefsPreview() {
    return <CookiePrefs />;
  },
  "sitemap-list": function SitemapListPreview() {
    return <SitemapList />;
  },
  "keyboard-shortcuts": function KeyboardShortcutsPreview() {
    return <KeyboardShortcuts />;
  },
  "command-k-root": function CommandKRootPreview() {
    return <CommandKRoot />;
  },
  "theme-preset-picker": function ThemePresetPickerPreview() {
    return <ThemePresetPicker />;
  },
  "form-builder": function FormBuilderPreview() {
    return <FormBuilder />;
  },
  "spreadsheet-lite": function SpreadsheetLitePreview() {
    return <SpreadsheetLite />;
  },
  "import-review": function ImportReviewPreview() {
    return <ImportReview />;
  },
  "conditional-fields": function ConditionalFieldsPreview() {
    return <ConditionalFields />;
  },
  "pricing-calculator": function PricingCalculatorPreview() {
    return <PricingCalculator />;
  },
  "stats-band": function StatsBandPreview() {
    return <StatsBand />;
  },
  "testimonial-carousel": function TestimonialCarouselPreview() {
    return <TestimonialCarousel />;
  },
  "logo-marquee": function LogoMarqueePreview() {
    return <LogoMarquee />;
  },
  "nps-survey": function NpsSurveyPreview() {
    return <NpsSurvey />;
  },
  "bug-report": function BugReportPreview() {
    return <BugReport />;
  },
  "feature-vote": function FeatureVotePreview() {
    return <FeatureVote />;
  },
  "push-permission": function PushPermissionPreview() {
    return <PushPermission />;
  },
  "digest-preview": function DigestPreviewPreview() {
    return <DigestPreview />;
  },
};
