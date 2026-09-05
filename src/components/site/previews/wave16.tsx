"use client";

import * as React from "react";
import { MobileMenu } from "@/components/ui/mobile-menu";
import { SidebarV2 } from "@/components/ui/sidebar-v2";
import { FlyoutV2 } from "@/components/ui/flyout-v2";
import { ScrollSpyV2 } from "@/components/ui/scroll-spy-v2";
import { PaginationV2 } from "@/components/ui/pagination-v2";
import { SearchFilterBar } from "@/components/ui/search-filter-bar";
import { MentionList } from "@/components/ui/mention-list";
import { DmThread } from "@/components/ui/dm-thread";
import { Poll } from "@/components/ui/poll";
import { QuizCard } from "@/components/ui/quiz-card";
import { AvatarUpload } from "@/components/ui/avatar-upload";
import { BioCard } from "@/components/ui/bio-card";
import { MentionHighlight } from "@/components/ui/mention-highlight";
import { BadgeList } from "@/components/ui/badge-list";
import { GiftMessage } from "@/components/ui/gift-message";
import { VoiceNoteList } from "@/components/ui/voice-note-list";
import { PriceCompare } from "@/components/ui/price-compare";
import { StockStatus } from "@/components/ui/stock-status";
import { ShippingOptions } from "@/components/ui/shipping-options";
import { PaymentMethods } from "@/components/ui/payment-methods";
import { CreditCardForm } from "@/components/ui/credit-card-form";
import { InstallmentPicker } from "@/components/ui/installment-picker";
import { CouponField } from "@/components/ui/coupon-field";
import { CartBadge } from "@/components/ui/cart-badge";
import { OrderTracking } from "@/components/ui/order-tracking";

export const wave16Previews: Record<string, React.ComponentType> = {
  "mobile-menu": () => <MobileMenu open={false} onOpenChange={() => {}} items={[{ id: "1", label: "Navigation" }]} />,
  "sidebar-v2": () => <SidebarV2 items={[{ id: "1", label: "General", children: [{ id: "1a", label: "Profile" }] }]} />,
  "flyout-v2": () => <FlyoutV2 items={[{ id: "1", label: "Tickets", children: [{ id: "a", label: "Purchase" }] }]} />,
  "scroll-spy-v2": () => <ScrollSpyV2 sections={[{ id: "a", label: "Section A" }, { id: "b", label: "Section B" }]} />,
  "pagination-v2": () => <PaginationV2 totalPages={10} />,
  "search-filter-bar": () => <SearchFilterBar placeholder="Search tickets…" filters={[{ id: "vip", label: "VIP" }]} />,
  "mention-list": () => <MentionList users={[{ id: "1", name: "Ada", initials: "AL", handle: "@ada" }]} />,
  "dm-thread": () => <DmThread name="Ada" initials="AL" online messages={[{ id: "1", body: "Hey there!", time: "14:02", mine: true }]} />,
  "poll": () => <Poll question="Best performance category?" options={[{ id: "a", label: "Rock", votes: 12 }]} />,
  "quiz-card": () => <QuizCard question="Which is the primary port?" options={[{ id: "a", label: "Port 443", correct: true }, { id: "b", label: "Port 80" }]} />,
  "avatar-upload": () => <AvatarUpload />,
  "bio-card": () => <BioCard name="Ada Lovelace" initials="AL" bio="Ticketing specialist" links={[{ platform: "Web", href: "#" }]} />,
  "mention-highlight": () => <MentionHighlight text="@ada issued a new #ticket" />,
  "badge-list": () => <BadgeList badges={[{ id: "1", label: "VIP", earned: true }, { id: "2", label: "Locked" }]} />,
  "gift-message": () => <GiftMessage from="Ada" message="Best wishes!" />,
  "voice-note-list": () => <VoiceNoteList notes={[{ id: "1", sender: "Ada", duration: "0:14", bars: [40, 70, 50, 90, 30] }]} />,
  "price-compare": () => <PriceCompare title="Ticket" offers={[{ id: "1", seller: "A", price: 250, best: true }, { id: "2", seller: "B", price: 280 }]} />,
  "stock-status": () => <div className="flex gap-2"><StockStatus stock={3} /><StockStatus stock={50} /></div>,
  "shipping-options": () => <ShippingOptions options={[{ id: "1", carrier: "Express Delivery", duration: "1-2 days", price: "$30", recommended: true }]} />,
  "payment-methods": () => <PaymentMethods methods={[{ id: "card", label: "Card", icon: "card" }, { id: "bank", label: "Bank Transfer", icon: "bank" }]} />,
  "credit-card-form": () => <CreditCardForm />,
  "installment-picker": () => <InstallmentPicker plans={[{ months: 3, monthly: "$33", total: "$99" }]} />,
  "coupon-field": () => <CouponField />,
  "cart-badge": () => <CartBadge count={3} />,
  "order-tracking": () => <OrderTracking orderId="BB-1024" steps={[{ id: "1", label: "Order Placed", done: true }, { id: "2", label: "Shipped" }]} />,
};
