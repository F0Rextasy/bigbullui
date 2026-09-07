"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const TIERS = [
  { name: "STANDING", monthly: "$9", annual: "$90", blurb: "For side-stage nights.", features: ["1 venue", "Basic scans", "Email support"], hot: false },
  { name: "BOX PRO", monthly: "$29", annual: "$290", blurb: "For nightly box offices.", features: ["5 venues", "Offline scans", "Refund desk", "Priority support"], hot: true },
  { name: "ARENA", monthly: "$99", annual: "$990", blurb: "For multi-gate arenas.", features: ["Unlimited venues", "API + webhooks", "Dedicated line"], hot: false },
];

export function PagePricing() {
  const [annual, setAnnual] = React.useState(true);
  return (
    <div className="w-full space-y-6 text-center">
      <div className="space-y-2">
        <Badge variant="accent" className="mx-auto">TARIFF BOARD</Badge>
        <h2 className="font-mono text-3xl font-black uppercase tracking-tight">Pick your pass</h2>
        <p className="text-sm text-muted-foreground">Monthly or annual. Cancel at any intermission.</p>
        <div className="flex justify-center gap-2 pt-1">
          <Button size="sm" variant={annual ? "default" : "outline"} onClick={() => setAnnual(true)}>Annual</Button>
          <Button size="sm" variant={annual ? "outline" : "default"} onClick={() => setAnnual(false)}>Monthly</Button>
        </div>
      </div>
      <div className="grid gap-4 text-left md:grid-cols-3">
        {TIERS.map((tier) => (
          <Card key={tier.name} className={tier.hot ? "border-accent" : undefined}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{tier.name}</CardTitle>
                {tier.hot && <Badge variant="accent">POPULAR</Badge>}
              </div>
              <p className="font-mono text-3xl font-black">{annual ? tier.annual : tier.monthly}</p>
              <p className="text-sm text-muted-foreground">{tier.blurb}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 font-mono text-xs">
                    <span className="inline-block size-2 rounded-full bg-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant={tier.hot ? "default" : "outline"}>Claim {tier.name}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
