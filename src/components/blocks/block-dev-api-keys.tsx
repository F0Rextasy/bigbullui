"use client";

import * as React from "react";
import { cn } from "../ui/lib/utils";
import { ApiKeyCard } from "../ui/api-key-card";
import { UsageMeter } from "../ui/usage-meter";
import { WebhookList } from "../ui/webhook-list";
import { LogViewer } from "../ui/log-viewer";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PageHeader } from "../ui/page-header";

const DEFAULT_WEBHOOKS = [
  { id: "wh-01", url: "https://box.example.com/hooks/stubs", events: ["stub.issued", "stub.scanned"], active: true },
  { id: "wh-02", url: "https://box.example.com/hooks/refunds", events: ["refund.opened"], active: false },
];

const DEFAULT_LOGS = [
  { time: "20:41:07", level: "INFO" as const, message: "POST /v1/stubs 201 serial BB-90214" },
  { time: "20:41:09", level: "INFO" as const, message: "webhook stub.issued delivered in 182ms" },
  { time: "20:42:31", level: "WARN" as const, message: "quota at 78 percent for key bb_live_****9j0" },
  { time: "20:44:02", level: "ERROR" as const, message: "webhook refund.opened retry 2 of 5" },
];

export interface BlockDevApiKeysProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    title?: string;
  subtitle?: string;
  webhooks?: typeof DEFAULT_WEBHOOKS;
  logs?: typeof DEFAULT_LOGS;
  onAction?: (action: string) => void;
}

export function BlockDevApiKeys({ title, webhooks = DEFAULT_WEBHOOKS, logs = DEFAULT_LOGS, className, onAction, ...props }: BlockDevApiKeysProps) {
  void onAction;
  return (
    <div className={cn("w-full space-y-6", className)} {...props}>
      <PageHeader
        eyebrow="DEVELOPERS // KEYS"
        title="API keys"
        description="Copy, quota, and delivery trail for the box office API."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <ApiKeyCard label="Box office live key" apiKey="bb_live_a1b2c3d4e5f6g7h8i9j0" />
        <UsageMeter label="Monthly stub calls" used={78240} limit={100000} unit="calls" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{title ?? "Webhooks"}</CardTitle>
          </CardHeader>
          <CardContent>
            <WebhookList webhooks={webhooks} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Delivery log</CardTitle>
          </CardHeader>
          <CardContent>
            <LogViewer entries={logs} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
