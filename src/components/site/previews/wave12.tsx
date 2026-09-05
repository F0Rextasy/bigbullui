"use client";

import * as React from "react";
import { ActivityFeed } from "@/components/ui/activity-feed";
import { AnnouncementBar } from "@/components/ui/announcement-bar";
import { CodeBlock } from "@/components/ui/code-block";
import { CreditCard } from "@/components/ui/credit-card";
import { FileUploadList } from "@/components/ui/file-upload-list";
import { trapFocus } from "@/components/ui/lib/focus-trap";
import { useCopy, useLocalStorage } from "@/components/ui/lib/hooks";
import { SkeletonV2, SkeletonText, SkeletonCard } from "@/components/ui/skeleton-v2";
import { StatusDot } from "@/components/ui/status-dot";

export const wave12Previews: Record<string, React.ComponentType> = {
  "activity-feed": function ActivityFeedPreview() {
    return (
      <div className="w-full max-w-xl">
        <ActivityFeed
          items={[
            {
              id: "act-1",
              actor: { name: "Ada Bull", role: "OPS", initials: "AB" },
              type: "deploy",
              title: "Released turnstile firmware v2.4.1",
              timestamp: "3m ago",
              dateGroup: "TODAY",
              badge: { label: "DEPLOYED", tone: "accent" },
            },
            {
              id: "act-2",
              actor: { name: "Grace H.", role: "SEC", initials: "GH" },
              type: "invite",
              title: "Invited gate crew to night shift roster",
              timestamp: "26m ago",
              dateGroup: "TODAY",
            },
          ]}
        />
      </div>
    );
  },

  "announcement-bar": function AnnouncementBarPreview() {
    return (
      <div className="w-full max-w-2xl">
        <AnnouncementBar />
      </div>
    );
  },

  "code-block": function CodeBlockPreview() {
    return (
      <div className="w-full max-w-xl">
        <CodeBlock
          filename="admit.ts"
          language="typescript"
          highlightLines={[2]}
          code={`const stub = await gates.admit("A-12");\nconsole.log(stub.serial); // BB-2026-0001`}
        />
      </div>
    );
  },

  "credit-card": function CreditCardPreview() {
    const [flipped, setFlipped] = React.useState(false);
    return (
      <div className="flex flex-col items-center gap-3">
        <CreditCard
          cardNumber="4111111111111111"
          cardHolder="ADA BULL"
          expiry="12/28"
          cvv="123"
          flipped={flipped}
          onFlipChange={setFlipped}
        />
        <span className="font-mono text-[11px] text-muted-foreground">
          Click the card to flip for CVV
        </span>
      </div>
    );
  },

  "file-upload-list": function FileUploadListPreview() {
    return (
      <div className="w-full max-w-xl">
        <FileUploadList
          files={[
            { id: "f1", name: "stage-plan.pdf", size: 2450000, progress: 72, status: "uploading", type: "pdf" },
            { id: "f2", name: "lineup.png", size: 890000, progress: 100, status: "success", type: "image" },
            { id: "f3", name: "archive.zip", size: 12000000, status: "error", type: "archive", errorMessage: "Connection dropped" },
          ]}
        />
      </div>
    );
  },

  "focus-trap": function FocusTrapPreview() {
    const boxRef = React.useRef<HTMLDivElement>(null);
    return (
      <div
        ref={boxRef}
        onKeyDown={(e) => {
          if (e.key === "Tab" && boxRef.current) trapFocus(boxRef.current, e.nativeEvent);
        }}
        className="flex w-full max-w-sm items-center justify-between gap-2 rounded-xl border-2 border-dashed border-foreground bg-card p-4"
      >
        <button
          type="button"
          className="rounded-md bg-primary px-3 py-1.5 font-mono text-xs font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          First
        </button>
        <span className="font-mono text-[11px] uppercase text-muted-foreground">
          Tab cycles inside
        </span>
        <button
          type="button"
          className="rounded-md bg-secondary px-3 py-1.5 font-mono text-xs font-bold text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Last
        </button>
      </div>
    );
  },

  hooks: function HooksPreview() {
    const { copied, copy } = useCopy();
    const [nick, setNick] = useLocalStorage("bb-preview-nick", "Ada");
    return (
      <div className="flex w-full max-w-sm flex-col gap-3 rounded-xl border border-dashed border-border bg-card p-4">
        <button
          type="button"
          onClick={() => copy("BB-2026-0001")}
          className="rounded-md bg-primary px-3 py-1.5 font-mono text-xs font-bold text-primary-foreground"
        >
          {copied ? "Copied!" : "useCopy: copy serial"}
        </button>
        <label className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          useLocalStorage:
          <input
            value={nick}
            onChange={(e) => setNick(e.target.value)}
            className="min-w-0 flex-1 rounded-md border border-border bg-background px-2 py-1 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>
      </div>
    );
  },

  "skeleton-v2": function SkeletonV2Preview() {
    return (
      <div className="grid w-full max-w-2xl gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <SkeletonText lines={3} />
        </div>
        <SkeletonCard className="h-32" />
        <SkeletonV2 className="h-4 w-48 md:col-span-2" />
      </div>
    );
  },

  "status-dot": function StatusDotPreview() {
    return (
      <div className="flex flex-wrap items-center justify-center gap-6">
        <StatusDot />
        <StatusDot level="full" occupancyPercent={82} waitTime="12 min" throughput="340/hr" />
      </div>
    );
  },
};
