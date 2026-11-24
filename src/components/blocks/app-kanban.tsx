"use client";

import * as React from "react";
import { cn } from "../ui/lib/utils";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar } from "../ui/avatar";

export interface KanbanCardItem {
  id: string;
  title: string;
  tag: string;
  who: string;
  comments: number;
}

export interface KanbanLaneItem {
  id: string;
  title: string;
  cards: KanbanCardItem[];
}

const DEFAULT_LANES: KanbanLaneItem[] = [
  {
    id: "backlog",
    title: "BACKLOG",
    cards: [
      { id: "k1", title: "Reprint faded wristbands", tag: "PRINT", who: "Jon Reyes", comments: 2 },
      { id: "k2", title: "Translate safety signage", tag: "OPS", who: "Sena Park", comments: 0 },
    ],
  },
  {
    id: "build",
    title: "IN BUILD",
    cards: [
      { id: "k3", title: "Wire scanner gate 4", tag: "GATE", who: "Ada Bull", comments: 5 },
    ],
  },
  {
    id: "review",
    title: "DOOR REVIEW",
    cards: [
      { id: "k4", title: "Approve VIP lounge menu", tag: "VIP", who: "Mira Chen", comments: 1 },
    ],
  },
  {
    id: "live",
    title: "LIVE",
    cards: [
      { id: "k5", title: "Open standby window", tag: "GATE", who: "Gate Team", comments: 8 },
    ],
  },
];

export interface AppKanbanProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: string;
  title?: string;
  lanes?: KanbanLaneItem[];
  defaultLanes?: KanbanLaneItem[];
  onCardClick?: (card: KanbanCardItem, laneId: string) => void;
  onCreateCard?: (laneId: string, card: KanbanCardItem) => void;
  onMoveCard?: (cardId: string, fromLaneId: string, toLaneId: string) => void;
  onAction?: (action: string) => void;
}

export function AppKanban({
  eyebrow = "SHOW // PROJECT BOARD",
  title = "Opening night",
  lanes: controlledLanes,
  defaultLanes = DEFAULT_LANES,
  onCardClick,
  onCreateCard,
  onMoveCard,
  className,
  onAction,
  ...props
}: AppKanbanProps) {
  const [internalLanes, setInternalLanes] = React.useState<KanbanLaneItem[]>(defaultLanes);
  const [notice, setNotice] = React.useState<string | null>(null);
  const lanes = controlledLanes ?? internalLanes;

  const handleAddCard = () => {
    const firstLane = lanes[0];
    if (!firstLane) return;
    const newCard: KanbanCardItem = {
      id: `k-${Date.now().toString(36)}`,
      title: `Task #${lanes.reduce((sum, l) => sum + l.cards.length, 0) + 1}`,
      tag: "OPS",
      who: "Crew",
      comments: 0,
    };
    if (!controlledLanes) {
      setInternalLanes((prev) =>
        prev.map((lane, idx) =>
          idx === 0 ? { ...lane, cards: [...lane.cards, newCard] } : lane
        )
      );
    }
    setNotice("New card queued.");
    onCreateCard?.(firstLane.id, newCard);
    onAction?.("new-card");
  };

  const handleAdvanceCard = (card: KanbanCardItem, laneIdx: number) => {
    const fromLane = lanes[laneIdx];
    const toLane = lanes[(laneIdx + 1) % lanes.length];
    if (!fromLane || !toLane || fromLane.id === toLane.id) return;
    if (!controlledLanes) {
      setInternalLanes((prev) =>
        prev.map((lane) => {
          if (lane.id === fromLane.id) {
            return { ...lane, cards: lane.cards.filter((c) => c.id !== card.id) };
          }
          if (lane.id === toLane.id) {
            return { ...lane, cards: [...lane.cards, card] };
          }
          return lane;
        })
      );
    }
    setNotice(`Moved ${card.title} -> ${toLane.title}`);
    onMoveCard?.(card.id, fromLane.id, toLane.id);
  };

  return (
    <div className={cn("w-full space-y-4", className)} {...props}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</p>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          {notice && (
            <span role="status" className="font-mono text-[10px] uppercase tracking-wider text-accent">
              {notice}
            </span>
          )}
          <Button size="sm" onClick={handleAddCard}>
            New card
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {lanes.map((lane, laneIdx) => (
          <div key={lane.id} className="rounded-lg border-2 border-foreground bg-card p-3">
            <div className="mb-3 flex items-center justify-between border-b-2 border-dashed border-border px-1 pb-2">
              <p className="font-mono text-xs font-black uppercase tracking-[0.2em]">{lane.title}</p>
              <Badge variant="outline">{lane.cards.length}</Badge>
            </div>
            <div className="space-y-3">
              {lane.cards.map((card) => (
                <Card key={card.id}>
                  <CardHeader className="pb-2">
                    <Badge variant={lane.id === "live" ? "accent" : "default"}>{card.tag}</Badge>
                    <CardTitle className="text-sm normal-case tracking-normal">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between gap-1">
                    <span className="inline-flex items-center gap-2">
                      <Avatar name={card.who} size="sm" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {card.comments} NOTES
                      </span>
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleAdvanceCard(card, laneIdx)}
                        aria-label={`Move ${card.title} to next lane`}
                      >
                        →
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setNotice(`${card.title} (${lane.title})`);
                          onCardClick?.(card, lane.id);
                          onAction?.("card-detail");
                        }}
                      >
                        Detail
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
