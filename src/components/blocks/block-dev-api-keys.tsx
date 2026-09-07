"use client";

import * as React from "react";
import { ApiKeyCard } from "../ui/api-key-card";
import { UsageMeter } from "../ui/usage-meter";
import { WebhookList } from "../ui/webhook-list";
import { LogViewer } from "../ui/log-viewer";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PageHeader } from "../ui/page-header";

const WEBHOOKS = [
  { id: "wh-01", url: "https://box.example.com/hooks/stubs", events: ["stub.issued", "stub.scanned"], active: true },
  { id: "wh-02", url: "https://box.example.com/hooks/refunds", events: ["refund.opened"], active: false },
];

const LOGS = [
  { time: "20:41:07", level: "INFO" as const, message: "POST /v1/stubs 201 serial BB-90214" },
  { time: "20:41:09", level: "INFO" as const, message: "webhook stub.issued delivered in 182ms" },
  { time: "20:42:31", level: "WARN" as const, message: "quota at 78 percent for key bb_live_****9j0" },
  { time: "20:44:02", level: "ERROR" as const, message: "webhook refund.opened retry 2 of 5" },
];

export function BlockDevApiKeys() {
  return (
    <div className="w-full space-y-6">
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
            <CardTitle>Webhooks</CardTitle>
          </CardHeader>
          <CardContent>
            <WebhookList webhooks={WEBHOOKS} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Delivery log</CardTitle>
          </CardHeader>
          <CardContent>
            <LogViewer entries={LOGS} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
