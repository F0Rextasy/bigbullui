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
  "keyboard-nav-helper": () => <KeyboardNavHelper shortcuts={[{ keys: ["⌘", "K"], label: "Command palette" }]} />,
  "data-grid": () => <DataGrid columns={[{ key: "name", header: "Name", sortable: true }, { key: "qty", header: "Qty" }]} rows={[{ name: "Ticket", qty: 2 }, { name: "VIP", qty: 1 }]} />,
  "tree-table": () => <TreeTable nodes={[{ id: "1", label: "Main", value: "10", children: [{ id: "1a", label: "Sub", value: "4" }] }]} />,
  "kanban-v2": () => <KanbanV2 columns={[{ id: "todo", title: "Todo", cards: [{ id: "c1", label: "Print ticket" }] }]} />,
  "board-checklist": () => <BoardChecklist items={[{ id: "1", label: "Setup stage", done: true, priority: "high" }]} />,
  "task-list": () => <TaskList tasks={[{ id: "1", label: "Print poster", assignee: "AL", priority: "med" }]} />,
  "timeline-vertical-v2": () => <TimelineVerticalV2 items={[{ id: "1", title: "Doors open", time: "18:00" }, { id: "2", title: "Showtime", time: "20:00" }]} />,
  "feed-masonry": () => <FeedMasonry items={[{ id: "1", content: <p className="text-sm">Feed item 1</p> }, { id: "2", content: <p className="text-sm">Feed item 2</p> }]} />,
  "inbox-list": () => <InboxList items={[{ id: "1", from: "Ada", initials: "AL", subject: "Ticket confirmation", preview: "Your ticket is confirmed.", time: "2m", unread: true }]} />,
  "notification-feed": () => <NotificationFeed notifications={[{ id: "1", title: "New ticket", body: "VIP tier sold", time: "1m", type: "success", unread: true }]} />,
  "activity-v2": () => <ActivityV2 items={[{ id: "1", actor: "Ada", action: "created", target: "ticket", time: "2m" }]} filters={["created"]} />,
  "rank-list": () => <RankList items={[{ id: "1", label: "First Place", score: 900 }, { id: "2", label: "Second Place", score: 750 }]} />,
  "table-summary": () => <TableSummary caption="Summary" rows={[{ id: "1", label: "Subtotal", value: "$90" }, { id: "2", label: "Total", value: "$108", bold: true }]} />,
  "row-expand": () => <RowExpandList items={[{ id: "1", label: "Details", detail: "Expanded row content" }]} />,
  "column-toggle": () => <ColumnToggle columns={[{ id: "name", label: "Name" }, { id: "qty", label: "Qty", visible: false }]} />,
  "wizard": () => <Wizard steps={[{ id: "1", title: "Seat" }, { id: "2", title: "Payment" }]}><div /><div /></Wizard>,
  "stepper-v2": () => <StepperV2 current={1} steps={[{ id: "1", title: "Seat" }, { id: "2", title: "Payment" }]} />,
  "mega-menu": () => <MegaMenu trigger={<button className="rounded-md border border-border px-3 py-1.5 text-xs">Menu ▾</button>} columns={[{ title: "Tickets", links: [{ label: "Purchase" }] }]} />,
  "drawer-nav": () => <DrawerNav open={false} onOpenChange={() => {}} items={[{ id: "1", label: "Navigation" }]} />,
  "footer-nav": () => <FooterNav columns={[{ title: "Product", links: [{ label: "Tickets" }] }]} />,
  "anchor-nav": () => <AnchorNav items={[{ id: "preview", label: "Preview" }, { id: "usage", label: "Usage" }]} />,
  "quick-actions": () => <QuickActions actions={[{ id: "1", label: "Print", shortcut: "⌘P" }, { id: "2", label: "Delete", danger: true }]} />,
  "history-nav": () => <HistoryNav entries={[{ id: "1", label: "Home" }, { id: "2", label: "Docs" }, { id: "3", label: "Ticket" }]} />,
  "page-tabs": () => <PageTabs tabs={[{ id: "1", label: "General" }, { id: "2", label: "Details" }]} />,
};
