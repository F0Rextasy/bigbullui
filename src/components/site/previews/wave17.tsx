"use client";

import * as React from "react";
import { RefundCard } from "@/components/ui/refund-card";
import { WalletCard } from "@/components/ui/wallet-card";
import { CryptoTicker } from "@/components/ui/crypto-ticker";
import { ExchangeRate } from "@/components/ui/exchange-rate";
import { BudgetProgress } from "@/components/ui/budget-progress";
import { SubscriptionCard } from "@/components/ui/subscription-card";
import { GalleryGrid } from "@/components/ui/gallery-grid";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { ThumbnailStrip } from "@/components/ui/thumbnail-strip";
import { VideoList } from "@/components/ui/video-list";
import { AudioRecorder } from "@/components/ui/audio-recorder";
import { MediaEmbed } from "@/components/ui/media-embed";
import { PosterCard } from "@/components/ui/poster-card";
import { ScreenshotFrame } from "@/components/ui/screenshot-frame";
import { QuoteWall } from "@/components/ui/quote-wall";
import { GlossaryList } from "@/components/ui/glossary-list";
import { ChangelogList } from "@/components/ui/changelog-list";
import { RecipeCard } from "@/components/ui/recipe-card";
import { CodeEditor } from "@/components/ui/code-editor";
import { MarkdownEditor } from "@/components/ui/markdown-editor";
import { MarkdownPreview } from "@/components/ui/markdown-preview";
import { HtmlPreview } from "@/components/ui/html-preview";
import { DiffEditor } from "@/components/ui/diff-editor";
import { JsonEditor } from "@/components/ui/json-editor";
import { RegexTester } from "@/components/ui/regex-tester";

export const wave17Previews: Record<string, React.ComponentType> = {
  "refund-card": () => <RefundCard orderId="BB-77" amount="$250" status="approved" reason="Event cancelled" />,
  "wallet-card": () => <WalletCard balance="$1,250" transactions={[{ id: "1", label: "Ticket", amount: "$90", negative: true }]} />,
  "crypto-ticker": () => <CryptoTicker entries={[{ symbol: "BTC", name: "Bitcoin", price: "$67k", change: 2.4 }, { symbol: "ETH", name: "Ethereum", price: "$3.2k", change: -1.1 }]} />,
  "exchange-rate": () => <ExchangeRate />,
  "budget-progress": () => <BudgetProgress categories={[{ id: "1", label: "Stage Production", spent: 800, limit: 1000 }]} />,
  "subscription-card": () => <SubscriptionCard plan="Pro" price="$149" cycle="mo" renewDate="Oct 12" features={["Unlimited tickets"]} />,
  "gallery-grid": () => <GalleryGrid images={[{ id: "1", src: "/file.svg", alt: "Visual" }]} columns={2} />,
  "image-carousel": () => <ImageCarousel images={[{ id: "1", src: "/file.svg" }]} />,
  "thumbnail-strip": () => <ThumbnailStrip images={[{ id: "1", src: "/file.svg" }]} />,
  "video-list": () => <VideoList videos={[{ id: "1", title: "Concert highlights", channel: "bigbull", duration: "3:21" }]} />,
  "audio-recorder": () => <AudioRecorder />,
  "media-embed": () => <MediaEmbed title="Stage recording" />,
  "poster-card": () => <PosterCard title="Summer Festival" subtitle="Open Air Stage" date={{ day: "14", month: "Oct" }} />,
  "screenshot-frame": () => <ScreenshotFrame url="bigbullui.vercel.app"><p className="p-4 text-sm text-muted-foreground">Screenshot content preview</p></ScreenshotFrame>,
  "quote-wall": () => <QuoteWall quotes={[{ id: "1", quote: "An outstanding experience.", author: "Ada" }]} />,
  "glossary-list": () => <GlossaryList terms={[{ id: "1", term: "Ticket", definition: "Admission credential document" }]} />,
  "changelog-list": () => <ChangelogList entries={[{ id: "1", version: "1.1.0", date: "2026-01-15", added: ["New components"] }]} />,
  "recipe-card": () => <RecipeCard title="Chef Special" minutes={45} servings={4} ingredients={[{ id: "1", amount: "2 kg", name: "Ingredients" }]} steps={["Prep", "Roast"]} />,
  "code-editor": () => <CodeEditor defaultValue="const ticket = true;" />,
  "markdown-editor": () => <MarkdownEditor defaultValue="# Heading\n\n**bold** text" />,
  "markdown-preview": () => <MarkdownPreview source={"## Preview\n\n- item"} />,
  "html-preview": () => <HtmlPreview html="<h2 style='font-family:sans-serif'>Hello World</h2>" />,
  "diff-editor": () => <DiffEditor before={"const prev = 1;"} after={"const next = 2;"} readOnly />,
  "json-editor": () => <JsonEditor defaultValue={'{"name": "bigbullui"}'} />,
  "regex-tester": () => <RegexTester pattern="\\d+" testString="Ticket 42 units" />,
};
