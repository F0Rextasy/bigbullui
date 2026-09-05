"use client";

import * as React from "react";
import { VendingMachine } from "@/components/ui/vending-machine";
import { ArcadeCabinet } from "@/components/ui/arcade-cabinet";
import { BettingSlip } from "@/components/ui/betting-slip";
import { PunchClock } from "@/components/ui/punch-clock";
import { Mailbox } from "@/components/ui/mailbox";
import { SafeVault } from "@/components/ui/safe-vault";
import { MedalDisplay } from "@/components/ui/medal-display";
import { TrophyShelf } from "@/components/ui/trophy-shelf";
import { Megaphone } from "@/components/ui/megaphone";
import { ScoreKeeper } from "@/components/ui/score-keeper";
import { MatchTicker } from "@/components/ui/match-ticker";
import { PoolTable } from "@/components/ui/pool-table";
import { RevolvingDoor } from "@/components/ui/revolving-door";
import { FerrisWheel } from "@/components/ui/ferris-wheel";
import { CarouselRide } from "@/components/ui/carousel-ride";

export const wave19Previews: Record<string, React.ComponentType> = {
  "vending-machine": () => <VendingMachine products={[{ id: "1", label: "Kola", slot: "A1", price: "₺25", inStock: true }]} />,
  "arcade-cabinet": () => <ArcadeCabinet />,
  "betting-slip": () => <BettingSlip picks={[{ id: "1", match: "A vs B", options: [{ label: "1", odds: "2.5" }] }]} />,
  "punch-clock": () => <PunchClock />,
  "mailbox": () => <Mailbox />,
  "safe-vault": () => <SafeVault />,
  "medal-display": () => <MedalDisplay medals={[{ id: "1", label: "Şampiyon", tier: "gold", count: 3 }]} />,
  "trophy-shelf": () => <TrophyShelf trophies={[{ id: "1", label: "Kupa", year: "2026", earned: true }]} />,
  "megaphone": () => <Megaphone message="Büyük duyuru!" />,
  "score-keeper": () => <ScoreKeeper teams={[{ id: "a", name: "Takım A", score: 2 }, { id: "b", name: "Takım B", score: 1 }]} />,
  "match-ticker": () => <MatchTicker matches={[{ id: "1", home: "EV", away: "DEP", homeScore: 2, awayScore: 1, live: true }]} />,
  "pool-table": () => <PoolTable />,
  "revolving-door": () => <RevolvingDoor />,
  "ferris-wheel": () => <FerrisWheel />,
  "carousel-ride": () => <CarouselRide />,
};
