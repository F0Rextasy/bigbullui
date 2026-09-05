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

export function Wave5Preview() {
  return (
    <main className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Product Card */}
      <ProductCard
        title="Premium Headphones"
        price="$299"
        originalPrice="$399"
        image="/placeholder-product.jpg"
        discount={25}
      />

      {/* User Card */}
      <UserCard
        initials="JD"
        name="Jordan Daisy"
        role="Product Designer"
        meta={["Available", "Remote"]}
      />

      {/* Article Card */}
      <ArticleCard
        title="The Future of Design Systems"
        excerpt="Exploring how component-driven UIs are shaping the next generation of web experiences."
        category="Design"
        author="Alex Rivera"
        readTime="8"
        image="/placeholder-article.jpg"
      />

      {/* Event Card */}
      <EventCard
        title="Tech Conference 2026"
        date="Oct 14"
        venue="Berlin Arena"
        time="21:00"
      />

      {/* Invoice */}
      <Invoice
        number="INV-2026-0987"
        items={[
          { label: "Design Services", price: "$150", qty: 1 },
          { label: "Development Hours", price: "$100", qty: 5 },
        ]}
        taxRate={0.1}
        status="draft"
      />

      {/* Receipt */}
      <Receipt
        items={[
          { label: "Design Consultation", price: "$150" },
          { label: "Development Hours", price: "$200" },
        ]}
        taxRate={0.1}
        total="$385.00"
      />

      {/* Checkout Summary */}
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

      {/* Cart Drawer */}
      <CartDrawer
        open={true}
        onOpenChange={() => {}}
        items={[
          { id: "1", title: "Premium Headphones", price: "$299", qty: 1 },
          { id: "2", title: "Phone Case", price: "$39", qty: 2 },
        ]}
      />

      {/* Size Picker */}
      <SizePicker
        sizes={[
          { label: "S", available: true },
          { label: "M", available: true },
          { label: "L", available: true },
          { label: "XL", available: false, stock: 0 },
        ]}
        defaultValue="M"
      />

      {/* Variant Picker */}
      <VariantPicker
        colors={[
          { name: "navy", className: "--navy" },
          { name: "green", className: "--green" },
          { name: "black", className: "--black" },
          { name: "white", className: "--white" },
        ]}
        sizes={["S", "M", "L", "XL"]}
        defaultValue="navy"
      />

      {/* Wishlist Button */}
      <WishlistButton active={true} onToggle={() => {}} />

      {/* Add to Cart Button */}
      <AddToCartButton
        productName="Premium Headphones"
        onAdd={() => {}}
      />

      {/* Order Card */}
      <OrderCard
        orderId="#102938"
        status="Processing"
        progress={0.65}
        items={[
          { label: "Design Services", qty: 1 },
          { label: "Development", qty: 5 },
        ]}
      />

      {/* Stamp Card */}
      <StampCard
        text="VIP"
        subtext="LOYALTY TIER"
        tone="accent"
        className="w-20 h-20"
      />

      {/* Gift Card */}
      <GiftCard
        amount="$100"
        recipient="Jordan Daisy"
        message="Happy Birthday!"
      />

      {/* ID Card */}
      <IdCard
        name="Jordan Daisy"
        role="Product Designer"
        department="UX"
        badgeNumber="EMP-8942"
      />

      {/* RSVP Card */}
      <RsvpCard
        eventTitle="Wedding Reception"
        attending={true}
        onToggle={() => {}}
      />
    </main>
  );
}

export const wave5Previews: Record<string, React.ComponentType> = {
  "product-card": function ProductCardPreview() { return <Wave5Preview />; },
  "user-card": function UserCardPreview() { return <Wave5Preview />; },
  "article-card": function ArticleCardPreview() { return <Wave5Preview />; },
  "event-card": function EventCardPreview() { return <Wave5Preview />; },
  "invoice": function InvoicePreview() { return <Wave5Preview />; },
  "receipt": function ReceiptPreview() { return <Wave5Preview />; },
  "checkout-summary": function CheckoutSummaryPreview() { return <Wave5Preview />; },
  "cart-drawer": function CartDrawerPreview() { return <Wave5Preview />; },
  "size-picker": function SizePickerPreview() { return <Wave5Preview />; },
  "variant-picker": function VariantPickerPreview() { return <Wave5Preview />; },
  "wishlist-button": function WishlistButtonPreview() { return <Wave5Preview />; },
  "add-to-cart-button": function AddToCartButtonPreview() { return <Wave5Preview />; },
  "order-card": function OrderCardPreview() { return <Wave5Preview />; },
  "stamp-card": function StampCardPreview() { return <Wave5Preview />; },
  "gift-card": function GiftCardPreview() { return <Wave5Preview />; },
  "id-card": function IdCardPreview() { return <Wave5Preview />; },
  "rsvp-card": function RsvpCardPreview() { return <Wave5Preview />; },
};
