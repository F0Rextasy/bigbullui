"use client";

import * as React from "react";
import { LowHpPulse } from "@/components/ui/low-hp-pulse";
import { RespawnTimer } from "@/components/ui/respawn-timer";
import { ScorePopup } from "@/components/ui/score-popup";
import { ComboCounter } from "@/components/ui/combo-counter";
import { KillFeed } from "@/components/ui/kill-feed";
import { CountdownStart } from "@/components/ui/countdown-start";
import { AchievementToast } from "@/components/ui/achievement-toast";
import { BattlePassTrack } from "@/components/ui/battle-pass-track";
import { TournamentBracket } from "@/components/ui/tournament-bracket";
import { InventoryGrid } from "@/components/ui/inventory-grid";
import { ItemSlot } from "@/components/ui/item-slot";
import { LootBox } from "@/components/ui/loot-box";
import { GachaPull } from "@/components/ui/gacha-pull";
import { DailyRewards } from "@/components/ui/daily-rewards";
import { ShopGrid } from "@/components/ui/shop-grid";
import { QuestList } from "@/components/ui/quest-list";
import { QuestTracker } from "@/components/ui/quest-tracker";
import { DialogueBox } from "@/components/ui/dialogue-box";
import { TutorialHighlight } from "@/components/ui/tutorial-highlight";
import { MatchmakingLobby } from "@/components/ui/matchmaking-lobby";
import { FriendList } from "@/components/ui/friend-list";
import { ClanCard } from "@/components/ui/clan-card";
import { VoiceIndicator } from "@/components/ui/voice-indicator";
import { PingIndicator } from "@/components/ui/ping-indicator";
import { PauseMenu } from "@/components/ui/pause-menu";
import { SettingsSheet } from "@/components/ui/settings-sheet";
import { SensitivitySlider } from "@/components/ui/sensitivity-slider";
import { CrosshairPicker } from "@/components/ui/crosshair-picker";
import { ReplayControls } from "@/components/ui/replay-controls";

export const wave29Previews: Record<string, React.ComponentType> = {
  "low-hp-pulse": function LowHpPulsePreview() {
    return (
      <div className="w-full max-w-xs">
        <LowHpPulse />
      </div>
    );
  },

  "respawn-timer": function RespawnTimerPreview() {
    return (
      <div className="w-full max-w-xs">
        <RespawnTimer seconds={6} total={10} />
      </div>
    );
  },

  "score-popup": function ScorePopupPreview() {
    return (
      <div className="flex flex-wrap gap-2">
        <ScorePopup value={150} />
        <ScorePopup value={500} tone="success" label="GOLD" />
      </div>
    );
  },

  "combo-counter": function ComboCounterPreview() {
    return <ComboCounter count={24} best={61} />;
  },

  "kill-feed": function KillFeedPreview() {
    return (
      <div className="w-full max-w-xs">
        <KillFeed />
      </div>
    );
  },

  "countdown-start": function CountdownStartPreview() {
    return <CountdownStart from={3} />;
  },

  "achievement-toast": function AchievementToastPreview() {
    const [open, setOpen] = React.useState(true);
    return (
      <div className="w-full max-w-sm space-y-2">
        <AchievementToast open={open} onClose={() => setOpen(false)} />
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="min-h-11 rounded-md border border-foreground px-4 font-mono text-xs font-bold"
          >
            SHOW AGAIN
          </button>
        )}
      </div>
    );
  },

  "battle-pass-track": function BattlePassTrackPreview() {
    return (
      <div className="w-full max-w-md">
        <BattlePassTrack />
      </div>
    );
  },

  "tournament-bracket": function TournamentBracketPreview() {
    return (
      <div className="w-full max-w-md">
        <TournamentBracket />
      </div>
    );
  },

  "inventory-grid": function InventoryGridPreview() {
    return (
      <div className="w-full max-w-xs">
        <InventoryGrid />
      </div>
    );
  },

  "item-slot": function ItemSlotPreview() {
    return (
      <div className="flex gap-2">
        <ItemSlot />
        <ItemSlot name="Shield" count={1} rarity="epic" selected />
        <ItemSlot name="Blade" count={1} rarity="legendary" />
      </div>
    );
  },

  "loot-box": function LootBoxPreview() {
    return <LootBox />;
  },

  "gacha-pull": function GachaPullPreview() {
    return (
      <div className="w-full max-w-xs">
        <GachaPull />
      </div>
    );
  },

  "daily-rewards": function DailyRewardsPreview() {
    return (
      <div className="w-full max-w-md">
        <DailyRewards />
      </div>
    );
  },

  "shop-grid": function ShopGridPreview() {
    return (
      <div className="w-full max-w-md">
        <ShopGrid />
      </div>
    );
  },

  "quest-list": function QuestListPreview() {
    return (
      <div className="w-full max-w-md">
        <QuestList />
      </div>
    );
  },

  "quest-tracker": function QuestTrackerPreview() {
    return (
      <div className="w-full max-w-xs">
        <QuestTracker />
      </div>
    );
  },

  "dialogue-box": function DialogueBoxPreview() {
    return (
      <div className="w-full max-w-md">
        <DialogueBox />
      </div>
    );
  },

  "tutorial-highlight": function TutorialHighlightPreview() {
    return (
      <div className="w-full max-w-xs">
        <TutorialHighlight />
      </div>
    );
  },

  "matchmaking-lobby": function MatchmakingLobbyPreview() {
    const [players, setPlayers] = React.useState([
      { id: "p1", name: "ADA", ready: true },
      { id: "p2", name: "ROW C", ready: false },
      { id: "p3", name: "MAX", ready: false },
    ]);
    return (
      <div className="w-full max-w-sm">
        <MatchmakingLobby
          players={players}
          onToggleReady={(id) => setPlayers((ps) => ps.map((p) => (p.id === id ? { ...p, ready: !p.ready } : p)))}
        />
      </div>
    );
  },

  "friend-list": function FriendListPreview() {
    return (
      <div className="w-full max-w-sm">
        <FriendList />
      </div>
    );
  },

  "clan-card": function ClanCardPreview() {
    return (
      <div className="w-full max-w-xs">
        <ClanCard />
      </div>
    );
  },

  "voice-indicator": function VoiceIndicatorPreview() {
    return (
      <div className="w-full max-w-xs space-y-2">
        <VoiceIndicator />
        <VoiceIndicator name="REX" speaking={false} muted />
      </div>
    );
  },

  "ping-indicator": function PingIndicatorPreview() {
    return (
      <div className="flex flex-wrap gap-2">
        <PingIndicator ms={28} />
        <PingIndicator ms={148} />
      </div>
    );
  },

  "pause-menu": function PauseMenuPreview() {
    return (
      <div className="w-full max-w-xs">
        <PauseMenu />
      </div>
    );
  },

  "settings-sheet": function SettingsSheetPreview() {
    return (
      <div className="w-full max-w-sm">
        <SettingsSheet />
      </div>
    );
  },

  "sensitivity-slider": function SensitivitySliderPreview() {
    const [v, setV] = React.useState(62);
    return (
      <div className="w-full max-w-xs">
        <SensitivitySlider value={v} onChange={setV} />
      </div>
    );
  },

  "crosshair-picker": function CrosshairPickerPreview() {
    return (
      <div className="w-full max-w-xs">
        <CrosshairPicker />
      </div>
    );
  },

  "replay-controls": function ReplayControlsPreview() {
    return (
      <div className="w-full max-w-md">
        <ReplayControls />
      </div>
    );
  },
};
