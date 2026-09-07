"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const FILES = [
  { name: "stage-plot.pdf", meta: "2.4 MB // PDF", tag: "STAGE" },
  { name: "cue-sheet-v3.pdf", meta: "812 KB // PDF", tag: "LIGHT" },
  { name: "poster-final.png", meta: "4.1 MB // PNG", tag: "PRINT" },
  { name: "rider-audio.pdf", meta: "1.2 MB // PDF", tag: "AUDIO" },
  { name: "setlist-draft.txt", meta: "18 KB // TXT", tag: "SHOW" },
  { name: "seating-map.svg", meta: "640 KB // SVG", tag: "GATE" },
];

export function AppFiles() {
  const [view, setView] = React.useState<"GRID" | "LIST">("GRID");
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">ARCHIVE // FILE ROOM</p>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">Show files</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant={view === "GRID" ? "default" : "outline"} onClick={() => setView("GRID")}>Grid</Button>
          <Button size="sm" variant={view === "LIST" ? "default" : "outline"} onClick={() => setView("LIST")}>List</Button>
          <Button size="sm">Upload</Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle>Vault usage</CardTitle>
            <Badge variant="accent">68% OF 50 GB</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-3 overflow-hidden rounded-sm border border-border bg-secondary">
            <div className="h-full w-[68%] bg-accent" />
          </div>
        </CardContent>
      </Card>
      <div className={view === "GRID" ? "grid gap-4 sm:grid-cols-2 xl:grid-cols-3" : "grid gap-3"}>
        {FILES.map((file) => (
          <Card key={file.name}>
            <CardContent className="flex items-center justify-between gap-3 pt-6">
              <div className="min-w-0">
                <p className="truncate font-mono text-sm font-black">{file.name}</p>
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{file.meta}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Badge variant="outline">{file.tag}</Badge>
                <Button size="sm" variant="outline">Get</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
