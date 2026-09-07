"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { ToggleGroup, ToggleItem } from "../ui/toggle-group";
import { ProductCard } from "../ui/product-card";

const PRODUCTS = [
  { title: "TOUR JACKET", price: "$148.00", originalPrice: "$185.00", discount: 20, cat: "APPAREL" },
  { title: "STUB TEE", price: "$32.00", originalPrice: undefined, discount: 0, cat: "APPAREL" },
  { title: "GATE CAP", price: "$24.00", originalPrice: "$30.00", discount: 20, cat: "HEADWEAR" },
  { title: "VINYL LP", price: "$42.00", originalPrice: undefined, discount: 0, cat: "MUSIC" },
  { title: "POSTER SET", price: "$18.00", originalPrice: undefined, discount: 0, cat: "PRINT" },
  { title: "WRISTBAND", price: "$9.00", originalPrice: "$12.00", discount: 25, cat: "PRINT" },
];
const SORTS = [
  { value: "feat", label: "FEATURED" },
  { value: "low", label: "PRICE LOW" },
  { value: "high", label: "PRICE HIGH" },
];

export function PageStorefront() {
  const [filter, setFilter] = React.useState("ALL");
  const [sort, setSort] = React.useState("feat");
  const [query, setQuery] = React.useState("");
  const list = PRODUCTS.filter((p) => (filter === "ALL" ? true : p.cat === filter))
    .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => (sort === "low" ? 1 : sort === "high" ? -1 : 0));
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">STOREFRONT // BROWSE</p>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">Merch booth</h2>
        </div>
        <Badge variant="accent">{list.length} STUBS</Badge>
      </div>
      <Card className="min-w-0">
        <CardHeader><CardTitle>Filter + sort</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <ToggleGroup defaultValue="ALL" onValueChange={(v) => setFilter(v)} aria-label="Category filter">
            {["ALL", "APPAREL", "MUSIC", "PRINT"].map((c) => (
              <ToggleItem key={c} value={c}>{c}</ToggleItem>
            ))}
          </ToggleGroup>
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="SEARCH STUBS" aria-label="Search products" className="max-w-45" />
          <Select options={SORTS} value={sort} onValueChange={setSort} placeholder="SORT" aria-label="Sort products" />
          <Button variant="outline" size="sm" onClick={() => { setFilter("ALL"); setQuery(""); setSort("feat"); }}>Reset</Button>
        </CardContent>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((p) => (
          <ProductCard key={p.title} title={p.title} price={p.price} originalPrice={p.originalPrice} discount={p.discount} className="min-w-0" />
        ))}
      </div>
      {list.length === 0 && <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">NO STUBS FOUND</p>}
    </div>
  );
}
