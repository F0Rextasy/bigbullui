"use client";

import * as React from "react";
import { ThinkingBlock } from "@/components/ui/thinking-block";
import { PromptInput } from "@/components/ui/prompt-input";
import { StreamingText } from "@/components/ui/streaming-text";
import { TokenCounter } from "@/components/ui/token-counter";
import { PromptHistoryDrawer } from "@/components/ui/prompt-history-drawer";
import { ModelPicker } from "@/components/ui/model-picker";
import { FeedbackVote } from "@/components/ui/feedback-vote";
import { AgentArtifactCard } from "@/components/ui/agent-artifact-card";
import { PromptDiffCompare } from "@/components/ui/prompt-diff-compare";
import { VoiceChatVisualizer } from "@/components/ui/voice-chat-visualizer";
import { CitationBubble } from "@/components/ui/citation-bubble";
import { PrintableTicket } from "@/components/ui/printable-ticket";
import { PrintableInvoice } from "@/components/ui/printable-invoice";
import { BoardingPassPrint } from "@/components/ui/boarding-pass-print";
import { BadgePrinterTemplate } from "@/components/ui/badge-printer-template";
import { AudioToggle } from "@/components/ui/audio-toggle";

export const wave26Previews: Record<string, React.ComponentType> = {
  "thinking-block": function ThinkingBlockPreview() {
    return (
      <div className="w-full max-w-md">
        <ThinkingBlock defaultOpen />
      </div>
    );
  },

  "prompt-input": function PromptInputPreview() {
    return (
      <div className="w-full max-w-md">
        <PromptInput />
      </div>
    );
  },

  "streaming-text": function StreamingTextPreview() {
    return (
      <div className="w-full max-w-md">
        <StreamingText text="Your festival stub is ready. Gate B opens at 19:00 sharp." />
      </div>
    );
  },

  "token-counter": function TokenCounterPreview() {
    return (
      <div className="w-full max-w-md">
        <TokenCounter text="Design a cream ticket stub with a red stamp seal." limit={4096} />
      </div>
    );
  },

  "prompt-history-drawer": function PromptHistoryDrawerPreview() {
    return <PromptHistoryDrawer />;
  },

  "model-picker": function ModelPickerPreview() {
    return <ModelPicker />;
  },

  "feedback-vote": function FeedbackVotePreview() {
    return <FeedbackVote />;
  },

  "agent-artifact-card": function AgentArtifactCardPreview() {
    return (
      <div className="w-full max-w-md">
        <AgentArtifactCard />
      </div>
    );
  },

  "prompt-diff-compare": function PromptDiffComparePreview() {
    return (
      <div className="w-full max-w-lg">
        <PromptDiffCompare
          before="Design a blue ticket stub for the evening show"
          after="Design a cream ticket stub with red stamp for the evening gala show"
        />
      </div>
    );
  },

  "voice-chat-visualizer": function VoiceChatVisualizerPreview() {
    return (
      <div className="w-full max-w-md">
        <VoiceChatVisualizer />
      </div>
    );
  },

  "citation-bubble": function CitationBubblePreview() {
    return (
      <p className="max-w-md text-sm text-foreground">
        Capacity verified for the main stage
        <CitationBubble index={1} /> with overflow seating on the lawn
        <CitationBubble index={2} title="Lawn seating plan" source="ops memo · page 3" excerpt="Overflow lawn holds 120 guests with sight lines." />
      </p>
    );
  },

  "printable-ticket": function PrintableTicketPreview() {
    return <PrintableTicket />;
  },

  "printable-invoice": function PrintableInvoicePreview() {
    return <PrintableInvoice />;
  },

  "boarding-pass-print": function BoardingPassPrintPreview() {
    return <BoardingPassPrint />;
  },

  "badge-printer-template": function BadgePrinterTemplatePreview() {
    return <BadgePrinterTemplate />;
  },

  "audio-toggle": function AudioTogglePreview() {
    return <AudioToggle />;
  },
};
