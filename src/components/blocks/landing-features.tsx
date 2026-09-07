"use client";

import * as React from "react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const FEATURES = [
  { tag: "ZERO DEP", title: "No baggage fees", body: "Every file imports only React plus a 7-line cn helper. Nothing else rides along." },
  { tag: "COPY PASTE", title: "Code you keep", body: "Vendor the source into your repo. Restyle tokens, fork freely, ship forever." },
  { tag: "A11Y FIRST", title: "Every gate labeled", body: "Roving tabindex, focus traps, live regions, and reduced-motion fallbacks built in." },
  { tag: "TICKET SOUL", title: "Printed, not rendered", body: "Perforations, notches, stamps, and turnstile counters on every surface." },
  { tag: "DARK STUB", title: "Night shift ready", body: "One .dark class flips the whole booth to the night-stub palette." },
  { tag: "TYPED", title: "Stamped types", body: "Strict TypeScript props with docs tables generated beside each preview." },
];

export function LandingFeatures() {
  return (
    <section className="w-full space-y-6">
      <div className="space-y-2 text-center">
        <Badge variant="accent" className="mx-auto">WHY BIGBULLUI</Badge>
        <h2 className="font-mono text-3xl font-black uppercase tracking-tight">Built like a box office</h2>
        <p className="mx-auto max-w-xl text-sm text-muted-foreground">Six reasons crews switch from black-box kits to stubs they own.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {FEATURES.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <Badge variant="outline">{feature.tag}</Badge>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{feature.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
