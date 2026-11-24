"use client";

import * as React from "react";
import { cn } from "../ui/lib/utils";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Rating } from "../ui/rating";
import { VariantPicker } from "../ui/variant-picker";
import { AddToCartButton } from "../ui/add-to-cart-button";
import { Separator } from "../ui/separator";

const DEFAULT_VIEWS = ["FRONT", "BACK", "DETAIL", "ON MODEL"];
const DEFAULT_COLORS = [{ name: "black" }, { name: "brown" }, { name: "navy" }];
const DEFAULT_SIZES = ["S", "M", "L", "XL"];
const DEFAULT_REVIEWS = [
  { name: "ADA BULL", rating: 5, title: "STAMPED AND PERFECT", body: "Heavy paper feel, clean seams, true to size." },
  { name: "GRACE H", rating: 4, title: "GATE READY", body: "Great stub look, ships fast, slight box crease." },
];

export interface PageProductProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    title?: string;
  subtitle?: string;
  views?: typeof DEFAULT_VIEWS;
  colors?: typeof DEFAULT_COLORS;
  sizes?: typeof DEFAULT_SIZES;
  reviews?: typeof DEFAULT_REVIEWS;
  onAction?: (action: string) => void;
}

export function PageProduct({ title, views = DEFAULT_VIEWS, colors = DEFAULT_COLORS, sizes = DEFAULT_SIZES, reviews = DEFAULT_REVIEWS, className, onAction, ...props }: PageProductProps) {
  const [view, setView] = React.useState(0);
  const [added, setAdded] = React.useState(0);
  const [wishlisted, setWishlisted] = React.useState(false);
  return (
    <div className={cn("w-full space-y-6", className)} {...props}>
      <div className="space-y-1">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">STOREFRONT // PRODUCT</p>
        <h2 className="font-mono text-2xl font-black uppercase tracking-tight">{title ?? "Tour jacket 1977"}</h2>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="min-w-0">
          <CardHeader><CardTitle>Gallery</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex aspect-[4/3] items-center justify-center rounded-md border-2 border-dashed border-border bg-secondary font-mono text-2xl font-black uppercase tracking-widest">
              {views[view]}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {views.map((v, i) => (
                <button key={v} type="button" onClick={() => setView(i)} aria-label={`View ${v}`}
                  className={`rounded-md border-2 px-2 py-3 font-mono text-[10px] uppercase tracking-widest transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${i === view ? "border-accent bg-accent/10 text-accent" : "border-dashed border-border hover:border-foreground/50"}`}>
                  {v}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="min-w-0">
          <CardHeader><CardTitle>Configure stub</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent">ADMIT ONE</Badge>
              <span className="font-mono text-lg font-bold">$148.00</span>
              <span className="font-mono text-xs text-muted-foreground line-through">$185.00</span>
            </div>
            <VariantPicker colors={colors} sizes={sizes} defaultValue="black" />
            <div className="flex flex-wrap items-center gap-2">
              <Rating defaultValue={4} aria-label="Product rating" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">128 VERIFIED</span>
            </div>
            <Separator />
            <div className="flex flex-wrap items-center gap-2">
              <AddToCartButton productName="Tour jacket 1977" onAdd={() => { setAdded((n) => n + 1); onAction?.("add-to-cart"); }} />
              <Button variant={wishlisted ? "secondary" : "outline"} size="sm" aria-pressed={wishlisted} onClick={() => { setWishlisted((w) => !w); onAction?.("wishlist"); }}>
                {wishlisted ? "Wishlisted ✓" : "Wishlist"}
              </Button>
              {added > 0 && <Badge variant="secondary">IN CART × {added}</Badge>}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="min-w-0">
        <CardHeader><CardTitle>Reviews</CardTitle></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {reviews.map((r) => (
            <div key={r.name} className="min-w-0 rounded-md border border-dashed border-border p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="font-mono text-xs font-bold uppercase tracking-widest">{r.name}</p>
                <Rating defaultValue={r.rating} aria-label={`Rating by ${r.name}`} />
              </div>
              <p className="mt-2 font-mono text-xs font-bold uppercase">{r.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
