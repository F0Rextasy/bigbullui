"use client";

import * as React from "react";
import { Carousel } from "@/components/ui/carousel";
import { QrCode } from "@/components/ui/qr-code";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { ImageCrop } from "@/components/ui/image-crop";
import { SankeyChart } from "@/components/ui/sankey-chart";
import { OrgChart } from "@/components/ui/org-chart";

export const waveAdvancedPreviews: Record<string, React.ComponentType> = {
  "qr-code": () => {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <QrCode value="Hello, bigbullui!" size={200} level="M" scan />
      </div>
    );
  },

  "rich-text-editor": () => {
    const defaultHtml = `<p>Hello, <strong>bigbullui</strong>!</p><p>This is a <em>rich text</em> editor.</p>`;
    return (
      <RichTextEditor
        defaultValue={defaultHtml}
        placeholder="Start typing or paste HTML..."
        onValueChange={() => {}}
      />
    );
  },

  "image-crop": () => {
    return (
      <ImageCrop
        src="https://picsum.photos/400/300"
        aspect={4 / 3}
        onCrop={() => {}}
      />
    );
  },

  "sankey-chart": () => {
    const nodes: { id: string; label: string; side: "left" | "right" }[] = [
      { id: "A", label: "Source", side: "left" },
      { id: "B", label: "Target", side: "right" },
    ];
    const flows = [
      { from: "A", to: "B", value: 0.75 },
    ];
    return <SankeyChart nodes={nodes} flows={flows} />;
  },

  "org-chart": () => {
    const root = [
      {
        id: "CEO",
        label: "Chief Executive",
        role: "CEO",
        children: [
          {
            id: "CTO",
            label: "Chief Technology",
            role: "CTO",
            children: [
              { id: "Dev1", label: "Developer 1", role: "Engineer" },
              { id: "Dev2", label: "Developer 2", role: "Engineer" },
            ],
          },
          {
            id: "CFO",
            label: "Chief Financial",
            role: "CFO",
          },
        ],
      },
    ];
    return <OrgChart root={root} />;
  },
};
