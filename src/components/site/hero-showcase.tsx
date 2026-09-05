"use client";

import * as React from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { MetricCard } from "@/components/ui/metric-card";
import { Alert } from "@/components/ui/alert";
import { Rating } from "@/components/ui/rating";
import { Stepper } from "@/components/ui/stepper";
import { PinInput } from "@/components/ui/pin-input";

export function HeroShowcase() {
  // Interactive state
  const [activeTab, setActiveTab] = React.useState("dashboard");
  const [failover, setFailover] = React.useState(true);
  const [compute, setCompute] = React.useState(75);
  const [workspaceName, setWorkspaceName] = React.useState("Alpha Core");
  const [saved, setSaved] = React.useState(false);
  const [rating, setRating] = React.useState(5);
  const [stepperVal, setStepperVal] = React.useState(3);
  const [pinVal, setPinVal] = React.useState("8492");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border-2 border-border bg-card shadow-sm">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-border bg-secondary/40 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full border border-border bg-accent/80" />
            <span className="h-3 w-3 rounded-full border border-border bg-muted-foreground/30" />
            <span className="h-3 w-3 rounded-full border border-border bg-muted-foreground/30" />
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            workspace.preview &middot; <strong className="text-foreground font-semibold">react 19</strong>
          </span>
        </div>

        {/* Action Link */}
        <Link
          href="/docs"
          className="font-mono text-xs uppercase tracking-wider text-accent-strong hover:underline"
        >
          View all 460+ components &rarr;
        </Link>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="p-4 sm:p-6">
        <div className="flex items-center justify-between overflow-x-auto pb-2">
          <TabsList className="inline-flex gap-1.5 rounded-lg border border-border bg-secondary/50 p-1">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="forms">Forms &amp; Auth</TabsTrigger>
            <TabsTrigger value="elements">Core UI &amp; Buttons</TabsTrigger>
            <TabsTrigger value="feedback">Feedback &amp; Inputs</TabsTrigger>
          </TabsList>
        </div>

        {/* TAB 1: DASHBOARD */}
        <TabsContent value="dashboard" className="space-y-6 pt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <MetricCard
              title="TOTAL REVENUE"
              value="$48,295.00"
              periodLabel="vs last month"
              trend={{ value: "+12.4%", direction: "up" }}
              sparklineData={[12, 14, 18, 15, 22, 28, 32, 38, 45, 48]}
              badge="MONTHLY"
            />
            <MetricCard
              title="ACTIVE SESSIONS"
              value="14,290"
              periodLabel="current online"
              trend={{ value: "+8.1%", direction: "up" }}
              sparklineData={[8, 10, 11, 14, 12, 16, 19, 21, 25, 28]}
              badge="REALTIME"
              statusDot="active"
            />
            <MetricCard
              title="API LATENCY"
              value="24ms"
              periodLabel="global p99"
              trend={{ value: "-14% faster", direction: "down", invertColors: true }}
              sparklineData={[42, 38, 35, 30, 28, 26, 25, 24]}
              badge="HEALTHY"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Deployments Card */}
            <div className="space-y-4 rounded-lg border border-border bg-card p-5">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <h4 className="font-semibold text-sm tracking-tight">Active Deployments</h4>
                  <p className="text-xs text-muted-foreground">Live production cluster nodes</p>
                </div>
                <Badge variant="accent">PROD</Badge>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between rounded border border-dashed border-border p-2.5">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-accent" />
                    <span className="font-semibold text-foreground">api-gateway-us-east</span>
                  </div>
                  <span className="text-muted-foreground">v2.4.1 &middot; 42ms</span>
                </div>
                <div className="flex items-center justify-between rounded border border-dashed border-border p-2.5">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-accent" />
                    <span className="font-semibold text-foreground">auth-service-fra</span>
                  </div>
                  <span className="text-muted-foreground">v1.8.0 &middot; 18ms</span>
                </div>
                <div className="flex items-center justify-between rounded border border-dashed border-border p-2.5">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-accent" />
                    <span className="font-semibold text-foreground">billing-worker-edge</span>
                  </div>
                  <span className="text-muted-foreground">v3.0.2 &middot; 24ms</span>
                </div>
              </div>
            </div>

            {/* Quick Controls Card */}
            <div className="space-y-5 rounded-lg border border-border bg-card p-5">
              <div className="border-b border-border pb-3">
                <h4 className="font-semibold text-sm tracking-tight">Cluster Configuration</h4>
                <p className="text-xs text-muted-foreground">Interactive cluster parameters</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-xs font-medium text-foreground">Automated Multi-Region Failover</label>
                    <p className="text-[11px] text-muted-foreground">Reroutes traffic on health check failure</p>
                  </div>
                  <Switch checked={failover} onCheckedChange={setFailover} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">Compute Power Allocation</span>
                    <span className="font-mono text-accent-strong">{compute} Cores</span>
                  </div>
                  <Slider value={compute} onValueChange={setCompute} min={10} max={128} />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button size="sm" variant="default" onClick={handleSave}>
                    {saved ? "Saved ✓" : "Apply Config"}
                  </Button>
                  <Button size="sm" variant="outline">
                    View Logs
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* TAB 2: FORMS */}
        <TabsContent value="forms" className="pt-4">
          <div className="mx-auto max-w-xl space-y-6 rounded-lg border border-border bg-card p-6 sm:p-8">
            <div className="border-b border-border pb-4">
              <h3 className="text-lg font-semibold tracking-tight">Workspace Preferences</h3>
              <p className="text-xs text-muted-foreground">
                Example of zero-dependency form components matching the bigbullui design tokens.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Workspace Title
                </label>
                <Input
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  placeholder="Enter workspace name"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Production Webhook URL
                </label>
                <Input
                  defaultValue="https://api.bigbullui.com/webhooks/prod-events"
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-dashed border-border p-3">
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-foreground">Enforce 2FA for all members</p>
                  <p className="text-[11px] text-muted-foreground">Requires security key or OTP on every login</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
                <Button variant="default" size="sm" onClick={handleSave}>
                  {saved ? "Changes Saved ✓" : "Save Changes"}
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* TAB 3: CORE UI & BUTTONS */}
        <TabsContent value="elements" className="space-y-6 pt-4">
          <div className="space-y-4 rounded-lg border border-border bg-card p-6">
            <h4 className="font-semibold text-sm tracking-tight">Button Variants</h4>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link Style</Button>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4 rounded-lg border border-border bg-card p-6">
              <h4 className="font-semibold text-sm tracking-tight">Semantic Badges</h4>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="default">DEFAULT</Badge>
                <Badge variant="accent">STAMP RED</Badge>
                <Badge variant="secondary">MUTED</Badge>
                <Badge variant="outline">OUTLINE</Badge>
              </div>
            </div>

            <div className="space-y-4 rounded-lg border border-border bg-card p-6">
              <h4 className="font-semibold text-sm tracking-tight">Interactive Rating</h4>
              <div className="flex items-center gap-3">
                <Rating value={rating} onValueChange={setRating} />
                <span className="font-mono text-xs text-muted-foreground">({rating} / 5 stars)</span>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* TAB 4: FEEDBACK & INPUTS */}
        <TabsContent value="feedback" className="space-y-6 pt-4">
          <div className="space-y-4">
            <Alert tone="accent" title="SYSTEM NOTIFICATION">
              All 462 components are self-contained with zero 3rd-party dependencies. Copy, paste, and run anywhere.
            </Alert>
            <Alert tone="info">
              Tailwind CSS v4 inline themes fully supported with dynamic light/dark tokens.
            </Alert>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3 rounded-lg border border-border bg-card p-6">
              <h4 className="font-semibold text-sm tracking-tight">Numeric Stepper</h4>
              <p className="text-xs text-muted-foreground">Tactile counter with bounds</p>
              <Stepper value={stepperVal} onValueChange={setStepperVal} min={1} max={10} />
            </div>

            <div className="space-y-3 rounded-lg border border-border bg-card p-6">
              <h4 className="font-semibold text-sm tracking-tight">PIN / OTP Input</h4>
              <p className="text-xs text-muted-foreground">Segmented verification fields</p>
              <PinInput value={pinVal} onValueChange={setPinVal} length={4} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
