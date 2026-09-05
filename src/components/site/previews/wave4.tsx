"use client";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Result } from "@/components/ui/result";
import { LoadingDots } from "@/components/ui/loading-dots";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { Fab } from "@/components/ui/fab";
import { SpeedDial } from "@/components/ui/speed-dial";
import { NotificationCenter } from "@/components/ui/notification-center";
import { Spotlight } from "@/components/ui/spotlight";
import { CoachMark } from "@/components/ui/coach-mark";
import { ImageCompare } from "@/components/ui/image-compare";
import { ZoomImage } from "@/components/ui/zoom-image";
import { InfiniteScroll } from "@/components/ui/infinite-scroll";
import { LoadMore } from "@/components/ui/load-more";
import { VirtualList } from "@/components/ui/virtual-list";
import { ScrollShadow } from "@/components/ui/scroll-shadow";
import { Reveal } from "@/components/ui/reveal";

export const wave4Previews: Record<string, React.ComponentType> = {
  "confirm-dialog": () => {
    return (
      <ConfirmDialog
        open={true}
        onOpenChange={() => {}}
        title="Delete item"
        description="Are you sure you want to delete this item?"
        confirmLabel="Delete"
        destructive={true}
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );
  },
  result: () => {
    return (
      <Result
        status="success"
        title="Operation successful"
        description="Your changes have been saved."
        actions={<button>View changes</button>}
      />
    );
  },
  "loading-dots": () => {
    return <LoadingDots size="md" tone="default" />;
  },
  "loading-overlay": () => {
    return <LoadingOverlay active={true} label="Loading data..." />;
  },
  fab: () => {
    return (
      <Fab label="Add" position="bottom-right" onClick={() => {}} />
    );
  },
  "speed-dial": () => {
    return (
      <SpeedDial
        items={[
          { id: "1", label: "New Message", onClick: () => {} },
          { id: "2", label: "New Call", onClick: () => {} },
          { id: "3", label: "New Task", onClick: () => {} },
        ]}
        onOpenChange={() => {}}
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 14 13"></polygon>
        </svg>
      </SpeedDial>
    );
  },
  "notification-center": () => {
    return (
      <NotificationCenter
        notifications={[
          { id: "1", title: "New message", body: "Hello there", time: "2m ago", unread: true },
          { id: "2", title: "System update", body: "New version available", time: "1h ago", unread: false },
        ]}
      />
    );
  },
  spotlight: () => {
    const ref = React.useRef<HTMLElement>(null);
    return (
      <Spotlight
        targetRef={ref}
        padding={24}
        title="Feature highlight"
        description="This is a spotlight highlighting a target area"
      />
    );
  },
  "coach-mark": () => {
    return (
      <CoachMark
        trigger={<div className="p-4 bg-card rounded-md">Get Started</div>}
        title="Welcome"
        description="This is a coach mark guiding you through the interface"
        onDismiss={() => {}}
      />
    );
  },
  "image-compare": () => {
    return (
      <ImageCompare
        before="/stock/stage.jpg"
        after="/stock/crowd.jpg"
        alt="Comparison"
      />
    );
  },
  "zoom-image": () => {
    return (
      <ZoomImage
        src="/stock/artist.jpg"
        alt="Product image"
        zoom={2}
      />
    );
  },
  "infinite-scroll": () => {
    return (
      <InfiniteScroll
        onLoadMore={() => {}}
        hasMore={true}
        loader={<span>Loading more items...</span>}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="p-3 bg-muted rounded-md">
            Item {i}
          </div>
        ))}
      </InfiniteScroll>
    );
  },
  "load-more": () => {
    return (
      <LoadMore
        items={[
          <div key={1} className="p-2 bg-card">Item 1</div>,
          <div key={2} className="p-2 bg-card">Item 2</div>,
          <div key={3} className="p-2 bg-card">Item 3</div>,
        ]}
        onLoadMore={() => {}}
      />
    );
  },
  "virtual-list": () => {
    return (
      <VirtualList
        items={Array.from({ length: 100 }, (_, i) => i)}
        itemHeight={40}
        height={400}
        render={(item) => <div key={item} className="p-2 bg-muted text-sm">Item {item}</div>}
      />
    );
  },
  "scroll-shadow": () => {
    return (
      <ScrollShadow>
        <div className="p-4 bg-card h-full">
          {/* Content with scroll */}
        </div>
      </ScrollShadow>
    );
  },
  reveal: () => {
    return (
      <Reveal delay={0}>
        <div className="p-4 bg-card text-left">
          Content reveals when scrolling into view
        </div>
      </Reveal>
    );
  },
};