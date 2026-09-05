"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type ActivityType =
  | "deploy"
  | "invite"
  | "edit"
  | "security"
  | "release"
  | "delete"
  | "branch"
  | "config"
  | "alert"
  | "comment";

export type ActivityStatus = "completed" | "in_progress" | "failed";

export type ActivityBadgeTone =
  | "default"
  | "accent"
  | "success"
  | "warning"
  | "destructive"
  | "outline";

export interface ActivityActor {
  /** Full name or username */
  name: string;
  /** Image URL for avatar */
  avatarUrl?: string;
  /** 1-3 letter fallback initials (e.g. 'AL', 'SYS') */
  initials?: string;
  /** Role tag (e.g. 'ADMIN', 'DEV', 'BOT', 'LEAD') */
  role?: string;
}

export interface ActivityItem {
  /** Unique activity identifier */
  id: string;
  /** Actor who performed the action */
  actor: ActivityActor;
  /** Semantic type of activity */
  type: ActivityType;
  /** Primary headline or title */
  title: string;
  /** Descriptive summary or message */
  description?: string;
  /** Relative or formatted timestamp (e.g. '2m ago', '14:30', 'Sep 5') */
  timestamp: string;
  /** Optional date grouping section (e.g. 'TODAY', 'YESTERDAY') */
  dateGroup?: string;
  /** Action badge rendered on the card */
  badge?: {
    label: string;
    tone?: ActivityBadgeTone;
  };
  /** Key-value metadata chips (e.g. { env: 'production', commit: '7f91a' }) */
  meta?: Record<string, string>;
  /** Multi-line change details or audit logs */
  details?: string[];
  /** Execution status */
  status?: ActivityStatus;
  /** Highlights unread or new events */
  isUnread?: boolean;
}

export interface ActivityFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of activity log items */
  items: ActivityItem[];
  /** Optional feed title (default: 'ACTIVITY FEED') */
  title?: string;
  /** Ticket stub serial or audit number */
  serial?: string;
  /** Whether to show live pulsating indicator (default: true) */
  showLiveIndicator?: boolean;
  /** Whether to enable interactive category filtering (default: true) */
  allowFiltering?: boolean;
  /** Whether to show ticket notches on activity cards (default: true) */
  showCardNotches?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Callback when an activity item is clicked */
  onItemClick?: (item: ActivityItem) => void;
}

/** Render semantic activity type SVG icons */
function ActivityIcon({ type }: { type: ActivityType }) {
  switch (type) {
    case "deploy":
      return (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      );
    case "invite":
      return (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" y1="8" x2="19" y2="14" />
          <line x1="22" y1="11" x2="16" y2="11" />
        </svg>
      );
    case "security":
      return (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case "release":
      return (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
      );
    case "branch":
      return (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="6" y1="3" x2="6" y2="15" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M18 9a9 9 0 0 1-9 9" />
        </svg>
      );
    case "delete":
      return (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
      );
    case "config":
      return (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="4" y1="21" x2="4" y2="14" />
          <line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" />
          <line x1="20" y1="12" x2="20" y2="3" />
          <line x1="1" y1="14" x2="7" y2="14" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="17" y1="16" x2="23" y2="16" />
        </svg>
      );
    case "alert":
      return (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case "comment":
      return (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case "edit":
    default:
      return (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          <path d="m15 5 4 4" />
        </svg>
      );
  }
}

const badgeVariants: Record<ActivityBadgeTone, string> = {
  default: "border-foreground/50 bg-secondary text-foreground",
  accent: "border-accent text-accent bg-accent/10",
  success: "border-foreground bg-primary text-primary-foreground",
  warning: "border-amber-600/70 text-amber-700 dark:text-amber-300 bg-amber-500/10",
  destructive: "border-destructive text-destructive bg-destructive/10",
  outline: "border-dashed border-border bg-transparent text-muted-foreground",
};

export function ActivityFeed({
  items,
  title = "ACTIVITY STREAM",
  serial = "AUDIT-LOG-88",
  showLiveIndicator = true,
  allowFiltering = true,
  showCardNotches = true,
  emptyMessage = "No activities recorded for this filter.",
  onItemClick,
  className,
  ...props
}: ActivityFeedProps) {
  const [selectedFilter, setSelectedFilter] = React.useState<string>("all");
  const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredItems = React.useMemo(() => {
    if (selectedFilter === "all") return items;
    if (selectedFilter === "deploys") return items.filter((i) => i.type === "deploy" || i.type === "release");
    if (selectedFilter === "team") return items.filter((i) => i.type === "invite" || i.type === "comment");
    if (selectedFilter === "security") return items.filter((i) => i.type === "security" || i.type === "alert");
    return items;
  }, [items, selectedFilter]);

  // Group items by dateGroup if available
  const groupedItems = React.useMemo(() => {
    const groups: { title?: string; items: ActivityItem[] }[] = [];
    let currentGroup: { title?: string; items: ActivityItem[] } | null = null;

    filteredItems.forEach((item) => {
      if (item.dateGroup) {
        if (!currentGroup || currentGroup.title !== item.dateGroup) {
          currentGroup = { title: item.dateGroup, items: [item] };
          groups.push(currentGroup);
        } else {
          currentGroup.items.push(item);
        }
      } else {
        if (!currentGroup || currentGroup.title) {
          currentGroup = { items: [item] };
          groups.push(currentGroup);
        } else {
          currentGroup.items.push(item);
        }
      }
    });

    return groups;
  }, [filteredItems]);

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-lg border-2 border-foreground bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-foreground bg-secondary/60 p-3.5 sm:p-4">
        {/* Left Title & Live Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold tracking-[0.18em] uppercase text-foreground">
              {title}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              ({filteredItems.length})
            </span>
          </div>

          {showLiveIndicator && (
            <div className="inline-flex items-center gap-1.5 rounded-sm border border-dashed border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-accent">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              <span>LIVE</span>
            </div>
          )}
        </div>

        {/* Right Serial Stamp */}
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>{serial}</span>
        </div>
      </div>

      {/* Filter Tabs Toolbar */}
      {allowFiltering && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-dashed border-border bg-secondary/30 px-3.5 py-2 sm:px-4">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground mr-1">
              FILTER:
            </span>
            {[
              { id: "all", label: "ALL" },
              { id: "deploys", label: "DEPLOYS" },
              { id: "team", label: "TEAM" },
              { id: "security", label: "SECURITY" },
            ].map((tab) => {
              const active = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedFilter(tab.id)}
                  aria-pressed={active}
                  className={cn(
                    "cursor-pointer rounded-sm border px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "border-foreground bg-foreground text-card shadow-xs"
                      : "border-dashed border-border bg-card/70 text-muted-foreground hover:bg-card hover:text-foreground"
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground hidden sm:block">
            REALTIME AUDIT
          </div>
        </div>
      )}

      {/* Main Stream Area */}
      <div className="p-4 sm:p-6">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-md border-2 border-dashed border-border py-12 px-4 text-center">
            <div className="size-8 rounded-full border border-dashed border-muted-foreground/40 flex items-center justify-center text-muted-foreground mb-3 font-mono text-sm">
              0
            </div>
            <p className="font-mono text-xs font-bold uppercase tracking-wide text-foreground">
              {emptyMessage}
            </p>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">
              Switch filter to &quot;ALL&quot; or trigger a new event.
            </p>
          </div>
        ) : (
          <div className="relative space-y-6">
            {groupedItems.map((group, groupIdx) => (
              <div key={group.title || `group-${groupIdx}`} className="space-y-4">
                {/* Date Header Stamp */}
                {group.title && (
                  <div className="relative flex items-center justify-center my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t-2 border-dashed border-border" />
                    </div>
                    <div className="relative z-10 flex items-center gap-1.5 rounded-sm border border-foreground/60 bg-secondary px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-foreground shadow-xs">
                      <span>•</span>
                      <span>{group.title}</span>
                      <span>•</span>
                    </div>
                  </div>
                )}

                {/* Timeline Items */}
                <div className="relative pl-7 sm:pl-9 space-y-5">
                  {/* Vertical Continuous Perforation Stem */}
                  <div
                    className="absolute left-3 sm:left-4 top-2 bottom-2 w-0 border-l-2 border-dashed border-border"
                    aria-hidden="true"
                  />

                  {group.items.map((item) => {
                    const isExpanded = !!expandedItems[item.id];
                    const hasDetails = item.details && item.details.length > 0;
                    const isLivePending = item.status === "in_progress";

                    return (
                      <div
                        key={item.id}
                        onClick={() => onItemClick?.(item)}
                        className={cn(
                          "relative group",
                          onItemClick && "cursor-pointer"
                        )}
                      >
                        {/* Timeline Node Stamp & Avatar */}
                        <div
                          className={cn(
                            "absolute -left-7 sm:-left-9 top-1.5 z-10 flex size-7 sm:size-8 items-center justify-center rounded-full border-2 bg-card shadow-xs transition-transform duration-150 group-hover:scale-105",
                            isLivePending ? "border-accent animate-pulse" : "border-foreground"
                          )}
                        >
                          {item.actor.avatarUrl ? (
                            <img
                              src={item.actor.avatarUrl}
                              alt={item.actor.name}
                              className="size-full rounded-full object-cover"
                            />
                          ) : (
                            <span className="font-mono text-[10px] sm:text-xs font-bold text-foreground uppercase select-none">
                              {item.actor.initials ||
                                item.actor.name.slice(0, 2).toUpperCase()}
                            </span>
                          )}

                          {/* Mini Event Icon Badge */}
                          <div
                            className={cn(
                              "absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full border border-foreground bg-card text-foreground shadow-xs",
                              item.type === "deploy" && "text-accent border-accent",
                              item.type === "security" && "text-destructive border-destructive"
                            )}
                            title={item.type}
                          >
                            <ActivityIcon type={item.type} />
                          </div>
                        </div>

                        {/* Activity Card */}
                        <div
                          className={cn(
                            "relative overflow-hidden rounded-lg border-2 border-foreground bg-card p-3.5 sm:p-4 shadow-xs transition-all duration-150 group-hover:border-accent group-hover:shadow-[3px_3px_0_0_var(--color-border)]",
                            item.isUnread && "ring-1 ring-accent"
                          )}
                        >
                          {/* Ticket Punch Notches on Card Edges */}
                          {showCardNotches && (
                            <>
                              <div
                                className="absolute -left-2 top-1/2 -translate-y-1/2 size-3.5 rounded-full bg-background border-2 border-foreground pointer-events-none"
                                aria-hidden="true"
                              />
                              <div
                                className="absolute -right-2 top-1/2 -translate-y-1/2 size-3.5 rounded-full bg-background border-2 border-foreground pointer-events-none"
                                aria-hidden="true"
                              />
                            </>
                          )}

                          {/* Top Row: Actor, Action Badge, and Timestamp */}
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-xs font-bold text-foreground">
                                {item.actor.name}
                              </span>

                              {item.actor.role && (
                                <span className="rounded-sm border border-dashed border-border bg-secondary px-1.5 py-0.2 font-mono text-[9px] font-semibold text-muted-foreground uppercase">
                                  {item.actor.role}
                                </span>
                              )}

                              {item.badge && (
                                <span
                                  className={cn(
                                    "rounded-sm border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider",
                                    badgeVariants[item.badge.tone || "default"]
                                  )}
                                >
                                  {item.badge.label}
                                </span>
                              )}
                            </div>

                            {/* Relative Timestamp */}
                            <div className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground shrink-0">
                              <svg
                                width="11"
                                height="11"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                              <span>{item.timestamp}</span>
                            </div>
                          </div>

                          {/* Title & Description */}
                          <div className="mt-2">
                            <h4 className="font-mono text-xs sm:text-sm font-semibold text-foreground tracking-tight">
                              {item.title}
                            </h4>
                            {item.description && (
                              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                                {item.description}
                              </p>
                            )}
                          </div>

                          {/* Metadata Key-Value Chips */}
                          {item.meta && Object.keys(item.meta).length > 0 && (
                            <div className="mt-3 flex flex-wrap items-center gap-1.5">
                              {Object.entries(item.meta).map(([key, value]) => (
                                <div
                                  key={key}
                                  className="inline-flex items-center gap-1 rounded-sm border border-dashed border-border bg-secondary/60 px-2 py-0.5 font-mono text-[10px] text-foreground"
                                >
                                  <span className="text-muted-foreground uppercase opacity-80">
                                    {key}:
                                  </span>
                                  <span className="font-semibold">{value}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Expandable Details Receipt */}
                          {hasDetails && (
                            <div className="mt-3 pt-2 border-t border-dashed border-border">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleExpand(item.id);
                                }}
                                aria-expanded={isExpanded}
                                className="cursor-pointer inline-flex items-center gap-1 font-mono text-[10px] font-bold text-accent uppercase tracking-wider hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              >
                                <span>{isExpanded ? "HIDE AUDIT DETAILS" : "VIEW AUDIT DETAILS"}</span>
                                <svg
                                  width="10"
                                  height="10"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className={cn("transition-transform duration-150", isExpanded && "rotate-180")}
                                  aria-hidden="true"
                                >
                                  <polyline points="6 9 12 15 18 9" />
                                </svg>
                              </button>

                              {isExpanded && (
                                <div className="mt-2 rounded-sm border border-dashed border-border bg-secondary/40 p-2.5 font-mono text-xs animate-in fade-in-50 duration-150">
                                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1 font-bold">
                                    EXECUTION LOG:
                                  </div>
                                  <ul className="space-y-1">
                                    {item.details!.map((detail, dIdx) => (
                                      <li
                                        key={dIdx}
                                        className="flex items-start gap-2 text-foreground text-[11px]"
                                      >
                                        <span className="text-accent select-none font-bold">›</span>
                                        <span>{detail}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ticket Footer Tear-Off */}
      <div className="relative flex items-center justify-between border-t-2 border-dashed border-border bg-secondary/40 px-3.5 py-2 sm:px-4">
        <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
          <span className="size-2 rounded-full bg-accent" />
          <span className="uppercase font-semibold">FEED LOG SYNCED</span>
        </div>
        <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
          VERIFIED AUDIT // STUB-PASS
        </div>
      </div>
    </div>
  );
}
