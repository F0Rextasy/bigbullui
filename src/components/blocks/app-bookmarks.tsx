"use client";

import * as React from "react";
import { cn } from "../ui/lib/utils";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

const LINKS = [
  { id: "b1", title: "Scanner calibration manual", host: "DOCS.BIGBULL.APP", tag: "OPS" },
  { id: "b2", title: "VIP seating chart v4", host: "FILES.BIGBULL.APP", tag: "VIP" },
  { id: "b3", title: "Encore weekend poster", host: "PRESS.BIGBULL.APP", tag: "HYPE" },
  { id: "b4", title: "Refund policy one pager", host: "DOCS.BIGBULL.APP", tag: "OPS" },
  { id: "b5", title: "Marquee bulb order form", host: "SHOP.BIGBULL.APP", tag: "OPS" },
  { id: "b6", title: "Radio spot script", host: "PRESS.BIGBULL.APP", tag: "HYPE" },
];

export interface AppBookmarksProps extends React.HTMLAttributes<HTMLDivElement> {
  onAction?: (action: string) => void;
}

export function AppBookmarks({ className, onAction, ...props }: AppBookmarksProps) {
  const [query, setQuery] = React.useState("");
  const [opened, setOpened] = React.useState<string | null>(null);
  const visible = LINKS.filter((link) =>
    `${link.title} ${link.host} ${link.tag}`.toLowerCase().includes(query.trim().toLowerCase())
  );
  return (
    <div className={cn("w-full space-y-4", className)} {...props}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">WALL // BOOKMARKS</p>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">Saved links</h2>
        </div>
        <div className="flex items-center gap-2">
          {opened && <span role="status" className="font-mono text-[10px] uppercase tracking-wider text-accent">{opened}</span>}
          <Button size="sm" onClick={() => { setOpened("Saved bookmark slot ready."); onAction?.("save-link"); }}>Save link</Button>
        </div>
      </div>
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search saved links..."
        aria-label="Search saved links"
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((link) => (
          <Card key={link.id} className="min-w-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <Badge variant="default">{link.tag}</Badge>
              <span className="truncate font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{link.host}</span>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-2">
              <CardTitle className="min-w-0 truncate text-sm">{link.title}</CardTitle>
              <Button size="sm" variant="ghost" onClick={() => { setOpened(`Opened: ${link.title}`); onAction?.("open-link"); }}>Open</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {visible.length === 0 ? (
        <p className="rounded-md border-2 border-dashed border-border p-4 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
          No saved stubs match this search
        </p>
      ) : null}
    </div>
  );
}
