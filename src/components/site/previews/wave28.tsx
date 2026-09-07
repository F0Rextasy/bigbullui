"use client";

import * as React from "react";
import { Joystick } from "@/components/ui/joystick";
import { DPad } from "@/components/ui/d-pad";
import { ActionButtons } from "@/components/ui/action-buttons";
import { ComboButtons } from "@/components/ui/combo-buttons";
import { HealthBar } from "@/components/ui/health-bar";
import { ManaBar } from "@/components/ui/mana-bar";
import { XpBar } from "@/components/ui/xp-bar";
import { BossBar } from "@/components/ui/boss-bar";
import { TeamFrames } from "@/components/ui/team-frames";
import { DamageVignette } from "@/components/ui/damage-vignette";

export const wave28Previews: Record<string, React.ComponentType> = {
  joystick: function JoystickPreview() {
    const [pos, setPos] = React.useState({ x: 0, y: 0 });
    return (
      <div className="flex flex-col items-center gap-2">
        <Joystick onMove={(x, y) => setPos({ x, y })} />
        <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
          X {pos.x.toFixed(2)} · Y {pos.y.toFixed(2)}
        </span>
      </div>
    );
  },

  "d-pad": function DPadPreview() {
    const [last, setLast] = React.useState("NONE");
    return (
      <div className="flex flex-col items-center gap-2">
        <DPad onPress={(d) => setLast(d.toUpperCase())} />
        <span className="font-mono text-[11px] text-muted-foreground">LAST {last}</span>
      </div>
    );
  },

  "action-buttons": function ActionButtonsPreview() {
    const [last, setLast] = React.useState("NONE");
    return (
      <div className="flex flex-col items-center gap-2">
        <ActionButtons onAction={(id) => setLast(id.toUpperCase())} />
        <span className="font-mono text-[11px] text-muted-foreground">LAST {last}</span>
      </div>
    );
  },

  "combo-buttons": function ComboButtonsPreview() {
    return (
      <div className="w-full max-w-xs">
        <ComboButtons sequence={["A", "B", "X"]} />
      </div>
    );
  },

  "health-bar": function HealthBarPreview() {
    const [hp, setHp] = React.useState(72);
    return (
      <div className="w-full max-w-xs space-y-2">
        <HealthBar value={hp} max={100} />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setHp((v) => Math.max(0, v - 15))}
            className="min-h-11 flex-1 touch-none rounded-md border border-destructive/60 font-mono text-xs font-bold text-destructive"
          >
            HIT -15
          </button>
          <button
            type="button"
            onClick={() => setHp((v) => Math.min(100, v + 15))}
            className="min-h-11 flex-1 touch-none rounded-md border border-emerald-600/60 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400"
          >
            HEAL +15
          </button>
        </div>
      </div>
    );
  },

  "mana-bar": function ManaBarPreview() {
    return (
      <div className="w-full max-w-xs">
        <ManaBar value={64} max={100} />
      </div>
    );
  },

  "xp-bar": function XpBarPreview() {
    return (
      <div className="w-full max-w-xs">
        <XpBar value={780} max={1000} level={12} />
      </div>
    );
  },

  "boss-bar": function BossBarPreview() {
    const [hp, setHp] = React.useState(820);
    return (
      <div className="w-full max-w-md space-y-2">
        <BossBar name="Gatekeeper Golem" value={hp} max={1000} phases={3} />
        <button
          type="button"
          onClick={() => setHp((v) => (v <= 0 ? 1000 : v - 120))}
          className="mx-auto block min-h-11 touch-none rounded-md border border-foreground px-4 font-mono text-xs font-bold"
        >
          STRIKE 120
        </button>
      </div>
    );
  },

  "team-frames": function TeamFramesPreview() {
    const [active, setActive] = React.useState("ada");
    return (
      <div className="w-full max-w-md">
        <TeamFrames
          members={[
            { id: "ada", name: "Ada Bull", role: "Tank", hp: 92, active: active === "ada" },
            { id: "row", name: "Row C", role: "Healer", hp: 45, status: "buffed", active: active === "row" },
            { id: "max", name: "Max Vance", role: "Scout", hp: 18, active: active === "max" },
            { id: "rex", name: "Rex Stub", role: "Mage", hp: 0, status: "down", active: active === "rex" },
          ]}
          onSelect={setActive}
        />
      </div>
    );
  },

  "damage-vignette": function DamageVignettePreview() {
    const [hits, setHits] = React.useState(0);
    return (
      <div className="flex w-full max-w-sm flex-col items-center gap-2">
        <DamageVignette hitKey={hits} className="w-full rounded-lg border border-border">
          <div className="flex min-h-28 items-center justify-center bg-card font-mono text-xs text-muted-foreground">
            ARENA VIEW · HITS {hits}
          </div>
        </DamageVignette>
        <button
          type="button"
          onClick={() => setHits((h) => h + 1)}
          className="min-h-11 touch-none rounded-md border-2 border-destructive/60 px-4 font-mono text-xs font-bold text-destructive"
        >
          TAKE HIT
        </button>
      </div>
    );
  },
};
