"use client";

import * as React from "react";
import { ReceiptPrinter } from "@/components/ui/receipt-printer";
import { QueueTicket } from "@/components/ui/queue-ticket";
import { NowServing } from "@/components/ui/now-serving";
import { Passport } from "@/components/ui/passport";
import { WaxSeal } from "@/components/ui/wax-seal";
import { Envelope } from "@/components/ui/envelope";
import { AirmailLetter } from "@/components/ui/airmail-letter";
import { Postmark } from "@/components/ui/postmark";
import { CassetteTape } from "@/components/ui/cassette-tape";
import { VinylRecord } from "@/components/ui/vinyl-record";
import { FlipClock } from "@/components/ui/flip-clock";
import { NeonSign } from "@/components/ui/neon-sign";
import { MarqueeBulbs } from "@/components/ui/marquee-bulbs";
import { BackstagePass } from "@/components/ui/backstage-pass";
import { Wristband } from "@/components/ui/wristband";
import { Lanyard } from "@/components/ui/lanyard";
import { DrinkTicket } from "@/components/ui/drink-ticket";
import { RaffleTicket } from "@/components/ui/raffle-ticket";
import { SlotMachine } from "@/components/ui/slot-machine";
import { PrizeWheel } from "@/components/ui/prize-wheel";
import { Dice } from "@/components/ui/dice";
import { CoinFlip } from "@/components/ui/coin-flip";
import { PlayingCard } from "@/components/ui/playing-card";
import { BingoCard } from "@/components/ui/bingo-card";
import { Jumbotron } from "@/components/ui/jumbotron";
import { Fireworks } from "@/components/ui/fireworks";
import { DiscoBall } from "@/components/ui/disco-ball";
import { StageLights } from "@/components/ui/stage-lights";
import { TicketBooth } from "@/components/ui/ticket-booth";
import { DriveInScreen } from "@/components/ui/drive-in-screen";
import { TicketStubV2 } from "@/components/ui/ticket-stub-v2";

export const wave9Previews: Record<string, React.ComponentType> = {
  "receipt-printer": function ReceiptPrinterPreview() {
    return (
      <ReceiptPrinter
        lines={["BIGBULL CANTEEN", "1 LARGE SODA", "FRIES ON SIDE", "GATE-3 COUNTER"]}
        total="$8.50"
      />
    );
  },
  "queue-ticket": function QueueTicketPreview() {
    return <QueueTicket number={42} queueLength={15} />;
  },
  "now-serving": function NowServingPreview() {
    return <NowServing number="B-42" />;
  },
  "passport": function PassportPreview() {
    return (
      <Passport
        holderName="John Doe"
        nationality="US Citizen"
        visaCountries={["Canada", "Mexico", "UK"]}
      />
    );
  },
  "wax-seal": function WaxSealPreview() {
    return <WaxSeal letter="B" />;
  },
  "envelope": function EnvelopePreview() {
    return <Envelope open={false} sender="Alice" recipient="Bob" letter={<p>You are invited.</p>} />;
  },
  "airmail-letter": function AirmailLetterPreview() {
    return <AirmailLetter lines={["Dear friend,", "Wish you were here!", "Greetings from the road"]} />;
  },
  "postmark": function PostmarkPreview() {
    return <Postmark city="Springfield" date="09/05/2026" serial="PM-8842" />;
  },
  "cassette-tape": function CassetteTapePreview() {
    return <CassetteTape title="Retro Vibes" playing={true} />;
  },
  "vinyl-record": function VinylRecordPreview() {
    return <VinylRecord label="Side A" playing={false} />;
  },
  "flip-clock": function FlipClockPreview() {
    return <FlipClock time="14:30" />;
  },
  "neon-sign": function NeonSignPreview() {
    return <NeonSign text="BIGBULL UI" color="accent" />;
  },
  "marquee-bulbs": function MarqueeBulbsPreview() {
    return <MarqueeBulbs text="BIGBULL" bulbs={true} />;
  },
  "backstage-pass": function BackstagePassPreview() {
    return <BackstagePass holderName="VIP Member" />;
  },
  "wristband": function WristbandPreview() {
    return <Wristband text="BIGBULL 2026" variant="vip" />;
  },
  "lanyard": function LanyardPreview() {
    return <Lanyard label="Conference 2026">Guest Pass</Lanyard>;
  },
  "drink-ticket": function DrinkTicketPreview() {
    return <DrinkTicket code="DRINK-00123" />;
  },
  "raffle-ticket": function RaffleTicketPreview() {
    return <RaffleTicket number="738292" winningNumber="738292" />;
  },
  "slot-machine": function SlotMachinePreview() {
    return <SlotMachine autoPlay={false} />;
  },
  "prize-wheel": function PrizeWheelPreview() {
    return (
      <PrizeWheel
        segments={[
          { label: "Free Drink", tint: "accent" },
          { label: "20% Off", tint: "destructive" },
          { label: "Priority Entry", tint: "foreground" },
          { label: "Merch Pack", tint: "muted" },
        ]}
        spinTo={270}
        onResult={() => {}}
      />
    );
  },
  "dice": function DicePreview() {
    return <Dice rolling={true} onRoll={() => {}} />;
  },
  "coin-flip": function CoinFlipPreview() {
    return <CoinFlip result="heads" flipping={true} onFlip={() => {}} />;
  },
  "playing-card": function PlayingCardPreview() {
    return <PlayingCard rank="A" suit="spades" faceDown={false} />;
  },
  "bingo-card": function BingoCardPreview() {
    return (
      <BingoCard
        numbers={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]}
        marked={[5, 10, 15, 20]}
      />
    );
  },
  "jumbotron": function JumbotronPreview() {
    return <Jumbotron title="BIGBULL" home="Team A" away="Team B" score={[42, 38]} />;
  },
  "fireworks": function FireworksPreview() {
    return <Fireworks active={true} bursts={5} />;
  },
  "disco-ball": function DiscoBallPreview() {
    return <DiscoBall size="md" spinning={true} />;
  },
  "stage-lights": function StageLightsPreview() {
    return <StageLights count={4} />;
  },
  "ticket-booth": function TicketBoothPreview() {
    return <TicketBooth label="Main" open={true} />;
  },
  "drive-in-screen": function DriveInScreenPreview() {
    return <DriveInScreen intermission={15} />;
  },
  "ticket-stub-v2": function TicketStubV2Preview() {
    return <TicketStubV2 event="Bigbull Concert" date="09/05/2026" serial="BB-2026-001" tear={false} />;
  },
};
