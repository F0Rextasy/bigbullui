"use client";

import * as React from "react";
import { WebhookList } from "@/components/ui/webhook-list";
import { UpgradePrompt } from "@/components/ui/upgrade-prompt";
import { MaintenanceBanner } from "@/components/ui/maintenance-banner";
import { OfflineBanner } from "@/components/ui/offline-banner";
import { ErrorPage } from "@/components/ui/error-page";
import { PermissionDenied } from "@/components/ui/permission-denied";
import { FormProgress } from "@/components/ui/form-progress";
import { SaveIndicator } from "@/components/ui/save-indicator";
import { ConnectionStatus } from "@/components/ui/connection-status";
import { VersionBadge } from "@/components/ui/version-badge";
import { FeatureFlagPanel } from "@/components/ui/feature-flag-panel";
import { SyncStatus } from "@/components/ui/sync-status";
import { QueuedJobs } from "@/components/ui/queued-jobs";
import { UploadProgress } from "@/components/ui/upload-progress";
import { MigrationBanner } from "@/components/ui/migration-banner";
import { RateLimitNote } from "@/components/ui/rate-limit-note";
import { BentoGrid } from "@/components/ui/bento-grid";
import { SplitScreen } from "@/components/ui/split-screen";
import { StickyFooter } from "@/components/ui/sticky-footer";
import { CenteredCard } from "@/components/ui/centered-card";
import { TwoColumnList } from "@/components/ui/two-column-list";
import { MasonryColumns } from "@/components/ui/masonry-columns";
import { HeroSplit } from "@/components/ui/hero-split";
import { FooterMinimal } from "@/components/ui/footer-minimal";
import { ResponsiveNav } from "@/components/ui/responsive-nav";

export const wave14Previews: Record<string, React.ComponentType> = {
  "webhook-list": () => <WebhookList webhooks={[{ id: "1", url: "https://api.ornek.com/hook", events: ["order.created"], active: true }]} />,
  "upgrade-prompt": () => <UpgradePrompt />,
  "maintenance-banner": () => <MaintenanceBanner />,
  "offline-banner": () => <OfflineBanner />,
  "error-page": () => <ErrorPage />,
  "permission-denied": () => <PermissionDenied />,
  "form-progress": () => <FormProgress total={5} completed={3} />,
  "save-indicator": () => <SaveIndicator status="saved" />,
  "connection-status": () => <ConnectionStatus latencyMs={45} />,
  "version-badge": () => <div className="flex gap-2"><VersionBadge stage="new" /><VersionBadge stage="beta" /><VersionBadge stage="stable" /></div>,
  "feature-flag-panel": () => <FeatureFlagPanel flags={[{ id: "dark", label: "Koyu tema", enabled: true }]} />,
  "sync-status": () => <SyncStatus status="synced" lastSync="2 dk önce" />,
  "queued-jobs": () => <QueuedJobs jobs={[{ id: "1", label: "Bilet e-postası", status: "running", progress: 60 }]} />,
  "upload-progress": () => <UploadProgress filename="bilet.pdf" progress={65} />,
  "migration-banner": () => <MigrationBanner progress={40} />,
  "rate-limit-note": () => <RateLimitNote />,
  "bento-grid": () => <BentoGrid cells={[{ id: "1", span: 2, content: <p className="text-sm">Geniş kutu</p> }, { id: "2", content: <p className="text-sm">Kutu</p> }]} columns={2} />,
  "split-screen": () => <SplitScreen left={<p className="text-sm">Sol içerik</p>} right={<div className="flex h-full items-center justify-center"><p className="text-sm">Sağ panel</p></div>} hideRightOnMobile={false} />,
  "sticky-footer": () => <div className="relative h-40 rounded-lg border border-border"><StickyFooter left={<span className="text-xs">Yapışkan</span>} right={<span className="font-mono text-xs">₺90</span>} /></div>,
  "centered-card": () => <CenteredCard header={<span className="font-mono text-xs font-bold uppercase tracking-widest">Giriş</span>}><p className="text-center text-sm text-muted-foreground">Kart içeriği</p></CenteredCard>,
  "two-column-list": () => <TwoColumnList items={[{ id: "1", label: "Genel", value: "12" }, { id: "2", label: "VIP", value: "4" }]} />,
  "masonry-columns": () => <MasonryColumns columns={2} items={[{ id: "1", content: <p className="text-sm">Kısa</p> }, { id: "2", content: <p className="text-sm">Bu daha uzun bir kart içeriği</p> }]} />,
  "hero-split": () => <HeroSplit title="Etkinlik biletleri" visual={<div className="flex aspect-video items-center justify-center bg-accent/10 text-sm text-accent">Görsel</div>} />,
  "footer-minimal": () => <FooterMinimal links={[{ label: "Docs", href: "#" }]} />,
  "responsive-nav": () => <ResponsiveNav items={[{ id: "1", label: "Etkinlikler" }, { id: "2", label: "Biletler" }]} />,
};
