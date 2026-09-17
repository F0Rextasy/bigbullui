"use client";

import * as React from "react";
import { ProductCard } from "@/components/ui/product-card";
import { UserCard } from "@/components/ui/user-card";
import { ArticleCard } from "@/components/ui/article-card";
import { EventCard } from "@/components/ui/event-card";
import { Invoice } from "@/components/ui/invoice";
import { Receipt } from "@/components/ui/receipt";
import { CheckoutSummary } from "@/components/ui/checkout-summary";
import { CartDrawer } from "@/components/ui/cart-drawer";
import { SizePicker } from "@/components/ui/size-picker";
import { VariantPicker } from "@/components/ui/variant-picker";
import { WishlistButton } from "@/components/ui/wishlist-button";
import { AddToCartButton } from "@/components/ui/add-to-cart-button";
import { OrderCard } from "@/components/ui/order-card";
import { StampCard } from "@/components/ui/stamp-card";
import { GiftCard } from "@/components/ui/gift-card";
import { IdCard } from "@/components/ui/id-card";
import { RsvpCard } from "@/components/ui/rsvp-card";

function DemoShell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-md">{children}</div>;
}

export const wave5Previews: Record<string, React.ComponentType> = {
  "product-card": function ProductCardPreview() {
    const [wishlists, setWishlists] = React.useState(0);
    return (
      <DemoShell>
        <ProductCard
          title="Premium Headphones"
          price="$299"
          originalPrice="$399"
          image="/stock/product.jpg"
          discount={25}
          onAddToWishlist={() => setWishlists((n) => n + 1)}
        />
        <p className="mt-2 text-sm text-muted-foreground" data-testid="wishlist-count">
          Wishlisted {wishlists} {wishlists === 1 ? "time" : "times"}
        </p>
      </DemoShell>
    );
  },
  "user-card": function UserCardPreview() {
    const [actions, setActions] = React.useState(0);
    return (
      <DemoShell>
        <UserCard
          initials="JD"
          name="Jordan Daisy"
          role="Product Designer"
          meta={["Available", "Remote"]}
          onAction={() => setActions((n) => n + 1)}
        />
        <p className="mt-2 text-sm text-muted-foreground" data-testid="action-count">
          Action pressed {actions} {actions === 1 ? "time" : "times"}
        </p>
      </DemoShell>
    );
  },
  "article-card": function ArticleCardPreview() {
    return (
      <DemoShell>
        <ArticleCard
          title="The Future of Design Systems"
          excerpt="Exploring how component-driven UIs are shaping the next generation of web experiences."
          category="Design"
          author="Alex Rivera"
          readTime="8"
          image="/stock/lights.jpg"
        />
      </DemoShell>
    );
  },
  "event-card": function EventCardPreview() {
    return (
      <DemoShell>
        <EventCard
          title="Tech Conference 2026"
          date="Oct 14"
          venue="Berlin Arena"
          time="21:00"
        />
      </DemoShell>
    );
  },
  invoice: function InvoicePreview() {
    return (
      <DemoShell>
        <Invoice
          number="INV-2026-0987"
          items={[
            { label: "Design Services", price: "150", qty: 1 },
            { label: "Development Hours", price: "100", qty: 5 },
          ]}
          taxRate={0.1}
          status="draft"
        />
      </DemoShell>
    );
  },
  receipt: function ReceiptPreview() {
    return (
      <DemoShell>
        <Receipt
          items={[
            { label: "Design Consultation", price: "150" },
            { label: "Development Hours", price: "200" },
          ]}
          taxRate={0.1}
          total="385.00"
        />
      </DemoShell>
    );
  },
  "checkout-summary": function CheckoutSummaryPreview() {
    return (
      <DemoShell>
        <CheckoutSummary
          items={[
            { id: "1", title: "Premium Headphones", price: "$299", qty: 1 },
            { id: "2", title: "Phone Case", price: "$39", qty: 2 },
          ]}
          subtotal="$377.00"
          tax="$30.16"
          total="$407.16"
          cta="Complete Order"
        />
      </DemoShell>
    );
  },
  "cart-drawer": function CartDrawerPreview() {
    const [open, setOpen] = React.useState(false);
    const [items, setItems] = React.useState([
      { id: "1", title: "Premium Headphones", price: "$299", qty: 1 },
      { id: "2", title: "Phone Case", price: "$39", qty: 2 },
    ]);
    return (
      <DemoShell>
      <div className="cart-drawer-demo">
        <style>{`.cart-drawer-demo .cart-drawer-slide-in{display:flex !important;}`}</style>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-md bg-accent px-4 py-2 text-sm font-semibold uppercase tracking-widest text-accent-foreground hover:bg-accent/90"
        >
          Open cart ({items.length} items)
        </button>
        <CartDrawer
          open={open}
          onOpenChange={setOpen}
          items={items}
          onRemove={(id) => setItems((prev) => prev.filter((it) => it.id !== id))}
          onQtyChange={(id, qty) =>
            setItems((prev) => prev.map((it) => (it.id === id ? { ...it, qty } : it)))
          }
        />
        </div>
      </DemoShell>
    );
  },
  "size-picker": function SizePickerPreview() {
    const [value, setValue] = React.useState("M");
    return (
      <DemoShell>
        <SizePicker
          sizes={[
            { label: "S", available: true },
            { label: "M", available: true },
            { label: "L", available: true },
            { label: "XL", available: false, stock: 0 },
          ]}
          value={value}
          onValueChange={setValue}
        />
        <p className="mt-2 text-sm text-muted-foreground" data-testid="size-value">
          Selected size: {value}
        </p>
      </DemoShell>
    );
  },
  "variant-picker": function VariantPickerPreview() {
    const [color, setColor] = React.useState("accent");
    const [size, setSize] = React.useState("M");
    return (
      <DemoShell>
        <VariantPicker
          key={color}
          colors={[
            { name: "accent", className: "--accent" },
            { name: "primary", className: "--primary" },
            { name: "destructive", className: "--destructive" },
          ]}
          sizes={["S", "M", "L", "XL"]}
          defaultValue={color}
          onColorChange={setColor}
          onSizeChange={setSize}
        />
        <p className="mt-2 text-sm text-muted-foreground" data-testid="variant-value">
          Color: {color} / Size: {size}
        </p>
      </DemoShell>
    );
  },
  "wishlist-button": function WishlistButtonPreview() {
    const [active, setActive] = React.useState(false);
    return (
      <DemoShell>
        <WishlistButton active={active} onToggle={setActive} />
        <p className="mt-2 text-sm text-muted-foreground" data-testid="wishlist-state">
          Wishlisted: {active ? "Yes" : "No"}
        </p>
      </DemoShell>
    );
  },
  "add-to-cart-button": function AddToCartButtonPreview() {
    const [adds, setAdds] = React.useState(0);
    return (
      <DemoShell>
        <AddToCartButton productName="Premium Headphones" onAdd={() => setAdds((n) => n + 1)} />
        <p className="mt-2 text-sm text-muted-foreground" data-testid="add-count">
          Added {adds} {adds === 1 ? "time" : "times"}
        </p>
      </DemoShell>
    );
  },
  "order-card": function OrderCardPreview() {
    return (
      <DemoShell>
        <OrderCard
          orderId="#102938"
          status="Processing"
          progress={0.65}
          items={[
            { label: "Design Services", qty: 1 },
            { label: "Development", qty: 5 },
          ]}
        />
      </DemoShell>
    );
  },
  "stamp-card": function StampCardPreview() {
    return (
      <DemoShell>
        <StampCard text="VIP" subtext="LOYALTY TIER" tone="accent" />
      </DemoShell>
    );
  },
  "gift-card": function GiftCardPreview() {
    return (
      <DemoShell>
        <GiftCard amount="$100" recipient="Jordan Daisy" message="Happy Birthday!" />
      </DemoShell>
    );
  },
  "id-card": function IdCardPreview() {
    return (
      <DemoShell>
        <IdCard
          name="Jordan Daisy"
          role="Product Designer"
          department="UX"
          badgeNumber="EMP-8942"
        />
      </DemoShell>
    );
  },
  "rsvp-card": function RsvpCardPreview() {
    const [attending, setAttending] = React.useState(false);
    return (
      <DemoShell>
        <RsvpCard eventTitle="Wedding Reception" attending={attending} onToggle={setAttending} />
        <p className="mt-2 text-sm text-muted-foreground" data-testid="rsvp-state">
          RSVP: {attending ? "Attending" : "Not attending"}
        </p>
      </DemoShell>
    );
  },
};
