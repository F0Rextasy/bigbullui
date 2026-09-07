"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

const STEPS = ["EVENT", "STUBS", "REVIEW"];

export function FormWizard() {
  const [step, setStep] = React.useState(0);
  const last = step === STEPS.length - 1;
  return (
    <div className="mx-auto w-full max-w-xl space-y-5">
      <div className="space-y-2 text-center">
        <Badge variant="accent" className="mx-auto">WIZARD // 3 STAMPS</Badge>
        <h2 className="font-mono text-2xl font-black uppercase tracking-tight">List your night</h2>
      </div>
      <div className="flex items-center gap-2" role="list" aria-label="Wizard progress">
        {STEPS.map((label, index) => (
          <React.Fragment key={label}>
            <button
              type="button"
              role="listitem"
              onClick={() => setStep(index)}
              className={`flex-1 cursor-pointer rounded-md border px-3 py-2 font-mono text-[11px] font-black uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${index === step ? "border-foreground bg-primary text-primary-foreground" : index < step ? "border-accent bg-accent/10 text-accent-strong" : "border-dashed border-border bg-card text-muted-foreground"}`}
            >
              {index + 1}. {label}
            </button>
            {index < STEPS.length - 1 && <span className="h-0 w-4 border-t-2 border-dashed border-border" />}
          </React.Fragment>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Step {step + 1}{" // "}{STEPS[step]}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="wizard-event" className="font-mono text-[11px] font-bold uppercase tracking-widest">Event name</label>
                <Input id="wizard-event" placeholder="Midnight Cinema" />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="wizard-date" className="font-mono text-[11px] font-bold uppercase tracking-widest">Date</label>
                <Input id="wizard-date" placeholder="JUN 28 // 20:00" />
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="wizard-cap" className="font-mono text-[11px] font-bold uppercase tracking-widest">Capacity</label>
                <Input id="wizard-cap" inputMode="numeric" placeholder="1200" />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="wizard-price" className="font-mono text-[11px] font-bold uppercase tracking-widest">Base price</label>
                <Input id="wizard-price" inputMode="decimal" placeholder="$45.00" />
              </div>
            </div>
          )}
          {step === 2 && (
            <p className="rounded-md border border-dashed border-border bg-secondary/40 p-4 font-mono text-xs leading-relaxed">
              REVIEW // MIDNIGHT CINEMA // 1200 STUBS // $45.00 BASE. Stamp publish to open the gates.
            </p>
          )}
          <div className="flex justify-between gap-2">
            <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>Back</Button>
            {last ? (
              <Button>Publish night</Button>
            ) : (
              <Button onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}>Next stamp</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
