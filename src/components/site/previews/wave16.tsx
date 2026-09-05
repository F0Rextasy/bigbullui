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
  "mobile-menu": () => <MobileMenu open={false} onOpenChange={() => {}} items={[{ id: "1", label: "Bağlantı" }]} />,
  "sidebar-v2": () => <SidebarV2 items={[{ id: "1", label: "Genel", children: [{ id: "1a", label: "Profil" }] }]} />,
  "flyout-v2": () => <FlyoutV2 items={[{ id: "1", label: "Biletler", children: [{ id: "a", label: "Satın al" }] }]} />,
  "scroll-spy-v2": () => <ScrollSpyV2 sections={[{ id: "a", label: "Bölüm A" }, { id: "b", label: "Bölüm B" }]} />,
  "pagination-v2": () => <PaginationV2 totalPages={10} />,
  "search-filter-bar": () => <SearchFilterBar placeholder="Bilet ara…" filters={[{ id: "vip", label: "VIP" }]} />,
  "mention-list": () => <MentionList users={[{ id: "1", name: "Ada", initials: "AL", handle: "@ada" }]} />,
  "dm-thread": () => <DmThread name="Ada" initials="AL" online messages={[{ id: "1", body: "Selam!", time: "14:02", mine: true }]} />,
  "poll": () => <Poll question="En iyi konser?" options={[{ id: "a", label: "Rock", votes: 12 }]} />,
  "quiz-card": () => <QuizCard question="Başkent neresi?" options={[{ id: "a", label: "Ankara", correct: true }, { id: "b", label: "İzmir" }]} />,
  "avatar-upload": () => <AvatarUpload />,
  "bio-card": () => <BioCard name="Ada Lovelace" initials="AL" bio="Bilet uzmanı" links={[{ platform: "Web", href: "#" }]} />,
  "mention-highlight": () => <MentionHighlight text="@ada yeni #bilet gönderdi" />,
  "badge-list": () => <BadgeList badges={[{ id: "1", label: "VIP", earned: true }, { id: "2", label: "Kilitli" }]} />,
  "gift-message": () => <GiftMessage from="Ada" message="Mutlu yıllar!" />,
  "voice-note-list": () => <VoiceNoteList notes={[{ id: "1", sender: "Ada", duration: "0:14", bars: [40, 70, 50, 90, 30] }]} />,
  "price-compare": () => <PriceCompare title="Bilet" offers={[{ id: "1", seller: "A", price: 250, best: true }, { id: "2", seller: "B", price: 280 }]} />,
  "stock-status": () => <div className="flex gap-2"><StockStatus stock={3} /><StockStatus stock={50} /></div>,
  "shipping-options": () => <ShippingOptions options={[{ id: "1", carrier: "Kargo A", duration: "1-2 gün", price: "₺30", recommended: true }]} />,
  "payment-methods": () => <PaymentMethods methods={[{ id: "card", label: "Kart", icon: "card" }, { id: "bank", label: "Havale", icon: "bank" }]} />,
  "credit-card-form": () => <CreditCardForm />,
  "installment-picker": () => <InstallmentPicker plans={[{ months: 3, monthly: "₺33", total: "₺99" }]} />,
  "coupon-field": () => <CouponField />,
  "cart-badge": () => <CartBadge count={3} />,
  "order-tracking": () => <OrderTracking orderId="BB-1024" steps={[{ id: "1", label: "Sipariş", done: true }, { id: "2", label: "Kargo" }]} />,
};
