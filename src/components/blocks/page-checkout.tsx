"use client";

import * as React from "react";
import { cn } from "../ui/lib/utils";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Steps } from "../ui/steps";
import { ShippingOptions, type ShippingOption } from "../ui/shipping-options";
import { PaymentMethods, type PaymentMethod } from "../ui/payment-methods";
import { Separator } from "../ui/separator";

export interface CheckoutAddressData {
  fullName: string;
  street: string;
  city: string;
  postalCode: string;
}

export interface CheckoutOrderPayload {
  address: CheckoutAddressData;
  shippingId: string;
  paymentId: string;
  total: string;
}

const DEFAULT_STEPS = [
  { title: "ADDRESS", description: "Where to send" },
  { title: "SHIPPING", description: "Pick carrier" },
  { title: "PAYMENT", description: "Seal the deal" },
];
const DEFAULT_SHIP: ShippingOption[] = [
  { id: "std", carrier: "STUB POST", duration: "5-7 DAYS", price: "$4.00" },
  { id: "exp", carrier: "GATE EXPRESS", duration: "2 DAYS", price: "$12.00", recommended: true },
  { id: "vip", carrier: "COURIER VAULT", duration: "OVERNIGHT", price: "$24.00" },
];
const DEFAULT_PAY: PaymentMethod[] = [
  { id: "card", label: "Card", description: "Visa / MC / Amex", icon: "card" },
  { id: "bank", label: "Bank", description: "Direct transfer", icon: "bank" },
  { id: "cash", label: "At gate", description: "Pay on pickup", icon: "cash" },
  { id: "wallet", label: "Wallet", description: "Stub credits", icon: "wallet" },
];

export interface PageCheckoutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtotal?: string;
  shippingCost?: string;
  total?: string;
  shippingOptions?: ShippingOption[];
  paymentMethods?: PaymentMethod[];
  initialStep?: number;
  onPlaceOrder?: (order: CheckoutOrderPayload) => void;
  onAction?: (action: string) => void;
}

export function PageCheckout({
  eyebrow = "STOREFRONT // CHECKOUT",
  title = "Claim your stubs",
  subtotal = "$148.00",
  shippingCost = "$12.00",
  total = "$160.00",
  shippingOptions = DEFAULT_SHIP,
  paymentMethods = DEFAULT_PAY,
  initialStep = 1,
  onPlaceOrder,
  className,
  onAction,
  ...props
}: PageCheckoutProps) {
  const [step, setStep] = React.useState(Math.min(2, Math.max(0, initialStep)));
  const [placed, setPlaced] = React.useState(false);
  const [address, setAddress] = React.useState<CheckoutAddressData>({
    fullName: "",
    street: "",
    city: "",
    postalCode: "",
  });
  const [shippingId, setShippingId] = React.useState(
    shippingOptions.find((s) => s.recommended)?.id ?? shippingOptions[0]?.id ?? "exp"
  );
  const [paymentId, setPaymentId] = React.useState(paymentMethods[0]?.id ?? "card");

  const activeShip = shippingOptions.find((s) => s.id === shippingId);
  const computedShipping = activeShip?.price ?? shippingCost;

  const parseNum = (val: string) => Number(val.replace(/[^0-9.]/g, "")) || 0;
  const computedTotal =
    activeShip && subtotal.startsWith("$")
      ? `$${(parseNum(subtotal) + parseNum(computedShipping)).toFixed(2)}`
      : total;

  return (
    <div className={cn("w-full space-y-6", className)} {...props}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</p>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">{title}</h2>
        </div>
        <Badge variant="accent">{placed ? "STAMPED // CONFIRMED" : `STEP ${step + 1} / 3`}</Badge>
      </div>
      <Steps steps={DEFAULT_STEPS} current={step} />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="min-w-0 lg:col-span-2">
          <CardHeader>
            <CardTitle>{DEFAULT_STEPS[step].title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 0 && (
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  placeholder="FULL NAME"
                  aria-label="Full name"
                  value={address.fullName}
                  onChange={(e) => setAddress((a) => ({ ...a, fullName: e.target.value }))}
                />
                <Input
                  placeholder="STREET + NO"
                  aria-label="Street"
                  value={address.street}
                  onChange={(e) => setAddress((a) => ({ ...a, street: e.target.value }))}
                />
                <Input
                  placeholder="CITY"
                  aria-label="City"
                  value={address.city}
                  onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))}
                />
                <Input
                  placeholder="POSTAL CODE"
                  aria-label="Postal code"
                  value={address.postalCode}
                  onChange={(e) => setAddress((a) => ({ ...a, postalCode: e.target.value }))}
                />
              </div>
            )}
            {step === 1 && (
              <ShippingOptions
                options={shippingOptions}
                value={shippingId}
                onValueChange={setShippingId}
              />
            )}
            {step === 2 && (
              <PaymentMethods
                methods={paymentMethods}
                value={paymentId}
                onValueChange={setPaymentId}
              />
            )}
            <Separator />
            <div className="flex flex-wrap justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={step === 0 || placed}
                onClick={() => setStep((s) => Math.max(0, s - 1))}
              >
                Back
              </Button>
              {step < 2 ? (
                <Button size="sm" onClick={() => setStep((s) => Math.min(2, s + 1))}>
                  Continue
                </Button>
              ) : (
                <Button
                  size="sm"
                  disabled={placed}
                  onClick={() => {
                    setPlaced(true);
                    onPlaceOrder?.({ address, shippingId, paymentId, total: computedTotal });
                    onAction?.("place-order");
                  }}
                >
                  {placed ? "Order sealed" : "Place order"}
                </Button>
              )}
            </div>
            {placed && (
              <p
                role="status"
                className="rounded-sm border border-dashed border-accent bg-accent/10 p-3 font-mono text-xs uppercase tracking-wider text-foreground"
              >
                Order sealed. Confirmation BB-90210 issued.
              </p>
            )}
          </CardContent>
        </Card>
        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>Stub total</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">SUBTOTAL</span>
              <span>{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">SHIPPING</span>
              <span>{computedShipping}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>TOTAL</span>
              <span className="text-accent">{computedTotal}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
