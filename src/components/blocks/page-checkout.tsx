"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Steps } from "../ui/steps";
import { ShippingOptions } from "../ui/shipping-options";
import { PaymentMethods } from "../ui/payment-methods";
import { Separator } from "../ui/separator";

const STEPS = [
  { title: "ADDRESS", description: "Where to send" },
  { title: "SHIPPING", description: "Pick carrier" },
  { title: "PAYMENT", description: "Seal the deal" },
];
const SHIP = [
  { id: "std", carrier: "STUB POST", duration: "5-7 DAYS", price: "$4.00" },
  { id: "exp", carrier: "GATE EXPRESS", duration: "2 DAYS", price: "$12.00", recommended: true },
  { id: "vip", carrier: "COURIER VAULT", duration: "OVERNIGHT", price: "$24.00" },
];
const PAY = [
  { id: "card", label: "Card", description: "Visa / MC / Amex", icon: "card" as const },
  { id: "bank", label: "Bank", description: "Direct transfer", icon: "bank" as const },
  { id: "cash", label: "At gate", description: "Pay on pickup", icon: "cash" as const },
  { id: "wallet", label: "Wallet", description: "Stub credits", icon: "wallet" as const },
];

export function PageCheckout() {
  const [step, setStep] = React.useState(1);
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">STOREFRONT // CHECKOUT</p>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">Claim your stubs</h2>
        </div>
        <Badge variant="accent">STEP {step + 1} / 3</Badge>
      </div>
      <Steps steps={STEPS} current={step} />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="min-w-0 lg:col-span-2">
          <CardHeader><CardTitle>{STEPS[step].title}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {step === 0 && (
              <div className="grid gap-3 sm:grid-cols-2">
                <Input placeholder="FULL NAME" aria-label="Full name" />
                <Input placeholder="STREET + NO" aria-label="Street" />
                <Input placeholder="CITY" aria-label="City" />
                <Input placeholder="POSTAL CODE" aria-label="Postal code" />
              </div>
            )}
            {step === 1 && <ShippingOptions options={SHIP} defaultValue="exp" />}
            {step === 2 && <PaymentMethods methods={PAY} defaultValue="card" />}
            <Separator />
            <div className="flex flex-wrap justify-between gap-2">
              <Button variant="outline" size="sm" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>Back</Button>
              {step < 2
                ? <Button size="sm" onClick={() => setStep((s) => Math.min(2, s + 1))}>Continue</Button>
                : <Button size="sm">Place order</Button>}
            </div>
          </CardContent>
        </Card>
        <Card className="min-w-0">
          <CardHeader><CardTitle>Stub total</CardTitle></CardHeader>
          <CardContent className="space-y-2 font-mono text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">SUBTOTAL</span><span>$148.00</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">SHIPPING</span><span>$12.00</span></div>
            <Separator />
            <div className="flex justify-between font-bold"><span>TOTAL</span><span className="text-accent">$160.00</span></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
