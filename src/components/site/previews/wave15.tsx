"use client";

import * as React from "react";
import { KeyboardNavHelper } from "@/components/ui/keyboard-nav-helper";
import { DataGrid } from "@/components/ui/data-grid";
import { TreeTable } from "@/components/ui/tree-table";
import { KanbanV2 } from "@/components/ui/kanban-v2";
import { BoardChecklist } from "@/components/ui/board-checklist";
import { TaskList } from "@/components/ui/task-list";
import { TimelineVerticalV2 } from "@/components/ui/timeline-vertical-v2";
import { FeedMasonry } from "@/components/ui/feed-masonry";
import { InboxList } from "@/components/ui/inbox-list";
import { NotificationFeed } from "@/components/ui/notification-feed";
import { ActivityV2 } from "@/components/ui/activity-v2";
import { RankList } from "@/components/ui/rank-list";
import { TableSummary } from "@/components/ui/table-summary";
import { RowExpandList } from "@/components/ui/row-expand";
import { ColumnToggle } from "@/components/ui/column-toggle";
import { Wizard } from "@/components/ui/wizard";
import { StepperV2 } from "@/components/ui/stepper-v2";
import { MegaMenu } from "@/components/ui/mega-menu";
import { DrawerNav } from "@/components/ui/drawer-nav";
import { FooterNav } from "@/components/ui/footer-nav";
import { AnchorNav } from "@/components/ui/anchor-nav";
import { QuickActions } from "@/components/ui/quick-actions";
import { HistoryNav } from "@/components/ui/history-nav";
import { PageTabs } from "@/components/ui/page-tabs";

export const wave15Previews: Record<string, React.ComponentType> = {
  "keyboard-nav-helper": () => <KeyboardNavHelper shortcuts={[{ keys: ["⌘", "K"], label: "Komut paleti" }]} />,
  "data-grid": () => <DataGrid columns={[{ key: "name", header: "Ad", sortable: true }, { key: "qty", header: "Adet" }]} rows={[{ name: "Bilet", qty: 2 }, { name: "VIP", qty: 1 }]} />,
  "tree-table": () => <TreeTable nodes={[{ id: "1", label: "Ana", value: "10", children: [{ id: "1a", label: "Alt", value: "4" }] }]} />,
  "kanban-v2": () => <KanbanV2 columns={[{ id: "todo", title: "Yapılacak", cards: [{ id: "c1", label: "Bilet bas" }] }]} />,
  "board-checklist": () => <BoardChecklist items={[{ id: "1", label: "Sahne kur", done: true, priority: "high" }]} />,
  "task-list": () => <TaskList tasks={[{ id: "1", label: "Poster bas", assignee: "AL", priority: "med" }]} />,
  "timeline-vertical-v2": () => <TimelineVerticalV2 items={[{ id: "1", title: "Kapılar", time: "18:00" }, { id: "2", title: "Konser", time: "20:00" }]} />,
  "feed-masonry": () => <FeedMasonry items={[{ id: "1", content: <p className="text-sm">Akış 1</p> }, { id: "2", content: <p className="text-sm">Akış 2 içeriği</p> }]} />,
  "inbox-list": () => <InboxList items={[{ id: "1", from: "Ada", initials: "AL", subject: "Bilet onayı", preview: "Biletiniz hazır.", time: "2dk", unread: true }]} />,
  "notification-feed": () => <NotificationFeed notifications={[{ id: "1", title: "Yeni bilet", body: "VIP satıldı", time: "1dk", type: "success", unread: true }]} />,
  "activity-v2": () => <ActivityV2 items={[{ id: "1", actor: "Ada", action: "oluşturdu", target: "bilet", time: "2dk" }]} filters={["oluşturdu"]} />,
  "rank-list": () => <RankList items={[{ id: "1", label: "Birinci", score: 900 }, { id: "2", label: "İkinci", score: 750 }]} />,
  "table-summary": () => <TableSummary caption="Özet" rows={[{ id: "1", label: "Ara toplam", value: "₺90" }, { id: "2", label: "Toplam", value: "₺108", bold: true }]} />,
  "row-expand": () => <RowExpandList items={[{ id: "1", label: "Detay", detail: "Genişleyen içerik" }]} />,
  "column-toggle": () => <ColumnToggle columns={[{ id: "name", label: "Ad" }, { id: "qty", label: "Adet", visible: false }]} />,
  "wizard": () => <Wizard steps={[{ id: "1", title: "Koltuk" }, { id: "2", title: "Ödeme" }]}><div /><div /></Wizard>,
  "stepper-v2": () => <StepperV2 current={1} steps={[{ id: "1", title: "Koltuk" }, { id: "2", title: "Ödeme" }]} />,
  "mega-menu": () => <MegaMenu trigger={<button className="rounded-md border border-border px-3 py-1.5 text-xs">Menü ▾</button>} columns={[{ title: "Biletler", links: [{ label: "Satın al" }] }]} />,
  "drawer-nav": () => <DrawerNav open={false} onOpenChange={() => {}} items={[{ id: "1", label: "Bağlantı" }]} />,
  "footer-nav": () => <FooterNav columns={[{ title: "Ürün", links: [{ label: "Biletler" }] }]} />,
  "anchor-nav": () => <AnchorNav items={[{ id: "preview", label: "Önizleme" }, { id: "usage", label: "Kullanım" }]} />,
  "quick-actions": () => <QuickActions actions={[{ id: "1", label: "Bas", shortcut: "⌘P" }, { id: "2", label: "Sil", danger: true }]} />,
  "history-nav": () => <HistoryNav entries={[{ id: "1", label: "Ana" }, { id: "2", label: "Docs" }, { id: "3", label: "Bilet" }]} />,
  "page-tabs": () => <PageTabs tabs={[{ id: "1", label: "Genel" }, { id: "2", label: "Detay" }]} />,
};
