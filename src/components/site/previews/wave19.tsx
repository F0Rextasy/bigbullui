"use client";

import * as React from "react";
import { PunchClock } from "@/components/ui/punch-clock";
import { Mailbox } from "@/components/ui/mailbox";
import { MedalDisplay } from "@/components/ui/medal-display";
import { TrophyShelf } from "@/components/ui/trophy-shelf";
import { Megaphone } from "@/components/ui/megaphone";
import { ScoreKeeper } from "@/components/ui/score-keeper";
import { MatchTicker } from "@/components/ui/match-ticker";

export const wave19Previews: Record<string, React.ComponentType> = {
  "punch-clock": () => <PunchClock />,
  "mailbox": () => <Mailbox />,
  "medal-display": () => <MedalDisplay medals={[{ id: "1", label: "Champion", tier: "gold", count: 3 }]} />,
  "trophy-shelf": () => <TrophyShelf trophies={[{ id: "1", label: "Trophy", year: "2026", earned: true }]} />,
  "megaphone": () => <Megaphone message="Major Announcement!" />,
  "score-keeper": () => <ScoreKeeper teams={[{ id: "a", name: "Team A", score: 2 }, { id: "b", name: "Team B", score: 1 }]} />,
  "match-ticker": () => <MatchTicker matches={[{ id: "1", home: "HOME", away: "AWAY", homeScore: 2, awayScore: 1, live: true }]} />,
};
