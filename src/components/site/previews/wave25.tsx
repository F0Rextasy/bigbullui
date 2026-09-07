"use client";

import * as React from "react";
import { BadgePrinter } from "@/components/ui/badge-printer";
import { StopwatchV2 } from "@/components/ui/stopwatch-v2";
import { PassportStampGrid } from "@/components/ui/passport-stamp-grid";
import { LibraryDueDateCard } from "@/components/ui/library-due-date-card";
import { CoatCheckTag } from "@/components/ui/coat-check-tag";
import { WarrantyCertificate } from "@/components/ui/warranty-certificate";
import { TrainDepartureBoard } from "@/components/ui/train-departure-board";
import { ScratchCard } from "@/components/ui/scratch-card";
import { PassportIdCard } from "@/components/ui/passport-id-card";
import { WaitlistQueueCard } from "@/components/ui/waitlist-queue-card";
import { SocialProofToast } from "@/components/ui/social-proof-toast";
import { CargoShippingLabel } from "@/components/ui/cargo-shipping-label";
import { FlightTimelineCard } from "@/components/ui/flight-timeline-card";
import { ParkingTicketMeter } from "@/components/ui/parking-ticket-meter";

export const wave25Previews: Record<string, React.ComponentType> = {
  "badge-printer": function BadgePrinterPreview() {
    return <BadgePrinter />;
  },

  "stopwatch-v2": function StopwatchV2Preview() {
    return <StopwatchV2 />;
  },

  "passport-stamp-grid": function PassportStampGridPreview() {
    return (
      <div className="w-full max-w-sm">
        <PassportStampGrid
          stamps={[
            { id: "1", country: "TR", date: "JUN 26", unlocked: true },
            { id: "2", country: "DE", date: "JUL 02", unlocked: true },
            { id: "3", country: "JP", date: "—", unlocked: false },
          ]}
        />
      </div>
    );
  },

  "library-due-date-card": function LibraryDueDateCardPreview() {
    return <LibraryDueDateCard />;
  },

  "coat-check-tag": function CoatCheckTagPreview() {
    return <CoatCheckTag number="042" />;
  },

  "warranty-certificate": function WarrantyCertificatePreview() {
    return <WarrantyCertificate />;
  },

  "train-departure-board": function TrainDepartureBoardPreview() {
    return (
      <div className="w-full max-w-lg">
        <TrainDepartureBoard />
      </div>
    );
  },

  "scratch-card": function ScratchCardPreview() {
    return <ScratchCard />;
  },

  "passport-id-card": function PassportIdCardPreview() {
    return <PassportIdCard />;
  },

  "waitlist-queue-card": function WaitlistQueueCardPreview() {
    return <WaitlistQueueCard position={42} total={1200} />;
  },

  "social-proof-toast": function SocialProofToastPreview() {
    return <SocialProofToast buyer="Grace from Berlin" item="VIP Pass" duration={60000} />;
  },

  "cargo-shipping-label": function CargoShippingLabelPreview() {
    return <CargoShippingLabel />;
  },

  "flight-timeline-card": function FlightTimelineCardPreview() {
    return <FlightTimelineCard delayed />;
  },

  "parking-ticket-meter": function ParkingTicketMeterPreview() {
    return <ParkingTicketMeter plate="34 BB 042" allowanceMin={120} />;
  },
};
