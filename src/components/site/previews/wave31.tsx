"use client";

import * as React from "react";
import { RecentSearches } from "@/components/ui/recent-searches";
import { TrendingChips } from "@/components/ui/trending-chips";
import { FiltersDrawer } from "@/components/ui/filters-drawer";
import { SavedSearches } from "@/components/ui/saved-searches";
import { ResourceScheduler } from "@/components/ui/resource-scheduler";
import { AgendaList } from "@/components/ui/agenda-list";
import { MiniMonth } from "@/components/ui/mini-month";
import { DensityToggle } from "@/components/ui/density-toggle";
import { ExportMenu } from "@/components/ui/export-menu";
import { BulkActions } from "@/components/ui/bulk-actions";
import { PasskeyButton } from "@/components/ui/passkey-button";
import { MagicLink } from "@/components/ui/magic-link";
import { SsoRow } from "@/components/ui/sso-row";
import { DevicesList } from "@/components/ui/devices-list";
import { DeleteAccount } from "@/components/ui/delete-account";
import { OnboardingChecklist } from "@/components/ui/onboarding-checklist";
import { InviteTeam } from "@/components/ui/invite-team";
import { SampleData } from "@/components/ui/sample-data";
import { StatusPage } from "@/components/ui/status-page";
import { DeployTimeline } from "@/components/ui/deploy-timeline";
import { EnvSwitcher } from "@/components/ui/env-switcher";
import { StickySplit } from "@/components/ui/sticky-split";
import { DockablePanels } from "@/components/ui/dockable-panels";
import { PathBreadcrumb } from "@/components/ui/path-breadcrumb";
import { StorageDonut } from "@/components/ui/storage-donut";
import { GalleryLightbox } from "@/components/ui/gallery-lightbox";
import { InstallPrompt } from "@/components/ui/install-prompt";
import { UpdateToast } from "@/components/ui/update-toast";
import { OfflineQueue } from "@/components/ui/offline-queue";
import { RadialBar } from "@/components/ui/radial-bar";
import { ComposedChart } from "@/components/ui/composed-chart";
import { PromptHistory } from "@/components/ui/prompt-history";
import { UsageQuotaRing } from "@/components/ui/usage-quota-ring";
import { ApiTester } from "@/components/ui/api-tester";
import { WebhookLog } from "@/components/ui/webhook-log";
import { CsvMapper } from "@/components/ui/csv-mapper";

export const wave31Previews: Record<string, React.ComponentType> = {
  "recent-searches": function RecentSearchesPreview() {
    return <div className="w-full max-w-sm"><RecentSearches /></div>;
  },
  "trending-chips": function TrendingChipsPreview() {
    return <div className="w-full max-w-md"><TrendingChips /></div>;
  },
  "filters-drawer": function FiltersDrawerPreview() {
    return <div className="w-full max-w-sm"><FiltersDrawer /></div>;
  },
  "saved-searches": function SavedSearchesPreview() {
    return <div className="w-full max-w-sm"><SavedSearches /></div>;
  },
  "resource-scheduler": function ResourceSchedulerPreview() {
    return <div className="w-full max-w-lg"><ResourceScheduler /></div>;
  },
  "agenda-list": function AgendaListPreview() {
    return <div className="w-full max-w-sm"><AgendaList /></div>;
  },
  "mini-month": function MiniMonthPreview() {
    return <MiniMonth />;
  },
  "density-toggle": function DensityTogglePreview() {
    return <DensityToggle />;
  },
  "export-menu": function ExportMenuPreview() {
    return <ExportMenu />;
  },
  "bulk-actions": function BulkActionsPreview() {
    return <div className="w-full max-w-lg"><BulkActions /></div>;
  },
  "passkey-button": function PasskeyButtonPreview() {
    return <div className="w-full max-w-sm"><PasskeyButton /></div>;
  },
  "magic-link": function MagicLinkPreview() {
    return <div className="w-full max-w-sm"><MagicLink /></div>;
  },
  "sso-row": function SsoRowPreview() {
    return <div className="w-full max-w-sm"><SsoRow /></div>;
  },
  "devices-list": function DevicesListPreview() {
    return <div className="w-full max-w-md"><DevicesList /></div>;
  },
  "delete-account": function DeleteAccountPreview() {
    return <div className="w-full max-w-sm"><DeleteAccount /></div>;
  },
  "onboarding-checklist": function OnboardingChecklistPreview() {
    return <div className="w-full max-w-sm"><OnboardingChecklist /></div>;
  },
  "invite-team": function InviteTeamPreview() {
    return <div className="w-full max-w-sm"><InviteTeam /></div>;
  },
  "sample-data": function SampleDataPreview() {
    return <div className="w-full max-w-sm"><SampleData /></div>;
  },
  "status-page": function StatusPagePreview() {
    return <div className="w-full max-w-md"><StatusPage /></div>;
  },
  "deploy-timeline": function DeployTimelinePreview() {
    return <div className="w-full max-w-lg"><DeployTimeline /></div>;
  },
  "env-switcher": function EnvSwitcherPreview() {
    return <EnvSwitcher />;
  },
  "sticky-split": function StickySplitPreview() {
    return <div className="w-full max-w-lg"><StickySplit /></div>;
  },
  "dockable-panels": function DockablePanelsPreview() {
    return <div className="w-full max-w-lg"><DockablePanels /></div>;
  },
  "path-breadcrumb": function PathBreadcrumbPreview() {
    return <div className="w-full max-w-lg"><PathBreadcrumb /></div>;
  },
  "storage-donut": function StorageDonutPreview() {
    return <div className="w-full max-w-xs"><StorageDonut /></div>;
  },
  "gallery-lightbox": function GalleryLightboxPreview() {
    return <div className="w-full max-w-md"><GalleryLightbox /></div>;
  },
  "install-prompt": function InstallPromptPreview() {
    return <div className="w-full max-w-md"><InstallPrompt /></div>;
  },
  "update-toast": function UpdateToastPreview() {
    return <div className="w-full max-w-sm"><UpdateToast /></div>;
  },
  "offline-queue": function OfflineQueuePreview() {
    return <div className="w-full max-w-sm"><OfflineQueue /></div>;
  },
  "radial-bar": function RadialBarPreview() {
    return <div className="w-full max-w-xs"><RadialBar /></div>;
  },
  "composed-chart": function ComposedChartPreview() {
    return <div className="w-full max-w-sm"><ComposedChart /></div>;
  },
  "prompt-history": function PromptHistoryPreview() {
    return <div className="w-full max-w-md"><PromptHistory /></div>;
  },
  "usage-quota-ring": function UsageQuotaRingPreview() {
    return <div className="w-full max-w-xs"><UsageQuotaRing /></div>;
  },
  "api-tester": function ApiTesterPreview() {
    return <div className="w-full max-w-lg"><ApiTester /></div>;
  },
  "webhook-log": function WebhookLogPreview() {
    return <div className="w-full max-w-md"><WebhookLog /></div>;
  },
  "csv-mapper": function CsvMapperPreview() {
    return <div className="w-full max-w-md"><CsvMapper /></div>;
  },
};
