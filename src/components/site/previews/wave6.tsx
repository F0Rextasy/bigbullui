"use client";

import * as React from "react";
import { cn } from "@/components/ui/lib/utils";

import { ChatWindow } from "@/components/ui/chat-window";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { TypingIndicator } from "@/components/ui/typing-indicator";
import { CommentThread } from "@/components/ui/comment-thread";
import { ReactionBar } from "@/components/ui/reaction-bar";
import { LikeButton } from "@/components/ui/like-button";
import { ShareMenu } from "@/components/ui/share-menu";
import { StoryViewer } from "@/components/ui/story-viewer";
import { PostCard } from "@/components/ui/post-card";
import { FollowerList } from "@/components/ui/follower-list";
import { VoiceMessage } from "@/components/ui/voice-message";
import { EmojiPicker } from "@/components/ui/emoji-picker";
import type { ChatMessage } from "@/components/ui/chat-window";
import type { CommentNode } from "@/components/ui/comment-thread";
import type { Story } from "@/components/ui/story-viewer";
import type { Follower } from "@/components/ui/follower-list";

// Deterministic seed data for all 12 components

type ChatMessageLike = {
  id: string;
  author: string;
  initials?: string;
  body: string;
  time?: string;
  direction?: "incoming" | "outgoing";
};

const sampleChatMessages: ChatMessage[] = [
  { id: "1", author: "Alex", initials: "AM", body: "Hey! How's it going?", time: "2:15 PM", direction: "outgoing" },
  { id: "2", author: "Sam", initials: "SB", body: "All good here, just working on the bigbullui components. How about you?", time: "2:16 PM", direction: "incoming" },
  { id: "3", author: "Alex", initials: "AM", body: "Love the new wave 6 components! Especially the chat window and bubbles.", time: "2:18 PM", direction: "outgoing" },
  { id: "4", author: "Sam", initials: "SB", body: "Thanks! Working on the typing indicator and reaction bar next.", time: "2:19 PM", direction: "incoming" },
];

// CommentThread seed data
type CommentLike = {
  id: string;
  author: string;
  initials?: string;
  body: string;
  time?: string;
  children?: CommentLike[];
};
const sampleComments: CommentNode[] = [
  { id: "1", author: "Jordan", initials: "JD", body: "This is an amazing component library!", time: "3 hours ago", children: [
    { id: "1.1", author: "Casey", initials: "CS", body: "Agreed, the animation quality is top-notch.", time: "2 hours ago" },
    { id: "1.2", author: "Riley", initials: "RL", body: "The dark mode looks great too.", time: "1.5 hours ago" },
  ]},
  { id: "2", author: "Morgan", initials: "MG", body: "Question about the story viewer implementation.", time: "4 hours ago" },
];

type ReactionLike = { emoji: string; count: number; active?: boolean };
const sampleReactions: ReactionLike[] = [
  { emoji: "👍", count: 14, active: false },
  { emoji: "❤️", count: 8, active: false },
  { emoji: "😂", count: 5, active: false },
  { emoji: "🔥", count: 3, active: true },
];

// LikeButton - no extra seed data needed, standalone component

// ShareMenu - no extra seed data needed, standalone component

// StoryViewer seed data
type StoryLike = { id: string; author: string; initials?: string; body?: string };
const sampleStories: Story[] = [
  { id: "1", author: "Casey", initials: "CS", body: "New post!" },
  { id: "2", author: "Riley", initials: "RL", body: "Just deployed!" },
  { id: "3", author: "Morgan", initials: "MG", body: "Weekend plans!" },
  { id: "4", author: "Alex", initials: "AM", body: "Working on bigbullui" },
];

// PostCard seed data
const samplePostCard = {
  avatar: "AM",
  name: "Alex",
  time: "2h ago",
  body: "Just finished adding 12 new components to the bigbullui library. Waves 6 through 8 are looking great!",
  likes: 23,
  comments: 5,
  shares: 2,
};

// FollowerList seed data
type FollowerLike = { id: string; avatar?: string; name: string; handle: string };
const sampleFollowers: Follower[] = [
  { id: "1", avatar: "AM", name: "Alex", handle: "@alex" },
  { id: "2", avatar: "SB", name: "Sam", handle: "@sam" },
  { id: "3", avatar: "JD", name: "Jordan", handle: "@jordan" },
  { id: "4", avatar: "MG", name: "Morgan", handle: "@morgan" },
];

// VoiceMessage - no extra seed data needed for basic demo

// EmojiPicker - no extra seed data needed for basic demo

const ChatWindowPreview: React.FC = () => {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-4">ChatWindow</h3>
      <ChatWindow messages={sampleChatMessages} onSend={() => {}} typing={true} />
    </div>
  );
};

const ChatBubblePreview: React.FC = () => {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-4">ChatBubble</h3>
      <ChatBubble direction="outgoing">
        Hey there! How's it going?
      </ChatBubble>
      <ChatBubble direction="incoming">
        I'm doing well, thanks!
      </ChatBubble>
    </div>
  );
};

const TypingIndicatorPreview: React.FC = () => {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-4">TypingIndicator</h3>
      <TypingIndicator />
    </div>
  );
};

const CommentThreadPreview: React.FC = () => {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-4">CommentThread</h3>
      <CommentThread comments={sampleComments} maxDepth={3} />
    </div>
  );
};

const ReactionBarPreview: React.FC = () => {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-4">ReactionBar</h3>
      <ReactionBar reactions={sampleReactions} onReact={() => {}} />
    </div>
  );
};

const LikeButtonPreview: React.FC = () => {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-4">LikeButton</h3>
      <LikeButton onClick={() => {}} />
    </div>
  );
};

const ShareMenuPreview: React.FC = () => {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-4">ShareMenu</h3>
      <ShareMenu onCopy={() => {}} />
    </div>
  );
};

const StoryViewerPreview: React.FC = () => {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-4">StoryViewer</h3>
      <StoryViewer stories={sampleStories} duration={3000} />
    </div>
  );
};

const PostCardPreview: React.FC = () => {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-4">PostCard</h3>
      <PostCard {...samplePostCard} />
    </div>
  );
};

const FollowerListPreview: React.FC = () => {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-4">FollowerList</h3>
      <FollowerList followers={sampleFollowers} />
    </div>
  );
};

const VoiceMessagePreview: React.FC = () => {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-4">VoiceMessage</h3>
      <VoiceMessage duration={45} playing={true} onPlayPause={() => {}} />
    </div>
  );
};

const EmojiPickerPreview: React.FC = () => {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-4">EmojiPicker</h3>
      <EmojiPicker onSelect={() => {}} />
    </div>
  );
};

export const wave6Previews: Record<string, React.ComponentType> = {
  "chat-window": ChatWindowPreview,
  "chat-bubble": ChatBubblePreview,
  "typing-indicator": TypingIndicatorPreview,
  "comment-thread": CommentThreadPreview,
  "reaction-bar": ReactionBarPreview,
  "like-button": LikeButtonPreview,
  "share-menu": ShareMenuPreview,
  "story-viewer": StoryViewerPreview,
  "post-card": PostCardPreview,
  "follower-list": FollowerListPreview,
  "voice-message": VoiceMessagePreview,
  "emoji-picker": EmojiPickerPreview,
};