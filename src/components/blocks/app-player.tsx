"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

const EPISODES = [
  { id: "e1", title: "Doors open: the first scan", length: "24:10", mark: 12 },
  { id: "e2", title: "Balcony nights and brass", length: "31:45", mark: 48 },
  { id: "e3", title: "Encore economics", length: "18:22", mark: 76 },
];

const CHAPTERS = [0, 20, 40, 60, 80, 100];

export function AppPlayer() {
  const [current, setCurrent] = React.useState(EPISODES[0].id);
  const [playing, setPlaying] = React.useState(true);
  const active = EPISODES.find((episode) => episode.id === current) ?? EPISODES[0];
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">BOOTH{" // "}PLAYER</p>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">Show tapes</h2>
        </div>
        <Badge variant="accent">{playing ? "NOW PLAYING" : "PAUSED"}</Badge>
      </div>
      <Card className="min-w-0">
        <CardHeader>
          <CardTitle>Episode row</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {EPISODES.map((episode) => (
            <button
              key={episode.id}
              type="button"
              onClick={() => { setCurrent(episode.id); setPlaying(true); }}
              aria-pressed={current === episode.id}
              className="flex w-full items-center justify-between gap-3 rounded-md border-2 border-dashed border-border p-3 text-left transition-colors hover:border-solid hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
            >
              <span className="min-w-0">
                <span className="block truncate font-mono text-sm font-bold">{episode.title}</span>
                <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">EP {episode.id.toUpperCase()}{" // "}{episode.length}</span>
              </span>
              <Badge variant={current === episode.id ? "accent" : "outline"}>{current === episode.id ? "CUED" : "QUEUED"}</Badge>
            </button>
          ))}
        </CardContent>
      </Card>
      <Card className="min-w-0 border-foreground">
        <CardContent className="space-y-3 pt-6">
          <div className="flex items-center justify-between gap-2">
            <p className="min-w-0 truncate font-mono text-sm font-black uppercase tracking-wide">{active.title}</p>
            <span className="shrink-0 font-mono text-xs text-muted-foreground">{active.length}</span>
          </div>
          <Progress value={active.mark} />
          <div aria-hidden className="relative h-4">
            {CHAPTERS.map((tick) => (
              <span key={tick} className="absolute top-0 h-3 w-0.5 bg-foreground/60" style={{ left: `${tick}%` }} />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" variant="outline">Prev</Button>
            <Button size="sm" onClick={() => setPlaying((value) => !value)}>
              {playing ? "Pause" : "Play"}
            </Button>
            <Button size="sm" variant="outline">Next</Button>
            <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-muted-foreground">CH {active.mark}%{" // "}1X SPEED</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
